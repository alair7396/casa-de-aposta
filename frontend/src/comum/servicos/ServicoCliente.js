class ServicoCliente {
  listar() {
    const clientesDoLocalStorage = localStorage.getItem(
      'lista-clientes'
    );
    if (clientesDoLocalStorage) {
      return JSON.parse(clientesDoLocalStorage);
    }

    return [];
  }

  cadastrarCliente(novoCliente) {
    const clientesDoLocalStorage = this.listar();
    clientesDoLocalStorage.push(novoCliente);
    localStorage.setItem(
      'lista-clientes',
      JSON.stringify(clientesDoLocalStorage)
    );
  }

  editarCliente(cliente) {
    const clientesDoLocalStorage = this.listar();
    const indexCliente = clientesDoLocalStorage.findIndex(
      (c) => c.id === +cliente.id
    );
    clientesDoLocalStorage[indexCliente] = cliente;
    localStorage.setItem(
      'lista-clientes',
      JSON.stringify(clientesDoLocalStorage)
    );
  }

  buscarPorId(idCliente) {
    const clientesDoLocalStorage = this.listar();
    return clientesDoLocalStorage.find(
      (c) => c.id === +idCliente
    );
  }

  excluirCliente(idCliente) {
    const clientesDoLocalStorage = this.listar();

    const listaAtualizada = clientesDoLocalStorage.filter(
      (c) => {
        return c.id !== idCliente;
      }
    );

    localStorage.setItem(
      'lista-clientes',
      JSON.stringify(listaAtualizada)
    );
    return listaAtualizada;
  }
}

export default ServicoCliente;
