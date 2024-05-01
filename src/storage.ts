import { Storage } from "@google-cloud/storage";
import Ffmpeg from "fluent-ffmpeg";
import fs from 'fs';

const storage = new Storage();

const rawVideoBucketName = "krishnasingh-yt-raw-videos";
const processedVideoBucketName = "krishnasingh-yt-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

/**
 * Creates the local directories for raw and processed videos.
 */
export function setupDirectories() {
    ensureDirectoryExistence(localRawVideoPath);
    ensureDirectoryExistence(localProcessedVideoPath);
  }

/**
 * Ensures a directory exists, creating it if necessary.
 * @param {string} dirPath - The directory path to check.
 */
function ensureDirectoryExistence(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true});
    }
    console.log(`Directory ${dirPath} created.`);
}

/**
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}.
 * @param processedVideoName - The name of the file to convert to {@link localProcessedVideoPath}.
 * @returns A promise that resolves when the video has been converted.
 */
export function convertVideo(rawVideoName: string, processedVideoName: string) {
    return new Promise<void>((resolve, reject) => {
        Ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
        .outputOptions("-vf", "scale=-1:360")
        .on("end", function() {
            console.log("Processing finished succesfully");
            resolve();
        })
        .on("error", function(err: any) {
            console.error("Error: " + err.message);
            reject(err);
        })
        .save(`${localProcessedVideoPath}/${processedVideoName}`);
    });
}

/** Downloads raw video from the raw video bucket.
 * @param fileName - The name of the file to download from the 
 * {@link rawVideoBucketName} bucket into the {@link localRawVideoPath} folder.
 * @returns A promise that resolves when the file has been downloaded.
 */
export async function downloadRawVideo(fileName: string) {
     const options = {
        destination: `${localRawVideoPath}/${fileName}`
     };

     await storage.bucket(rawVideoBucketName).file(fileName).download(options);

        console.log(`gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}`);
}

/** Uploads processed video to the processed video bucket.
 * @param fileName - The name of the file to upload from the 
 * {@link localProcessedVideoPath} folder to the {@link processedVideoBucketName} bucket.
 * @returns A promise that resolves when the file has been uploaded.
 */
export async function uploadProcessedVideo(fileName: string) {
    const bucket = storage.bucket(processedVideoBucketName);
    
    const options = {
        destination: fileName
    };

    //upload video to bucket
    await storage.bucket(processedVideoBucketName).upload(`${localProcessedVideoPath}/${fileName}`, options);

    console.log(`${localProcessedVideoPath}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}`);

    await bucket.file(fileName).makePublic(); //set video to public readable
}

/** Deletes raw video from the raw video bucket.
 * @param fileName - The name of the file to delete from the 
 * {@link localRawVideoPath} bucket.
 * @returns A promise that resolves when the file has been deleted.
 */

export function deleteRawVideo(fileName: string) {
    return deleteFile(`${localRawVideoPath}/${fileName}`);
}

/** Deletes processed video from the processed video bucket.
 * @param fileName - The name of the file to delete from the 
 * {@link localProcessedVideoPath} bucket.
 * @returns A promise that resolves when the file has been deleted.
 */
export function deleteProcessedVideo(fileName: string) {
    return deleteFile(`${localProcessedVideoPath}/${fileName}`);
}

/** Deletes a file.
 * @param filePath - The path of the file to delete.
 * @returns A promise that resolves when the file has been deleted.
 */
export function deleteFile(filePath:string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
            
            if (err) {
                console.error(`Error deleting file: ${err}`);
                reject(err);
            } else {
                console.log(`File ${filePath} deleted`);
                resolve();
            }
        });
        } else {
            console.log(`File ${filePath} does not exist`);
            resolve();
        }

    });
}