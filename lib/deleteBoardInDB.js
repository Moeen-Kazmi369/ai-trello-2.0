import { database } from "@/appwrite";

export const deleteBoardInDB = async (id) => {
  const res = await database.deleteDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_BOARDS_COLLECTION_ID,
    id
  );
  return res;
};
