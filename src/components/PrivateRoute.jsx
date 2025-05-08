import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/auth.jsx"
import Layout from "./Layout.jsx"
import React from "react"

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext)

  if (loading) return

  return isAuthenticated ? ( 
    <Layout>
      {children}
    </Layout>
  ) : <Navigate to="/login" />
}

export default PrivateRoute