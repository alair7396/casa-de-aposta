
import './ImputLog.css'
import BtEntrar from '../BtEntrar/BtEntrar'


const ImputLog = () => {
    return (
        <>
        <input type="text" placeholder='Digite seu usuario' />
        <input type="text" placeholder='Digite sua senha' />
        <BtEntrar/>
        </>
    );
};

export default ImputLog;