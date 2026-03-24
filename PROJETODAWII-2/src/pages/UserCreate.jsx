import { useState } from "react";
import api from "../services/api";
import "../styles/form.css";

function UserCreate() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/users", {
                nome: nome,
                email: email,
                senha: senha,
            })

            console.log("Resposta da API:", response.data)

            setNome("");
            setEmail("");
            setSenha("");
            alert("Usuário criado com sucesso");
        } catch (error) {
            console.log("Erro: ", error.response?.data || error.message);
            alert("Erro ao criar o usuário.");
        }
    }

    return (
        <div className="create-container">
            <h2>Criar Usuário</h2>
            <form className="create-form" onSubmit={handleSubmit}>
                 <div className="form-row">
                 <label>Nome</label>
                 <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required/>
                 </div>
                 <div className="form-row">
                 <label>Email</label>
                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                 </div>
                 <div className="form-row">
                 <label>Senha</label>
                 <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
                 </div>
                 <div className="form.row button.row">
                    <button type="submit">Criar</button>
                 </div>
            </form>
        </div>
    );
}

export default UserCreate