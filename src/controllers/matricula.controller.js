import * as DAL from '../models/matricula.model'

export const matricula = async (req, res) => {
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
export const matriculas = async (req, res) => {
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
  // context
  const matricula = {
    DESMAT: req.body.matricula.DESMAT,
    INIMAT: req.body.matricula.INIMAT,
    FINMAT: req.body.matricula.FINMAT,
    NOTMAT: req.body.matricula.NOTMAT,
    STAMAT: req.body.matricula.STAMAT,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(matricula, movimiento)

  // proc
  try {
    const result = await DAL.insert(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificar = async (req, res) => {
  // context
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
    DESMAT: req.body.matricula.DESMAT,
    INIMAT: req.body.matricula.INIMAT,
    FINMAT: req.body.matricula.FINMAT,
    NOTMAT: req.body.matricula.NOTMAT,
    STAMAT: req.body.matricula.STAMAT,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(matricula, movimiento)

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
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(matricula, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// usuarios
export const usuariosMatricula = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.usuariosMatricula(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const usuariosPendientes = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.usuariosPendientes(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const crearUsuario = async (req, res) => {
  // context
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
  }
  const usuarios = {
    ARRUSU: req.body.usuarios.ARRUSU,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(matricula, usuarios, movimiento)

  // proc
  try {
    const result = await DAL.insertUsuario(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrarUsuario = async (req, res) => {
  // context
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
  }
  const usuario = {
    IDUSUA: req.body.usuario.IDUSUA,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(matricula, usuario, movimiento)

  // proc
  try {
    const result = await DAL.removeUsuario(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
