---
layout: default
title: "Profiling Hibernate JPA Queries with MiniProfiler"
published: false
tags:
  - java
---

Often times application performance degrades gradually as more SQL queries are ran and resources consumed. This all happens in the background and gradually so it is often not noticed while developing

```
package com.jonbake.hibernate;

import io.jdev.miniprofiler.sql.ProfilingDataSource;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.hibernate.engine.jdbc.connections.internal.DatasourceConnectionProviderImpl;

public class ProfilingConnectionProvider extends DatasourceConnectionProviderImpl {
    public ProfilingConnectionProvider () {
        try {
            setDataSource(new ProfilingDataSource((DataSource) new InitialContext().lookup("java:/datasources/MyDS")));
        } catch (NamingException e) {
        }
    }
}
```

```
<property name="hibernate.connection.provider_class" value="com.jonbake.hibernate.ProfilingConnectionProvider" />
```
