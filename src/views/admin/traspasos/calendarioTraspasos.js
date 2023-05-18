const getCookie = (key) => {
  let value = ''
  document.cookie.split(';').forEach((e) => {
    if (e.includes(key)) {
      value = e.split('=')[1]
    }
  })
  return value
}
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
const deleteCookie = () => {
  document.cookie = 'filtro=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;'
}
const setSuccess = (element) => {
  const inputControl = element.parentElement
  const errorDisplay = inputControl.querySelector('.invalid-feedback')

  errorDisplay.innerText = ''
  inputControl.classList.add('is-valid')
  element.classList.remove('is-invalid')
}
const setError = (element, message) => {
  const inputControl = element.parentElement
  const errorDisplay = inputControl.querySelector('.invalid-feedback')

  errorDisplay.innerText = message
  element.classList.add('is-invalid')
  inputControl.classList.remove('is-valid')
}
const validate = (ele, msg) => {
  if (ele.value === '0') {
    setError(ele, msg)
    setTimeout(function () {
      setSuccess(ele)
    }, 3000)
    return false
  }
}
const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO)
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000

  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10)
}
const festivoOficina = async (oficina) => {
  const estadosOficina = oficina === 0 ? dataSource : dataSource.filter(itm => itm.ofiest === oficina)

  festivos = festivosComun.slice()
  if (oficina) {
    const festivo = festivosLocal[festivosLocal.map((itm) => itm.OFIFES).indexOf(oficina)]
    
    festivos.push(festivo.FECFES)
  }

  let data = []
  estadosOficina.map((itm) => {
    const estado = {
      idesta: itm.idesta,
      ofiest: itm.ofiest,
      startDate: new Date(itm.startDate),
      endDate: new Date(itm.endDate),
      rangoH: itm.rangoH,
      color: itm.color,
    }
    data.push(estado)
  })
  await calendario.setDataSource(data, {
    preventRendering: true
  })
  calendario.render()

  return
}
const confirm = () => {
  document.getElementById("eventos").value = JSON.stringify(eventos)
  return true
}

let eventos = []
let festivoLocal = null
let calendario = null
let currentYear = new Date().getFullYear()
let params = {
  destino: 0,
  nombre: '',
  color,
  desde: dateISOToUTCString(`${currentYear}-01-01T00:00:00`),
  hasta: dateISOToUTCString(`${currentYear}-12-31T00:00:00`),
}

const elemUpd = document.getElementById('upd')
elemUpd.setAttribute('action', `/admin/traspasos/update?part=${getCookie('filtro')}`)

Calendar.locales.es = {
  days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
  daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
  months: ["Enero/Urtarrila", "Febrero/Otsaila", "Marzo/Martxoa", "Abril/Apirila", "Mayo/Maiatza", "Junio/Ekaina", "Julio/Uztaila", "Agosto/Abuztua", "Septiembre/Iraila", "Octubre/Urria", "Noviembre/Azaroa", "Diciembre/Abendua"],
  monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  weekShort: "S",
  weekStart: 1
};
calendario = new Calendar("#calendar", {
  minDate: new Date(params.desde),
  maxDate: new Date(params.hasta),
  language: "es",
  displayHeader: false,
  mouseOnDay: function (e) {
    let content = '';

    for (let i in e.events) {
      content += e.events[i].rangoH + '\n'
    }

    e.element.setAttribute('data-bs-trigger', 'hover')
    e.element.setAttribute('data-bs-toggle', 'popover')
    e.element.setAttribute('title', content)
  },
  customDayRenderer: function (e, date) {
    const fecha = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10)
    if (e.parentElement.classList.contains('festivo')) {
      e.parentElement.classList.remove('festivo')
    }
    if (festivos.indexOf(fecha) !== -1) {
      e.style.color = tipos.festivo.COLOR
      e.parentElement.classList.add('festivo')
    }
    if (date.getDay() === 0) {
      e.style.color = tipos.festivo.COLOR
    }
  },
  dataSource: function () {
    return dataSource.map(itm => ({
      idesta: itm.idesta,
      ofiest: itm.ofiest,
      startDate: new Date(itm.startDate),
      endDate: new Date(itm.endDate),
      rangoH: itm.rangoH,
      color: itm.color,
    }))
  },
})
calendario.setYear(currentYear)

// eventos modal
document.getElementById('btnSolapeAcept').addEventListener('click', function () {
  document.getElementById('modal-solape').style.display = 'none'
})

// calendario
document.getElementById('cboyea').addEventListener('change', function () {
  currentYear = parseInt(document.querySelector("#cboyea").value)

  params.desde = dateISOToUTCString(`${currentYear}-01-01T00:00:00`)
  params.hasta = dateISOToUTCString(`${currentYear}-12-31T00:00:00`)

  calendario.setMinDate(new Date(params.desde));
  calendario.setMaxDate(new Date(params.hasta));
  calendario.setYear(currentYear)
});
document.getElementById('cbodes').addEventListener('change', function () {
  params.destino = parseInt(this.value)
  params.nombre = this.options[this.selectedIndex].text

  festivoOficina(params.destino)
});
document.querySelector('#calendar').addEventListener('clickDay', async function (e) {
  // bloquear festivos
  if (e.element.classList.contains('domingo') ||
    e.element.classList.contains('festivo')) {
    return
  }

  // bloquear si no existe destino
  if (e.events.length === 0 && params.destino === 0) {
    validate(document.getElementById('cbodes'), 'Destino requerido')
    return
  }

  params.fecha = new Date(e.date.getTime() - (e.date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10)

  if (e.events.length) {
    //eventos
    const epos = eventos.map(itm => itm.fecest).indexOf(params.fecha);
    if (epos !== -1) {
      eventos.splice(epos, 1)
    }
    if (e.events[0].idesta !== 0) {
      eventos.push({
        idesta: e.events[0].idesta,
        fecest: params.fecha,
        ofiest: params.destino,
      })
    }

    // dataSource
    const dpos = dataSource.map(itm => itm.idesta).indexOf(e.events[0].idesta);
    dataSource.splice(dpos, 1)

    let data = []
    dataSource.map((itm) => {
      const estado = {
        idesta: itm.idesta,
        ofiest: itm.ofiest,
        startDate: new Date(itm.startDate),
        endDate: new Date(itm.endDate),
        rangoH: itm.rangoH,
        color: itm.color,
      }
      data.push(estado)
    })
    calendario.setDataSource(data, {
      preventRendering: false
    })

    // actualizar dia
    e.element.attributes.removeNamedItem("style")
  } else {
    // solapes
    const result = dataSource.find(itm => itm.startDate === params.fecha)
    if (result) {
      const modalSolape = document.getElementById('modal-solape')
      e.element.setAttribute('data-bs-trigger', 'hover')
      e.element.setAttribute('data-bs-toggle', 'popover')
      e.element.setAttribute('title', 'Solape de eventos')
      modalSolape.style.display = 'flex'
      return
    }

    //eventos
    eventos.push({
      idesta: 0,
      fecest: params.fecha,
      ofiest: params.destino,
    })

    // actualiza dia calendario
    const estado = {
      idesta: 0,
      ofiest: params.destino,
      startDate: params.fecha,
      endDate: params.fecha,
      rangoH: `${params.nombre}\n(08:30 a 14:00)`,
      color: params.color,
    }
    dataSource.push(estado)

    let data = []
    dataSource.map((itm) => {
      const estado = {
        idesta: itm.idesta,
        ofiest: itm.ofiest,
        startDate: new Date(itm.startDate),
        endDate: new Date(itm.endDate),
        rangoH: itm.rangoH,
        color: itm.color,
      }
      data.push(estado)
    })
    calendario.setDataSource(data, {
      preventRendering: false
    })

    // actualizar dia
    e.element.style.boxShadow = params.color + ' 0px -4px 0px 0px inset'
  }
})
