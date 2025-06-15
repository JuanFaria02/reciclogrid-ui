import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { signout, user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-2xl">
      <div className="flex justify-between items-center px-4 md:px-10 h-32">
        <Link to="/" className="pt-8 pb-8">
          <img
            src="/reciclogrid_logo.svg"
            alt="Logo Reciclogrid"
            width="400"
            height="100"
            className="h-16 md:h-auto"
          />
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className="hidden md:block text-[18px] pb-9 text-center">
          <ul className="flex pt-14">
            <li className="mr-14">
              <Link className="hover:text-green-300" to="/perfil">Perfil</Link>
            </li>
            <li className="mr-14">
              <Link className="hover:text-green-300" to="/coletores">Coletores</Link>
            </li>
            {['ADMIN', 'SUPERADMIN'].includes(user.type) && (
            <li className="mr-14">
              <Link className="hover:text-green-300" to="/operadores">
                Operadores
              </Link>
            </li>
            )}
            <li className="mr-14">
              <Link className="hover:text-green-300" to="/mapa">Mapa</Link>
            </li>
            <li className="mr-14">
              <button
                onClick={signout}
                className="hover:text-green-300 cursor-pointer text-[18px] bg-none border-none p-0"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-white px-4 pb-4">
          <ul className="flex flex-col text-[18px] space-y-3">
            <li>
              <Link className="hover:text-green-300 block" to="/perfil" onClick={() => setMenuOpen(false)}>Perfil</Link>
            </li>
            <li>
              <Link className="hover:text-green-300 block" to="/coletores" onClick={() => setMenuOpen(false)}>Coletores</Link>
            </li>
            <li>
              <Link className="hover:text-green-300 block" to="/operadores" onClick={() => setMenuOpen(false)}>Operadores</Link>
            </li>
            <li>
              <Link className="hover:text-green-300 block" to="/mapa" onClick={() => setMenuOpen(false)}>Mapa</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  signout();
                }}
                className="hover:text-green-300 text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header;
