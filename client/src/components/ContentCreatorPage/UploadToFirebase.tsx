import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./Firebase";
import { v4 as uuidv4 } from "uuid";

async function upload(
  courseTitle: string,
  blockTitle: string,
  lectureTitle: string,
  lessonTitle: string,
  file: File | null
): Promise<string | null> {
  if (file == null) return null;

  const fileRef = ref(
    storage,
    `courses/${courseTitle}/${blockTitle}/${lectureTitle}/${lessonTitle}_${uuidv4()}`
  );

  try {
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    alert("Failed to upload file");
    return null;
  }
}

export default upload;
