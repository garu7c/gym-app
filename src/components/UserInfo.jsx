import { useEffect, useState } from "react";

export default function UserInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/.auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.clientPrincipal) {
          setUser(data.clientPrincipal);
        }
      });
  }, []);

  if (!user) return <p>No has iniciado sesión</p>;

  return (
    <div>
      <h3>Bienvenido {user.userDetails}</h3>
      <p>Proveedor: {user.identityProvider}</p>
    </div>
  );
}
