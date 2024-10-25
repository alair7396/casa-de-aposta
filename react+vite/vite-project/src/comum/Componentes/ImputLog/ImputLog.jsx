
import './ImputLog.css'
import BtEntrar from '../BtEntrar/BtEntrar'


const ImputLog = () => {
    return (
        <>
        <div >
        <label className='titulo' style={{ top: '314px', left: '170px', position: 'absolute' }}>Login</label>
        <input className='login-input' type="text" placeholder='Digite seu usuario' style={{ top: '345px', left: '72px' }} />
        <label className='titulo' style={{ top: '411px', left: '170px', position: 'absolute' }}>Senha</label>
        <input className='login-input' type="text" placeholder='Digite sua senha' style={{ top: '442px', left: '72px' }}/>
        </div>
        
        <BtEntrar/>
        </>
    );
};

export default ImputLog;