const cboO = document.getElementById('cboofi');
const cboP = document.getElementById('cboper');
const cboF = document.getElementById('cbofor')
const desfec = document.getElementById('desfec')
const desofi = document.getElementById('desofi')
const desper = document.getElementById('desper')

const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO);
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000;
  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10);
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
const yearMonthDayToUTCString = (year, month, day) => {
  const yearCDM = ('000' + year).slice(-4)
  const monthCDM = ('0' + month).slice(-2)
  const dayCDM = ('0' + day).slice(-2)

  const fecha = new Date(`${yearCDM}-${monthCDM}-${dayCDM}T00:00:00`)
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000

  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10)
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

// inicializacion
desfec.value = new Date().toISOString().slice(0, 10)
desofi.value = cboO[cboO.selectedIndex].text
desper.value = cboP[cboP.selectedIndex].text

// eventos
cboO.addEventListener('change', (e) => {
  document.getElementById('desofi').value = e.target.options[e.target.selectedIndex].text
})
cboP.addEventListener('change', (e) => {
  document.getElementById('desper').value = e.target.options[e.target.selectedIndex].text
})
cboF.addEventListener('change', function(e) {
  const currentYear = new Date(document.querySelector("#desfec").value).getFullYear()
  const currentMonth = new Date(document.querySelector("#desfec").value).getMonth() +1

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
desfec.addEventListener('change', function(e) {
  const formato = document.getElementById('cbofor').value
  const currentYear = new Date(document.querySelector("#desfec").value).getFullYear()
  const currentMonth = new Date(document.querySelector("#desfec").value).getMonth() +1

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
