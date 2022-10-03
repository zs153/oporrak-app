import * as DAL from '../models/curso.model'

const insertFromRec = (req) => {
  const curso = {
    descur: req.body.curso.descur,
    stacur: req.body.curso.stacur,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(curso, movimiento)
}
const updateFromRec = (req) => {
  const curso = {
    idcurs: req.body.curso.idcurs,
    descur: req.body.curso.descur,
    stacur: req.body.curso.stacur,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(curso, movimiento)
}
const deleteFromRec = (req) => {
  const curso = {
    idcurs: req.body.curso.idcurs,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(curso, movimiento)
}
const cambioFromRec = (req) => {
  const curso = {
    idcurs: req.body.curso.idcurs,
    stacur: req.body.curso.stacur,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(curso, movimiento)
}
const insertTurnoFromRec = (req) => {
  const curso = {
    idcurs: req.body.curso.idcurs,
  }
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

  return Object.assign(curso, turno, movimiento)
}
const updateTurnoFromRec = (req) => {
  const curso = {
    idcurs: req.body.curso.idcurs,
  }
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

  return Object.assign(curso, turno, movimiento)
}
const deleteTurnoFromRec = (req) => {
  const curso = {
    idcurs: req.body.curso.idcurs,
  }
  const turno = {
    idturn: req.body.turno.idturn,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(curso, turno, movimiento)
}
const insertUsuarioFromRec = (req) => {
  const curso = {
    idcurs: req.body.curso.idcurs,
  }
  const usuarios = {
    arrusu: req.body.usuarios.arrusu,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }
  return Object.assign(curso, usuarios, movimiento)
}
const deleteUsuarioFromRec = (req) => {
  const curso = {
    idcurs: req.body.curso.idcurs,
  }
  const usuario = {
    idusua: req.body.usuario.idusua,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(curso, usuario, movimiento)
}

export const curso = async (req, res) => {
  const context = req.body.curso

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
export const cursos = async (req, res) => {
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

// turnos
export const turnosCurso = async (req, res) => {
  const context = req.body.curso

  try {
    const result = await DAL.turnosCurso(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(400).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crearTurno = async (req, res) => {
  try {
    const result = await DAL.insertTurno(insertTurnoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const modificarTurno = async (req, res) => {
  try {
    const result = await DAL.updateTurno(updateTurnoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrarTurno = async (req, res) => {
  try {
    const result = await DAL.removeTurno(deleteTurnoFromRec(req))

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
export const usuariosCurso = async (req, res) => {
  const context = req.body.curso

  try {
    const result = await DAL.usuariosCurso(context)

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
