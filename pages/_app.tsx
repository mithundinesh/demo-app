import { AppProps } from "next/app";
import "../app/globals.css";
import { appWithTranslation } from "next-i18next";
import PropTypes from "prop-types";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default appWithTranslation(App);
