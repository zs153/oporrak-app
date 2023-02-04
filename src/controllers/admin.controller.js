import axios from 'axios'
import { puertoAPI, serverAPI, serverWEB, puertoWEB, serverAUTH, puertoAUTH } from '../config/settings'
import {
  arrTiposRol,
  arrTiposPerfil,
  tiposMovimiento,
  tiposEstado,
  tiposRol,
  estadosMatricula,
} from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const fecha = {
    FECEST: new Date().toISOString().slice(0, 10),
  }
  const tipoExcluido = {
    TIPEST: tiposEstado.telefono.ID,
  }
  const matricula = {
    IDUSUA: user.id,
    STAMAT: estadosMatricula.abierta,
  }

  try {
    const perfiles = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/usuarios/perfiles`, {
      fecha,
      tipoExcluido,
    })
    const matriculas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formacion/matriculas`, {
      matricula,
    })

    let userid = ''
    let data = []
    perfiles.data.map(itm => {
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
      hayMatricula: matriculas.data.length > 0 ? true : false,
    }

    res.render('admin', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const cleanPage = async (req, res) => {
  const user = req.user
  const datos = {
    serverWEB,
    puertoWEB,
  }

  res.render('admin/clean', { user, datos })
}
export const perfilPage = async (req, res) => {
  const user = req.user
  const usuario = {
    USERID: user.userid,
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
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const changePassword = async (req, res) => {
  const strUrl = encodeURIComponent(`${serverWEB}:${puertoWEB}`);
  const options = {
    path: "/",
    sameSite: true,
    maxAge: 1,
    httpOnly: true,
  };

  res.clearCookie("x-access_token");
  res.cookie("auth", undefined, options);
  res.cookie("noVer", undefined, options);

  res.redirect(`http://${serverAUTH}:${puertoAUTH}/log/change/?valid=${strUrl}`)
}
export const updatePerfil = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: user.id,
    NOMUSU: req.body.nomusu.toUpperCase(),
    EMAUSU: req.body.emausu,
    TELUSU: req.body.telusu,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarPerfil,
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
