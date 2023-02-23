import axios from 'axios'
import { serverAPI, puertoAPI, serverWEB, puertoWEB } from '../config/settings'
import { tiposRol, tiposMovimiento, tiposEstado, arrTiposEstadoUsuario, arrTiposEstado, arrColoresEstado } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const oficina = user.rol === tiposRol.admin ? {} : { IDOFIC: req.params.id }
  const usuario = user.rol === tiposRol.usuario ? { IDUSUA: user.id } : { OFIUSU: req.params.id }

  try {
    let oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina,
    })
    let usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      usuario,
    })
    const datos = {
      oficina: parseInt(req.params.id),
      oficinas: oficinas.data,
      usuarios: usuarios.data,
      serverWEB,
      puertoWEB,
    }

    res.render('admin/calendarios', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// proc
export const calendario = async (req, res) => {
  let currentYear = new Date().getFullYear()
  let ret
  let usuario = {
    IDUSUA: req.body.idusua,
  }

  const user = req.user
  const estado = {
    OFIDES: 0,
    USUEST: req.body.idusua,
    TIPEST: 0,
    DESDE: dateISOToUTCString(`${currentYear}-01-01T00:00:00`),
    HASTA: dateISOToUTCString(`${currentYear +1}-12-31T00:00:00`),
  }
  const festivo = {
    OFIFES: req.body.idofic,
    DESDE: estado.DESDE,
    HASTA: estado.HASTA,
  }

  try {
    ret = await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos/oficinas`, {
      festivo,
    })
    const festivos = ret.data.map(itm => itm.FECFES)

    ret = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      usuario,
    })
    usuario = {
      IDUSUA: ret.data.IDUSUA,
      OFIUSU: ret.data.OFIUSU,
      NOMUSU: ret.data.NOMUSU,
    }

    ret = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/usuarios`, {
      estado,
    })

    let dataSource = []
    ret.data.map(itm => {
      if (itm.TIPEST !== tiposEstado.traspasado.ID &&
          itm.TIPEST !== tiposEstado.traspaso.ID) {
        const rec = {
          idesta: itm.IDESTA,
          tipest: itm.TIPEST,
          startDate: itm.STRFEC,
          endDate: itm.STRFEC,
          rangoH: `${arrColoresEstado[itm.TIPEST].DES} (${itm.DESHOR} a ${itm.HASHOR})`,
          color: `${arrColoresEstado[itm.TIPEST].COLOR}`
        }
        dataSource.push(rec)
      }
    })

    const datos = {
      arrTiposEstado: user.rol === tiposRol.usuario ? arrTiposEstadoUsuario : arrTiposEstado,
      arrColoresEstado,
      tiposEstado,
      festivos: JSON.stringify(festivos),
      usuario,
      dataSource: JSON.stringify(dataSource),
    }

    res.render('admin/calendarios/calendario', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const update = async (req, res) => {
  const user = req.user
  const usuario = JSON.parse(req.body.usuario)
  const evnt = JSON.parse(req.body.eventos)
  let estados = []

  evnt.map(itm => {
    if (itm.idesta === 0) {
      // insert
      estados.push({
        IDESTA: itm.idesta,
        FECEST: itm.fecest,
        USUEST: usuario.IDUSUA,
        TIPEST: itm.tipest,
        OFIEST: usuario.OFIUSU,
      })
    } else {
      // borrado (el IDESTA borra el traspaso y FECEST, USUEST y TIPOEST borra el traspasado)
      estados.push({
        IDESTA: itm.idesta,
        FECEST: itm.fecest,
        USUEST: usuario.IDUSUA,
        TIPEST: itm.tipest,
        OFIEST: 0,
      })
    }
  })

  const eventos = {
    ARREVE: estados // importante!! los campos del array estados tienen que ir en mayusculas
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearEstado,
    TIPMOZ: tiposMovimiento.borrarEstado,
  }

  try {
    if (traspasos.length !== 0) {
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/update/traspasos`, {
        eventos,
        movimiento,
      });
    }

    mainPage(req, res)
  } catch (error) {
    const msg = "No se ha podido insertar los datos.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}


// helpers
const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO);
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000;
  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10);
}