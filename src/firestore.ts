import { credential } from "firebase-admin";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";
import { Video } from "../types/types";

initializeApp({credential: credential.applicationDefault()});

const firestore = new Firestore(); //can only initialize one across one gcp prj

// Note: This requires setting an env variable in Cloud Run
/** if (process.env.NODE_ENV !== 'production') {
  firestore.settings({
      host: "localhost:8080", // Default port for Firestore emulator
      ssl: false
  });
} */

export const videoCollectionId = "videos";

async function getVideo(videoId: string): Promise<Video> {
    const snapshot = await firestore.collection(videoCollectionId).doc(videoId).get();
    return (snapshot.data() as Video) ?? {};
}

export async function setVideo(videoId: string, video: Video): Promise<void> {
    await firestore
    .collection(videoCollectionId)
    .doc(videoId)
    .set(video,{ merge:true});
}

export async function isVideoNew(videoId:string) {
    const video = await getVideo(videoId);
    return video?.status === undefined;
}