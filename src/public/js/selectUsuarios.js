// inicializa sort
document.querySelectorAll(".sortable th").forEach(headerCell => {
  headerCell.addEventListener("click", () => {
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
    const currentIsAscending = headerCell.classList.contains("th-sort-asc");

    sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
  });
});

// funcs
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
const sortTableByColumn = (table, column, asc = true) => {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  const sortedRows = rows.sort((a, b) => {
    const aColText = a.cells[column].textContent;
    const bColText = b.cells[column].textContent;

    return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
  });

  for (let row of sortedRows) {
    tBody.appendChild(row);
  }

  table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}
const buildTable = (state) => {
  const table = document.getElementById('table-body')
  const myList = state.querySet
  table.innerHTML = ''

  myList.map(element => {
    // col1
    const row = document.createElement('tr')
    let cell = document.createElement('td')
    cell.classList.add("w-4")
    cell.innerHTML = `<input class="form-check-input m-0 align-middle" type="checkbox" aria-label="Select invoice">`
    row.appendChild(cell)

    // col2
    cell = document.createElement('td')
    cell.innerHTML = `<div class="d-flex align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.NOMUSU}</div>
      </div>
    </div>
    <div class="text-muted">
      <small class="text-reset">Oficina: ${element.DESOFI}</small>
    </div>`
    row.appendChild(cell)

    // col3
    cell = document.createElement('td')
    cell.style.display = 'none'
    cell.value = element.IDUSUA
    row.appendChild(cell)

    table.appendChild(row)
  })

  createPages()
}

const createPages = () => {
  let str = "<ul>";

  if (hasPrevUsuarios) {
    str += "<li class='page-item previous no'><a href='/admin/cursos/matriculas/usuarios/add/" + curso.IDCURS + "/" + matricula.IDMATR + "?cursor=" + JSON.stringify(cursor) + "&part=" + document.getElementById('buscarUsuarioBox').value + "&dir=prev' class='nav-link'>&#9664 Anterior</a>";
  } else {
    str += "<li><a href='#' class='nav-link disabled'>&#9664 Anterior</a>";
  }

  if (hasNextUsuarios) {
    str += "<li class='page-item next no'><a href='/admin/cursos/matriculas/usuarios/add/" + curso.IDCURS + "/" + matricula.IDMATR + "?cursor=" + JSON.stringify(cursor) + "&part=" + document.getElementById('buscarUsuarioBox').value + "&dir=next' class='nav-link'>Siguiente &#9654</a>";
  } else {
    str += "<li><a href='#' class='nav-link disabled'>Siguiente &#9654</a>";
  }
  str += "</ul>";

  document.getElementById('pagination-wrapper').innerHTML = str;
}
const addUsuarios = () => {
  let arrUsuarios = []

  document.querySelectorAll('input[type=checkbox]').forEach(e => {
    if (e.checked) {
      arrUsuarios.push(e.parentNode.parentNode.cells[2].value)
    }
  })
  document.getElementById('arrusu').value = JSON.stringify(arrUsuarios)
}