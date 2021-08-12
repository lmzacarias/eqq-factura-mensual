import '../styles/globals.css'
import moment from 'moment';
import "antd/dist/antd.css";
import 'moment/locale/es';
moment.locale('es');


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps}/>
}

export default MyApp
