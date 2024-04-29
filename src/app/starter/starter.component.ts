import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 import { ListProductComponent } from '../components/list-product/list-product.component';
 import { RouterModule } from '@angular/router';


 @Component({
   selector: 'app-starter', 
   templateUrl: './starter.component.html', 
  standalone: true,
  imports: [CommonModule, FormsModule, ListProductComponent, RouterModule] 
 })
 export class StarterComponent implements AfterViewInit {
   subtitle: string;
   constructor() {
     this.subtitle = 'This is some text within a card block.';
   }
   ngAfterViewInit() {}
 }

