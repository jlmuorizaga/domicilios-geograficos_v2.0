import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DomicilioGeografico } from '../model/domiciliogeografico';

@Injectable({
  providedIn: 'root'
})
export class DomicilioGeograficoService {

  constructor(private http: HttpClient) { }

  insertDomicilioGeografico(domicilioGeografico: DomicilioGeografico) {
    return this.http.post(environment.baseUrl + ':' + environment.puerto + environment.domicilioGeografico, domicilioGeografico);
  }

  getDomicilioGeografico() {
    return this.http.get<DomicilioGeografico[]>(environment.baseUrl + ':' + environment.puerto + environment.domicilioGeografico);
  }

  updateDomicilioGeografico(domicilioGeografico: DomicilioGeografico) {
    return this.http.put(environment.baseUrl + ':' + environment.puerto + environment.domicilioGeografico, domicilioGeografico);
  }

  deleteDomicilioGeografico(id: string) {
    return this.http.delete(environment.baseUrl + ':' + environment.puerto + environment.domicilioGeografico + '/' + id);
  }

}
