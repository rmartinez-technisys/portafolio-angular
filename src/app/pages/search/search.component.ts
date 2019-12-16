import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor( private router: ActivatedRoute,
               public productosService: ProductosService) { }

  ngOnInit() {
    // tslint:disable-next-line: comment-format
    //leer lo enviado por el buscador
    this.router.params
      .subscribe( params => {
        console.log(params['termino']);
        this.productosService.buscarProducto( params['termino'] );
      });
  }

}
