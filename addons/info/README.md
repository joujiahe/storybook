# Storybook Info Addon
[![Greenkeeper badge](https://badges.greenkeeper.io/storybooks/storybook.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/storybooks/storybook.svg?branch=master)](https://travis-ci.org/storybooks/storybook)
[![CodeFactor](https://www.codefactor.io/repository/github/storybooks/storybook/badge)](https://www.codefactor.io/repository/github/storybooks/storybook)
[![Known Vulnerabilities](https://snyk.io/test/github/storybooks/storybook/8f36abfd6697e58cd76df3526b52e4b9dc894847/badge.svg)](https://snyk.io/test/github/storybooks/storybook/8f36abfd6697e58cd76df3526b52e4b9dc894847)
[![BCH compliance](https://bettercodehub.com/edge/badge/storybooks/storybook)](https://bettercodehub.com/results/storybooks/storybook) [![codecov](https://codecov.io/gh/storybooks/storybook/branch/master/graph/badge.svg)](https://codecov.io/gh/storybooks/storybook)
[![Storybook Slack](https://storybooks-slackin.herokuapp.com/badge.svg)](https://storybooks-slackin.herokuapp.com/)

Storybook Info Addon will show additional information for your stories in [Storybook](https://storybooks.js.org).
Useful when you want to display usage or other types of documentation alongside your story.

This addon works with Storybook for:
[React](https://github.com/storybooks/storybook/tree/master/app/react).

![Screenshot](docs/home-screenshot.png)

## Usage

Install the following npm module:

```sh
npm i -D @storybook/addon-info
```

Then set the addon in the place you configure storybook like this:

```js
import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';

setAddon(infoAddon);

configure(function () {
  //...
}, module);
```

Then create your stories with the `.addWithInfo` API.

```js
import React from 'react';
import Component from './Component';
import { storiesOf } from '@storybook/react';

storiesOf('Component')
  .addWithInfo(
    'simple usage',
    `This is the basic usage with the button with providing a label to show the text.`,
    () => (
      <Component>Click the "?" mark at top-right to view the info.</Componentp>
    ),
  );
```

> Have a look at [this example](example/story.js) stories to learn more about the `addWithInfo` API.

## The FAQ

**Components lose their names on static build**

Component names also get minified with other javascript code when building for production.
When creating components, set the `displayName` static property to show the correct component name on static builds.
