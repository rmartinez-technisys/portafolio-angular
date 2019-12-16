import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: any[] = [];
  constructor(private _http: HttpClient) {
    this.CargarProductos();
   }

  private CargarProductos() {
    return new Promise( (resolve, reject ) => {

      this._http.get('https://angular-html-81736.firebaseio.com/productos_idx.json')
      .subscribe( (resp: ProductoInterface[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    } );
  }
  getProducto(id: String) {
  return  this._http.get(`https://angular-html-81736.firebaseio.com/productos/${ id }.json`);
  }
  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      // tslint:disable-next-line: comment-format
      //cargar productos nuevamente
      this.CargarProductos().then(() => {
        // tslint:disable-next-line: comment-format
        //ejecutar después de tener los productos
        // tslint:disable-next-line: comment-format
        //aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      // tslint:disable-next-line: comment-format
      //aplico el filtro
      this.filtrarProductos(termino);
    }


}

private filtrarProductos( termino: string ) {
  // console.log(this.productos);
  this.productosFiltrado = [];
  termino = termino.toLocaleLowerCase();
  this.productos.forEach( prod => {
    const tituloLower = prod.titulo.toLocaleLowerCase();
    if (prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
      this.productosFiltrado.push(prod);
    }
  });

}

}
