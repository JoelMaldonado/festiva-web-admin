import { Component, inject, Input, OnInit } from '@angular/core';
import { AppTopComponent } from '../../../../components/app-top.component';
import { ClubEmailService } from 'app/services/club-email.service';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { delay } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'club-contact-email',
  templateUrl: './contact-email.component.html',
  standalone: true,
  imports: [
    FormsModule,
    AppTopComponent,
    TableModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
  ],
})
export class ClubContactEmailComponent implements OnInit {
  private readonly service = inject(ClubEmailService);
  @Input() idClub?: string;

  listEmails: any[] = [];
  isLoading = true;
  isLoadingSave = false;

  email = '';

  ngOnInit() {
    if (!this.idClub) {
      alert('No se ha pasado el id del club');
      return;
    }

    this.getAll();
  }

  getAll() {
    this.isLoading = true;
    this.service
      .getAll(this.idClub!)
      .pipe(delay(300))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.listEmails = res.data ?? [];
          } else {
            alert(res.message);
          }
        },
        error: () => {
          alert('Error al cargar los emails');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  save() {
    this.isLoadingSave = true;
    this.service.create(Number(this.idClub!), this.email).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.getAll();
          this.email = '';
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.isLoadingSave = false;
      },
    });
  }

  remove(id: number) {
    if (confirm('¿Está seguro de eliminar el email?')) {
      this.service.delete(id).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.getAll();
          } else {
            alert(res.message);
          }
        },
        error: () => {
          alert('Error al eliminar el email');
        },
      });
    }
  }
}
