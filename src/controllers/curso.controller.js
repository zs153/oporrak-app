import * as DAL from '../models/curso.model'
import oracledb from 'oracledb'

// cursos
export const curso = async (req, res) => {
  // context
  const context = req.body.context;

  // proc
  try {
    const result = await DAL.find(context)

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const cursos = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.findAll(context)

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const crear = async (req, res) => {
  // context
  const curso = {
    DESCUR: req.body.curso.DESCUR,
    DURCUR: req.body.curso.DURCUR,
    PONCUR: req.body.curso.PONCUR,
    NOTCUR: req.body.curso.NOTCUR,
    STACUR: req.body.curso.STACUR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, movimiento)

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
  const curso = {
    IDCURS: req.body.curso.IDCURS,
    DESCUR: req.body.curso.DESCUR,
    DURCUR: req.body.curso.DURCUR,
    PONCUR: req.body.curso.PONCUR,
    NOTCUR: req.body.curso.NOTCUR,
    STACUR: req.body.curso.STACUR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, movimiento)

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
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// turnos
export const turno = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.turno(context)

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const turnos = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.turnos(context)

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const crearTurno = async (req, res) => {
  // context
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const turno = {
    DESTUR: req.body.turno.DESTUR,
    INITUR: req.body.turno.INITUR,
    FINTUR: req.body.turno.FINTUR,
    INIHOR: req.body.turno.INIHOR,
    FINHOR: req.body.turno.FINHOR,
    LOCTUR: req.body.turno.LOCTUR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, turno, movimiento)

  // proc
  try {
    const result = await DAL.insertTurno(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificarTurno = async (req, res) => {
  // context
  const turno = {
    IDTURN: req.body.turno.IDTURN,
    DESTUR: req.body.turno.DESTUR,
    INITUR: req.body.turno.INITUR,
    FINTUR: req.body.turno.FINTUR,
    INIHOR: req.body.turno.INIHOR,
    FINHOR: req.body.turno.FINHOR,
    LOCTUR: req.body.turno.LOCTUR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(turno, movimiento)

  // proc
  try {
    const result = await DAL.updateTurno(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrarTurno = async (req, res) => {
  // context
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const turno = {
    IDTURN: req.body.turno.IDTURN,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, turno, movimiento)

  // proc
  try {
    const result = await DAL.removeTurno(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// matriculas
export const matricula = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.matricula(context)

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const matriculas = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.matriculas(context)

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const crearMatricula = async (req, res) => {
  // context
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
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
  const context = Object.assign(curso, matricula, movimiento)

  // proc
  try {
    const result = await DAL.insertMatricula(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificarMatricula = async (req, res) => {
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
    const result = await DAL.updateMatricula(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrarMatricula = async (req, res) => {
  // context
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, matricula, movimiento)

  // proc
  try {
    const result = await DAL.removeMatricula(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// usuarios
export const usuarios = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.usuarios(context)

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
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
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const crearUsuario = async (req, res) => {
  // context
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const usuarios = {
    arrusu: {
      val: req.body.usuarios.ARRUSU,
    }
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, usuarios, movimiento)

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
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const usuario = {
    IDUSUA: req.body.usuario.IDUSUA,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, usuario, movimiento)

  // proc
  try {
    const result = await DAL.removeUsuario(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// usuarios turno
export const usuariosTurno = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.usuariosTurno(context)

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const usuariosTurnoPendientes = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.usuariosTurnoPendientes(context)

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const crearUsuarioTurno = async (req, res) => {
  // context
  const turno = {
    IDTURN: req.body.turno.IDTURN,
  }
  const tipo = {
    TIPEST: req.body.tipo.TIPEST,
  }
  const usuarios = {
    ARRUSU: {
      type: 'USRTYPE',
      val: req.body.usuarios.ARRUSU,
    }
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(turno, tipo, usuarios, movimiento)

  // proc
  try {
    const result = await DAL.insertUsuarioTurno(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrarUsuarioTurno = async (req, res) => {
  // context
  const turno = {
    IDTURN: req.body.turno.IDTURN,
  }
  const usuario = {
    IDUSUA: req.body.usuario.IDUSUA,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(turno, usuario, movimiento)

  // proc
  try {
    const result = await DAL.removeUsuarioTurno(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// usuarios matricula
export const usuariosMatricula = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.usuariosMatricula(context)

    res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const crearUsuarioMatricula = async (req, res) => {
  // context
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
  }
  const usuarios = {
    ARRUSU: {
      val: req.body.usuarios.ARRUSU,
    }
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(matricula, usuarios, movimiento)

  // proc
  try {
    const result = await DAL.insertUsuarioMatricula(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrarUsuarioMatricula = async (req, res) => {
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
    const result = await DAL.removeUsuarioMatricula(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
