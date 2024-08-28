import { storage } from "@/services/firebase"

import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export async function uploadToStorage(file: File, slug: string) {
  const storageRef = ref(storage, `images/${slug}`)

  const snapshot = await uploadBytes(storageRef, file, {
    contentType: file.type,
  })
  const url = await getDownloadURL(snapshot.ref)

  return url
}
