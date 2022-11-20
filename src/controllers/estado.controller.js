import * as DAL from '../models/estado.model'

const insertFromRec = (req) => {
  const estado = {
    fecest: req.body.estado.FECEST,
    usuest: req.body.estado.USUEST,
    tipest: req.body.estado.TIPEST,
    ofiest: req.body.estado.OFIEST,
    deshor: req.body.estado.DESHOR,
    hashor: req.body.estado.HASHOR,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(estado, movimiento)
}
const deleteFromRec = (req) => {
  const estado = {
    idesta: req.body.estado.IDESTA,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(estado, movimiento)
}
const insertTraspasoFromRec = (req) => {
  const estado = {
    fecest: req.body.estado.FECEST,
    usuest: req.body.estado.USUEST,
    tipest: req.body.estado.TIPEST,
    ofiest: req.body.estado.OFIEST,
    deshor: req.body.estado.DESHOR,
    hashor: req.body.estado.HASHOR,
  }
  const traspaso = {
    tiptra: req.body.traspaso.TIPTRA,
    ofitra: req.body.traspaso.OFITRA,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(estado, traspaso, movimiento)
}
const deleteTraspasoFromRec = (req) => {
  const estado = {
    idesta: req.body.estado.IDESTA,
  }
  const traspaso = {
    usuest: req.body.traspaso.USUEST,
    fecest: req.body.traspaso.FECEST,
    tipest: req.body.traspaso.TIPEST,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(estado, traspaso, movimiento)
}
const insertRangoFromRec = (req) => {
  const estado = {
    desde: req.body.estado.DESDE,
    hasta: req.body.estado.HASTA,
    usuest: req.body.estado.USUEST,
    tipest: req.body.estado.TIPEST,
    ofiest: req.body.estado.OFIEST,
    deshor: req.body.estado.DESHOR,
    hashor: req.body.estado.HASHOR,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(estado, movimiento)
}

// estado
export const estado = async (req, res) => {
  const context = req.body.estado
  try {
    const result = await DAL.find(context)

    if (result.length === 1) {
      return res.status(200).json(result[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const estados = async (req, res) => {
  const context = req.body.estado

  try {
    const result = await DAL.findAll(context)

    if (rows !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).end()
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

// usuarios
export const estadosUsuario = async (req, res) => {
  //const context = req.body.estado
  const context = req.body

  try {
    const result = await DAL.estadosUsuario(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).end()
  }
}
export const estadosFechaPerfil = async (req, res) => {
  const context = req.body.fecha

  try {
    const result = await DAL.estadosFechaPerfil(context)

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
