import * as DAL from '../models/historico.model'

const activarFromRec = (req) => {
  const usuario = {
    idusua: req.body.usuario.IDUSUA,
    ofiusu: req.body.usuario.OFIUSU,
    stausu: req.body.usuario.STAUSU,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(usuario, movimiento)
}

export const historico = async (req, res) => {
  const context = req.body.usuario

  try {
    const rows = await DAL.find(context)

    if (rows.length === 1) {
      return res.status(200).json(rows[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const historicos = async (req, res) => {
  const context = req.body.usuario

  try {
    const rows = await DAL.find(context)

    res.status(200).json(rows)
  } catch (err) {
    res.status(400).end()
  }
}
export const activar = async (req, res) => {
  try {
    const result = await DAL.activar(activarFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
