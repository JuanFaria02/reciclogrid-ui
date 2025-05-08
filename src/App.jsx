import "./App.css";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import { AuthProvider } from "./contexts/auth.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <>
      <AuthProvider>
          <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path="/coletores" element={
                  <PrivateRoute>
                    <h1>Coletores</h1>
                  </PrivateRoute>
                }/>
                <Route path="*" element={
                  <PrivateRoute/>
                }/>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
    </>
  );
}

export default App;
