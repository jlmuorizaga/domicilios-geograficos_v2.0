import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular/standalone';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { pencil, trashOutline } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { DomicilioGeograficoService } from '../../services/domiciliogeografico.service';
import { DomicilioGeografico } from '../../model/domiciliogeografico';
import { environment } from '../../../environments/environment';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditarPage implements OnInit {

  public domiciliosGeograficos!: DomicilioGeografico[];
  public totalDomiciliosGeograficos: number = 0;
  titulo: string = 'Editar Domicilio Geográfico';
  backButton: string = '/menu';
  filteredDomiciliosGeograficos: DomicilioGeografico[] = [];
  searchTerm: string = '';
  navigationSubscription:Subscription;

  constructor(private domicilioGeograficoSvc: DomicilioGeograficoService, private alertController: AlertController,
    private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef,
    private router: Router) {
    addIcons({ pencil, trashOutline });
    this.navigationSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.leerDomicilioGeografico();
      });
  }

  ngOnInit() {
    this.leerDomicilioGeografico();
  }

  leerDomicilioGeografico() {
    this.domicilioGeograficoSvc.getDomicilioGeografico().subscribe({
      next: (res: any) => {
        this.domiciliosGeograficos = res;
        this.filteredDomiciliosGeograficos = [...this.domiciliosGeograficos];
        console.log('this.domiciliosGeograficos:', this.domiciliosGeograficos);
        this.totalDomiciliosGeograficos = this.domiciliosGeograficos.length;
      },
      error: (error: any) => {
        console.log('Error al leer datos del pedido:');
        console.log(error);
      }
    });
    this.cdr.detectChanges();
  }

  filterDomicilios() {
    const term = this.searchTerm.toLowerCase();
    this.filteredDomiciliosGeograficos = this.domiciliosGeograficos.filter(domicilio =>
      domicilio.nom_nombre_vialidad.toLowerCase().includes(term.toLowerCase())
    );
  }

  async eliminarDomicilioGeografico(dg: DomicilioGeografico) {
    console.log('eliminar el id', dg.id);
    const safeMessage: SafeHtml = this.sanitizer.bypassSecurityTrustHtml('<b>hola</b>');
    let mostrar = (dg.numero_exterior !== 'Sin Número' && dg.numero_exterior !== 'Domicilio Conocido') ? ' #' : ' ';
    const alert = await this.alertController.create({
      header: '¿Esta seguro que desea eliminar el siguiente registro?',
      cssClass: 'custom-alert',
      message: /*safeMessage as any*/
      dg.nom_tipo_vialidad + ' ' + dg.nom_nombre_vialidad + mostrar + dg.numero_exterior + ', '
      + dg.nom_tipo_asentamiento + ' ' + dg.nom_nombre_asentamiento,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.domicilioGeograficoSvc.deleteDomicilioGeografico(dg.id).subscribe({
            next:(res:any)=>{
              console.log('El domicilio geográfico se elimino de forma exitosa')
              this.leerDomicilioGeografico();
            },
            error:(error:any)=>{
              console.log('Error al eliminar el domicilio geográfico')
            }
          })
        }
      },{
        text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
      }],
    });
    await alert.present();
  }

  editarDomicilioGeografico(dg: DomicilioGeografico) {
    console.log('editar el id', dg.id);
    this.router.navigateByUrl(environment.paginaCapturar, { state: { data: dg } });
  }

}
