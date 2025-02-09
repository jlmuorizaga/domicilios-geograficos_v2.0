import { DomicilioGeografico } from '../model/domiciliogeografico';

export const tooltipEntidad: string = 'Sustantivo propio que identifica a la Entidad Federativa o a la Ciudad de México.';
export const tooltipMunicipio: string = 'Sustantivo propio que identifica al Municipio o, en el caso de Ciudad de México, a las Demarcaciones Territoriales.';
export const tooltipLocalidad: string = 'Sustantivo propio que identifica a la Localidad.';
export const tooltipTipoVialidad: string = 'Se refiere a la clasificación que se le da a la vialidad, en función del tránsito vehicular y/o peatonal.';
export const tooltipNombreVialidad: string = 'Sustantivo propio que identifica a la vialidad.';
export const tooltipNumeroExterior: string = 'Caracteres alfanuméricos y símbolos que identifican un predio o inmueble en una vialidad.';
export const tooltipNumeroInterior: string = 'Caracteres alfanuméricos y símbolos que identifican una vivienda o establecimiento al interior de un predio o inmueble, con número exterior designado.';
export const tooltipTipoAsentamiento: string = 'Se refiere a la clasificación que se le da al asentamiento humano, en función de sus características.';
export const tooltipNombreAsentamiento: string = 'Sustantivo propio que identifica al asentamiento humano.';
export const tooltipCodigoPostal: string = 'Clave numérica compuesta por cinco dígitos, asignada por el Servicio Postal Mexicano, que identifica y ubica un área geográfica del país y la oficina postal que la sirve, para facilitar al correo, el encaminamiento, la distribución y el reparto de la materia postal.';
export const tooltipTipoVialidadReferencia1: string = 'Hace referencia al tipo de las vialidades entre las cuales se ubica un Domicilio Geográfico de interés, están definidas por las vialidades perpendiculares a la vialidad sobre la que se encuentra el frente de manzana en donde se ubica el acceso principal del predio o inmueble.';
export const tooltipNombreVialidadReferencia1: string = 'Hace referencia al nombre de las vialidades entre las cuales se ubica un Domicilio Geográfico de interés, están definidas por las vialidades perpendiculares a la vialidad sobre la que se encuentra el frente de manzana en donde se ubica el acceso principal del predio o inmueble.';
export const tooltipTipoVialidadReferencia2: string = 'Hace referencia al tipo de las vialidades entre las cuales se ubica un Domicilio Geográfico de interés, están definidas por las vialidades perpendiculares a la vialidad sobre la que se encuentra el frente de manzana en donde se ubica el acceso principal del predio o inmueble.';
export const tooltipNombreVialidadReferencia2: string = 'Hace referencia al nombre de las vialidades entre las cuales se ubica un Domicilio Geográfico de interés, están definidas por las vialidades perpendiculares a la vialidad sobre la que se encuentra el frente de manzana en donde se ubica el acceso principal del predio o inmueble.';
export const tooltipTipoVialidadReferenciaPosterior: string = 'Hace referencia al tipo de la vialidad que se encuentra en la parte posterior de la Vialidad donde se ubica el Domicilio Geográfico de Interés.';
export const tooltipNombreVialidadReferenciaPosterior: string = 'Hace referencia al nombre de la vialidad que se encuentra en la parte posterior de la Vialidad donde se ubica el Domicilio Geográfico de Interés.';
export const tooltipDescripcionUbicacion: string = 'Se refiere a rasgos naturales o culturales (edificaciones) que aportan información del Domicilio Geográfico referido a un predio o inmueble, mismos que son fácilmente identificables, esto es fundamental en vialidades donde se carece de nombre y número exterior, en carreteras, caminos, terracerías, brechas, veredas, arroyos, ríos, canales, línea de costa continentales e insulares, localidades rurales de difícil acceso, elementos del territorio insular, información de domicilios derivada del crecimiento de una zona urbana y domicilios conocidos.';

export class Constantes {

  static ordenCampos(domiciliosGeograficos: DomicilioGeografico[]) {
    const dataToExport = domiciliosGeograficos.map((item) => ({
//      cve_tipo_vialidad: item.cve_tipo_vialidad,
      nom_tipo_vialidad: item.nom_tipo_vialidad,
      cve_nombre_vialidad: item.cve_nombre_vialidad,
      nom_nombre_vialidad: item.nom_nombre_vialidad,
      numero_exterior: item.numero_exterior,
      numero_interior: item.numero_interior,
//      cve_tipo_asentamiento: item.cve_tipo_asentamiento,
      nom_tipo_asentamiento: item.nom_tipo_asentamiento,
      cve_nombre_asentamiento: item.cve_nombre_asentamiento,
      nom_nombre_asentamiento: item.nom_nombre_asentamiento,
      codigo_postal: item.codigo_postal,
      cve_loc: item.cve_loc,
      nom_loc: item.nom_loc,
      cve_mun: item.cve_mun,
      nom_mun: item.nom_mun,
      cve_ent: item.cve_ent,
      nom_ent: item.nom_ent,
      cve_tipo_vialidad_referencia1: item.cve_tipo_vialidad_referencia1,
      nom_tipo_vialidad_referencia1: item.nom_tipo_vialidad_referencia1,
      cve_nombre_vialidad_referencia1: item.cve_nombre_vialidad_referencia1,
      nom_nombre_vialidad_referencia1: item.nom_nombre_vialidad_referencia1,
      cve_tipo_vialidad_referencia2: item.cve_tipo_vialidad_referencia2,
      nom_tipo_vialidad_referencia2: item.nom_tipo_vialidad_referencia2,
      cve_nombre_vialidad_referencia2: item.cve_nombre_vialidad_referencia2,
      nom_nombre_vialidad_referencia2: item.nom_nombre_vialidad_referencia2,
      cve_tipo_vialidad_posterior: item.cve_tipo_vialidad_posterior,
      nom_tipo_vialidad_posterior: item.nom_tipo_vialidad_posterior,
      cve_nombre_vialidad_posterior: item.cve_nombre_vialidad_posterior,
      nom_nombre_vialidad_posterior: item.nom_nombre_vialidad_posterior,
      descripcion_ubicacion: item.descripcion_ubicacion,
      ambito: item.ambito
    }));
    return dataToExport;
  }

}
