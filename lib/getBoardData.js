import { database } from "@/appwrite"

export const getBoardData=async()=>{
    const data=await database.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_COLLECTION_ID,
    )
    const todos= data.documents
    const columns=todos.reduce((acc,todo)=>{
        if(!acc.get(todo.status)){
            acc.set(todo.status,{
                id:todo.status,
                todos:[],
            })
        }
        acc.get(todo.status).todos.push({
            $id:todo.$id,
            $createdAt:todo.$createdAt,
            title:todo.title,
            status:todo.status,
            ...(todo.image && {image:JSON.parse(todo.image)})
        })
        return acc
    },new Map)
    const columnsType=['todo','inprogress','done']
    for(let columnType of columnsType){
        if(!columns.get(columnType)){
            columns.set(columnType,{
                id:columnType,
                todos:[],
            })
        }
    } 
    const sortedColumns=new Map(
        Array.from(columns.entries()).sort((a,b)=>(
            columnsType.indexOf(a[0])-columnsType.indexOf(b[0])
        ))
    )
    const board={
        columns:sortedColumns,
    }
    return board
}