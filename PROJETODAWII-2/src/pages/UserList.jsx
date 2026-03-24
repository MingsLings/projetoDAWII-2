import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/list.css";

function UserList() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await api.get("/users");
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    
    const deleteUser = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir esta porra deste usuário?");
        if (!confirmDelete) {return;}
        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
            alert("Usuário excluído com sucesso");
        } catch (error) {
            console.error("Erro ao excluir usuário: ", error.response?.data || error.message);
            alert("Erro ao excluir o usuário.");
        }
    };

    return (
        <div className="container">
            <h2>Lista de Usuários</h2>
            {users.length === 0 && <p>Nenhum usuário encontrado.</p>}
            {users.map((user) => (
                <div key={user.id} className="card">
                    <div>
                        <strong>{user.nome}</strong>
                        <p>{user.email}</p>
                    </div>
                    <div className="actions">
                        <Link to={`/users/edit/${user._id}`}><button className="edit-btn">Editar</button></Link>
                        <button onClick={() => deleteUser(user._id)} className="delete-btn">Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default UserList;