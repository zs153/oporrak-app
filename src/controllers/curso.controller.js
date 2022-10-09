import axios from 'axios'
import { arrEstadosCurso, estadosCurso, tiposMovimiento } from '../public/js/enumeraciones'

// page cursos
export const mainPage = async (req, res) => {
  const user = req.user

  try {
    const result = await axios.post('http://localhost:8100/api/cursos')
    const datos = {
      cursos: result.data,
      arrEstadosCurso: arrEstadosCurso,
    }

    res.render('admin/cursos', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addPage = async (req, res) => {
  const user = req.user
  const curso = {
    DESCUR: '',
    STACUR: estadosCurso.cerrado,
  }
  const datos = {
    curso,
    arrEstadosCurso,
  }

  try {
    res.render('admin/cursos/add', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const curso = {
    IDCURS: req.params.id,
  }

  try {
    const result = await axios.post('http://localhost:8100/api/curso', {
      curso,
    })
    const datos = {
      curso: result.data,
      arrEstadosCurso,
    }
    res.render('admin/cursos/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// pages turnos
export const turnosPage = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.params.id,
  };

  try {
    const result = await axios.post("http://localhost:8100/api/curso", {
      curso,
    });
    const turnos = await axios.post("http://localhost:8100/api/cursos/turnos", {
      curso,
    });
    const datos = {
      curso: result.data,
      turnos: turnos.data,
    };

    res.render("admin/cursos/turnos", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los turnos del curso seleccionado.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const addTurnoPage = async (req, res) => {
  const user = req.user;
  const fecha = new Date();
  const curso = {
    IDCURS: req.params.id,
  };
  const turno = {
    DESTUR: '',
    STRINI: fecha.toISOString().slice(0, 10),
    STRFIN: fecha.toISOString().slice(0, 10),
    INIHOR: '08:00',
    FINHOR: '14:00',
    LOCTUR: ''
  }

  try {
    const datos = {
      curso,
      turno,
    };

    res.render("admin/cursos/turnos/add", { user, datos });
  } catch (error) {
    const msg =
      "No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const editTurnoPage = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.params.idcurs,
  };
  const turno = {
    IDTURN: req.params.idturn,
  };

  try {
    const result = await axios.post("http://localhost:8100/api/cursos/turno", {
      turno,
    });

    const datos = {
      curso,
      turno: result.data,
    };

    res.render("admin/cursos/turnos/edit", { user, datos });
  } catch (error) {
    const msg =
      "No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}

// pages usuarios curso
export const usuariosPage = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.params.id,
  };

  try {
    const result = await axios.post("http://localhost:8100/api/curso", {
      curso,
    });
    const usuarios = await axios.post("http://localhost:8100/api/cursos/usuarios", {
      curso,
    });
    const datos = {
      curso: result.data,
      usuarios: usuarios.data,
    };

    res.render("admin/cursos/usuarios", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los turnos del curso seleccionado.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const usuariosAddPage = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.params.id,
  };

  try {
    const result = await axios.post("http://localhost:8100/api/curso", {
      curso,
    });
    const usuarios = await axios.post("http://localhost:8100/api/cursos/usuarios/pendientes", {
      curso,
    });
    const datos = {
      curso: result.data,
      usuarios: usuarios.data,
    };

    res.render("admin/cursos/usuarios/add", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los turnos del curso seleccionado.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}

// pages usuarios turno
export const usuariosTurnoPage = async (req, res) => {
  const user = req.user
  const curso = {
    IDCURS: req.params.idcurs,
  }
  const turno = {
    IDTURN: req.params.idturn,
  }

  try {
    const result = await axios.post('http://localhost:8100/api/cursos/turno', {
      turno,
    })
    const usuarios = await axios.post('http://localhost:8100/api/cursos/turnos/usuarios', {
      turno,
    })
    const datos = {
      curso,
      turno: result.data,
      usuarios: usuarios.data,
    }

    res.render('admin/cursos/turnos/usuarios', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const usuariosTurnoAddPage = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.params.idcurs,
  }
  const turno = {
    IDTURN: req.params.idturn,
  }

  try {
    const result = await axios.post('http://localhost:8100/api/cursos/turno', {
      turno,
    })
    const usuarios = await axios.post("http://localhost:8100/api/cursos/turnos/usuarios/pendientes", {
      curso,
    });
    const datos = {
      curso,
      turno: result.data,
      usuarios: usuarios.data,
    };

    res.render("admin/cursos/turnos/usuarios/add", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los turnos del curso seleccionado.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}

// proc cursos
export const insert = async (req, res) => {
  const user = req.user
  const curso = {
    DESCUR: req.body.descur.toUpperCase(),
    STACUR: estadosCurso.cerrado
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearCurso,
  }

  try {
    await axios.post('http://localhost:8100/api/cursos/insert', {
      curso,
      movimiento,
    })

    res.redirect('/admin/cursos')
  } catch (error) {
    let msg = 'No se ha podido crear el curso.'

    if (error.response.data.errorNum === 20100) {
      msg = 'El curso ya existe.'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const update = async (req, res) => {
  const user = req.user
  const curso = {
    IDCURS: req.body.idcurs,
    DESCUR: req.body.descur.toUpperCase(),
    STACUR: req.body.stacur,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarCurso,
  }

  try {
    await axios.post('http://localhost:8100/api/cursos/update', {
      curso,
      movimiento,
    })

    res.redirect('/admin/cursos')
  } catch (error) {
    let msg =
      'No se han podido modificar los datos del curso. Verifique los datos introducidos'

    if (error.response.data.errorNum === 20100) {
      msg = 'El curso ya existe'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
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
    await axios.post('http://localhost:8100/api/cursos/delete', {
      curso,
      movimiento,
    })

    res.redirect('/admin/cursos')
  } catch (error) {
    const msg = 'No se ha podido elminar el curso.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
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
    await axios.post("http://localhost:8100/api/cursos/turnos/insert", {
      curso,
      turno,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/${curso.IDCURS}`);
  } catch (error) {
    const msg = "No se ha podido inserte el turno.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post("http://localhost:8100/api/cursos/turnos/update", {
      curso,
      turno,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/${curso.IDCURS}`);
  } catch (error) {
    const msg = "No se ha podido actualizar el turno.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post("http://localhost:8100/api/cursos/turnos/delete", {
      curso,
      turno,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/${curso.IDCURS}`);
  } catch (error) {
    const msg = "No se ha podido borrar el turno.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}

// proc usuarios
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
    await axios.post("http://localhost:8100/api/cursos/usuarios/insert", {
      curso,
      usuarios,
      movimiento,
    });

    res.redirect(`/admin/cursos/usuarios/${curso.IDCURS}`);
  } catch (error) {
    const msg = "No se ha podido insertar el usuario.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post("http://localhost:8100/api/cursos/usuarios/delete", {
      curso,
      usuario,
      movimiento,
    });

    res.redirect(`/admin/cursos/usuarios/${curso.IDCURS}`);
  } catch (error) {
    const msg = "No se ha podido borrar el usuario.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
  const usuarios = {
    ARRUSU: JSON.parse(req.body.arrusu)
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.insertarUsuarioTurno,
  }

  try {
    await axios.post("http://localhost:8100/api/cursos/turnos/usuarios/insert", {
      curso,
      turno,
      usuarios,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/usuarios/${curso.IDCURS}/${turno.IDTURN}`);
  } catch (error) {
    const msg = "No se ha podido insertar los datos.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post("http://localhost:8100/api/cursos/turnos/usuarios/delete", {
      turno,
      usuario,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/usuarios/${curso.IDCURS}/${turno.IDTURN}`);
  } catch (error) {
    const msg = "No se ha podido borrar el usuario.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
