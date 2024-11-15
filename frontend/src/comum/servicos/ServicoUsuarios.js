class ServicoUsuarios {
  // Retorna a lista de usuários armazenados no localStorage
  listar() {
    const usuariosDoLocalStorage = localStorage.getItem('lista-usuarios');
    if (usuariosDoLocalStorage) {
      return JSON.parse(usuariosDoLocalStorage);
    }
    return [];
  }

  // Cadastra um novo usuário no localStorage
  cadastrarUsuario(usuario) {
    const usuariosDoLocalStorage = this.listar();
    usuariosDoLocalStorage.push(usuario);
    localStorage.setItem('lista-usuarios', JSON.stringify(usuariosDoLocalStorage));
  }

  // Obtém o saldo de um usuário com base no e-mail
  obterSaldoUsuario(email) {
    const usuarios = this.listar();
    const usuario = usuarios.find((u) => u.email === email);
    return usuario ? usuario.carteira || 0 : 0;
  }

  // Atualiza o saldo de um usuário com base no e-mail
  atualizarSaldoUsuario(email, novoSaldo) {
    const usuarios = this.listar();
    const usuarioIndex = usuarios.findIndex((u) => u.email === email);
    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].carteira = novoSaldo;
      localStorage.setItem('lista-usuarios', JSON.stringify(usuarios));
    }
  }

  // Retorna todos os usuários
  buscarUsuarios() {
    return this.listar();
  }

  // Função para deletar um usuário pelo e-mail
  deletarUsuario(email) {
    const usuarios = this.listar();
    const usuariosAtualizados = usuarios.filter(user => user.email !== email);
    localStorage.setItem('lista-usuarios', JSON.stringify(usuariosAtualizados));
  }
}

export default ServicoUsuarios;
