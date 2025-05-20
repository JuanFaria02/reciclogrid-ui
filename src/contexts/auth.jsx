import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()

    const [loading, setLoading] = useState(true)
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const signin = async (email, password) => {
        try {
            const response = await fetch(`${backendUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
    
            if (!response.ok) {
                return "Usuário ou senha inválidos"
            }
    
            const data = await response.json()
            const { token, refreshToken } = data
    
            localStorage.setItem("access_token", token);
            localStorage.setItem("refresh_token", refreshToken)

            const payload = JSON.parse(atob(token.split(".")[1]))
            setUser({ id: payload.userId, email: payload.sub, type: payload.type })
    
            return null
        } catch (error) {
            console.error("Erro ao autenticar:", error)
            return "Error! Contate o fornecedor"
        }
    }
    
    const signout = () => {
        setUser(null);
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
    };
     
    const refreshAccessToken = async (oldRefreshToken) => {
        try {
            const response = await fetch(`${backendUrl}/refreshToken`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken: oldRefreshToken }),
            })
            
            if (!response.ok) {
                debugger
                console.log("singout")
                signout()
                throw new Error("Refresh token inválido")
            }
    
            const data = await response.json()
            const { token, refreshToken } = data
    
            localStorage.setItem("access_token", token);
            localStorage.setItem("refresh_token", refreshToken)

            const payload = JSON.parse(atob(token.split(".")[1]))
            setUser({ id: payload.userId, email: payload.sub, type: payload.type })
    
            return null
        } catch (error) {
            console.error("Erro ao autenticar:", error)
            return "Erro de conexão com o servidor"
        }
    }

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token")

        if (accessToken) {
            try {
                const payload = JSON.parse(atob(accessToken.split(".")[1]))
                setUser({ id: payload.userId, email: payload.sub, type: payload.type })
            } catch (err) {
                console.error("Token inválido")
            }
        }

        setLoading(false)
    }, [])

    return ( 
        <AuthContext.Provider
            value={{ user, isAuthenticated: !!user, signin, signout, loading, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}