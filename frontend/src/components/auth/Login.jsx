import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import {Context} from '../../context/UserContext'
import './Login.css'
const url = import.meta.env.VITE_API_BACK

const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {login} = useContext(Context)

  function handleSubmit (e) {
    e.preventDefault()
    const user = {
      email,
      password
    }

    login(user)
  }

  return (
    <div className="form-login">
      <h1>Realize o cadastro para acessar o site!</h1>
        <form onSubmit={handleSubmit} >
            <div>
            <label>E-mail:</label>
            <input type="email" name="email" placeholder="Digite seu e-mail:" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
            <label>Senha:</label>
            <input type="password" name="password" placeholder="Digite sua senha:" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <input type="submit" value="Entrar"/>
        </form>
        <p>Não possui conta? <Link to="/register">Clique aqui!</Link> para se cadastrar.</p>
    </div>
  )
}

export default Register