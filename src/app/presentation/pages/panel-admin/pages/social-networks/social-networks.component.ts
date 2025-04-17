import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppTopComponent } from '@components/app-top.component';
import { ArtistType } from '@model/artist-type';
import { SocialNetwork } from '@model/social-network';
import { CommonRepository } from '@repository/common.repository';
import { StatusEnum } from 'app/data/enum/status-enum';
import { UploadImageUseCase } from 'app/domain/usecase/upload-image.usecase';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DrawerModule } from 'primeng/drawer';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-social-networks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppTopComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ButtonModule,
    TableModule,
    TagModule,
    DrawerModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    FloatLabelModule,
    FileUploadModule,
  ],
  templateUrl: './social-networks.component.html',
  providers: [ConfirmationService, MessageService],
})
export class SocialNetworksComponent implements OnInit {
  private readonly repo = inject(CommonRepository);
  private readonly uploadImageUseCase = inject(UploadImageUseCase);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  list: SocialNetwork[] = [];

  selectedImageFile: File | null = null;

  socialNetworkSelected: SocialNetwork | null = null;

  showForm = false;

  name = new FormControl('');

  ngOnInit(): void {
    this.getAll();
  }

  showFormNew() {
    this.socialNetworkSelected = null;
    this.name.reset();
    this.showForm = true;
  }

  showFormEdit(socialNetwork: SocialNetwork) {
    this.socialNetworkSelected = socialNetwork;
    this.name.setValue(socialNetwork.name);
    this.showForm = true;
  }

  isLoadingSave = false;

  async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.name.value) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El nombre es requerido.',
      });
      return;
    }
    this.isLoadingSave = true;

    var url: string | null = null;
    if (this.selectedImageFile) {
      url = await this.uploadImageUseCase.uploadImage(this.selectedImageFile);
    }

    if (this.socialNetworkSelected) {
      this.repo
        .updateSocialNetwork(
          this.socialNetworkSelected.id,
          this.name.value,
          url
        )
        .subscribe({
          next: () => this.onSuccess(),
          error: (err) => this.showError(err),
          complete: () => (this.isLoadingSave = false),
        });
    } else {
      this.repo.createSocialNetwork(this.name.value, url).subscribe({
        next: () => this.onSuccess(),
        error: (err) => this.showError(err),
        complete: () => (this.isLoadingSave = false),
      });
    }
  }

  onSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Event Category guardado correctamente.',
    });
    this.showForm = false;
    this.socialNetworkSelected = null;
    this.selectedImageFile = null;
    this.name.reset();
    this.getAll();
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  getAll() {
    this.repo.fetchAllSocialNetwork(StatusEnum.all).subscribe({
      next: (res) => (this.list = res),
      error: (err) => this.showError(err),
    });
  }

  deleteItem(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro que deseas eliminar esta categoría?.',
      header: 'Eliminar',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger',
      },
      accept: () => {
        this.repo.deleteSocialNetwork(id).subscribe({
          next: () => this.getAll(),
          error: (err) => this.showError(err),
        });
      },
    });
  }

  restoreItem(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro que deseas restaurar esta categoría?',
      header: 'Restaurar',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Restaurar',
        severity: 'success',
      },
      accept: () => {
        this.repo.restoreSocialNetwork(id).subscribe({
          next: () => this.getAll(),
          error: (err) => this.showError(err),
        });
      },
    });
  }

  onSelectImage(event: any) {
    this.selectedImageFile = event.files[0];
  }
}
