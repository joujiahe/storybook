import deprecate from 'util-deprecate';
import Preview from './preview';

const preview = new Preview();

export const storiesOf = preview.storiesOf.bind(preview);
export const setAddon = preview.setAddon.bind(preview);
export const addDecorator = preview.addDecorator.bind(preview);
export const configure = preview.configure.bind(preview);
export const getStorybook = preview.getStorybook.bind(preview);
export const getStorybookUI = preview.getStorybookUI.bind(preview);

// NOTE export these to keep backwards compatibility
import { action as _action } from '@storybook/storybook-addon-actions';
import { linkTo as _linkTo } from '@storybook/storybook-addon-links';

export const action = deprecate(
  _action,
  '@storybook/storybook action is deprecated. See: https://github.com/storybooks/storybook/tree/master/packages/addon-actions',
);

export const linkTo = deprecate(
  _linkTo,
  '@storybook/storybook linkTo is deprecated. See: https://github.com/storybooks/storybook/tree/master/packages/addon-links',
);
