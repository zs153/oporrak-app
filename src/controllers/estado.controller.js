import * as DAL from '../models/estado.model'

const insertFromRec = (req) => {
  const estado = {
    fecest: req.body.estado.fecest,
    usuest: req.body.estado.usuest,
    tipest: req.body.estado.tipest,
    ofiest: req.body.estado.ofiest,
    deshor: req.body.estado.deshor,
    hashor: req.body.estado.hashor,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(estado, movimiento)
}
const updateFromRec = (req) => {
  const estado = {
    idesta: req.body.estado.idesta,
    fecest: req.body.estado.fecest,
    usuest: req.body.estado.usuest,
    tipest: req.body.estado.tipest,
    ofiest: req.body.estado.ofiest,
    deshor: req.body.estado.deshor,
    hashor: req.body.estado.hashor,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(estado, movimiento)
}
const deleteFromRec = (req) => {
  const estado = {
    idesta: req.body.estado.idesta,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
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
export const modificar = async (req, res) => {
  try {
    const result = await DAL.update(updateFromRec(req))

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

// usuarios
export const estadosUsuario = async (req, res) => {
  const context = req.body.estado

  try {
    const result = await DAL.estadosUsuario(context)

    res.status(200).json(result)

    // if (rows !== null) {
    //   res.status(200).json(result)
    // } else {
    //   res.status(404).end()
    // }
  } catch (err) {
    res.status(400).end()
  }
}