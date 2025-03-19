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
      br: { name: 'gre1', ip: '10.5.5.1', mask: '30', gateway: '-', destination: 'BR-RTR' },
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
Запуск консоли ISP
login root
Password toor
Накатываем обновления apt-get update
apt-get install –y NetworkManager-tui iptables
systemctl enable --now NetworkManager
nmtui
настраиваем первый интерфейс
задаем имя профиля в соответствии с номером оборудования
выставляем ручной ip ${devices.isp.interfaces.external.ip}/${devices.isp.interfaces.external.mask}
аналогично настраиваем второй интерфейс
hostnamectl hostname IPS
проверяем ip –br a
настраиваем маршрутизацию
vim /etc/net/sysctl.conf
меняем 0 на 1 в forward
настраиваем nat
iptables –t nat –j MASQUERADE –A POSTROUTING –o ens18
iptables-save > /etc/sysconfig/iptables
systemctl enable iptables --now # нужно проверить, работает ли эта команда именно на ISP

Запуск консоли HQ-RTR
Открываем конфигурацию ${devices.hqRtr.interfaces.isp.name} в vim /etc/net/ifaces/${devices.hqRtr.interfaces.isp.name}/options
BOOTPROTO=static
TYPE=eth
CONFIG_WIRELESS=no
SYSTEMD_BOOTPROTO=static
CONFIG_IPV4=yes
DISABLE=no
MM_CONTROLLED=no
SYSTEMD_CONTROLLED=no
Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4address
172.16.4.2/28
Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route
Вводим строку default via 172.16.4.1
Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf
nameserver 8.8.8.8
iptables –t nat –j MASQUERADE –A POSTROUTING
iptables-save > /etc/sysconfig/iptables
systemctl enable iptables --now
Накатываем обновления apt-get update
apt-get install –y NetworkManager-tui
systemctl enable --now NetworkManager
nmtui
hostnamectl set-hostname HQ-RTR.au-team.irpo

Запуск консоли BR-RTR
Открываем конфигурацию ens18 в vim vim /etc/net/ifaces/ens18/options
BOOTPROTO=static
TYPE=eth
CONFIG_WIRELESS=no
SYSTEMD_BOOTPROTO=static
CONFIG_IPV4=yes
DISABLE=no
MM_CONTROLLED=no
SYSTEMD_CONTROLLED=no
Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4address
172.16.5.2/28
Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route
Вводим строку default via 172.16.5.1
Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf
nameserver 8.8.8.8
vim /etc/net/sysctl.conf
меняем 0 на 1 в forward
iptables –t nat –j MASQUERADE –A POSTROUTING
iptables-save > /etc/sysconfig/iptables
systemctl enable iptables --now
apt-get update
apt-get install –y NetworkManager-tui
systemctl enable --now NetworkManager

Запуск консоли BR-RTR
создаем папку mkdir /etc/net/ifaces/ens19
Копируем файл конфигурации cp /etc/net/ifaces/ens18/options /etc/net/ifaces/ens19/options
редактируем vim /etc/net/ifaces/ens19/options
NM_CONTROLLED=yes
перезапускаем network и NetworkManager
запускаем nmtui
редактируем 1 соединение ens19
имя профиля ставим BR-SRV
ip 192.168.0.1/28

Запуск консоли BR-SRV
hostnamectl hostname BR-SRV.au-team.irpo
Открываем конфигурацию ens18 в vim vim /etc/net/ifaces/ens18/options
BOOTPROTO=static
TYPE=eth
CONFIG_WIRELESS=no
SYSTEMD_BOOTPROTO=static
CONFIG_IPV4=yes
DISABLE=no
MM_CONTROLLED=no
SYSTEMD_CONTROLLED=no
Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4address
192.168.0.10/28
Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route
Вводим строку default via 192.168.0.1
Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf
nameserver 8.8.8.8
systemctl restart network

Запуск HQ-SRV
hostnamectl hostname HQ-SRV.au-team.irpo
exec bash
Открываем конфигурацию ens18 в vim vim /etc/net/ifaces/ens18/options
BOOTPROTO=static
SYSTEMD_BOOTPROTO=static
Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4address
192.168.100.2/28
Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route
Вводим строку default via 192.168.100.1
Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf
nameserver 8.8.8.8
systemctl restart network
systemctl restart NetworkManager
ping 192.168.100.1

Задание 3
HQ-SRV и BR-SRV
adduser sshuser
passwd sshuser
указываем P@ssw0rd
usermod -u 1010 sshuser
visudo
раскомментировать строки:
WHEEL_USERS ALL=(ALL:ALL) ALL
WHEEL_USERS ALL=(ALL:ALL) NOPASSWD: ALL
vim /etc/group
дополнить строку wheel пользователем sshuser

HQ-RTR и BR-RTR
adduser net_admin
passwd net_admin
указываем P@ssw0rd
visudo
раскомментировать строки:
WHEEL_USERS ALL=(ALL:ALL) ALL
WHEEL_USERS ALL=(ALL:ALL) NOPASSWD: ALL
vim /etc/group
дополнить строку wheel пользователем net_admin

Задание 4
Запуск консоли HQ-RTR
apt-get install –y openvswitch
systemctl enable --now openvswitch
ovs-vsctl add-br HQ-SW
ovs-vsctl add-port HQ-SW ens19
ovs-vsctl add-port HQ-SW vlan100 tag=100 -- set  interface vlan100 type=internal
ovs-vsctl add-port HQ-SW vlan200 tag=200 -- set  interface vlan200 type=internal
ovs-vsctl add-port HQ-SW vlan999 tag=999 -- set  interface vlan999 type=internal
mkdir /etc/net/ifaces/vlan100
mkdir /etc/net/ifaces/vlan200
mkdir /etc/net/ifaces/vlan999
cp /etc/net/ifaces/ens18/options /etc/net/ifaces/vlan100/options
cp /etc/net/ifaces/ens18/options /etc/net/ifaces/vlan200/options
cp /etc/net/ifaces/ens18/options /etc/net/ifaces/vlan999/options
echo ‘192.168.100.1/28’ >> /etc/net/ifaces/vlan100/ipv4address
echo ‘192.168.200.1/28’ >> /etc/net/ifaces/vlan200/ipv4address
echo ‘192.168.99.1/28’ >> /etc/net/ifaces/vlan999/ipv4address
systemctl restart network
ip -br a
Запуск HQ-CLI
Пароль resu
Открыть терминал
su -
можно не настраивать если у нас есть dhcp
“””
пароль toor
Открываем конфигурацию ens18 в vim vim /etc/net/ifaces/ens18/options
BOOTPROTO=static
SYSTEMD_BOOTPROTO=static
Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4address
192.168.200.2/28
Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route
Вводим строку default via 192.168.200.1
Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf
nameserver 8.8.8.8
systemctl restart network
systemctl restart NetworkManager
ip -br a
ping 192.168.200.1
“””

Задание 5
HQ-SRV и BR-SRV
vim /etc/openssh/sshd_config
правим строку на Port 2024
добавляем строки
AllowUsers sshuser
MaxAuthTries 2
Banner /etc/ban
vim /etc/ban
Authorized access only!
systemctl restart sshd

Задание 6
BR-RTR
смотрим сеть ip –br a
nmtui
добавляем интерфейс ip tunnel
Имя профиля HQ-RTR
Device gre1
Mode GRE
Parent ens18
Local ip 172.16.5.2
Remote ip 172.16.4.2
IPv4 manual
Addresses 10.5.5.2/30
проверяем ip –br a
hostnamectl set-hostname BR-RTR.au-team.irpo
Запуск консоли HQ-RTR
смотрим сеть ip –br a
nmtui
добавляем интерфейс ip tunnel
Имя профиля BR-RTR
Device gre1
Mode GRE
Parent ens18
Local ip 172.16.4.2
Remote ip 172.16.5.2
IPv4 manual
Addresses 10.5.5.1/30
проверяем ip –br a

Задание 7
BR-RTR
apt-get install -y frr
vim /etc/frr/daemons
исправить строку ospfd=yes
systemctl restart frr
systemctl enable --now frr
vtysh
conf t
ip forwarding
router ospf
passive-interface default
network 10.5.5.0/30 area 0
network 192.168.0.0/28 area 0
ex
int gre1
no ip ospf passive
ex
ex
wr
ex
reboot

HQ-RTR
apt-get install -y frr
vim /etc/frr/daemons
исправить строку ospfd=yes
systemctl restart frr
systemctl enable --now frr
vtysh
conf t
router ospf
passive-interface default
network 10.5.5.0/30 area 0
network 192.168.100.0/28 area 0
network 192.168.200.0/28 area 0
network 192.168.99.0/29 area 0
ex
int gre1
no ip ospf passive
ex
ex
wr
ex
reboot

Задание 8
HQ-RTR
iptables –t nat –j MASQUERADE –A POSTROUTING
iptables-save > /etc/sysconfig/iptables
systemctl enable --now iptables 
BR-RTR
iptables –t nat –j MASQUERADE –A POSTROUTING
iptables-save > /etc/sysconfig/iptables
systemctl enable --now iptables 

Задание 9
HQ-RTR
apt-get install -y dhcp-server
vim /etc/sysconfig/dhcpd
DHCPDARCS = vlan200
cp /etc/dhcp/dhcpd.conf.example /etc/dhcp/dhcpd.conf
vim /etc/dhcp/dhcpd.conf
option domain-name “au-team.irpo”;
option domain-name-servers 192.168.100.2;
добавить после
ddns-update-style interim;
update-static-leases on;
zone au-team.irpo {
	primary 192.168.100.2
}
выбрать начало “y” “3” и в конце “p”

zone 100.168.192.in-addr.arpa {
	primary 192.168.100.2
}

zone 200.168.192.in-addr.arpa {
	primary 192.168.100.2
}

меняем строки:
subnet 192.168.200.0 netmask 255.255.255.240 {
	range 192.168.200.2 192.168.200.5;
	option routers 192.168.200.1;

systemctl restart dhcpd
systemctl enable dhcpd

HQ-CLI
проверка работы dhcp
ip -br a

Задание 10
HQ-SRV
apt-get update
apt-get install -y bind
cd /var/lib/bind/etc/
vim options.conf
скорректировать listen-on { any; };
listen-on-v6 { none; };
forwarders { 8.8.8.8; };
allow-query { any; };
allow-recursion { any; };
vim rfc1912.conf
Удалить лишнее и оставить
zone “au-team.irpo” {
type master;
file “au-team.irpo”;
allow-update { any; };
}
zone 100.168.192.in-addr.arpa {
	type master;
	file “100.db”;
allow-update { any; };
}
zone 200.168.192.in-addr.arpa {
type master;	
	file “200.db”;
allow-update { any; };
}
сохраняем файл
cp zone/localdomain zone/au-team.db
cp zone/127.in-addr.arpa zone/100.db
vim zone/100.db
Убираем лишнее и пишем основные моменты:
0	IN	SOA	100.168.192.in-addr.apra. root.100.168.192.in-addr.apra. (...)
	IN	NS	100.168.192.in-addr.apra.
	IN	A	192.168.100.2
10	IN	PTR	hq-srv.au-team.irpo
1	IN	PTR	hq-rtr.au-team.irpo
сохраняем
cp zone/100.db zone/200.db
vim zone/200.db
Убираем лишнее и пишем основные моменты:
0	IN	SOA	200.168.192.in-addr.apra. root.200.168.192.in-addr.apra. (...)
	IN	NS	200.168.192.in-addr.apra.
	IN	A	192.168.100.2
10	IN	PTR	hq-cli.au-team.irpo
1	IN	PTR	hq-rtr.au-team.irpo
сохраняем
vim zone/au-team.db
Убираем лишнее и пишем основные моменты:
0	IN	SOA	hq-srv.au-team.irpo. root.au-taem.irpo. (...)
	IN	NS	hq-srv.au-team.irpo.
	IN	A	192.168.100.2
hq-rtr	IN	A	192.168.100.1
br-rtr	IN	A	192.168.0.1
hq-srv	IN	A	192.168.100.2
hq-cli	IN	A	192.168.100.2
br-srv	IN	A	192.168.0.2
wiki	IN	CNAME	hq-rtr.au-team.irpo.
moodle	IN	CNAME	hq-rtr.au-team.irpo.
сохраняем
rndc-confgen > rndc.key
sed -i ‘6.$d’ rndc.key
chgrp -R named zone/
named-checkconf
named-checkconf -z
vim /etc/net/ifaces/ens18/resolv.conf
nameserver 192.168.100.2
domain au-team.irpo
systemctl restart network
systemctl aneble -- now bind

BR-RTR
vim /etc/net/ifaces/ens18/resolv.conf
Скорректировать nameserver 192.168.100.1
domain au-team.irpo
systemctl restart network
nmtui
перезапустить активные соединения ens

HQ-RTR
vim /etc/net/ifaces/ens18/resolv.conf
Скорректировать nameserver 192.168.100.1
domain au-team.irpo
systemctl restart network
nmtui
перезапустить активные соединения ens

Задание 11
HQ-SRV, BR-SRV, HQ-RTR, BR-RTR, HQ-CLI
timedatectl set-timezone Europe/Moscow
`;
