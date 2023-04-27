import axios from 'axios'
import { serverAPI, puertoAPI } from '../../config/settings'
import { arrEstadosCurso, arrEstadosMatricula, tiposMovimiento, tiposEstado } from '../../public/js/enumeraciones'

// page cursos
export const mainPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let hasPrevCursos = false
  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let context = {}

  if (cursor) {
    hasPrevCursos = true
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
    let hasNextCursos = cursos.length === limit +1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextCursos) {
      const nextCursorCursos = dir === 'next' ? cursos[limit - 1] : cursos[0]
      const prevCursorCursos = dir === 'next' ? cursos[0] : cursos[limit - 1]
      nextCursor = nextCursorCursos.IDCURS
      prevCursor = prevCursorCursos.IDCURS

      cursos.pop()
    } else {
      if (dir === 'prev') {
        context = {
          limit: limit + 1,
          direction: 'next',
          cursor: {
            next: 0,
            prev: 0
          },
          part,
        }
        
        const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos`, {
          context,
        })
        
        cursos = result.data.data
        hasNextCursos = cursos.length === limit + 1
        
        if (hasNextCursos) {
          const nextCursorCursos = cursos[limit - 1]
          const prevCursorCursos = cursos[0]
          nextCursor = nextCursorCursos.IDCURS
          prevCursor = prevCursorCursos.IDCURS
          
          cursos.pop()
        }
        
        hasPrevCursos = false
      } else {
        if (cursor) {
          const prevCursorCursos = cursos[0]
          prevCursor = prevCursorCursos.IDCURS
          hasPrevCursos = true
        } else {
          hasPrevCursos = false
        }
        
        hasNextCursos = false
      }
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      limit,
      cursos,
      hasPrevCursos,
      hasNextCursos,
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
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context: {
        IDCURS: req.params.id,
      },
    })
    const datos = {
      curso: curso.data.data,
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
  const user = req.user;

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context: {
        IDCURS: req.params.id,
      },
    });
    const turnos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos`, {
      context: {
        IDCURS: req.params.id,
      },
    });
    const datos = {
      curso: curso.data.data,
      turnos: turnos.data.data,
    };

    res.render("admin/cursos/turnos", { user, datos });
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
      curso: curso.data.data,
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

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context: {
        IDCURS: req.params.idcurs,
      },
    });
    const turno = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turno`, {
      context: {
        IDCURS: req.params.idcurs,
      },
    });

    turno.data.data.INITUR = dateISOToUTCString(turno.data.data.INITUR)
    turno.data.data.FINTUR = dateISOToUTCString(turno.data.data.FINTUR)

    const datos = {
      curso: curso.data.data,
      turno: turno.data.data,
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
  const user = req.user;

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context: {
        IDCURS: req.params.id,
      },
    });
    const matriculas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matricula`, {
      context: {
        IDCURS: req.params.id,
      },
    });
    const datos = {
      curso: curso.data.data,
      matriculas: matriculas.data.data,
      arrEstadosMatricula,
    };

    res.render("admin/cursos/matriculas", { user, datos });
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
      curso: curso.data.data,
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

  try {
    const retCurso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context: {
        IDCURS: req.params.idcurs,
      },
    });
    const retMatricula = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matricula`, {
      context: {
        IDMATR: req.params.idmatr,
      },
    });

    const datos = {
      curso: retCurso.data.data,
      matricula: retMatricula.data.data,
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

// pages usuarios curso
export const usuariosPage = async (req, res) => {
  const user = req.user;

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context: {
        IDCURS: req.params.id,
      },
    });
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/usuarios`, {
      context: {
        IDCURS: req.params.id,
      },
    });
    const datos = {
      curso: curso.data.data,
      usuarios: usuarios.data.data,
    };

    res.render("admin/cursos/usuarios", { user, datos });
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
  const user = req.user;

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context: {
        IDCURS: req.params.idcurs,
      },
    })
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/usuarios/pendientes`, {
      context: {
        IDCURS: req.params.idcurs,
      },
    });
    const datos = {
      curso: curso.data.data,
      usuarios: usuarios.data.data,
    };

    res.render("admin/cursos/usuarios/add", { user, datos });
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
  const curso = {
    IDCURS: req.params.idcurs,
  }

  try {
    const turno = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turno`, {
      context: {
        IDTURN: req.params.idturn,
      },
    })
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/usuarios`, {
      context: {
        IDTURN: req.params.idturn,
      },
    })
    const datos = {
      curso,
      turno: turno.data.data,
      usuarios: usuarios.data.data,
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
  const user = req.user;
  const curso = {
    IDCURS: req.params.idcurs,
  }

  try {
    const turno = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turno`, {
      context: {
        IDTURN: req.params.idturn,
      },
    })
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/usuarios/pendientes`, {
      context: {
        IDCURS: req.params.idcurs,
      },
    });
    const datos = {
      curso,
      turno: turno.data.data,
      usuarios: usuarios.data.data,
    };

    res.render("admin/cursos/turnos/usuarios/add", { user, datos });
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
  const curso = {
    IDCURS: req.params.idcurs,
  }

  try {
    const matricula = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matricula`, {
      context: {
        IDMATR: req.params.idmatr,
      },
    })
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/usuarios`, {
      context: {
        IDMATR: req.params.idmatr,
      },
    })
    const datos = {
      curso,
      matricula: matricula.data.data,
      usuarios: usuarios.data.data,
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
export const usuariosMatriculaAddPage = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.params.idcurs,
  }

  try {
    const matricula = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matricula`, {
      context: {
        IDMATR: req.params.idmatr,
      },
    })
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context: {},
    });
    const datos = {
      curso,
      matricula: matricula.data.data,
      usuarios: usuarios.data.data,
    };

    res.render("admin/cursos/matriculas/usuarios/add", { user, datos });
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

// proc usuarios curso
export const insertUsuario = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const usuarios = {
    //ARRUSU: req.body.arrusu.split(',').map(itm => +itm)
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
