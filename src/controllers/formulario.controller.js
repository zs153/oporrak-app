import axios from 'axios'
import {
  estadosDocumento,
  estadosSms,
  tiposMovimiento,
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
      formularios: JSON.stringify(result.data),
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
    const formulario = {
      FECDOC: fecha.toISOString().slice(0, 10),
      EJEDOC: fecha.getFullYear() - 1,
      OFIDOC: user.oficina,
      FUNDOC: user.userID,
      STADOC: estadosDocumento.pendiente,
    }
    const datos = {
      formulario,
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
  const formulario = {
    iddocu: req.params.id,
  }

  try {
    const result = await axios.post('http://localhost:8000/api/formulario', {
      formulario,
    })

    const datos = {
      formulario: result.data,
    }

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
  const formulario = {
    fecdoc: req.body.fecdoc,
    nifcon: req.body.nifcon.toUpperCase(),
    nomcon: req.body.nomcon.toUpperCase(),
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
        formulario,
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

  const formulario = {
    iddocu: req.body.iddocu,
    fecdoc: req.body.fecdoc,
    nifcon: req.body.nifcon.toUpperCase(),
    nomcon: req.body.nomcon.toUpperCase(),
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
        formulario,
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
  const formulario = {
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
        formulario,
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
  let formulario = {
    iddocu: req.body.iddocu,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/formulario', {
      formulario,
    })

    if (resul.data.STADOC === estadosDocumento.pendiente) {
      formulario.liqdoc = user.userID
      formulario.stadoc= estadosDocumento.asignado

      const movimiento = {
        usumov: user.id,
        tipmov: tiposMovimiento.asignarFormulario,
      }
      const result = await axios.post(
        'http://localhost:8000/api/formularios/cambio',
        {
          formulario,
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
  let formulario = {
    iddocu: req.body.iddocu,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/formulario', {
      formulario,
    })

    if (resul.data.STADOC === estadosDocumento.asignado) {
      formulario.liqdoc = user.userID
      formulario.stadoc= estadosDocumento.resuelto
      
      let movimiento = {
        usumov: user.id,
        tipmov: tiposMovimiento.resolverFormulario,
      }

      const result = await axios.post(
        'http://localhost:8000/api/formularios/cambio',
        {
          formulario,
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
        movimiento.tipmov = tiposMovimiento.crearSms        

        try {
          const result = await axios.post(
            'http://localhost:8000/api/formularios/sms/insert',
            {
              sms,
              formulario,
              movimiento,
            }
          )
        } catch (error) {
          const msg =
            'No se ha podido enviar el sms. El envio tendrá que realizarse manualmente.'

          return res.render('admin/error400', {
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
export const unasign = async (req, res) => {
  const user = req.user
  let formulario = {
    iddocu: req.body.iddocu,
  }

  try {
    const resul = await axios.post('http://localhost:8000/api/formulario', {
      formulario,
    })

    if (
      resul.data.STADOC === estadosDocumento.asignado ||
      resul.data.STADOC === estadosDocumento.resuelto ||
      resul.data.STADOC === estadosDocumento.remitido
    ) {
      formulario.liqdoc = 'PEND'
      formulario.stadoc= estadosDocumento.pendiente

      const movimiento = {
        usumov: user.id,
        tipmov: tiposMovimiento.desasignarFormulario,
      }      
      await axios.post('http://localhost:8000/api/formularios/cambio', {
        formulario,
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
      formularios: JSON.stringify(result.data),
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
  const formulario = {
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
      formulario,
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
