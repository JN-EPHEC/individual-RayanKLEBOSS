import { useEffect, useState } from "react";
import "./App.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

function App() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/data")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les utilisateurs");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>Liste des utilisateurs</h1>

      {loading && <p className="loading">Chargement...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p>Aucun utilisateur trouvé.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <ul className="user-list">
          {data.map((user) => (
            <li key={user.id} className="user-card">
              <span className="avatar">
                {user.firstName.charAt(0).toUpperCase()}
                {user.lastName.charAt(0).toUpperCase()}
              </span>

              <div className="user-info">
                <p className="name">
                  {user.firstName} {user.lastName}
                </p>
                <p className="id">ID : {user.id}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
