import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { getServices } from 'src/app/utils/getServices';
import { getFilterOptions } from 'src/app/utils/getFilterOptions';
import { Entidad } from 'src/app/model/entidad';
import { Municipio } from 'src/app/model/municipio';
import { Localidad } from 'src/app/model/localidad';
import { Vialidad } from 'src/app/model/vialidad';
import { Asentamiento } from 'src/app/model/asentamiento';
import { DomicilioGeografico } from 'src/app/model/domiciliogeografico';
import { Utils } from 'src/app/utils/utils';





import { DomicilioGeograficoService } from '../../services/domiciliogeografico.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons';
import { tooltipEntidad, tooltipMunicipio, tooltipLocalidad, tooltipTipoVialidad, tooltipNombreVialidad,
  tooltipNumeroExterior, tooltipNumeroInterior, tooltipTipoAsentamiento, tooltipNombreAsentamiento,
  tooltipCodigoPostal, tooltipTipoVialidadReferencia1, tooltipNombreVialidadReferencia1,
  tooltipTipoVialidadReferencia2, tooltipNombreVialidadReferencia2,
  tooltipTipoVialidadReferenciaPosterior, tooltipNombreVialidadReferenciaPosterior,
  tooltipDescripcionUbicacion } from 'src/app/utils/constantes';

import { ControlSpinner } from 'src/app/model/controlSpinner';



@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.page.html',
  styleUrls: ['./capturar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class CapturarPage implements OnInit {
  formularioCapturar!: FormGroup;
  domicilioGeografico!: DomicilioGeografico;
  allEntidades: Entidad[] = [];
  filteredEntidades: Entidad[] = [];
  isOptionsVisibleEntidades: boolean = false;
  allMunicipios: Municipio[] = [];
  filteredMunicipios: Municipio[] = [];
  isOptionsVisibleMunicipios: boolean = false;
  allLocalidades: Localidad[] = [];
  filteredLocalidades: Localidad[] = [];
  isOptionsVisibleLocalidades: boolean = false;
  allTiposVialidades: Vialidad[] = [];
  filteredTiposVialidades: Vialidad[] = [];
  isOptionsVisibleTiposVialidades: boolean = false;
  allNombresVialidades: Vialidad[] = [];
  filteredNombresVialidades: Vialidad[] = [];
  isOptionsVisibleNombresVialidades: boolean = false;
  allNumerosExteriores: string[] = ['Domicilio Conocido', 'Sin Número'];
  isOptionsVisibleNumerosExteriores: boolean = false;
  allTiposAsentamientos: Asentamiento[] = [];
  filteredTiposAsentamientos: Asentamiento[] = [];
  isOptionsVisibleTiposAsentamientos: boolean = false;
  allNombresAsentamientos: Asentamiento[] = [];
  filteredNombresAsentamientos: Asentamiento[] = [];
  isOptionsVisibleNombresAsentamientos: boolean = false;
  allTiposVialidadesReferencia1: Vialidad[] = [];
  filteredTiposVialidadesReferencia1: Vialidad[] = [];
  isOptionsVisibleTiposVialidadesReferencia1: boolean = false;
  allNombresVialidadesReferencia1: Vialidad[] = [];
  filteredNombresVialidadesReferencia1: Vialidad[] = [];
  isOptionsVisibleNombresVialidadesReferencia1: boolean = false;
  allTiposVialidadesReferencia2: Vialidad[] = [];
  filteredTiposVialidadesReferencia2: Vialidad[] = [];
  isOptionsVisibleTiposVialidadesReferencia2: boolean = false;
  allNombresVialidadesReferencia2: Vialidad[] = [];
  filteredNombresVialidadesReferencia2: Vialidad[] = [];
  isOptionsVisibleNombresVialidadesReferencia2: boolean = false;
  allTiposVialidadesPosterior: Vialidad[] = [];
  filteredTiposVialidadesPosterior: Vialidad[] = [];
  isOptionsVisibleTiposVialidadesPosterior: boolean = false;
  allNombresVialidadesPosterior: Vialidad[] = [];
  filteredNombresVialidadesPosterior: Vialidad[] = [];
  isOptionsVisibleNombresVialidadesPosterior: boolean = false;
  tooltipEntidad: string = tooltipEntidad;
  tooltipMunicipio: string = tooltipMunicipio;
  tooltipLocalidad: string = tooltipLocalidad;
  tooltipTipoVialidad: string = tooltipTipoVialidad;
  tooltipNombreVialidad: string = tooltipNombreVialidad;
  tooltipNumeroExterior: string = tooltipNumeroExterior;
  tooltipNumeroInterior: string = tooltipNumeroInterior;
  tooltipTipoAsentamiento: string = tooltipTipoAsentamiento;
  tooltipNombreAsentamiento: string = tooltipNombreAsentamiento;
  tooltipCodigoPostal: string = tooltipCodigoPostal;
  tooltipTipoVialidadReferencia1: string = tooltipTipoVialidadReferencia1;
  tooltipNombreVialidadReferencia1: string = tooltipNombreVialidadReferencia1;
  tooltipTipoVialidadReferencia2: string = tooltipTipoVialidadReferencia2;
  tooltipNombreVialidadReferencia2: string = tooltipNombreVialidadReferencia2;
  tooltipTipoVialidadReferenciaPosterior: string = tooltipTipoVialidadReferenciaPosterior;
  tooltipNombreVialidadReferenciaPosterior: string = tooltipNombreVialidadReferenciaPosterior;
  tooltipDescripcionUbicacion: string = tooltipDescripcionUbicacion;
  idEdicion!: string;
  titulo!: string;
  backButton!: string;
  textoBoton!: string;
  controlSpinner!: ControlSpinner;

  //LGDD
  //selectedOption: string = '';
  //LGDD
  constructor(private readonly fb: FormBuilder, private readonly getServices: getServices,
  private readonly domicilioGeograficoSvc: DomicilioGeograficoService,
  private readonly alertController: AlertController, private router: Router) {
    this.controlSpinner = new ControlSpinner;
    this.controlSpinner.showSpinner = false;
    addIcons({ informationCircleOutline });
    this.formularioCapturar = this.fb.group({
      'nom_ent': new FormControl("", Validators.required),
      'nom_mun': new FormControl("", Validators.required),
      'nom_loc': new FormControl("", Validators.required),
      'nom_tipo_vialidad': new FormControl("", Validators.required),
      'nom_nombre_vialidad': new FormControl("", [Validators.required, Validators.maxLength(255)]),
      'numero_exterior': new FormControl("", [Validators.required, Validators.maxLength(50)]),
      'numero_interior': new FormControl("", Validators.maxLength(50)),
      'nom_tipo_asentamiento': new FormControl("", Validators.required),
      'nom_nombre_asentamiento': new FormControl("", [Validators.required, Validators.maxLength(255)]),
      'codigo_postal': new FormControl("", [Validators.required, Validators.pattern(/^\d{5}$/)]),
      'nom_tipo_vialidad_referencia1': new FormControl(""),
      'nom_nombre_vialidad_referencia1': new FormControl("", Validators.maxLength(255)),
      'nom_tipo_vialidad_referencia2': new FormControl(""),
      'nom_nombre_vialidad_referencia2': new FormControl("", Validators.maxLength(255)),
      'nom_tipo_vialidad_posterior': new FormControl(""),
      'nom_nombre_vialidad_posterior': new FormControl("", Validators.maxLength(255)),
      'descripcion_ubicacion': new FormControl("", Validators.maxLength(255))
    });
  }

  ngOnInit() {
    const dg = history.state.data;
    if (dg === undefined) {
      this.titulo = 'Capturar Domicilio Geográfico';
      this.backButton = '/menu';
      this.textoBoton = 'Guardar Captura';
      this.domicilioGeografico = new DomicilioGeografico;
      this.getEntidades();
    } else {
      this.idEdicion = dg.id;
      this.titulo = 'Editar Domicilio Geográfico';
      this.backButton = '/editar';
      this.textoBoton = 'Guardar Edición';
      this.domicilioGeografico = dg;
      this.getDomicilioGeografico();
    }
  }

  getDomicilioGeografico() {
    this.formularioCapturar.get('nom_ent')?.setValue(this.domicilioGeografico.nom_ent);
    this.formularioCapturar.get('nom_mun')?.setValue(this.domicilioGeografico.nom_mun);
    this.formularioCapturar.get('nom_loc')?.setValue(this.domicilioGeografico.nom_loc);
    this.formularioCapturar.get('nom_tipo_vialidad')?.setValue(this.domicilioGeografico.nom_tipo_vialidad);
    this.formularioCapturar.get('nom_nombre_vialidad')?.setValue(this.domicilioGeografico.nom_nombre_vialidad);
    this.formularioCapturar.get('numero_exterior')?.setValue(this.domicilioGeografico.numero_exterior);
    this.formularioCapturar.get('numero_interior')?.setValue(this.domicilioGeografico.numero_interior);
    this.formularioCapturar.get('nom_tipo_asentamiento')?.setValue(this.domicilioGeografico.nom_tipo_asentamiento);
    this.formularioCapturar.get('nom_nombre_asentamiento')?.setValue(this.domicilioGeografico.nom_nombre_asentamiento);
    this.formularioCapturar.get('codigo_postal')?.setValue(this.domicilioGeografico.codigo_postal);
    this.formularioCapturar.get('nom_tipo_vialidad_referencia1')?.setValue(this.domicilioGeografico.nom_tipo_vialidad_referencia1);
    this.formularioCapturar.get('nom_nombre_vialidad_referencia1')?.setValue(this.domicilioGeografico.nom_nombre_vialidad_referencia1);
    this.formularioCapturar.get('nom_tipo_vialidad_referencia2')?.setValue(this.domicilioGeografico.nom_tipo_vialidad_referencia2);
    this.formularioCapturar.get('nom_nombre_vialidad_referencia2')?.setValue(this.domicilioGeografico.nom_nombre_vialidad_referencia2);
    this.formularioCapturar.get('nom_tipo_vialidad_posterior')?.setValue(this.domicilioGeografico.nom_tipo_vialidad_posterior);
    this.formularioCapturar.get('nom_nombre_vialidad_posterior')?.setValue(this.domicilioGeografico.nom_nombre_vialidad_posterior);
    this.formularioCapturar.get('descripcion_ubicacion')?.setValue(this.domicilioGeografico.descripcion_ubicacion);
    this.getEntidades();
    this.getMunicipios(this.domicilioGeografico.cve_ent);
    this.getLocalidades(this.domicilioGeografico.cve_ent, this.domicilioGeografico.cve_mun);
    this.getTiposVialidades(this.domicilioGeografico.cve_ent, this.domicilioGeografico.cve_mun, this.domicilioGeografico.cve_loc);
    this.getNombresVialidades(this.domicilioGeografico.cve_ent, this.domicilioGeografico.cve_mun, this.domicilioGeografico.cve_loc, this.domicilioGeografico.cve_tipo_vialidad);
    this.getTiposAsentamientos(this.domicilioGeografico.cve_ent, this.domicilioGeografico.cve_mun, this.domicilioGeografico.cve_loc);
    this.getNombresAsentamientos(this.domicilioGeografico.cve_ent, this.domicilioGeografico.cve_mun, this.domicilioGeografico.cve_loc, this.domicilioGeografico.cve_tipo_asentamiento);
    this.getTiposVialidadesReferencia1(this.domicilioGeografico.cve_ent, this.domicilioGeografico.cve_mun, this.domicilioGeografico.cve_loc);
    this.getNombresVialidadesReferencia1(this.domicilioGeografico.cve_ent, this.domicilioGeografico.cve_mun, this.domicilioGeografico.cve_loc, this.domicilioGeografico.cve_tipo_vialidad_referencia1);
    this.getTiposVialidadesReferencia2(this.domicilioGeografico.cve_ent, this.domicilioGeografico.cve_mun, this.domicilioGeografico.cve_loc);
    this.getNombresVialidadesReferencia2(this.domicilioGeografico.cve_ent, this.domicilioGeografico.cve_mun, this.domicilioGeografico.cve_loc, this.domicilioGeografico.cve_tipo_vialidad_referencia2);
    this.getTiposVialidadesPosterior(this.domicilioGeografico.cve_ent, this.domicilioGeografico.cve_mun, this.domicilioGeografico.cve_loc);
    this.getNombresVialidadesPosterior(this.domicilioGeografico.cve_ent, this.domicilioGeografico.cve_mun, this.domicilioGeografico.cve_loc, this.domicilioGeografico.cve_tipo_vialidad_posterior);
  }

  getEntidades() {
    this.getServices.getEntidades();
    this.getServices.allEntidades$.subscribe((entidades) => {
      this.allEntidades = entidades;
      this.filteredEntidades = [...entidades];
    });
  }

  getMunicipios(cve_ent_param: string) {
    this.getServices.getMunicipios(cve_ent_param);
    this.getServices.allMunicipios$.subscribe((municipios) => {
      this.allMunicipios = municipios;
      this.filteredMunicipios = [...municipios];
    });
  }

  getLocalidades(cve_ent_param: string, cve_mun_param: string) {
    this.getServices.getLocalidades(cve_ent_param, cve_mun_param);
    this.getServices.allLocalidades$.subscribe((localidades) => {
      this.allLocalidades = localidades;
      this.filteredLocalidades = [...localidades];
    });
  }

  getTiposVialidades(cve_ent_param: string, cve_mun_param: string, cve_loc_param: string) {
    this.getServices.getTiposVialidades(cve_ent_param, cve_mun_param, cve_loc_param);
    this.getServices.allTiposVialidades$.subscribe((tiposVialidades) => {
      this.allTiposVialidades = tiposVialidades;
      this.filteredTiposVialidades = [...tiposVialidades];
    });
  }

  getNombresVialidades(cve_ent_param: string, cve_mun_param: string, cve_loc_param: string, cve_tipo_vialidad_param: string) {
    this.getServices.getNombresVialidades(cve_ent_param, cve_mun_param, cve_loc_param, cve_tipo_vialidad_param, this.controlSpinner);
    this.getServices.allNombresVialidades$
    .subscribe((nombresVialidades) => {
      this.allNombresVialidades = nombresVialidades;
      this.filteredNombresVialidades = [...nombresVialidades];
    });
  }

  getTiposAsentamientos(cve_ent_param: string, cve_mun_param: string, cve_loc_param: string) {
    this.getServices.getTiposAsentamientos(cve_ent_param, cve_mun_param, cve_loc_param);
    this.getServices.allTiposAsentamientos$.subscribe((tiposAsentamientos) => {
      this.allTiposAsentamientos = tiposAsentamientos;
      this.filteredTiposAsentamientos = [...tiposAsentamientos];
    });
  }

  getNombresAsentamientos(cve_ent_param: string, cve_mun_param: string, cve_loc_param: string, cve_tipo_asentamiento_param: string) {
    this.getServices.getNombresAsentamientos(cve_ent_param, cve_mun_param, cve_loc_param, cve_tipo_asentamiento_param);
    this.getServices.allNombresAsentamientos$.subscribe((nombresAsentamientos) => {
      this.allNombresAsentamientos = nombresAsentamientos;
      this.filteredNombresAsentamientos = [...nombresAsentamientos];
    });
  }

  getTiposVialidadesReferencia1(cve_ent_param: string, cve_mun_param: string, cve_loc_param: string) {
    this.getServices.getTiposVialidades(cve_ent_param, cve_mun_param, cve_loc_param);
    this.getServices.allTiposVialidades$.subscribe((tiposVialidadesReferencia1) => {
      this.allTiposVialidadesReferencia1 = tiposVialidadesReferencia1;
      this.filteredTiposVialidadesReferencia1 = [...tiposVialidadesReferencia1];
    });
  }

  getNombresVialidadesReferencia1(cve_ent_param: string, cve_mun_param: string, cve_loc_param: string, cve_tipo_vialidad_param: string) {
    this.getServices.getNombresVialidades(cve_ent_param, cve_mun_param, cve_loc_param, cve_tipo_vialidad_param, this.controlSpinner);
    this.getServices.allNombresVialidades$.subscribe((nombresVialidadesReferencia1) => {
      this.allNombresVialidadesReferencia1 = nombresVialidadesReferencia1;
      this.filteredNombresVialidadesReferencia1 = [...nombresVialidadesReferencia1];
    });
  }

  getTiposVialidadesReferencia2(cve_ent_param: string, cve_mun_param: string, cve_loc_param: string) {
    this.getServices.getTiposVialidades(cve_ent_param, cve_mun_param, cve_loc_param);
    this.getServices.allTiposVialidades$.subscribe((tiposVialidadesReferencia2) => {
      this.allTiposVialidadesReferencia2 = tiposVialidadesReferencia2;
      this.filteredTiposVialidadesReferencia2 = [...tiposVialidadesReferencia2];
    });
  }

  getNombresVialidadesReferencia2(cve_ent_param: string, cve_mun_param: string, cve_loc_param: string, cve_tipo_vialidad_param: string) {
    this.getServices.getNombresVialidades(cve_ent_param, cve_mun_param, cve_loc_param, cve_tipo_vialidad_param, this.controlSpinner);
    this.getServices.allNombresVialidades$.subscribe((nombresVialidadesReferencia2) => {
      this.allNombresVialidadesReferencia2 = nombresVialidadesReferencia2;
      this.filteredNombresVialidadesReferencia2 = [...nombresVialidadesReferencia2];
    });
  }

  getTiposVialidadesPosterior(cve_ent_param: string, cve_mun_param: string, cve_loc_param: string) {
    this.getServices.getTiposVialidades(cve_ent_param, cve_mun_param, cve_loc_param);
    this.getServices.allTiposVialidades$.subscribe((tiposVialidadesPosterior) => {
      this.allTiposVialidadesPosterior = tiposVialidadesPosterior;
      this.filteredTiposVialidadesPosterior = [...tiposVialidadesPosterior];
    });
  }

  getNombresVialidadesPosterior(cve_ent_param: string, cve_mun_param: string, cve_loc_param: string, cve_tipo_vialidad_param: string) {
    this.getServices.getNombresVialidades(cve_ent_param, cve_mun_param, cve_loc_param, cve_tipo_vialidad_param, this.controlSpinner);
    this.getServices.allNombresVialidades$.subscribe((nombresVialidadesPosterior) => {
      this.allNombresVialidadesPosterior = nombresVialidadesPosterior;
      this.filteredNombresVialidadesPosterior = [...nombresVialidadesPosterior];
    });
  }

  filterOptions(param: string) {
    switch (param) {
      case 'nom_ent': this.filteredEntidades = getFilterOptions.filterOptions(param, this.formularioCapturar, this.allEntidades ); break;
      case 'nom_mun': this.filteredMunicipios = getFilterOptions.filterOptions(param, this.formularioCapturar, this.allMunicipios); break;
      case 'nom_loc': this.filteredLocalidades = getFilterOptions.filterOptions(param, this.formularioCapturar, this.allLocalidades); break;
      case 'nom_tipo_vialidad': this.filteredTiposVialidades = getFilterOptions.filterOptions(param, this.formularioCapturar, this.allTiposVialidades); break;
      case 'nom_nombre_vialidad': this.filteredNombresVialidades = getFilterOptions.filterOptions(param, this.formularioCapturar, this.allNombresVialidades); break;
      case 'nom_tipo_asentamiento': this.filteredTiposAsentamientos = getFilterOptions.filterOptions(param, this.formularioCapturar, this.allTiposAsentamientos); break;
      case 'nom_nombre_asentamiento': this.filteredNombresAsentamientos = getFilterOptions.filterOptions(param, this.formularioCapturar, this.allNombresAsentamientos); break;
      case 'nom_tipo_vialidad_referencia1': this.filteredTiposVialidadesReferencia1 = getFilterOptions.filterOptions(param, this.formularioCapturar, this.allTiposVialidadesReferencia1); break;
      case 'nom_nombre_vialidad_referencia1': this.filteredNombresVialidadesReferencia1 = getFilterOptions.filterOptions(param, this.formularioCapturar, this.allNombresVialidadesReferencia1); break;
      case 'nom_tipo_vialidad_referencia2': this.filteredTiposVialidadesReferencia2 = getFilterOptions.filterOptions(param, this.formularioCapturar, this.allTiposVialidadesReferencia2); break;
      case 'nom_nombre_vialidad_referencia2': this.filteredNombresVialidadesReferencia2 = getFilterOptions.filterOptions(param, this.formularioCapturar, this.allNombresVialidadesReferencia2); break;
      case 'nom_tipo_vialidad_posterior': this.filteredTiposVialidadesPosterior = getFilterOptions.filterOptions(param, this.formularioCapturar, this.allTiposVialidadesPosterior); break;
      case 'nom_nombre_vialidad_posterior': this.filteredNombresVialidadesPosterior = getFilterOptions.filterOptions(param, this.formularioCapturar, this.allNombresVialidadesPosterior); break;
      default: break;
    }
  }

  toggleOptions(param: string) {
    switch (param) {
      case 'nom_ent': this.isOptionsVisibleEntidades = !this.isOptionsVisibleEntidades ; break;
      case 'nom_mun': this.isOptionsVisibleMunicipios = !this.isOptionsVisibleMunicipios; break;
      case 'nom_loc': this.isOptionsVisibleLocalidades = !this.isOptionsVisibleLocalidades; break;
      case 'nom_tipo_vialidad': this.isOptionsVisibleTiposVialidades = !this.isOptionsVisibleTiposVialidades; break;
      case 'nom_nombre_vialidad': this.isOptionsVisibleNombresVialidades = !this.isOptionsVisibleNombresVialidades; break;
      case 'numero_exterior': this.isOptionsVisibleNumerosExteriores = !this.isOptionsVisibleNumerosExteriores; break;
      case 'nom_tipo_asentamiento': this.isOptionsVisibleTiposAsentamientos = !this.isOptionsVisibleTiposAsentamientos; break;
      case 'nom_nombre_asentamiento': this.isOptionsVisibleNombresAsentamientos = !this.isOptionsVisibleNombresAsentamientos; break;
      case 'nom_tipo_vialidad_referencia1': this.isOptionsVisibleTiposVialidadesReferencia1 = !this.isOptionsVisibleTiposVialidadesReferencia1; break;
      case 'nom_nombre_vialidad_referencia1': this.isOptionsVisibleNombresVialidadesReferencia1 = !this.isOptionsVisibleNombresVialidadesReferencia1; break;
      case 'nom_tipo_vialidad_referencia2': this.isOptionsVisibleTiposVialidadesReferencia2 = !this.isOptionsVisibleTiposVialidadesReferencia2; break;
      case 'nom_nombre_vialidad_referencia2': this.isOptionsVisibleNombresVialidadesReferencia2 = !this.isOptionsVisibleNombresVialidadesReferencia2; break;
      case 'nom_tipo_vialidad_posterior': this.isOptionsVisibleTiposVialidadesPosterior = !this.isOptionsVisibleTiposVialidadesPosterior; break;
      case 'nom_nombre_vialidad_posterior': this.isOptionsVisibleNombresVialidadesPosterior = !this.isOptionsVisibleNombresVialidadesPosterior; break;
      default: break;
    }
  }

  selectOption(option: any, param: string) {
    switch (param) {
      case 'nom_ent':
        this.domicilioGeografico.cve_ent = option.cve_ent;
        this.domicilioGeografico.nom_ent = option.nomgeo;
        this.formularioCapturar.get('nom_ent')?.setValue(option.nomgeo);
        this.isOptionsVisibleEntidades  = false;
        this.formularioCapturar.get('nom_mun')?.setValue('');
        this.formularioCapturar.get('nom_loc')?.setValue('');
        this.formularioCapturar.get('nom_tipo_vialidad')?.setValue('');
        this.formularioCapturar.get('nom_nombre_vialidad')?.setValue('');
        this.formularioCapturar.get('numero_exterior')?.setValue('');
        this.formularioCapturar.get('numero_interior')?.setValue('');
        this.formularioCapturar.get('nom_tipo_asentamiento')?.setValue('');
        this.formularioCapturar.get('nom_nombre_asentamiento')?.setValue('');
        this.formularioCapturar.get('codigo_postal')?.setValue('');
        this.formularioCapturar.get('nom_tipo_vialidad_referencia1')?.setValue('');
        this.formularioCapturar.get('nom_nombre_vialidad_referencia1')?.setValue('');
        this.formularioCapturar.get('nom_tipo_vialidad_referencia2')?.setValue('');
        this.formularioCapturar.get('nom_nombre_vialidad_referencia2')?.setValue('');
        this.formularioCapturar.get('nom_tipo_vialidad_posterior')?.setValue('');
        this.formularioCapturar.get('nom_nombre_vialidad_posterior')?.setValue('');
        this.formularioCapturar.get('descripcion_ubicacion')?.setValue('');
        this.getMunicipios(option.cve_ent);
        break;
      case 'nom_mun':
        this.domicilioGeografico.cve_mun = option.cve_mun;
        this.domicilioGeografico.nom_mun = option.nomgeo;
        this.formularioCapturar.get('nom_mun')?.setValue(option.nomgeo);
        this.isOptionsVisibleMunicipios = false;
        this.formularioCapturar.get('nom_loc')?.setValue('');
        this.formularioCapturar.get('nom_tipo_vialidad')?.setValue('');
        this.formularioCapturar.get('nom_nombre_vialidad')?.setValue('');
        this.formularioCapturar.get('numero_exterior')?.setValue('');
        this.formularioCapturar.get('numero_interior')?.setValue('');
        this.formularioCapturar.get('nom_tipo_asentamiento')?.setValue('');
        this.formularioCapturar.get('nom_nombre_asentamiento')?.setValue('');
        this.formularioCapturar.get('codigo_postal')?.setValue('');
        this.formularioCapturar.get('nom_tipo_vialidad_referencia1')?.setValue('');
        this.formularioCapturar.get('nom_nombre_vialidad_referencia1')?.setValue('');
        this.formularioCapturar.get('nom_tipo_vialidad_referencia2')?.setValue('');
        this.formularioCapturar.get('nom_nombre_vialidad_referencia2')?.setValue('');
        this.formularioCapturar.get('nom_tipo_vialidad_posterior')?.setValue('');
        this.formularioCapturar.get('nom_nombre_vialidad_posterior')?.setValue('');
        this.formularioCapturar.get('descripcion_ubicacion')?.setValue('');
        this.getLocalidades(option.cve_ent, option.cve_mun);
        break;
      case 'nom_loc':
        this.domicilioGeografico.cve_loc = option.cve_loc;
        this.domicilioGeografico.nom_loc = option.nomgeo;
        this.domicilioGeografico.ambito = option.ambito;
        this.formularioCapturar.get('nom_loc')?.setValue(option.nomgeo);
        this.isOptionsVisibleLocalidades = false;
        this.formularioCapturar.get('nom_tipo_vialidad')?.setValue('');
        this.formularioCapturar.get('nom_nombre_vialidad')?.setValue('');
        this.formularioCapturar.get('numero_exterior')?.setValue('');
        this.formularioCapturar.get('numero_interior')?.setValue('');
        this.formularioCapturar.get('nom_tipo_asentamiento')?.setValue('');
        this.formularioCapturar.get('nom_nombre_asentamiento')?.setValue('');
        this.formularioCapturar.get('codigo_postal')?.setValue('');
        this.formularioCapturar.get('nom_tipo_vialidad_referencia1')?.setValue('');
        this.formularioCapturar.get('nom_nombre_vialidad_referencia1')?.setValue('');
        this.formularioCapturar.get('nom_tipo_vialidad_referencia2')?.setValue('');
        this.formularioCapturar.get('nom_nombre_vialidad_referencia2')?.setValue('');
        this.formularioCapturar.get('nom_tipo_vialidad_posterior')?.setValue('');
        this.formularioCapturar.get('nom_nombre_vialidad_posterior')?.setValue('');
        this.formularioCapturar.get('descripcion_ubicacion')?.setValue('');
        this.getTiposVialidades(option.cve_ent, option.cve_mun, option.cve_loc);
        this.getTiposAsentamientos(option.cve_ent, option.cve_mun, option.cve_loc);
        this.getTiposVialidadesReferencia1(option.cve_ent, option.cve_mun, option.cve_loc);
        this.getTiposVialidadesReferencia2(option.cve_ent, option.cve_mun, option.cve_loc);
        this.getTiposVialidadesPosterior(option.cve_ent, option.cve_mun, option.cve_loc);
        break;
      case 'nom_tipo_vialidad':
        this.domicilioGeografico.cve_tipo_vialidad = option.cve_tipovial;
        this.domicilioGeografico.nom_tipo_vialidad = option.descripcion;
        this.formularioCapturar.get('nom_tipo_vialidad')?.setValue(option.descripcion);
        this.isOptionsVisibleTiposVialidades = false;
        this.formularioCapturar.get('nom_nombre_vialidad')?.setValue('');
        this.getNombresVialidades(option.cve_ent, option.cve_mun, option.cve_loc, option.cve_tipovial);
        break;
      case 'nom_nombre_vialidad':
        this.domicilioGeografico.cve_nombre_vialidad = option.cvevial;
        this.domicilioGeografico.nom_nombre_vialidad = option.nomvial;
        this.formularioCapturar.get('nom_nombre_vialidad')?.setValue(option.nomvial);
        this.isOptionsVisibleNombresVialidades = false;
        this.formularioCapturar.get('numero_exterior')?.setValue('');
        this.formularioCapturar.get('numero_interior')?.setValue('');
        break;
      case 'numero_exterior':
        this.domicilioGeografico.numero_exterior = option;
        this.formularioCapturar.get('numero_exterior')?.setValue(option);
        this.isOptionsVisibleNumerosExteriores = false;
        break;
      case 'nom_tipo_asentamiento':
        this.domicilioGeografico.cve_tipo_asentamiento = option.cve_tipoasen;
        this.domicilioGeografico.nom_tipo_asentamiento = option.descripcion;
        this.formularioCapturar.get('nom_tipo_asentamiento')?.setValue(option.descripcion);
        this.isOptionsVisibleTiposAsentamientos = false;
        this.formularioCapturar.get('nom_nombre_asentamiento')?.setValue('');
        this.formularioCapturar.get('codigo_postal')?.setValue('');
        this.getNombresAsentamientos(option.cve_ent, option.cve_mun, option.cve_loc, option.cve_tipoasen);
        break;
      case 'nom_nombre_asentamiento':
        this.domicilioGeografico.cve_nombre_asentamiento = option.cve_asen;
        this.domicilioGeografico.nom_nombre_asentamiento = option.nom_asen;
        this.formularioCapturar.get('nom_nombre_asentamiento')?.setValue(option.nom_asen);
        this.isOptionsVisibleNombresAsentamientos = false;
        break;
      case 'nom_tipo_vialidad_referencia1':
        this.domicilioGeografico.cve_tipo_vialidad_referencia1 = option.cve_tipovial;
        this.domicilioGeografico.nom_tipo_vialidad_referencia1 = option.descripcion;
        this.formularioCapturar.get('nom_tipo_vialidad_referencia1')?.setValue(option.descripcion);
        this.isOptionsVisibleTiposVialidadesReferencia1 = false;
        this.formularioCapturar.get('nom_nombre_vialidad_referencia1')?.setValue('');
        this.getNombresVialidadesReferencia1(option.cve_ent, option.cve_mun, option.cve_loc, option.cve_tipovial);
        break;
      case 'nom_nombre_vialidad_referencia1':
        this.domicilioGeografico.cve_nombre_vialidad_referencia1 = option.cvevial;
        this.domicilioGeografico.nom_nombre_vialidad_referencia1 = option.nomvial;
        this.formularioCapturar.get('nom_nombre_vialidad_referencia1')?.setValue(option.nomvial);
        this.isOptionsVisibleNombresVialidadesReferencia1 = false;
        break;
      case 'nom_tipo_vialidad_referencia2':
        this.domicilioGeografico.cve_tipo_vialidad_referencia2 = option.cve_tipovial;
        this.domicilioGeografico.nom_tipo_vialidad_referencia2 = option.descripcion;
        this.formularioCapturar.get('nom_tipo_vialidad_referencia2')?.setValue(option.descripcion);
        this.isOptionsVisibleTiposVialidadesReferencia2 = false;
        this.formularioCapturar.get('nom_nombre_vialidad_referencia2')?.setValue('');
        this.getNombresVialidadesReferencia2(option.cve_ent, option.cve_mun, option.cve_loc, option.cve_tipovial);
        break;
      case 'nom_nombre_vialidad_referencia2':
        this.domicilioGeografico.cve_nombre_vialidad_referencia2 = option.cvevial;
        this.domicilioGeografico.nom_nombre_vialidad_referencia2 = option.nomvial;
        this.formularioCapturar.get('nom_nombre_vialidad_referencia2')?.setValue(option.nomvial);
        this.isOptionsVisibleNombresVialidadesReferencia2 = false;
        break;
      case 'nom_tipo_vialidad_posterior':
        this.domicilioGeografico.cve_tipo_vialidad_posterior = option.cve_tipovial;
        this.domicilioGeografico.nom_tipo_vialidad_posterior = option.descripcion;
        this.formularioCapturar.get('nom_tipo_vialidad_posterior')?.setValue(option.descripcion);
        this.isOptionsVisibleTiposVialidadesPosterior = false;
        this.formularioCapturar.get('nom_nombre_vialidad_posterior')?.setValue('');
        this.getNombresVialidadesPosterior(option.cve_ent, option.cve_mun, option.cve_loc, option.cve_tipovial);
        break;
      case 'nom_nombre_vialidad_posterior':
        this.domicilioGeografico.cve_nombre_vialidad_posterior = option.cvevial;
        this.domicilioGeografico.nom_nombre_vialidad_posterior = option.nomvial;
        this.formularioCapturar.get('nom_nombre_vialidad_posterior')?.setValue(option.nomvial);
        this.isOptionsVisibleNombresVialidadesPosterior = false;
        break;
      default: break;
    }
  }

  onKeyDown(event: KeyboardEvent, param: string) {
    switch (param) {
      case 'nom_tipo_vialidad':
        this.formularioCapturar.get('nom_nombre_vialidad')?.setValue('');
        this.filteredNombresVialidades = [];
        break;
      case 'nom_tipo_asentamiento':
        this.formularioCapturar.get('nom_nombre_asentamiento')?.setValue('');
        this.filteredNombresAsentamientos = [];
        break;
      case 'nom_tipo_vialidad_referencia1':
        this.formularioCapturar.get('nom_nombre_vialidad_referencia1')?.setValue('');
        this.filteredNombresVialidadesReferencia1 = [];
        break;
      case 'nom_tipo_vialidad_referencia2':
        this.formularioCapturar.get('nom_nombre_vialidad_referencia2')?.setValue('');
        this.filteredNombresVialidadesReferencia2 = [];
        break;
      case 'nom_tipo_vialidad_posterior':
        this.formularioCapturar.get('nom_nombre_vialidad_posterior')?.setValue('');
        this.filteredNombresVialidadesPosterior = [];
        break;
    }
    if (event.key === 'Enter' /*|| event.key === ' '*/) {
      this.toggleOptions(param);
    }
  }

  submitForm() {
    this.domicilioGeografico.id = this.titulo === environment.tituloCapturar
    ? Utils.generaIdUnico()
    : this.idEdicion;
    if (this.domicilioGeografico.nom_ent !== this.formularioCapturar.value.nom_ent) {
      this.domicilioGeografico.cve_ent = '00';
      this.domicilioGeografico.nom_ent = this.formularioCapturar.value.nom_ent;
    }
    if (this.domicilioGeografico.nom_mun !== this.formularioCapturar.value.nom_mun) {
      this.domicilioGeografico.cve_mun = '900';
      this.domicilioGeografico.nom_mun = this.formularioCapturar.value.nom_mun;
    }
    if (this.domicilioGeografico.nom_loc !== this.formularioCapturar.value.nom_loc) {
      this.domicilioGeografico.cve_loc = '9000';
      this.domicilioGeografico.nom_loc = this.formularioCapturar.value.nom_loc;
    }
    if (this.domicilioGeografico.nom_tipo_vialidad !== this.formularioCapturar.value.nom_tipo_vialidad) {
      this.domicilioGeografico.cve_tipo_vialidad = '0';
      this.domicilioGeografico.nom_tipo_vialidad = this.formularioCapturar.value.nom_tipo_vialidad;
    }
    if (this.domicilioGeografico.nom_nombre_vialidad !== this.formularioCapturar.value.nom_nombre_vialidad) {
      this.domicilioGeografico.cve_nombre_vialidad = '0';
      this.domicilioGeografico.nom_nombre_vialidad = this.formularioCapturar.value.nom_nombre_vialidad;
    }
    if (this.domicilioGeografico.nom_tipo_asentamiento !== this.formularioCapturar.value.nom_tipo_asentamiento) {
      this.domicilioGeografico.cve_tipo_asentamiento = '0';
      this.domicilioGeografico.nom_tipo_asentamiento = this.formularioCapturar.value.nom_tipo_asentamiento;
    }
    if (this.domicilioGeografico.nom_nombre_asentamiento !== this.formularioCapturar.value.nom_nombre_asentamiento) {
      this.domicilioGeografico.cve_nombre_asentamiento = '0';
      this.domicilioGeografico.nom_nombre_asentamiento = this.formularioCapturar.value.nom_nombre_asentamiento;
    }
    if (this.domicilioGeografico.nom_tipo_vialidad_referencia1 !== this.formularioCapturar.value.nom_tipo_vialidad_referencia1) {
      this.domicilioGeografico.cve_tipo_vialidad_referencia1 = '0';
      this.domicilioGeografico.nom_tipo_vialidad_referencia1 = this.formularioCapturar.value.nom_tipo_vialidad_referencia1;
    }
    if (this.domicilioGeografico.nom_nombre_vialidad_referencia1 !== this.formularioCapturar.value.nom_nombre_vialidad_referencia1) {
      this.domicilioGeografico.cve_nombre_vialidad_referencia1 = '0';
      this.domicilioGeografico.nom_nombre_vialidad_referencia1 = this.formularioCapturar.value.nom_nombre_vialidad_referencia1;
    }
    if (this.domicilioGeografico.nom_tipo_vialidad_referencia2 !== this.formularioCapturar.value.nom_tipo_vialidad_referencia2) {
      this.domicilioGeografico.cve_tipo_vialidad_referencia2 = '0';
      this.domicilioGeografico.nom_tipo_vialidad_referencia2 = this.formularioCapturar.value.nom_tipo_vialidad_referencia2;
    }
    if (this.domicilioGeografico.nom_nombre_vialidad_referencia2 !== this.formularioCapturar.value.nom_nombre_vialidad_referencia2) {
      this.domicilioGeografico.cve_nombre_vialidad_referencia2 = '0';
      this.domicilioGeografico.nom_nombre_vialidad_referencia2 = this.formularioCapturar.value.nom_nombre_vialidad_referencia2;
    }
    if (this.domicilioGeografico.nom_tipo_vialidad_posterior !== this.formularioCapturar.value.nom_tipo_vialidad_posterior) {
      this.domicilioGeografico.cve_tipo_vialidad_posterior = '0';
      this.domicilioGeografico.nom_tipo_vialidad_posterior = this.formularioCapturar.value.nom_tipo_vialidad_posterior;
    }
    if (this.domicilioGeografico.nom_nombre_vialidad_posterior !== this.formularioCapturar.value.nom_nombre_vialidad_posterior) {
      this.domicilioGeografico.cve_nombre_vialidad_posterior = '0';
      this.domicilioGeografico.nom_nombre_vialidad_posterior = this.formularioCapturar.value.nom_nombre_vialidad_posterior;
    }
    this.domicilioGeografico.numero_exterior = this.formularioCapturar.value.numero_exterior;
    this.domicilioGeografico.numero_interior = this.formularioCapturar.value.numero_interior;
    this.domicilioGeografico.codigo_postal = this.formularioCapturar.value.codigo_postal;
    this.domicilioGeografico.descripcion_ubicacion = this.formularioCapturar.value.descripcion_ubicacion;
    if (this.formularioCapturar.invalid) {
    } else {
//LGDD
/*      console.log('domicilio-geografico->', this.domicilioGeografico);
      if (this.domicilioGeografico.cve_loc === '9000') {
        this.presentAlertWithRadioButtons();
      }*/
//LGDD
      if (this.titulo === environment.tituloCapturar) {
        this.servicioCapturar();
      }
      if (this.titulo === environment.tituloEditar) {
        this.servicioEditar();
      }
    }
  }

  servicioCapturar() {
    this.domicilioGeograficoSvc.insertDomicilioGeografico(this.domicilioGeografico).subscribe({
      next: (response: any) => {
        this.mensajeRegistroExitoso('capturado');
      },
      error: (error: any) => {
        console.log('Ocurrió un error');
        console.log(error);
      }
    });
  }

  servicioEditar() {
    this.domicilioGeograficoSvc.updateDomicilioGeografico(this.domicilioGeografico).subscribe({
      next: (response: any) => {
        this.mensajeRegistroExitoso('editado');
      },
      error: (error: any) => {
        console.log('Ocurrió un error');
        console.log(error);
      }
    });
  }

  async mensajeRegistroExitoso(message: string) {
    const aviso = await this.alertController.create({
      header: 'Datos registrados',
      message: 'Se han ' + message + ' los datos del domicilio geográfico',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          if (message === 'capturado') {
            this.formularioCapturar.reset();
            this.ngOnInit();
            window.location.reload();
          }
          if (message === 'editado') {
            this.router.navigateByUrl(environment.paginaEditar);
          }
        }
      }],
    });
    aviso.backdropDismiss = false;
    aviso.onclick
    await aviso.present();
  }


//LGDD
/*  async presentAlertWithRadioButtons() {
    const aviso = await this.alertController.create({
      header: 'Estas capturando una nueva localidad',
      message: '¿Que ambito es?',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Rural',
          value: 'Rural',
          checked: true, // Marca esta opción por defecto
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Urbano',
          value: 'Urbano',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operación cancelada');
          },
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            this.selectedOption = data;
            console.log('Opción seleccionada:', data);
          },
        },
      ],
    });
    aviso.backdropDismiss = false;
    aviso.onclick
    await aviso.present();
  }*/
//LGDD

}
