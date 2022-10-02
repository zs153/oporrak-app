import axios from 'axios'
import { tiposMovimiento } from '../public/js/enumeraciones'

// page turnos
export const mainPage = async (req, res) => {
  const user = req.user;
  const curso = {
    idcurs: req.params.id,
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
      turnos: JSON.stringify(turnos.data),
    };
    res.render("admin/cursos/turnos", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los turnos del curso seleccionado.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const addPage = async (req, res) => {
  const user = req.user;
  const fecha = new Date();
  const curso = {
    idcurs: req.params.id,
  };
  const turno = {
    destur: '',
    strini: fecha.toISOString().slice(0, 10),
    strfin: fecha.toISOString().slice(0, 10),
    inihor: '08:00',
    finhor: '14:00',
    loctur: ''
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
export const editPage = async (req, res) => {
  const user = req.user;
  const curso = {
    idcurs: req.params.idcurs,
  };
  const turno = {
    idturn: req.params.idturn,
  };

  try {
    const result = await axios.post("http://localhost:8100/api/turno", {
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

// pages usuarios
export const usuariosPage = async (req, res) => {
  const user = req.user
  const turno = {
    idturn: req.params.idturn
  }
  const turnocurso = {
    idcurs: req.params.idcurs,
    idturn: req.params.idturn,
  }

  try {
    const result = await axios.post('http://localhost:8100/api/turnocurso', {
      turnocurso,
    })
    const usuarios = await axios.post('http://localhost:8100/api/turnos/usuarios', {
      turno,
    })
    const datos = {
      turnocurso: result.data,
      usuarios: JSON.stringify(usuarios.data),
    }

    res.render('admin/cursos/turnos/usuarios', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const usuariosAddPage = async (req, res) => {
  const user = req.user;
  const curso = {
    idcurs: req.params.idcurs
  }
  const turno = {
    idturn: req.params.idturn
  }

  try {
    const result = await axios.post("http://localhost:8100/api/turno", {
      turno,
    });
    const usuarios = await axios.post("http://localhost:8100/api/turnos/usuarios/pendientes", {
      turno,
    });
    const datos = {
      curso,
      turno: result.data,
      usuarios: JSON.stringify(usuarios.data),
    };
    console.log(datos)

    res.render("admin/cursos/turnos/usuarios/add", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los turnos del curso seleccionado.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}

// proc turnos
export const insert = async (req, res) => {
  const user = req.user;
  const curso = {
    idcurs: req.body.idcurs,
  }
  const turno = {
    destur: req.body.destur.toUpperCase(),
    initur: req.body.initur,
    fintur: req.body.fintur,
    inihor: '+00 ' + req.body.inihor + ':00',
    finhor: '+00 ' + req.body.finhor + ':00',
    loctur: req.body.loctur.toUpperCase(),
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearTurno,
  }

  try {
    await axios.post("http://localhost:8100/api/cursos/turnos/insert", {
      curso,
      turno,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/${curso.idcurs}`);
  } catch (error) {
    const msg = "No se ha podido inserte el turno.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const update = async (req, res) => {
  const user = req.user;
  const curso = {
    idcurs: req.body.idcurs,
  }
  const turno = {
    idturn: req.body.idturn,
    destur: req.body.destur.toUpperCase(),
    initur: req.body.initur,
    fintur: req.body.fintur,
    inihor: '+00 ' + req.body.inihor + ':00',
    finhor: '+00 ' + req.body.finhor + ':00',
    loctur: req.body.loctur.toUpperCase(),
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarTurno,
  }

  try {
    await axios.post("http://localhost:8100/api/cursos/turnos/update", {
      curso,
      turno,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/${curso.idcurs}`);
  } catch (error) {
    const msg = "No se ha podido actualizar el turno.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const remove = async (req, res) => {
  const user = req.user;
  const curso = {
    idcurs: req.body.idcurs,
  }
  const turno = {
    idturn: req.body.idturn,
  };
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarTurno,
  };

  try {
    await axios.post("http://localhost:8100/api/cursos/turnos/delete", {
      curso,
      turno,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/${curso.idcurs}`);
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
    idcurs: req.body.idcurs,
  }
  const usuarios = {
    arrusu: req.body.arrusu.split(',').map(itm => +itm)
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearUsuarioCurso,
  }

  try {
    await axios.post("http://localhost:8100/api/cursos/usuarios/insert", {
      curso,
      usuarios,
      movimiento,
    });

    res.redirect(`/admin/cursos/usuarios/${curso.idcurs}`);
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
    idcurs: req.body.idcurs,
  }
  const usuario = {
    idusua: req.body.idusua,
  };
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarUsuarioCurso,
  };

  try {
    await axios.post("http://localhost:8100/api/cursos/usuarios/delete", {
      curso,
      usuario,
      movimiento,
    });

    res.redirect(`/admin/cursos/usuarios/${curso.idcurs}`);
  } catch (error) {
    const msg = "No se ha podido borrar el usuario.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
