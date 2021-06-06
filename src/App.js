import React from "react";
import DragDropComponent from "./components/DragDropComponent";
import { Container } from "@material-ui/core";
import { LettersDragNDropProvider } from "./contexts/LettersDnDContext";

function App() {
  return (
    <Container maxWidth="xl">
      <LettersDragNDropProvider>
        <DragDropComponent />
      </LettersDragNDropProvider>
    </Container>
  );
}

export default App;
