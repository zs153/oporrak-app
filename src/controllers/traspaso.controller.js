import axios from 'axios'
import { serverAPI } from "../config/settings";
import { tiposRol, tiposEstado, tiposMovimiento, arrColoresEstado } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const oficina = {}
  const usuario = {}

  try {
    const oficinas = await axios.post(`http://${serverAPI}:8200/api/oficinas`, {
      oficina,
    })
    const usuarios = await axios.post(`http://${serverAPI}:8200/api/usuarios`, {
      usuario,
    })
    const datos = {
      oficinas: oficinas.data,
      usuarios: usuarios.data,
      tiposEstado,
      tiposRol,
      arrColoresEstado,
      tiposMovimiento,
      serverAPI,
    }

    res.render('admin/traspasos', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
