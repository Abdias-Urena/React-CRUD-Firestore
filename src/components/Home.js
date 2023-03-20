import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";

import AgregarTarea from "./AgregarTarea";
import ListadoTarea from "./ListadoTarea";

import firebaseApp from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {
  const [arrayTareas, setArrayTarea] = useState(null);
  const fakeData = [
    { id: 1, descripcion: "tarea falsa 1", url: "https://picsum.photos/420" },
    { id: 2, descripcion: "tarea falsa 2", url: "https://picsum.photos/420" },
    { id: 3, descripcion: "tarea falsa 3", url: "https://picsum.photos/420" },
  ];

  async function buscarDocOrMakeDoc(idDocumento) {
    //crear referencia al doc
    const docRef = doc(firestore, `usuarios/${idDocumento}`);
    // buscar doc
    const consulta = await getDoc(docRef);
    // revisa si exite
    if (consulta.exists()) {
      // si si existe
      const infoDoc = consulta.data();
      return infoDoc.tareas;
    } else {
      //si no existe
      await setDoc(docRef, { tareas: [...fakeData] });
      const consulta = await getDoc(docRef);
      const infoDoc = consulta.data();
      return infoDoc.tareas;
    }
  }

  useEffect(() => {
    async function fetchTarea() {
      const tareasFetchs = await buscarDocOrMakeDoc(correoUsuario);
      setArrayTarea(tareasFetchs);
    }
    fetchTarea();
  }, []);

  return (
    <Container>
      <h4>Hola, sesion iniciada</h4>
      <Button onClick={() => signOut(auth)}>Cerrar Sesion</Button>
      <hr />
      <AgregarTarea />
      {arrayTareas ? (
        <ListadoTarea
          arrayTareas={arrayTareas}
          setArrayTarea={setArrayTarea}
          correoUsuario={correoUsuario}
        />
      ) : null}
    </Container>
  );
};

export default Home;
