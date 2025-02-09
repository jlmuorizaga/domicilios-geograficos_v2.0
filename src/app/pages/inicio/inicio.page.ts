import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class InicioPage implements OnInit {

  showSpinner!: boolean;

  constructor(private router: Router) { }

  async ngOnInit() {
    this.showSpinner = true;
    await new Promise((f) => setTimeout(f, 3000));
    this.showSpinner = false;
    this.router.navigateByUrl(environment.paginaMenu);
  }

}
