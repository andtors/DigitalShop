import { useState, useEffect } from "react"
import api from "../../utils/api"
import { useNavigate } from 'react-router-dom'
import useFlashMessage from "../../hooks/useFlashMessage"
import './EditUser.css'

const EditUser = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [cpf, setCpf] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [id, setId] = useState("")
    const navigate = useNavigate("")
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage() 


    function handleSubmit(e) {
        e.preventDefault()
        const user = {
            name,
            email,
            address,
            cpf,
            password,
            confirmPassword
        }

        editUser(user)
    }

    console.log()
    async function editUser(user) {

        let msgText = 'Informações atualizadas!'
        let msgType = 'success'

        try {
            await api.patch(`/user/edit/${id}`, user, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type' : 'application/json'
                }
            })

            navigate('/')

        } catch (error) {
            console.log(error)
            msgText = error
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)
    }

    useEffect(() => {
        api.get('/user/checkuser').then((response) => {
            setName(response.data.name)
            setEmail(response.data.email)
            setAddress(response.data.address)
            setCpf(response.data.cpf)
            setId(response.data._id)
        })
    }, [])


    return (
        <div className="main-div-register">
            <div className="form-register">
                <h1>Atualize seus dados</h1>
                <form onSubmit={handleSubmit} >
                    <label>Nome
                        <input type="text" name="name" placeholder="Digite seu nome" value={name || ''} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>E-mail
                        <input type="email" name="email" placeholder="Digite seu e-mail" value={email || ''} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>Endereço
                        <input type="text" name="address" placeholder="Digite seu endereço" value={address || ''} onChange={(e) => setAddress(e.target.value)} />
                    </label>
                    <label>CPF
                        <input type="number" name="cpf" placeholder="Digite seu CPF" value={cpf || ''} onChange={(e) => setCpf(e.target.value)} />
                    </label>
                    <label>Senha
                        <input type="password" name="password" placeholder="Digite sua senha" value={password || ''} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <label>Confirme a senha
                        <input type="password" name="confirmPassword" placeholder="Confirme sua senha" value={confirmPassword || ''} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </label>
                    <input type="submit" value="Editar" />
                </form>
            </div>
        </div>
    )
}

export default EditUser