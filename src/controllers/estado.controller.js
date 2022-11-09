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
