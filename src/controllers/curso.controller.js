import * as DAL from '../models/curso.model'

const insertFromRec = (req) => {
  const curso = {
    DESCUR: req.body.curso.DESCUR,
    descur: req.body.curso.DESCUR,
    durcur: req.body.curso.DURCUR,
    poncur: req.body.curso.PONCUR,
    stacur: req.body.curso.STACUR,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(curso, movimiento)
}
const updateFromRec = (req) => {
  const curso = {
    idcurs: req.body.curso.IDCURS,
    descur: req.body.curso.DESCUR,
    durcur: req.body.curso.DURCUR,
    poncur: req.body.curso.PONCUR,
    stacur: req.body.curso.STACUR,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(curso, movimiento)
}
const deleteFromRec = (req) => {
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }

  return Object.assign(curso, movimiento)
}
const cambioFromRec = (req) => {
  const curso = {
    IDCURS: req.body.curso.IDCURS,
    STACUR: req.body.curso.STACUR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }

  return Object.assign(curso, movimiento)
}
// turno
const insertTurnoFromRec = (req) => {
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

  return Object.assign(curso, turno, movimiento)
}
const updateTurnoFromRec = (req) => {
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
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

  return Object.assign(curso, turno, movimiento)
}
const deleteTurnoFromRec = (req) => {
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

  return Object.assign(curso, turno, movimiento)
}
// matriculas
const insertMatriculaFromRec = (req) => {
  const curso = {
    idcurs: req.body.curso.IDCURS,
  }
  const matricula = {
    desmat: req.body.matricula.DESMAT,
    inimat: req.body.matricula.INIMAT,
    finmat: req.body.matricula.FINMAT,
    stamat: req.body.matricula.STAMAT,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(curso, matricula, movimiento)
}
const updateMatriculaFromRec = (req) => {
  const matricula = {
    idmatr: req.body.matricula.IDMATR,
    desmat: req.body.matricula.DESMAT,
    inimat: req.body.matricula.INIMAT,
    finmat: req.body.matricula.FINMAT,
    stamat: req.body.matricula.STAMAT,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(matricula, movimiento)
}
const deleteMatriculaFromRec = (req) => {
  const curso = {
    idcurs: req.body.curso.IDCURS,
  }
  const matricula = {
    idmatr: req.body.matricula.IDMATR,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(curso, matricula, movimiento)
}
// usuarios
const insertUsuarioFromRec = (req) => {
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const usuarios = {
    ARRUSU: req.body.usuarios.ARRUSU,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  return Object.assign(curso, usuarios, movimiento)
}
const deleteUsuarioFromRec = (req) => {
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

  return Object.assign(curso, usuario, movimiento)
}
// usuarios turno
const insertUsuarioTurnoFromRec = (req) => {
  const turno = {
    IDTURN: req.body.turno.IDTURN,
  }
  const usuarios = {
    arrusu: {
      type: 'USRTYPE',
      val: req.body.usuarios.ARRUSU,
    }
  }
  const tipo = {
    tipest: req.body.tipo.TIPEST,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  return Object.assign(turno, tipo, usuarios, movimiento)
}
const deleteUsuarioTurnoFromRec = (req) => {
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

  return Object.assign(turno, usuario, movimiento)
}
// usuarios matricula
const insertUsuarioMatriculaFromRec = (req) => {
  const matricula = {
    idmatr: req.body.matricula.IDMATR,
  }
  const usuarios = {
    arrusu: {
      // type: oracledb.NUMBER,
      // dir: oracledb.BIND_IN,
      val: req.body.usuarios.ARRUSU,
    }
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  return Object.assign(matricula, usuarios, movimiento)
}
const deleteUsuarioMatriculaFromRec = (req) => {
  const matricula = {
    idmatr: req.body.matricula.IDMATR,
  }
  const usuario = {
    idusua: req.body.usuario.IDUSUA,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(matricula, usuario, movimiento)
}

// cursos
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
  const context = req.body.curso

  try {
    const result = await DAL.find(context)

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
export const turno = async (req, res) => {
  const context = req.body.turno

  try {
    const result = await DAL.turno(context)

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
  const context = req.body.curso

  try {
    const result = await DAL.turno(context)

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

// matriculas
export const matricula = async (req, res) => {
  const context = req.body.matricula

  try {
    const result = await DAL.matricula(context)

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
  const context = req.body.curso

  try {
    const result = await DAL.matricula(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(400).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crearMatricula = async (req, res) => {
  try {
    const result = await DAL.insertMatricula(insertMatriculaFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const modificarMatricula = async (req, res) => {
  try {
    const result = await DAL.updateMatricula(updateMatriculaFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrarMatricula = async (req, res) => {
  try {
    const result = await DAL.removeMatricula(deleteMatriculaFromRec(req))

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
export const usuarios = async (req, res) => {
  const context = req.body.curso

  try {
    const result = await DAL.usuarios(context)

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

// usuarios turno
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
export const usuariosTurnoPendientes = async (req, res) => {
  const context = {
    idcurs: req.body.curso.IDCURS,
  }

  try {
    const result = await DAL.usuariosTurnoPendientes(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(400).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crearUsuarioTurno = async (req, res) => {
  try {
    const result = await DAL.insertUsuarioTurno(insertUsuarioTurnoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrarUsuarioTurno = async (req, res) => {
  try {
    const result = await DAL.removeUsuarioTurno(deleteUsuarioTurnoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}

// usuarios matricula
export const usuariosMatricula = async (req, res) => {
  const context = req.body.matricula

  try {
    const result = await DAL.usuariosMatricula(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).end()
  }
}
export const crearUsuarioMatricula = async (req, res) => {
  try {
    const result = await DAL.insertUsuarioMatricula(insertUsuarioMatriculaFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrarUsuarioMatricula = async (req, res) => {
  try {
    const result = await DAL.removeUsuarioMatricula(deleteUsuarioMatriculaFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
