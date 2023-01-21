import * as DAL from '../models/matricula.model'

const insertFromRec = (req) => {
  const matricula = {
    DESMAT: req.body.matricula.DESMAT,
    INIMAT: req.body.matricula.INIMAT,
    FINMAT: req.body.matricula.FINMAT,
    IDCURS: req.body.matricula.IDCURS,
    STAMAT: req.body.matricula.STAMAT,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }

  return Object.assign(matricula, movimiento)
}
const updateFromRec = (req) => {
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
    DESMAT: req.body.matricula.DESMAT,
    INIMAT: req.body.matricula.INIMAT,
    FINMAT: req.body.matricula.FINMAT,
    IDCURS: req.body.matricula.IDCURS,
    STAMAT: req.body.matricula.STAMAT,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }

  return Object.assign(matricula, movimiento)
}
const deleteFromRec = (req) => {
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }

  return Object.assign(matricula, movimiento)
}
const cambioFromRec = (req) => {
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
    STAMAT: req.body.matricula.STAMAT,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }

  return Object.assign(matricula, movimiento)
}
const insertUsuarioFromRec = (req) => {
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
  return Object.assign(matricula, usuarios, movimiento)
}
const deleteUsuarioFromRec = (req) => {
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

  return Object.assign(matricula, usuario, movimiento)
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
  const context = req.body.matricula

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

// usuarios
export const usuariosMatricula = async (req, res) => {
  const context = req.body.matricula

  try {
    const result = await DAL.usuariosMatricula(context)

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
  const context = req.body.matricula

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
