import { ID, database, storage } from "@/appwrite";
import { getBoardData } from "@/lib/getBoardData";
import { create } from "zustand";
export const useBoardStore = create((set, get) => ({
  board: null,
  searchString: "",
  addTaskInput: "",
  addTaskType: "todo",
  image: "",
  selectedBoard:null,
  setSelectedBoard:(val)=>set({selectedBoard:val}),
  setsearchString: (input) => set({ searchString: input }),
  setaddTaskInput: (input) => set({ addTaskInput: input }),
  setaddTaskType: (input) => set({ addTaskType: input }),
  setaddImage: (image) => {
    set({ image: image });
  },
  addTaskInDB: async (todo, columnId, image,id) => {
    console.log(id)
    let file=''
    if(image){
      const fileUploaded=await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID,
        ID.unique(),
        image,
      )
      if(fileUploaded){
        file=JSON.stringify({
          bucketId:fileUploaded.bucketId,
          fileId:fileUploaded.$id,
        })
      }
    }
    const { $id ,board} = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_COLLECTION_ID,
      ID.unique(),
      {
        title: todo,
        status: columnId,
      ...(file && {image:file}),
      board:ID.custom(id)
      }
    );
    const newTodo = {
      $id,
      $createdAt: new Date().toISOString(),
      title: todo,
      status: columnId,
      ...(file && {image:file}),
      boardId:board.$id,
    };
    const newColumns = new Map(get().board.columns);
    newColumns.get(columnId)?.todos.push(newTodo);
    set({ board: { columns: newColumns } });
  },
  updateBoardState: (state) => set({ board: state }),
  updateTodoInDB: async (todo, columnId) => {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_COLLECTION_ID,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },
  deleteTask: async (todo, taskIndex, id) => {
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_COLLECTION_ID,
      todo.$id
    );
    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }
    const newColumns = new Map(get().board.columns);
    newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });
  },
}));
