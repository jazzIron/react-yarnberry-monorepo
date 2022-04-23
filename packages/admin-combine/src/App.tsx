import { ReactElement } from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { theme } from '@common/styles';
import '@common/styles/src/emotion.d';

import './App.scss';
import { Test } from '@src/components/test/Test';

function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <Test />
    </ThemeProvider>
  );
}

export default App;
