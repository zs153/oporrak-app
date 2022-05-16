import axios from 'axios'
import {
  estadosFraude,
  estadosSms,
  tiposMovimiento,
  tiposRol,
  origenTipo,
  estadosHito,
} from '../public/js/enumeraciones'

// pages fraude
export const mainPage = async (req, res) => {
  const user = req.user
  const fraude = {
    stafra: estadosFraude.pendiente + estadosFraude.asignado,
  }

  try {
    const result = await axios.post('http://localhost:8000/api/fraudes', {
      fraude,
    })

    const datos = {
      documentos: result.data,
      tiposRol,
      estadosFraude,
      estadosHito,
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
      sitfra: 0,
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
      idfrau: result.data.IDFRAU,
      fecfra: result.data.FECFRA,
      nifcon: result.data.NIFCON,
      nomcon: result.data.NOMCON,
      emacon: result.data.EMACON,
      telcon: result.data.TELCON,
      movcon: result.data.MOVCON,
      reffra: result.data.REFFRA,
      tipfra: result.data.TIPFRA,
      ejefra: result.data.EJEFRA,
      ofifra: result.data.OFIFRA,
      obsfra: result.data.OBSFRA,
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
export const resolverPage = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.params.id,
  }

  try {
    const result = await axios.post('http://localhost:8000/api/fraude', {
      fraude,
    })
    const hitos = await axios.post('http://localhost:8000/api/fraudes/hitos', {
      fraude,
    })
    const subtipos = await axios.post('http://localhost:8000/api/subtipos')
    const datos = {
      fraude: result.data,
      subtipos: subtipos.data,
      hayLiquidacion: hitos.data.some(
        (itm) => itm.STAHIT === estadosHito.liquidacionActiva
      ),
    }

    res.render('admin/fraudes/resolver', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// page hitosevento
export const hitoseventosPage = async (req, res) => {
  const user = req.user
  let fraude = {
    idfrau: req.params.id,
  }

  try {
    const rslt = await axios.post('http://localhost:8000/api/fraude', {
      fraude,
    })
    const htos = await axios.post('http://localhost:8000/api/fraudes/hitos', {
      fraude,
    })
    const evts = await axios.post('http://localhost:8000/api/fraudes/events', {
      fraude,
    })
    const datos = {
      fraude: rslt.data,
      hitos: htos.data,
      eventos: evts.data,
      estadosHito,
    }

    res.render('admin/fraudes/hitos/index', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los hitos del fraude seleccionado.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// pages hito
export const addHitosPage = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.params.id,
  }
  const hito = {
    idhito: 0,
    tiphit: 0,
    imphit: 0,
    obshit: '',
    stahit: 0,
  }
  try {
    const datos = {
      fraude,
      hito,
      origenTipo,
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
    idfrau: req.params.idfra,
  }
  const hito = {
    idhito: req.params.idhit,
  }

  try {
    const result = await axios.post('http://localhost:8000/api/hito', {
      hito,
    })

    const datos = {
      fraude,
      hito: result.data,
      origenTipo,
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

// pages evento
export const addEventosPage = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.params.id,
  }
  const evento = {
    ideven: 0,
    tipeve: 0,
    obseve: '',
  }
  try {
    const datos = {
      fraude,
      evento,
    }

    res.render('admin/fraudes/eventos/add', { user, datos })
  } catch (error) {
    const msg =
      'No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editEventosPage = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.params.idfra,
  }
  const evento = {
    ideven: req.params.ideve,
  }

  try {
    const result = await axios.post('http://localhost:8000/api/event', {
      evento,
    })

    const datos = {
      fraude,
      evento: result.data,
    }

    res.render('admin/fraudes/eventos/edit', { user, datos })
  } catch (error) {
    const msg =
      'No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// otros
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

// procs fraude
export const insert = async (req, res) => {
  const user = req.user
  const referencia = 'F' + randomString(10, '1234567890YMGS')
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
    sitfra: 0,
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
  let fraude = {
    idfrau: req.body.idfrau,
  }

  try {
    const result = await axios.post('http://localhost:8000/api/fraude', {
      fraude,
    })

    fraude = {
      idfrau: result.data.IDFRAU,
      liqfra: user.userID,
      stafra: estadosFraude.asignado,
    }
    const movimiento = {
      usumov: user.id,
      tipmov: tiposMovimiento.asignarFraude,
    }

    if (result.data.STAFRA === estadosFraude.pendiente) {
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
    sitfra: req.body.sitfra,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.resolverFraude,
  }

  try {
    const result = await axios.post('http://localhost:8000/api/fraude', {
      fraude: { idfrau: fraude.idfrau },
    })

    if (result.data.STAFRA === estadosFraude.asignado) {
      const hitos = await axios.post(
        'http://localhost:8000/api/fraudes/hitos',
        {
          fraude,
        }
      )

      // propuesta liq
      const hayPropuestaLiquidacion = hitos.data.some(
        (itm) => itm.STAHIT === -1
      )
      if (hayPropuestaLiquidacion) {
        if (!hitos.data.some((itm) => itm.STAHIT === 1)) {
          const msg =
            'Existe propuesta de liquidación sin su correspondiente liquidación.\nNo se puede resolver el fraude.'

          return res.render('admin/error400', {
            alerts: [{ msg }],
          })
        }
      }
      // liq
      const hayLiquidacion = hitos.data.some((itm) => itm.STAHIT === 1)
      if (hayLiquidacion) {
        if (!hitos.data.some((itm) => itm.STAHIT === -1)) {
          const msg =
            'Existe liquidación sin su correspondiente propuesta de liquidación.\nNo se puede resolver el fraude.'

          return res.render('admin/error400', {
            alerts: [{ msg }],
          })
        }
      }
      // propuesta sancion
      const hayPropuestaSancion = hitos.data.some((itm) => itm.STAHIT === -3)
      if (hayPropuestaSancion) {
        if (!hitos.data.some((itm) => itm.STAHIT === 3 || itm.STAHIT === 2)) {
          const msg =
            'Existe propuesta de sanción sin su correspondiente sanción o sanción anulada.\nNo se puede resolver el fraude.'

          return res.render('admin/error400', {
            alerts: [{ msg }],
          })
        }
      }
      // sancion
      const haySancion = hitos.data.some(
        (itm) => itm.STAHIT === 3 || itm.STAHIT === 2
      )
      if (haySancion) {
        if (!hitos.data.some((itm) => itm.STAHIT === -3)) {
          const msg =
            'Existe sanción o sanción anulada sin su correspondiente propuesta de sanción.\nNo se puede resolver el fraude.'

          return res.render('admin/error400', {
            alerts: [{ msg }],
          })
        }
      }

      const result = await axios.post(
        'http://localhost:8000/api/fraudes/situacion',
        {
          fraude,
          movimiento,
        }
      )
    }

    res.redirect('/admin/fraudes')
  } catch (error) {
    const msg = 'No se ha podido resolver el documento.'

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

    res.redirect('/admin/fraudes')
  } catch (error) {
    const msg = 'No se ha podido enviar el sms.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// proc hito
export const insertHito = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.body.idfrau,
  }
  const hito = {
    tiphit: req.body.tiphit,
    imphit: req.body.imphit ? req.body.imphit : 0,
    obshit: req.body.obshit,
    stahit: req.body.anuhit,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearHito,
  }

  try {
    await axios.post('http://localhost:8000/api/fraudes/hitos/insert', {
      fraude,
      hito,
      movimiento,
    })

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.idfrau}`)
  } catch (error) {
    const msg = 'No se ha podido insertar el hito.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const updateHito = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.body.idfrau,
  }
  const hito = {
    idhito: req.body.idhito,
    tiphit: req.body.tiphit,
    imphit: req.body.imphit ? req.body.imphit : 0,
    obshit: req.body.obshit,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarHito,
  }

  try {
    await axios.post('http://localhost:8000/api/hitos/update', {
      hito,
      movimiento,
    })

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.idfrau}`)
  } catch (error) {
    const msg = 'No se ha podido actualizar el hito.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const deleteHito = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.body.idfrau,
  }
  const hito = {
    idhito: req.body.idhito,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarHito,
  }

  try {
    await axios.post('http://localhost:8000/api/hitos/delete', {
      hito,
      movimiento,
    })

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.idfrau}`)
  } catch (error) {
    const msg = 'No se ha podido acceder borrar el hito.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const archivoHito = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.body.idfrau,
  }
  const hito = {
    idhito: req.body.idhito,
    stahit: estadosHito.sancionAnulada,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.archivadoSancion,
  }

  try {
    await axios.post('http://localhost:8000/api/hitos/archivado', {
      hito,
      movimiento,
    })

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.idfrau}`)
  } catch (error) {
    const msg = 'No se ha podido acceder borrar el hito.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// proc evento
export const insertEvento = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.body.idfrau,
  }
  const evento = {
    tipeve: req.body.tipeve,
    obseve: req.body.obseve,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearEvento,
  }

  try {
    await axios.post('http://localhost:8000/api/fraudes/events/insert', {
      fraude,
      evento,
      movimiento,
    })

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.idfrau}`)
  } catch (error) {
    const msg = 'No se ha podido insertar el hito.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const updateEvento = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.body.idfrau,
  }
  const evento = {
    ideven: req.body.ideven,
    tipeve: req.body.tipeve,
    obseve: req.body.obseve,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarEvento,
  }

  try {
    await axios.post('http://localhost:8000/api/events/update', {
      evento,
      movimiento,
    })

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.idfrau}`)
  } catch (error) {
    const msg = 'No se ha podido actualizar el hito.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const deleteEvento = async (req, res) => {
  const user = req.user
  const fraude = {
    idfrau: req.body.idfrau,
  }
  const evento = {
    ideven: req.body.ideven,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarEvento,
  }

  try {
    await axios.post('http://localhost:8000/api/events/delete', {
      evento,
      movimiento,
    })

    res.redirect(`/admin/fraudes/hitoseventos/${fraude.idfrau}`)
  } catch (error) {
    const msg = 'No se ha podido acceder borrar el hito.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// proc otros
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
