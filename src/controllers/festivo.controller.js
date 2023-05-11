import * as DAL from '../models/festivo.model'

// festivo
export const festivo = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.find(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const festivos = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.find(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const crear = async (req, res) => {
  //context
  const festivo = {
    FECFES: req.body.festivo.FECFES,
    OFIFES: req.body.festivo.OFIFES,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context =  Object.assign(festivo, movimiento)

  // proc
  try {
    const result = await DAL.insert(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const actualizar = async (req, res) => {
  // context
  const festivos = {
    ARRFES: {
      type: 'FESTYPE',
      val: req.body.context.ARRFES,
    }
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
    TIPMOZ: req.body.movimiento.TIPMOZ,
  }
  const context = Object.assign(festivos, movimiento)

  // proc
  try {
    const result = await DAL.update(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrar = async (req, res) => {
  const festivo = {
    IDFEST: req.body.festivo.IDFEST,
    OFIFES: req.body.festivo.OFIFES,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(festivo, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// oficina
export const festivosOficina = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.festivosOficina(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
// local
export const festivosLocal = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.festivosLocal(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const festivosOficinaLocal = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.festivosOficinaLocal(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}