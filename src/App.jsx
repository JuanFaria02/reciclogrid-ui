import "./App.css";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import { AuthProvider } from "./contexts/auth.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Collectors from "./pages/Collectors/Collectors.jsx";
import Map from "./pages/Map/Map.jsx";
import Employee from "./pages/Employee/Employee.jsx";

function App() {
  return (
    <>
      <AuthProvider>
          <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path="/coletores" element={
                  <PrivateRoute>
                    <Collectors/>
                  </PrivateRoute>
                }/>
                <Route path="/operadores" element={
                  <PrivateRoute>
                    <Employee/>
                  </PrivateRoute>
                }/>
                <Route path="/mapa" element={
                  <PrivateRoute>
                    <Map/>
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
