import "./App.css";
import { Provider } from "react-redux";
import  appStore from './utils/appStore';
import { AppRouting } from "./appComponents/AppRouting";




function App() {

  return (
    <>
    <Provider store={appStore}>
     <AppRouting/>
    </Provider>
    </>
  );
}

export default App;
