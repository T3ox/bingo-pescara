import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Pagina non trovata</h1>
      <p>La pagina che cerchi non esiste.</p>
      <Link to="/">Torna alla home</Link>
    </div>
  );
}
