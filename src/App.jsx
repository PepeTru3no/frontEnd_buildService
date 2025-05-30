import { AuthProvider } from "./context/Authcontext";
import AppRouter from "./AppRouter";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
