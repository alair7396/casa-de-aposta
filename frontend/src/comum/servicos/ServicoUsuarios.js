class ServicoUsuarios {
  listar() {
    const usuariosDoLocalStorage = localStorage.getItem('lista-usuarios');
    if (usuariosDoLocalStorage) {
      return JSON.parse(usuariosDoLocalStorage);
    }
    return [];
  }

  cadastrarUsuario(usuario) {
    const usuariosDoLocalStorage = this.listar();
    usuariosDoLocalStorage.push(usuario);
    localStorage.setItem('lista-usuarios', JSON.stringify(usuariosDoLocalStorage));
  }

  obterSaldoUsuario(email) {
    const usuarios = this.listar();
    const usuario = usuarios.find((u) => u.email === email);
    return usuario ? usuario.carteira || 0 : 0;
  }

  atualizarSaldoUsuario(email, novoSaldo) {
    const usuarios = this.listar();
    const usuarioIndex = usuarios.findIndex((u) => u.email === email);
    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].carteira = novoSaldo;
      localStorage.setItem('lista-usuarios', JSON.stringify(usuarios));
    }
  }
}

export default ServicoUsuarios;
