import axios from 'axios'
import { puertoAPI, serverAPI } from '../../config/settings'
import { tiposMovimiento, tiposEstado, estadosMatricula } from '../../public/js/enumeraciones';

// page
export const mainPage = async (req, res) => {
  const user = req.user

  try {
    const perfiles = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/usuarios/tipo`, {
      context: {
        FECEST: dateISOToUTCString(new Date()),
        TIPEST: tiposEstado.telefono.ID,  // tipo excluido (no mostrar como ausencia los tipo telefono)
      },
    })
    const matriculas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formacion/matricula`, {
      context: {
        IDUSUA: user.id,
        STAMAT: estadosMatricula.abierta,
      },
    })
    const hayMatricula = matriculas.data.stat ? true : false

    console.log(matriculas.data);
    let userid = ''
    let data = []
    perfiles.data.data.map(itm => {
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
      hayMatricula,
    }

    res.render('user', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('user/error400', {
      alerts: [{ msg }],
    })
  }
}
export const perfilPage = async (req, res) => {
  const user = req.user

  try {
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context: {
        USERID: user.userid,
      },
    })
    const datos = {
      usuario: usuario.data.data[0],
    }

    res.render('user/perfil', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('user/error400', {
      alerts: [{ msg }],
    })
  }
}
export const logoutPage = async (req, res) => {
  const options = {
    path: "/",
    sameSite: true,
    maxAge: 1,
    httpOnly: true,
  };

  res.clearCookie("x-access_token");
  res.cookie("auth", undefined, options);
  res.cookie("verPan", undefined, options);
  res.cookie("filtro", undefined, options);

  res.redirect('/')
}

// proc
export const updatePerfil = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: user.id,
    USERID: user.userid,
    NOMUSU: req.body.nomusu.toUpperCase(),
    EMAUSU: req.body.emausu,
    TELUSU: req.body.telusu,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarPerfil,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/perfil`, {
      usuario,
      movimiento,
    })

    res.redirect('/user')
  } catch (error) {
    res.redirect('/')
  }
}

// helpers
const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO);
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000;
  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10);
}