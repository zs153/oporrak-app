export const tiposMovimiento = {
  crearDocumento: 0,
  modificarDocumento: 1,
  borrarDocumento: 2,
  crearUsuario: 3,
  modificarUsuario: 4,
  borrarUsuario: 5,
  crearOficina: 6,
  modificarOficina: 7,
  borrarOficina: 8,
  crearCurso: 9,
  modificarCurso: 10,
  borrarCurso: 11,
  crearTurno: 12,
  modificarTurno: 13,
  borrarTurno: 14,
  crearMatricula: 15,
  modificarMatricula: 16,
  borrarMatricula: 17,
  desasignarFormulario: 18,
  crearSms: 19,
  modificarSms: 20,
  borrarSms: 21,
  actualizarPerfil: 22,
  crearFraude: 23,
  modificarFraude: 24,
  borrarFraude: 25,
  asignarFraude: 26,
  resolverFraude: 27,
  remitirFraude: 28,
  desasignarFraude: 29,
  crearHito: 30,
  modificarHito: 31,
  borrarHito: 32,
  crearSubtipo: 33,
  modificarSubtipo: 34,
  borrarSubtipo: 35,
  modificarPerfil: 36,
  asignarCita: 37,
  crearCita: 38,
  modificarCita: 39,
  borrarCita: 40,
  crearEstado: 41,
  modificarEstado: 42,
  borrarEstado: 43,
  insertarUsuarioTurno: 44,
  borrarUsuarioTurno: 45,
  crearTipoEvento: 47,
  modificarTipoEvento: 48,
  borrarTipoEvento: 49,
  crearTipoFraude: 50,
  modificarTipoFraude: 51,
  borrarTipoFraude: 52,
  crearCarga: 53,
  modificiarCarga: 54,
  borrarCarga: 55,
  crearUsuarioCurso: 56,
  borrarUsuarioCurso: 57,
  crearUsuarioMatricula: 58,
  borrarUsuarioMatricula: 59,
  cambioPassword: 60,
  olvidoPassword: 61,
  restablecerPassword: 62,
  registroUsuario: 63,
}
export const tiposPerfil = {
  general: 1,
  informador: 3,
  liquidador: 8,
}
export const tiposRol = {
  usuario: 1,
  responsable: 2,
  admin: 3,
}
export const tiposVisualizacion = {
  todos: -1,
  pendientes: 1,
  resueltos: 2,
}
export const estadosUsuario = {
  reserva: 0,
  activo: 1,
}
export const estadosCurso = {
  cerrado: 0,
  abierto: 1,
}
export const estadosMatricula = {
  cerrada: 0,
  abierta: 1,
}
export const estadosDocumento = {
  pendiente: 0,
  asignado: 1,
  resuelto: 2,
  remitido: 3,
}
export const estadosFraude = {
  pendiente: 0,
  asignado: 1,
  resuelto: 2,
  remitido: 3,
}
export const estadosCita = {
  disponible: 0,
  asignado: 1,
}
export const estadosSms = {
  pendiente: 0,
  enviado: 1,
}
export const estadosHito = {
  sancionAnulada: -1,
  propuestaLiquidacion: 1,
  liquidacion: 2,
  propuestaSancion: 3,
  sancion: 4,
}
export const tiposLiquidacion = {
  ingresar: 1,
  devolver: 2,
}
export const estadosCarga = {
  pendiente: 0,
  procesado: 1,
}
export const tiposEstado = {
  traspaso: { ID: -1, DES: "TRASPASADO" },
  vacacion: { ID: 1, DES: "VACACION" },
  baja: { ID: 2, DES: "BAJA" },
  traspaso: { ID: 3, DES: "TRASPASO" },
  formacion: { ID: 4, DES: "FORMACION" },
  conciliacion: { ID: 5, DES: "CONCILIACION" },
  reunion: { ID: 6, DES: "REUNION" },
  turno: { ID: 7, DES: "TURNO" },
  horasBolsa: { ID: 8, DES: "HORAS BOLSA" },
  horasFamiliar: { ID: 9, DES: "HORAS ATENCION FAMILIAR" },
  acumuladoEstados: { ID: 10, DES: "ACUMULADO ESTADOS" },
  teletrabajo: { ID: 11, DES: "TELETRABAJO" }
};
const coloresEstado = {
  TRASPASADO: { ID: -1, COLOR: "#808000" },
  VACACION: { ID: 1, COLOR: "#0D8004" },
  BAJA: { ID: 2, COLOR: "#800209" },
  TRASPASO: { ID: 3, COLOR: "#803807" },
  FORMACION: { ID: 4, COLOR: "#063780" },
  CONCILIACION: { ID: 5, COLOR: "#DD900A" },
  REUNION: { ID: 6, COLOR: "#DCD20D" },
  TURNO: { ID: 7, COLOR: "#A19DA3" },
  HORAS_BOLSA: { ID: 8, COLOR: "#05CBF5" },
  HORAS_FAMILIAR: { ID: 9, COLOR: "#C3038F" },
  TELETRABAJO: { ID: 11, COLOR: "#7FB3D5" }
};

/* arrays */
export const arrTiposRol = [
  { id: 0, des: 'INDEFINIDO' },
  { id: 1, des: 'USUARIO' },
  { id: 2, des: 'RESPONSABLE' },
  { id: 3, des: 'ADMINISTRADOR' },
]
export const arrTiposPerfil = [
  { id: 1, des: 'GENERAL' },
  { id: 3, des: 'INFORMADOR' },
  { id: 8, des: 'LIQUIDADOR' },
]
export const arrEstadosUsuario = [
  { id: 0, des: 'RESERVA' },
  { id: 1, des: 'ACTIVO' },
]
export const arrEstadosCurso = [
  { id: 0, des: 'CERRADO' },
  { id: 1, des: 'ABIERTO' },
]
export const arrEstadosMatricula = [
  { id: 0, des: 'CERRADA' },
  { id: 1, des: 'ABIERTA' },
]
export const arrEstadosSms = [
  { id: 0, des: 'PENDIENTE' },
  { id: 1, des: 'ENVIADO' },
]
export const arrEstadosFormulario = [
  { ID: 0, DES: 'PENDIENTE', LIT: 'PEN' },
  { ID: 1, DES: 'ASIGNADO', LIT: 'ASI' },
  { ID: 2, DES: 'RESUELTO', LIT: 'RES' },
  { ID: 3, DES: 'REMITIDO', LIT: 'REM' },
]
export const arrEstadosFraude = [
  { ID: 0, DES: 'PENDIENTE', LIT: 'PEN' },
  { ID: 1, DES: 'ASIGNADO', LIT: 'ASI' },
  { ID: 2, DES: 'RESUELTO', LIT: 'RES' },
  { ID: 3, DES: 'REMITIDO', LIT: 'REM' },
]
export const arrTiposLiquidacion = [
  { id: 1, des: 'INFRESAR' },
  { id: 2, des: 'DEVOLVER' },
]
export const arrTiposEstado = [
  { ID: -1, DES: "TRASPASADO", COLOR: "#808000" },
  { ID: 1, DES: "VACACION", COLOR: "#0D8004" },
  { ID: 2, DES: "BAJA", COLOR: "#803807" },
  { ID: 3, DES: "TRASPASO", COLOR: "#800209" },
  { ID: 4, DES: "FORMACION", COLOR: "#063780" },
  { ID: 5, DES: "CONCILIACION", COLOR: "#DD900A" },
  { ID: 6, DES: "REUNION", COLOR: "#DCD20D" },
  { ID: 7, DES: "TURNO", COLOR: "#A19DA3" },
  { ID: 8, DES: "HORAS BOLSA", COLOR: "#05CBF5" },
  { ID: 9, DES: "HORAS ATENCION FAMILIAR", COLOR: "#C3038F" },
  { ID: 10, DES: "ACUMULADO ESTADOS", COLOR: "#FFFFFF" },
  { ID: 11, DES: "TELETRABAJO", COLOR: "#7FB3D5" }
]
const arrColoresEstado = [
  { ID: -1, DES: "TRASPASADO", COLOR: "#808000" },
  { ID: 1, DES: "VACACION", COLOR: "#0D8004" },
  { ID: 3, DES: "BAJA", COLOR: "#803807" },
  { ID: 2, DES: "TRASPASO", COLOR: "#800209" },
  { ID: 4, DES: "FORMACION", COLOR: "#063780" },
  { ID: 5, DES: "CONCILIACION", COLOR: "#DD900A" },
  { ID: 6, DES: "REUNION", COLOR: "#DCD20D" },
  { ID: 7, DES: "TURNO", COLOR: "#A19DA3" },
  { ID: 8, DES: "HORAS_BOLSA", COLOR: "#05CBF5" },
  { ID: 9, DES: "HORAS_FAMILIAR", COLOR: "#C3038F" },
  { ID: 11, DES: "TELETRABAJO", COLOR: "#7FB3D5" }
]