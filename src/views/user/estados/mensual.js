const desfec = document.getElementById('desfec')
const cbofor = document.getElementById('cbofor')

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.invalid-feedback');

  errorDisplay.innerText = '';
  inputControl.classList.add('is-valid');
  element.classList.remove('is-invalid');
}
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.invalid-feedback');

  errorDisplay.innerText = message;
  element.classList.add('is-invalid');
  inputControl.classList.remove('is-valid');
}
const yearMonthDayToUTCString = (year, month, day) => {
  const yearCDM = ('000' + year).slice(-4)
  const monthCDM = ('0' + month).slice(-2)
  const dayCDM = ('0' + day).slice(-2)

  const fecha = new Date(`${yearCDM}-${monthCDM}-${dayCDM}T00:00:00`)
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000

  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10)
}
const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO)
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000

  return new Date(fecha.getTime() - userTimezoneOffset)
    .toISOString()
    .slice(0, 10)
}
const validate = () => {
  const desfecValue = desfec.value.trim()

  if (isNaN(Date.parse(desfecValue))) {
    setError(desfec, 'Fecha requerida')
    setTimeout(function () {
      setSuccess(desfec)
    }, 3000)
    return false
  }

  return true
}
const estadosGantt = (estados, festivos, periodo, diasPeriodo) => {
  const desde = new Date(periodo.desde)
  const hasta = new Date(periodo.hasta)

  let activosOficina = new Array(diasPeriodo).fill(0)
  let estadosUsuario = []
  let oficinaActual = 0
  let usuarioActual = 0

  let rows = new Array();
  let delta = 0;
  let rowCount = 0;
  let nombreUsuario = '';
  
  if (estados.length === 0) {
    return
  }

  estados.map(itm => {
    const dia = new Date(itm.FECHA).getDate();
    const diaSemana = new Date(itm.FECHA).getDay()
    const festivo = festivos[festivos.indexOf(itm.FECHA)]

    if (oficinaActual != itm.OFIUSU || usuarioActual != itm.IDUSUA) {
      if (usuarioActual) {
        rows[rowCount] = new Array();
        rows[rowCount][0] = nombreUsuario;
        rows[rowCount].push(estadosUsuario);
        rowCount++;

        //total
        for (var i = 0; i < diasPeriodo; i++) {
          if (estadosUsuario[i] === 1 || estadosUsuario[i] === 10) {
            activosOficina[i]++;
          }
          if (estadosUsuario[i] === -1) {
            activosOficina[i] = ''
          }
        }
      }

      estadosUsuario = new Array(diasPeriodo).fill(1);
      usuarioActual = itm.IDUSUA;
      nombreUsuario = itm.NOMUSU;
    }

    if (oficinaActual != itm.OFIUSU) {
      if (oficinaActual) {
        rows[rowCount] = new Array();
        rows[rowCount][0] = 0; //indicador de total usuario
        rows[rowCount].push(activosOficina);
        rowCount++;

        //reiniciar
        activosOficina = new Array(diasPeriodo).fill(0)
      }

      rows[rowCount] = new Array();
      rows[rowCount][0] = -1; //indicador de total oficina
      rows[rowCount].push(itm.DESOFI);
      rowCount++;

      oficinaActual = itm.OFIUSU
    }

    //acumulado estados
    if (diaSemana === 6 || diaSemana === 0 || festivo) {
      estadosUsuario[dia - 1] = -1
    } else {
      estadosUsuario[dia - 1] = Number(itm.TIPEST)
    }
  })

  // ultimo usuario
  rows[rowCount] = new Array();
  rows[rowCount][0] = nombreUsuario;
  rows[rowCount].push(estadosUsuario);

  rowCount++;

  //total ultimo usuario
  for (var i = 0; i < diasPeriodo; i++) {
    if (estadosUsuario[i] === 1 || estadosUsuario[i] === 10) {
      activosOficina[i]++;
    }
    if (estadosUsuario[i] === -1) {
      activosOficina[i] = ''
    }
  }

  rows[rowCount] = new Array();
  rows[rowCount][0] = 0;
  rows[rowCount].push(activosOficina);

  // pintar tabla
  let tblHeader = document.getElementsByTagName("thead")[0];
  let tblBody = document.getElementsByTagName("tbody")[0];
  let rowOficina = document.createElement("tr");
  let rowUsuario = document.createElement("tr");
  let rowHeader = document.createElement("tr");

  let col = null;
  let texto = null;
  
  // descripcion header
  col = document.createElement('th')
  col.style.cssText = "border: none; text-align: center;"
  col.style.minWidth = "250px"

  rowHeader.appendChild(col)
  tblHeader.appendChild(rowHeader)

  // dias header
  const diaInicio = desde.getDate() +1
  const diaFin = hasta.getDate() +1
  
  for (let d = diaInicio; d <= diaFin; d++) {
    texto = document.createTextNode(('0' + d).slice(-2))
    col = document.createElement('th')
    col.appendChild(texto)
    col.style.cssText = "border: none; text-align: center"

    rowHeader.appendChild(col)
    tblHeader.appendChild(rowHeader)
  }

  rows.map(itm => {
    if (itm[0] === -1) {
      // total oficina
      rowOficina = document.createElement('tr')
      col = document.createElement('td')
      texto = document.createTextNode(itm[1])

      col.appendChild(texto)
      col.style.cssText = "color: orangered; border: none; text-align: center;"
      col.style.minWidth = "250px"

      rowOficina.appendChild(col)
      tblBody.appendChild(rowOficina)
    } else if (itm[0] === 0) {
      // total usuario
      rowOficina = document.createElement('tr')
      col = document.createElement('td')
      texto = document.createTextNode('Personal en activo')

      col.appendChild(texto)
      col.style.cssText = "color: blue; border: none; text-align: left;"

      rowOficina.appendChild(col)

      for (var i = 0; i < diasPeriodo; i++) {
        var col = document.createElement("td")
        col.style.cssText = "color: blue; border: none; text-align: center;"
        var texto = document.createTextNode(itm[1][i])
        col.appendChild(texto)
        rowOficina.appendChild(col)
      }

      tblBody.appendChild(rowOficina)
    } else {
      // nombre usuario
      rowUsuario = document.createElement('tr')
      col = document.createElement('td')
      texto = document.createTextNode(itm[0])

      col.appendChild(texto)
      rowUsuario.appendChild(col)
      tblBody.appendChild(rowUsuario)

      // tipos de estado
      for (var i = 0; i < diasPeriodo; i++) {
        if (itm[1][i] === -1) {
          // festivo
          var col = document.createElement("td")
          col.style.background = '#FAFAFA'

          rowUsuario.appendChild(col)
        } else if (itm[1][i] === 0) {
          // usuario en activo
          var col = document.createElement("td")
          col.style.background = '#FAFAFA'

          rowUsuario.appendChild(col)
        } else if (itm[1][i] === 1) {
          // usuario en activo
          var col = document.createElement("td")

          rowUsuario.appendChild(col)
        } else if (itm[1][i] === tipos.vacacion.ID) {
          var col = document.createElement("td")
          var sub = document.createElement("div")
          var texto = document.createTextNode('vacación')

          col.className = 'timeline vacas'
          rowUsuario.appendChild(col)

          sub.className = 'popup'
          sub.appendChild(texto)
          col.appendChild(sub);
          rowUsuario.appendChild(col)
        } else if (itm[1][i] === tipos.baja.ID) {
          var col = document.createElement("td")
          var sub = document.createElement("div")
          var texto = document.createTextNode('baja')

          col.className = 'timeline bajas'
          rowUsuario.appendChild(col)

          sub.className = 'popup'
          sub.appendChild(texto)
          col.appendChild(sub)
          rowUsuario.appendChild(col)
        } else if (itm[1][i] === tipos.traspaso.ID) {
          var col = document.createElement("td")
          var sub = document.createElement("div")
          var texto = document.createTextNode('traspaso')

          col.className = 'timeline trasp'
          rowUsuario.appendChild(col)

          sub.className = 'popup'
          sub.appendChild(texto)
          col.appendChild(sub)
          rowUsuario.appendChild(col)
        } else if (itm[1][i] === tipos.formacion.ID) {
          var col = document.createElement("td")
          var sub = document.createElement("div")
          var texto = document.createTextNode('formación')

          col.className = 'timeline forma'
          rowUsuario.appendChild(col)

          sub.className = 'popup'
          sub.appendChild(texto)
          col.appendChild(sub)
          rowUsuario.appendChild(col)
        } else if (itm[1][i] === tipos.conciliacion.ID) {
          var col = document.createElement("td");
          var sub = document.createElement("div");
          var texto = document.createTextNode('conciliación');

          col.className = 'timeline conci';
          rowUsuario.appendChild(col);

          sub.className = 'popup';
          sub.appendChild(texto);
          col.appendChild(sub);
          rowUsuario.appendChild(col);
        } else if (itm[1][i] === tipos.reunion.ID) {
          var col = document.createElement("td");
          var sub = document.createElement("div");
          var texto = document.createTextNode('reunión');

          col.className = 'timeline reuni';
          rowUsuario.appendChild(col);

          sub.className = 'popup';
          sub.appendChild(texto);
          col.appendChild(sub);
          rowUsuario.appendChild(col);
        } else if (itm[1][i] === tipos.horas.ID) {
          var col = document.createElement("td");
          var sub = document.createElement("div");
          var texto = document.createTextNode('horas');

          col.className = 'timeline horas';
          rowUsuario.appendChild(col);

          sub.className = 'popup';
          sub.appendChild(texto);
          col.appendChild(sub);
          rowUsuario.appendChild(col);
        } else if (itm[1][i] === tipos.telefono.ID) {
          var col = document.createElement("td");
          var sub = document.createElement("div");
          var texto = document.createTextNode('teléfono');

          col.className = 'timeline tele';
          rowUsuario.appendChild(col);

          sub.className = 'popup';
          sub.appendChild(texto);
          col.appendChild(sub);
          rowUsuario.appendChild(col);
        } else if (itm[1][i] === tipos.traspasado.ID) {
          var col = document.createElement("td")
          var sub = document.createElement("div")
          var texto = document.createTextNode('traspasado')

          col.className = 'timeline trasdo'
          rowUsuario.appendChild(col)

          sub.className = 'popup'
          sub.appendChild(texto)
          col.appendChild(sub)
          rowUsuario.appendChild(col)
        }
      }
    }
  })
}

// eventos form
desfec.addEventListener('change', function (e) {
  const formato = document.getElementById('cbofor').value
  const currentYear = new Date(document.querySelector("#desfec").value).getFullYear()
  const currentMonth = new Date(document.querySelector("#desfec").value).getMonth() + 1

  let desde = new Date(yearMonthDayToUTCString(currentYear, currentMonth, 1))
  let hasta = desde

  if (formato === '1') {
    const lastDayMonth = new Date(currentYear, currentMonth, 0).getDate()

    hasta = new Date(yearMonthDayToUTCString(currentYear, currentMonth, lastDayMonth))
  } else {
    let t = new Date()

    t = new Date(document.querySelector("#desfec").value)

    if (t.getDay() === 0) {
      t.setDate(t.getDate() + 1)

      desde = new Date(t)
      hasta = new Date(t.setDate(t.getDate() + 4))
    } else if (t.getDay() === 1) {
      t = new Date(new Date(document.querySelector("#desfec").value))
      t.setDate(t.getDate() + 4)

      desde = new Date(new Date(document.querySelector("#desfec").value))
      hasta = t
    } else {
      const primerDiaSemana = t.getDate() - t.getDay()

      t.setDate(desde.getDate() + primerDiaSemana)
      desde = new Date(t)
      hasta = new Date(t.setDate(t.getDate() + 4))
    }
  }

  document.querySelector("#desde").value = desde.toISOString().slice(0, 10)
  document.querySelector("#hasta").value = hasta.toISOString().slice(0, 10)
})
cbofor.addEventListener('change', function (e) {
  const currentYear = new Date(document.querySelector("#desfec").value).getFullYear()
  const currentMonth = new Date(document.querySelector("#desfec").value).getMonth() + 1

  let desde = new Date(yearMonthDayToUTCString(currentYear, currentMonth, 1))
  let hasta = desde

  if (e.target.value === '1') {
    const lastDayMonth = new Date(currentYear, currentMonth, 0).getDate()

    hasta = new Date(yearMonthDayToUTCString(currentYear, currentMonth, lastDayMonth))
  } else {
    let t = new Date()

    t = new Date(document.querySelector("#desfec").value)

    if (t.getDay() === 0) {
      t.setDate(t.getDate() + 1)

      desde = new Date(t)
      hasta = new Date(t.setDate(t.getDate() + 4))
    } else if (t.getDay() === 1) {
      t = new Date(new Date(document.querySelector("#desfec").value))
      t.setDate(t.getDate() + 4)

      desde = new Date(new Date(document.querySelector("#desfec").value))
      hasta = t
    } else {
      const primerDiaSemana = t.getDate() - t.getDay()

      t.setDate(desde.getDate() + primerDiaSemana)
      desde = new Date(t)
      hasta = new Date(t.setDate(t.getDate() + 4))
    }
  }

  document.querySelector("#desde").value = desde.toISOString().slice(0, 10)
  document.querySelector("#hasta").value = hasta.toISOString().slice(0, 10)
})

// show
estadosGantt(estados, festivos, periodo, diasPeriodo)