import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Card,
  Container,
  Box,
  Paper,
  Typography,
} from "@material-ui/core";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { grey } from "@material-ui/core/colors";
import { DnDLetterTypes } from "../utils/DnDLetterType";
import {
  LettersDragNDropProvider,
  LettersDrapNDropContext,
} from "../contexts/LettersDnDContext";
import { DragDropContext } from "react-beautiful-dnd";

const ItemComponent = (props) => {
  return (
    <Paper variant="outlined">
      <Box m={2} style={{ width: "4em", height: "4em" }}>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          {props.letter}
        </Typography>
      </Box>
    </Paper>
  );
};

const DragItems = (props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DnDLetterTypes.BOX,
    item: {
      type: DnDLetterTypes.BOX,
      letter: props.letter,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(item, dropResult);
        // alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <Box
      item
      // xs={12}
      style={{ display: "flex" }}
      ref={drag}
    >
      <ItemComponent letter={props.letter} />
    </Box>
  );
};

const DropTargetOne = (props) => {
  const lettersContext = useContext(LettersDrapNDropContext);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DnDLetterTypes.BOX,
    drop: (item, monitor) => {
      console.log(item);
      lettersContext.addToTargetOne(item.letter);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Box ref={drop}>
      {props.children}
      {/* <>
        {results.map((item, index) => {
          return <ItemComponent key={item} letter={item} />;
        })}
      </> */}
    </Box>
  );
};

const DropTargetTwo = (props) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DnDLetterTypes.BOX,
    drop: (item, monitor) => {
      console.log(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return <Box ref={drop}>{props.children}</Box>;
};

const DropTarget = (props) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DnDLetterTypes.BOX,
    drop: (item, monitor) => {
      console.log(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return <Box ref={drop}>{props.children}</Box>;
};

const DragDropComponent = () => {
  const initialLetters = ["A", "B", "C", "D", "E", "F"];

  const [letters, setLetters] = useState(initialLetters);

  const lettersContext = useContext(LettersDrapNDropContext);

  return (
    <>
      <Typography>Drag and Drop letters</Typography>

      <DndProvider backend={HTML5Backend}>
        {/* <Grid container>
          <DropTarget>
            <Box m={2} p={2} style={{ backgroundColor: grey[100] }}>
              <Typography>Drop here</Typography>
            </Box>
          </DropTarget>
        </Grid> */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h4">Type One</Typography>
            <DropTargetOne>
              <Box style={{ height: "20em", backgroundColor: grey[100] }}>
                {lettersContext.targetOneLetters.map((item, index) => {
                  return <ItemComponent key={item} letter={item} />;
                })}
              </Box>
            </DropTargetOne>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4">Type Two</Typography>
            <DropTargetTwo>
              <Box style={{ height: "20em", backgroundColor: grey[100] }}></Box>
            </DropTargetTwo>
          </Grid>
        </Grid>
        <Box my={2}></Box>
        <Grid container spacing={2}>
          {lettersContext.allLetters.map((item, index) => {
            return <DragItems key={item} letter={item} />;
          })}
        </Grid>
      </DndProvider>
    </>
  );
};

const ComponentWithinContext = () => {
  return (
    <>
      <DragDropComponent />
    </>
  );
};

export default ComponentWithinContext;
