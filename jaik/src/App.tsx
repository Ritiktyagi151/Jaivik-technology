// import { useEffect } from "react";
import AppProvider from "./providers/AppProvider";
import Routing from "./routing/Routing";

function App() {
  return (
    <AppProvider>
      <Routing />
    </AppProvider>
  );
}

export default App;