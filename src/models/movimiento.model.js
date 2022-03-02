class Movimiento {
  constructor(id, fecha, tipo, usuario) {
    this._idmovi = id
    this._fecmov = fecha
    this._tipmov = tipo
    this._usumov = usuario
  }

  get idMovimiento() {
    return this._idmovi;
  }
  set idMovimiento(value) {
    this._idmovi = value
  }
  get fecha() {
    return this._fecmov;
  }
  set fecha(value) {
    this._fecmov = value
  }
  get tipo() {
    return this._tipmov;
  }
  set tipo(value) {
    this._tipmov = value
  }
  get usuario() {
    return this._usumov;
  }
  set usuario(value) {
    this._usumov = value
  }
}

export default Movimiento