import { inject, Injectable } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UploadImageUseCase {
  private readonly storage = inject(Storage);

  async uploadImage(file: File): Promise<string> {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const fileExtension = file.name.split('.').pop() ?? '';
      const filePath = `Photos/${year}/${month}/${Date.now()}.${fileExtension}`;
      const storageRef = ref(this.storage, filePath);
      const snapshot = await uploadBytesResumable(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      throw error;
    }
  }
}
