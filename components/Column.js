"use client";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { useBoardStore } from "@/store/boardStore";
import { useModalStore } from "@/store/ModalStore";
const Column = ({ key, id, todos, index }) => {
  const { searchString,setaddTaskType } = useBoardStore();
  const{openModal}=useModalStore()
  const idToColumnText = {
    todo: "To Do",
    inprogress: "In Progress",
    done: "Done",
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between text-2xl font-semibold">
                  {idToColumnText[id]}
                  <span className=" text-gray-500 bg-white/70 rounded-lg px-2 py-1 my-2  text-xs font-normal">
                    {!searchString
                      ? todos.length
                      : todos.filter(
                          todo =>
                            todo.title
                              .toLowerCase()
                              .includes(searchString.toLowerCase())
                        ).length}
                  </span>
                </h2>
                <div className="space-y-2 my-4">
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    ) {
                      return null;
                    }
                    return (
                      <Draggable
                        key={todo.$id}
                        index={index}
                        draggableId={todo.$id}
                      >
                        {(provided) => <TodoCard dragHandleProps={...provided.dragHandleProps} draggableProps={...provided.draggableProps} innerRef={provided.innerRef} todo={todo} index={index} id={id}/>
                        }

                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <div className="flex justify-end py-2">
                    <button onClick={(e)=>{
                        e.preventDefault()
                        setaddTaskType(id)
                        openModal()
                    }} className="rounded-full bg-white">
                      <AiFillPlusCircle className="w-8 h-8 text-green-500 hover:text-green-600" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
