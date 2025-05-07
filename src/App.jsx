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
                <Route path="/" element={
                  <PrivateRoute>
                    {/* Implementar rotas privadas do sistema*/}
                  </PrivateRoute>
              }/>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
    </>
  );
}

export default App;
