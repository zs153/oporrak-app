import axios from 'axios'
import {
  estadosFraude,
  estadosSms,
  tiposMovimiento,
  tiposRol,
} from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const fraude = {
    stafra: estadosFraude.pendiente + estadosFraude.asignado,
  }
  const verTodo = false

  try {
    const result = await axios.post('http://localhost:8000/api/fraudes', {
      fraude,
    })

    const datos = {
      documentos: result.data,
      tiposRol,
      estadosFraude,
      verTodo,
    }

    res.render('admin/fraudes', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addPage = async (req, res) => {
  const user = req.user
  const fecha = new Date()
  try {
    const documento = {
      idfrau: 0,
      fecfra: fecha.toISOString().slice(0, 10),
      nifcon: '',
      nomcon: '',
      emacon: '',
      telcon: '',
      movcon: '',
      reffra: '',
      tipfra: 0,
      ejefra: fecha.getFullYear() - 1,
      ofifra: user.oficina,
      obsfra: '',
      funfra: user.userID,
      liqfra: '',
      stafra: estadosFraude.pendiente,
    }
    const datos = {
      documento,
    }

    res.render('admin/fraudes/add', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.params.id,
  }

  try {
    const result = await axios.post('http://localhost:8000/api/fraude', {
      fraude,
    })

    const documento = {
      iddocu: result.data.IDFRAU,
      fecdoc: result.data.FECFRA,
      nifcon: result.data.NIFCON,
      nomcon: result.data.NOMCON,
      emacon: result.data.EMACON,
      telcon: result.data.TELCON,
      movcon: result.data.MOVCON,
      refdoc: result.data.REFFRA,
      tipdoc: result.data.TIPFRA,
      ejedoc: result.data.EJEFRA,
      ofidoc: result.data.OFIFRA,
      obsdoc: result.data.OBSFRA,
      fundoc: result.data.FUNFRA,
      liqdoc: result.data.LIQFRA,
    }
    const datos = {
      documento,
    }

    res.render('admin/fraudes/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const hitosPage = async (req, res) => {
  const user = req.user
  let fraude = {
    idfrau: req.params.idfrau,
  }

  try {
    // fraude
    const result = await axios.post('http://localhost:8000/api/fraude', {
      fraude,
    })

    fraude = result.data

    // hitosFraude
    const hitos = await axios.post('http://localhost:8000/api/fraudes/hitos', {
      fraude,
    }).data
    const datos = {
      fraude,
      hitos,
    }

    res.render('admin/fraudes/hitos/index', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los hitos del fraude seleccionado.'

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
export const ejercicioPage = async (req, res) => {
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

// procs
export const insert = async (req, res) => {
  const user = req.user
  const referencia = 'Z' + randomString(10, '1234567890YMGS')
  const fraude = {
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
    stafra: estadosFraude.pendiente,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearFraude,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/fraudes/insert',
      {
        fraude,
        movimiento,
      }
    )

    res.redirect('/admin/fraudes')
  } catch (error) {
    let msg = 'No se ha podido crear el documento.'

    if (error.response.data.errorNum === 20100) {
      msg = 'El documento ya existe.'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const update = async (req, res) => {
  const user = req.user
  const fraude = {
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
    usumov: user.id,
    tipmov: tiposMovimiento.modificarFraude,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/fraudes/update',
      {
        fraude,
        movimiento,
      }
    )

    res.redirect('/admin/fraudes')
  } catch (error) {
    let msg = 'No se ha podido actualizar el documento.'

    if (error.response.data.errorNum === 20100) {
      msg = 'El documento ya existe. Verifique nif, tipo y/o ejercicio'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.body.idfrau,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarFraude,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/fraudes/delete',
      {
        fraude,
        movimiento,
      }
    )

    res.redirect('/admin/fraudes')
  } catch (error) {
    const msg = 'No se ha podido elminar el documento.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const asign = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.body.idfrau,
    liqfra: user.userID,
    stafra: estadosFraude.asignado,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.asignarFraude,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/fraude', {
      fraude,
    })

    if (resul.data.STAFRA === estadosFraude.pendiente) {
      const result = await axios.post(
        'http://localhost:8000/api/fraudes/cambio',
        {
          fraude,
          movimiento,
        }
      )

      res.redirect('/admin/fraudes')
    }
  } catch (error) {
    const msg = 'No se ha podido asignar el documento.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const resol = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.body.idfrau,
    liqfra: user.userID,
    stafra: estadosFraude.resuelto,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.resolverFraude,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/fraude', {
      fraude,
    })

    if (resul.data.STAFRA === estadosFraude.asignado) {
      const result = await axios.post(
        'http://localhost:8000/api/fraudes/cambio',
        {
          fraude,
          movimiento,
        }
      )

      /// envio sms
      if (req.body.chkenv) {
        const sms = {
          texsms: req.body.texsms,
          movsms: req.body.movsms,
          stasms: estadosSms.pendiente,
        }
        const fraude = {
          idfrau: req.body.idfrau,
        }
        const movimiento = {
          usumov: user.id,
          tipmov: tiposMovimiento.crearSms,
        }

        try {
          const result = await axios.post(
            'http://localhost:8000/api/fraudes/sms/insert',
            {
              sms,
              fraude,
              movimiento,
            }
          )
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
    const msg = 'No se ha podido resolver el documento.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remit = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.body.idfrau,
    liqfra: user.userID,
    stafra: estadosFraude.remitido,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.remitirFraude,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/fraude', {
      fraude,
    })

    if (resul.data.STAFRA === estadosFraude.asignado) {
      await axios.post('http://localhost:8000/api/fraudes/cambio', {
        fraude,
        movimiento,
      })
    }

    res.redirect('/admin/fraudes')
  } catch (error) {
    const msg = 'No se ha podido remitir el documento.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const unasign = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.body.idfrau,
    liqfra: 'PEND',
    stafra: estadosFraude.pendiente,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.desasignarFraude,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/fraude', {
      fraude,
    })

    if (
      resul.data.STAFRA === estadosFraude.asignado ||
      resul.data.STAFRA === estadosFraude.resuelto ||
      resul.data.STAFRA === estadosFraude.remitido
    ) {
      await axios.post('http://localhost:8000/api/fraudes/cambio', {
        fraude,
        movimiento,
      })
    }

    res.redirect('/admin/fraudes')
  } catch (error) {
    const msg = 'No se ha podido desasignar el documento.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const verTodo = async (req, res) => {
  const user = req.user
  const fraude = {
    stafra:
      estadosFraude.pendiente + estadosFraude.resuelto + estadosFraude.remitido,
  }
  const verTodo = true

  try {
    const result = await axios.post('http://localhost:8000/api/fraudes', {
      fraude,
    })

    const datos = {
      documentos: result.data,
      tiposRol,
      estadosFraude,
      verTodo,
    }

    res.render('admin/fraudes', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const sms = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.body.idfrau,
  }
  const sms = {
    texsms: req.body.texsms,
    movsms: req.body.movsms,
    stasms: estadosSms.pendiente,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearSms,
  }

  try {
    await axios.post('http://localhost:8000/api/fraudes/sms/insert', {
      fraude,
      sms,
      movimiento,
    })

    res.redirect('/admin/fradues')
  } catch (error) {
    const msg = 'No se ha podido enviar el sms.'

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

// helpers
function randomString(long, chars) {
  let result = ''
  for (let i = long; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}
