import './Cabecalho.css';

function Cabecalho() {
  return (
    <header className="cabeca">
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://t.me/SeuCanal" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-telegram"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>

      </div>
    </header>
  );
}

export default Cabecalho;
