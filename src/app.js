// @ts-check
import onChange from 'on-change';

import render from './render.js';

import { getNetworks, createNetworkForm, getNetworkData, calculateNewDevices } from './networkForm.js';

const initialDevices = {
  isp: {
    name: 'ISP',
    interfaces: {
      external: { name: 'ens18', ip: '<ВНЕШНИЙ>', mask: '24', gateway: '<ВНЕШНИЙ>', destination: 'Интернет', netAddress: '', netName: 'external' },
      hqRtr: { name: 'ens19', ip: '172.16.4.1', mask: '28', gateway: '-', destination: 'HQ-RTR', netAddress: '172.16.4.0', netName: 'ISP-HQ' },
      brRtr: { name: 'ens20', ip: '172.16.5.1', mask: '28', gateway: '-', destination: 'BR-RTR', netAddress: '172.16.5.0', netName: 'ISP-BR' },
    },
  },
  hqRtr: {
    name: 'HQ-RTR',
    interfaces: {
      isp: { name: 'ens18', ip: '172.16.4.2', mask: '28', gateway: '172.16.4.1', destination: 'ISP', netAddress: '172.16.4.0', netName: 'ISP-HQ' },
      brRtr: { name: 'gre1', ip: '10.5.5.1', mask: '30', gateway: '-', destination: 'BR-RTR', netAddress: '10.5.5.0', netName: 'GRE' },
      hqSrv: { name: 'VLAN100', ip: '192.168.100.1', mask: '26', gateway: '-', destination: 'HQ-SRV', netAddress: '192.168.100.0', netName: 'SRV-Net' },
      hqCli: { name: 'VLAN200', ip: '192.168.200.1', mask: '28', gateway: '-', destination: 'HQ-CLI', netAddress: '192.168.200.0', netName: 'CLI-Net' },
      vlan999: { name: 'VLAN999', ip: '192.168.99.1', mask: '29', gateway: '-', destination: 'VLAN999 (?)', netAddress: '192.168.99.0', netName: 'vlan999' },
    },
  },
  hqSrv: {
    name: 'HQ-SRV',
    interfaces: {
      hqRtr: { name: 'ens18', ip: '192.168.100.2', mask: '26', gateway: '192.168.100.1', destination: 'HQ-RTR', netAddress: '192.168.100.0', netName: 'SRV-Net' },
    },
  },
  hqCli: {
    name: 'HQ-CLI',
    interfaces: {
      hqRtr: { name: 'ens18', ip: '192.168.200.2', mask: '28', gateway: '192.168.200.1', destination: 'HQ-RTR', netAddress: '192.168.200.0', netName: 'CLI-Net' },
    },
  },
  brRtr: {
    name: 'BR-RTR',
    interfaces: {
      isp: { name: 'ens18', ip: '172.16.5.2', mask: '28', gateway: '172.16.5.1', destination: 'ISP', netAddress: '172.16.5.0', netName: 'ISP-BR' },
      brSrv: { name: 'ens19', ip: '192.168.0.1', mask: '27', gateway: '-', destination: 'BR-SRV', netAddress: '192.168.0.0', netName: 'BR-Net' },
      hqRtr: { name: 'gre1', ip: '10.5.5.2', mask: '30', gateway: '-', destination: 'HQ-RTR', netAddress: '10.5.5.0', netName: 'GRE' },
    },
  },
  brSrv: {
    name: 'BR-SRV',
    interfaces: {
      brRtr: { name: 'ens18', ip: '192.168.0.2', mask: '27', gateway: '192.168.0.1', destination: 'BR-RTR', netAddress: '192.168.0.0', netName: 'BR-Net' },
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
  state.devices = initialDevices;

  const networks = getNetworks(initialDevices);
  createNetworkForm(networks, elements.networkFormContainer);

  // @ts-ignore
  document.querySelector('#network-form button').addEventListener('click', () => {
    const networkData = getNetworkData();
    console.log(networkData);
    const newDevices = calculateNewDevices(initialDevices, networkData);
    console.log(newDevices);
    state.devices = newDevices;
  });
};

export default app;
