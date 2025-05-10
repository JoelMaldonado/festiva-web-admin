import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { format } from 'date-fns';
import { ClubScheduleService } from 'app/services/club-schedule.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { delay } from 'rxjs';
import { AppTopComponent } from "../../../../components/app-top.component";

@Component({
  selector: 'app-club-schedules',
  imports: [
    FormsModule,
    SelectModule,
    DatePickerModule,
    TableModule,
    ButtonModule,
    AppTopComponent
],
  templateUrl: './club-schedules.component.html',
})
export class ClubSchedulesComponent implements OnInit {
  private readonly clubScheduleService = inject(ClubScheduleService);

  @Input() idClub?: string;

  ngOnInit(): void {
    if (!this.idClub) {
      alert('No se ha proporcionado el id del club.');
      return;
    }
    this.getAll();
  }

  daysOfWeek = [
    {
      name: 'Lunes',
      code: 1,
    },
    {
      name: 'Martes',
      code: 2,
    },
    {
      name: 'Miércoles',
      code: 3,
    },
    {
      name: 'Jueves',
      code: 4,
    },
    {
      name: 'Viernes',
      code: 5,
    },
    {
      name: 'Sábado',
      code: 6,
    },
    {
      name: 'Domingo',
      code: 7,
    },
  ];

  listSchedules: any[] = [];
  isLoading = false;
  isLoadingSave = false;

  dayOfWeekSelected?: { name: string; code: number };
  openingTime?: Date;
  closingTime?: Date;

  getAll() {
    this.isLoading = true;
    this.clubScheduleService
      .getAll(this.idClub!)
      .pipe(delay(300))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.listSchedules = res.data || [];
          } else {
            alert('Error al obtener los horarios.');
            console.log(res.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  save() {
    if (!this.openingTime) {
      alert('Por favor, seleccione la hora de apertura.');
      return;
    }

    if (!this.closingTime) {
      alert('Por favor, seleccione la hora de cierre.');
      return;
    }

    this.isLoadingSave = true;
    const openingTimeHours = format(this.openingTime, 'HH:mm');
    const closingTimeHours = format(this.closingTime, 'HH:mm');
    const body = {
      dayOfWeek: this.dayOfWeekSelected?.code,
      openingTime: openingTimeHours,
      closingTime: closingTimeHours,
    };
    this.clubScheduleService
      .create(this.idClub!, body)
      .pipe(delay(300))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.dayOfWeekSelected = undefined;
            this.openingTime = undefined;
            this.closingTime = undefined;
            this.getAll();
          } else {
            alert('Error al guardar el horario.');
            console.log(res.message);
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

  remove(idClubSchedule: string) {
    if (confirm('¿Está seguro de que desea eliminar este horario?')) {
      this.clubScheduleService.delete(idClubSchedule).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.getAll();
          } else {
            alert('Error al eliminar el horario.');
            console.log(res.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
