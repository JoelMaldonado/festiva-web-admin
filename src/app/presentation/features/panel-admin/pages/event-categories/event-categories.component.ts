import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppTopComponent } from '@components/app-top.component';
import { Category } from '@model/category';
import { CommonRepository } from '@repository/common.repository';
import { StatusEnum } from 'app/data/enum/status-enum';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DrawerModule } from 'primeng/drawer';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-event-categories',
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
  ],
  templateUrl: './event-categories.component.html',
  providers: [ConfirmationService, MessageService],
  standalone: true,
})
export class EventCategoriesComponent implements OnInit {
  private readonly repo = inject(CommonRepository);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  list: Category[] = [];

  eventCategorySelected: Category | null = null;
  showForm = false;

  name = new FormControl('');

  isLoadingSave = false;
  isLoadingTable = false;

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.isLoadingTable = true;
    this.repo.fetchAllEventCategory(StatusEnum.all).subscribe({
      next: (res) => (this.list = res),
      error: (err) => this.showError(err),
      complete: () => (this.isLoadingTable = false),
    });
  }

  showFormNew() {
    this.eventCategorySelected = null;
    this.name.reset();
    this.showForm = true;
  }

  showFormEdit(eventCagtegory: Category) {
    this.eventCategorySelected = eventCagtegory;
    this.name.setValue(eventCagtegory.title);
    this.showForm = true;
  }

  onSubmit(event: Event) {
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
    if (this.eventCategorySelected) {
      this.repo
        .updateEventCategory(this.eventCategorySelected.id, this.name.value)
        .subscribe({
          next: () => this.onSuccess(),
          error: (err) => this.showError(err),
          complete: () => (this.isLoadingSave = false),
        });
    } else {
      this.repo.createEventCategory(this.name.value).subscribe({
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
    this.eventCategorySelected = null;
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
        this.repo.deleteEventCategory(id).subscribe({
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
        this.repo.restoreEventCategory(id).subscribe({
          next: () => this.getAll(),
          error: (err) => this.showError(err),
        });
      },
    });
  }
}
