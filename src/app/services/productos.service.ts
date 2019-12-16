import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: ProductoInterface[] = [];
  constructor(private _http: HttpClient) {
    this.CargarProductos();
   }

  private CargarProductos(){
    this._http.get('https://angular-html-81736.firebaseio.com/productos_idx.json')
              .subscribe( (resp: ProductoInterface[]) =>{
                this.productos = resp;
                this.cargando = false;
              } );
  }

}
