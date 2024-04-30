import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseProducts, Product } from '../interfaces/product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private myAppUrl: string;
    private myApiUrl: string;

    constructor(private http: HttpClient) {
        this.myAppUrl = environment.endpoint;  // Asegúrate que 'endpoint' termine en '/'
        this.myApiUrl = 'juegos';  // Asegurarse de terminar con una barra para formar bien las URL
    }

    // Obtener la lista de productos
    getProducts(): Observable<ResponseProducts> {
        return this.http.get<ResponseProducts>(`${this.myAppUrl}${this.myApiUrl}?include[]=complejidad&include[]=contexto&include[]=tematizacion&include[]=dinamica&include[]=parte&include[]=componentes`);
    }

    // Eliminar un producto
    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
    }

    // Guardar un nuevo producto
    addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.myAppUrl}${this.myApiUrl}`, product);
    }

    // Obtener un producto por ID
    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}/${id}?include[]=complejidad&include[]=contexto&include[]=tematizacion&include[]=dinamica&include[]=parte&include[]=componentes`);
    }
    

    // Actualizar un producto
    updateProduct(id: number, product: Product): Observable<void> {
        return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, product);
    }


}
