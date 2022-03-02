import oracledb from 'oracledb'
import Movimiento from './movimiento.model'
import { connectionString, maxRows } from '../settings'

class Usuario {
  constructor(
    id,
    nombre,
    oficina,
    rol,
    userid,
    email,
    perfil,
    telefono,
    estado,
    password
  ) {
    this.idusua = id
    this.nomusu = nombre
    this.ofiusu = oficina
    this.rolusu = rol
    this.userid = userid
    this.emausu = email
    this.perusu = perfil
    this.telusu = telefono
    this.stausu = estado
    this.pasusu = password
    this.saltus = ''

    this.movi = new Movimiento()
  }

  get id() {
    return this.idusua
  }
  set id(value) {
    this.idusua = value
  }
  get nombre() {
    return this.nomusu
  }
  set nombre(value) {
    this.nomusu = value
  }
  get oficina() {
    return this.ofiusu
  }
  set oficina(value) {
    this.ofiusu = value
  }
  get rol() {
    return this.rolusu
  }
  set rol(value) {
    this.rolusu = value
  }
  get userID() {
    return this.userid
  }
  set userID(value) {
    this.userid = value
  }
  get email() {
    return this.emausu
  }
  set email(value) {
    this.emausu = value
  }
  get perfil() {
    return this.perusu
  }
  set perfil(value) {
    this.perusu = value
  }
  get telefono() {
    return this.telusu
  }
  set telefono(value) {
    this.telusu = value
  }
  get password() {
    return this.pasusu
  }
  set password(value) {
    this.pasusu = value
  }
  get estado() {
    return this.stausu
  }
  set estado(value) {
    this.stausu = value
  }
  get salt() {
    return this.saltus
  }
  set salt(value) {
    this.saltus = value
  }

  // movimiento
  get movimiento() {
    return this.movi
  }
  set movimiento(value) {
    this.movi = value
  }

  // procedimientos
  async getUsuario() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        'SELECT * FROM usuarios WHERE idusua = :p_idusua',
        [this.id],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      )

      if (result) {
        this.id = result.rows[0].IDUSUA
        this.nombre = result.rows[0].NOMUSU
        this.oficina = result.rows[0].OFIUSU
        this.rol = result.rows[0].ROLUSU
        this.userID = result.rows[0].USERID
        this.email = result.rows[0].EMAUSU
        this.perfil = result.rows[0].PERUSU
        this.telefono = result.rows[0].TELUSU
        this.estado = result.rows[0].STAUSU
        this.password = result.rows[0].PASUSU

        ret = {
          err: undefined,
          dat: result.rows,
        }
      } else {
        ret = {
          err: 1,
          dat: 'No hay registro',
        }
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async getUsuarioByUserID() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        'SELECT * FROM usuarios WHERE userid = :p_userid',
        [this.userID],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      )

      if (result) {
        this.id = result.rows[0].IDUSUA
        this.nombre = result.rows[0].NOMUSU
        this.oficina = result.rows[0].OFIUSU
        this.rol = result.rows[0].ROLUSU
        this.userID = result.rows[0].USERID
        this.email = result.rows[0].EMAUSU
        this.perfil = result.rows[0].PERUSU
        this.telefono = result.rows[0].TELUSU
        this.estado = result.rows[0].STAUSU
        this.password = result.rows[0].PWDUSU

        ret = {
          err: undefined,
          dat: result.rows,
        }
      } else {
        ret = {
          err: 1,
          dat: 'No hay registro',
        }
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async getUsuarioByEmail() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        'SELECT * FROM usuarios WHERE emausu = :p_emausu',
        [this.email],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      )

      if (result) {
        this.id = result.rows[0].IDUSUA
        this.nombre = result.rows[0].NOMUSU
        this.oficina = result.rows[0].OFIUSU
        this.rol = result.rows[0].ROLUSU
        this.userID = result.rows[0].USERID
        this.email = result.rows[0].EMAUSU
        this.perfil = result.rows[0].PERUSU
        this.telefono = result.rows[0].TELUSU
        this.estado = result.rows[0].STAUSU
        this.password = result.rows[0].PASUSU

        ret = {
          err: undefined,
          dat: result.rows,
        }
      } else {
        ret = {
          err: 1,
          dat: 'No hay registro',
        }
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async getUsuarios() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        'SELECT uu.*, oo.desofi FROM usuarios uu INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu ORDER BY nomusu',
        [],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      )

      ret = {
        err: undefined,
        dat: result.rows,
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async cambioPassword() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      await conn.execute(
        'BEGIN FORMULARIOS_PKG.CHANGEPASSWORD(:p_idusua, :p_pwdusu, :p_usumov, :p_tipmov); END;',
        {
          // usuario
          p_idusua: this.id,
          p_pwdusu: this.password,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
        }
      )
      ret = {
        err: undefined,
        dat: this.id,
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async forgotPassword() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      await conn.execute(
        'BEGIN FORMULARIOS_PKG.FORGOTPASSWORD(:p_idusua, :p_pwdusu, :p_tipmov, :p_saltus); END;',
        {
          // usuario
          p_idusua: this.id,
          p_pwdusu: this.password,
          p_saltus: this.salt,
          // movimiento
          p_tipmov: this.movimiento.tipo,
        }
      )
      ret = {
        err: undefined,
        dat: this.id,
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async restablecerPassword() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      await conn.execute(
        'BEGIN FORMULARIOS_PKG.RESTABLECERPASSWORD(:p_idusua, :p_pwdusu, :p_usumov, :p_tipmov, :p_saltus); END;',
        {
          // usuario
          p_idusua: this.id,
          p_pwdusu: this.password,
          p_saltus: this.salt,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
        }
      )
      ret = {
        err: undefined,
        dat: this.id,
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async insert() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        'BEGIN FORMULARIOS_PKG.INSERTUSUARIO(:p_nomusu, :p_ofiusu, :p_rolusu, :p_userid, :p_emausu, :p_perusu, :p_telusu, :p_stausu, :p_pwdusu, :p_usumov, :p_tipmov, :p_idusua); END;',
        {
          // usuario
          p_nomusu: this.nombre,
          p_ofiusu: this.oficina,
          p_rolusu: this.rol,
          p_userid: this.userID,
          p_emausu: this.email,
          p_perusu: this.perfil,
          p_telusu: this.telefono,
          p_stausu: this.estado,
          p_pwdusu: this.password,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
          // retorno
          p_idusua: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        }
      )

      ret = {
        err: undefined,
        dat: result.outBinds,
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async update() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      await conn.execute(
        'BEGIN FORMULARIOS_PKG.UPDATEUSUARIO(:p_idusua, :p_nomusu, :p_ofiusu, :p_rolusu, :p_userid, :p_emausu, :p_perusu, :p_telusu, :p_stausu, :p_usumov, :p_tipmov); END;',
        {
          // usuario
          p_idusua: this.id,
          p_nomusu: this.nombre,
          p_ofiusu: this.oficina,
          p_rolusu: this.rol,
          p_userid: this.userID,
          p_emausu: this.email,
          p_perusu: this.perfil,
          p_telusu: this.telefono,
          p_stausu: this.estado,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
        }
      )

      ret = {
        err: undefined,
        dat: this.id,
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async delete() {
    let conn
    let ret

    try {
      conn = await oracledb.getConnection(connectionString)
      await conn.execute(
        'BEGIN FORMULARIOS_PKG.DELETEUSUARIO(:p_idusua, :p_usumov, :p_tipmov); END;',
        {
          // usuario
          p_idusua: this.id,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
        }
      )

      ret = {
        err: undefined,
        dat: this.id,
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async registro() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        'BEGIN FORMULARIOS_PKG.REGISTROUSUARIO(:p_nomusu, :p_ofiusu, :p_rolusu, :p_userid, :p_emausu, :p_perusu, :p_telusu, :p_pwdusu, :p_stausu, :p_tipmov, :p_saltus, :p_idusua); END;',
        {
          // usuario
          p_nomusu: this.nombre,
          p_ofiusu: this.oficina,
          p_rolusu: this.rol,
          p_userid: this.userID,
          p_emausu: this.email,
          p_perusu: this.perfil,
          p_telusu: this.telefono,
          p_pwdusu: this.password,
          p_stausu: this.estado,
          // movimiento
          p_tipmov: this.movimiento.tipo,
          // salt
          p_saltus: this.salt,
          // retorno
          p_idusua: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        }
      )

      ret = {
        err: undefined,
        dat: result.outBinds,
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async updatePerfil() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      await conn.execute(
        'BEGIN FORMULARIOS_PKG.UPDATEPERFILUSUARIO(:p_idusua, :p_nomusu, :p_emausu, :p_telusu, :p_usumov, :p_tipmov); END;',
        {
          // usuario
          p_idusua: this.id,
          p_nomusu: this.nombre,
          p_emausu: this.email,
          p_telusu: this.telefono,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
        }
      )

      ret = {
        err: undefined,
        dat: this.id,
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
}

export default Usuario
