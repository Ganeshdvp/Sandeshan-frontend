import "./App.css";
import { Container } from "./appComponents/Container";
import { BrowserRouter, Route, Routes } from "react-router";
import { Feed } from "./appComponents/Feed";
import { Requests } from "./appComponents/Requests";
import { Friends } from "./appComponents/Friends";
import { Block } from "./appComponents/Block";
import { Login } from "./appComponents/Login";
import { Provider } from "react-redux";
import  appStore from './utils/appStore';

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Container />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/block" element={<Block />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
