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

    // Verifica se o e-mail já está cadastrado
    const usuarioExistente = usuariosDoLocalStorage.find((u) => u.email === usuario.email);
    if (usuarioExistente) {
      throw new Error('Usuário com este e-mail já está cadastrado.');
    }

    // Adiciona o papel (role) padrão como 'user' caso não seja fornecido
    const usuarioComRole = {
      ...usuario,
      role: usuario.role || 'user',
    };

    usuariosDoLocalStorage.push(usuarioComRole);
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

  // Atualiza o papel (role) de um usuário com base no e-mail
  atualizarRoleUsuario(email, novoRole) {
    const usuarios = this.listar();
    const usuarioIndex = usuarios.findIndex((u) => u.email === email);
    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].role = novoRole;
      localStorage.setItem('lista-usuarios', JSON.stringify(usuarios));
    } else {
      throw new Error('Usuário não encontrado.');
    }
  }

  // Retorna todos os usuários
  buscarUsuarios() {
    return this.listar();
  }

  // Função para deletar um usuário pelo e-mail
  deletarUsuario(email) {
    const usuarios = this.listar();
    const usuariosAtualizados = usuarios.filter((user) => user.email !== email);
    localStorage.setItem('lista-usuarios', JSON.stringify(usuariosAtualizados));
  }
}

export default ServicoUsuarios;

