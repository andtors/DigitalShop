import { Link } from "react-router-dom"

import './Navbar.css'

const Navbar = () => {
  return (
   <nav>
    <div>
        <h2>
            DigitalShop
        </h2>
    </div>
    <ul>
        <li>
            <Link to="/">Produtos</Link>
        </li>
        <li>
            <Link to="/login">Entrar</Link>
        </li>
        <li>
            <Link to="/register">Cadastrar</Link>
        </li>
    </ul>
   </nav>
  )
}

export default Navbar