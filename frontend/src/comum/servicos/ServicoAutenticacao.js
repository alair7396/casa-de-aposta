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

    // Adiciona o nome e o papel (role) ao usuário logado
    const usuarioComInfo = {
      email: usuarioLogado.email,
      nome: usuarioLogado.nome, // Adiciona o nome do usuário
      role: usuarioLogado.role || 'user', // Define 'user' como padrão se o papel não existir
    };

    // Salva no localStorage
    localStorage.setItem('usuario-logado', JSON.stringify(usuarioComInfo));

    return usuarioComInfo;
  }

  buscarUsuarioLogado() {
    return JSON.parse(localStorage.getItem('usuario-logado')) || null;
  }

  sair() {
    localStorage.removeItem('usuario-logado');
  }
}

export default new ServicoAutenticacao();

