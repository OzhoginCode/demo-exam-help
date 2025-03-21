/* eslint-disable no-param-reassign */
// networkForm.js
export function getNetworks(devices) {
  const networks = new Set();
  Object.values(devices).forEach((device) => {
    Object.values(device.interfaces).forEach((intf) => {
      if (intf.netAddress && !intf.netAddress.startsWith('<')) {
        networks.add(intf.netAddress);
      }
    });
  });
  return Array.from(networks);
}

export function createNetworkForm(networks, container) {
  const form = document.createElement('form');
  form.id = 'network-form';
  form.innerHTML = '<h3>Настройки сетей</h3>';

  networks.forEach((network) => {
    const div = document.createElement('div');
    div.className = 'network-input';

    const label = document.createElement('label');
    label.textContent = `Сеть ${network}:`;

    const baseInput = document.createElement('input');
    baseInput.type = 'text';
    baseInput.placeholder = 'Базовый адрес (напр. 192.168.0)';
    baseInput.dataset.network = network;

    const maskInput = document.createElement('input');
    maskInput.type = 'text';
    maskInput.placeholder = 'Маска (напр. 24)';
    maskInput.dataset.network = network;

    div.append(label, baseInput, maskInput);
    form.append(div);
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.textContent = 'Обновить';
  form.append(submitButton);

  container.innerHTML = '';
  container.append(form);
}

export function getNetworkData() {
  const inputs = document.querySelectorAll('#network-form input');
  const networkData = {};

  inputs.forEach((input) => {
    const { network } = input.dataset;
    if (!networkData[network]) networkData[network] = {};
    if (input.placeholder.includes('Базовый')) {
      networkData[network].base = input.value.trim();
    } else {
      networkData[network].mask = input.value.trim();
    }
  });

  return networkData;
}

export function calculateNewDevices(initialDevices, networkData) {
  const newDevices = JSON.parse(JSON.stringify(initialDevices));

  Object.entries(networkData).forEach(([originalNet, { base, mask }]) => {
    if (!base || !mask) return;

    Object.values(newDevices).forEach((device) => {
      Object.values(device.interfaces).forEach((intf) => {
        if (intf.netAddress === originalNet) {
          intf.mask = mask;
          const [lastOctet] = intf.ip.split('.').slice(-1);
          intf.ip = `${base}.${lastOctet}`;
          intf.netAddress = `${base}.0`;

          if (intf.gateway !== '-') {
            const gwParts = intf.gateway.split('.');
            gwParts.splice(0, 3, ...base.split('.'));
            intf.gateway = gwParts.join('.');
          }
        }
      });
    });
  });

  return newDevices;
}
