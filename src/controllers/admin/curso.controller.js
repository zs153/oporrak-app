import axios from 'axios'
import { serverAPI, puertoAPI } from '../../config/settings'
import { arrEstadosCurso, arrEstadosMatricula, tiposMovimiento, tiposEstado, estadosUsuario } from '../../public/js/enumeraciones'

// page cursos
export const mainPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevCursos = cursor ? true:false
  let context = {}

  if (cursor) {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: 0,
        prev: 0,
      },
      part,
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos`, {
      context,
    })

    let cursos = result.data.data
    let hasNextCursos = cursos.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextCursos) {
      nextCursor = dir === 'next' ? cursos[limit - 1].IDCURS : cursos[0].IDCURS
      prevCursor = dir === 'next' ? cursos[0].IDCURS : cursos[limit - 1].IDCURS

      cursos.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : cursos[0]?.IDCURS
      prevCursor = dir === 'next' ? cursos[0]?.IDCURS : 0

      if (cursor) {
        hasNextCursos = nextCursor === 0 ? false : true
        hasPrevCursos = prevCursor === 0 ? false : true
      } else {
        hasNextCursos = false
        hasPrevCursos = false
      }
    }

    if (dir === 'prev') {
      cursos = cursos.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }

    const datos = {
      cursos,
      hasNextCursos,
      hasPrevCursos,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      arrEstadosCurso,
    }

    res.render('admin/cursos', { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const addPage = async (req, res) => {
  const user = req.user
  const datos = {
    arrEstadosCurso,
  }

  try {
    res.render('admin/cursos/add', { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const editPage = async (req, res) => {
  const user = req.user

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context: {
        IDCURS: req.params.id,
      },
    })
    const curso = result.data.stat === 1 ? result.data.data[0] : []
    const datos = {
      curso,
      arrEstadosCurso,
    }

    res.render('admin/cursos/edit', { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// pages turnos
export const turnosPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevTurnos = cursor ? true:false
  let context = {}

  if (cursor) {
    context = {
      idcurs: req.params.id,
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      idcurs: req.params.id,
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: 0,
        prev: 0,
      },
      part,
    }
  }

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context: {
        IDCURS: req.params.id,
      },
    })
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos`, {
      context,
    })

    let turnos = result.data.data
    let hasNextTurnos = turnos.length === limit +1
    let nextCursor = 0
    let prevCursor = 0
    
    if (hasNextTurnos) {
      nextCursor = dir === 'next' ? turnos[limit - 1].IDTURN : turnos[0].IDTURN
      prevCursor = dir === 'next' ? turnos[0].IDTURN : turnos[limit - 1].IDTURN

      turnos.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : turnos[0]?.IDTURN
      prevCursor = dir === 'next' ? turnos[0]?.IDTURN : 0
      
      if (cursor) {
        hasNextTurnos = nextCursor === 0 ? false : true
        hasPrevTurnos = prevCursor === 0 ? false : true
      } else {
        hasNextTurnos = false
        hasPrevTurnos = false
      }
    }

    if (dir === 'prev') {
      turnos = turnos.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      curso: curso.data.data[0],
      turnos,
      hasNextTurnos,
      hasPrevTurnos,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }

    res.render('admin/cursos/turnos', { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const addTurnoPage = async (req, res) => {
  const user = req.user;
  const fecha = dateISOToUTCString(new Date())
  const turno = {
    INITUR: fecha,
    FINTUR: fecha,
    INIHOR: '08:00',
    FINHOR: '14:00',
  }
  
  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context: {
        IDCURS: req.params.id,
      },
    });
    const datos = {
      curso: curso.data.data[0],
      turno,
    };

    res.render("admin/cursos/turnos/add", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error}],
      });
    }
  }
}
export const editTurnoPage = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.params.idcurs,
  }

  try {
    let turno = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turno`, {
      context: {
        IDTURN: req.params.idturn,
      },
    });

    turno = turno.data.data[0]
    turno.INITUR = dateISOToUTCString(turno.INITUR)
    turno.FINTUR = dateISOToUTCString(turno.FINTUR)

    const datos = {
      curso,
      turno,
    };

    res.render("admin/cursos/turnos/edit", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// pages matriculas
export const matriculasPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevMatriculas = cursor ? true:false
  let context = {}

  if (cursor) {
    context = {
      idcurs: req.params.id,
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      idcurs: req.params.id,
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: 0,
        prev: 0,
      },
      part,
    }
  }

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context: {
        IDCURS: req.params.id,
      },
    })
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas`, {
      context,
    })

    let matriculas = result.data.data
    let hasNextMatriculas = matriculas.length === limit +1
    let nextCursor = 0
    let prevCursor = 0
    
    if (hasNextMatriculas) {
      nextCursor = dir === 'next' ? matriculas[limit - 1].IDMATR : matriculas[0].IDMATR
      prevCursor = dir === 'next' ? matriculas[0].IDMATR : matriculas[limit - 1].IDMATR

      matriculas.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : matriculas[0]?.IDMATR
      prevCursor = dir === 'next' ? matriculas[0]?.IDMATR : 0
      
      if (cursor) {
        hasNextMatriculas = nextCursor === 0 ? false : true
        hasPrevMatriculas = prevCursor === 0 ? false : true
      } else {
        hasNextMatriculas = false
        hasPrevMatriculas = false
      }
    }

    if (dir === 'prev') {
      matriculas = matriculas.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      curso: curso.data.data[0],
      matriculas,
      hasNextMatriculas,
      hasPrevMatriculas,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      arrEstadosMatricula,
    }

    res.render('admin/cursos/matriculas', { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const addMatriculaPage = async (req, res) => {
  const user = req.user;
  const fecha = dateISOToUTCString(new Date())
  const matricula = {
    STRINI: fecha,
    STRFIN: fecha,
  }

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context: {
        IDCURS: req.params.id,
      },
    });
    const datos = {
      matricula,
      curso: curso.data.data[0],
      arrEstadosMatricula,
    };

    res.render("admin/cursos/matriculas/add", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const editMatriculaPage = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.params.idcurs,
  }

  try {
    const matricula = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matricula`, {
      context: {
        IDMATR: req.params.idmatr,
      },
    });

    const datos = {
      curso,
      matricula: matricula.data.data[0],
      arrEstadosMatricula,
    };

    res.render("admin/cursos/matriculas/edit", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// pages usuarios certificados curso
export const usuariosPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevUsers = cursor ? true : false
  let context = {}

  if (cursor) {
    context = {
      idcurs: req.params.id,
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      idcurs: req.params.id,
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: '',
        prev: '',
      },
      part,
    }
  }

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context: {
        IDCURS: req.params.id,
      },
    })
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/usuarios`, {
      context,
    })

    let usuarios = result.data.data
    let hasNextUsers = usuarios.length === limit + 1
    let nextCursor = ''
    let prevCursor = ''

    if (hasNextUsers) {
      nextCursor = dir === 'next' ? usuarios[limit - 1].NOMUSU : usuarios[0].NOMUSU
      prevCursor = dir === 'next' ? usuarios[0].NOMUSU : usuarios[limit - 1].NOMUSU

      usuarios.pop()
    } else {
      nextCursor = dir === 'next' ? '' : usuarios[0]?.NOMUSU
      prevCursor = dir === 'next' ? usuarios[0]?.NOMUSU : ''

      if (cursor) {
        hasNextUsers = nextCursor === '' ? false : true
        hasPrevUsers = prevCursor === '' ? false : true
      } else {
        hasNextUsers = false
        hasPrevUsers = false
      }
    }

    if (dir === 'prev') {
      usuarios = usuarios.sort((a, b) => a.NOMUSU.localeCompare(b.NOMUSU))
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      curso: curso.data.data[0],
      usuarios,
      hasPrevUsers,
      hasNextUsers,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      estadosUsuario,
    }

    res.render('admin/cursos/usuarios', { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const usuariosAddPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 100
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevUsers = cursor ? true : false
  let context = {}

  if (cursor) {
    context = {
      idcurs: req.params.idcurs,
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      idcurs: req.params.idcurs,
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: '',
        prev: '',
      },
      part,
    }
  }

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context: {
        IDCURS: req.params.idcurs,
      },
    })
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/usuarios/pendientes`, {
      context,
    })

    let usuarios = result.data.data
    let hasNextUsers = usuarios.length === limit + 1
    let nextCursor = ''
    let prevCursor = ''
    let alerts = undefined

    if (hasNextUsers) {
      alerts = [{ msg: 'Se supera el límite de registros permitidos. Sólo se muestran 99 registros. Refine la consulta' }]
      nextCursor = dir === 'next' ? usuarios[limit - 1].NOMUSU : usuarios[0].NOMUSU
      prevCursor = dir === 'next' ? usuarios[0].NOMUSU : usuarios[limit - 1].NOMUSU

      hasNextUsers = false
      hasPrevUsers = false

      usuarios.pop()
    } else {
      nextCursor = dir === 'next' ? '' : usuarios[0]?.NOMUSU
      prevCursor = dir === 'next' ? usuarios[0]?.NOMUSU : ''

      if (cursor) {
        hasNextUsers = nextCursor === '' ? false : true
        hasPrevUsers = prevCursor === '' ? false : true
      } else {
        hasNextUsers = false
        hasPrevUsers = false
      }
    }

    if (dir === 'prev') {
      usuarios = usuarios.sort((a, b) => a.NOMUSU.localeCompare(b.NOMUSU))
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      curso: curso.data.data[0],
      usuarios,
      hasPrevUsers,
      hasNextUsers,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }

    res.render('admin/cursos/usuarios/add', { user, alerts, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// pages usuarios turno
export const usuariosTurnoPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''
  const curso = {
    IDCURS: req.params.idcurs
  }

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevUsers = cursor ? true : false
  let context = {}

  if (cursor) {
    context = {
      idturn: req.params.idturn,
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      idturn: req.params.idturn,
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: '',
        prev: '',
      },
      part,
    }
  }

  try {
    // const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
    //   context: {
    //     IDCURS: req.params.idcurs,
    //   },
    // })
    const turno = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turno`, {
      context: {
        IDTURN: req.params.idturn,
      },
    })
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/usuarios`, {
      context,
    })

    let usuarios = result.data.data
    let hasNextUsers = usuarios.length === limit + 1
    let nextCursor = ''
    let prevCursor = ''

    if (hasNextUsers) {
      nextCursor = dir === 'next' ? usuarios[limit - 1].NOMUSU : usuarios[0].NOMUSU
      prevCursor = dir === 'next' ? usuarios[0].NOMUSU : usuarios[limit - 1].NOMUSU

      usuarios.pop()
    } else {
      nextCursor = dir === 'next' ? '' : usuarios[0]?.NOMUSU
      prevCursor = dir === 'next' ? usuarios[0]?.NOMUSU : ''

      if (cursor) {
        hasNextUsers = nextCursor === '' ? false : true
        hasPrevUsers = prevCursor === '' ? false : true
      } else {
        hasNextUsers = false
        hasPrevUsers = false
      }
    }

    if (dir === 'prev') {
      usuarios = usuarios.sort((a, b) => a.NOMUSU.localeCompare(b.NOMUSU))
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      curso,
      turno: turno.data.data[0],
      usuarios,
      hasPrevUsers,
      hasNextUsers,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }

    res.render('admin/cursos/turnos/usuarios', { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const usuariosTurnoAddPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 100
  const part = req.query.part ? req.query.part.toUpperCase() : ''
  const curso = {
    IDCURS: req.params.idcurs
  }

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevUsers = cursor ? true : false
  let context = {}

  if (cursor) {
    context = {
      idcurs: req.params.idcurs,
      idturn: req.params.idturn,
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      idcurs: req.params.idcurs,
      idturn: req.params.idturn,
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: '',
        prev: '',
      },
      part,
    }
  }

  try {
    const turno = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turno`, {
      context: {
        IDTURN: req.params.idturn,
      },
    })
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/usuarios/pendientes`, {
      context,
    })

    let usuarios = result.data.data
    let hasNextUsers = usuarios.length === limit + 1
    let nextCursor = ''
    let prevCursor = ''
    let alerts = undefined

    if (hasNextUsers) {
      alerts = [{ msg: 'Se supera el límite de registros permitidos. Sólo se muestran 99 registros. Refine la consulta' }]
      nextCursor = dir === 'next' ? usuarios[limit - 1].NOMUSU : usuarios[0].NOMUSU
      prevCursor = dir === 'next' ? usuarios[0].NOMUSU : usuarios[limit - 1].NOMUSU

      hasNextUsers = false
      hasPrevUsers = false

      usuarios.pop()
    } else {
      nextCursor = dir === 'next' ? '' : usuarios[0]?.NOMUSU
      prevCursor = dir === 'next' ? usuarios[0]?.NOMUSU : ''

      if (cursor) {
        hasNextUsers = nextCursor === '' ? false : true
        hasPrevUsers = prevCursor === '' ? false : true
      } else {
        hasNextUsers = false
        hasPrevUsers = false
      }
    }

    if (dir === 'prev') {
      //usuarios = usuarios.sort((a, b) => a.NOMUSU > b.NOMUSU ? 1 : -1)
      usuarios = usuarios.sort((a, b) => a.NOMUSU.localeCompare(b.NOMUSU))      
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      curso,
      turno: turno.data.data[0],
      usuarios,
      hasPrevUsers,
      hasNextUsers,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }

    res.render('admin/cursos/turnos/usuarios/add', { user, alerts, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// pages usuarios matricula
export const usuariosMatriculaPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''
  const curso = {
    IDCURS: req.params.idcurs
  }

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevUsers = cursor ? true:false
  let context = {}

  if (cursor) {
    context = {
      idmatr: req.params.idmatr,
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      idmatr: req.params.idmatr,
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: '',
        prev: '',
      },
      part,
    }
  }

  try {
    // const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
    //   context: {
    //     IDCURS: req.params.idcurs,
    //   },
    // })
    const matricula = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matricula`, {
      context: {
        IDMATR: req.params.idmatr,
      },
    })
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/usuarios`, {
      context,
    })

    let usuarios = result.data.data
    let hasNextUsers = usuarios.length === limit +1
    let nextCursor = ''
    let prevCursor = ''
    
    if (hasNextUsers) {
      nextCursor = dir === 'next' ? usuarios[limit - 1].NOMUSU : usuarios[0].NOMUSU
      prevCursor = dir === 'next' ? usuarios[0].NOMUSU : usuarios[limit - 1].NOMUSU
      
      usuarios.pop()
    } else {
      nextCursor = dir === 'next' ? '' : usuarios[0]?.NOMUSU
      prevCursor = dir === 'next' ? usuarios[0]?.NOMUSU : ''
      
      if (cursor) {
        hasNextUsers = nextCursor === '' ? false : true
        hasPrevUsers = prevCursor === '' ? false : true
      } else {
        hasNextUsers = false
        hasPrevUsers = false
      }
    }

    if (dir === 'prev') {
      usuarios = usuarios.sort((a, b) => a.NOMUSU.localeCompare(b.NOMUSU))
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      curso,
      matricula: matricula.data.data[0],
      usuarios,
      hasPrevUsers,
      hasNextUsers,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }

    res.render('admin/cursos/matriculas/usuarios', { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// proc cursos
export const insert = async (req, res) => {
  const user = req.user
  const curso = {
    DESCUR: req.body.descur.toUpperCase(),
    DURCUR: req.body.durcur,
    PONCUR: req.body.poncur,
    NOTCUR: req.body.notcur,
    STACUR: req.body.stacur,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearCurso,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/insert`, {
      curso,
      movimiento,
    })

    res.redirect('/admin/cursos')
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const update = async (req, res) => {
  const user = req.user
  const curso = {
    IDCURS: req.body.idcurs,
    DESCUR: req.body.descur.toUpperCase(),
    DURCUR: req.body.durcur,
    PONCUR: req.body.poncur,
    NOTCUR: req.body.notcur,
    STACUR: req.body.stacur,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarCurso,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/update`, {
      curso,
      movimiento,
    })

    res.redirect('/admin/cursos')
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarCurso,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/delete`, {
      curso,
      movimiento,
    })

    res.redirect('/admin/cursos')
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// proc turnos
export const insertTurno = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const turno = {
    DESTUR: req.body.destur.toUpperCase(),
    INITUR: req.body.initur,
    FINTUR: req.body.fintur,
    INIHOR: '+00 ' + req.body.inihor + ':00',
    FINHOR: '+00 ' + req.body.finhor + ':00',
    LOCTUR: req.body.loctur.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearTurno,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/insert`, {
      curso,
      turno,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/${curso.IDCURS}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const updateTurno = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const turno = {
    IDTURN: req.body.idturn,
    DESTUR: req.body.destur.toUpperCase(),
    INITUR: req.body.initur,
    FINTUR: req.body.fintur,
    INIHOR: '+00 ' + req.body.inihor + ':00',
    FINHOR: '+00 ' + req.body.finhor + ':00',
    LOCTUR: req.body.loctur.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarTurno,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/update`, {
      turno,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/${curso.IDCURS}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const deleteTurno = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const turno = {
    IDTURN: req.body.idturn,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarTurno,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/delete`, {
      curso,
      turno,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/${curso.IDCURS}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// proc matricula
export const insertMatricula = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const matricula = {
    DESMAT: req.body.desmat.toUpperCase(),
    INIMAT: req.body.inimat,
    FINMAT: req.body.finmat,
    NOTMAT: req.body.notmat,
    STAMAT: req.body.stamat,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearMatricula,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/insert`, {
      curso,
      matricula,
      movimiento,
    });

    res.redirect(`/admin/cursos/matriculas/${curso.IDCURS}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const updateMatricula = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs
  }
  const matricula = {
    IDMATR: req.body.idmatr,
    DESMAT: req.body.desmat.toUpperCase(),
    INIMAT: req.body.inimat,
    FINMAT: req.body.finmat,
    NOTMAT: req.body.notmat,
    STAMAT: req.body.stamat,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarMatricula,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/update`, {
      matricula,
      movimiento,
    });

    res.redirect(`/admin/cursos/matriculas/${curso.IDCURS}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const deleteMatricula = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const matricula = {
    IDMATR: req.body.idmatr,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarMatricula,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/delete`, {
      curso,
      matricula,
      movimiento,
    });

    res.redirect(`/admin/cursos/matriculas/${curso.IDCURS}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// proc usuarios certificados curso
export const insertUsuario = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const usuarios = {
    ARRUSU: JSON.parse(req.body.arrusu)
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearUsuarioCurso,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/usuarios/insert`, {
      curso,
      usuarios,
      movimiento,
    });

    res.redirect(`/admin/cursos/usuarios/${curso.IDCURS}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const deleteUsuario = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const usuario = {
    IDUSUA: req.body.idusua,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarUsuarioCurso,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/usuarios/delete`, {
      curso,
      usuario,
      movimiento,
    });

    res.redirect(`/admin/cursos/usuarios/${curso.IDCURS}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// proc usuarios turno
export const insertUsuarioTurno = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const turno = {
    IDTURN: req.body.idturn,
  }
  const tipo = {
    TIPEST: tiposEstado.formacion.ID,
  }
  const usuarios = {
    ARRUSU: JSON.parse(req.body.arrusu)
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.insertarUsuarioTurno,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/usuarios/insert`, {
      turno,
      tipo,
      usuarios,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/usuarios/${curso.IDCURS}/${turno.IDTURN}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const deleteUsuarioTurno = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const turno = {
    IDTURN: req.body.idturn,
  }
  const usuario = {
    IDUSUA: req.body.idusua,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarUsuarioTurno,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/usuarios/delete`, {
      turno,
      usuario,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/usuarios/${curso.IDCURS}/${turno.IDTURN}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// proc usuarios matricula
export const insertUsuarioMatricula = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const matricula = {
    IDMATR: req.body.idmatr,
  }
  const usuarios = {
    ARRUSU: JSON.parse(req.body.arrusu)
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.insertarUsuarioMatricula,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/usuarios/insert`, {
      matricula,
      usuarios,
      movimiento,
    });

    res.redirect(`/admin/cursos/matriculas/usuarios/${curso.IDCURS}/${matricula.IDMATR}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const deleteUsuarioMatricula = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const matricula = {
    IDMATR: req.body.idmatr,
  }
  const usuario = {
    IDUSUA: req.body.idusua,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarUsuarioMatricula,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/usuarios/delete`, {
      matricula,
      usuario,
      movimiento,
    });

    res.redirect(`/admin/cursos/matriculas/usuarios/${curso.IDCURS}/${matricula.IDMATR}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// helpers
const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO);
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000;
  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10);
}
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}
