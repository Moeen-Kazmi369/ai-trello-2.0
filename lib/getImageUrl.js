import { storage } from "@/appwrite"

export const getImageUrl=async(bucketId,fileId)=>{
    const url= storage.getFilePreview(
        process.env.NEXT_PUBLIC_BUCKET_ID,
        fileId
    )
    return url;
}