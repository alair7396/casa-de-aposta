
import './ImputLog.css'
import BtEntrar from '../BtEntrar/BtEntrar'


const ImputLog = () => {
    return (
        <>
        <div className='fundoImput'>
        <label className='titulo' >Loguin</label>
        <input className='input' type="text" placeholder='Digite seu usuario'  />
        <label className='titulo' >Senha</label>
        <input className='input' type="text" placeholder='Digite sua senha' />
        <BtEntrar/>
        </div>
        </>
    );
};

export default ImputLog;