import { database } from "@/appwrite";
import { ID } from "appwrite";

export const setboardInDB = async (value) => {
  const { title, $id } = await database.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_BOARDS_COLLECTION_ID,
    ID.unique(),
    {
      title: value,
    }
  );
  const data = {
    title: title,
    id: $id,
  };
  return data;
};
