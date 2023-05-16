const desmat = document.getElementById('desmat')
const inimat = document.getElementById('inimat')
const finmat = document.getElementById('finmat')
const cboest = document.getElementById('cboest')

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
const validate = () => {
  const desmatValue = desmat.value.trim().toUpperCase()
  const inimatValue = inimat.value
  const finmatValue = finmat.value
  const cboestValue = cboest.value

  if (desmatValue === '') {
    setError(desmat, 'Descripción requerida')
    setTimeout(function () {
      setSuccess(desmat)
    }, 3000)
    return false
  }
  if (isNaN(Date.parse(inimatValue))) {
    setError(inimat, 'Fecha requerida')
    setTimeout(function () {
      setSuccess(inimat)
    }, 3000)
    return false
  }
  if (isNaN(Date.parse(finmatValue))) {
    setError(finmat, 'Fecha requerida')
    setTimeout(function () {
      setSuccess(finmat)
    }, 3000)
    return false
  }
  if (cboestValue === '-1') {
    setError(cboest, 'Estado requerido')
    setTimeout(function () {
      setSuccess(cboest)
    }, 3000)
    return false
  }

  return true
}
