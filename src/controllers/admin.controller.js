import axios from 'axios'
import bcrypt from 'bcrypt'
import { serverAPI } from '../config/settings'
import {
  arrTiposRol,
  arrTiposPerfil,
  tiposMovimiento,
  tiposEstado,
  tiposRol,
} from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const fecha = {
    FECEST: new Date().toISOString().slice(0, 10),
  }
  const tipoExcluido = {
    TIPEST: tiposEstado.telefono.ID,
  }

  try {
    const result = await axios.post(`http://${serverAPI}:8200/api/estados/usuarios/perfiles`, {
      fecha,
      tipoExcluido,
    })

    let userid = ''
    let data = []
    result.data.map(itm => {
      if (itm.TIPEST === 2) {
        const hora = new Date().toTimeString().slice(0, 5)
        if (!(hora >= itm.DESHOR && hora <= itm.HASHOR)) {
          itm.TIPEST = 1
        }

        if (itm.USERID === userid) {
          if (itm.TIPEST === 1) {
            itm = data.slice(-1)[0]
          }
          data.splice(-1)
        }
        userid = itm.USERID
      }
      data.push(itm)
    })

    const datos = {
      estados: data,
      tiposRol,
    }

    res.render('admin', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const perfilPage = async (req, res) => {
  const user = req.user
  const usuario = {
    userid: user.userID,
  }
  try {
    const result = await axios.post(`http://${serverAPI}:8200/api/usuario`, {
      usuario,
    })

    const datos = {
      usuario: result.data,
      tiposRol,
      arrTiposRol,
      arrTiposPerfil,
    }

    res.render('admin/perfil', { user, datos })
  } catch (error) {
    console.log(error)
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

export const changePassword = async (req, res) => {
  const user = req.user
  const salt = await bcrypt.genSalt(10)
  const passHash = await bcrypt.hash(req.body.pwdusu, salt)
  const usuario = {
    idusua: req.body.idusua,
    pwdusu: passHash,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.cambioPassword,
  }

  try {
    await axios.post(`http://${serverAPI}:8200/api/usuarios/cambio`, {
      usuario,
      movimiento,
    })

    res.redirect('/')
  } catch (error) {
    res.redirect('/admin')
  }
}
export const updatePerfil = async (req, res) => {
  const user = req.user
  const usuario = {
    idusua: user.id,
    nomusu: req.body.nomusu.toUpperCase(),
    emausu: req.body.emausu,
    telusu: req.body.telusu,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarPerfil,
  }

  try {
    await axios.post(`http://${serverAPI}:8200/api/usuarios/perfil`, {
      usuario,
      movimiento,
    })

    redirect('.')
  } catch (error) {
    res.redirect('/admin')
  }
}
