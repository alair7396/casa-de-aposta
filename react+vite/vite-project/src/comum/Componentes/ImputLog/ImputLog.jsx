
import './ImputLog.css'
import BtEntrar from '../BtEntrar/BtEntrar'


const ImputLog = () => {
    return (
        <>
        <div>
        <label className='titulo' >Login</label>
        <input className='input' type="text" placeholder='Digite seu usuario'  />
        <label className='titulo' >Senha</label>
        <input className='input' type="text" placeholder='Digite sua senha' />
        <BtEntrar className='input'/>
        </div>
        
        
        </>
    );
};

export default ImputLog;