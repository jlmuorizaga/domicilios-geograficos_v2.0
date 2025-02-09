import { FormGroup } from "@angular/forms";

export class getFilterOptions {

  static filtered: any[] = [];

  static filterOptions(param: string, formularioCapturar: FormGroup, all: any[]) {
    switch (param) {
      case 'nom_ent': {const searchTerm = formularioCapturar.get('nom_ent')?.value || '';
                      this.filtered = all.filter((option: { nomgeo: string; }) =>
                      option.nomgeo.toLowerCase().includes(searchTerm.toLowerCase()));
                      break;}
      case 'nom_mun': {const searchTerm = formularioCapturar.get('nom_mun')?.value || '';
                      this.filtered = all.filter((option: { nomgeo: string; }) =>
                      option.nomgeo.toLowerCase().includes(searchTerm.toLowerCase()));
                      break;}
      case 'nom_loc': {const searchTerm = formularioCapturar.get('nom_loc')?.value || '';
                      this.filtered = all.filter((option: { nomgeo: string; }) =>
                      option.nomgeo.toLowerCase().includes(searchTerm.toLowerCase()));
                      break;}
      case 'nom_tipo_vialidad': {const searchTerm = formularioCapturar.get('nom_tipo_vialidad')?.value || '';
                      this.filtered = all.filter((option: { descripcion: string; }) =>
                      option.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
                      break;}
      case 'nom_nombre_vialidad': {const searchTerm = formularioCapturar.get('nom_nombre_vialidad')?.value || '';
                        this.filtered = all.filter((option: { nomvial: string; }) =>
                        option.nomvial.toLowerCase().includes(searchTerm.toLowerCase()));
                        break;}
      case 'nom_tipo_asentamiento': {const searchTerm = formularioCapturar.get('nom_tipo_asentamiento')?.value || '';
                        this.filtered = all.filter((option: { descripcion: string; }) =>
                        option.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
                        break;}
      case 'nom_nombre_asentamiento': {const searchTerm = formularioCapturar.get('nom_nombre_asentamiento')?.value || '';
                        this.filtered = all.filter((option: { nom_asen: string; }) =>
                        option.nom_asen.toLowerCase().includes(searchTerm.toLowerCase()));
                        break;}
      case 'nom_tipo_vialidad_referencia1': {const searchTerm = formularioCapturar.get('nom_tipo_vialidad_referencia1')?.value || '';
                          this.filtered = all.filter((option: { descripcion: string; }) =>
                          option.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
                          break;}
      case 'nom_nombre_vialidad_referencia1': {const searchTerm = formularioCapturar.get('nom_nombre_vialidad_referencia1')?.value || '';
                          this.filtered = all.filter((option: { nomvial: string; }) =>
                          option.nomvial.toLowerCase().includes(searchTerm.toLowerCase()));
                          break;}
        case 'nom_tipo_vialidad_referencia2': {const searchTerm = formularioCapturar.get('nom_tipo_vialidad_referencia2')?.value || '';
                            this.filtered = all.filter((option: { descripcion: string; }) =>
                            option.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
                            break;}
        case 'nom_nombre_vialidad_referencia2': {const searchTerm = formularioCapturar.get('nom_nombre_vialidad_referencia2')?.value || '';
                            this.filtered = all.filter((option: { nomvial: string; }) =>
                            option.nomvial.toLowerCase().includes(searchTerm.toLowerCase()));
                            break;}
          case 'nom_tipo_vialidad_posterior': {const searchTerm = formularioCapturar.get('nom_tipo_vialidad_posterior')?.value || '';
                              this.filtered = all.filter((option: { descripcion: string; }) =>
                              option.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
                              break;}
          case 'nom_nombre_vialidad_posterior': {const searchTerm = formularioCapturar.get('nom_nombre_vialidad_posterior')?.value || '';
                              this.filtered = all.filter((option: { nomvial: string; }) =>
                              option.nomvial.toLowerCase().includes(searchTerm.toLowerCase()));
                              break;}

      default: break;
    }
    return this.filtered;
  }
}
