import { ReactElement } from 'react';
import { ThemeProvider } from '@emotion/react';
import { colors, theme } from '@common/styles';
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
