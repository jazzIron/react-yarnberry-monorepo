import { FC, ReactElement } from 'react';

import { ThemeProvider } from '@emotion/react';
import { render, RenderOptions } from '@testing-library/react';

import { Themes } from '@common/styles';

const AllTheProviders: FC = ({ children }) => (
  <ThemeProvider theme={Themes}>{children}</ThemeProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queryies'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
