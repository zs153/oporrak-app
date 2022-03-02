import oracledb from "oracledb";
import Movimiento from "./movimiento.model";
import { connectionString } from "../settings";

class Oficina {
  constructor(id, descripcion, codigo) {
    this.idofic = id;
    this.desofi = descripcion;
    this.codofi = codigo;

    this.movi = new Movimiento();
  }

  get id() {
    return this.idofic;
  }
  set id(value) {
    this.idofic = value;
  }
  get descripcion() {
    return this.desofi;
  }
  set descripcion(value) {
    this.desofi = value;
  }
  get codigo() {
    return this.codofi;
  }
  set codigo(value) {
    this.codofi = value;
  }

  // movimiento
  get movimiento() {
    return this.movi;
  }
  set movimiento(value) {
    this.movi = value;
  }

  // procedimientos
  async getOficina() {
    let conn;
    let ret;

    try {
      const conn = await oracledb.getConnection(connectionString);
      const result = await conn.execute(
        "SELECT * FROM oficinas WHERE idofic = :p_idofic",
        [this.id],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      );

      if (result) {
        this.id = result.rows[0].IDOFIC;
        this.descripcion = result.rows[0].DESOFI;
        this.codigo = result.rows[0].CODOFI;

        ret = {
          err: undefined,
          dat: result.rows,
        };
      } else {
        ret = {
          err: 1,
          dat: "No hay registro",
        };
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      };
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          };
        }
      }
    }

    return ret;
  }
  async getOficinas() {
    let conn;
    let ret;

    try {
      const conn = await oracledb.getConnection(connectionString);
      const result = await conn.execute(
        "SELECT * FROM oficinas ORDER BY desofi",
        [],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      );

      ret = {
        err: undefined,
        dat: result.rows,
      };
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      };
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          };
        }
      }
    }

    return ret;
  }
  async insert() {
    let conn;
    let ret;

    try {
      const conn = await oracledb.getConnection(connectionString);
      const result = await conn.execute(
        "BEGIN FORMULARIOS_PKG.INSERTOFICINA(:p_desofi, :p_codofi, :p_usumov, :p_tipmov, :p_idofic); END;",
        {
          // Oficina
          p_desofi: this.descripcion,
          p_codofi: this.codigo,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
          // retorno
          p_idofic: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        }
      );

      ret = {
        err: undefined,
        dat: result.outBinds,
      };
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      };
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          };
        }
      }
    }

    return ret;
  }
  async update() {
    let conn;
    let ret;

    try {
      const conn = await oracledb.getConnection(connectionString);
      await conn.execute(
        "BEGIN FORMULARIOS_PKG.UPDATEOFICINA(:p_idofic, :p_desofi, :p_codofi, :p_usumov, :p_tipmov); END;",
        {
          // Oficina
          p_idofic: this.id,
          p_desofi: this.descripcion,
          p_codofi: this.codigo,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
        }
      );

      ret = {
        err: undefined,
        dat: this.id,
      };
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      };
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          };
        }
      }
    }

    return ret;
  }
  async delete() {
    let conn;
    let ret;

    try {
      conn = await oracledb.getConnection(connectionString);
      await conn.execute(
        "BEGIN FORMULARIOS_PKG.DELETEOFICINA(:p_idofic, :p_usumov, :p_tipmov); END;",
        {
          // Oficina
          p_idofic: this.id,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
        }
      );

      ret = {
        err: undefined,
        dat: this.id,
      };
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      };
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          };
        }
      }
    }

    return ret;
  }
}

export default Oficina;
