import { AuthProvider } from "./context/Authcontext";
import AppRouter from "./AppRouter";
import { TokenProvider } from "./context/TokenContext";

function App() {
  return (
    <TokenProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </TokenProvider>
  );
}

export default App;
