import React from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

const ListadoTarea = ({ arrayTareas, correoUsuario, setArrayTarea }) => {
  async function eliminarTarea(idTareaAEliminar) {
    // crear nuevo array de tareas
    const newArrayTarea = arrayTareas.filter(
      (objectoTarea) => objectoTarea.id !== idTareaAEliminar
    );
    // actualizar base de datos
    const docRef = doc(firestore, `usuarios/${correoUsuario}`);
    updateDoc(docRef, { tareas: [...newArrayTarea] });
    // actualizar state
    setArrayTarea(newArrayTarea);
  }
  return (
    <Container>
      <Stack>
        {arrayTareas.map((objectoTarea) => {
          return (
            <>
              <Row>
                <Col>{objectoTarea.descripcion}</Col>
                <Col>
                  <a href={objectoTarea.url}>
                    <Button variant="secondary">Ver archivo</Button>
                  </a>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={() => {
                      eliminarTarea(objectoTarea.id);
                    }}
                  >
                    Eliminar Tarea
                  </Button>
                </Col>
              </Row>
              <hr />
            </>
          );
        })}
      </Stack>
    </Container>
  );
};

export default ListadoTarea;
