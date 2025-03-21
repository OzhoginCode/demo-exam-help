// @ts-check
import onChange from 'on-change';

import render from './render.js';

import { getNetworks, createNetworkForm, getNetworkData, calculateNewDevices } from './networkForm.js';

const devices = {
  isp: {
    name: 'ISP',
    interfaces: {
      external: { name: 'ens18', ip: '<ВНЕШНИЙ>', mask: '24', gateway: '<ВНЕШНИЙ>', destination: 'Интернет', netAddress: '' },
      hqRtr: { name: 'ens19', ip: '172.16.4.1', mask: '28', gateway: '-', destination: 'HQ-RTR', netAddress: '172.16.4.0' },
      brRtr: { name: 'ens20', ip: '172.16.5.1', mask: '28', gateway: '-', destination: 'BR-RTR', netAddress: '172.16.5.0' },
    },
  },
  hqRtr: {
    name: 'HQ-RTR',
    interfaces: {
      isp: { name: 'ens18', ip: '172.16.4.2', mask: '28', gateway: '172.16.4.1', destination: 'ISP', netAddress: '172.16.4.0' },
      brRtr: { name: 'gre1', ip: '10.5.5.1', mask: '30', gateway: '-', destination: 'BR-RTR', netAddress: '10.5.5.0' },
      hqCli: { name: 'VLAN100', ip: '192.168.100.1', mask: '28', gateway: '-', destination: 'HQ-CLI', netAddress: '192.168.100.0' },
      hqSrv: { name: 'VLAN200', ip: '192.168.200.1', mask: '28', gateway: '-', destination: 'HQ-SRV', netAddress: '192.168.200.0' },
      vlan999: { name: 'VLAN999', ip: '192.168.99.1', mask: '29', gateway: '-', destination: 'VLAN999 (?)', netAddress: '192.168.99.0' },
    },
  },
  hqSrv: {
    name: 'HQ-SRV',
    interfaces: {
      hqRtr: { name: 'ens18', ip: '192.168.100.2', mask: '28', gateway: '192.168.100.1', destination: 'HQ-RTR', netAddress: '192.168.100.0' },
    },
  },
  hqCli: {
    name: 'HQ-CLI',
    interfaces: {
      hqRtr: { name: 'ens18', ip: '192.168.200.2', mask: '28', gateway: '192.168.200.1', destination: 'HQ-RTR', netAddress: '192.168.200.0' },
    },
  },
  brRtr: {
    name: 'BR-RTR',
    interfaces: {
      isp: { name: 'ens18', ip: '172.16.5.2', mask: '28', gateway: '172.16.5.1', destination: 'ISP', netAddress: '172.16.5.0' },
      brSrv: { name: 'ens19', ip: '192.168.0.1', mask: '28', gateway: '-', destination: 'BR-SRV', netAddress: '192.168.0.0' },
      hqRtr: { name: 'gre1', ip: '10.5.5.2', mask: '30', gateway: '-', destination: 'HQ-RTR', netAddress: '10.5.5.0' },
    },
  },
  brSrv: {
    name: 'BR-SRV',
    interfaces: {
      brRtr: { name: 'ens18', ip: '192.168.0.2', mask: '28', gateway: '192.168.0.1', destination: 'BR-RTR', netAddress: '192.168.0.0' },
    },
  },
};

const app = () => {
  const elements = {
    ipTableContainer: document.getElementById('ip-table-container'),
    textContainer: document.getElementById('text-container'),
    networkFormContainer: document.getElementById('network-form-container'),
  };

  const initState = {
    devices: [],
  };

  const state = onChange(initState, render(elements, initState));

  // @ts-ignore
  state.devices = devices;

  const initialDevices = JSON.parse(JSON.stringify(devices));
  const networks = getNetworks(initialDevices);
  createNetworkForm(networks, elements.networkFormContainer);

  // @ts-ignore
  document.querySelector('#network-form button').addEventListener('click', () => {
    const networkData = getNetworkData();
    const newDevices = calculateNewDevices(initialDevices, networkData);
    console.log(newDevices);
    state.devices = newDevices;
  });
};

export default app;
