import React, {useState,useEffect} from "react";
import Home from "./components/Home";
import Logueo from "./components/Logueo";

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
  return <>{usuarioGlobal ? <Home/> : <Logueo/>}</>;
}

export default App;
