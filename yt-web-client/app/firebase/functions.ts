import { httpsCallable } from "firebase/functions";
import { Video } from "../../../types/types";
import { functions } from "./firebase";

const generateUploadUrlFunction = httpsCallable(functions, 'generateUploadUrl');

export async function uploadVideo(file: File) {
    const response: any = await generateUploadUrlFunction({
        fileExtension: file.name.split('.').pop()
    });

    const uploadResult = await fetch(response?.data?.url, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type
        }
    });

    return uploadResult;
}

const getVideosFunction = httpsCallable(functions, 'getVideos');


export async function getVideos() {
  const response: any = await getVideosFunction();
  return response.data as Video[];
}