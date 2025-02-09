import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CapturarService } from '../services/capturar.service';
import { Entidad } from '../model/entidad';
import { Municipio } from '../model/municipio';
import { Localidad } from '../model/localidad';
import { Vialidad } from '../model/vialidad';
import { Asentamiento } from '../model/asentamiento';
import { ControlSpinner } from '../model/controlSpinner';

@Injectable({
  providedIn: 'root',
})
export class getServices {
  private entidadesSubject = new BehaviorSubject<Entidad[]>([]);
  allEntidades$ = this.entidadesSubject.asObservable();

  private municipiosSubject = new BehaviorSubject<Municipio[]>([]);
  allMunicipios$ = this.municipiosSubject.asObservable();

  private localidadesSubject = new BehaviorSubject<Localidad[]>([]);
  allLocalidades$ = this.localidadesSubject.asObservable();

  private tiposVialidadesSubject = new BehaviorSubject<Vialidad[]>([]);
  allTiposVialidades$ = this.tiposVialidadesSubject.asObservable();

  private nombresVialidadesSubject = new BehaviorSubject<Vialidad[]>([]);
  allNombresVialidades$ = this.nombresVialidadesSubject.asObservable();

  private tiposAsentamientosSubject = new BehaviorSubject<Asentamiento[]>([]);
  allTiposAsentamientos$ = this.tiposAsentamientosSubject.asObservable();

  private nombresAsentamientosSubject = new BehaviorSubject<Asentamiento[]>([]);
  allNombresAsentamientos$ = this.nombresAsentamientosSubject.asObservable();

  constructor(private capturarSvc: CapturarService) {}

  getEntidades() {
    this.capturarSvc.getEntidades().subscribe({
      next: (response: Entidad[]) => {
        this.entidadesSubject.next(response);
      },
      error: (error: any) => {
        this.entidadesSubject.next([]);
        console.error('Error al leer datos de la entidad:', error);
      },
    });
  }

  getMunicipios(cve_ent_param: string) {
    this.capturarSvc.getMunicipios(cve_ent_param).subscribe({
      next: (response: Municipio[]) => {
        this.municipiosSubject.next(response);
      },
      error: (error: any) => {
        this.municipiosSubject.next([]);
        console.error('Error al leer datos del municipio:', error);
      },
    });
  }

  getLocalidades(cve_ent_param: string, cve_mun_param: string) {
    this.capturarSvc.getLocalidades(cve_ent_param, cve_mun_param).subscribe({
      next: (response: Localidad[]) => {
        this.localidadesSubject.next(response);
      },
      error: (error: any) => {
        this.localidadesSubject.next([]);
        console.error('Error al leer datos de la localidad:', error);
      },
    });
  }

  getTiposVialidades(cve_ent_param: string, cve_mun_param: string, cve_loc_param: string) {
    this.capturarSvc.getTiposVialidades(cve_ent_param, cve_mun_param, cve_loc_param).subscribe({
      next: (response: Vialidad[]) => {
        this.tiposVialidadesSubject.next(response);
      },
      error: (error: any) => {
        this.tiposVialidadesSubject.next([]);
        console.error('Error al leer datos del tipo de vialidad:', error);
      },
    });
  }

  getNombresVialidades(cve_ent_param: string, cve_mun_param: string, cve_loc_param: string, cve_tipo_vialidad_param: string, controlSpinner: ControlSpinner) {
    controlSpinner.showSpinner = true;
    this.capturarSvc.getNombresVialidades(cve_ent_param, cve_mun_param, cve_loc_param, cve_tipo_vialidad_param).subscribe({
      next: (response: Vialidad[]) => {
        this.nombresVialidadesSubject.next(response);
      },
      error: (error: any) => {
        this.nombresVialidadesSubject.next([]);
        console.error('Error al leer datos del nombre de vialidad:', error);
      },
      complete: () => {
        controlSpinner.showSpinner = false;
      },
    });
  }

  getTiposAsentamientos(cve_ent_param: string, cve_mun_param: string, cve_loc_param: string) {
    this.capturarSvc.getTiposAsentamientos(cve_ent_param, cve_mun_param, cve_loc_param).subscribe({
      next: (response: Asentamiento[]) => {
        this.tiposAsentamientosSubject.next(response);
      },
      error: (error: any) => {
        this.tiposAsentamientosSubject.next([]);
        console.error('Error al leer datos del tipo de asentamiento:', error);
      },
    });
  }

  getNombresAsentamientos(cve_ent_param: string, cve_mun_param: string, cve_loc_param: string, cve_tipo_asentamiento_param: string) {
    this.capturarSvc.getNombresAsentamientos(cve_ent_param, cve_mun_param, cve_loc_param, cve_tipo_asentamiento_param).subscribe({
      next: (response: Asentamiento[]) => {
        this.nombresAsentamientosSubject.next(response);
      },
      error: (error: any) => {
        this.nombresAsentamientosSubject.next([]);
        console.error('Error al leer datos del nombre de asentamiento:', error);
      },
    });
  }

}
