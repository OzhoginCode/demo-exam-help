(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const _=".",N=Symbol("target"),K=Symbol("unsubscribe");function P(n){return n instanceof Date||n instanceof Set||n instanceof Map||n instanceof WeakSet||n instanceof WeakMap||ArrayBuffer.isView(n)}function se(n){return(typeof n=="object"?n===null:typeof n!="function")||n instanceof RegExp}const m=Array.isArray;function L(n){return typeof n=="symbol"}const R={after(n,e){return m(n)?n.slice(e.length):e===""?n:n.slice(e.length+1)},concat(n,e){return m(n)?(n=[...n],e&&n.push(e),n):e&&e.toString!==void 0?(n!==""&&(n+=_),L(e)?n+e.toString():n+e):n},initial(n){if(m(n))return n.slice(0,-1);if(n==="")return n;const e=n.lastIndexOf(_);return e===-1?"":n.slice(0,e)},last(n){if(m(n))return n.at(-1)??"";if(n==="")return n;const e=n.lastIndexOf(_);return e===-1?n:n.slice(e+1)},walk(n,e){if(m(n))for(const t of n)e(t);else if(n!==""){let t=0,s=n.indexOf(_);if(s===-1)e(n);else for(;t<n.length;)s===-1&&(s=n.length),e(n.slice(t,s)),t=s+1,s=n.indexOf(_,t)}},get(n,e){return this.walk(e,t=>{n&&(n=n[t])}),n},isSubPath(n,e){if(m(n)){if(n.length<e.length)return!1;for(let t=0;t<e.length;t++)if(n[t]!==e[t])return!1;return!0}return n.length<e.length?!1:n===e?!0:n.startsWith(e)?n[e.length]===_:!1},isRootPath(n){return m(n)?n.length===0:n===""}};function ie(n){return typeof n=="object"&&typeof n.next=="function"}function ae(n,e,t,s,i){const o=n.next;if(e.name==="entries")n.next=function(){const c=o.call(this);return c.done===!1&&(c.value[0]=i(c.value[0],e,c.value[0],s),c.value[1]=i(c.value[1],e,c.value[0],s)),c};else if(e.name==="values"){const c=t[N].keys();n.next=function(){const u=o.call(this);return u.done===!1&&(u.value=i(u.value,e,c.next().value,s)),u}}else n.next=function(){const c=o.call(this);return c.done===!1&&(c.value=i(c.value,e,c.value,s)),c};return n}function z(n,e,t){return n.isUnsubscribed||e.ignoreSymbols&&L(t)||e.ignoreUnderscores&&t.charAt(0)==="_"||"ignoreKeys"in e&&e.ignoreKeys.includes(t)}class re{constructor(e){this._equals=e,this._proxyCache=new WeakMap,this._pathCache=new WeakMap,this.isUnsubscribed=!1}_getDescriptorCache(){return this._descriptorCache===void 0&&(this._descriptorCache=new WeakMap),this._descriptorCache}_getProperties(e){const t=this._getDescriptorCache();let s=t.get(e);return s===void 0&&(s={},t.set(e,s)),s}_getOwnPropertyDescriptor(e,t){if(this.isUnsubscribed)return Reflect.getOwnPropertyDescriptor(e,t);const s=this._getProperties(e);let i=s[t];return i===void 0&&(i=Reflect.getOwnPropertyDescriptor(e,t),s[t]=i),i}getProxy(e,t,s,i){if(this.isUnsubscribed)return e;const o=e[i],c=o??e;this._pathCache.set(c,t);let u=this._proxyCache.get(c);return u===void 0&&(u=o===void 0?new Proxy(e,s):e,this._proxyCache.set(c,u)),u}getPath(e){return this.isUnsubscribed?void 0:this._pathCache.get(e)}isDetached(e,t){return!Object.is(e,R.get(t,this.getPath(e)))}defineProperty(e,t,s){return Reflect.defineProperty(e,t,s)?(this.isUnsubscribed||(this._getProperties(e)[t]=s),!0):!1}setProperty(e,t,s,i,o){if(!this._equals(o,s)||!(t in e)){const c=this._getOwnPropertyDescriptor(e,t);return c!==void 0&&"set"in c?Reflect.set(e,t,s,i):Reflect.set(e,t,s)}return!0}deleteProperty(e,t,s){if(Reflect.deleteProperty(e,t)){if(!this.isUnsubscribed){const i=this._getDescriptorCache().get(e);i&&(delete i[t],this._pathCache.delete(s))}return!0}return!1}isSameDescriptor(e,t,s){const i=this._getOwnPropertyDescriptor(t,s);return e!==void 0&&i!==void 0&&Object.is(e.value,i.value)&&(e.writable||!1)===(i.writable||!1)&&(e.enumerable||!1)===(i.enumerable||!1)&&(e.configurable||!1)===(i.configurable||!1)&&e.get===i.get&&e.set===i.set}isGetInvariant(e,t){const s=this._getOwnPropertyDescriptor(e,t);return s!==void 0&&s.configurable!==!0&&s.writable!==!0}unsubscribe(){this._descriptorCache=null,this._pathCache=null,this._proxyCache=null,this.isUnsubscribed=!0}}function D(n){return toString.call(n)==="[object Object]"}function E(){return!0}function y(n,e){return n.length!==e.length||n.some((t,s)=>e[s]!==t)}const F=new Set(["hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]),oe=new Set(["concat","includes","indexOf","join","keys","lastIndexOf"]),j={push:E,pop:E,shift:E,unshift:E,copyWithin:y,reverse:y,sort:y,splice:y,flat:y,fill:y},ce=new Set([...F,...oe,...Object.keys(j)]);function M(n,e){if(n.size!==e.size)return!0;for(const t of n)if(!e.has(t))return!0;return!1}const J=["keys","values","entries"],X=new Set(["has","toString"]),Z={add:M,clear:M,delete:M,forEach:M},le=new Set([...X,...Object.keys(Z),...J]);function A(n,e){if(n.size!==e.size)return!0;let t;for(const[s,i]of n)if(t=e.get(s),t!==i||t===void 0&&!e.has(s))return!0;return!1}const de=new Set([...X,"get"]),ee={set:A,clear:A,delete:A,forEach:A},fe=new Set([...de,...Object.keys(ee),...J]);class g{constructor(e,t,s,i){this._path=t,this._isChanged=!1,this._clonedCache=new Set,this._hasOnValidate=i,this._changes=i?[]:null,this.clone=t===void 0?e:this._shallowClone(e)}static isHandledMethod(e){return F.has(e)}_shallowClone(e){let t=e;if(D(e))t={...e};else if(m(e)||ArrayBuffer.isView(e))t=[...e];else if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set([...e].map(s=>this._shallowClone(s)));else if(e instanceof Map){t=new Map;for(const[s,i]of e.entries())t.set(s,this._shallowClone(i))}return this._clonedCache.add(t),t}preferredThisArg(e,t,s,i){return e?(m(i)?this._onIsChanged=j[t]:i instanceof Set?this._onIsChanged=Z[t]:i instanceof Map&&(this._onIsChanged=ee[t]),i):s}update(e,t,s){const i=R.after(e,this._path);if(t!=="length"){let o=this.clone;R.walk(i,c=>{o!=null&&o[c]&&(this._clonedCache.has(o[c])||(o[c]=this._shallowClone(o[c])),o=o[c])}),this._hasOnValidate&&this._changes.push({path:i,property:t,previous:s}),o!=null&&o[t]&&(o[t]=s)}this._isChanged=!0}undo(e){let t;for(let s=this._changes.length-1;s!==-1;s--)t=this._changes[s],R.get(e,t.path)[t.property]=t.previous}isChanged(e){return this._onIsChanged===void 0?this._isChanged:this._onIsChanged(this.clone,e)}isPathApplicable(e){return R.isRootPath(this._path)||R.isSubPath(e,this._path)}}class G extends g{static isHandledMethod(e){return ce.has(e)}}class ue extends g{undo(e){e.setTime(this.clone.getTime())}isChanged(e,t){return!t(this.clone.valueOf(),e.valueOf())}}class $ extends g{static isHandledMethod(e){return le.has(e)}undo(e){for(const t of this.clone)e.add(t);for(const t of e)this.clone.has(t)||e.delete(t)}}class Y extends g{static isHandledMethod(e){return fe.has(e)}undo(e){for(const[t,s]of this.clone.entries())e.set(t,s);for(const t of e.keys())this.clone.has(t)||e.delete(t)}}class he extends g{constructor(e,t,s,i){super(void 0,t,s,i),this._argument1=s[0],this._weakValue=e.has(this._argument1)}isChanged(e){return this._weakValue!==e.has(this._argument1)}undo(e){this._weakValue&&!e.has(this._argument1)?e.add(this._argument1):e.delete(this._argument1)}}class pe extends g{constructor(e,t,s,i){super(void 0,t,s,i),this._weakKey=s[0],this._weakHas=e.has(this._weakKey),this._weakValue=e.get(this._weakKey)}isChanged(e){return this._weakValue!==e.get(this._weakKey)}undo(e){const t=e.has(this._weakKey);this._weakHas&&!t?e.set(this._weakKey,this._weakValue):!this._weakHas&&t?e.delete(this._weakKey):this._weakValue!==e.get(this._weakKey)&&e.set(this._weakKey,this._weakValue)}}class O{constructor(e){this._stack=[],this._hasOnValidate=e}static isHandledType(e){return D(e)||m(e)||P(e)}static isHandledMethod(e,t){return D(e)?g.isHandledMethod(t):m(e)?G.isHandledMethod(t):e instanceof Set?$.isHandledMethod(t):e instanceof Map?Y.isHandledMethod(t):P(e)}get isCloning(){return this._stack.length>0}start(e,t,s){let i=g;m(e)?i=G:e instanceof Date?i=ue:e instanceof Set?i=$:e instanceof Map?i=Y:e instanceof WeakSet?i=he:e instanceof WeakMap&&(i=pe),this._stack.push(new i(e,t,s,this._hasOnValidate))}update(e,t,s){this._stack.at(-1).update(e,t,s)}preferredThisArg(e,t,s){const{name:i}=e,o=O.isHandledMethod(s,i);return this._stack.at(-1).preferredThisArg(o,i,t,s)}isChanged(e,t,s){return this._stack.at(-1).isChanged(e,t,s)}isPartOfClone(e){return this._stack.at(-1).isPathApplicable(e)}undo(e){this._previousClone!==void 0&&this._previousClone.undo(e)}stop(){return this._previousClone=this._stack.pop(),this._previousClone.clone}}const me={equals:Object.is,isShallow:!1,pathAsArray:!1,ignoreSymbols:!1,ignoreUnderscores:!1,ignoreDetached:!1,details:!1},B=(n,e,t={})=>{t={...me,...t};const s=Symbol("ProxyTarget"),{equals:i,isShallow:o,ignoreDetached:c,details:u}=t,f=new re(i),v=typeof t.onValidate=="function",p=new O(v),T=(a,r,l,d,h)=>!v||p.isCloning||t.onValidate(R.concat(f.getPath(a),r),l,d,h)===!0,H=(a,r,l,d)=>{!z(f,t,r)&&!(c&&f.isDetached(a,n))&&x(f.getPath(a),r,l,d)},x=(a,r,l,d,h)=>{p.isCloning&&p.isPartOfClone(a)?p.update(a,r,d):e(R.concat(a,r),l,d,h)},V=a=>a&&(a[s]??a),Q=(a,r,l,d)=>{if(se(a)||l==="constructor"||o&&!O.isHandledMethod(r,l)||z(f,t,l)||f.isGetInvariant(r,l)||c&&f.isDetached(r,n))return a;d===void 0&&(d=f.getPath(r));const h=R.concat(d,l),S=f.getPath(a);return S&&te(h,S)?f.getProxy(a,S,b,s):f.getProxy(a,h,b,s)},te=(a,r)=>{if(L(a)||a.length<=r.length||m(r)&&r.length===0)return!1;const l=m(a)?a:a.split(_),d=m(r)?r:r.split(_);return l.length<=d.length?!1:!d.some((h,S)=>h!==l[S])},b={get(a,r,l){if(L(r)){if(r===s||r===N)return a;if(r===K&&!f.isUnsubscribed&&f.getPath(a).length===0)return f.unsubscribe(),a}const d=P(a)?Reflect.get(a,r):Reflect.get(a,r,l);return Q(d,a,r)},set(a,r,l,d){l=V(l);const h=a[s]??a,S=h[r];if(i(S,l)&&r in a)return!0;const w=T(a,r,l,S);return w&&f.setProperty(h,r,l,d,S)?(H(a,r,a[r],S),!0):!w},defineProperty(a,r,l){if(!f.isSameDescriptor(l,a,r)){const d=a[r];T(a,r,l.value,d)&&f.defineProperty(a,r,l,d)&&H(a,r,l.value,d)}return!0},deleteProperty(a,r){if(!Reflect.has(a,r))return!0;const l=Reflect.get(a,r),d=T(a,r,void 0,l);return d&&f.deleteProperty(a,r,l)?(H(a,r,void 0,l),!0):!d},apply(a,r,l){const d=r[s]??r;if(f.isUnsubscribed)return Reflect.apply(a,d,l);if((u===!1||u!==!0&&!u.includes(a.name))&&O.isHandledType(d)){let h=R.initial(f.getPath(a));const S=O.isHandledMethod(d,a.name);p.start(d,h,l);let w=Reflect.apply(a,p.preferredThisArg(a,r,d),S?l.map(C=>V(C)):l);const ne=p.isChanged(d,i),U=p.stop();if(O.isHandledType(w)&&S&&(r instanceof Map&&a.name==="get"&&(h=R.concat(h,l[0])),w=f.getProxy(w,h,b)),ne){const C={name:a.name,args:l,result:w},q=p.isCloning?R.initial(h):h,W=p.isCloning?R.last(h):"";T(R.get(n,q),W,d,U,C)?x(q,W,d,U,C):p.undo(d)}return(r instanceof Map||r instanceof Set)&&ie(w)?ae(w,a,r,h,Q):w}return Reflect.apply(a,r,l)}},I=f.getProxy(n,t.pathAsArray?[]:"",b);return e=e.bind(I),v&&(t.onValidate=t.onValidate.bind(I)),I};B.target=n=>(n==null?void 0:n[N])??n;B.unsubscribe=n=>(n==null?void 0:n[K])??n;const k={isp:{interfaces:{external:{ip:"<ВНЕШНИЙ>",mask:"24"}}},hqRtr:{interfaces:{isp:{name:"ens18"}}}},Re=()=>`
Запуск консоли ISP
login root
Password toor
Накатываем обновления apt-get update
apt-get install –y NetworkManager-tui iptables
systemctl enable --now NetworkManager
nmtui
настраиваем первый интерфейс
задаем имя профиля в соответствии с номером оборудования
выставляем ручной ip ${k.isp.interfaces.external.ip}/${k.isp.interfaces.external.mask}
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
Открываем конфигурацию ${k.hqRtr.interfaces.isp.name} в vim /etc/net/ifaces/${k.hqRtr.interfaces.isp.name}/options
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
`,Se=(n,{devices:e})=>{const t=document.createElement("table"),s=document.createElement("thead");s.innerHTML=`
    <tr>
      <th>Имя устройства</th>
      <th>Назначение (куда смотрит)</th>
      <th>IP-адрес</th>
      <th>Маска</th>
      <th>Шлюз по умолчанию</th>
    </tr>
  `,t.appendChild(s);const i=document.createElement("tbody");Object.values(e).forEach(({name:o,interfaces:c})=>{const u=Object.values(c);if(!u.length)return;const f=document.createElement("tr");f.innerHTML=`
      <td rowspan="${u.length}">${o}</td>
      <td>${u[0].destination||"-"}</td>
      <td>${u[0].ip}</td>
      <td>${u[0].mask}</td>
      <td>${u[0].gateway}</td>
    `,i.appendChild(f);for(let v=1;v<u.length;v+=1){const p=u[v],T=document.createElement("tr");T.innerHTML=`
        <td>${p.destination||"-"}</td>
        <td>${p.ip}</td>
        <td>${p.mask}</td>
        <td>${p.gateway}</td>
      `,i.appendChild(T)}}),t.appendChild(i),n.ipTableContainer.innerHTML="",n.ipTableContainer.appendChild(t)},we=(n,e)=>{const t=Re(),s=document.createElement("div");t.split(`
`).forEach(o=>{const c=document.createElement("p");c.innerHTML=o||"&nbsp;",s.appendChild(c)}),n.textContainer.innerHTML="",n.textContainer.appendChild(s)},_e=(n,e)=>(t,s)=>{switch(t){case"devices":Se(n,e),we(n);break}},ge={isp:{name:"ISP",interfaces:{external:{name:"ens18",ip:"<ВНЕШНИЙ>",mask:"24",gateway:"192.168.44.1",destination:"Интернет"},hqRtr:{name:"ens19",ip:"172.16.4.1",mask:"28",gateway:"-",destination:"HQ-RTR"},brRtr:{name:"ens20",ip:"172.16.5.1",mask:"28",gateway:"-",destination:"BR-RTR"}}},hqRtr:{name:"HQ-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.4.2",mask:"28",gateway:"172.16.4.1",destination:"ISP"},br:{name:"gre1",ip:"10.5.5.1",mask:"30",gateway:"-",destination:"BR-RTR"},hqCli:{name:"VLAN100",ip:"192.168.100.1",mask:"28",gateway:"-",destination:"HQ-CLI"},hqSrv:{name:"VLAN200",ip:"192.168.200.1",mask:"28",gateway:"-",destination:"HQ-SRV"},vlan999:{name:"VLAN999",ip:"192.168.99.1",mask:"29",gateway:"-",destination:"VLAN999 (?)"}}},hqSrv:{name:"HQ-SRV",interfaces:{hqRtr:{name:"ens18",ip:"192.168.100.2",mask:"28",gateway:"192.168.100.1",destination:"HQ-RTR"}}},hqCli:{name:"HQ-CLI",interfaces:{hqRtr:{name:"ens18",ip:"192.168.200.2",mask:"28",gateway:"192.168.200.1",destination:"HQ-RTR"}}},brRtr:{name:"BR-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.5.2",mask:"28",gateway:"172.16.5.1",destination:"ISP"},brSrv:{name:"ens19",ip:"192.168.0.1",mask:"28",gateway:"-",destination:"BR-SRV"},hqRtr:{name:"gre1",ip:"10.5.5.2",mask:"30",gateway:"-",destination:"HQ-RTR"}}},brSrv:{name:"BR-SRV",interfaces:{brRtr:{name:"ens18",ip:"192.168.0.2",mask:"28",gateway:"192.168.0.1",destination:"BR-RTR"}}}},ve=()=>{const n={ipTableContainer:document.getElementById("ip-table-container"),textContainer:document.getElementById("text-container")},e={devices:[]},t=B(e,_e(n,e));t.devices=ge};ve();
