import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToolbarComponent } from '../../layout/toolbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, ToolbarComponent, RouterModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent {}
