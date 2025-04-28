import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FolderFirebase,
  ImageFirebase,
  UploadImageUseCase,
} from 'app/domain/usecase/upload-image.usecase';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { Observable } from 'rxjs';

@Component({
  selector: 'btn-upload-image',
  standalone: true,
  imports: [ButtonModule, DialogModule, FileUploadModule],
  templateUrl: './btn-upload-image.component.html',
})
export class BtnUploadImageComponent {
  private readonly uploadImageUseCase = inject(UploadImageUseCase);

  @Input() onUploaded!: (image: ImageFirebase) => Observable<any>;
  @Input() folder: FolderFirebase = FolderFirebase.default;

  visible: boolean = false;
  isLoading = false;

  showDialog() {
    this.visible = true;
  }

  async onUpload(event: any) {
    const file = event.files?.[0];
    if (!file) return;

    try {
      this.isLoading = true;
      const result = await this.uploadImageUseCase.uploadImage(
        file,
        this.folder
      );
      if (this.onUploaded) {
        this.onUploaded(result).subscribe({
          next: () => {
            this.visible = false;
          },
        });
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
// Html
// <btn-upload-image [onUploaded]="holaMundo.bind(this)" />
//
// component.ts
//sendImage(imageUrl: ImageFirebase): Observable<any> {
//  return this.repository
//    .create(this.idClub, imageUrl.url)
//    .pipe(tap(() => this.getAllCovers()));
//}
