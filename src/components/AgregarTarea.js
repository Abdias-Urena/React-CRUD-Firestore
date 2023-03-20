import React from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

const AgregarTarea = ({ arrayTareas, correoUsuario, setArrayTarea }) => {
  async function annadirTarea(e) {
    e.preventDefault();
    const descripcion = e.target.FormDescripcion.value;
    //crear nuevo array de tareas
    const newArrayTarea = [
      ...arrayTareas,
      {
        id: +new Date(),
        descripcion: descripcion,
        url: "https://picsum.photos/420",
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
  return (
    <Container>
      <Form onSubmit={annadirTarea}>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Describe tu tarea"
              id="FormDescripcion"
            />
          </Col>
          <Col>
            <Form.Control type="file" placeholder="Annade archivo" />
          </Col>
          <Col>
            <Button type="submit">Agregar Tarea</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AgregarTarea;
