import { ReactElement } from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { theme } from '@common/styles';
import '@common/styles/src/emotion/emotion.d';
import { RecoilRoot } from 'recoil';

import './App.scss';
import { RouterManager } from './routes/RouterManager';

function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <RouterManager />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
