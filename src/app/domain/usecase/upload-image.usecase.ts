import { inject, Injectable } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { environment } from 'environments/environment';

export interface ImageFirebase {
  url: string;
  filePath: string;
}

export enum FolderFirebase {
  default = 'Photos',
  clubs = 'Clubs',
  artists = 'Artists',
  events = 'Events',
}

@Injectable({
  providedIn: 'root',
})
export class UploadImageUseCase {
  private readonly storage = inject(Storage);

  async uploadImage(
    file: File,
    folder: FolderFirebase = FolderFirebase.default
  ): Promise<ImageFirebase> {
    const prefix = environment.production ? 'prod' : 'qa';
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const fileExtension = file.name.split('.').pop() ?? '';
    const filePath = `${prefix}/${folder}/${year}/${month}/${Date.now()}.${fileExtension}`;
    const storageRef = ref(this.storage, filePath);
    const snapshot = await uploadBytesResumable(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return { url, filePath };
  }
}
