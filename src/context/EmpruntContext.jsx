import React, { createContext, useState, useContext } from 'react';

const EmpruntContext = createContext();

export const useEmprunt = () => useContext(EmpruntContext);

export const EmpruntProvider = ({ children }) => {
  const [emprunts, setEmprunts] = useState([]);

  const empruntLivre = (livre) => {
    if (livre.disponible) {
      setEmprunts([...emprunts, { ...livre, disponible: false }]);
      return true;
    }
    return false;
  };

  const returnLivre = (id) => {
    setEmprunts(emprunts.filter(livre => livre.id !== id));
  };

  return (
    <EmpruntContext.Provider value={{ emprunts, empruntLivre, returnLivre }}>
      {children}
    </EmpruntContext.Provider>
  );
};

