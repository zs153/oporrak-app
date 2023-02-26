import axios from 'axios'
import { serverAPI, puertoAPI } from '../config/settings'
import { arrEstadosCurso, arrEstadosMatricula, tiposMovimiento, tiposEstado } from '../public/js/enumeraciones'

// page cursos
export const mainPage = async (req, res) => {
  const user = req.user
  const curso = {}

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos`, {
      curso
    })
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
  const datos = {
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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      curso,
    });
    const turnos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos`, {
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
  const fecha = new Date().toISOString().slice(0, 10);
  const curso = {
    IDCURS: req.params.id,
  };
  const turno = {
    INITUR: fecha,
    FINTUR: fecha,
    INIHOR: '08:00',
    FINHOR: '14:00',
  }

  try {
    const retCurso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      curso,
    });
    const datos = {
      curso: retCurso.data,
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
    const retCurso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      curso,
    });
    const retTurno = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turno`, {
      turno,
    });

    const datos = {
      curso: retCurso.data,
      turno: retTurno.data,
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

// pages matriculas
export const matriculasPage = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.params.id,
  };

  try {
    const retCurso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      curso,
    });
    const retMatriculas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas`, {
      curso,
    });
    const datos = {
      curso: retCurso.data,
      matriculas: retMatriculas.data,
      arrEstadosMatricula,
    };

    res.render("admin/cursos/matriculas", { user, datos });
  } catch (error) {
    const msg = "No se han podido cargar los datos.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const addMatriculaPage = async (req, res) => {
  const user = req.user;
  const fecha = new Date().toISOString().slice(0, 10);
  const curso = {
    IDCURS: req.params.id,
  };
  const matricula = {
    STRINI: fecha,
    STRFIN: fecha,
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      curso,
    });
    const datos = {
      curso: result.data,
      matricula,
      arrEstadosMatricula,
    };

    res.render("admin/cursos/matriculas/add", { user, datos });
  } catch (error) {
    const msg = "No se han podido cargar los datos.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const editMatriculaPage = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.params.idcurs,
  };
  const matricula = {
    IDMATR: req.params.idmatr,
  };

  try {
    const retCurso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      curso,
    });
    const retMatricula = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matricula`, {
      matricula,
    });

    const datos = {
      curso: retCurso.data,
      matricula: retMatricula.data,
      arrEstadosMatricula,
    };

    res.render("admin/cursos/matriculas/edit", { user, datos });
  } catch (error) {
    const msg = "No se han podido cargar los datos.";

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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      curso,
    });
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/usuarios`, {
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
    IDCURS: req.params.idcurs,
  }
  const turno = {
    IDTURN: req.params.idturn,
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      curso,
    })
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/usuarios/pendientes`, {
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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turno`, {
      turno,
    })
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/usuarios`, {
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
    const retTurno = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turno`, {
      turno,
    })
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/usuarios/pendientes`, {
      curso,
    });
    const datos = {
      curso,
      turno: retTurno.data,
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

// pages usuarios matricula
export const usuariosMatriculaPage = async (req, res) => {
  const user = req.user
  const curso = {
    IDCURS: req.params.idcurs,
  }
  const matricula = {
    IDMATR: req.params.idmatr,
  }

  try {
    const retMatricula = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matricula`, {
      matricula,
    })
    const retUsuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/usuarios`, {
      matricula,
    })
    const datos = {
      curso,
      matricula: retMatricula.data,
      usuarios: retUsuarios.data,
    }

    res.render('admin/cursos/matriculas/usuarios', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const usuariosMatriculaAddPage = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.params.idcurs,
  }
  const matricula = {
    IDMATR: req.params.idmatr,
  }
  const usuario = {}

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matricula`, {
      matricula,
    })
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      usuario,
    });
    const datos = {
      curso,
      matricula: result.data,
      usuarios: usuarios.data,
    };

    res.render("admin/cursos/matriculas/usuarios/add", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

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
    DURCUR: req.body.durcur,
    PONCUR: req.body.poncur,
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
    DURCUR: req.body.durcur,
    PONCUR: req.body.poncur,
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
    let msg = 'No se han podido guardar los datos.'

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
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/delete`, {
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
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/insert`, {
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
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/update`, {
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
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/delete`, {
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
    const msg = "No se han podido guardar los datos.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    const msg = "No se ha podido actualizar los datos.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    const msg = "No se ha podido borrar el turno.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/usuarios/delete`, {
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
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/usuarios/delete`, {
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
    const msg = "No se ha podido insertar los datos.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    TIPMOV: tiposMovimiento.borrarUsuarioTurno,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/usuarios/delete`, {
      matricula,
      usuario,
      movimiento,
    });

    res.redirect(`/admin/cursos/matriculas/usuarios/${curso.IDCURS}/${matricula.IDMATR}`);
  } catch (error) {
    const msg = "No se ha podido borrar el usuario.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
