import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { proposals } from '../data/config';
import './Dashboard.css';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('andrea_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'andrea2026') {
      localStorage.setItem('andrea_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('andrea_auth');
    setIsAuthenticated(false);
  };

  const copyToClipboard = (slug) => {
    const url = `${window.location.origin}/proposta/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copiado para a área de transferência!');
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="dashboard-login">
        <form onSubmit={handleLogin} className="login-form glass">
          <img src="/favicon.svg" alt="Andréa Esteves" width="40" />
          <h2>Acesso Restrito</h2>
          <p>Digite a senha para acessar suas propostas.</p>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <span className="error">{error}</span>}
          <button type="submit" className="btn-primary">Entrar</button>
        </form>
      </div>
    );
  }

  const allProposals = Object.values(proposals);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo-area">
          <img src="/favicon.svg" alt="Andréa Esteves" width="30" />
          <h1>Painel de Propostas</h1>
        </div>
        <button onClick={handleLogout} className="btn-logout">Sair</button>
      </header>

      <main className="dashboard-main">
        <div className="proposals-grid">
          {allProposals.map((prop) => (
            <div key={prop.id} className="proposal-card glass">
              <div className="proposal-card-header">
                <h3>{prop.client.name}</h3>
                <span className="date-badge">{prop.date}</span>
              </div>
              <p className="proposal-desc">{prop.client.specialty}</p>
              <div className="proposal-actions">
                <Link to={`/proposta/${prop.id}`} className="btn-view">Visualizar</Link>
                <button onClick={() => copyToClipboard(prop.id)} className="btn-copy">Copiar Link</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
