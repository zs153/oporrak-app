import * as DAL from '../models/estado.model'

const insertFromRec = (req) => {
  const estado = {
    FECEST: req.body.estado.FECEST,
    USUEST: req.body.estado.USUEST,
    TIPEST: req.body.estado.TIPEST,
    OFIEST: req.body.estado.OFIEST,
    DESHOR: req.body.estado.DESHOR,
    HASHOR: req.body.estado.HASHOR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }

  return Object.assign(estado, movimiento)
}
const deleteFromRec = (req) => {
  const estado = {
    IDESTA: req.body.estado.IDESTA,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }

  return Object.assign(estado, movimiento)
}
const insertTraspasoFromRec = (req) => {
  const estado = {
    FECEST: req.body.estado.FECEST,
    USUEST: req.body.estado.USUEST,
    TIPEST: req.body.estado.TIPEST,
    OFIEST: req.body.estado.OFIEST,
    DESHOR: req.body.estado.DESHOR,
    HASHOR: req.body.estado.HASHOR,
  }
  const traspaso = {
    TIPTRA: req.body.traspaso.TIPTRA,
    OFITRA: req.body.traspaso.OFITRA,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }

  return Object.assign(estado, traspaso, movimiento)
}
const deleteTraspasoFromRec = (req) => {
  const estado = {
    IDESTA: req.body.estado.IDESTA,
  }
  const traspaso = {
    USUEST: req.body.traspaso.USUEST,
    FECEST: req.body.traspaso.FECEST,
    TIPEST: req.body.traspaso.TIPEST,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }

  return Object.assign(estado, traspaso, movimiento)
}
const insertRangoFromRec = (req) => {
  const estado = {
    DESDE: req.body.estado.DESDE,
    HASTA: req.body.estado.HASTA,
    USUEST: req.body.estado.USUEST,
    TIPEST: req.body.estado.TIPEST,
    OFIEST: req.body.estado.OFIEST,
    DESHOR: req.body.estado.DESHOR,
    HASHOR: req.body.estado.HASHOR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }

  return Object.assign(estado, movimiento)
}
const fechaPerfilFromRec = (req) => {
  const context = {
    fecest: req.body.fecha.FECEST,
    tipest: req.body.tipoExcluido.TIPEST,
  }

  return context
}
const actualizaTraspasosFromRec = (req) => {
  const traspasos = {
    arrtra: {
      type: 'TRASPTYPE',
      val: req.body.traspasos.ARRTRA,
    }
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
    TIPMOZ: req.body.movimiento.TIPMOZ,
  }
  return Object.assign(traspasos, movimiento)
}

// estado
export const estado = async (req, res) => {
  const context = req.body.estado

  try {
    const result = await DAL.find(context)

    if (result.stat) {
      return res.status(200).json({ stat: 1, data: result.data[0] })
    } else {
      return res.status(400).json({ stat: null, msg: 'No existen datos' })
    }
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const estados = async (req, res) => {
  const context = req.body.estado

  try {
    const result = await DAL.find(context)

    if (result.stat) {
      return res.status(200).json({ stat: 1, data: result.data })
    } else {
      return res.status(400).json({ stat: null, msg: 'No existen datos' })
    }
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const crear = async (req, res) => {
  try {
    const result = await DAL.insert(insertFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrar = async (req, res) => {
  try {
    const result = await DAL.remove(deleteFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crearRango = async (req, res) => {
  try {
    const result = await DAL.insertRango(insertRangoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const actualizaEstados = async (req, res) => {
  const estados = {
    ARREST: {
      type: 'STADTYPE',
      val: req.body.context.ARREST,
    }
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
    TIPMOZ: req.body.movimiento.TIPMOZ,
  }
  const context = Object.assign(estados, movimiento)

  try {
    const result = await DAL.updateEstados(context)

    if (result.stat) {
      return res.status(200).json(result)
    } else {
      return res.status(400).json(result)
    }
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Error de conexión con el servidor' })
  }
}

// traspaso
export const crearTraspaso = async (req, res) => {
  try {
    const result = await DAL.insertTraspaso(insertTraspasoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrarTraspaso = async (req, res) => {
  try {
    const result = await DAL.removeTraspaso(deleteTraspasoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const actualizaTraspasos = async (req, res) => {
  try {
    const result = await DAL.updateTraspasos(actualizaTraspasosFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}

// usuarios
export const estadosUsuario = async (req, res) => {
  const context = req.body.estado

  try {
    const result = await DAL.estadosUsuario(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).end()
  }
}
export const estadosFechaPerfil = async (req, res) => {
  try {
    const result = await DAL.estadosFechaPerfil(fechaPerfilFromRec(req))

    res.status(200).json(result)
  } catch (err) {
    res.status(400).end()
  }
}
export const estadosFechaUsuario = async (req, res) => {
  const context = req.body

  try {
    const result = await DAL.estadosFechaUsuario(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).end()
  }
}
export const estadosOficinaPerfil = async (req, res) => {
  const context = req.body.estado

  try {
    const result = await DAL.estadosOficinaPerfil(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).end()
  }
}
