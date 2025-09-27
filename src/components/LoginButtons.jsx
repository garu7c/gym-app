export default function LoginButtons() {
  const loginWithGitHub = () => {
    window.location.href = "/.auth/login/github";
  };

  const loginWithGoogle = () => {
    window.location.href = "/.auth/login/google";
  };

  const logout = () => {
    window.location.href = "/.auth/logout";
  };

  return (
    <div className="flex gap-2">
      <button onClick={loginWithGitHub}>Iniciar con GitHub</button>
      <button onClick={loginWithGoogle}>Iniciar con Google</button>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
