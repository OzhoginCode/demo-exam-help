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

export default () => `
<p>Запуск консоли ISP</p>
<p>login root</p>
<p>Password toor</p>
<p>Накатываем обновления</p>
<p><code>apt-get update</code></p>
<p><code>apt-get install –y NetworkManager-tui iptables</code></p>
<p><code>systemctl enable --now NetworkManager</code></p>
<p><code>nmtui</code></p>
<p>настраиваем первый интерфейс</p>
<p>задаем имя профиля в соответствии с номером оборудования</p>
<p>выставляем ручной ip для ${devices.isp.interfaces.hqRtr.name}: ${devices.isp.interfaces.hqRtr.ip}/${devices.isp.interfaces.hqRtr.mask}</p>
<p>аналогично настраиваем ${devices.isp.interfaces.brRtr.name}: ${devices.isp.interfaces.brRtr.ip}/${devices.isp.interfaces.brRtr.mask}</p>
<p><code>hostnamectl hostname IPS</code></p>
<p>проверяем <code>ip –br a</code></p>
<p>настраиваем маршрутизацию</p>
<p><code>vim /etc/net/sysctl.conf</code></p>
<p>меняем 0 на 1 в forward</p>
<p>настраиваем nat</p>
<p><code>iptables –t nat –j MASQUERADE –A POSTROUTING –o ens18</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable iptables --now # нужно проверить, работает ли эта команда именно на ISP</code></p>
<br>
<p>Запуск консоли HQ-RTR</p>
<p>Открываем конфигурацию ${devices.hqRtr.interfaces.isp.name} в vim /etc/net/ifaces/${devices.hqRtr.interfaces.isp.name}/options</p>
<p><code>BOOTPROTO=static</code></p>
<p><code>SYSTEMD_BOOTPROTO=static</code></p>
<p>Создаем файл конфигурации <code>vim /etc/net/ifaces/ens18/ipv4address</code></p>
<p>${devices.hqRtr.interfaces.isp.ip}/${devices.hqRtr.interfaces.isp.mask}</p>
<p>Создаем файл конфигурации <code>vim /etc/net/ifaces/ens18/ipv4route</code></p>
<p>Вводим строку <code>default via ${devices.isp.interfaces.hqRtr.ip}</code></p>
<p>Создаем файл конфигурации <code>vim /etc/net/ifaces/ens18/resolv.conf</code></p>
<p><code>nameserver 8.8.8.8</code></p>
<p><code>iptables –t nat –j MASQUERADE –A POSTROUTING</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable iptables --now</code></p>
<p>Накатываем обновления <code>apt-get update</code></p>
<p><code>apt-get install –y NetworkManager-tui</code></p>
<p><code>systemctl enable --now NetworkManager</code></p>
<p><code>nmtui</code></p>
<p><code>hostnamectl set-hostname HQ-RTR.au-team.irpo</code></p>
<br>
<p>Запуск консоли BR-RTR</p>
<p>Открываем конфигурацию ens18 в vim vim /etc/net/ifaces/ens18/options</p>
<p>BOOTPROTO=static</p>
<p>TYPE=eth</p>
<p>CONFIG_WIRELESS=no</p>
<p>SYSTEMD_BOOTPROTO=static</p>
<p>CONFIG_IPV4=yes</p>
<p>DISABLE=no</p>
<p>MM_CONTROLLED=no</p>
<p>SYSTEMD_CONTROLLED=no</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4address</p>
<p>${devices.brRtr.interfaces.isp.ip}/${devices.brRtr.interfaces.isp.mask}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
<p>Вводим строку default via ${devices.isp.interfaces.brRtr.ip}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>nameserver 8.8.8.8</p>
<p>vim /etc/net/sysctl.conf</p>
<p>меняем 0 на 1 в forward</p>
<p>iptables –t nat –j MASQUERADE –A POSTROUTING</p>
<p>iptables-save > /etc/sysconfig/iptables</p>
<p>systemctl enable iptables --now</p>
<p>apt-get update</p>
<p>apt-get install –y NetworkManager-tui</p>
<p>systemctl enable --now NetworkManager</p>
<br>
<p>Запуск консоли BR-RTR</p>
<p>создаем папку mkdir /etc/net/ifaces/ens19</p>
<p>Копируем файл конфигурации cp /etc/net/ifaces/ens18/options /etc/net/ifaces/ens19/options</p>
<p>редактируем vim /etc/net/ifaces/ens19/options</p>
<p>NM_CONTROLLED=yes</p>
<p>перезапускаем network и NetworkManager</p>
<p>запускаем nmtui</p>
<p>редактируем 1 соединение ens19</p>
<p>имя профиля ставим BR-SRV</p>
<p>ip ${devices.brRtr.interfaces.brSrv.ip}/${devices.brRtr.interfaces.brSrv.mask}</p>
<br>
<p>Запуск консоли BR-SRV</p>
<p>hostnamectl hostname BR-SRV.au-team.irpo</p>
<p>Открываем конфигурацию ens18 в vim vim /etc/net/ifaces/ens18/options</p>
<p>BOOTPROTO=static</p>
<p>TYPE=eth</p>
<p>CONFIG_WIRELESS=no</p>
<p>SYSTEMD_BOOTPROTO=static</p>
<p>CONFIG_IPV4=yes</p>
<p>DISABLE=no</p>
<p>MM_CONTROLLED=no</p>
<p>SYSTEMD_CONTROLLED=no</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4address</p>
<p>${devices.brRtr.interfaces.brSrv.ip}/${devices.brRtr.interfaces.brSrv.mask}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
<p>Вводим строку default via ${devices.brRtr.interfaces.brSrv.ip}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>nameserver 8.8.8.8</p>
<p>systemctl restart network</p>
<br>
<p>Запуск HQ-SRV</p>
<p>hostnamectl hostname HQ-SRV.au-team.irpo</p>
<p>exec bash</p>
<p>Открываем конфигурацию ens18 в vim vim /etc/net/ifaces/ens18/options</p>
<p>BOOTPROTO=static</p>
<p>SYSTEMD_BOOTPROTO=static</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4address</p>
<p>${devices.hqSrv.interfaces.hqRtr.ip}/${devices.hqSrv.interfaces.hqRtr.mask}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
<p>Вводим строку default via ${devices.hqRtr.interfaces.hqCli.ip}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>nameserver 8.8.8.8</p>
<p>systemctl restart network</p>
<p>systemctl restart NetworkManager</p>
<p>ping ${devices.hqRtr.interfaces.hqCli.ip}</p>
<br>
<p>Задание 3</p>
<p>HQ-SRV и BR-SRV</p>
<p>adduser sshuser</p>
<p>passwd sshuser</p>
<p>указываем P@ssw0rd</p>
<p>usermod -u 1010 sshuser</p>
<p>visudo</p>
<p>раскомментировать строки:</p>
<p>WHEEL_USERS ALL=(ALL:ALL) ALL</p>
<p>WHEEL_USERS ALL=(ALL:ALL) NOPASSWD: ALL</p>
<p>vim /etc/group</p>
<p>дополнить строку wheel пользователем sshuser</p>
<br>
<p>HQ-RTR и BR-RTR</p>
<p>adduser net_admin</p>
<p>passwd net_admin</p>
<p>указываем P@ssw0rd</p>
<p>visudo</p>
<p>раскомментировать строки:</p>
<p>WHEEL_USERS ALL=(ALL:ALL) ALL</p>
<p>WHEEL_USERS ALL=(ALL:ALL) NOPASSWD: ALL</p>
<p>vim /etc/group</p>
<p>дополнить строку wheel пользователем net_admin</p>
<br>
<p>Задание 4</p>
<p>Запуск консоли HQ-RTR</p>
<p>apt-get install –y openvswitch</p>
<p>systemctl enable --now openvswitch</p>
<p>ovs-vsctl add-br HQ-SW</p>
<p>ovs-vsctl add-port HQ-SW ens19</p>
<p>ovs-vsctl add-port HQ-SW vlan100 tag=100 -- set  interface vlan100 type=internal</p>
<p>ovs-vsctl add-port HQ-SW vlan200 tag=200 -- set  interface vlan200 type=internal</p>
<p>ovs-vsctl add-port HQ-SW vlan999 tag=999 -- set  interface vlan999 type=internal</p>
<p>mkdir /etc/net/ifaces/vlan100</p>
<p>mkdir /etc/net/ifaces/vlan200</p>
<p>mkdir /etc/net/ifaces/vlan999</p>
<p>cp /etc/net/ifaces/ens18/options /etc/net/ifaces/vlan100/options</p>
<p>cp /etc/net/ifaces/ens18/options /etc/net/ifaces/vlan200/options</p>
<p>cp /etc/net/ifaces/ens18/options /etc/net/ifaces/vlan999/options</p>
<p>echo ‘${devices.hqRtr.interfaces.hqCli.ip}/${devices.hqRtr.interfaces.hqCli.mask}’ >> /etc/net/ifaces/vlan100/ipv4address</p>
<p>echo ‘${devices.hqRtr.interfaces.hqSrv.ip}/${devices.hqRtr.interfaces.hqSrv.mask}’ >> /etc/net/ifaces/vlan200/ipv4address</p>
<p>echo ‘${devices.hqRtr.interfaces.vlan999.ip}/${devices.hqRtr.interfaces.vlan999.mask}’ >> /etc/net/ifaces/vlan999/ipv4address</p>
<p>systemctl restart network</p>
<p>ip -br a</p>
<p>Запуск HQ-CLI</p>
<p>Пароль resu</p>
<p>Открыть терминал</p>
<p>su -</p>
<p>можно не настраивать если у нас есть dhcp</p>
<p>“””</p>
<p>пароль toor</p>
<p>Открываем конфигурацию ens18 в vim vim /etc/net/ifaces/ens18/options</p>
<p>BOOTPROTO=static</p>
<p>SYSTEMD_BOOTPROTO=static</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4address</p>
<p>${devices.hqCli.interfaces.hqRtr.ip}/${devices.hqCli.interfaces.hqRtr.mask}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
<p>Вводим строку default via ${devices.hqRtr.interfaces.hqSrv.ip}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>nameserver 8.8.8.8</p>
<p>systemctl restart network</p>
<p>systemctl restart NetworkManager</p>
<p>ip -br a</p>
<p>ping ${devices.hqRtr.interfaces.hqSrv.ip}</p>
<p>“””</p>
<br>
<p>Задание 5</p>
<p>HQ-SRV и BR-SRV</p>
<p>vim /etc/openssh/sshd_config</p>
<p>правим строку на Port 2024</p>
<p>добавляем строки</p>
<p>AllowUsers sshuser</p>
<p>MaxAuthTries 2</p>
<p>Banner /etc/ban</p>
<p>vim /etc/ban</p>
<p>Authorized access only!</p>
<p>systemctl restart sshd</p>
<br>
<p>Задание 6</p>
<p>BR-RTR</p>
<p>смотрим сеть ip –br a</p>
<p>nmtui</p>
<p>добавляем интерфейс ip tunnel</p>
<p>Имя профиля HQ-RTR</p>
<p>Device gre1</p>
<p>Mode GRE</p>
<p>Parent ens18</p>
<p>Local ip ${devices.brRtr.interfaces.isp.ip}</p>
<p>Remote ip ${devices.hqRtr.interfaces.isp.ip}</p>
<p>IPv4 manual</p>
<p>Addresses ${devices.brRtr.interfaces.hqRtr.ip}/${devices.brRtr.interfaces.hqRtr.mask}</p>
<p>проверяем ip –br a</p>
<p>hostnamectl set-hostname BR-RTR.au-team.irpo</p>
<p>Запуск консоли HQ-RTR</p>
<p>смотрим сеть ip –br a</p>
<p>nmtui</p>
<p>добавляем интерфейс ip tunnel</p>
<p>Имя профиля BR-RTR</p>
<p>Device gre1</p>
<p>Mode GRE</p>
<p>Parent ens18</p>
<p>Local ip ${devices.hqRtr.interfaces.isp.ip}</p>
<p>Remote ip ${devices.brRtr.interfaces.isp.ip}</p>
<p>IPv4 manual</p>
<p>Addresses ${devices.hqRtr.interfaces.brRtr.ip}/${devices.hqRtr.interfaces.brRtr.mask}</p>
<p>проверяем ip –br a</p>
<br>
<p>Задание 7</p>
<p>BR-RTR</p>
<p>apt-get install -y frr</p>
<p>vim /etc/frr/daemons</p>
<p>исправить строку ospfd=yes</p>
<p>systemctl restart frr</p>
<p>systemctl enable --now frr</p>
<p>vtysh</p>
<p>conf t</p>
<p>ip forwarding</p>
<p>router ospf</p>
<p>passive-interface default</p>
<p>network 10.5.5.0/30 area 0</p>
<p>network 192.168.0.0/28 area 0</p>
<p>ex</p>
<p>int gre1</p>
<p>no ip ospf passive</p>
<p>ex</p>
<p>ex</p>
<p>wr</p>
<p>ex</p>
<p>reboot</p>
<br>
<p>HQ-RTR</p>
<p>apt-get install -y frr</p>
<p>vim /etc/frr/daemons</p>
<p>исправить строку ospfd=yes</p>
<p>systemctl restart frr</p>
<p>systemctl enable --now frr</p>
<p>vtysh</p>
<p>conf t</p>
<p>router ospf</p>
<p>passive-interface default</p>
<p>network 10.5.5.0/30 area 0</p>
<p>network 192.168.100.0/28 area 0</p>
<p>network 192.168.200.0/28 area 0</p>
<p>network 192.168.99.0/29 area 0</p>
<p>ex</p>
<p>int gre1</p>
<p>no ip ospf passive</p>
<p>ex</p>
<p>ex</p>
<p>wr</p>
<p>ex</p>
<p>reboot</p>
<br>
<p>Задание 8</p>
<p>HQ-RTR</p>
<p>iptables –t nat –j MASQUERADE –A POSTROUTING</p>
<p>iptables-save > /etc/sysconfig/iptables</p>
<p>systemctl enable --now iptables </p>
<p>BR-RTR</p>
<p>iptables –t nat –j MASQUERADE –A POSTROUTING</p>
<p>iptables-save > /etc/sysconfig/iptables</p>
<p>systemctl enable --now iptables </p>
<br>
<p>Задание 9</p>
<p>HQ-RTR</p>
<p>apt-get install -y dhcp-server</p>
<p>vim /etc/sysconfig/dhcpd</p>
<p>DHCPDARCS = vlan200</p>
<p>cp /etc/dhcp/dhcpd.conf.example /etc/dhcp/dhcpd.conf</p>
<p>vim /etc/dhcp/dhcpd.conf</p>
<p>option domain-name “au-team.irpo”;</p>
<p>option domain-name-servers ${devices.hqSrv.interfaces.hqRtr.ip};</p>
<p>добавить после</p>
<p>ddns-update-style interim;</p>
<p>update-static-leases on;</p>
<p>zone au-team.irpo {</p>
<p>	primary ${devices.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<p>выбрать начало “y” “3” и в конце “p”</p>
<br>
<p>zone 100.168.192.in-addr.arpa {</p>
<p>	primary ${devices.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<br>
<p>zone 200.168.192.in-addr.arpa {</p>
<p>	primary ${devices.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<br>
<p>меняем строки:</p>
<p>subnet 192.168.200.0 netmask 255.255.255.240 {</p>
<p>	range ${devices.hqCli.interfaces.hqRtr.ip} 192.168.200.5;</p>
<p>	option routers ${devices.hqRtr.interfaces.hqSrv.ip};</p>
<br>
<p>systemctl restart dhcpd</p>
<p>systemctl enable dhcpd</p>
<br>
<p>HQ-CLI</p>
<p>проверка работы dhcp</p>
<p>ip -br a</p>
<br>
<p>Задание 10</p>
<p>HQ-SRV</p>
<p>apt-get update</p>
<p>apt-get install -y bind</p>
<p>cd /var/lib/bind/etc/</p>
<p>vim options.conf</p>
<p>скорректировать listen-on { any; };</p>
<p>listen-on-v6 { none; };</p>
<p>forwarders { 8.8.8.8; };</p>
<p>allow-query { any; };</p>
<p>allow-recursion { any; };</p>
<p>vim rfc1912.conf</p>
<p>Удалить лишнее и оставить</p>
<p>zone “au-team.irpo” {</p>
<p>type master;</p>
<p>file “au-team.irpo”;</p>
<p>allow-update { any; };</p>
<p>}</p>
<p>zone 100.168.192.in-addr.arpa {</p>
<p>	type master;</p>
<p>	file “100.db”;</p>
<p>allow-update { any; };</p>
<p>}</p>
<p>zone 200.168.192.in-addr.arpa {</p>
<p>type master;	</p>
<p>	file “200.db”;</p>
<p>allow-update { any; };</p>
<p>}</p>
<p>сохраняем файл</p>
<p>cp zone/localdomain zone/au-team.db</p>
<p>cp zone/127.in-addr.arpa zone/100.db</p>
<p>vim zone/100.db</p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	100.168.192.in-addr.apra. root.100.168.192.in-addr.apra. (...)</p>
<p>	IN	NS	100.168.192.in-addr.apra.</p>
<p>	IN	A	${devices.hqSrv.interfaces.hqRtr.ip}</p>
<p>10	IN	PTR	hq-srv.au-team.irpo</p>
<p>1	IN	PTR	hq-rtr.au-team.irpo</p>
<p>сохраняем</p>
<p>cp zone/100.db zone/200.db</p>
<p>vim zone/200.db</p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	200.168.192.in-addr.apra. root.200.168.192.in-addr.apra. (...)</p>
<p>	IN	NS	200.168.192.in-addr.apra.</p>
<p>	IN	A	${devices.hqSrv.interfaces.hqRtr.ip}</p>
<p>10	IN	PTR	hq-cli.au-team.irpo</p>
<p>1	IN	PTR	hq-rtr.au-team.irpo</p>
<p>сохраняем</p>
<p>vim zone/au-team.db</p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	hq-srv.au-team.irpo. root.au-taem.irpo. (...)</p>
<p>	IN	NS	hq-srv.au-team.irpo.</p>
<p>	IN	A	${devices.hqSrv.interfaces.hqRtr.ip}</p>
<p>hq-rtr	IN	A	${devices.hqRtr.interfaces.hqCli.ip}</p>
<p>br-rtr	IN	A	${devices.brRtr.interfaces.brSrv.ip}</p>
<p>hq-srv	IN	A	${devices.hqSrv.interfaces.hqRtr.ip}</p>
<p>hq-cli	IN	A	${devices.hqSrv.interfaces.hqRtr.ip}</p>
<p>br-srv	IN	A	${devices.brSrv.interfaces.brRtr.ip}</p>
<p>wiki	IN	CNAME	hq-rtr.au-team.irpo.</p>
<p>moodle	IN	CNAME	hq-rtr.au-team.irpo.</p>
<p>сохраняем</p>
<p>rndc-confgen > rndc.key</p>
<p>sed -i ‘6.$d’ rndc.key</p>
<p>chgrp -R named zone/</p>
<p>named-checkconf</p>
<p>named-checkconf -z</p>
<p>vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>nameserver ${devices.hqSrv.interfaces.hqRtr.ip}</p>
<p>domain au-team.irpo</p>
<p>systemctl restart network</p>
<p>systemctl aneble -- now bind</p>
<br>
<p>BR-RTR</p>
<p>vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>Скорректировать nameserver ${devices.hqRtr.interfaces.hqCli.ip}</p>
<p>domain au-team.irpo</p>
<p>systemctl restart network</p>
<p>nmtui</p>
<p>перезапустить активные соединения ens</p>
<br>
<p>HQ-RTR</p>
<p>vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>Скорректировать nameserver ${devices.hqRtr.interfaces.hqCli.ip}</p>
<p>domain au-team.irpo</p>
<p>systemctl restart network</p>
<p>nmtui</p>
<p>перезапустить активные соединения ens</p>
<br>
<p>Задание 11</p>
<p>HQ-SRV, BR-SRV, HQ-RTR, BR-RTR, HQ-CLI</p>
<p>timedatectl set-timezone Europe/Moscow</p>
`;
