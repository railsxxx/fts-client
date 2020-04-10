//https://wesbos.com/template-strings-html/

function renderHeader(rows){
  let header = ["Resource"];
  for (let c = 1; c < rows[0].length; c++) {
    header.push("Transport");
  }
  return header.map(head => `
  <th>
    ${head}
  </th>
  `).join('');
}

function renderRow(cells) {
  return cells.map(cell => `
  <td>
    ${cell != "null" ? `${cell.render()}` : ''}
  </td>
  `).join('');
}

function renderTable(rows) {
  return `
	<table style="width:100%">
    <tr>
      ${renderHeader(rows)}
    </tr>
    ${rows.map(row => `
    <tr>
      ${renderRow(row)}
    </tr>
    `).join('')}
	</table>
  `;
}

// exorts #########################
module.exports.renderTable = renderTable;