import "./App.css";

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login/Login.jsx";

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
              <Route path='/login' element={<Login/>}/>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
