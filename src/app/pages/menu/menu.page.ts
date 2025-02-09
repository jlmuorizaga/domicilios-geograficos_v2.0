import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class MenuPage implements OnInit {

  constructor(private router: Router) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

  onClickCapturar() {
    console.log('capturar');
    this.router.navigateByUrl(environment.paginaCapturar);
    this.router.navigateByUrl(environment.paginaCapturar, { state: { data: undefined } });
  }

  onClickEditar() {
    console.log('Editar');
    this.router.navigateByUrl(environment.paginaEditar);
  }

  onClickExportar() {
    console.log('Exportar');
    this.router.navigateByUrl(environment.paginaExportar);
  }

}
