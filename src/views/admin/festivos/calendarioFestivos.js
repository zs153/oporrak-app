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
  // document.cookie = name + "=" + (encodeURIComponent(value) || "")  + expires + "; path=/";
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
const deleteCookie = () => {
  document.cookie = 'filtro=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;'
}
const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO)
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000

  return new Date(fecha.getTime() - userTimezoneOffset)
    .toISOString()
    .slice(0, 10)
}

const elemUpdate = document.getElementById('upd');
elemUpdate.setAttribute('action', `/admin/festivos/update?part=${getCookie('filtro')}`)

let eventos = []
let calendario = null
let currentYear = new Date().getFullYear()
let params = {
  color,
  desde: dateISOToUTCString(`${currentYear}-01-01T00:00:00`),
  hasta: dateISOToUTCString(`${currentYear}-12-31T00:00:00`),
}

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
  customDayRenderer: function (e, date) {
    if (date.getDay() === 0) {
      e.style.color = params.color
    }
  },
  dataSource: function () {
    return dataSource.map(itm => ({
      idfest: itm.idfest,
      ofifes: itm.ofifes,
      startDate: new Date(itm.fecfes),
      endDate: new Date(itm.fecfes),
      color: itm.color,
    }))
  }
})
calendario.setYear(currentYear)

// eventos
document.getElementById('btnUpdate').addEventListener('click', () => {
  document.getElementById("eventos").value = JSON.stringify(eventos)
  return
})
document.getElementById('cboyea').addEventListener('change', function () {
  currentYear = parseInt(document.querySelector("#cboyea").value)

  params.desde = dateISOToUTCString(`${currentYear}-01-01T00:00:00`)
  params.hasta = dateISOToUTCString(`${currentYear}-12-31T00:00:00`)

  calendario.setMinDate(new Date(params.desde));
  calendario.setMaxDate(new Date(params.hasta));
  calendario.setYear(currentYear)
});
document.getElementById('calendar').addEventListener('clickDay', async function (e) {
  // bloquear festivos
  if (e.element.classList.contains('domingo')) {
    return
  }

  const fecha = dateISOToUTCString(e.date)
  if (e.events.length) {
    // borrar
    if (e.events[0].idfest < 0) {
      let pos = eventos.map(itm => itm.idfest).indexOf(fecha);
      eventos.splice(pos, 1)
    } else {
      eventos.push({
        idfest: e.events[0].idfest,
        fecfes: '',
        ofifes: 0,
      })
    }

    let pos = dataSource.map(itm => itm.fecfes).indexOf(fecha);
    dataSource.splice(pos, 1)

    let data = []
    dataSource.map(itm => {
      data.push({
        idfest: itm.idfest,
        ofifes: itm.ofifes,
        startDate: new Date(itm.startDate),
        endDate: new Date(itm.endDate),
        color: itm.color,
      })
    })
    calendario.setDataSource(data, {
      preventRendering: false
    })

    // actualizar dia
    e.element.attributes.removeNamedItem("style")
  } else {
    const id = -(Date.now())

    // insertar
    dataSource.push({
      idfest: id,
      ofifes: oficina.IDOFIC,
      startDate: new Date(fecha),
      endDate: new Date(fecha),
      color: params.color,
    })
    // dataSource.push({
    //   idfest: id,
    //   ofifes: oficina.IDOFIC,
    //   startDate: fecha,
    //   endDate: fecha,
    //   color: params.color,
    // })
    eventos.push({
      idfest: id,
      fecfes: fecha,
      ofifes: oficina.IDOFIC,
    })

    // let data = []
    // dataSource.map(itm => {
    //   data.push({
    //     idfest: itm.idfest,
    //     ofifes: itm.ofifes,
    //     startDate: new Date(itm.startDate),
    //     endDate: new Date(itm.endDate),
    //     color: itm.color,
    //   })
    // })
    calendario.setDataSource(dataSource, {
      preventRendering: false
    })

    // actualizar dia
    e.element.style.boxShadow = params.color + ' 0px -4px 0px 0px inset'
  }
})
