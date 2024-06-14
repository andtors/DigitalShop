import { useContext } from "react"

import { Link } from "react-router-dom"

import { Context } from '../../context/UserContext'

import './Navbar.css'

const Navbar = () => {
    const { authenticated, logout } = useContext(Context)
    return (
        <nav className="navbar">
            <div>
                <h2>
                    DigitalShop
                </h2>
            </div>

            <ul>
                <li>
                    <Link className="navbar-link" to="/">Produtos</Link>
                </li>
                {authenticated ? (<>
                    <li>
                        <Link className="navbar-link" to="/cart">Carrinho</Link>
                    </li>
                    <li>
                        <Link className="navbar-link" to="/orders">Ordens</Link>
                    </li>
                    <li>
                        <Link className="navbar-link" to="/edituser">Usuario</Link>
                    </li>
                    <li onClick={logout} className="logout-btn">
                        Sair
                    </li>
                </>
                ) : (<>
                    <li>
                        <Link className="navbar-link" to="/login">Entrar</Link>
                    </li>
                    <li>
                        <Link className="navbar-link" to="/register">Cadastrar</Link>
                    </li>
                </>)}
            </ul>

        </nav>
    )
}

export default Navbar