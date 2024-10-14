# Casa de Aposta

## Guia para Clonar e Dar Push no Repositório do GitHub Usando o VSCode

### Pré-requisitos
- **Git Instalado**: Certifique-se de que o Git está instalado na sua máquina.
- **Conta no GitHub**: Tenha uma conta no GitHub.
- **Acesso ao Repositório**: O membro deve ser adicionado como colaborador no repositório "Casa de Aposta".

---

### **Passo 1: Clonar o Repositório**

1. **Acessar o Repositório**:
   - Abra um navegador e vá até o repositório do projeto no GitHub (exemplo: `https://github.com/usuario/casa-de-aposta`).

2. **Copiar o Link do Repositório**:
   - Na página do repositório, clique no botão verde "Code".
   - Copie o link (HTTPS ou SSH).

3. **Abrir o VSCode**:
   - Inicie o Visual Studio Code.

4. **Abrir o Terminal Integrado**:
   - No VSCode, abra o terminal integrado pressionando `Ctrl + `` (ou vá em **Terminal > Novo Terminal**).

5. **Navegar até o Diretório Desejado**:
   - Use o comando `cd` no terminal para navegar até o diretório onde deseja clonar o repositório. Por exemplo:
     ```bash
     cd /caminho/para/seu/diretorio
     ```

6. **Clonar o Repositório**:
   - Execute o comando abaixo no terminal:
     ```bash
     git clone https://github.com/usuario/casa-de-aposta.git
     ```
   - Substitua pelo link que você copiou. Isso criará uma pasta chamada **casa-de-aposta**.

---

### **Passo 2: Abrir o Repositório no VSCode**

- **Abrir a Pasta do Repositório**:
  - Vá para **Arquivo > Abrir Pasta...** no VSCode e selecione a pasta **casa-de-aposta** que você acabou de clonar.

---

### **Passo 3: Criar uma Branch para Desenvolvimento**

1. **Abrir o Terminal Integrado (se ainda não estiver aberto)**:
   - Use o atalho `Ctrl + `` para abrir o terminal.

2. **Criar uma Nova Branch**:
   - No terminal, crie uma nova branch:
     ```bash
     git checkout -b feature/nome-da-sua-funcionalidade
     ```
   - Substitua **nome-da-sua-funcionalidade** por um nome descritivo para a sua branch, como **pagina-inicial**.

---

### **Passo 4: Fazer Alterações e Commitar**

1. **Fazer Alterações**:
   - Utilize o editor do VSCode para fazer as alterações no código. Você pode abrir arquivos do projeto na barra lateral esquerda e editá-los.

2. **Adicionar as Alterações**:
   - Após fazer as alterações, no terminal, use:
     ```bash
     git add .
     ```

3. **Fazer Commit das Alterações**:
   - Comite suas alterações com uma mensagem descritiva:
     ```bash
     git commit -m "Adiciona a estrutura da página inicial"
     ```

---

### **Passo 5: Sincronizar com a Branch Main**

1. **Sincronizar com a Branch Main**:
   - Primeiro, mude para a branch main:
     ```bash
     git checkout main
     ```

2. **Atualizar a branch main**:
   - Execute:
     ```bash
     git pull origin main
     ```

3. **Voltar para sua branch de funcionalidade**:
   - Execute:
     ```bash
     git checkout feature/nome-da-sua-funcionalidade
     ```

4. **Mesclar as mudanças da main na sua branch**:
   - Execute:
     ```bash
     git merge main
     ```

---

### **Passo 6: Fazer Push das Alterações**

- **Fazer Push da Branch**:
  - Após garantir que sua branch está atualizada e que suas alterações estão prontas, faça push da sua branch para o repositório remoto:
    ```bash
    git push origin feature/nome-da-sua-funcionalidade
    ```

---

### **Passo 7: Criar um Pull Request**

1. **Acessar o Repositório no GitHub**:
   - No navegador, vá para o repositório no GitHub.

2. **Criar um Pull Request**:
   - Clique na aba **Pull requests**.
   - Clique em **New pull request**.
   - Selecione sua branch e clique em **Create pull request**.
   - Adicione uma descrição clara do que foi feito e clique em **Create pull request** novamente.
