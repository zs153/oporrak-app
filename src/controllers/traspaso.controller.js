import axios from 'axios'
import { tiposEstado, tiposMovimiento, arrColoresEstado } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user

  try {
    const oficinas = await axios.post('http://localhost:8200/api/oficinas')
    const usuarios = await axios.post('http://localhost:8200/api/usuarios')
    const datos = {
      oficinas: oficinas.data,
      usuarios: usuarios.data,
      tiposEstado,
      arrColoresEstado,
      tiposMovimiento,
    }

    res.render('admin/traspasos', { user, datos })
  } catch (error) {
    console.log(error)
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
