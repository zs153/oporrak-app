import axios from 'axios'
import { serverAPI, puertoAPI } from "../config/settings";
import { tiposRol, arrEstadosMatricula, tiposMovimiento } from '../public/js/enumeraciones'

// page matriculas
export const mainPage = async (req, res) => {
  const user = req.user
  const matricula = {}

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas`, {
      matricula,
    })
    const datos = {
      matriculas: result.data,
      estados: arrEstadosMatricula,
    }

    res.render('admin/matriculas', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addPage = async (req, res) => {
  const user = req.user
  const fecha = new Date().toISOString().slice(0, 10)
  const matricula = {
    INIMAT: fecha,
    FINMAT: fecha,
  }
  const curso = {}
  
  try {
    const cursos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos`, {
      curso,
    })
    const datos = {
      matricula,
      cursos: cursos.data,
      arrEstadosMatricula,
    }

    res.render('admin/matriculas/add', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const matricula = {
    IDMATR: req.params.id,
  }
  const curso = {}

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/matricula`, {
      matricula,
    })
    const cursos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos`, {
      curso,
    })

    const datos = {
      matricula: result.data,
      cursos: cursos.data,
      arrEstadosMatricula,
    }

    res.render('admin/matriculas/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// pages usuarios
export const usuariosPage = async (req, res) => {
  const user = req.user;
  const matricula = {
    IDMATR: req.params.id,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/matricula`, {
      matricula,
    });
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas/usuarios`, {
      matricula,
    });
    const datos = {
      matricula: result.data,
      usuarios: usuarios.data,
      tiposRol,
    };

    res.render("admin/matriculas/usuarios", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los usuarios de la matrícula seleccionada.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const usuariosAddPage = async (req, res) => {
  const user = req.user;
  const matricula = {
    IDMATR: req.params.id,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/matricula`, {
      matricula,
    });
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas/usuarios/pendientes`, {
      matricula,
    });
    const datos = {
      matricula: result.data,
      usuarios: usuarios.data,
    };

    res.render("admin/matriculas/usuarios/add", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los usuarios de la matrícula seleccionado.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}

// proc matriculas
export const insert = async (req, res) => {
  const user = req.user
  const matricula = {
    DESMAT: req.body.desmat.toUpperCase(),
    INIMAT: req.body.inimat,
    FINMAT: req.body.finmat,
    IDCURS: req.body.idcurs,
    STAMAT: req.body.stamat,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearMatricula,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas/insert`, {
      matricula,
      movimiento,
    })

    res.redirect('/admin/matriculas')
  } catch (error) {
    let msg = 'No se ha podido crear la matrícula.'

    if (error.response.data.errorNum === 20100) {
      msg = 'La matrícula ya existe.'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const update = async (req, res) => {
  const user = req.user
  const matricula = {
    IDMATR: req.body.idmatr,
    DESMAT: req.body.desmat.toUpperCase(),
    INIMAT: req.body.inimat,
    FINMAT: req.body.finmat,
    IDCURS: req.body.idcurs,
    STAMAT: req.body.stamat,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarMatricula,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas/update`, {
      matricula,
      movimiento,
    })

    res.redirect('/admin/matriculas')
  } catch (error) {
    let msg =
      'No se han podido modificar los datos de la matrícula. Verifique los datos introducidos'

    if (error.response.data.errorNum === 20100) {
      msg = 'La matrícula ya existe'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const matricula = {
    IDMATR: req.body.idmatr,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarMatricula,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas/delete`, {
      matricula,
      movimiento,
    })

    res.redirect('/admin/matriculas')
  } catch (error) {
    const msg = 'No se ha podido elminar la matrícula.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// proc usuarios
export const insertUsuario = async (req, res) => {
  const user = req.user;
  const matricula = {
    IDMATR: req.body.idmatr,
  }
  const usuarios = {
    //ARRUSU: req.body.arrusu.split(',').map(itm => +itm)
    ARRUSU: JSON.parse(req.body.arrusu)
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearUsuarioMatricula,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas/usuarios/insert`, {
      matricula,
      usuarios,
      movimiento,
    });

    res.redirect(`/admin/matriculas/usuarios/${matricula.IDMATR}`);
  } catch (error) {
    const msg = "No se ha podido insertar el usuario.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const deleteUsuario = async (req, res) => {
  const user = req.user;
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
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas/usuarios/delete`, {
      matricula,
      usuario,
      movimiento,
    });

    res.redirect(`/admin/matriculas/usuarios/${matricula.IDMATR}`);
  } catch (error) {
    const msg = "No se ha podido borrar el usuario.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
