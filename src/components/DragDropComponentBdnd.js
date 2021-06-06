import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Container,
  Box,
  Paper,
  Typography,
} from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DragDropComponent = () => {
  const initialLetters = ["A", "B", "C", "D", "E", "F"];

  const [letters, setLetters] = useState(initialLetters);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    console.log("on drag end");
    console.log(result);

    const items = Array.from(letters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLetters(items);
  };

  return (
    <>
      <Typography>Drag and Drop letters</Typography>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="letters" direction="horizontal">
          {(provided) => (
            <Grid
              container
              spacing={2}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {letters.map((item, index) => {
                return (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <Grid
                        item
                        // xs={12}
                        style={{ display: "flex" }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Paper elevation={3}>
                          <Box my={2} style={{ width: "4em", height: "4em" }}>
                            <Typography
                              variant="h3"
                              style={{ textAlign: "center" }}
                            >
                              {item}
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>

        <Droppable droppableId="letters_res" direction="horizontal">
          {(provided) => (
            <Grid
              container
              spacing={2}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {letters.map((item, index) => {
                return (
                  <Grid
                    item
                    // xs={12}
                    style={{ display: "flex" }}
                  >
                    <Paper elevation={3}>
                      <Box my={2} style={{ width: "4em", height: "4em" }}>
                        <Typography
                          variant="h3"
                          style={{ textAlign: "center" }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default DragDropComponent;
