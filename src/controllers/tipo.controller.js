import axios from "axios";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.get("http://localhost:8000/api/tipos");

    const datos = { tipos: result.data.dat };
    res.render("admin/tipos", { user, datos });
  } catch (error) {
    res.redirect("/");
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const tipo = {
    id: 0,
    descripcion: "",
    texto: "",
  };

  try {
    const datos = {
      tipo,
    };

    res.render("admin/tipos/add", { user, datos });
  } catch (error) {
    res.redirect("/admin/tipos");
  }
};
export const editPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post("http://localhost:8000/api/tipo", {
      id: req.params.id,
    });

    const tipo = {
      id: result.data.idtipo,
      descripcion: result.data.destip,
      texto: result.data.ayutip,
    };

    const datos = {
      tipo,
    };

    res.render("admin/tipos/edit", { user, datos });
  } catch (error) {
    res.redirect("/admin/tipos");
  }
};
export const insertTipo = async (req, res) => {
  const user = req.user;
  const tipo = {
    descripcion: req.body.destip.toUpperCase(),
    texto: req.body.ayutip,
    usuarioMov: user.id,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/tipos/insert", {
      user,
      tipo,
    });

    res.redirect("/admin/tipos");
  } catch (error) {
    let msg = "No se ha podido crear el tipo. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg = "El tipo ya existe.";
    }
    try {
      const datos = {
        tipo,
      };

      res.render("admin/tipos/add", { user, datos, alerts: [{ msg }] });
    } catch (error) {
      res.redirect("/admin/tipos");
    }
  }
};
export const updateTipo = async (req, res) => {
  const user = req.user;
  const tipo = {
    id: req.body.idtipo,
    descripcion: req.body.destip.toUpperCase(),
    texto: req.body.ayutip,
    usuarioMov: user.id,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/tipos/update", {
      tipo,
    });

    res.redirect("/admin/tipos");
  } catch (error) {
    let msg =
      "No se ha podido actualizar el tipo. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg = "El tipo ya existe";
    }
    try {
      const datos = {
        tipo,
      };

      res.render("admin/tipos/edit", { user, datos, alerts: [{ msg }] });
    } catch (error) {
      res.redirect("/admin/tipos");
    }
  }
};
export const deleteTipo = async (req, res) => {
  const user = req.user;
  const tipo = {
    id: req.body.idtipo,
    usuarioMov: user.id,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/tipos/delete", {
      tipo,
    });

    res.redirect("/admin/tipos");
  } catch (error) {
    res.redirect("/admin/tipos");
  }
};
