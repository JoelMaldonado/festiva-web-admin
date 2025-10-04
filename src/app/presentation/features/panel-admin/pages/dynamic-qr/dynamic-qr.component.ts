import { Component, inject, OnInit } from '@angular/core';
import { DinamycQrCodesService } from '@services/dinamyc-qr-codes.service';
import { CardDynamicQrComponent } from "../../components/card-dynamic-qr.component";

@Component({
  standalone: true,
  selector: 'app-dynamic-qr',
  imports: [CardDynamicQrComponent],
  templateUrl: './dynamic-qr.component.html',
})
export class DynamicQrComponent implements OnInit {
  private readonly service = inject(DinamycQrCodesService);

  list: any[] = [];

  ngOnInit(): void {
    console.log('DynamicQrComponent initialized');

    this.service.getAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.list = res.data;
        } else {
          console.error('Failed to fetch dynamic QR codes:', res.message);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  totalCount(item: any): number {
    return item.ios_count + item.android_count + item.other_count;
  }
}
