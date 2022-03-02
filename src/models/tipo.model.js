import oracledb from "oracledb";
import Movimiento from "./movimiento.model";
import { connectionString, maxRows } from "../settings";

class Tipo {
  constructor(id, descripcion, texto) {
    this.idtipo = id;
    this.destip = descripcion;
    this.ayutip = texto;

    this.movi = new Movimiento();
  }

  get id() {
    return this.idtipo;
  }
  set id(value) {
    this.idtipo = value;
  }
  get descripcion() {
    return this.destip;
  }
  set descripcion(value) {
    this.destip = value;
  }
  get textoAyuda() {
    return this.ayutip;
  }
  set textoAyuda(value) {
    this.ayutip = value;
  }

  // movimiento
  get movimiento() {
    return this.movi;
  }
  set movimiento(value) {
    this.movi = value;
  }

  // procedimientos
  async getTipo() {
    let conn;
    let ret;

    try {
      const conn = await oracledb.getConnection(connectionString);
      const result = await conn.execute(
        "SELECT * FROM tipos WHERE idtipo = :p_idtipo",
        [this.id],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      );

      if (result) {
        this.id = result.rows[0].IDTIPO;
        this.descripcion = result.rows[0].DESTIP;
        this.textoAyuda = result.rows[0].AYUTIP;

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
  async getTipos() {
    let conn;
    let ret;

    try {
      const conn = await oracledb.getConnection(connectionString);
      const result = await conn.execute(
        "SELECT * FROM tipos ORDER BY destip",
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
        "BEGIN FORMULARIOS_PKG.INSERTTIPO(:p_destip, :p_ayutip, :p_usumov, :p_tipmov, :p_idtipo); END;",
        {
          // tipo
          p_destip: this.descripcion,
          p_ayutip: this.textoAyuda,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
          // retorno
          p_idtipo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
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
        "BEGIN FORMULARIOS_PKG.UPDATETIPO(:p_idtipo, :p_destip, :p_ayutip, :p_usumov, :p_tipmov); END;",
        {
          // tipo
          p_idtipo: this.id,
          p_destip: this.descripcion,
          p_ayutip: this.textoAyuda,
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
        "BEGIN FORMULARIOS_PKG.DELETETIPO(:p_idtipo, :p_usumov, :p_tipmov); END;",
        {
          // tipo
          p_idtipo: this.id,
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

export default Tipo;
