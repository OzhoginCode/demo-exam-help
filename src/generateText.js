/* eslint-disable no-tabs */

export default (devices) => `
<p>Запуск консоли ISP</p>
<p>login root</p>
<p>Password toor</p>
<p><code>hostnamectl hostname ISP</code></p>
<p>Накатываем обновления</p>
<p><code>apt-get update</code></p>
<p><code>apt-get install –y NetworkManager-tui iptables</code></p>
<p><code>systemctl enable --now NetworkManager</code></p>
<p><code>nmtui</code></p>
<p>настраиваем первый интерфейс</p>
<p>задаем имя профиля в соответствии с номером оборудования (ЧТО ЭТО ЗНАЧИТ???)</p>
<p>выставляем ручной ip для ${devices.isp.interfaces.hqRtr.name}: ${devices.isp.interfaces.hqRtr.ip}/${devices.isp.interfaces.hqRtr.mask}</p>
<p>аналогично настраиваем ${devices.isp.interfaces.brRtr.name}: ${devices.isp.interfaces.brRtr.ip}/${devices.isp.interfaces.brRtr.mask}</p>
<p>проверяем:</p>
<p><code>ip –br a</code></p>
<p>настраиваем маршрутизацию</p>
<p><code>vim /etc/net/sysctl.conf</code></p>
<p>меняем 0 на 1 в forward</p>
<p>настраиваем nat</p>
<p><code>iptables –t nat –j MASQUERADE –A POSTROUTING –o ens18</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable iptables --now # нужно проверить, работает ли эта команда именно на ISP</code></p>
<br>
<p>Запуск консоли HQ-RTR</p>
<p><code>hostnamectl set-hostname HQ-RTR.au-team.irpo</code></p>
<p>Указываем статичный ipv4 адрес для ${devices.hqRtr.interfaces.isp.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${devices.hqRtr.interfaces.isp.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${devices.hqRtr.interfaces.isp.ip}/${devices.hqRtr.interfaces.isp.mask}' > /etc/net/ifaces/${devices.hqRtr.interfaces.isp.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${devices.isp.interfaces.hqRtr.ip}' > /etc/net/ifaces/${devices.hqRtr.interfaces.isp.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${devices.hqRtr.interfaces.isp.name}/resolv.conf></code></p>
<p><code>iptables –t nat –j MASQUERADE –A POSTROUTING</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable iptables --now</code></p>
<p>Накатываем обновления <code>apt-get update</code></p>
<p><code>apt-get install –y NetworkManager-tui</code></p>
<p><code>systemctl enable --now NetworkManager</code></p>
<p><code>nmtui</code></p>
<br>
<p>Запуск консоли BR-RTR</p>
<p><code>hostnamectl set-hostname BR-RTR.au-team.irpo</code></p>
<p>Указываем статичный ipv4 адрес для ${devices.brRtr.interfaces.isp.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${devices.brRtr.interfaces.isp.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${devices.brRtr.interfaces.isp.ip}/${devices.brRtr.interfaces.isp.mask}' > /etc/net/ifaces/${devices.brRtr.interfaces.isp.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${devices.isp.interfaces.brRtr.ip}' > /etc/net/ifaces/${devices.brRtr.interfaces.isp.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${devices.brRtr.interfaces.isp.name}/resolv.conf></code></p>
<p><code>iptables –t nat –j MASQUERADE –A POSTROUTING</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable iptables --now</code></p>
<p>Накатываем обновления <code>apt-get update</code></p>
<p><code>apt-get install –y NetworkManager-tui</code></p>
<p><code>systemctl enable --now NetworkManager</code></p>
<br>
<p>Запуск консоли BR-RTR</p>
<p>создаем папку</p>
<p><code>mkdir /etc/net/ifaces/ens19</code></p>
<p>Копируем файл конфигурации</p>
<p><code>cp /etc/net/ifaces/ens18/options /etc/net/ifaces/ens19/options</code></p>
<p>редактируем</p>
<p><code>vim /etc/net/ifaces/ens19/options</code></p>
<p><code>NM_CONTROLLED=yes</code></p>
<p>перезапускаем network и NetworkManager</p>
<p><code>systemctl restart network</code></p>
<p><code>systemctl restart NetworkManager</code></p>
<p>запускаем nmtui</p>
<p>редактируем 1 соединение ens19</p>
<p>имя профиля ставим BR-SRV</p>
<p>ip ${devices.brRtr.interfaces.brSrv.ip}/${devices.brRtr.interfaces.brSrv.mask}</p>
<br>
<p>Запуск консоли BR-SRV</p>
<p><code>hostnamectl set-hostname BR-SRV.au-team.irpo</code></p>
<p>Указываем статичный ipv4 адрес для ${devices.brSrv.interfaces.brRtr.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${devices.brSrv.interfaces.brRtr.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${devices.brSrv.interfaces.brRtr.ip}/${devices.brSrv.interfaces.brRtr.mask}' > /etc/net/ifaces/${devices.brSrv.interfaces.brRtr.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${devices.brRtr.interfaces.brSrv.ip}' > /etc/net/ifaces/${devices.brSrv.interfaces.brRtr.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${devices.brSrv.interfaces.brRtr.name}/resolv.conf></code></p>
<p><code>systemctl restart network</code></p>
<br>
<p>Запуск консоли HQ-SRV</p>
<p><code>hostnamectl set-hostname HQ-SRV.au-team.irpo</code></p>
<p>Указываем статичный ipv4 адрес для ${devices.hqSrv.interfaces.hqRtr.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${devices.hqSrv.interfaces.hqRtr.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${devices.hqSrv.interfaces.hqRtr.ip}/${devices.hqSrv.interfaces.hqRtr.mask}' > /etc/net/ifaces/${devices.hqSrv.interfaces.hqRtr.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${devices.hqSrv.interfaces.hqRtr.ip}' > /etc/net/ifaces/${devices.hqSrv.interfaces.hqRtr.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${devices.hqSrv.interfaces.hqRtr.name}/resolv.conf></code></p>
<p><code>systemctl restart network</code></p>
<br>
<p>Задание 3</p>
<p>HQ-SRV и BR-SRV</p>
<p><code>adduser sshuser</code></p>
<p><code>passwd sshuser</code></p>
<p>указываем <code>P@ssw0rd</code></p>
<p><code>usermod -u 1010 sshuser</code></p>
<p><code>visudo</code></p>
<p>раскомментировать строки:</p>
<p><code>WHEEL_USERS ALL=(ALL:ALL) ALL</code></p>
<p><code>WHEEL_USERS ALL=(ALL:ALL) NOPASSWD: ALL</code></p>
<p><code>vim /etc/group</code></p>
<p>дополнить строку wheel пользователем sshuser</p>
<br>
<p>HQ-RTR и BR-RTR</p>
<p><code>adduser net_admin</code></p>
<p><code>passwd net_admin</code></p>
<p>указываем <code>P@ssw0rd</code></p>
<p><code>visudo</code></p>
<p>раскомментировать строки:</p>
<p><code>WHEEL_USERS ALL=(ALL:ALL) ALL</code></p>
<p><code>WHEEL_USERS ALL=(ALL:ALL) NOPASSWD: ALL</code></p>
<p><code>vim /etc/group</code></p>
<p>дополнить строку wheel пользователем net_admin</p>
<br>
<p>Задание 4</p>
<p>Запуск консоли HQ-RTR</p>
<pre><code>apt-get install –y openvswitch
systemctl enable --now openvswitch
ovs-vsctl add-br HQ-SW
ovs-vsctl add-port HQ-SW ens19
ovs-vsctl add-port HQ-SW vlan100 tag=100 -- set interface vlan100 type=internal
ovs-vsctl add-port HQ-SW vlan200 tag=200 -- set interface vlan200 type=internal
ovs-vsctl add-port HQ-SW vlan999 tag=999 -- set interface vlan999 type=internal
mkdir /etc/net/ifaces/vlan100
mkdir /etc/net/ifaces/vlan200
mkdir /etc/net/ifaces/vlan999
cp /etc/net/ifaces/ens18/options /etc/net/ifaces/vlan100/options
cp /etc/net/ifaces/ens18/options /etc/net/ifaces/vlan200/options
cp /etc/net/ifaces/ens18/options /etc/net/ifaces/vlan999/options
echo ‘${devices.hqRtr.interfaces.hqCli.ip}/${devices.hqRtr.interfaces.hqCli.mask}’ >> /etc/net/ifaces/vlan100/ipv4address
echo ‘${devices.hqRtr.interfaces.hqSrv.ip}/${devices.hqRtr.interfaces.hqSrv.mask}’ >> /etc/net/ifaces/vlan200/ipv4address
echo ‘${devices.hqRtr.interfaces.vlan999.ip}/${devices.hqRtr.interfaces.vlan999.mask}’ >> /etc/net/ifaces/vlan999/ipv4address
systemctl restart network
ip -br a</code></pre>
<br>
<p>Настройка статичного ip на HQ-CLI</p>
<details>
  <summary>Можно не настраивать если у нас есть dhcp</summary>
  <p>Пароль resu</p>
  <p>Открыть терминал</p>
  <p>su -</p>
  <p></p>
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
</details>
<br>
<p>Задание 5</p>
<p>HQ-SRV и BR-SRV</p>
<p><code>vim /etc/openssh/sshd_config</code></p>
<p>правим строку на <code>Port 2024</code></p>
<p>добавляем строки</p>
<p><code>AllowUsers sshuser</code></p>
<p><code>MaxAuthTries 2</code></p>
<p><code>Banner /etc/ban</code></p>
<p><code>echo 'Authorized access only' > /etc/ban</code></p>
<p>systemctl restart sshd</p>
<br>
<p>Задание 6</p>
<p>BR-RTR</p>
<p><code>nmtui</code></p>
<p>добавляем интерфейс <code>ip tunnel</code></p>
<p>Имя профиля: <code>HQ-RTR</code></p>
<p>Device: <code>gre1</code></p>
<p>Mode: <code>GRE</code></p>
<p>Parent: <code>ens18</code></p>
<p>Local ip: <code>${devices.brRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${devices.hqRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${devices.brRtr.interfaces.hqRtr.ip}/${devices.brRtr.interfaces.hqRtr.mask}</code></p>
<p>проверяем <code>ip –br a</code></p>
<br>
<p>Запуск консоли HQ-RTR</code></p>
<p>смотрим сеть <code>ip –br a</code></p>
<p>nmtui</p>
<p>добавляем интерфейс <code>ip tunnel</code></p>
<p>Имя профиля: <code>BR-RTR</code></p>
<p>Device: <code>gre1</code></p>
<p>Mode: <code>GRE</code></p>
<p>Parent: <code>ens18</code></p>
<p>Local ip: <code>${devices.hqRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${devices.brRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${devices.hqRtr.interfaces.brRtr.ip}/${devices.hqRtr.interfaces.brRtr.mask}</code></p>
<p>проверяем <code>ip –br a</code></p>
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
<p><code>iptables –t nat –j MASQUERADE –A POSTROUTING</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable --now iptables</code></p>
<p>BR-RTR</p>
<p><code>iptables –t nat –j MASQUERADE –A POSTROUTING</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable --now iptables</code></p>
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
<p><code>timedatectl set-timezone Europe/Moscow</code></p>
`;
