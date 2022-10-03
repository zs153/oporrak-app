import * as DAL from '../models/turno.model'

const insertFromRec = (req) => {
  const turno = {
    destur: req.body.turno.destur,
    initur: req.body.turno.initur,
    fintur: req.body.turno.fintur,
    inihor: req.body.turno.inihor,
    finhor: req.body.turno.finhor,
    loctur: req.body.turno.loctur,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(turno, movimiento)
}
const updateFromRec = (req) => {
  const turno = {
    idturn: req.body.turno.idturn,
    destur: req.body.turno.destur,
    initur: req.body.turno.initur,
    fintur: req.body.turno.fintur,
    inihor: req.body.turno.inihor,
    finhor: req.body.turno.finhor,
    loctur: req.body.turno.loctur,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(turno, movimiento)
}
const deleteFromRec = (req) => {
  const turno = {
    idturn: req.body.turno.idturn,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(turno, movimiento)
}
const insertUsuarioFromRec = (req) => {
  const turno = {
    idturn: req.body.turno.idturn,
  }
  const usuarios = {
    arrusu: req.body.usuarios.arrusu,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }
  return Object.assign(turno, usuarios, movimiento)
}
const deleteUsuarioFromRec = (req) => {
  const turno = {
    idturn: req.body.curso.idturn,
  }
  const usuario = {
    idusua: req.body.usuario.idusua,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(turno, usuario, movimiento)
}

// turnos
export const turno = async (req, res) => {
  const context = req.body.turno

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
export const turnos = async (req, res) => {
  try {
    const result = await DAL.find()

    if (result !== null) {
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
export const usuariosTurno = async (req, res) => {
  const context = req.body.turno

  try {
    const result = await DAL.usuariosTurno(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(400).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const usuariosPendientes = async (req, res) => {
  const context = req.body.curso

  try {
    const result = await DAL.usuariosPendientes(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(400).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crearUsuario = async (req, res) => {
  try {
    const result = await DAL.insertUsuario(insertUsuarioFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrarUsuario = async (req, res) => {
  try {
    const result = await DAL.removeUsuario(deleteUsuarioFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}

// turnocurso
export const turnoCurso = async (req, res) => {
  const context = req.body.turnocurso

  try {
    const result = await DAL.turnoCurso(context)

    if (result !== null) {
      res.status(200).json(result[0])
    } else {
      res.status(400).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
