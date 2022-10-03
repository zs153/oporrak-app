import * as DAL from '../models/curso.model'

const insertFromRec = (req) => {
  const matricula = {
    desmat: req.body.curso.desmat,
    inimat: req.body.curso.inimat,
    finmat: req.body.curso.finmat,
    idcurs: req.body.curso.idcurs,
    stamat: req.body.curso.stamat,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(matricula, movimiento)
}
const updateFromRec = (req) => {
  const matricula = {
    idmatr: req.body.curso.idmatr,
    desmat: req.body.curso.desmat,
    inimat: req.body.curso.inimat,
    finmat: req.body.curso.finmat,
    idcurs: req.body.curso.idcurs,
    stamat: req.body.curso.stamat,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(matricula, movimiento)
}
const deleteFromRec = (req) => {
  const matricula = {
    idmatr: req.body.curso.idmatr,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(matricula, movimiento)
}
const cambioFromRec = (req) => {
  const matricula = {
    idmatr: req.body.curso.idmatr,
    stamat: req.body.curso.stamat,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(matricula, movimiento)
}

export const matricula = async (req, res) => {
  const context = req.body.matricula

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
export const matriculas = async (req, res) => {
  try {
    const result = await DAL.findAll()

    res.status(200).json(result)
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
export const cambioEstado = async (req, res) => {
  try {
    const result = await DAL.change(cambioFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
