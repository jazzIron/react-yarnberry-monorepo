import { ThemeProvider } from '@emotion/react';
import { DecoratorFn } from '@storybook/react';
import { Themes } from '@common/styles';

export const decorators: DecoratorFn[] = [
  Story => (
    <ThemeProvider theme={Themes}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
};
