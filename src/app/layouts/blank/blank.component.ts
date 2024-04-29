import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListProductComponent } from 'src/app/components/list-product/list-product.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports:[RouterModule, ListProductComponent],
  templateUrl: './blank.component.html'
})

export class BlankComponent {}
