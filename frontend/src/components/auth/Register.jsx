import { useState } from "react"
import { Link } from "react-router-dom"
const url = import.meta.env.VITE_API_BACK

import './Register.css'
const Register = () => {
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [cpf, setCpf] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

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

    createUser(user)
  }

  const createUser = async(user) => {
  
    try {
      
      const response = await fetch(`${url}/user/register`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(user)
      })

      const data = await response.json()

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="form-register">
      <h1>Realize o cadastro para acessar o site!</h1>
        <form onSubmit={handleSubmit} >
            <div>
            <label>Nome:</label>
            <input type="text" name="name" placeholder="Digite seu nome:" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
            <label>E-mail:</label>
            <input type="email" name="email" placeholder="Digite seu e-mail:" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
            <label>Endereço:</label>
            <input type="text" name="address" placeholder="Digite seu endereço:" value={address} onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <div>
            <label>CPF:</label>
            <input type="number" name="cpf" placeholder="Digite seu CPF:" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
            </div>
            <div>
            <label>Senha:</label>
            <input type="password" name="password" placeholder="Digite sua senha:" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
            <label>Confirme a senha:</label>
            <input type="password" name="confirmPassword" placeholder="Digite novamente sua senha:" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <input type="submit" value="Cadastrar"/>
        </form>
        <p>Já possui conta? <Link to="/login">Clique aqui!</Link> para entrar.</p>
    </div>
  )
}

export default Register