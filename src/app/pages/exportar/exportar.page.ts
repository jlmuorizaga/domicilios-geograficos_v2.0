import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DomicilioGeograficoService } from '../../services/domiciliogeografico.service';
import { DomicilioGeografico } from '../../model/domiciliogeografico';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Constantes } from '../../utils/constantes';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.page.html',
  styleUrls: ['./exportar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ExportarPage implements OnInit {

  titulo: string = 'Exportar Domicilios Geográficos';
  backButton: string = '/menu';
  domiciliosGeograficos!: DomicilioGeografico[];
  totalDomiciliosGeograficos: number = 0;
  todosSeleccionados: boolean = false;
  domiciliosFiltrados!: DomicilioGeografico[];

  constructor(private domicilioGeograficoSvc: DomicilioGeograficoService,
    public alertController: AlertController) {}

  ngOnInit() {
    this.getDomiciliosGeograficos();
  }

  getDomiciliosGeograficos() {
    this.domicilioGeograficoSvc.getDomicilioGeografico().subscribe({
      next: (response: any[]) => {
        this.domiciliosGeograficos = response.map((domicilio: any) => ({
          ...domicilio,
          seleccionado: false, // Inicializa el estado del checkbox
        }));
        if (this.domiciliosGeograficos) {
          this.totalDomiciliosGeograficos = this.domiciliosGeograficos.length;
          console.log('domiciliosGeograficos->', this.domiciliosGeograficos);
        } else {
          console.log('Error al leer datos de Domicilios Geográficso');
        }
      },
      error: (error: any) => {
        console.log('Error al leer datos de Domicilios Geográficos');
        console.log(error);
      }
    });
  }

  verificarSeleccionados() {
    // Verifica si todos los checkboxes individuales están seleccionados
    const todos = this.domiciliosGeograficos.every(domicilio => domicilio.seleccionado);
    this.todosSeleccionados = todos;
  }

  marcarTodos(event: any) {
    const estado = event.detail.checked; // true o false
    this.todosSeleccionados = estado;
    // Actualiza todos los checkboxes en la lista
    this.domiciliosGeograficos.forEach(domicilio => {
      domicilio.seleccionado = estado;
    });
  }

  existenMarcados(xlsOcsv: string) {
    this.domiciliosFiltrados = this.domiciliosGeograficos.filter(domicilio => domicilio.seleccionado);
    if (this.domiciliosFiltrados.length > 0) {
      switch (xlsOcsv) {
        case 'xls': this.exportarXLS(); break;
        case 'csv': this.exportarComoCSV(); break;
      }
    } else {
      this.mensajeError(xlsOcsv);
    }
  }

  exportarXLS() {
    // Preprocesar los datos para asegurarse de que estén codificados correctamente
    const dataToExport = Constantes.ordenCampos(this.procesarDatos(this.domiciliosFiltrados));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    const xlsBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array',});
    this.guardarComoXLS(xlsBuffer, 'Domicilios-Geograficos');
  }

  // Función para procesar y normalizar datos sin usar Object.fromEntries
  procesarDatos(data: any[]): any[] {
    return data.map((item) => {
      const dG: any = {};
      Object.keys(item).forEach((key) => {
        const value = item[key];
        dG[key] = typeof value === 'string'
          ? decodeURIComponent(encodeURIComponent(value))
          : value;
      });
      return dG;
    });
  }

  guardarComoXLS(buffer: any, fileName: string) {
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(data, `${fileName}.xlsx`);
  }

  exportarComoCSV() {
    const dataToExport = Constantes.ordenCampos(this.domiciliosFiltrados);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const bom = '\ufeff';
    const blob = new Blob([bom + csvOutput], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Domicilios-Geograficos.csv');
  }

  async mensajeError(xlsOcsv: string) {
    const alert = await this.alertController.create({
      header: 'Selección de datos',
      message: 'Debe de seleccionar al menos un registro de la lista '
      + 'para poder crear el archivo ' + xlsOcsv,
      buttons: ['Aceptar'],
    });
    alert.backdropDismiss = false;
    await alert.present();
  }
}
