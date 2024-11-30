import React from 'react';
import { useEmprunt } from '../context/EmpruntContext';

const LivresEmpruntes = () => {
  const { emprunts, returnLivre } = useEmprunt();

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Livres Empruntés</h2>
      {emprunts.length === 0 ? (
        <p className="text-muted text-center">Aucun livre emprunté pour le moment.</p>
      ) : (
        <ul className="list-group">
          {emprunts.map((livre) => (
            <li key={livre.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                <strong>{livre.titre}</strong> par {livre.auteur}
              </span>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LivresEmpruntes;
