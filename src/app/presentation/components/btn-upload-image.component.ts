import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FolderFirebase,
  ImageFirebase,
  UploadImageUseCase,
} from 'app/domain/usecase/upload-image.usecase';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Observable } from 'rxjs';

@Component({
  selector: 'btn-upload-image',
  standalone: true,
  imports: [ButtonModule, DialogModule, FileUploadModule],
  template: `
    <p-button (click)="showDialog()" label="Añadir imagen" />

    <p-dialog header="Agregar Imagen" [modal]="true" [(visible)]="visible">
      <div class="flex flex-col gap-4">
        <p-fileUpload
          #fileUpload
          mode="advanced"
          name="image"
          accept="image/*"
          maxFileSize="1000000"
          customUpload="true"
          (uploadHandler)="onUpload($event)"
          chooseLabel="Seleccionar"
          uploadLabel="Subir"
          cancelLabel="Cancelar"
        >
          <ng-template pTemplate="content">
            <div
              class="flex flex-col items-center justify-center p-4 border-2 border-dashed surface-border border-round"
            >
              @if(isLoading) {
              <div class="loader"></div>
              } @else {
              <p>
                Arrastra y suelta una imagen aquí o haz clic para seleccionar
              </p>
              }
            </div>
          </ng-template>
        </p-fileUpload>
      </div>
    </p-dialog>
  `,
})
export class BtnUploadImageComponent {
  private readonly uploadImageUseCase = inject(UploadImageUseCase);

  @Input() onUploaded!: (image: ImageFirebase) => Observable<any>;
  @Input() folder: FolderFirebase = FolderFirebase.default;
  @ViewChild(FileUpload) fileUpload!: FileUpload;

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
            this.fileUpload.clear();
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
