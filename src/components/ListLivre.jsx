import React, { useState, useEffect } from 'react';
import { fetchLivres } from '../services/api';
import { useEmprunt } from '../context/EmpruntContext';
import Message from './Message';

const ListLivre = () => {
  const [livres, setLivres] = useState([]);
  const [message, setMessage] = useState(null);
  const { empruntLivre, returnLivre, emprunts } = useEmprunt();

  useEffect(() => {
    const getLivres = async () => {
      try {
        const data = await fetchLivres();
        setLivres(data);
      } catch (error) {
        setMessage({ text: 'Erreur lors du chargement des livres', type: 'error' });
        clearMessage();
      }
    };
    getLivres();
  }, []);

  const clearMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 2000); 
  };

  const handleEmprunt = (livre) => {
    if (empruntLivre(livre)) {
      // Mettre à jour la disponibilité du livre dans l'état
      setLivres((prevLivres) => 
        prevLivres.map((l) =>
          l.id === livre.id ? { ...l, disponible: false } : l
        )
      );
      setMessage({ text: 'Livre emprunté avec succès', type: 'success' });
    } else {
      setMessage({ text: 'Ce livre n\'est pas disponible', type: 'error' });
    }
    clearMessage();
  };

  const handleReturn = (livreId) => {
    returnLivre(livreId);
    // Mettre à jour la disponibilité du livre lors du retour
    setLivres((prevLivres) => 
      prevLivres.map((l) =>
        l.id === livreId ? { ...l, disponible: true } : l
      )
    );
    setMessage({ text: 'Livre retourné avec succès', type: 'success' });
    clearMessage();
  };

  return (
    <div className="container mt-4">
      {message && <Message message={message.text} type={message.type} />}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Disponibilité</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {livres.map((livre) => (
            <tr key={livre.id}>
              <td>{livre.titre}</td>
              <td>{livre.auteur}</td>
              <td>{livre.disponible ? 'Disponible' : 'Non Disponible'}</td>
              <td>
                {livre.disponible && !emprunts.some((e) => e.id === livre.id) && (
                  <button 
                    className="btn btn-success btn-sm" 
                    onClick={() => handleEmprunt(livre)}
                  >
                    Emprunter
                  </button>
                )}
                {emprunts.some((e) => e.id === livre.id) && (
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleReturn(livre.id)}
                  >
                    Rendre
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListLivre;
