import * as DAL from '../models/estado.model'

// estado
export const estado = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.find(context)

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const estados = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.find(context)

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const crear = async (req, res) => {
  // context
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
  const context = Object.assign(estado, movimiento)

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

  // proc
  try {
    const result = await DAL.update(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrar = async (req, res) => {
  // context
  const estado = {
    IDESTA: req.body.estado.IDESTA,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(estado, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// traspaso
export const crearTraspaso = async (req, res) => {
  // context
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
  const context = Object.assign(estado, traspaso, movimiento)

  // proc
  try {
    const result = await DAL.insertTraspaso(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const actualizarTraspaso = async (req, res) => {
  // context
  const estados = {
    ARRTRA: {
      type: 'TRASPTYPE',
      val: req.body.context.ARRTRA,
    }
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
    TIPMOZ: req.body.movimiento.TIPMOZ,
  }
  const context = Object.assign(estados, movimiento)

  // proc
  try {
    const result = await DAL.updateTraspaso(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrarTraspaso = async (req, res) => {
  // context
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
  const context = Object.assign(estado, traspaso, movimiento)

  // proc
  try {
    const result = await DAL.removeTraspaso(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// usuarios
export const estadosUsuario = async (req, res) => {
  // context
  const context = req.body.context;

  // proc
  try {
    const result = await DAL.estadosUsuario(context)

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const estadosFechaTipo = async (req, res) => {
  // context
  const context = req.body.context;

  // proc
  try {
    const result = await DAL.estadosFechaTipo(context);

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' });
  }
}
export const estadosFechaUsuario = async (req, res) => {
  // context
  const context = req.body.conext;

  // proc
  try {
    const result = await DAL.estadosFechaUsuario(context)

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const estadosOficinaPerfil = async (req, res) => {
  // context
  const context = req.body.context;

  // proc
  try {
    const result = await DAL.estadosOficinaPerfil(context);

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' });
  }
}
