import deprecate from 'util-deprecate';
import '@storybook/storybook-addon-actions/register';
import '@storybook/storybook-addon-links/register';

deprecate(
  () => {},
  '@storybook/storybook/addons is deprecated. See https://storybooks.js.org/docs/react-storybook/addons/using-addons/',
)();
