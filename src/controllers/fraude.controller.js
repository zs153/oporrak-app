import axios from 'axios'
import jwt from 'jsonwebtoken'
import {
  estadosDocumento,
  estadosSms,
  origenTipo,
  tiposMovimiento,
  tiposVisualizacion,
} from '../public/js/enumeraciones'

export const fraudesPage = async (req, res) => {
  const user = req.user
  const documento = {
    stafra: tiposVisualizacion.resueltos,
  }

  try {
    const result = await axios.post('http://localhost:8000/api/fraudes', {
      documento,
    })
    const datos = { documentos: result.data.dat }
    res.render('admin/fraudes', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addFraudesPage = async (req, res) => {
  const user = req.user
  const fecha = new Date()

  try {
    // tipos
    const resultTipos = await axios.post(
      'http://localhost:8000/api/tipos/origen',
      {
        origen: origenTipo.fraude,
      }
    )
    // oficinas
    const resultOficinas = await axios.get('http://localhost:8000/api/oficinas')
    // documento
    const documento = {
      idfrau: 0,
      fecfra: fecha.toISOString().substring(0, 10),
      nifcon: '',
      nomcon: '',
      emAcon: '',
      telcon: '',
      movcon: '',
      reffra: '',
      tipfra: 0,
      ejefra: fecha.getFullYear(),
      ofifra: 0,
      obsfra: '',
      funfra: user.userID,
      liqfra: '',
      stafra: estadosDocumento.pendiente,
    }
    const datos = {
      documento,
      arrTipos: resultTipos.data,
      arrOficinas: resultOficinas.data.dat,
    }

    res.render('admin/fraudes/add', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editFraudesPage = async (req, res) => {
  const user = req.user
  try {
    // tipos
    const resultTipos = await axios.post(
      'http://localhost:8000/api/tipos/origen',
      {
        origen: origenTipo.fraude,
      }
    )
    // oficinas
    const resultOficinas = await axios.get('http://localhost:8000/api/oficinas')
    // fraude
    const result = await axios.post('http://localhost:8000/api/fraude', {
      idfrau: req.params.id,
    })
    const documento = {
      idfrau: result.data.idfrau,
      fecfra: result.data.fecfra,
      nifcon: result.data.nifcon,
      nomcon: result.data.nomcon,
      emacon: result.data.emacon,
      telcon: result.data.telcon,
      movcon: result.data.movcon,
      reffra: result.data.reffra,
      tipfra: result.data.tipfra,
      ejefra: result.data.ejefra,
      ofifra: result.data.ofifra,
      obsfra: result.data.obsfra,
      funfra: result.data.funfra,
      liqdoc: result.data.liqdoc,
    }
    const datos = {
      documento,
      arrTipos: resultTipos.data,
      arrOficinas: resultOficinas.data.dat,
    }

    res.render('admin/fraudes/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const verFraudesPage = async (req, res) => {
  const user = req.user
  const documento = {
    stafra: tiposVisualizacion.todos,
  }
  try {
    const result = await axios.post('http://localhost:8000/api/fraudes', {
      documento,
    })
    const datos = { documentos: result.data.dat }
    res.render('admin/fraudes', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const ejercicioFraudesPage = async (req, res) => {
  const user = req.user
  const fecha = new Date()

  try {
    // tipos
    const resultTipos = await axios.post(
      'http://localhost:8000/api/tipos/origen',
      {
        origen: origenTipo.fraude,
      }
    )
    // fraude
    const result = await axios.post('http://localhost:8000/api/fraude', {
      idfrau: req.params.idfrau,
    })
    const documento = {
      idfrau: 0,
      fecfra: fecha.toISOString().substring(0, 10),
      nifcon: result.data.nifcon,
      nomcon: result.data.nomcon,
      emacon: result.data.emacon,
      telcon: result.data.telcon,
      movcon: result.data.movcon,
      reffra: '',
      tipfra: 0,
      ejefra: fecha.getFullYear(),
      ofifra: result.data.ofifra,
      obsfra: '',
      funfra: user.userID,
      liqdoc: user.userID,
      stafra: estadosDocumento.pendiente,
    }
    const datos = {
      documento,
      arrTipos: resultTipos.data,
    }

    res.render('admin/fraudes/ejercicio', { user, datos })
  } catch (error) {
    const msg =
      'No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const hitosPage = async (req, res) => {
  const user = req.user

  try {
    // fraude
    const resultFraude = await axios.post('http://localhost:8000/api/fraude', {
      idfrau: req.params.idfrau,
    })
    const fraude = {
      idfrau: resultFraude.data.idfrau,
      nifcon: resultFraude.data.nifcon,
      nomcon: resultFraude.data.nomcon,
      reffra: resultFraude.data.reffra,
    }
    // hitosFraude
    const resultHitos = await axios.post(
      'http://localhost:8000/api/fraudes/hitos',
      {
        idfrau: req.params.idfrau,
      }
    )
    const datos = {
      fraude,
      hitos: resultHitos.data,
    }

    res.render('admin/fraudes/hitos/index', { user, datos })
  } catch (error) {
    const msg =
      'No se ha podido acceder a los hitos del fraude seleccionado. Si persiste el error solicite asistencia.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addHitosPage = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.params.idfrau,
  }
  const hito = {
    idhito: 0,
    tiphit: 0,
    subthi: 0,
    imphit: 0,
    obshit: '',
  }
  try {
    // tipos
    const resultTipos = await axios.post(
      'http://localhost:8000/api/tipos/origen',
      {
        origen: origenTipo.hito,
      }
    )
    // subtipos
    const resultSubtipos = await axios.post(
      'http://localhost:8000/api/subtipos/tipossubtipos'
    )
    const datos = {
      hito,
      tipos: resultTipos.data,
      subtipos: resultSubtipos.data,
      fraude,
    }

    res.render('admin/fraudes/hitos/add', { user, datos })
  } catch (error) {
    const msg =
      'No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editHitosPage = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.params.idfrau,
  }
  try {
    // tipos
    const resultTipos = await axios.post(
      'http://localhost:8000/api/tipos/origen',
      {
        origen: origenTipo.hito,
      }
    )
    // subtipos
    const resultSubtipos = await axios.post(
      'http://localhost:8000/api/subtipos/tipossubtipos'
    )
    // hito
    const result = await axios.post('http://localhost:8000/api/fraudes/hito', {
      idhito: req.params.id,
    })
    const hito = {
      idhito: result.data.idhito,
      tiphit: result.data.tiphit,
      subthi: result.data.subthi,
      imphit: result.data.imphit,
      obshit: result.data.obshit,
    }
    const datos = {
      hito,
      tipos: resultTipos.data,
      subtipos: resultSubtipos.data,
      fraude,
    }

    res.render('admin/fraudes/hitos/edit', { user, datos })
  } catch (error) {
    const msg =
      'No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// procs
export const insertFraude = async (req, res) => {
  const user = req.user
  const referencia =
    'F' +
    randomString(
      10,
      'abcdefghijklmnpqrstuvwxyz1234567890ABCDEFGHIJKLMNPQRSTUVWXYZ'
    )
  const documento = {
    fecfra: req.body.fecfra,
    nifcon: req.body.nifcon,
    nomcon: req.body.nomcon,
    emacon: req.body.emacon,
    telcon: req.body.telcon,
    movcon: req.body.movcon,
    reffra: referencia,
    tipfra: req.body.tipfra,
    ejefra: req.body.ejefra,
    ofifra: req.body.ofifra,
    obsfra: req.body.obsfra,
    funfra: req.body.funfra,
    liqfra: 'PEND',
    stafra: estadosDocumento.pendiente,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearFraude,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/fraudes/insert',
      {
        documento,
        movimiento,
      }
    )

    res.redirect('/admin/fraudes')
  } catch (error) {
    let msg =
      'No se ha podido crear el fraude. Verifique los datos introducidos'

    if (error.response.data.errorNum === 20100) {
      msg = 'El fraude ya existe. Verifique nif, tipo y/o ejercicio'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const updateFraude = async (req, res) => {
  const user = req.user
  const documento = {
    idfrau: req.body.idfrau,
    fecfra: req.body.fecfra,
    nifcon: req.body.nifcon,
    nomcon: req.body.nomcon,
    emacon: req.body.emacon,
    telcon: req.body.telcon,
    movcon: req.body.movcon,
    tipfra: req.body.tipfra,
    ejefra: req.body.ejefra,
    ofifra: req.body.ofifra,
    obsfra: req.body.obsfra,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.modificarFraude,
  }
  try {
    const result = await axios.post(
      'http://localhost:8000/api/fraudes/update',
      {
        documento,
        movimiento,
      }
    )

    res.redirect('/admin/fraudes')
  } catch (error) {
    let msg =
      'No se ha podido actualizar el fraude. Verifique los datos introducidos'

    if (error.response.data.errorNum === 20100) {
      msg = 'El fraude ya existe. Verifique nif, tipo y/o ejercicio'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const deleteFraude = async (req, res) => {
  const user = req.user
  const documento = {
    idfrau: req.body.idfrau,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.borrarFraude,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/fraudes/delete',
      {
        documento,
        movimiento,
      }
    )

    res.redirect('/admin/fraudes')
  } catch (error) {
    const msg =
      'No se ha podido elminar el fraude. El error puede deberse a que el documento ya no existe.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const asignarFraude = async (req, res) => {
  const user = req.user
  const documento = {
    idfrau: req.body.idfrau,
    liqfra: user.userID,
    stafra: estadosDocumento.asignado,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.asignarFraude,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/fraude', {
      idfrau: req.body.idfrau,
    })

    if (resul.data.stafra === estadosDocumento.pendiente) {
      await axios.post('http://localhost:8000/api/fraudes/cambioEstado', {
        documento,
        movimiento,
      })

      res.redirect('/admin/fraudes')
    } else {
      res.redirect('/admin/fraudes')
    }
  } catch (error) {
    const msg =
      'No se ha podido asignar el fraude. El error puede deberse a que el documento ya no existe.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const resolverFraude = async (req, res) => {
  const user = req.user
  const documento = {
    idfrau: req.body.idfrau,
    liqfra: user.userID,
    stafra: estadosDocumento.resuelto,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.resolverFraude,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/fraude', {
      idfrau: req.body.idfrau,
    })

    if (resul.data.stafra === estadosDocumento.asignado) {
      await axios.post('http://localhost:8000/api/fraudes/cambioEstado', {
        documento,
        movimiento,
      })

      // envio sms
      if (req.body.chkenv) {
        const sms = {
          texto: req.body.texsms,
          movil: req.body.movcon,
          estado: estadosSms.pendiente,
          idfraumento: req.body.idfrau,
        }
        const movimiento = {
          usuarioMov: user.id,
          tipoMov: tiposMovimiento.crearSms,
        }
        try {
          await axios.post('http://localhost:8000/api/fraudes/sms', {
            sms,
            movimiento,
          })
        } catch (error) {
          const msg =
            'No se ha podido enviar el sms. El envio tendrá que realizarse manualmente.'

          res.render('admin/error400', {
            alerts: [{ msg, error }],
          })
        }
      }
    }

    res.redirect('/admin/fraudes')
  } catch (error) {
    const msg = 'No se ha podido resolver el fraude.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remitirFraude = async (req, res) => {
  const user = req.user
  const documento = {
    idfrau: req.body.idfrau,
    liqfra: user.userID,
    stafra: estadosDocumento.remitido,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.remitirFraude,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/fraude', {
      idfrau: req.body.idfrau,
    })

    if (resul.data.stafra === estadosDocumento.asignado) {
      const result = await axios.post(
        'http://localhost:8000/api/fraudes/cambioEstado',
        {
          documento,
          movimiento,
        }
      )
    }

    res.redirect('/admin/fraudes')
  } catch (error) {
    const msg = 'No se ha podido remitir el fraude.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const desadjudicarFraude = async (req, res) => {
  const user = req.user
  const documento = {
    idfrau: req.body.idfrau,
    liqfra: 'PEND',
    stafra: estadosDocumento.pendiente,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.desasignarFraude,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/fraude', {
      idfrau: req.body.idfrau,
    })

    if (
      resul.data.stafra === estadosDocumento.asignado ||
      resul.data.stafra === estadosDocumento.resuelto ||
      resul.data.stafra === estadosDocumento.remitido
    ) {
      await axios.post('http://localhost:8000/api/fraudes/cambioEstado', {
        documento,
        movimiento,
      })
    }

    res.redirect('/admin/fraudes')
  } catch (error) {
    const msg = 'No se ha podido desadjudicar el fraude.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

export const insertHito = async (req, res) => {
  const user = req.user
  const idFraude = req.body.idfrau
  const hito = {
    tiphit: req.body.tiphit,
    subthi: req.body.subthi ? req.body.subthi : 0,
    imphit: req.body.imphit ? req.body.imphit : 0,
    obshit: req.body.obshit,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearHito,
  }

  try {
    await axios.post('http://localhost:8000/api/fraudes/hitos/insert', {
      hito,
      idFraude,
      movimiento,
    })

    res.redirect(`/admin/fraudes/hitos/${idFraude}`)
  } catch (error) {
    const msg = 'No se ha podido insertar el hito.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const updateHito = async (req, res) => {
  const user = req.user
  const idFraude = req.body.idfrau
  const hito = {
    idhito: req.body.idhito,
    tiphit: req.body.tiphit,
    subthi: req.body.subthi ? req.body.subthi : 0,
    imphit: req.body.imphit ? req.body.imphit : 0,
    obshit: req.body.obshit,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.modificarHito,
  }
  try {
    await axios.post('http://localhost:8000/api/fraudes/hitos/update', {
      hito,
      movimiento,
    })

    res.redirect(`/admin/fraudes/hitos/${idFraude}`)
  } catch (error) {
    const msg = 'No se ha podido actualizar el hito.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const deleteHito = async (req, res) => {
  const user = req.user
  const hito = {
    idhito: req.body.idhito,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.borrarHito,
  }

  try {
    await axios.post('http://localhost:8000/api/fraudes/hitos/delete', {
      hito,
      movimiento,
    })

    res.redirect('/admin/fraudes')
  } catch (error) {
    const msg = 'No se ha podido acceder borrar el hito.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

export const sms = async (req, res) => {
  const user = req.user
  const sms = {
    texfra: req.body.texsms,
    movfra: req.body.movsms,
    stafra: estadosSms.pendiente,
    idfrau: req.body.frasms,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearSms,
  }

  try {
    await axios.post('http://localhost:8000/api/fraudes/sms', {
      sms,
      movimiento,
    })

    res.redirect('/admin/fraudes')
  } catch (error) {
    const msg = 'No se ha podido enviar el sms.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const ejercicio = async (req, res) => {
  const user = req.user
  const referencia =
    'F' +
    randomString(
      10,
      'abcdefghijklmnpqrstuvwxyz1234567890ABCDEFGHIJKLMNPQRSTUVWXYZ'
    )

  const documento = {
    fecfra: new Date().toISOString().slice(0, 10),
    nifcon: req.body.nifcon,
    nomcon: req.body.nomcon,
    emacon: req.body.emacon,
    telcon: req.body.telcon,
    movcon: req.body.movcon,
    reffra: referencia,
    tipfra: req.body.tipfra,
    ejefra: req.body.ejefra,
    ofifra: user.oficina,
    obsfra: req.body.obsfra,
    funfra: user.userID,
    liqfra: user.userID,
    stafra: estadosDocumento.asignado,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearFraude,
  }

  try {
    await axios.post('http://localhost:8000/api/fraudes/insert', {
      documento,
      movimiento,
    })

    res.redirect('/admin/fraudes')
  } catch (error) {
    const msg = 'No se ha podido insertar el ejercicio.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const updatePerfil = async (req, res) => {
  const user = req.user
  const usuario = {
    id: user.id,
    userid: req.body.userid,
    nombre: req.body.nomusu,
    email: req.body.emausu,
    rol: user.rol,
    oficina: user.oficina,
    telefono: req.body.telusu,
    usuarioMov: user.id,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.modificarPerfil,
  }

  try {
    await axios.post('http://localhost:8000/api/fraudes/updatePerfil', {
      usuario,
      movimiento,
    })

    const accessToken = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        userID: usuario.userid,
        email: usuario.email,
        rol: usuario.rol,
        oficina: usuario.oficina,
        telefono: usuario.telefono,
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: '8h' }
    )
    const options = {
      path: '/',
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 8, // 8 horas
      httpOnly: true,
    }

    res.cookie('auth', accessToken, options)
    res.redirect('/admin/fraudes')
  } catch (error) {
    const msg = 'No se ha podido actualizar el perfil de usuario'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const changePassword = async (req, res) => {
  const user = req.user

  const usuario = {
    id: user.id,
    password: req.body.pwdusu,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearDocumento,
  }

  try {
    await axios.post('http://localhost:8000/api/fraudes/cambio', {
      usuario,
      movimiento,
    })

    res.redirect('/admin/fraudes')
  } catch (error) {
    const msg = 'No se ha podido actualizar la contraseña.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// helpers
function randomString(long, chars) {
  let result = ''
  for (let i = long; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}
