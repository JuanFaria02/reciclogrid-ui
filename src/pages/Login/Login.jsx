import React from "react";
import Input from "../../components/Input";


const Login = () => {
    return (
        <div className="m-auto bg-white p-36 rounded-[20px] shadow-[0px_4px_200px_rgba(0,0,0,0.25)]">
            <img className="relative bottom-20" src="/src/assets/reciclogrid_logo.svg" alt="Logo Reciclogrid" width="400" height="100" />
            <form className="flex-col space-y-6">
                <div className="flex flex-col items-center">
                    <label className="mb-2 text-sm font-medium text-gray-700">Email</label>
                    <Input id="email" name="email" placeholder="operador@gmail.com" type="text"/>
                </div>
                <div className="flex flex-col items-center">
                    <label className="mb-2 text-sm font-medium text-gray-700">Senha</label>
                    <Input id="password" name="password" placeholder="*****" type="password"/>
                </div>
            </form>
        </div>
    )
}

export default Login