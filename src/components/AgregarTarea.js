import React from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const AgregarTarea = ({ arrayTareas, correoUsuario, setArrayTarea }) => {
  let urlDescarga;
  async function annadirTarea(e) {
    e.preventDefault();
    const descripcion = e.target.FormDescripcion.value;
    //crear nuevo array de tareas
    const newArrayTarea = [
      ...arrayTareas,
      {
        id: +new Date(),
        descripcion: descripcion,
        url: urlDescarga,
      },
    ];
    // actualizar base de datos
    const docRef = doc(firestore, `usuarios/${correoUsuario}`);
    updateDoc(docRef, { tareas: [...newArrayTarea] });
    //actualizar el estado
    setArrayTarea(newArrayTarea);
    // limpiar form
    e.target.FormDescripcion.value = "";
  }
  async function fileHandler(e) {
    //detectar el archivo
    const archivoLocal = e.target.files[0];
    //cargarlo a firebase storage
    const archivoRef = ref(storage, `documentos/${archivoLocal.name}`);
    await uploadBytes(archivoRef, archivoLocal);
    //obtener url de descarga
    urlDescarga = await getDownloadURL(archivoRef);
  }
  return (
    <Container>
      <Form onSubmit={annadirTarea}>
        <Row className="mb-5">
          <Col>
            <Form.Control
              type="text"
              placeholder="Describe tu tarea"
              id="FormDescripcion"
            />
          </Col>
          <Col>
            <Form.Control
              type="file"
              placeholder="Annade archivo"
              onChange={fileHandler}
            />
          </Col>
          <Col>
            <Button type="submit">Agregar Tarea</Button>
          </Col>
        </Row>
      </Form>
      <hr />
    </Container>
  );
};

export default AgregarTarea;
