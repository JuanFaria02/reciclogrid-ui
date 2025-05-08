import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Login = () => {
    const { signin, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [navigate, isAuthenticated])

  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
  
    const handleLogin = async (event) => {
        event.preventDefault()
        setError("")
      
        if (!email || !password) {
          setError("Preencha todos os campos")
          return
        }
      
        const res = await signin(email, password)
      
        if (res) {
          setError(res)
          return
        }
      
        navigate("/")
      }
  
    return (
        <div className="m-auto bg-white p-36 rounded-[20px] shadow-[0px_4px_200px_rgba(0,0,0,0.25)]">
            <img className="relative bottom-20" src="/reciclogrid_logo.svg" alt="Logo Reciclogrid" width="400" height="100"/>

            <form className="flex-col space-y-6" onSubmit={handleLogin}>
                <div className="flex flex-col items-center">

                    <p className="text-red-500">{error}</p>
                </div>
                <div className="flex flex-col items-center">
                    <label className="mb-2 text-sm font-medium text-gray-700">Email</label>
                    <Input id="email" name="email" placeholder="operador@gmail.com" type="text" value={email}
                           onChange={(e) => [setEmail(e.target.value), setError("")]}/>
                </div>
                <div className="flex flex-col items-center">
                    <label className="mb-2 text-sm font-medium text-gray-700">Senha</label>
                    <Input id="password" name="password" placeholder="*****" type="password" value={password}
                           onChange={(e) => [setPassword(e.target.value), setError("")]}/>
                </div>

                <div className="flex flex-col items-center">
                    <button type="submit"
                            className="rounded-lg border border-transparent px-5 py-2 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-gray-400 text-white">
                        Login
                    </button>
                </div>
            </form>
        </div>
)
}

export default Login