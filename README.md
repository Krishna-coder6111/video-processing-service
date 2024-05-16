# Youtube clone
Implementing core functionality of youtube with some scalability tradeoffs

## Background
Youtube is a video sharing platform allowingusers to upload, view, rate, share, comment on videos.

## Requirements:
- Users can sign in/out using their Google account
- Users can upload videos while signed in
- Videos should be transcoded to multiple formats (e.g. 360p, 720p)
- Users can view a list of uploaded videos (signed in or not)
- Users can view individual videos (signed in or not)

## High-Level Design
### Storing the video (Cloud Storage):
Google Cloud Storage will be used to host the raw and processed videos. This helps in simplicity, scalability, cost-effectiveness for storing and serving large files.
### Uploading videos (Cloud Pub/Sub):
We will publish a messaage to cloud pub/sub topic when a video is published. This gives us a layer of duraability for video upload events and processing videos async
### Processing Videos (Cloud Run):
When an upload event is published, video processing worker receives a message from pub/sub and transcodes the video. We will use ffmpeg for transcoding. Inconsisten workloads will be handled by Cloud Run to scale up and down as needed. Processed videos are uploaded back to Cloud Storage
### Metadata (Firestore):
Metadata is stores in Firestore after a video is processed allowing us to display its relevant info in the web client
### APi (Firebase functions):
To upload vids, retrieve their metadata and CRUD ops with easy extensibility
### Web Client (Next.js/Cloud Run):
To allow users to sign in using google sign in
### Auth (Google Auth)
User auth will be done by Firebase auth

## Tech Stack
TypeScript
Next.js
Express.js
Docker
FFmpeg
Firebase Auth
Firebase Functions
Firebase Firestore
Google Cloud Storage
Google Cloud Pub/Sub
Google Cloud Run

## Future Work
- Add user's profile picture and email to Web Client (made in marketplace and kanbas project)
- (Bug fix) Allow users to upload multiple videos without refreshing the page
- Allow users to upload thumbnails for their videos
- Allow user's to add a title and description to their videos
- Show the uploader of a video (premade in marketplace project)
- Allow user's to subscribe to other user's channels
- Clean up raw videos in Cloud Storage after processing
- Use a CDN to serve videos
- Add unit and integration tests
