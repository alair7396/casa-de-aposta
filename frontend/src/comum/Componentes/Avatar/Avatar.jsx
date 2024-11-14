import './Avatar.css';

const Avatar = (props) => {
  const [primeiroNome, segundoNome] = props.nome.split(' ');

  const iniciais = segundoNome ? primeiroNome[0] + segundoNome[0] : primeiroNome[0];

  return (
    <div className={props.perfil ? 'avatar_perfil' : 'avatar_root'}>
      {props.imagem ? <img src={props.imagem} width="100%" style={{ borderRadius: '50%' }} /> : iniciais}
    </div>
  );
};

export default Avatar;
