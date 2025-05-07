import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/auth.jsx"

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext)

  if (loading) return

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute