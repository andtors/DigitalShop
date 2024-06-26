import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import {Context} from '../../context/UserContext'
import './Register.css'

const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [cpf, setCpf] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const {register} = useContext(Context)

  function handleSubmit (e) {
    e.preventDefault()
    const user = {
      name, 
      email,
      address,
      cpf,
      password,
      confirmPassword
    }

    register(user)
  }

  return (
    <div className="main-div-register">
      <div className="form-register">
      <h1>Realize o cadastro para comprar no site!</h1>
        <form onSubmit={handleSubmit} >
            <label>Nome
            <input type="text" name="name" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>E-mail
            <input type="email" name="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>Endereço
            <input type="text" name="address" placeholder="Digite seu endereço" value={address} onChange={(e) => setAddress(e.target.value)}/>
            </label>
            <label>CPF
            <input type="number" name="cpf" placeholder="Digite seu CPF" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
            </label>
            <label>Senha
            <input type="password" name="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <label>Confirme a senha
            <input type="password" name="confirmPassword" placeholder="Confirme sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>
            <input type="submit" value="Cadastrar"/>
        </form>
        <p>Já possui conta? <Link to="/login" className="login-redirect">Clique aqui!</Link> para entrar.</p>
        </div>
    </div>
  )
}

export default Register