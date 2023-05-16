// const
const descur = document.getElementById('descur')
const cboest = document.getElementById('cboest')

// proc
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
  const descurValue = descur.value.trim()
  const cboestValue = cboest.value

  if (descurValue === '') {
    setError(descur, 'Descripción requerida')
    setTimeout(function () {
      setSuccess(descur)
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
