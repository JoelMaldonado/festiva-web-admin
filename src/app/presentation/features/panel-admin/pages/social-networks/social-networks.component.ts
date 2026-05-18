import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SocialNetwork } from '@model/social-network';
import { CommonRepository } from '@repository/common.repository';
import { StatusEnum } from 'app/data/enum/status-enum';
import { FolderFirebase, UploadImageUseCase } from 'app/domain/usecase/upload-image.usecase';
import { DrawerModule } from 'primeng/drawer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-social-networks',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DrawerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './social-networks.component.html',
})
export class SocialNetworksComponent implements OnInit {
  private readonly repo = inject(CommonRepository);
  private readonly uploadImageUseCase = inject(UploadImageUseCase);

  list: SocialNetwork[] = [];
  selectedImageFile: File | null = null;
  socialNetworkSelected: SocialNetwork | null = null;
  showForm = false;
  name = new FormControl('');
  isLoadingSave = false;
  isLoadingTable = false;

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.isLoadingTable = true;
    this.repo.fetchAllSocialNetwork(StatusEnum.all).subscribe({
      next: (res) => (this.list = res),
      error: (err) => console.error(err),
      complete: () => (this.isLoadingTable = false),
    });
  }

  showFormNew() {
    this.socialNetworkSelected = null;
    this.selectedImageFile = null;
    this.name.reset();
    this.showForm = true;
  }

  showFormEdit(socialNetwork: SocialNetwork) {
    this.socialNetworkSelected = socialNetwork;
    this.selectedImageFile = null;
    this.name.setValue(socialNetwork.name);
    this.showForm = true;
  }

  onSelectImage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedImageFile = input.files?.[0] ?? null;
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.name.value) return;
    this.isLoadingSave = true;

    let imageUrl: string | null = null;
    let imagePath: string | null = null;

    if (this.selectedImageFile) {
      const { url, filePath } = await this.uploadImageUseCase.uploadImage(
        this.selectedImageFile,
        FolderFirebase.socialNetworks
      );
      imageUrl = url;
      imagePath = filePath;
    }

    const obs = this.socialNetworkSelected
      ? this.repo.updateSocialNetwork(this.socialNetworkSelected.id, this.name.value, imageUrl, imagePath)
      : this.repo.createSocialNetwork(this.name.value, imageUrl, imagePath);

    obs.subscribe({
      next: () => {
        this.showForm = false;
        this.socialNetworkSelected = null;
        this.selectedImageFile = null;
        this.name.reset();
        this.getAll();
        Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Guardado correctamente', showConfirmButton: false, timer: 2000, background: '#222222', color: '#ffffff' });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar la red social.', background: '#222222', color: '#ffffff' });
      },
      complete: () => (this.isLoadingSave = false),
    });
  }

  async deleteItem(_event: Event, id: number) {
    const result = await Swal.fire({
      title: '¿Eliminar red social?',
      text: 'Esta acción la marcará como inactiva.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#374151',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      background: '#222222',
      color: '#ffffff',
    });
    if (result.isConfirmed) {
      this.repo.deleteSocialNetwork(id).subscribe({
        next: () => this.getAll(),
        error: (err) => console.error(err),
      });
    }
  }

  async restoreItem(_event: Event, id: number) {
    const result = await Swal.fire({
      title: '¿Restaurar red social?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#374151',
      confirmButtonText: 'Restaurar',
      cancelButtonText: 'Cancelar',
      background: '#222222',
      color: '#ffffff',
    });
    if (result.isConfirmed) {
      this.repo.restoreSocialNetwork(id).subscribe({
        next: () => this.getAll(),
        error: (err) => console.error(err),
      });
    }
  }
}
