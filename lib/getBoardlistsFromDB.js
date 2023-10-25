import { database } from "@/appwrite";
export const getBoardsListsFromDB = async () => {
  const res = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_BOARDS_COLLECTION_ID
  );
  const structuredData = res.documents.map((item) => ({
    title: item.title,
    id: item.$id,
  }));
  return structuredData;
};
