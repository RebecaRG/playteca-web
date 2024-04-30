import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ResponseProducts } from '../../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe(product => this.product = product);
  }
}
