import axios from 'axios'
import { serverAPI } from "../config/settings";
import { estadosMatricula } from '../public/js/enumeraciones'

export const matriculasPage = async (req, res) => {
  const user = req.user
  const matricula = {
    STAMAT: estadosMatricula.abierta,
  }

  try {
    const result = await axios.post(`http://${serverAPI}:8200/api/formacion/matriculas`, {
      matricula
    })
    const datos = {
      matriculas: result.data,
    }

    res.render('admin/formacion/matriculas', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const cursosPage = async (req, res) => {
  const user = req.user
  const curso = {
    IDUSUA: req.body.id
  }

  try {
    const result = await axios.post(`http://${serverAPI}:8200/api/formacion/cursos`, {
      curso,
    })
    const datos = {
      cursos: result.data,
    }

    res.render('admin/formacion/cursos', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}