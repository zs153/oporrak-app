import axios from "axios";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.get("http://localhost:8000/api/oficinas");

    const datos = { oficinas: result.data.dat };
    res.render("admin/oficinas", { user, datos });
  } catch (error) {
    res.redirect("/");
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const oficina = {
    id: 0,
    descripcion: "",
    codigo: "",
  };

  try {
    const datos = {
      oficina,
    };

    res.render("admin/oficinas/add", { user, datos });
  } catch (error) {
    res.redirect("/admin/oficinas");
  }
};
export const editPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post("http://localhost:8000/api/oficina", {
      id: req.params.id,
    });

    const oficina = {
      id: result.data.idofic,
      descripcion: result.data.desofi,
      codigo: result.data.codofi,
    };

    const datos = {
      oficina,
    };

    res.render("admin/oficinas/edit", { user, datos });
  } catch (error) {
    res.redirect("/admin/oficinas");
  }
};
export const insertOficina = async (req, res) => {
  const user = req.user;
  const oficina = {
    descripcion: req.body.desofi.toUpperCase(),
    codigo: req.body.codofi,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/oficinas/insert",
      {
        user,
        oficina,
      }
    );

    res.redirect("/admin/oficinas");
  } catch (error) {
    let msg =
      "No se ha podido crear la oficina. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg = "La oficina ya existe. Verifique el código de oficina";
    }
    try {
      const datos = {
        oficina,
      };

      res.render("admin/oficinas/add", { user, datos, alerts: [{ msg }] });
    } catch (error) {
      res.redirect("/admin/oficinas");
    }
  }
};
export const updateOficina = async (req, res) => {
  const user = req.user;
  const oficina = {
    id: req.body.idofic,
    descripcion: req.body.desofi.toUpperCase(),
    codigo: req.body.codofi,
  };
  try {
    const result = await axios.post(
      "http://localhost:8000/api/oficinas/update",
      {
        user,
        oficina,
      }
    );

    res.redirect("/admin/oficinas");
  } catch (error) {
    let msg =
      "No se han podido modificar los datos de la oficina. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg = "La oficina ya existe";
    }

    try {
      const datos = {
        oficina,
      };

      res.render("admin/oficinas/edit", { user, datos, alerts: [{ msg }] });
    } catch (error) {
      res.redirect("/admin/oficinas");
    }
  }
};
export const deleteOficina = async (req, res) => {
  const user = req.user;
  const oficina = {
    id: req.body.idofic,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/oficinas/delete",
      {
        user,
        oficina,
      }
    );

    res.redirect("/admin/oficinas");
  } catch (error) {
    res.redirect("/admin/oficinas");
  }
};
