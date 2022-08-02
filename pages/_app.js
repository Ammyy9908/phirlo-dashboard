import '../styles/globals.css'
import { Provider } from "react-redux";
import configureStore from '../redux/store/store'
const store = configureStore();
function MyApp({ Component, pageProps }) {
  return <Provider store={store}><Component {...pageProps} /></Provider>
}

export default MyApp
