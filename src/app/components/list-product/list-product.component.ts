import { Component, OnInit, NgModule } from '@angular/core';
import { Product, ResponseProducts } from '../../interfaces/product';
import { RouterLink,  } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'; 
import { CommonModule } from '@angular/common';
// import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
// import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [RouterLink, FormsModule, NgbPaginationModule, CommonModule],
  // imports: [RouterLink, ProgressBarComponent],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})

export class ListProductComponent implements OnInit {
  listProducts: Product[] = [];
  filteredProducts: Product[] = []; // Esta será la lista que mostraremos en el HTML
  loading: boolean = false;
  response: ResponseProducts = {
    mensaje: '',
    cantidad: 0,
    productos: []

  };
  page = 1;
  pageSize = 15;

  private _searchTerm: string = '';
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filterProducts(); // Llamar a filtrar productos cada vez que se cambie el término
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
        this.filteredProducts = data.productos; // Inicializa los productos filtrados
        this.loading = false;
      }
    });
  }

  filterProducts() {
    if (!this.searchTerm) {
      this.filteredProducts = this.listProducts; // Si no hay término de búsqueda, muestra todos los productos
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
}
