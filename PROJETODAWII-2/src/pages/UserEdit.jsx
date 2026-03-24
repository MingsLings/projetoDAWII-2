import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/form.css";

function UserEdit () {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/users`);
                const user = response.data.find((u) => u.id === id);
                if (user) {
                    setNome(user.nome);
                    setEmail(user.email);
                    setSenha(user.senha);
                } else {
                    alert("Usuário não encontrado.");
                    navigate("/users");
                }
            } catch (error) {
                console.error("Erro ao buscar usuário: ", error.response?.data || error.message);
                alert("Erro ao buscar o usuário.");
            }
        };
        fetchUser();
    }, [id]);
}

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await api.put(`/users/${id}`, {
            nome: nome,
            email: email,
            senha: senha,
        });
        
        alert("Usuário atualizado com sucesso");
        navigate("/users");
    } catch (error) {
        console.error("Erro: ", error.response?.data || error.message);
        alert("Erro ao atualizar o usuário.");
    }

    return (
        <div className="create-container">
            <h2>Editar Usuário</h2>
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
                <div className="form-row button-row">
                    <button type="submit">Atualizar</button>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;