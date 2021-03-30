---
layout: default
title: Fixture Data in Cucumber JVM
---

[Cucumber](https://cucumber.io/) is a commonly used [Behavior-Driven Development (BDD)](https://en.wikipedia.org/wiki/Behavior-driven_development) testing framework. The Java implementation, [Cucumber JVM](https://github.com/cucumber/cucumber-jvm), is a great way to take a BDD testing approach with your Java project. In this post, we'll talk about how to create and manage fixture data in _Cucumber JVM_.


## Why Fixture Data

_Test fixture data_ is data that stays consistent throughout the running of the test suite. It can be sample data like a user record filled with random values or a static value loaded from a data store. The benefits of using fixture data are:

1. Prevents the need of creating or loading the same new test data multiple times. This is especially beneficial if the data is expensive to load and the data is referenced many times in the tests.
1. Allows data to be eagerly loaded before the first step of the first scenario runs.

## Cucumber JVM Dependency Injection

_Cucumber JVM_ supports [dependency injection](https://cucumber.io/docs/cucumber/state/#dependency-injection) (DI), but first a dependency injection module implementation must be chosen. The default DI module is [PicoContainer](https://cucumber.io/docs/cucumber/state/#picocontainer) ([Link to Github Project](https://github.com/picocontainer/picocontainer)). This post's examples assume the default _PicoContainer_ DI module is used.


Dependency injection automatically instantiates an instance of any step definition (or any [glue code](https://cucumber.io/docs/cucumber/api/#options) for that matter) constructor argument before the scenario runs. For a step definition like:

```java
class UserScenarioSteps {
  public UserScenarioSteps (
    UserFixtureData userFixtureData
  ) {
  }
}
```

Both an instance of `UserScenarioSteps` and `UserFixtureData` would get instantiated when the user scenarios run.

The default behavior of [PicoContainer](https://cucumber.io/docs/cucumber/state/#picocontainer) is to create a single instance for each scenario, i.e. cache the instance for the lifecyle of the scenario. This behavior can be changed by implementing a [Cucumber ObjectFactory](https://cucumber.io/docs/cucumber/state/#the-cucumber-object-factory)...

## Supporting Fixture Data By Implementing An ObjectFactory

When using `PicoContainer` as the dependency injection module, the default `ObjectFactory` is the [PicoFactory](https://github.com/cucumber/cucumber-jvm/blob/main/picocontainer/src/main/java/io/cucumber/picocontainer/PicoFactory.java). `PicoFactory`'s behavior caches DI instances throughout the life cycle of the scenario. To go into the weeds a bit (remember to [Learn to Read the Source, Luke](https://blog.codinghorror.com/learn-to-read-the-source-luke/)), [PicoFactory#start](https://github.com/cucumber/cucumber-jvm/blob/main/picocontainer/src/main/java/io/cucumber/picocontainer/PicoFactory.java#L26) has:

```java
pico = new PicoBuilder()
    .withCaching()
    .withLifecycle()
    .build();
```

`withCaching` is using [org.picocontainer.behaviors.Caching](https://github.com/picocontainer/picocontainer/blob/master/pico/container/src/java/com/picocontainer/behaviors/Caching.java) to enable `PicoContainer` to cache dependency injected instances throughout the lifecycle of a scenario. We'll extend this behavior to support fixture-scoped DI instances.

First let's create an annotation so we can denote classes that we want to be fixture scoped:

```java
package com.jonbake.cucumber.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Indicates that a cucumber dependency-injected instance should be fixture-scoped, i.e. a single instance throughout
 * the lifetime of all test suite scenarios.
 */
@Target(TYPE)
@Retention(RUNTIME)
public @interface Fixture {
    /**
     * Indicates that a fixture should be eagerly loaded at the start before the first scenario runs.
     *
     * @return boolean indicating if fixture shold be eagerly loaded
     */
    boolean eagerlyLoad () default false;
}
```

With the `Fixture` annotation in place, we can now create the `ObjectFactory` that performs the fixture caching behavior. The implementation of `ObjectFactory` will be the same as `PicoFactory` with the exception of the caching behavior (defined in `PicoFactory#start`):

```java
package com.jonbake.cucumber;

import com.jonbake.cucumber.annotations.Fixture;
import io.cucumber.core.backend.ObjectFactory;
import org.picocontainer.*;
import org.picocontainer.behaviors.AbstractBehaviorFactory;
import org.picocontainer.behaviors.Caching;
import org.picocontainer.behaviors.Storing;
import org.reflections.Reflections;
import org.reflections.util.ClasspathHelper;

import java.lang.reflect.Constructor;
import java.lang.reflect.Modifier;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;
import java.util.function.Consumer;

/**
 * An {@link ObjectFactory} that caches DI instances annotated with {@link Fixture} for the lifetime of the test suite.
 * DI instances not annotated have the same default behavior as defined in {@link io.cucumber.picocontainer.PicoFactory}
 * where instances are cached throughout the scenario. This implementation is the same as PicoFactory with the exception
 * of the caching behavior being changed.
 */
public class FixtureObjectFactory implements ObjectFactory {
    private static final FixtureBehavior FIXTURE_BEHAVIOR = new FixtureBehavior();

    private final Set<Class<?>> classes = new HashSet<>();
    private MutablePicoContainer pico;

    private static boolean isInstantiable (Class<?> clazz) {
        boolean isNonStaticInnerClass = !Modifier.isStatic(clazz.getModifiers()) && clazz.getEnclosingClass() != null;
        return Modifier.isPublic(clazz.getModifiers()) && !Modifier.isAbstract(clazz.getModifiers())
                && !isNonStaticInnerClass;
    }

    public void start () {
        pico = new PicoBuilder()
                .withBehaviors(FIXTURE_BEHAVIOR)
                .withLifecycle()
                .build();
        consumeEagerlyLoadedFixtureClass(fixtureClass -> addClass(fixtureClass));
        for (Class<?> clazz : classes) {
            pico.addComponent(clazz);
        }
        // Eagerly load fixture data by calling #getInstance here in #start
        consumeEagerlyLoadedFixtureClass(fixtureClass -> getInstance(fixtureClass));
        pico.start();
    }

    public void stop () {
        pico.stop();
        pico.dispose();
    }

    public boolean addClass (Class<?> clazz) {
        if (isInstantiable(clazz) && classes.add(clazz)) {
            addConstructorDependencies(clazz);
        }
        return true;
    }

    public <T> T getInstance (Class<T> type) {
        return pico.getComponent(type);
    }

    private void consumeEagerlyLoadedFixtureClass (Consumer<Class<?>> fixtureClassConsumer) {
        new Reflections(getClass().getPackage().getName(), ClasspathHelper.forJavaClassPath())
                .getTypesAnnotatedWith(Fixture.class).stream()
                .filter(c -> c.getAnnotation(Fixture.class).eagerlyLoad())
                .forEach(fixtureClassConsumer);
    }

    private void addConstructorDependencies (Class<?> clazz) {
        for (Constructor<?> constructor : clazz.getConstructors()) {
            for (Class<?> paramClazz : constructor.getParameterTypes()) {
                addClass(paramClazz);
            }
        }
    }

    private static class FixtureBehavior extends AbstractBehaviorFactory {
        private final ComponentFactory fixtureComponentFactory = new Storing();
        private final ComponentFactory defaultComponentFactory = new Caching();

        @Override
        public <T> ComponentAdapter<T> createComponentAdapter (ComponentMonitor componentMonitor, LifecycleStrategy lifecycleStrategy, Properties componentProperties, Object componentKey, Class<T> componentImplementation, Parameter... parameters) throws PicoCompositionException {
            if (hasFixtureAnnotation(componentKey)) {
                return fixtureComponentFactory.createComponentAdapter(componentMonitor, lifecycleStrategy, componentProperties, componentKey, componentImplementation, parameters);
            }
            return defaultComponentFactory.createComponentAdapter(componentMonitor, lifecycleStrategy, componentProperties, componentKey, componentImplementation, parameters);
        }

        private boolean hasFixtureAnnotation (Object componentKey) {
            if (componentKey instanceof Class<?>) {
                return ((Class<?>) componentKey).isAnnotationPresent(Fixture.class);
            }
            return false;
        }
    }
}
```

Now when we create DI classes and annotate them with `@Fixture`:

```java
package com.jonbake.cucumber;

@Fixture(eagerlyLoad = true)
public class UserFixtureData {
    private User user;
    public UserFixtureData () {
        // Make an API request or some other expensive operation to retrieve a User
        // Since this is a fixture, the request will be made only once
        this.user = httpClient.get("https://api.exmaple.com/users/1");
    }
}
```

And use it in our glue code:

```java
class UserScenarioSteps {
    private UserFixtureData userFixtureData;
    public UserScenarioSteps (
        UserFixtureData userFixtureData
     ) {
        this.userFixtureData = userFixtureData;
     }
}
```

The `userFixtureData` instance will persist throughout the entire test suite, even if it is injected by another class.

**All this code is available on Github, along with a feature to verify this fixture behavior, check it out! <https://github.com/jonmbake/cucumber-jvm-fixture-data>**
