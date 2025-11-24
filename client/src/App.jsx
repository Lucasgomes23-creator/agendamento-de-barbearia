import React from 'react';
import BookingForm from './components/BookingForm';

function App() {
  return (
    <div className="app-container">
      <header style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>BARBER SHOP</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          Estilo e Tradição para o Homem Moderno
        </p>
      </header>

      <main className="container">
        <BookingForm />
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        marginTop: '4rem',
        borderTop: '1px solid #333',
        color: 'var(--text-secondary)'
      }}>
        <p>&copy; 2025 Barber Shop. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
