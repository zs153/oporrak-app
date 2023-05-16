const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO);
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000;

  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10);
}
const confirm = () => {
  document.getElementById("eventos").value = JSON.stringify(eventos)
  return true
}
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
const isInRange = (value, range) => {
  return (value >= range[0] && value <= range[1])
}
const eventoRango = async () => {
  const deshor = document.getElementById('deshor').value
  const hashor = document.getElementById('hashor').value
  const element = document.getElementById('msgfor')
  const desde = document.getElementById('desfec').value
  const hasta = document.getElementById('hasfec').value

  let haySolape = false
  let arrFechas = []

  // solapes
  for (let day = new Date(desde); day <= new Date(hasta); day.setDate(day.getDate() + 1)) {
    dataSource.filter(itm => {
      if (itm.startDate === day.toISOString().slice(0, 10)) {
        arrFechas.push(itm)
      }
    })
    if (arrFechas.length > 0) break
  }

  if (arrFechas.length > 0) {
    arrFechas.every(itm => {
      let rango = [itm.deshor, itm.hashor]
      if (isInRange(deshor, rango) || isInRange(hashor, rango)) {
        haySolape = true

        setError(element, `Solape de eventos el día ${itm.startDate.split("-").reverse().join("-")} ${deshor}`)
        setTimeout(function () {
          setSuccess(element)
        }, 3000)

        return false
      }

      return true
    });
  }

  if (!haySolape) {
    // insert rango
    for (let day = new Date(desde); day <= new Date(hasta); day.setDate(day.getDate() + 1)) {
      const dia = dateISOToUTCString(day)

      if (festivos.indexOf(dia) < 0 && day.getDay() !== 0 && day.getDay() !== 6) {
        const id = -(Date.now())

        dataSource.push({
          idesta: id,
          tipest: params.tipo,
          startDate: dia,
          endDate: dia,
          rangoH: `${params.nombre} (${deshor} a ${hashor})`,
          color: params.color,
          deshor: deshor,
          hashor: hashor,
        })
        eventos.push({
          idesta: id,
          fecest: dia,
          tipest: params.tipo,
          deshor: `+00 ${deshor}:00`,
          hashor: `+00 ${hashor}:00`,
        })
      }
    }

    getEstadosTipo(params.tipo)

    document.getElementById('modal-form').style.display = 'none'
  }
}
const getEstadosTipo = (tipo) => {
  const estadosTipo = tipo === 0 ? dataSource : dataSource.filter(itm => itm.tipest === tipo)
  let data = []

  estadosTipo.map(itm => {
    data.push({
      idesta: itm.idesta,
      tipest: itm.tipest,
      startDate: new Date(itm.startDate),
      endDate: new Date(itm.endDate),
      rangoH: itm.rangoH,
      color: itm.color,
      deshor: itm.deshor,
      hashor: itm.hashor,
    })
  })
  calendario.setDataSource(data)
}
const editEvento = (e) => {
  const fecha = dateISOToUTCString(e.date)

  const modalForm = document.getElementById('modal-form')
  document.getElementById('desfec').value = fecha
  document.getElementById('hasfec').value = fecha

  if (params.tipo === tipos.baja.ID) {
    document.getElementById('deshor').value = "08:30"
    document.getElementById('hashor').value = "14:00"
  } else if (params.tipo === tipos.formacion.ID) {
    document.getElementById('deshor').value = "08:30"
    document.getElementById('hashor').value = "14:00"
  } else if (params.tipo === tipos.conciliacion.ID) {
    document.getElementById('deshor').value = "08:30"
    document.getElementById('hashor').value = "09:30"
  } else if (params.tipo === tipos.reunion.ID) {
    document.getElementById('deshor').value = "08:30"
    document.getElementById('hashor').value = "14:00"
  } else if (params.tipo === tipos.horas.ID) {
    document.getElementById('deshor').value = "08:30"
    document.getElementById('hashor').value = "14:00"
  } else if (params.tipo === tipos.telefono.ID) {
    document.getElementById('deshor').value = "08:30"
    document.getElementById('hashor').value = "14:00"
  }

  modalForm.style.display = 'flex'
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
const deleteMenuEvent = async (id) => {
  if (id < 0) {
    let pos = eventos.map(itm => itm.idesta).indexOf(id)
    eventos.splice(pos, 1)
  } else {
    eventos.push({
      idesta: id,
      fecest: '',
      tipest: 0,
      deshor: '',
      hashor: '',
    })
  }

  pos = dataSource.map(itm => itm.idesta).indexOf(id)
  dataSource.splice(pos, 1)

  let data = []
  dataSource.map(itm => {
    data.push({
      idesta: itm.idesta,
      tipest: itm.tipest,
      startDate: new Date(itm.startDate),
      endDate: new Date(itm.endDate),
      rangoH: itm.rangoH,
      color: itm.color,
      deshor: itm.deshor,
      hashor: itm.hashor,
    })
  })
  calendario.setDataSource(data)

  document.getElementById('btnEventCancel').click()
}

let eventos = []
let calendario = null
let currentYear = new Date().getFullYear()
let params = {
  fecha: new Date().toISOString().slice(0, 10),
  nombre: '',
  tipo: 0,
  color: '',
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
  mouseOnDay: function (e) {
    if (e.events.length > 0) {
      let content = '';

      e.events.forEach(element => {
        content += element.rangoH + '\n'
      })

      e.element.setAttribute('data-bs-trigger', 'hover')
      e.element.setAttribute('data-bs-toggle', 'popover')
      e.element.setAttribute('title', content)
    }
  },
  customDayRenderer: function (e, date) {
    const fecha = dateISOToUTCString(date)

    if (e.parentElement.classList.contains('festivo')) {
      e.parentElement.classList.remove('festivo')
    }

    if (festivos.indexOf(fecha) !== -1) {
      e.style.color = '<%- datos.tiposEstado.festivo.COLOR %>'
      e.parentElement.classList.add('festivo')
    }
    if (date.getDay() === 0) {
      e.style.color = '<%- datos.tiposEstado.festivo.COLOR %>'
    }
  },
  dataSource: function () {
    return dataSource.map(itm => ({
      idesta: itm.idesta,
      tipest: itm.tipest,
      startDate: new Date(itm.startDate),
      endDate: new Date(itm.endDate),
      rangoH: itm.rangoH,
      color: itm.color,
      deshor: itm.deshor,
      hashor: itm.hashor,
    }))
  },
})
calendario.setYear(currentYear)

// eventos modal
document.getElementById('btnHorasCancel').addEventListener('click', function () {
  document.getElementById('modal-form').style.display = 'none'
})
document.getElementById('btnEventCancel').addEventListener('click', function () {
  document.getElementById('modal-evnts').style.display = 'none'
})
document.getElementById('btnSolapeAcept').addEventListener('click', function () {
  document.getElementById('modal-solape').style.display = 'none'
})

// evento keydown
document.addEventListener('keydown', function (e) {
  const modalForm = document.getElementById('modal-form')
  const modalEvent = document.getElementById('modal-evnts')
  const modalSolape = document.getElementById('modal-solape')

  if (e.key === 'Escape' && modalForm.style.display === 'flex') {
    modalForm.style.display = 'none'
  } else if (e.key === 'Escape' && modalEvent.style.display === 'flex') {
    modalEvent.style.display = 'none'
  } else if (e.key === 'Escape' && modalSolape.style.display === 'flex') {
    modalSolape.style.display = 'none'
  }
})

// eventos form
document.getElementById('cboyea').addEventListener('change', function () {
  currentYear = parseInt(document.querySelector("#cboyea").value)

  params.desde = dateISOToUTCString(`${currentYear}-01-01T00:00:00`)
  params.hasta = dateISOToUTCString(`${currentYear}-12-31T00:00:00`)

  calendario.setMinDate(new Date(params.desde));
  calendario.setMaxDate(new Date(params.hasta));
  calendario.setYear(currentYear)

  getEstadosTipo(params.tipo)
});
document.getElementById('cboest').addEventListener('change', function () {
  params.color = document.getElementById("cboest").options[document.getElementById("cboest").selectedIndex].getAttribute('data-foo')
  params.tipo = parseInt(this.value)
  params.nombre = this.options[this.selectedIndex].text

  getEstadosTipo(params.tipo)
});
document.querySelector('#calendar').addEventListener('clickDay', async function (e) {
  // bloquear festivos
  if (e.element.classList.contains('domingo')) {
    return
  }

  // bloquear si no existe destino
  if (e.events.length === 0 &&
    params.tipo === 0) {
    validate(document.getElementById('cboest'), 'Estado requerido')
    return
  }

  // evento por rango
  if (e.events.length === 0 && (params.tipo === tipos.baja.ID ||
      params.tipo === tipos.formacion.ID ||
      params.tipo === tipos.conciliacion.ID ||
      params.tipo === tipos.reunion.ID ||
      params.tipo === tipos.horas.ID ||
      params.tipo === tipos.telefono.ID)) {
    editEvent()
    return
  }

  if (e.events.length) {  
    if (e.events.length > 1) {
      const modalEvent = document.getElementById('modal-evnts')
      const tbl = document.getElementById("table-body")
      let innerT = ''

      tbl.innerHTML = innerT;
      // eventos
      for (let i = 0; i < e.events.length; i++) {
        innerT += `<tr>
              <td>
                <div class="d-flex py-1 align-items-center">
                  <div class="flex-fill">
                    <div class="font-weight-medium" style="color: ${colores[e.events[i].tipest].COLOR}">${colores[e.events[i].tipest].DES}</div>
                  </div>
                </div>
              </td>
              <td class="w-4">
                <div class="py-1 align-items-center">
                  <a href="#" class="nav-link" onclick="deleteMenuEvent(${e.events[i].idesta})">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor" fill="none"><path stroke-width=".4" fill="none" d="M7.85 19.575q-.6 0-1.025-.425-.425-.425-.425-1.025v-12.1h-.975V5.4h3.6v-.675H15V5.4h3.6v.625h-.975V18.15q0 .6-.425 1.013-.425.412-1.025.412Zm9.125-13.55H7.05v12.1q0 .35.225.575.225.225.575.225h8.325q.3 0 .55-.25.25-.25.25-.55Zm-6.85 10.925h.625V8h-.625Zm3.15 0h.625V8h-.625ZM7.05 6.025V18.925 18.125Z"/></svg>
                  </a>
                </div>
              </td>
            </tr>`
      }

      tbl.innerHTML += innerT;

      modalEvent.style.display = 'flex'
    } else {
      // borrar
      if (e.events[0].idesta < 0) {
        let pos = eventos.map(itm => itm.idesta).indexOf(e.events[0].idesta);
        eventos.splice(pos, 1)
      } else {
        eventos.push({
          idesta: e.events[0].idesta,
          fecest: '',
          tipest: 0,
          deshor: '',
          hashor: '',
        })
      }

      pos = dataSource.map(itm => itm.idesta).indexOf(e.events[0].idesta);
      dataSource.splice(pos, 1)

      let data = []
      dataSource.map(itm => {
        data.push({
          idesta: itm.idesta,
          tipest: itm.tipest,
          startDate: new Date(itm.startDate),
          endDate: new Date(itm.endDate),
          rangoH: itm.rangoH,
          color: itm.color,
          deshor: itm.deshor,
          hashor: itm.hashor,
        })
      })
      calendario.setDataSource(data, {
        preventRendering: false
      })

      // actualizar dia
      e.element.attributes.removeNamedItem("style")
    }
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

    params.fecha = dateISOToUTCString(e.date)
    const id = -(Date.now())
    // insertar
    dataSource.push({
      idesta: id,
      tipest: params.tipo,
      startDate: new Date(params.fecha),
      endDate: new Date(params.fecha),
      rangoH: `${params.nombre} (08:30 a 14:00)`,
      color: params.color,
    })
    eventos.push({
      idesta: id,
      fecest: params.fecha,
      tipest: params.tipo,
      deshor: '+00 08:30:00',
      hashor: '+00 14:00:00',
    })

    calendario.setDataSource(dataSource, {
      preventRendering: false
    })

    // actualizar dia
    e.element.style.boxShadow = params.color + ' 0px -4px 0px 0px inset'
  }
})