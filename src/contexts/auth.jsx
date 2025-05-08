import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()

    const [loading, setLoading] = useState(true)

    const signin = async (email, password) => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
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

    const refreshToken = async (refreshToken) => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
            })
    
            if (!response.ok) {
                return "Usuário não autorizado"
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
    
    const signout = () => {
        setUser(null);
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
    };
       
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
            value={{ user, isAuthenticated: !!user, signin, signout, loading, refreshToken }}>
            {children}
        </AuthContext.Provider>
    )
}