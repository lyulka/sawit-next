/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { ThemeProvider } from '@material-ui/core/styles';
import { OARBeliContextProvider } from '../contexts/OARBeliContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <OARBeliContextProvider>
        <Component {...pageProps} />
      </OARBeliContextProvider>
    </ThemeProvider>
  );
}
