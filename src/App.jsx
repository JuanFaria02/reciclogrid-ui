import "./App.css";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import { AuthProvider } from "./contexts/auth.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Collectors from "./pages/Collectors/Collectors.jsx";
import Map from "./pages/Map/Map.jsx";
import ViewCollector from "./pages/Collectors/ViewCollector.jsx";
import TableEmployee from "./pages/Employee/TableEmployee.jsx";
import ViewEmployee from "./pages/Employee/ViewEmployee.jsx";
import Profile from "./pages/Profile/Profile.jsx";

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
                <Route path="/coletor/:collectorId" element={
                  <PrivateRoute>
                    <ViewCollector/>
                  </PrivateRoute>
                }/>
                <Route path="/operadores" element={
                  <PrivateRoute>
                    <TableEmployee/>
                  </PrivateRoute>
                }/>
                <Route path="/operador/:employeeId" element={
                  <PrivateRoute>
                    <ViewEmployee/>
                  </PrivateRoute>
                }/>
                <Route path="/mapa" element={
                  <PrivateRoute>
                    <Map/>
                  </PrivateRoute>
                }/>
                <Route path="/perfil" element={
                  <PrivateRoute>
                    <Profile/>
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
