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
    cell.innerHTML = `<div class="align-items-center">
      <span class="avatar avatar-rounded bg-green-lt">
        <h6>${element.IDTURN}</h6>
      </span>
    </div>`
    row.appendChild(cell)

    // col2
    cell = document.createElement('td')
    cell.innerHTML = `<div class="d-flex align-items-center">
        <div class="flex-fill">
          <div class="font-weight-medium">${element.DESTUR}</div>
        </div>
      </div>`
    row.appendChild(cell)

    // col2
    cell = document.createElement('td')
    cell.classList.add("w-7")
    cell.innerHTML = `<div class="d-flex align-items-center">
        <div class="flex-fill">
          <div class="font-weight-medium">${element.STRINI}</div>
        </div>
      </div>`
    row.appendChild(cell)

    // col3
    cell = document.createElement('td')
    cell.classList.add("w-7")
    cell.innerHTML = `<div class="d-flex align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.STRFIN}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col4
    cell = document.createElement('td')
    cell.classList.add("w-8")
    cell.innerHTML = `<div class="d-flex align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.INIHOR} - ${element.FINHOR}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col5
    cell = document.createElement('td')
    cell.classList.add("w-20")
    cell.innerHTML = `<div class="d-flex align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.LOCTUR}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col6
    cell = document.createElement('td')
    cell.classList.add("w-5")
    cell.innerHTML = `<ul class="dots-menu">
      <li class="nav-item drop-right">
        <a href="#" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke-width="1" fill="none" d="M12 18.7q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687.288-.288.688-.288.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.688.288-.287.688-.287.4 0 .688.287.287.288.287.688 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687Q11.6 5.3 12 5.3q.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Z"/>
          </svg>
        </a>
        <ul>
          <li class="nav-item">
            <a href="/admin/cursos/turnos/edit/${curso.IDCURS}/${element.IDTURN}" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke-width=".4" fill="none" d="M6.85 20.575q-.6 0-1.012-.412-.413-.413-.413-1.013V4.85q0-.6.413-1.013.412-.412 1.012-.412h7.825L18.6 7.35v3.4h-.65V7.675h-3.6V4.05h-7.5q-.3 0-.55.25-.25.25-.25.55v14.275q0 .3.25.55.25.25.55.25h4.25v.65Zm-.8-.65V4.05 19.925ZM17.025 14.6l.45.425-3.75 3.75v1.1h1.1l3.775-3.75.45.45-3.95 3.95h-2v-2Zm2.025 1.975L17.025 14.6l1.05-1.05q.225-.2.525-.2.3 0 .475.2l1 1q.2.2.2.487 0 .288-.2.538Z"/></svg>
              </svg>
              Editar
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" onclick="{document.getElementById('idturn').value ='${element.IDTURN}', document.getElementById('msgbor').innerHTML ='<p>${element.DESTUR}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-borrarTurno">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke-width=".4" fill="none" d="M7.85 19.575q-.6 0-1.025-.425-.425-.425-.425-1.025v-12.1h-.975V5.4h3.6v-.675H15V5.4h3.6v.625h-.975V18.15q0 .6-.425 1.013-.425.412-1.025.412Zm9.125-13.55H7.05v12.1q0 .35.225.575.225.225.575.225h8.325q.3 0 .55-.25.25-.25.25-.55Zm-6.85 10.925h.625V8h-.625Zm3.15 0h.625V8h-.625ZM7.05 6.025V18.925 18.125Z"/>
              </svg>
              Borrar
            </a>
          </li>
          <div class="nav-divider"></div>
          <li class="nav-item">
            <a href="/admin/cursos/turnos/usuarios/${curso.IDCURS}/${element.IDTURN}" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke-width=".4" fill="none" d="M3.35 15.8v-.625h7.625v.625Zm0-7v-.625h7.625V8.8Zm12.7 8.725-2.6-2.575.45-.45 2.125 2.125 4.25-4.25.425.475Zm0-7-2.6-2.575.45-.45 2.125 2.125 4.25-4.25.425.475Z"/></svg>
              Incripción de usuarios
            </a>
          </li>
        </ul>
      </li>
    </ul>`
    row.appendChild(cell)

    table.appendChild(row)
  })

  createPages()
}

const createPages = () => {
  let str = "<ul>";

  if (hasPrevTurnos) {
    str += "<li class='page-item previous no'><a href='/admin/cursos/turnos/" + JSON.stringify(curso.IDCURS) + "?cursor=" + JSON.stringify(cursor) + "&part=" + document.getElementById('buscarTurnoBox').value + "&dir=prev' class='nav-link'>&#9664 Anterior</a>";
  } else {
    str += "<li><a href='#' class='nav-link disabled'>&#9664 Anterior</a>";
  }

  if (hasNextTurnos) {
    str += "<li class='page-item next no'><a href='/admin/cursos/turnos/" + JSON.stringify(curso.IDCURS) + "?cursor=" + JSON.stringify(cursor) + "&part=" + document.getElementById('buscarTurnoBox').value + "&dir=next' class='nav-link'>Siguiente &#9654</a>";
  } else {
    str += "<li><a href='#' class='nav-link disabled'>Siguiente &#9654</a>";
  }
  str += "</ul>";

  document.getElementById('pagination-wrapper').innerHTML = str;
}