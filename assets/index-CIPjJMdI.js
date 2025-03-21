(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const p of document.querySelectorAll('link[rel="modulepreload"]'))s(p);new MutationObserver(p=>{for(const c of p)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(p){const c={};return p.integrity&&(c.integrity=p.integrity),p.referrerPolicy&&(c.referrerPolicy=p.referrerPolicy),p.crossOrigin==="use-credentials"?c.credentials="include":p.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(p){if(p.ep)return;p.ep=!0;const c=t(p);fetch(p.href,c)}})();const w=".",$=Symbol("target"),Y=Symbol("unsubscribe");function P(n){return n instanceof Date||n instanceof Set||n instanceof Map||n instanceof WeakSet||n instanceof WeakMap||ArrayBuffer.isView(n)}function se(n){return(typeof n=="object"?n===null:typeof n!="function")||n instanceof RegExp}const R=Array.isArray;function E(n){return typeof n=="symbol"}const b={after(n,e){return R(n)?n.slice(e.length):e===""?n:n.slice(e.length+1)},concat(n,e){return R(n)?(n=[...n],e&&n.push(e),n):e&&e.toString!==void 0?(n!==""&&(n+=w),E(e)?n+e.toString():n+e):n},initial(n){if(R(n))return n.slice(0,-1);if(n==="")return n;const e=n.lastIndexOf(w);return e===-1?"":n.slice(0,e)},last(n){if(R(n))return n.at(-1)??"";if(n==="")return n;const e=n.lastIndexOf(w);return e===-1?n:n.slice(e+1)},walk(n,e){if(R(n))for(const t of n)e(t);else if(n!==""){let t=0,s=n.indexOf(w);if(s===-1)e(n);else for(;t<n.length;)s===-1&&(s=n.length),e(n.slice(t,s)),t=s+1,s=n.indexOf(w,t)}},get(n,e){return this.walk(e,t=>{n&&(n=n[t])}),n},isSubPath(n,e){if(R(n)){if(n.length<e.length)return!1;for(let t=0;t<e.length;t++)if(n[t]!==e[t])return!1;return!0}return n.length<e.length?!1:n===e?!0:n.startsWith(e)?n[e.length]===w:!1},isRootPath(n){return R(n)?n.length===0:n===""}};function pe(n){return typeof n=="object"&&typeof n.next=="function"}function ie(n,e,t,s,p){const c=n.next;if(e.name==="entries")n.next=function(){const l=c.call(this);return l.done===!1&&(l.value[0]=p(l.value[0],e,l.value[0],s),l.value[1]=p(l.value[1],e,l.value[0],s)),l};else if(e.name==="values"){const l=t[$].keys();n.next=function(){const h=c.call(this);return h.done===!1&&(h.value=p(h.value,e,l.next().value,s)),h}}else n.next=function(){const l=c.call(this);return l.done===!1&&(l.value=p(l.value,e,l.value,s)),l};return n}function W(n,e,t){return n.isUnsubscribed||e.ignoreSymbols&&E(t)||e.ignoreUnderscores&&t.charAt(0)==="_"||"ignoreKeys"in e&&e.ignoreKeys.includes(t)}class re{constructor(e){this._equals=e,this._proxyCache=new WeakMap,this._pathCache=new WeakMap,this.isUnsubscribed=!1}_getDescriptorCache(){return this._descriptorCache===void 0&&(this._descriptorCache=new WeakMap),this._descriptorCache}_getProperties(e){const t=this._getDescriptorCache();let s=t.get(e);return s===void 0&&(s={},t.set(e,s)),s}_getOwnPropertyDescriptor(e,t){if(this.isUnsubscribed)return Reflect.getOwnPropertyDescriptor(e,t);const s=this._getProperties(e);let p=s[t];return p===void 0&&(p=Reflect.getOwnPropertyDescriptor(e,t),s[t]=p),p}getProxy(e,t,s,p){if(this.isUnsubscribed)return e;const c=e[p],l=c??e;this._pathCache.set(l,t);let h=this._proxyCache.get(l);return h===void 0&&(h=c===void 0?new Proxy(e,s):e,this._proxyCache.set(l,h)),h}getPath(e){return this.isUnsubscribed?void 0:this._pathCache.get(e)}isDetached(e,t){return!Object.is(e,b.get(t,this.getPath(e)))}defineProperty(e,t,s){return Reflect.defineProperty(e,t,s)?(this.isUnsubscribed||(this._getProperties(e)[t]=s),!0):!1}setProperty(e,t,s,p,c){if(!this._equals(c,s)||!(t in e)){const l=this._getOwnPropertyDescriptor(e,t);return l!==void 0&&"set"in l?Reflect.set(e,t,s,p):Reflect.set(e,t,s)}return!0}deleteProperty(e,t,s){if(Reflect.deleteProperty(e,t)){if(!this.isUnsubscribed){const p=this._getDescriptorCache().get(e);p&&(delete p[t],this._pathCache.delete(s))}return!0}return!1}isSameDescriptor(e,t,s){const p=this._getOwnPropertyDescriptor(t,s);return e!==void 0&&p!==void 0&&Object.is(e.value,p.value)&&(e.writable||!1)===(p.writable||!1)&&(e.enumerable||!1)===(p.enumerable||!1)&&(e.configurable||!1)===(p.configurable||!1)&&e.get===p.get&&e.set===p.set}isGetInvariant(e,t){const s=this._getOwnPropertyDescriptor(e,t);return s!==void 0&&s.configurable!==!0&&s.writable!==!0}unsubscribe(){this._descriptorCache=null,this._pathCache=null,this._proxyCache=null,this.isUnsubscribed=!0}}function I(n){return toString.call(n)==="[object Object]"}function q(){return!0}function O(n,e){return n.length!==e.length||n.some((t,s)=>e[s]!==t)}const F=new Set(["hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]),ae=new Set(["concat","includes","indexOf","join","keys","lastIndexOf"]),j={push:q,pop:q,shift:q,unshift:q,copyWithin:O,reverse:O,sort:O,splice:O,flat:O,fill:O},ce=new Set([...F,...ae,...Object.keys(j)]);function M(n,e){if(n.size!==e.size)return!0;for(const t of n)if(!e.has(t))return!0;return!1}const J=["keys","values","entries"],X=new Set(["has","toString"]),Z={add:M,clear:M,delete:M,forEach:M},oe=new Set([...X,...Object.keys(Z),...J]);function A(n,e){if(n.size!==e.size)return!0;let t;for(const[s,p]of n)if(t=e.get(s),t!==p||t===void 0&&!e.has(s))return!0;return!1}const le=new Set([...X,"get"]),ee={set:A,clear:A,delete:A,forEach:A},de=new Set([...le,...Object.keys(ee),...J]);class g{constructor(e,t,s,p){this._path=t,this._isChanged=!1,this._clonedCache=new Set,this._hasOnValidate=p,this._changes=p?[]:null,this.clone=t===void 0?e:this._shallowClone(e)}static isHandledMethod(e){return F.has(e)}_shallowClone(e){let t=e;if(I(e))t={...e};else if(R(e)||ArrayBuffer.isView(e))t=[...e];else if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set([...e].map(s=>this._shallowClone(s)));else if(e instanceof Map){t=new Map;for(const[s,p]of e.entries())t.set(s,this._shallowClone(p))}return this._clonedCache.add(t),t}preferredThisArg(e,t,s,p){return e?(R(p)?this._onIsChanged=j[t]:p instanceof Set?this._onIsChanged=Z[t]:p instanceof Map&&(this._onIsChanged=ee[t]),p):s}update(e,t,s){const p=b.after(e,this._path);if(t!=="length"){let c=this.clone;b.walk(p,l=>{c!=null&&c[l]&&(this._clonedCache.has(c[l])||(c[l]=this._shallowClone(c[l])),c=c[l])}),this._hasOnValidate&&this._changes.push({path:p,property:t,previous:s}),c!=null&&c[t]&&(c[t]=s)}this._isChanged=!0}undo(e){let t;for(let s=this._changes.length-1;s!==-1;s--)t=this._changes[s],b.get(e,t.path)[t.property]=t.previous}isChanged(e){return this._onIsChanged===void 0?this._isChanged:this._onIsChanged(this.clone,e)}isPathApplicable(e){return b.isRootPath(this._path)||b.isSubPath(e,this._path)}}class z extends g{static isHandledMethod(e){return ce.has(e)}}class fe extends g{undo(e){e.setTime(this.clone.getTime())}isChanged(e,t){return!t(this.clone.valueOf(),e.valueOf())}}class G extends g{static isHandledMethod(e){return oe.has(e)}undo(e){for(const t of this.clone)e.add(t);for(const t of e)this.clone.has(t)||e.delete(t)}}class K extends g{static isHandledMethod(e){return de.has(e)}undo(e){for(const[t,s]of this.clone.entries())e.set(t,s);for(const t of e.keys())this.clone.has(t)||e.delete(t)}}class he extends g{constructor(e,t,s,p){super(void 0,t,s,p),this._argument1=s[0],this._weakValue=e.has(this._argument1)}isChanged(e){return this._weakValue!==e.has(this._argument1)}undo(e){this._weakValue&&!e.has(this._argument1)?e.add(this._argument1):e.delete(this._argument1)}}class ue extends g{constructor(e,t,s,p){super(void 0,t,s,p),this._weakKey=s[0],this._weakHas=e.has(this._weakKey),this._weakValue=e.get(this._weakKey)}isChanged(e){return this._weakValue!==e.get(this._weakKey)}undo(e){const t=e.has(this._weakKey);this._weakHas&&!t?e.set(this._weakKey,this._weakValue):!this._weakHas&&t?e.delete(this._weakKey):this._weakValue!==e.get(this._weakKey)&&e.set(this._weakKey,this._weakValue)}}class y{constructor(e){this._stack=[],this._hasOnValidate=e}static isHandledType(e){return I(e)||R(e)||P(e)}static isHandledMethod(e,t){return I(e)?g.isHandledMethod(t):R(e)?z.isHandledMethod(t):e instanceof Set?G.isHandledMethod(t):e instanceof Map?K.isHandledMethod(t):P(e)}get isCloning(){return this._stack.length>0}start(e,t,s){let p=g;R(e)?p=z:e instanceof Date?p=fe:e instanceof Set?p=G:e instanceof Map?p=K:e instanceof WeakSet?p=he:e instanceof WeakMap&&(p=ue),this._stack.push(new p(e,t,s,this._hasOnValidate))}update(e,t,s){this._stack.at(-1).update(e,t,s)}preferredThisArg(e,t,s){const{name:p}=e,c=y.isHandledMethod(s,p);return this._stack.at(-1).preferredThisArg(c,p,t,s)}isChanged(e,t,s){return this._stack.at(-1).isChanged(e,t,s)}isPartOfClone(e){return this._stack.at(-1).isPathApplicable(e)}undo(e){this._previousClone!==void 0&&this._previousClone.undo(e)}stop(){return this._previousClone=this._stack.pop(),this._previousClone.clone}}const me={equals:Object.is,isShallow:!1,pathAsArray:!1,ignoreSymbols:!1,ignoreUnderscores:!1,ignoreDetached:!1,details:!1},D=(n,e,t={})=>{t={...me,...t};const s=Symbol("ProxyTarget"),{equals:p,isShallow:c,ignoreDetached:l,details:h}=t,f=new re(p),_=typeof t.onValidate=="function",m=new y(_),T=(i,a,o,d,u)=>!_||m.isCloning||t.onValidate(b.concat(f.getPath(i),a),o,d,u)===!0,H=(i,a,o,d)=>{!W(f,t,a)&&!(l&&f.isDetached(i,n))&&N(f.getPath(i),a,o,d)},N=(i,a,o,d,u)=>{m.isCloning&&m.isPartOfClone(i)?m.update(i,a,d):e(b.concat(i,a),o,d,u)},B=i=>i&&(i[s]??i),V=(i,a,o,d)=>{if(se(i)||o==="constructor"||c&&!y.isHandledMethod(a,o)||W(f,t,o)||f.isGetInvariant(a,o)||l&&f.isDetached(a,n))return i;d===void 0&&(d=f.getPath(a));const u=b.concat(d,o),v=f.getPath(i);return v&&te(u,v)?f.getProxy(i,v,k,s):f.getProxy(i,u,k,s)},te=(i,a)=>{if(E(i)||i.length<=a.length||R(a)&&a.length===0)return!1;const o=R(i)?i:i.split(w),d=R(a)?a:a.split(w);return o.length<=d.length?!1:!d.some((u,v)=>u!==o[v])},k={get(i,a,o){if(E(a)){if(a===s||a===$)return i;if(a===Y&&!f.isUnsubscribed&&f.getPath(i).length===0)return f.unsubscribe(),i}const d=P(i)?Reflect.get(i,a):Reflect.get(i,a,o);return V(d,i,a)},set(i,a,o,d){o=B(o);const u=i[s]??i,v=u[a];if(p(v,o)&&a in i)return!0;const S=T(i,a,o,v);return S&&f.setProperty(u,a,o,d,v)?(H(i,a,i[a],v),!0):!S},defineProperty(i,a,o){if(!f.isSameDescriptor(o,i,a)){const d=i[a];T(i,a,o.value,d)&&f.defineProperty(i,a,o,d)&&H(i,a,o.value,d)}return!0},deleteProperty(i,a){if(!Reflect.has(i,a))return!0;const o=Reflect.get(i,a),d=T(i,a,void 0,o);return d&&f.deleteProperty(i,a,o)?(H(i,a,void 0,o),!0):!d},apply(i,a,o){const d=a[s]??a;if(f.isUnsubscribed)return Reflect.apply(i,d,o);if((h===!1||h!==!0&&!h.includes(i.name))&&y.isHandledType(d)){let u=b.initial(f.getPath(i));const v=y.isHandledMethod(d,i.name);m.start(d,u,o);let S=Reflect.apply(i,m.preferredThisArg(i,a,d),v?o.map(C=>B(C)):o);const ne=m.isChanged(d,p),x=m.stop();if(y.isHandledType(S)&&v&&(a instanceof Map&&i.name==="get"&&(u=b.concat(u,o[0])),S=f.getProxy(S,u,k)),ne){const C={name:i.name,args:o,result:S},Q=m.isCloning?b.initial(u):u,U=m.isCloning?b.last(u):"";T(b.get(n,Q),U,d,x,C)?N(Q,U,d,x,C):m.undo(d)}return(a instanceof Map||a instanceof Set)&&pe(S)?ie(S,i,a,u,V):S}return Reflect.apply(i,a,o)}},L=f.getProxy(n,t.pathAsArray?[]:"",k);return e=e.bind(L),_&&(t.onValidate=t.onValidate.bind(L)),L};D.target=n=>(n==null?void 0:n[$])??n;D.unsubscribe=n=>(n==null?void 0:n[Y])??n;const r={isp:{interfaces:{hqRtr:{name:"ens19",ip:"172.16.4.1",mask:"28"},brRtr:{name:"ens20",ip:"172.16.5.1",mask:"28"}}},hqRtr:{interfaces:{isp:{name:"ens18",ip:"172.16.4.2",mask:"28"},brRtr:{ip:"10.5.5.1",mask:"30"},hqCli:{ip:"192.168.100.1",mask:"28"},hqSrv:{ip:"192.168.200.1",mask:"28"},vlan999:{ip:"192.168.99.1",mask:"29"}}},hqSrv:{interfaces:{hqRtr:{ip:"192.168.100.2",mask:"28"}}},hqCli:{interfaces:{hqRtr:{ip:"192.168.200.2",mask:"28"}}},brRtr:{interfaces:{isp:{ip:"172.16.5.2",mask:"28"},brSrv:{ip:"192.168.0.1",mask:"28"},hqRtr:{ip:"10.5.5.2",mask:"30"}}},brSrv:{interfaces:{brRtr:{ip:"192.168.0.2"}}}},Re=()=>`
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
<p>выставляем ручной ip для ${r.isp.interfaces.hqRtr.name}: ${r.isp.interfaces.hqRtr.ip}/${r.isp.interfaces.hqRtr.mask}</p>
<p>аналогично настраиваем ${r.isp.interfaces.brRtr.name}: ${r.isp.interfaces.brRtr.ip}/${r.isp.interfaces.brRtr.mask}</p>
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
<p>Открываем конфигурацию ${r.hqRtr.interfaces.isp.name} в vim /etc/net/ifaces/${r.hqRtr.interfaces.isp.name}/options</p>
<p><code>BOOTPROTO=static</code></p>
<p><code>SYSTEMD_BOOTPROTO=static</code></p>
<p>Создаем файл конфигурации <code>vim /etc/net/ifaces/ens18/ipv4address</code></p>
<p>${r.hqRtr.interfaces.isp.ip}/${r.hqRtr.interfaces.isp.mask}</p>
<p>Создаем файл конфигурации <code>vim /etc/net/ifaces/ens18/ipv4route</code></p>
<p>Вводим строку <code>default via ${r.isp.interfaces.hqRtr.ip}</code></p>
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
<p>${r.brRtr.interfaces.isp.ip}/${r.brRtr.interfaces.isp.mask}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
<p>Вводим строку default via ${r.isp.interfaces.brRtr.ip}</p>
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
<p>ip ${r.brRtr.interfaces.brSrv.ip}/${r.brRtr.interfaces.brSrv.mask}</p>
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
<p>${r.brRtr.interfaces.brSrv.ip}/${r.brRtr.interfaces.brSrv.mask}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
<p>Вводим строку default via ${r.brRtr.interfaces.brSrv.ip}</p>
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
<p>${r.hqSrv.interfaces.hqRtr.ip}/${r.hqSrv.interfaces.hqRtr.mask}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
<p>Вводим строку default via ${r.hqRtr.interfaces.hqCli.ip}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>nameserver 8.8.8.8</p>
<p>systemctl restart network</p>
<p>systemctl restart NetworkManager</p>
<p>ping ${r.hqRtr.interfaces.hqCli.ip}</p>
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
<p>echo ‘${r.hqRtr.interfaces.hqCli.ip}/${r.hqRtr.interfaces.hqCli.mask}’ >> /etc/net/ifaces/vlan100/ipv4address</p>
<p>echo ‘${r.hqRtr.interfaces.hqSrv.ip}/${r.hqRtr.interfaces.hqSrv.mask}’ >> /etc/net/ifaces/vlan200/ipv4address</p>
<p>echo ‘${r.hqRtr.interfaces.vlan999.ip}/${r.hqRtr.interfaces.vlan999.mask}’ >> /etc/net/ifaces/vlan999/ipv4address</p>
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
<p>${r.hqCli.interfaces.hqRtr.ip}/${r.hqCli.interfaces.hqRtr.mask}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
<p>Вводим строку default via ${r.hqRtr.interfaces.hqSrv.ip}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>nameserver 8.8.8.8</p>
<p>systemctl restart network</p>
<p>systemctl restart NetworkManager</p>
<p>ip -br a</p>
<p>ping ${r.hqRtr.interfaces.hqSrv.ip}</p>
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
<p>Local ip ${r.brRtr.interfaces.isp.ip}</p>
<p>Remote ip ${r.hqRtr.interfaces.isp.ip}</p>
<p>IPv4 manual</p>
<p>Addresses ${r.brRtr.interfaces.hqRtr.ip}/${r.brRtr.interfaces.hqRtr.mask}</p>
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
<p>Local ip ${r.hqRtr.interfaces.isp.ip}</p>
<p>Remote ip ${r.brRtr.interfaces.isp.ip}</p>
<p>IPv4 manual</p>
<p>Addresses ${r.hqRtr.interfaces.brRtr.ip}/${r.hqRtr.interfaces.brRtr.mask}</p>
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
<p>option domain-name-servers ${r.hqSrv.interfaces.hqRtr.ip};</p>
<p>добавить после</p>
<p>ddns-update-style interim;</p>
<p>update-static-leases on;</p>
<p>zone au-team.irpo {</p>
<p>	primary ${r.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<p>выбрать начало “y” “3” и в конце “p”</p>
<br>
<p>zone 100.168.192.in-addr.arpa {</p>
<p>	primary ${r.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<br>
<p>zone 200.168.192.in-addr.arpa {</p>
<p>	primary ${r.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<br>
<p>меняем строки:</p>
<p>subnet 192.168.200.0 netmask 255.255.255.240 {</p>
<p>	range ${r.hqCli.interfaces.hqRtr.ip} 192.168.200.5;</p>
<p>	option routers ${r.hqRtr.interfaces.hqSrv.ip};</p>
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
<p>	IN	A	${r.hqSrv.interfaces.hqRtr.ip}</p>
<p>10	IN	PTR	hq-srv.au-team.irpo</p>
<p>1	IN	PTR	hq-rtr.au-team.irpo</p>
<p>сохраняем</p>
<p>cp zone/100.db zone/200.db</p>
<p>vim zone/200.db</p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	200.168.192.in-addr.apra. root.200.168.192.in-addr.apra. (...)</p>
<p>	IN	NS	200.168.192.in-addr.apra.</p>
<p>	IN	A	${r.hqSrv.interfaces.hqRtr.ip}</p>
<p>10	IN	PTR	hq-cli.au-team.irpo</p>
<p>1	IN	PTR	hq-rtr.au-team.irpo</p>
<p>сохраняем</p>
<p>vim zone/au-team.db</p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	hq-srv.au-team.irpo. root.au-taem.irpo. (...)</p>
<p>	IN	NS	hq-srv.au-team.irpo.</p>
<p>	IN	A	${r.hqSrv.interfaces.hqRtr.ip}</p>
<p>hq-rtr	IN	A	${r.hqRtr.interfaces.hqCli.ip}</p>
<p>br-rtr	IN	A	${r.brRtr.interfaces.brSrv.ip}</p>
<p>hq-srv	IN	A	${r.hqSrv.interfaces.hqRtr.ip}</p>
<p>hq-cli	IN	A	${r.hqSrv.interfaces.hqRtr.ip}</p>
<p>br-srv	IN	A	${r.brSrv.interfaces.brRtr.ip}</p>
<p>wiki	IN	CNAME	hq-rtr.au-team.irpo.</p>
<p>moodle	IN	CNAME	hq-rtr.au-team.irpo.</p>
<p>сохраняем</p>
<p>rndc-confgen > rndc.key</p>
<p>sed -i ‘6.$d’ rndc.key</p>
<p>chgrp -R named zone/</p>
<p>named-checkconf</p>
<p>named-checkconf -z</p>
<p>vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>nameserver ${r.hqSrv.interfaces.hqRtr.ip}</p>
<p>domain au-team.irpo</p>
<p>systemctl restart network</p>
<p>systemctl aneble -- now bind</p>
<br>
<p>BR-RTR</p>
<p>vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>Скорректировать nameserver ${r.hqRtr.interfaces.hqCli.ip}</p>
<p>domain au-team.irpo</p>
<p>systemctl restart network</p>
<p>nmtui</p>
<p>перезапустить активные соединения ens</p>
<br>
<p>HQ-RTR</p>
<p>vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>Скорректировать nameserver ${r.hqRtr.interfaces.hqCli.ip}</p>
<p>domain au-team.irpo</p>
<p>systemctl restart network</p>
<p>nmtui</p>
<p>перезапустить активные соединения ens</p>
<br>
<p>Задание 11</p>
<p>HQ-SRV, BR-SRV, HQ-RTR, BR-RTR, HQ-CLI</p>
<p>timedatectl set-timezone Europe/Moscow</p>
`,be=(n,{devices:e})=>{const t=document.createElement("table"),s=document.createElement("thead");s.innerHTML=`
    <tr>
      <th>Имя устройства</th>
      <th>Назначение (куда смотрит)</th>
      <th>IP-адрес</th>
      <th>Маска</th>
      <th>Шлюз по умолчанию</th>
    </tr>
  `,t.appendChild(s);const p=document.createElement("tbody");Object.values(e).forEach(({name:c,interfaces:l})=>{const h=Object.values(l);if(!h.length)return;const f=document.createElement("tr");f.innerHTML=`
      <td rowspan="${h.length}">${c}</td>
      <td>${h[0].destination||"-"}</td>
      <td>${h[0].ip}</td>
      <td>${h[0].mask}</td>
      <td>${h[0].gateway}</td>
    `,p.appendChild(f);for(let _=1;_<h.length;_+=1){const m=h[_],T=document.createElement("tr");T.innerHTML=`
        <td>${m.destination||"-"}</td>
        <td>${m.ip}</td>
        <td>${m.mask}</td>
        <td>${m.gateway}</td>
      `,p.appendChild(T)}}),t.appendChild(p),n.ipTableContainer.innerHTML="",n.ipTableContainer.appendChild(t)},ve=(n,e)=>{const t=Re();n.textContainer.innerHTML=t},Se=(n,e)=>(t,s)=>{switch(t){case"devices":be(n,e),ve(n);break}},we={isp:{name:"ISP",interfaces:{external:{name:"ens18",ip:"<ВНЕШНИЙ>",mask:"24",gateway:"<ВНЕШНИЙ>",destination:"Интернет"},hqRtr:{name:"ens19",ip:"172.16.4.1",mask:"28",gateway:"-",destination:"HQ-RTR"},brRtr:{name:"ens20",ip:"172.16.5.1",mask:"28",gateway:"-",destination:"BR-RTR"}}},hqRtr:{name:"HQ-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.4.2",mask:"28",gateway:"172.16.4.1",destination:"ISP"},brRtr:{name:"gre1",ip:"10.5.5.1",mask:"30",gateway:"-",destination:"BR-RTR"},hqCli:{name:"VLAN100",ip:"192.168.100.1",mask:"28",gateway:"-",destination:"HQ-CLI"},hqSrv:{name:"VLAN200",ip:"192.168.200.1",mask:"28",gateway:"-",destination:"HQ-SRV"},vlan999:{name:"VLAN999",ip:"192.168.99.1",mask:"29",gateway:"-",destination:"VLAN999 (?)"}}},hqSrv:{name:"HQ-SRV",interfaces:{hqRtr:{name:"ens18",ip:"192.168.100.2",mask:"28",gateway:"192.168.100.1",destination:"HQ-RTR"}}},hqCli:{name:"HQ-CLI",interfaces:{hqRtr:{name:"ens18",ip:"192.168.200.2",mask:"28",gateway:"192.168.200.1",destination:"HQ-RTR"}}},brRtr:{name:"BR-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.5.2",mask:"28",gateway:"172.16.5.1",destination:"ISP"},brSrv:{name:"ens19",ip:"192.168.0.1",mask:"28",gateway:"-",destination:"BR-SRV"},hqRtr:{name:"gre1",ip:"10.5.5.2",mask:"30",gateway:"-",destination:"HQ-RTR"}}},brSrv:{name:"BR-SRV",interfaces:{brRtr:{name:"ens18",ip:"192.168.0.2",mask:"28",gateway:"192.168.0.1",destination:"BR-RTR"}}}},ge=()=>{const n={ipTableContainer:document.getElementById("ip-table-container"),textContainer:document.getElementById("text-container")},e={devices:[]},t=D(e,Se(n,e));t.devices=we};ge();
