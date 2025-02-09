import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Entidad } from '../model/entidad';
import { Municipio } from '../model/municipio';
import { Localidad } from '../model/localidad';
import { Vialidad } from '../model/vialidad';
import { Asentamiento } from '../model/asentamiento';

@Injectable({
  providedIn: 'root'
})
export class CapturarService {

  constructor(private http: HttpClient) { }

  getEntidades() {
    return this.http.get<Entidad[]>(environment.baseUrl + ':' + environment.puerto + environment.entidades);
  }

  getMunicipios(cve_ent: string) {
    return this.http.get<Municipio[]>(environment.baseUrl + ':' + environment.puerto + environment.municipios + '/' + cve_ent);
  }

  getLocalidades(cve_ent: string, cve_mun: string) {
    return this.http.get<Localidad[]>(environment.baseUrl + ':' + environment.puerto + environment.localidades + '/' + cve_ent + '/' + cve_mun);
  }

  getTiposVialidades(cve_ent: string, cve_mun: string, cve_loc: string) {
    return this.http.get<Vialidad[]>(environment.baseUrl + ':' + environment.puerto + environment.tiposVialidades + '/' + cve_ent + '/' + cve_mun + '/' + cve_loc);
  }

  getNombresVialidades(cve_ent: string, cve_mun: string, cve_loc: string, cve_tipo_vialidad: string) {
    return this.http.get<Vialidad[]>(environment.baseUrl + ':' + environment.puerto + environment.nombresVialidades + '/' + cve_ent + '/' + cve_mun + '/' + cve_loc + '/' + cve_tipo_vialidad);
  }

  getTiposAsentamientos(cve_ent: string, cve_mun: string, cve_loc: string) {
    return this.http.get<Asentamiento[]>(environment.baseUrl + ':' + environment.puerto + environment.tiposAsentamientos + '/' + cve_ent + '/' + cve_mun + '/' + cve_loc);
  }

  getNombresAsentamientos(cve_ent: string, cve_mun: string, cve_loc: string, cve_tipo_asentamiento: string) {
    return this.http.get<Asentamiento[]>(environment.baseUrl + ':' + environment.puerto + environment.nombresAsentamientos + '/' + cve_ent + '/' + cve_mun + '/' + cve_loc + '/' + cve_tipo_asentamiento);
  }

}
