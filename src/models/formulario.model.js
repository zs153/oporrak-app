import oracledb from 'oracledb'
import Movimiento from './movimiento.model'
import { connectionString } from '../settings'

class Formulario {
  constructor(
    id,
    fecha,
    nif,
    nombre,
    email,
    referencia,
    tipo,
    ejercicio,
    oficina,
    observaciones,
    telefonoDeclarante,
    telefonoRepresentante,
    estado,
    funcionario,
    liquidador
  ) {
    this.iddocu = id
    this.fecdoc = fecha
    this.nifcon = nif
    this.nomcon = nombre
    this.email = email
    this.refdoc = referencia
    this.tipdoc = tipo
    this.ejedoc = ejercicio
    this.ofidoc = oficina
    this.obsdoc = observaciones
    this.teldec = telefonoDeclarante
    this.telrep = telefonoRepresentante
    this.fundoc = funcionario
    this.liqdoc = liquidador
    this.stadoc = estado

    this.movi = new Movimiento()
    this.peri = {
      desde: '',
      hasta: '',
    }
  }

  get id() {
    return this.iddocu
  }
  set id(value) {
    this.iddocu = value
  }
  get fecha() {
    return this.fecdoc
  }
  set fecha(value) {
    this.fecdoc = value
  }
  get nif() {
    return this.nifcon
  }
  set nif(value) {
    this.nifcon = value
  }
  get nombre() {
    return this.nomcon
  }
  set nombre(value) {
    this.nomcon = value
  }
  get email() {
    return this.emacon
  }
  set email(value) {
    this.emacon = value
  }
  get referencia() {
    return this.refdoc
  }
  set referencia(value) {
    this.refdoc = value
  }
  get tipo() {
    return this.tipdoc
  }
  set tipo(value) {
    this.tipdoc = value
  }
  get ejercicio() {
    return this.ejedoc
  }
  set ejercicio(value) {
    this.ejedoc = value
  }
  get oficina() {
    return this.ofidoc
  }
  set oficina(value) {
    this.ofidoc = value
  }
  get observaciones() {
    return this.obsdoc
  }
  set observaciones(value) {
    this.obsdoc = value
  }
  get telefonoDeclarante() {
    return this.teldec
  }
  set telefonoDeclarante(value) {
    this.teldec = value
  }
  get telefonoRepresentante() {
    return this.telrep
  }
  set telefonoRepresentante(value) {
    this.telrep = value
  }
  get funcionario() {
    return this.fundoc
  }
  set funcionario(value) {
    this.fundoc = value
  }
  get liquidador() {
    return this.liqdoc
  }
  set liquidador(value) {
    this.liqdoc = value
  }
  get estado() {
    return this.stadoc
  }
  set estado(value) {
    this.stadoc = value
  }

  // periodo
  get periodo() {
    return this.peri
  }
  set periodo(value) {
    this.peri = value
  }

  // movimiento
  get movimiento() {
    return this.movi
  }
  set movimiento(value) {
    this.movi = value
  }

  // procedimientos
  async getFormulario() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        "SELECT dd.*, TO_CHAR(fecdoc,'YYYY-MM-DD') AS strfec FROM documentos dd WHERE dd.iddocu = :p_iddocu",
        [this.id],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      )

      if (result) {
        this.id = result.rows[0].IDDOCU
        this.fecha = result.rows[0].STRFEC
        this.nif = result.rows[0].NIFCON
        this.nombre = result.rows[0].NOMCON
        this.email = result.rows[0].EMACON
        this.referencia = result.rows[0].REFDOC
        this.tipo = result.rows[0].TIPDOC
        this.ejercicio = result.rows[0].EJEDOC
        this.oficina = result.rows[0].OFIDOC
        this.observaciones = result.rows[0].OBSDOC
        this.telefonoDeclarante = result.rows[0].TELDEC
        this.telefonoRepresentante = result.rows[0].TELREP
        this.funcionario = result.rows[0].FUNDOC
        this.liquidador = result.rows[0].LIQDOC
        this.estado = result.rows[0].STADOC

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
  async getFormularios() {
    let conn
    let ret

    let strSql =
      "SELECT oo.desofi,tt.destip,dd.iddocu,TO_CHAR(dd.fecdoc, 'DD/MM/YYYY') AS strfec,dd.refdoc,dd.nifcon,dd.nomcon,dd.obsdoc,dd.liqdoc,dd.stadoc FROM "
    strSql +=
      '(SELECT ofidoc, fecdoc, iddocu FROM documentos GROUP BY ofidoc, fecdoc, iddocu) zz '
    strSql += 'INNER JOIN documentos dd ON dd.iddocu = zz.iddocu '
    strSql += 'INNER JOIN oficinas oo ON oo.idofic = dd.ofidoc '
    strSql += 'INNER JOIN tipos tt ON tt.idtipo = dd.tipdoc '
    strSql += 'WHERE stadoc < :p_stadoc ORDER BY dd.ofidoc'

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(strSql, [this.estado], {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      })

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
  async estadistica() {
    let conn
    let ret

    let strSql = 'SELECT desofi,'
    strSql += 'SUM(CASE WHEN stadoc = 0 THEN 1 ELSE 0 END) AS pend,'
    strSql += 'SUM(CASE WHEN stadoc = 1 THEN 1 ELSE 0 END) AS asig,'
    strSql += 'SUM(CASE WHEN stadoc = 2 THEN 1 ELSE 0 END) AS resu,'
    strSql += 'SUM(CASE WHEN stadoc = 3 THEN 1 ELSE 0 END) AS remi '
    strSql += 'FROM (SELECT iddocu FROM movimientos mm '
    strSql += 'INNER JOIN movimientosdocumento md ON md.idmovi = mm.idmovi '
    strSql +=
      "WHERE tipmov = 0 AND mm.fecmov BETWEEN TO_DATE(:p_desfec,'DD/MM/YYYY') AND TO_DATE(:p_hasfec,'DD/MM/YYYY')) p1 "
    strSql += 'INNER JOIN documentos dd ON dd.iddocu = p1.iddocu '
    strSql += 'INNER JOIN oficinas oo ON oo.idofic = dd.ofidoc '
    strSql += 'GROUP BY desofi ORDER BY desofi'

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        strSql,
        [this.periodo.desde, this.periodo.hasta],
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
  async insert() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        "BEGIN FORMULARIOS_PKG.INSERTFORMULARIO(TO_DATE(:p_fecdoc,'YYYY-MM-DD'), :p_nifcon, :p_nomcon, :p_emacon, :p_refdoc, :p_tipdoc, :p_ejedoc, :p_ofidoc, :p_obsdoc, :p_teldec, :p_telrep, :p_fundoc, :p_liqdoc, :p_stadoc, :p_usumov, :p_tipmov, :p_iddocu); END;",
        {
          // formulario
          p_fecdoc: this.fecha,
          p_nifcon: this.nif,
          p_nomcon: this.nombre,
          p_emacon: this.email,
          p_refdoc: this.referencia,
          p_tipdoc: this.tipo,
          p_ejedoc: this.ejercicio,
          p_ofidoc: this.oficina,
          p_obsdoc: this.observaciones,
          p_teldec: this.telefonoDeclarante,
          p_telrep: this.telefonoRepresentante,
          p_fundoc: this.funcionario,
          p_liqdoc: this.liquidador,
          p_stadoc: this.estado,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
          // retorno
          p_iddocu: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
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
        "BEGIN FORMULARIOS_PKG.UPDATEFORMULARIO(:p_iddocu, TO_DATE(:p_fecdoc,'YYYY-MM-DD'), :p_nifcon, :p_nomcon, :p_emacon, :p_refdoc, :p_tipdoc, :p_ejedoc, :p_ofidoc, :p_obsdoc, :p_teldec, :p_telrep, :p_usumov, :p_tipmov); END;",
        {
          // formulario
          p_iddocu: this.id,
          p_fecdoc: this.fecha.substring(0, 10),
          p_nifcon: this.nif,
          p_nomcon: this.nombre,
          p_emacon: this.email,
          p_refdoc: this.referencia,
          p_tipdoc: this.tipo,
          p_ejedoc: this.ejercicio,
          p_ofidoc: this.oficina,
          p_obsdoc: this.observaciones,
          p_teldec: this.telefonoDeclarante,
          p_telrep: this.telefonoRepresentante,
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
        'BEGIN FORMULARIOS_PKG.DELETEFORMULARIO(:p_iddocu, :p_usumov, :p_tipmov); END;',
        {
          // formulario
          p_iddocu: this.id,
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
  async cambioEstado() {
    let conn
    let ret

    try {
      conn = await oracledb.getConnection(connectionString)
      await conn.execute(
        'BEGIN FORMULARIOS_PKG.CAMBIOESTADOFORMULARIO(:p_iddocu, :p_liqdoc, :p_stadoc, :p_usumov, :p_tipmov); END;',
        {
          // formulario
          p_iddocu: this.id,
          p_liqdoc: this.liquidador,
          p_stadoc: this.estado,
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

export default Formulario
