


import './InputCadastro.css'
import BtCadastrar from '../BtCadastrar/BtCadastrar';


const InputCadastro = () => {
    return (
        <>
        <div>
        <label className='titulo' >Nome</label>
        <input className='input' type="text" placeholder='Digite seu nome'  />
        <label className='titulo' >Email</label>
        <input className='input' type="text" placeholder='Digite sua email' />
        <label className='titulo' >Telefone</label>
        <input className='input' type="text" placeholder='Digite seu telefone'  />
        <label className='titulo' >Senha</label>
        <input className='input' type="text" placeholder='Crie sua senha' />
        <label className='titulo' >Confirma sua senha</label>
        <input className='input' type="text" placeholder='Confirme sua senha'  />
        <BtCadastrar></BtCadastrar>
        </div>
        </>
    );
};

export default InputCadastro;