---
layout: default
title: Publishing Jest Code Coverage on Github Pages
---

Code coverage is a great tool for detecting holes in automated tests. From experience,
it has usually been a pain to set up. I recently set up test code coverage on a newly created Github Project,
[React Terminal UI](https://github.com/jonmbake/react-terminal-ui). It was anything but a pain and I wanted
to share so you too can avoid the pain of setting up code coverage on your JavaScript project too.

## Jest

The story starts with [Jest](https://jestjs.io/), the JavaScript testing framework by Facebook. _Jest_ has
a [configuration option to automatically generate code coverage](https://jestjs.io/docs/en/configuration#collectcoverage-boolean),
`collectCodeCoverage`. You can also specify the output format of the coverage report via `coverageReporters`; supported formats
include `json`, `lcov`, `text`, `clover`, `html`. Jest configuration can be declared within your `package.json`;

```
{
  "name": "jest-code-coverage-example",
  //...
  "scripts": {
    "build": //...,
    "test": "jest"
  }
  "jest": {
    "testEnvironment": "jsdom",
    "collectCoverage": true,
    "coverageReporters": [
      "html"
    ],
    "coverageDirectory": "docs/coverage"
  }
}
```
<small style="font-style: italic">package.json</small>

Notice we're also setting `coverageDirectory`-- the output directory for generated test coverage reports-- to `docs/coverage`. We're
also setting the `coverageReporters` output format to `html`. This is where the story moves on to [Github Pages](https://pages.github.com/)....

## Github Pages And Actions

_Github Pages_ is a great way to easily serve static content from any _Github_ repository *for free*. You can also use _Github Pages_
to serve documentation for your project. The documentation simply has to live in the `docs` folder within your repository. To enable
this first create and add the `docs` directory:

```
mkdir docs
touch docs/.gitkeep
git add docs/.gitkeep
```

Then go to _Repository > Settings_, scroll down to _GitHub Pages_, and choose the _/docs folder_ option:

![](/assets/images/2020-07-21-publishing-jest-code-coverage-github-pages-401672ac.png)

Once _GitHub Pages_ are setup, we can add _Github Actions_ to run the _Jest_ tests and publish the coverage report:

```
name: Build and publish test coverage
on:
  push:
    branches:
      - master
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout repository
      uses: actions/checkout@master
    - name: Set up Node.js
      uses: actions/setup-node@master
      with:
        node-version: 12.0.0
    - name: Install NPM dependencies
      run: npm install && npm run install-peers
    - name: Run Jest tests and generate coverage report
      run: npm test
    - name: Run Build
      run: npm run build
    - name: Publish test coverage report
      uses: EndBug/add-and-commit@v4
      with:
        add: docs
        force: true
        message: Add generated docs
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
<small style="font-style: italic">.github/workflows/main.yml</small>

That's it! Now on every commit a test coverage report will get generated and published:

![](/assets/images/2020-07-21-publishing-jest-code-coverage-github-pages-0807969f.png)
