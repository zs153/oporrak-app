import axios from 'axios'
import jwt from 'jsonwebtoken'
import {
  estadosDocumento,
  estadosSms,
  tiposMovimiento,
  tiposVisualizacion,
  tiposRol,
} from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const formulario = {
    stadoc: estadosDocumento.pendiente + estadosDocumento.asignado,
  }
  const verTodo = false

  try {
    const result = await axios.post('http://localhost:8000/api/formularios', {
      formulario,
    })

    const datos = {
      documentos: result.data,
      tiposRol,
      estadosDocumento,
      verTodo,
    }
    res.render('admin/formularios', { user, datos })
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
      iddocu: 0,
      fecdoc: fecha.toISOString().slice(0, 10),
      nifcon: '',
      nomcon: '',
      emacon: '',
      telcon: '',
      movcon: '',
      refdoc: '',
      tipdoc: 0,
      ejedoc: fecha.getFullYear() - 1,
      ofidoc: user.oficina,
      obsdoc: '',
      fundoc: user.userID,
      liqdoc: '',
      stadoc: estadosDocumento.pendiente,
    }
    const datos = {
      documento,
    }

    res.render('admin/formularios/add', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editPage = async (req, res) => {
  const user = req.user

  try {
    const result = await axios.post('http://localhost:8000/api/formulario', {
      iddocu: req.params.id,
    })

    const documento = {
      iddocu: result.data.IDDOCU,
      fecdoc: result.data.FECDOC,
      nifcon: result.data.NIFCON,
      nomcon: result.data.NOMCON,
      emacon: result.data.EMACON,
      telcon: result.data.TELCON,
      movcon: result.data.MOVCON,
      refdoc: result.data.REFDOC,
      tipdoc: result.data.TIPDOC,
      ejedoc: result.data.EJEDOC,
      ofidoc: result.data.OFIDOC,
      obsdoc: result.data.OBSDOC,
      fundoc: result.data.FUNDOC,
      liqdoc: result.data.LIQDOC,
    }
    const datos = {
      documento,
    }
    console.log(documento)
    res.render('admin/formularios/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const insert = async (req, res) => {
  const user = req.user
  const referencia = 'W' + randomString(10, '1234567890YMGS')
  const documento = {
    fecdoc: req.body.fecdoc,
    nifcon: req.body.nifcon,
    nomcon: req.body.nomcon,
    emacon: req.body.emacon,
    telcon: req.body.telcon,
    movcon: req.body.movcon,
    refdoc: referencia,
    tipdoc: req.body.tipdoc,
    ejedoc: req.body.ejedoc,
    ofidoc: req.body.ofidoc,
    obsdoc: req.body.obsdoc,
    fundoc: req.body.fundoc,
    liqdoc: 'PEND',
    stadoc: estadosDocumento.pendiente,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearDocumento,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/formularios/insert',
      {
        documento,
        movimiento,
      }
    )

    res.redirect('/admin/formularios')
  } catch (error) {
    let msg = 'No se ha podido crear el formulario.'

    if (error.response.data.errorNum === 20100) {
      msg = 'El formulario ya existe.'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const update = async (req, res) => {
  const user = req.user

  const documento = {
    iddocu: req.body.iddocu,
    fecdoc: req.body.fecdoc,
    nifcon: req.body.nifcon,
    nomcon: req.body.nomcon,
    emacon: req.body.emacon,
    telcon: req.body.telcon,
    movcon: req.body.movcon,
    tipdoc: req.body.tipdoc,
    ejedoc: req.body.ejedoc,
    ofidoc: req.body.ofidoc,
    obsdoc: req.body.obsdoc,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarDocumento,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/formularios/update',
      {
        documento,
        movimiento,
      }
    )

    res.redirect('/admin/formularios')
  } catch (error) {
    let msg = 'No se ha podido actualizar el formulario.'

    if (error.response.data.errorNum === 20100) {
      msg = 'El formulario ya existe. Verifique nif, tipo y/o ejercicio'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const documento = {
    iddocu: req.body.iddocu,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarDocumento,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/formularios/delete',
      {
        documento,
        movimiento,
      }
    )

    res.redirect('/admin/formularios')
  } catch (error) {
    const msg =
      'No se ha podido elminar el formulario. El error puede deberse a que el documento ya no existe.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const asign = async (req, res) => {
  const user = req.user
  const documento = {
    iddocu: req.body.iddocu,
    liqdoc: user.userID,
    stadoc: estadosDocumento.asignado,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.asignarFormulario,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/formulario', {
      iddocu: req.body.iddocu,
    })

    if (resul.data.STADOC === estadosDocumento.pendiente) {
      const result = await axios.post(
        'http://localhost:8000/api/formularios/cambio',
        {
          documento,
          movimiento,
        }
      )

      res.redirect('/admin/formularios')
    }
  } catch (error) {
    const msg =
      'No se ha podido asignar el formulario. El error puede deberse a que el documento ya no existe.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const resol = async (req, res) => {
  const user = req.user
  const documento = {
    iddocu: req.body.iddocu,
    liqdoc: user.userID,
    stadoc: estadosDocumento.resuelto,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.resolverFormulario,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/formulario', {
      iddocu: req.body.iddocu,
    })

    if (resul.data.STADOC === estadosDocumento.asignado) {
      const result = await axios.post(
        'http://localhost:8000/api/formularios/cambio',
        {
          documento,
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
        const documento = {
          iddocu: req.body.iddocu,
        }
        const movimiento = {
          usumov: user.id,
          tipmov: tiposMovimiento.crearSms,
        }
        console.log(sms, documento, movimiento)
        try {
          const result = await axios.post(
            'http://localhost:8000/api/formularios/sms/insert',
            {
              sms,
              documento,
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

    res.redirect('/admin/formularios')
  } catch (error) {
    const msg = 'No se ha podido resolver el formulario.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remit = async (req, res) => {
  const user = req.user
  const documento = {
    iddocu: req.body.iddocu,
    liqdoc: user.userID,
    stadoc: estadosDocumento.remitido,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.remitirFormulario,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/formulario', {
      iddocu: req.body.iddocu,
    })

    if (resul.data.STADOC === estadosDocumento.asignado) {
      await axios.post('http://localhost:8000/api/formularios/cambio', {
        documento,
        movimiento,
      })
    }

    res.redirect('/admin/formularios')
  } catch (error) {
    const msg = 'No se ha podido remitir el fraude.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const unasign = async (req, res) => {
  const user = req.user
  const documento = {
    iddocu: req.body.iddocu,
    liqdoc: 'PEND',
    stadoc: estadosDocumento.pendiente,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.desasignarFormulario,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/formulario', {
      iddocu: req.body.iddocu,
    })

    if (
      resul.data.STADOC === estadosDocumento.asignado ||
      resul.data.STADOC === estadosDocumento.resuelto ||
      resul.data.STADOC === estadosDocumento.remitido
    ) {
      await axios.post('http://localhost:8000/api/formularios/cambio', {
        documento,
        movimiento,
      })
    }

    res.redirect('/admin/formularios')
  } catch (error) {
    const msg = 'No se ha podido desasignar el formulario.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const verTodo = async (req, res) => {
  const user = req.user
  const formulario = {
    stadoc:
      estadosDocumento.pendiente +
      estadosDocumento.resuelto +
      estadosDocumento.remitido,
  }
  const verTodo = true

  try {
    const result = await axios.post('http://localhost:8000/api/formularios', {
      formulario,
    })

    const datos = {
      documentos: result.data,
      tiposRol,
      estadosDocumento,
      verTodo,
    }

    res.render('admin/formularios', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const sms = async (req, res) => {
  const user = req.user
  const documento = {
    iddocu: req.body.iddocu,
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
    await axios.post('http://localhost:8000/api/formularios/sms/insert', {
      documento,
      sms,
      movimiento,
    })

    res.redirect('/admin/formularios')
  } catch (error) {
    const msg = 'No se ha podido enviar el sms.'

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
