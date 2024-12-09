import React from "react";
import "./Avatar.css";

const Avatar = ({ nome = "", perfil, imagem }) => {
 
  const inicial = nome ? nome.charAt(0).toUpperCase() : "?";

  return (
    <div className={`avatar ${perfil ? "perfil" : ""}`}>
      {imagem ? (
        <img src={imagem} alt="Avatar" />
      ) : (
        <span>{inicial}</span>
      )}
    </div>
  );
};

export default Avatar;
