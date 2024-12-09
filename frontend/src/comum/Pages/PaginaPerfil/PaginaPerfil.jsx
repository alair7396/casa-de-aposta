import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../servicos/api";
import Avatar from "../../Componentes/Avatar/Avatar";
import { toast } from "react-toastify";
import "./PaginaPerfil.css";
import HamburgerMenu from "../../Componentes/Menu/HamburgerMenu";

const PaginaPerfil = () => {
  const [user, setUser] = useState(null);   const [compras, setCompras] = useState([]);   const [imagemUsuario, setImagemUsuario] = useState("");   const [erroCompras, setErroCompras] = useState(false);   const navigate = useNavigate();

      useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Usuário não está logado.");
        navigate("/");         return;
      }
  
      try {
        const headers = { Authorization: `Bearer ${token}` };
  
                const responseUsuario = await api.get(`/api/usuarios/perfil`, { headers });
        setUser(responseUsuario.data);   
      } catch (error) {
        if (error.response?.status === 403) {
          toast.error("Acesso negado. Verifique suas credenciais.");
          navigate("/");
        } else {
          toast.error("Erro ao carregar as informações do usuário.");
        }
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };
  
    loadUserData();
  }, [navigate]);

      useEffect(() => {
    const avatarSalvo = localStorage.getItem("avatarUsuario");
    if (avatarSalvo) {
      setImagemUsuario(avatarSalvo);
    }
  }, []);

      const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logout realizado com sucesso.");
    navigate("/");
  };

      return (
    <>
      <HamburgerMenu />
  
      <div className="perfil-container">
        {/* Avatar */}
        <div className="avatar-container">
          <Avatar nome={user?.nome || "Usuário"} perfil={true} imagem={imagemUsuario} />
        </div>
  
        {/* Dados do usuário */}
        {user ? (
          <div className="dados-usuario">
            <div className="campo">
              <label>ID do Usuário:</label>
              <input
                className="input-dado"
                type="text"
                value={user.id_usuario || ""}
                readOnly
              />
            </div>
  
            <div className="campo">
              <label>Nome:</label>
              <input
                className="input-dado"
                type="text"
                value={user.nome || ""}
                readOnly
              />
            </div>
  
            <div className="campo">
              <label>Telefone:</label>
              <input
                className="input-dado"
                type="text"
                value={user.telefone || ""}
                readOnly
              />
            </div>
  
            <div className="campo">
              <label>Email:</label>
              <input
                className="input-dado"
                type="text"
                value={user.email || ""}
                readOnly
              />
            </div>
  
            <div className="campo">
              <label>Saldo da Carteira:</label>
              <input
                className="input-dado"
                type="text"
                value={user.carteira || "0.00"}
                readOnly
              />
            </div>
  
            <div className="campo">
              <label>Data de Criação da Conta:</label>
              <input
                className="input-dado"
                type="text"
                value={new Date(user.criado_em).toLocaleString() || ""}
                readOnly
              />
            </div>
          </div>
        ) : (
          <p>Carregando informações do usuário...</p>
        )}
  
        {/* Compras */}
        <div className="campo">
          <label>Compras Realizadas</label>
          {erroCompras ? (
            <p>Erro ao carregar compras. Tente novamente mais tarde.</p>
          ) : compras.length > 0 ? (
            compras.map((compra, index) => (
              <div key={index} className="compra-card">
                <p>ID da Compra: {compra.id_compra}</p>
                <p>ID da Oferta: {compra.oferta_id}</p>
                <p>Data da Compra: {new Date(compra.data_compra).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>Não há compras realizadas.</p>
          )}
        </div>
  
        {/* Botão de Logout */}
        <button onClick={logout} className="botao-logout">
          Logout
        </button>
      </div>
    </>
  );
  
};

export default PaginaPerfil;

