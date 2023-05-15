const openModal = () => {
  const modal = document.getElementById('modal-matricula')

  modal.style.display = 'block'
  modal.setAttribute('aria-hidden', 'false', 'show')
  modal.classList.add('show')
}
const closeModal = () => {
  const modal = document.getElementById('modal-matricula')

  modal.setAttribute('aria-hidden', 'true');
  modal.classList.remove('show');
  modal.style.display = 'none';
}

  // eventos
  document.getElementById('checkShow').addEventListener('change', (itm) => {
    if (itm.target.checked) {
      document.cookie = "verPan=0;path=/user"
    } else {
      document.cookie = "verPan=1;path=/user"
    }
  })