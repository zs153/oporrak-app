import * as DAL from '../models/formacion.model'

// matriculas
export const matricula = async (req, res) => {
  const context = req.body.matricula

  try {
    const result = await DAL.matriculas(context)

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
    const result = await DAL.matriculas(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}

// cursos
export const curso = async (req, res) => {
  const context = req.body.curso

  try {
    const result = await DAL.cursos(context)

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
    const result = await DAL.cursos(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
