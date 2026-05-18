import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Category } from '@model/category';
import { CommonRepository } from '@repository/common.repository';
import { StatusEnum } from 'app/data/enum/status-enum';
import { DrawerModule } from 'primeng/drawer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-categories',
  imports: [
    ReactiveFormsModule,
    DrawerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './event-categories.component.html',
  standalone: true,
})
export class EventCategoriesComponent implements OnInit {
  private readonly repo = inject(CommonRepository);

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
      error: (err) => console.error(err),
      complete: () => (this.isLoadingTable = false),
    });
  }

  showFormNew() {
    this.eventCategorySelected = null;
    this.name.reset();
    this.showForm = true;
  }

  showFormEdit(category: Category) {
    this.eventCategorySelected = category;
    this.name.setValue(category.title);
    this.showForm = true;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.name.value) return;
    this.isLoadingSave = true;
    const obs = this.eventCategorySelected
      ? this.repo.updateEventCategory(this.eventCategorySelected.id, this.name.value)
      : this.repo.createEventCategory(this.name.value);
    obs.subscribe({
      next: () => {
        this.showForm = false;
        this.eventCategorySelected = null;
        this.name.reset();
        this.getAll();
        Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Guardado correctamente', showConfirmButton: false, timer: 2000, background: '#222222', color: '#ffffff' });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar la categoría.', background: '#222222', color: '#ffffff' });
      },
      complete: () => (this.isLoadingSave = false),
    });
  }

  async deleteItem(_event: Event, id: number) {
    const result = await Swal.fire({
      title: '¿Eliminar categoría?',
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
      this.repo.deleteEventCategory(id).subscribe({
        next: () => this.getAll(),
        error: (err) => console.error(err),
      });
    }
  }

  async restoreItem(_event: Event, id: number) {
    const result = await Swal.fire({
      title: '¿Restaurar categoría?',
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
      this.repo.restoreEventCategory(id).subscribe({
        next: () => this.getAll(),
        error: (err) => console.error(err),
      });
    }
  }
}
