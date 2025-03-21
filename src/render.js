// @ts-check
/* eslint-disable no-param-reassign */

import generateText from './generateText';

const renderTable = (elements, { devices }) => {
  const table = document.createElement('table');

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Имя устройства</th>
      <th>Назначение (куда смотрит)</th>
      <th>IP-адрес</th>
      <th>Маска</th>
      <th>Шлюз по умолчанию</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  Object.values(devices).forEach(({ name, interfaces }) => {
    const interfaceEntries = Object.values(interfaces);
    if (!interfaceEntries.length) return;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td rowspan="${interfaceEntries.length}">${name}</td>
      <td>${interfaceEntries[0].destination || '-'}</td>
      <td>${interfaceEntries[0].ip}</td>
      <td>${interfaceEntries[0].mask}</td>
      <td>${interfaceEntries[0].gateway}</td>
    `;

    tbody.appendChild(row);

    for (let i = 1; i < interfaceEntries.length; i += 1) {
      const intf = interfaceEntries[i];
      const subRow = document.createElement('tr');
      subRow.innerHTML = `
        <td>${intf.destination || '-'}</td>
        <td>${intf.ip}</td>
        <td>${intf.mask}</td>
        <td>${intf.gateway}</td>
      `;
      tbody.appendChild(subRow);
    }
  });

  table.appendChild(tbody);

  elements.ipTableContainer.innerHTML = '';
  elements.ipTableContainer.appendChild(table);
};

const renderText = (elements, state) => {
  // @ts-ignore
  const text = generateText(state);

  // const textEl = document.createElement('div');
  // const textChunks = text.split('\n');

  // textChunks.forEach((pText) => {
  //   const p = document.createElement('p');
  //   p.innerHTML = pText || '&nbsp;';
  //   textEl.appendChild(p);
  // });

  elements.textContainer.innerHTML = text;
  // elements.textContainer.appendChild(textEl);
};

// eslint-disable-next-line no-unused-vars
const render = (elements, state) => (path, value) => {
  switch (path) {
    case 'devices':
      renderTable(elements, state);
      renderText(elements, state);
      break;

    default:
      break;
  }
};

export default render;
