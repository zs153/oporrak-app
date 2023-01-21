import axios from 'axios'
import { serverAPI } from "../config/settings";
import { estadosMatricula, tiposMovimiento } from '../public/js/enumeraciones'

export const matriculasPage = async (req, res) => {
  const user = req.user
  const matricula = {
    IDUSUA: user.id,
    STAMAT: estadosMatricula.abierta,
  }

  try {
    const retMatriculas = await axios.post(`http://${serverAPI}:8200/api/formacion/matriculas`, {
      matricula
    })
    const datos = {
      matriculas: retMatriculas.data,
    }

    res.render('admin/formacion/matriculas', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const cursosPage = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: req.user.id
  }

  try {
    const result = await axios.post(`http://${serverAPI}:8200/api/formacion/cursos`, {
      usuario,
    })

    const datos = {
      cursos: result.data,
    }

    res.render('admin/formacion/cursos', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const insertUsuarioMatricula = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const matricula = {
    IDMATR: req.body.idmatr,
  }

  const usuarios = {
    ARRUSU: [parseInt(req.body.idusua)]
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.insertarUsuarioMatricula,
  }

  try {
    await axios.post(`http://${serverAPI}:8200/api/cursos/matriculas/usuarios/insert`, {
      matricula,
      usuarios,
      movimiento,
    });

    res.redirect(`/admin/formacion/matriculas`);
  } catch (error) {
    const msg = "No se ha podido insertar los datos.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}