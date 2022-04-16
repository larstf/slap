import type { AppProps } from 'next/app';
import { useState } from 'react';

import GlobalContext, { defaultValues } from '../context/global';
import '../styles/global.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const update = (data: any) => {    
    setState((s) => Object.assign({}, s, data));
  }

  const [state, setState] = useState({
    ...defaultValues,
    update,
  });

  return (
    <GlobalContext.Provider value={state}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  )
}

export default CustomApp;
