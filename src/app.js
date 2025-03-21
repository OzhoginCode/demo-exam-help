// @ts-check
import onChange from 'on-change';

import render from './render.js';

const devices = {
  isp: {
    name: 'ISP',
    interfaces: {
      external: { name: 'ens18', ip: '<ВНЕШНИЙ>', mask: '24', gateway: '<ВНЕШНИЙ>', destination: 'Интернет' },
      hqRtr: { name: 'ens19', ip: '172.16.4.1', mask: '28', gateway: '-', destination: 'HQ-RTR' },
      brRtr: { name: 'ens20', ip: '172.16.5.1', mask: '28', gateway: '-', destination: 'BR-RTR' },
    },
  },
  hqRtr: {
    name: 'HQ-RTR',
    interfaces: {
      isp: { name: 'ens18', ip: '172.16.4.2', mask: '28', gateway: '172.16.4.1', destination: 'ISP' },
      brRtr: { name: 'gre1', ip: '10.5.5.1', mask: '30', gateway: '-', destination: 'BR-RTR' },
      hqCli: { name: 'VLAN100', ip: '192.168.100.1', mask: '28', gateway: '-', destination: 'HQ-CLI' },
      hqSrv: { name: 'VLAN200', ip: '192.168.200.1', mask: '28', gateway: '-', destination: 'HQ-SRV' },
      vlan999: { name: 'VLAN999', ip: '192.168.99.1', mask: '29', gateway: '-', destination: 'VLAN999 (?)' },
    },
  },
  hqSrv: {
    name: 'HQ-SRV',
    interfaces: {
      hqRtr: { name: 'ens18', ip: '192.168.100.2', mask: '28', gateway: '192.168.100.1', destination: 'HQ-RTR' },
    },
  },
  hqCli: {
    name: 'HQ-CLI',
    interfaces: {
      hqRtr: { name: 'ens18', ip: '192.168.200.2', mask: '28', gateway: '192.168.200.1', destination: 'HQ-RTR' },
    },
  },
  brRtr: {
    name: 'BR-RTR',
    interfaces: {
      isp: { name: 'ens18', ip: '172.16.5.2', mask: '28', gateway: '172.16.5.1', destination: 'ISP' },
      brSrv: { name: 'ens19', ip: '192.168.0.1', mask: '28', gateway: '-', destination: 'BR-SRV' },
      hqRtr: { name: 'gre1', ip: '10.5.5.2', mask: '30', gateway: '-', destination: 'HQ-RTR' },
    },
  },
  brSrv: {
    name: 'BR-SRV',
    interfaces: {
      brRtr: { name: 'ens18', ip: '192.168.0.2', mask: '28', gateway: '192.168.0.1', destination: 'BR-RTR' },
    },
  },
};

const app = () => {
  const elements = {
    ipTableContainer: document.getElementById('ip-table-container'),
    textContainer: document.getElementById('text-container'),
  };

  const initState = {
    devices: [],
  };

  const state = onChange(initState, render(elements, initState));

  // @ts-ignore
  state.devices = devices;

  // контроллеры
};

export default app;
