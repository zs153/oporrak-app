import * as DAL from '../models/formacion.model'

// matriculas
export const matricula = async (req, res) => {
  // context
  const context = req.body.context;

  // proc
  try {
    const result = await DAL.findM(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: [] })
  }
}

// cursos
export const curso = async (req, res) => {
  // context
  const context = req.body.context;

  // proc
  try {
    const result = await DAL.findC(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
