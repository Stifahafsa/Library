import React from 'react';
import { EmpruntProvider } from './context/EmpruntContext';
import ListLivre from './components/ListLivre';
import LivreEmprunts from './components/LivreEmprunts';

function App() {
  return (
    <EmpruntProvider>
      <div className="App">
      <h1 class="text-center my-4 text-secondary">Gestion des emprunts de la bibliothèque</h1>
        <ListLivre />
        <LivreEmprunts />
      </div>
    </EmpruntProvider>
  );
}

export default App;

