import { Component, inject, Input, OnInit } from '@angular/core';
import { AppTopComponent } from '../../../../components/app-top.component';
import { ClubPhoneService } from 'app/services/club-phone.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { delay } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PhoneFormatPipe } from 'app/pipes/phone-format.pipe';

@Component({
  selector: 'club-contact-phone',
  templateUrl: './contact-phone.component.html',
  standalone: true,
  imports: [
    FormsModule,
    AppTopComponent,
    TableModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    PhoneFormatPipe,
  ],
})
export class ClubContactPhoneComponent implements OnInit {
  private readonly service = inject(ClubPhoneService);
  @Input() idClub?: string;

  listPhones: any[] = [];
  isLoading = true;
  isLoadingSave = false;

  phone = '';

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
            this.listPhones = res.data ?? [];
          } else {
            alert(res.message);
          }
        },
        error: () => {
          alert('Error al cargar los phones');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  save() {
    this.isLoadingSave = true;
    this.service.create(Number(this.idClub!), this.phone).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.getAll();
          this.phone = '';
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
    if (confirm('¿Está seguro de eliminar el phone?')) {
      this.service.delete(id).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.getAll();
          } else {
            alert(res.message);
          }
        },
        error: () => {
          alert('Error al eliminar el phone');
        },
      });
    }
  }
}
