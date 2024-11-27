import ServicoUsuarios from './ServicoUsuarios';

const instanciaServicoUsuarios = new ServicoUsuarios();

class ServicoAutenticacao {
  login(email, senha) {
    const usuariosDoLocalStorage = instanciaServicoUsuarios.listar();

    const usuarioLogado = usuariosDoLocalStorage.find((u) => u.email === email);

    if (!usuarioLogado) {
      throw new Error('Usuário não encontrado.');
    }

    if (usuarioLogado.senha !== senha) {
      throw new Error('Senha incorreta.');
    }

    localStorage.setItem('usuario-logado', JSON.stringify(usuarioLogado));

    return usuarioLogado;
  }

  buscarUsuarioLogado() {
    return JSON.parse(localStorage.getItem('usuario-logado') ?? null);
  }

  sair() {
    localStorage.removeItem('usuario-logado');
  }
}

export default new ServicoAutenticacao();
