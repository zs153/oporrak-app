import axios from 'axios'
import jwt from 'jsonwebtoken'
import {
  estadosDocumento,
  estadosSms,
  tiposMovimiento,
  tiposVisualizacion,
} from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const documento = {
    stadoc: tiposVisualizacion.resueltos,
  }

  try {
    const result = await axios.post('http://localhost:8000/api/formularios', {
      documento,
    })

    const datos = { documentos: result.data.dat }
    res.render('admin/formularios', { user, datos })
  } catch (error) {
    res.redirect('/')
  }
}
export const addPage = async (req, res) => {
  const user = req.user
  const fecha = new Date()

  try {
    // tipos
    const resultTipos = await axios.get('http://localhost:8000/api/tipos')
    const arrTipos = resultTipos.data.dat

    // oficinas
    const resultOficinas = await axios.get('http://localhost:8000/api/oficinas')
    const arrOficinas = resultOficinas.data.dat

    const documento = {
      iddocu: 0,
      fecdoc: fecha.toISOString().substring(0, 10),
      nifcon: '',
      nomcon: '',
      emAcon: '',
      telcon: '',
      movcon: '',
      refdoc: '',
      tipdoc: 0,
      ejedoc: fecha.getFullYear(),
      ofidoc: 0,
      obsdoc: '',
      licdoc: '',
      fundoc: user.userID,

      stadoc: estadosDocumento.pendiente,
    }
    const datos = {
      documento,
      arrTipos,
      arrOficinas,
    }

    res.render('admin/formularios/add', { user, datos })
  } catch (error) {
    res.redirect('/admin/formularios')
  }
}
export const editPage = async (req, res) => {
  const user = req.user

  try {
    // tipos
    const resultTipos = await axios.get('http://localhost:8000/api/tipos')
    const arrTipos = resultTipos.data.dat

    // oficinas
    const resultOficinas = await axios.get('http://localhost:8000/api/oficinas')
    const arrOficinas = resultOficinas.data.dat

    // formularios
    const result = await axios.post('http://localhost:8000/api/formulario', {
      id: req.params.id,
    })

    const documento = {
      iddocu: result.data.iddocu,
      fecdoc: result.data.fecdoc,
      nifcon: result.data.nifcon,
      nomcon: result.data.nomcon,
      emacon: result.data.emacon,
      telcon: result.data.telcon,
      movcon: result.data.movcon,
      refdoc: result.data.refdoc,
      tipdoc: result.data.tipdoc,
      ejedoc: result.data.ejedoc,
      ofidoc: result.data.ofidoc,
      obsdoc: result.data.obsdoc,
      fundoc: result.data.fundoc,
      liqdoc: result.data.liqdoc,
    }
    const datos = {
      documento,
      arrTipos,
      arrOficinas,
    }

    res.render('admin/formularios/edit', { user, datos })
  } catch (error) {
    res.redirect('/admin/formularios')
  }
}
export const insertFormulario = async (req, res) => {
  const user = req.user

  const documento = {
    fecha: req.body.fecdoc,
    nif: req.body.nifcon,
    nombre: req.body.nomcon,
    email: req.body.emacon,
    telefono: req.body.telcon,
    movil: req.body.movcon,
    //referencia: req.body.refdoc,
    tipo: req.body.tipdoc,
    ejercicio: req.body.ejedoc,
    oficina: req.body.ofidoc,
    observaciones: req.body.obsdoc,
    funcionario: req.body.fundoc,
    liquidador: 'PEND',
    estado: estadosDocumento.pendiente,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearDocumento,
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
    let msg =
      'No se ha podido crear el formulario. Verifique los datos introducidos'

    if (error.response.data.errorNum === 20100) {
      msg = 'El formulario ya existe. Verifique la referencia'
    }

    try {
      // tipos
      const resultTipos = await axios.get('http://localhost:8000/api/tipos')
      const arrTipos = resultTipos.data.dat

      // oficinas
      const resultOficinas = await axios.get(
        'http://localhost:8000/api/oficinas'
      )
      const arrOficinas = resultOficinas.data.dat

      const datos = {
        documento,
        arrTipos,
        arrOficinas,
      }

      res.render('admin/formularios/add', { user, datos, alerts: [{ msg }] })
    } catch (error) {
      res.redirect('/admin/formularios')
    }
  }
}
export const updateFormulario = async (req, res) => {
  const user = req.user

  const documento = {
    id: req.body.iddocu,
    fecha: req.body.fecdoc,
    nif: req.body.nifcon,
    nombre: req.body.nomcon,
    email: req.body.emacon,
    telefono: req.body.telcon,
    movil: req.body.movcon,
    referencia: req.body.refdoc,
    tipo: req.body.tipdoc,
    ejercicio: req.body.ejedoc,
    oficina: req.body.ofidoc,
    observaciones: req.body.obsdoc,
    funcionario: req.body.fundoc,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.modificarDocumento,
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
    let msg =
      'No se ha podido actualizar el formulario. Verifique los datos introducidos'

    if (error.response.data.errorNum === 20100) {
      msg = 'El formulario ya existe. Verifique la referencia'
    }

    try {
      // tipos
      const resultTipos = await axios.get('http://localhost:8000/api/tipos')
      const arrTipos = resultTipos.data.dat

      // oficinas
      const resultOficinas = await axios.get(
        'http://localhost:8000/api/oficinas'
      )
      const arrOficinas = resultOficinas.data.dat

      const datos = {
        documento,
        arrTipos,
        arrOficinas,
      }

      res.render('admin/formularios/edit', { user, datos, alerts: [{ msg }] })
    } catch (error) {
      res.redirect('/admin/formularios')
    }
  }
}
export const deleteFormulario = async (req, res) => {
  const user = req.user
  const documento = {
    id: req.body.iddocu,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.borrarDocumento,
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
    res.redirect('/admin/formularios')
  }
}
export const asignarFormulario = async (req, res) => {
  const user = req.user
  const documento = {
    id: req.body.iddocu,
    liquidador: user.userID,
    estado: estadosDocumento.asignado,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.asignarFormulario,
  }

  try {
    // estado formulario
    const resul = await axios.post('http://localhost:8000/api/formulario', {
      id: req.body.iddocu,
    })

    if (resul.data.stadoc === estadosDocumento.pendiente) {
      const result = await axios.post(
        'http://localhost:8000/api/formularios/cambioEstado',
        {
          documento,
          movimiento,
        }
      )

      res.redirect('/admin/formularios')
    } else {
      res.redirect('/admin/formularios')
    }
  } catch (error) {
    res.redirect('/admin/formularios')
  }
}
export const resolverFormulario = async (req, res) => {
  const user = req.user

  if (req.body.chkenv) {
  }
  const documento = {
    id: req.body.iddocu,
    liquidador: user.userID,
    estado: estadosDocumento.resuelto,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.resolverFormulario,
  }

  try {
    // estado formulario
    const resul = await axios.post('http://localhost:8000/api/formulario', {
      id: req.body.iddocu,
    })
    // cambiar estado
    if (resul.data.stadoc === estadosDocumento.asignado) {
      const result = await axios.post(
        'http://localhost:8000/api/formularios/cambioEstado',
        {
          documento,
          movimiento,
        }
      )

      /// envio sms
      if (req.body.chkenv) {
        const sms = {
          texto: req.body.texsms,
          movil: req.body.movcon,
          estado: estadosSms.pendiente,
          idDocumento: req.body.iddocu,
        }
        const movimiento = {
          usuarioMov: user.id,
          tipoMov: tiposMovimiento.crearSms,
        }
        const result = await axios.post(
          'http://localhost:8000/api/formularios/sms',
          {
            sms,
            movimiento,
          }
        )
      }

      res.redirect('/admin/formularios')
    } else {
      res.redirect('/admin/formularios')
    }
  } catch (error) {
    res.redirect('/admin/formularios')
  }
}
export const remitirFormulario = async (req, res) => {
  const user = req.user
  const documento = {
    id: req.body.iddocu,
    liquidador: user.userID,
    estado: estadosDocumento.remitido,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.remitirFormulario,
  }

  try {
    // estado formulario
    const resul = await axios.post('http://localhost:8000/api/formulario', {
      id: req.body.iddocu,
    })

    if (resul.data.stadoc === estadosDocumento.asignado) {
      const result = await axios.post(
        'http://localhost:8000/api/formularios/cambioEstado',
        {
          documento,
          movimiento,
        }
      )

      res.redirect('/admin/formularios')
    } else {
      res.redirect('/admin/formularios')
    }
  } catch (error) {
    res.redirect('/admin/formularios')
  }
}
export const desadjudicarFormulario = async (req, res) => {
  const user = req.user
  const documento = {
    id: req.body.iddocu,
    liquidador: 'PEND',
    estado: estadosDocumento.pendiente,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.desasignarFormulario,
  }

  try {
    // estado formulario
    const resul = await axios.post('http://localhost:8000/api/formulario', {
      id: req.body.iddocu,
    })

    if (
      resul.data.stadoc === estadosDocumento.asignado ||
      resul.data.stadoc === estadosDocumento.resuelto ||
      resul.data.stadoc === estadosDocumento.remitido
    ) {
      const result = await axios.post(
        'http://localhost:8000/api/formularios/cambioEstado',
        {
          documento,
          movimiento,
        }
      )

      res.redirect('/admin/formularios')
    } else {
      // TODO mensaje
      res.redirect('/admin/formularios')
    }
  } catch (error) {
    res.redirect('/admin/formularios')
  }
}
export const verTodo = async (req, res) => {
  const user = req.user
  const documento = {
    stadoc: tiposVisualizacion.todos,
  }

  try {
    const result = await axios.post('http://localhost:8000/api/formularios', {
      documento,
    })

    const datos = { documentos: result.data.dat }
    res.render('admin/formularios', { user, datos })
  } catch (error) {
    res.redirect('/admin/formularios')
  }
}
export const sms = async (req, res) => {
  const user = req.user
  const sms = {
    idDocumento: req.body.docsms,
    texto: req.body.texsms,
    movil: req.body.movsms,
    estado: estadosDocumento.pendiente,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearSms,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/formularios/sms',
      {
        sms,
        movimiento,
      }
    )

    res.redirect('/admin/formularios')
  } catch (error) {
    res.redirect('/admin/formularios')
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
    tipoMov: tiposMovimiento.crearDocumento,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/formularios/updatePerfil',
      {
        usuario,
        movimiento,
      }
    )

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
    res.redirect('/admin/formularios')
  } catch (error) {
    res.redirect('/admin/formularios')
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
    const result = await axios.post(
      'http://localhost:8000/api/formularios/cambio',
      {
        usuario,
        movimiento,
      }
    )

    res.redirect('/admin/formularios')
  } catch (error) {
    res.redirect('/admin/formularios')
  }
}
