import * as DAL from '../models/festivo.model'

const insertFromRec = (req) => {
  const oficina = {
    IDOFIC: req.body.oficina.IDOFIC,
  }
  const festivo = {
    FECFES: req.body.festivo.FECCOM,
    TIPFES: req.body.festivo.TIPFES,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }

  return Object.assign(oficina, festivo, movimiento)
}
const deleteFromRec = (req) => {
  const oficina = {
    IDOFIC: req.body.oficina.IDOFIC,
  }
  const festivo = {
    FECFES: req.body.festivo.FECCOM,
    TIPFES: req.body.festivo.TIPFES,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }

  return Object.assign(oficina, festivo, movimiento)
}

// festivo
export const festivo = async (req, res) => {
  const context = req.body.festivo
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
export const festivos = async (req, res) => {
  const context = req.body.festivo

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

// oficina
export const festivosOficina = async (req, res) => {
  const context = req.body

  try {
    const result = await DAL.festivosOficina(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).end()
  }
}