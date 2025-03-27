/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */

export function createNetworkForm(networks, container) {
  const form = document.createElement('form');
  form.id = 'network-form';
  form.innerHTML = '<h3>Настройки сетей</h3>';

  networks.forEach((network) => {
    const div = document.createElement('div');
    div.className = 'network-input';

    const label = document.createElement('label');
    label.textContent = `Сеть ${network}:`;

    const addressInput = document.createElement('input');
    addressInput.type = 'text';
    addressInput.placeholder = 'Адрес сети (напр. 192.168.0.0)';
    addressInput.dataset.network = network;

    const maskInput = document.createElement('input');
    maskInput.type = 'text';
    maskInput.placeholder = 'Маска (напр. 24)';
    maskInput.dataset.network = network;

    div.append(label, addressInput, maskInput);
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
    if (input.placeholder.includes('Адрес сети')) {
      networkData[network].address = input.value.trim();
    } else {
      networkData[network].mask = input.value.trim();
    }
  });

  return networkData;
}

function ipToInt(ip) {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

function intToIp(num) {
  return [
    (num >>> 24) & 0xFF,
    (num >>> 16) & 0xFF,
    (num >>> 8) & 0xFF,
    num & 0xFF,
  ].join('.');
}

function getHostPart(ipInt, maskLength) {
  const mask = maskLength ? 0xFFFFFFFF << (32 - maskLength) : 0;
  return ipInt & ~mask;
}

export function calculateNewDevices(initialDevices, networkData) {
  const newDevices = JSON.parse(JSON.stringify(initialDevices));

  Object.entries(networkData).forEach(([originalNet, data]) => {
    if (!data.address || !data.mask) return;

    const newNetworkInt = ipToInt(data.address);
    const newMask = parseInt(data.mask, 10);

    Object.values(newDevices).forEach((device) => {
      Object.values(device.interfaces).forEach((intf) => {
        if (intf.netAddress === originalNet) {
          const originalIpInt = ipToInt(intf.ip);
          const originalMask = parseInt(intf.mask, 10);

          const hostPart = getHostPart(originalIpInt, originalMask);
          const newIpInt = (newNetworkInt & (0xFFFFFFFF << (32 - newMask))) | hostPart;

          intf.ip = intToIp(newIpInt);
          intf.mask = data.mask.toString();
          intf.netAddress = data.address;

          if (intf.gateway !== '-') {
            const gatewayInt = ipToInt(intf.gateway);
            const gwHostPart = getHostPart(gatewayInt, originalMask);
            const newGwInt = (newNetworkInt & (0xFFFFFFFF << (32 - newMask))) | gwHostPart;
            intf.gateway = intToIp(newGwInt);
          }
        }
      });
    });
  });

  return newDevices;
}
