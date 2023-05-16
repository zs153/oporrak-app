const destur = document.getElementById('destur')
const initur = document.getElementById('initur')
const fintur = document.getElementById('fintur')
const loctur = document.getElementById('loctur')

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
  const desturValue = destur.value.trim().toUpperCase()
  const locturValue = loctur.value.trim().toUpperCase()
  const initurValue = initur.value
  const finturValue = fintur.value

  if (desturValue === '') {
    setError(destur, 'Descripción requerida')
    setTimeout(function () {
      setSuccess(destur)
    }, 3000)
    return false
  }
  if (isNaN(Date.parse(initurValue))) {
    setError(initur, 'Fecha requerida')
    setTimeout(function () {
      setSuccess(initur)
    }, 3000)
    return false
  }
  if (isNaN(Date.parse(finturValue))) {
    setError(fintur, 'Fecha requerida')
    setTimeout(function () {
      setSuccess(fintur)
    }, 3000)
    return false
  }
  if (locturValue === '') {
    setError(loctur, 'Localización requerida')
    setTimeout(function () {
      setSuccess(loctur)
    }, 3000)
    return false
  }

  return true
}
