"use client";
import { useBoardStore } from "@/store/boardStore";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { toast } from "react-toastify";
const Board = () => {
  const { getboard, board, updateBoardState,updateTodoInDB} = useBoardStore();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const board = await getboard();
        setData(board);
      } catch (error) {
        console.log(error)
        toast.error("Backend Server Error!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
      }
    };
    fetchData();
  }, [getboard]);
  console.log(board)
  const handleDragEnd = (results) => {
    // reording logic
    const { destination, source, type } = results;
    // if drag outside the board
    if (!destination) {
      return;
    }
    //Handle column dragging logic
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangeColumns = new Map(entries);
      updateBoardState({
        ...board,
        columns: rearrangeColumns,
      });
    }
    const columns=Array.from(board.columns)
    const startColumnIndex=columns[Number(source.droppableId)]
    const finishColumnIndex=columns[Number(destination.droppableId)]
    const startCol={
      id:startColumnIndex[1].id,
      todos:startColumnIndex[1].todos,
    }
    const finishCol={
      id:finishColumnIndex[1].id,
      todos:finishColumnIndex[1].todos,
    }
    if(!startCol || !finishCol){
      return
    }
    if(source.index===destination.index && startCol===finishCol){
      return
    }
    const newStartTodos=startCol.todos
    const [todoMoved]=newStartTodos.splice(source.index,1)
    if(startCol.id===finishCol.id){
      newStartTodos.splice(destination.index,0,todoMoved)
      const newStartCol={
        id:startCol.id,
        todos:newStartTodos,
      }
      const newColumns=new Map(board.columns)
      newColumns.set(startCol.id,newStartCol)
      updateBoardState({...board,columns:newColumns})
    }else{
      const newFinishTodos=finishCol.todos
      newFinishTodos.splice(destination.index,0,todoMoved)
      const newStartCol={
        id:startCol.id,
        todos:newStartTodos,
      }
      const newFinishCol={
        id:finishCol.id,
        todos:newFinishTodos,
      }
      const newColumns=new Map(board.columns)
      newColumns.set(startCol.id,newStartCol)
      newColumns.set(finishCol.id,newFinishCol)
      updateTodoInDB(todoMoved,finishCol.id)
      updateBoardState({...board,columns:newColumns})
    }
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto max-w-7xl p-20"
          >
            {board &&
              Array.from(board.columns.entries()).map(([id, column], index) => {
                return (
                  <Column key={id} id={id} todos={column.todos} index={index} />
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
