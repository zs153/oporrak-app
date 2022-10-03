import axios from 'axios'
import { arrEstadosMatricula, estadosMatricula, tiposMovimiento } from '../public/js/enumeraciones'

// page matriculas
export const mainPage = async (req, res) => {
  const user = req.user

  try {
    const result = await axios.post('http://localhost:8100/api/matriculas')
    const datos = {
      estados:JSON.stringify(arrEstadosMatricula),
      matriculas: JSON.stringify(result.data),
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
  const fecha = new Date();
  const matricula = {
    inimat: fecha.toISOString().slice(0, 10),
    finmat: fecha.toISOString().slice(0, 10),
    stamat: estadosMatricula.cerrada,
  }
  const datos = {
    arrEstadosMatricula,
    matricula,
  }

  try {
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
    idmatr: req.params.id,
  }

  try {
    const result = await axios.post('http://localhost:8100/api/matricula', {      
      matricula,
    })

    const datos = {
      arrEstadosMatricula,
      matricula: result.data,
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
    idmatr: req.params.id,
  };

  try {
    const result = await axios.post("http://localhost:8100/api/matricula", {
      matricula,
    });
    const usuarios = await axios.post("http://localhost:8100/api/matriculas/usuarios", {
      matricula,
    });
    const datos = {
      matricula: result.data,
      usuarios: JSON.stringify(usuarios.data),
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
    idmatr: req.params.id,
  };

  try {
    const result = await axios.post("http://localhost:8100/api/matricula", {
      matricula,
    });    
    const usuarios = await axios.post("http://localhost:8100/api/matriculas/usuarios/pendientes", {
      matricula,
    });
    const datos = {
      matricula: result.data,
      usuarios: JSON.stringify(usuarios.data),
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
    desmat: req.body.desmat.toUpperCase(),
    inimat: req.body.inimat,
    finmat: req.body.finmat,
    idcurs: req.body.idcurs,
    stamat: req.body.stamat,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearMatricula,
  }

  try {
    await axios.post('http://localhost:8100/api/matriculas/insert', {
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
    idmatr: req.body.idmatr,
    desmat: req.body.desmat.toUpperCase(),
    inimat: req.body.inimat,
    finmat: req.body.finmat,
    idcurs: req.body.idcurs,
    stamat: req.body.stamat,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarMatricula,
  }
console.log(matricula)
  try {
    await axios.post('http://localhost:8100/api/matriculas/update', {
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
    idmatr: req.body.idmatr,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarMatricula,
  }

  try {
    await axios.post('http://localhost:8100/api/matriculas/delete', {
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
    idmatr: req.body.idmatr,
  }
  const usuarios = {
    arrusu: req.body.arrusu.split(',').map(itm => +itm)
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearUsuarioMatricula,
  }

  try {
    await axios.post("http://localhost:8100/api/matriculas/usuarios/insert", {
      matricula,
      usuarios,
      movimiento,
    });

    res.redirect(`/admin/matriculas/usuarios/${matricula.idmatr}`);
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
    idmatr: req.body.idmatr,
  }
  const usuario = {
    idusua: req.body.idusua,
  };
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarUsuarioMatricula,
  };

  try {
    await axios.post("http://localhost:8100/api/matriculas/usuarios/delete", {
      matricula,
      usuario,
      movimiento,
    });

    res.redirect(`/admin/matriculas/usuarios/${matricula.idmatr}`);
  } catch (error) {
    const msg = "No se ha podido borrar el usuario.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
