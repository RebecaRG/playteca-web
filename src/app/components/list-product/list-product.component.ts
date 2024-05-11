import { Component, OnInit, NgModule } from '@angular/core';
import { Product, ResponseProducts } from '../../interfaces/product';
import { RouterLink,  } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [RouterLink, FormsModule, NgbPaginationModule, CommonModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})

export class ListProductComponent implements OnInit {
  listProducts: Product[] = [];
  filteredProducts: Product[] = []; 
  loading: boolean = false;
  response: ResponseProducts = {
    mensaje: '',
    cantidad: 0,
    productos: []

  };
  page = 1;
  pageSize = 10;
  key: string = '';
  reverse: boolean = false;
  sortState = { column: null, direction: 'asc' };

  private _searchTerm: string = '';
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filterProducts(); 
  }

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this.loading = true;
    this._productService.getProducts().subscribe({
      next: (data) => {
        this.response = data;  
        this.listProducts = data.productos;  
        this.filteredProducts = data.productos; 
        this.loading = false;
      }
    });
  }

  filterProducts() {
    if (!this.searchTerm) {
      this.filteredProducts = this.listProducts; 
    } else {
      this.filteredProducts = this.listProducts.filter(product => 
        product.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.autoria.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.editorial.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (`${product.participantes_min} - ${product.participantes_max}`).includes(this.searchTerm) ||
        product.duracion_minutos.toString().includes(this.searchTerm) ||
        (`+ ${product.edad_min}`).includes(this.searchTerm)
      );
    }
  }


compare(v1: string | number, v2: string | number) {
  if (typeof v1 === 'string' && typeof v2 === 'string') {
    return v1.localeCompare(v2);
  } else if (typeof v1 === 'number' && typeof v2 === 'number') {
    return v1 - v2;
  } else {
    return 0;
  }
}

sort(key: string) {
  if (this.sortState.column === key) {
    this.sortState.direction = this.sortState.direction === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortState.column = key;
    this.sortState.direction = 'asc';
  }

  this.key = key;
  this.reverse = this.sortState.direction === 'desc';

  this.filteredProducts = [...this.filteredProducts].sort((a, b) => {
    const res = this.compare(a[this.key], b[this.key]);
    return this.reverse ? -res : res;
  });
}

}
