/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
export function getNetworks(devices) {
  const set = new Set();

  Object.values(devices).forEach((device) => {
    Object.values(device.interfaces).forEach(({ netAddress, netName, mask }) => {
      if (netName === 'external') return;

      set.add(JSON.stringify({ netAddress, netName, mask }));
    });
  });

  return Array.from(set).map((item) => JSON.parse(item));
}

export function createNetworkForm(networks, container) {
  const form = document.createElement('form');
  form.id = 'network-form';
  form.innerHTML = '<h3>Настройки сетей</h3>';

  networks.forEach((network) => {
    const div = document.createElement('div');
    div.className = 'network-input';

    const label = document.createElement('label');
    label.textContent = `Сеть ${network.netName}:`;

    const addressInput = document.createElement('input');
    addressInput.type = 'text';
    addressInput.placeholder = `Адрес сети (${network.netAddress})`;
    addressInput.dataset.netAddress = network.netAddress;

    const maskInput = document.createElement('input');
    maskInput.type = 'text';
    maskInput.placeholder = `Маска (${network.mask})`;
    maskInput.dataset.netAddress = network.netAddress;

    div.append(label, addressInput, maskInput);
    form.append(div);
  });

  const vlanSection = document.createElement('div');
  vlanSection.innerHTML = '<h4>Настройки названий VLAN</h4>';
  const vlan100NetworkInput = document.createElement('input');
  vlan100NetworkInput.type = 'text';
  vlan100NetworkInput.placeholder = 'Название интерфейса vlan100';
  vlan100NetworkInput.id = 'vlan100-name';
  vlan100NetworkInput.value = 'vlan100';

  const vlan200NetworkInput = document.createElement('input');
  vlan200NetworkInput.type = 'text';
  vlan200NetworkInput.placeholder = 'Название интерфейса vlan200';
  vlan200NetworkInput.id = 'vlan200-name';
  vlan200NetworkInput.value = 'vlan200';

  const vlan999NetworkInput = document.createElement('input');
  vlan999NetworkInput.type = 'text';
  vlan999NetworkInput.placeholder = 'Название интерфейса vlan999';
  vlan999NetworkInput.id = 'vlan999-name';
  vlan999NetworkInput.value = 'vlan999';

  vlanSection.append(vlan100NetworkInput, vlan200NetworkInput, vlan999NetworkInput);
  form.append(vlanSection);

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
  const vlanNames = {};

  inputs.forEach((input) => {
    const { netAddress } = input.dataset;

    // Обрабатываем VLAN названия
    if (input.id === 'vlan100-name') {
      vlanNames.vlan100 = input.value.trim() || 'vlan100';
    } else if (input.id === 'vlan200-name') {
      vlanNames.vlan200 = input.value.trim() || 'vlan200';
    } else if (input.id === 'vlan999-name') {
      vlanNames.vlan999 = input.value.trim() || 'vlan999';
    }

    // Обрабатываем сетевые данные
    if (netAddress) {
      if (!networkData[netAddress]) networkData[netAddress] = {};
      if (input.placeholder.includes('Адрес сети')) {
        networkData[netAddress].address = input.value.trim();
      } else {
        networkData[netAddress].mask = input.value.trim();
      }
    }
  });

  return { networkData, vlanNames };
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

export function applyVlanNames(devices, vlanNames) {
  const updatedDevices = JSON.parse(JSON.stringify(devices));

  if (updatedDevices.hqRtr?.interfaces) {
    if (updatedDevices.hqRtr.interfaces.hqSrv && vlanNames.vlan100) {
      updatedDevices.hqRtr.interfaces.hqSrv.name = vlanNames.vlan100;
    }
    if (updatedDevices.hqRtr.interfaces.hqCli && vlanNames.vlan200) {
      updatedDevices.hqRtr.interfaces.hqCli.name = vlanNames.vlan200;
    }
    if (updatedDevices.hqRtr.interfaces.vlan999 && vlanNames.vlan999) {
      updatedDevices.hqRtr.interfaces.vlan999.name = vlanNames.vlan999;
    }
  }

  return updatedDevices;
}
