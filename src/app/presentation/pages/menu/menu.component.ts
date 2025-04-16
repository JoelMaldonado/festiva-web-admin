import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '../../layout/toolbar.component';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, ToolbarComponent, RouterModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent {}
