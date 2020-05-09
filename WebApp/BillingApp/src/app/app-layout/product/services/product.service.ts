import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable, of } from 'rxjs';
import { map} from 'rxjs/operators';
import { BaseHttpClientService } from 'src/app/core/services';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments';
import { Set } from '../models/Set';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient :BaseHttpClientService) { }


  getProducts(): Observable<Product[]> {
    return this.httpClient.get(`${environment.apiUrl}/Products`)
      .pipe(map((res: HttpResponse<Product[]>) => {
        return res.body;
      }));
  }

  getProduct(id:number): Observable<Product> {
    return this.httpClient.get(`${environment.apiUrl}/Product/${id}`)
      .pipe(map((res: HttpResponse<Product>) => {
        return res.body;
      }));
  }

  addProduct(product:Product):Observable<any>{
    return this.httpClient.post(`${environment.apiUrl}/Product`,product)
    .pipe(map((res: HttpResponse<any>) => {
      return res.body;
    }));
  }

  getSets(): Observable<Set[]> {
    return this.httpClient.get(`${environment.apiUrl}/Sets`)
      .pipe(map((res: HttpResponse<Set[]>) => {
        return res.body;
      }));
  }

  getSet(id:number): Observable<Set> {
    return this.httpClient.get(`${environment.apiUrl}/Set/${id}`)
      .pipe(map((res: HttpResponse<Set>) => {
        return res.body;
      }));
  }

  addSet(product:Product):Observable<any>{
    return this.httpClient.post(`${environment.apiUrl}/Set`,product)
    .pipe(map((res: HttpResponse<any>) => {
      return res.body;
    }));
  }


}
