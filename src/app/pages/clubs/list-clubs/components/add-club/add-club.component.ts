import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { delay } from 'rxjs';
import { ClubService } from '../../../../../services/club.service';

@Component({
  selector: 'add-club',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
  ],
  templateUrl: './add-club.component.html',
})
export class AddClubComponent {
  name = '';
  description = '';
  isLoading = false;

  @Output() onSave = new EventEmitter<void>();

  clubService = inject(ClubService);

  save() {
    this.isLoading = true;

    if (this.name.length === 0) {
      alert('Name is required');
      this.isLoading = false;
      return;
    }

    this.clubService
      .add(this.name, this.description)
      .pipe(delay(1000))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.name = '';
            this.description = '';
            this.onSave.emit();
          } else {
            alert(res.message);
          }
        },
        error: (error) => {
          alert('Error: ' + error.message);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
