(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const p of document.querySelectorAll('link[rel="modulepreload"]'))n(p);new MutationObserver(p=>{for(const c of p)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function t(p){const c={};return p.integrity&&(c.integrity=p.integrity),p.referrerPolicy&&(c.referrerPolicy=p.referrerPolicy),p.crossOrigin==="use-credentials"?c.credentials="include":p.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(p){if(p.ep)return;p.ep=!0;const c=t(p);fetch(p.href,c)}})();const g=".",I=Symbol("target"),Y=Symbol("unsubscribe");function P(s){return s instanceof Date||s instanceof Set||s instanceof Map||s instanceof WeakSet||s instanceof WeakMap||ArrayBuffer.isView(s)}function ne(s){return(typeof s=="object"?s===null:typeof s!="function")||s instanceof RegExp}const R=Array.isArray;function E(s){return typeof s=="symbol"}const b={after(s,e){return R(s)?s.slice(e.length):e===""?s:s.slice(e.length+1)},concat(s,e){return R(s)?(s=[...s],e&&s.push(e),s):e&&e.toString!==void 0?(s!==""&&(s+=g),E(e)?s+e.toString():s+e):s},initial(s){if(R(s))return s.slice(0,-1);if(s==="")return s;const e=s.lastIndexOf(g);return e===-1?"":s.slice(0,e)},last(s){if(R(s))return s.at(-1)??"";if(s==="")return s;const e=s.lastIndexOf(g);return e===-1?s:s.slice(e+1)},walk(s,e){if(R(s))for(const t of s)e(t);else if(s!==""){let t=0,n=s.indexOf(g);if(n===-1)e(s);else for(;t<s.length;)n===-1&&(n=s.length),e(s.slice(t,n)),t=n+1,n=s.indexOf(g,t)}},get(s,e){return this.walk(e,t=>{s&&(s=s[t])}),s},isSubPath(s,e){if(R(s)){if(s.length<e.length)return!1;for(let t=0;t<e.length;t++)if(s[t]!==e[t])return!1;return!0}return s.length<e.length?!1:s===e?!0:s.startsWith(e)?s[e.length]===g:!1},isRootPath(s){return R(s)?s.length===0:s===""}};function pe(s){return typeof s=="object"&&typeof s.next=="function"}function ie(s,e,t,n,p){const c=s.next;if(e.name==="entries")s.next=function(){const d=c.call(this);return d.done===!1&&(d.value[0]=p(d.value[0],e,d.value[0],n),d.value[1]=p(d.value[1],e,d.value[0],n)),d};else if(e.name==="values"){const d=t[I].keys();s.next=function(){const h=c.call(this);return h.done===!1&&(h.value=p(h.value,e,d.next().value,n)),h}}else s.next=function(){const d=c.call(this);return d.done===!1&&(d.value=p(d.value,e,d.value,n)),d};return s}function W(s,e,t){return s.isUnsubscribed||e.ignoreSymbols&&E(t)||e.ignoreUnderscores&&t.charAt(0)==="_"||"ignoreKeys"in e&&e.ignoreKeys.includes(t)}class re{constructor(e){this._equals=e,this._proxyCache=new WeakMap,this._pathCache=new WeakMap,this.isUnsubscribed=!1}_getDescriptorCache(){return this._descriptorCache===void 0&&(this._descriptorCache=new WeakMap),this._descriptorCache}_getProperties(e){const t=this._getDescriptorCache();let n=t.get(e);return n===void 0&&(n={},t.set(e,n)),n}_getOwnPropertyDescriptor(e,t){if(this.isUnsubscribed)return Reflect.getOwnPropertyDescriptor(e,t);const n=this._getProperties(e);let p=n[t];return p===void 0&&(p=Reflect.getOwnPropertyDescriptor(e,t),n[t]=p),p}getProxy(e,t,n,p){if(this.isUnsubscribed)return e;const c=e[p],d=c??e;this._pathCache.set(d,t);let h=this._proxyCache.get(d);return h===void 0&&(h=c===void 0?new Proxy(e,n):e,this._proxyCache.set(d,h)),h}getPath(e){return this.isUnsubscribed?void 0:this._pathCache.get(e)}isDetached(e,t){return!Object.is(e,b.get(t,this.getPath(e)))}defineProperty(e,t,n){return Reflect.defineProperty(e,t,n)?(this.isUnsubscribed||(this._getProperties(e)[t]=n),!0):!1}setProperty(e,t,n,p,c){if(!this._equals(c,n)||!(t in e)){const d=this._getOwnPropertyDescriptor(e,t);return d!==void 0&&"set"in d?Reflect.set(e,t,n,p):Reflect.set(e,t,n)}return!0}deleteProperty(e,t,n){if(Reflect.deleteProperty(e,t)){if(!this.isUnsubscribed){const p=this._getDescriptorCache().get(e);p&&(delete p[t],this._pathCache.delete(n))}return!0}return!1}isSameDescriptor(e,t,n){const p=this._getOwnPropertyDescriptor(t,n);return e!==void 0&&p!==void 0&&Object.is(e.value,p.value)&&(e.writable||!1)===(p.writable||!1)&&(e.enumerable||!1)===(p.enumerable||!1)&&(e.configurable||!1)===(p.configurable||!1)&&e.get===p.get&&e.set===p.set}isGetInvariant(e,t){const n=this._getOwnPropertyDescriptor(e,t);return n!==void 0&&n.configurable!==!0&&n.writable!==!0}unsubscribe(){this._descriptorCache=null,this._pathCache=null,this._proxyCache=null,this.isUnsubscribed=!0}}function L(s){return toString.call(s)==="[object Object]"}function O(){return!0}function k(s,e){return s.length!==e.length||s.some((t,n)=>e[n]!==t)}const F=new Set(["hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]),ae=new Set(["concat","includes","indexOf","join","keys","lastIndexOf"]),j={push:O,pop:O,shift:O,unshift:O,copyWithin:k,reverse:k,sort:k,splice:k,flat:k,fill:k},ce=new Set([...F,...ae,...Object.keys(j)]);function A(s,e){if(s.size!==e.size)return!0;for(const t of s)if(!e.has(t))return!0;return!1}const J=["keys","values","entries"],X=new Set(["has","toString"]),Z={add:A,clear:A,delete:A,forEach:A},oe=new Set([...X,...Object.keys(Z),...J]);function M(s,e){if(s.size!==e.size)return!0;let t;for(const[n,p]of s)if(t=e.get(n),t!==p||t===void 0&&!e.has(n))return!0;return!1}const de=new Set([...X,"get"]),ee={set:M,clear:M,delete:M,forEach:M},le=new Set([...de,...Object.keys(ee),...J]);class w{constructor(e,t,n,p){this._path=t,this._isChanged=!1,this._clonedCache=new Set,this._hasOnValidate=p,this._changes=p?[]:null,this.clone=t===void 0?e:this._shallowClone(e)}static isHandledMethod(e){return F.has(e)}_shallowClone(e){let t=e;if(L(e))t={...e};else if(R(e)||ArrayBuffer.isView(e))t=[...e];else if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set([...e].map(n=>this._shallowClone(n)));else if(e instanceof Map){t=new Map;for(const[n,p]of e.entries())t.set(n,this._shallowClone(p))}return this._clonedCache.add(t),t}preferredThisArg(e,t,n,p){return e?(R(p)?this._onIsChanged=j[t]:p instanceof Set?this._onIsChanged=Z[t]:p instanceof Map&&(this._onIsChanged=ee[t]),p):n}update(e,t,n){const p=b.after(e,this._path);if(t!=="length"){let c=this.clone;b.walk(p,d=>{c!=null&&c[d]&&(this._clonedCache.has(c[d])||(c[d]=this._shallowClone(c[d])),c=c[d])}),this._hasOnValidate&&this._changes.push({path:p,property:t,previous:n}),c!=null&&c[t]&&(c[t]=n)}this._isChanged=!0}undo(e){let t;for(let n=this._changes.length-1;n!==-1;n--)t=this._changes[n],b.get(e,t.path)[t.property]=t.previous}isChanged(e){return this._onIsChanged===void 0?this._isChanged:this._onIsChanged(this.clone,e)}isPathApplicable(e){return b.isRootPath(this._path)||b.isSubPath(e,this._path)}}class z extends w{static isHandledMethod(e){return ce.has(e)}}class fe extends w{undo(e){e.setTime(this.clone.getTime())}isChanged(e,t){return!t(this.clone.valueOf(),e.valueOf())}}class G extends w{static isHandledMethod(e){return oe.has(e)}undo(e){for(const t of this.clone)e.add(t);for(const t of e)this.clone.has(t)||e.delete(t)}}class K extends w{static isHandledMethod(e){return le.has(e)}undo(e){for(const[t,n]of this.clone.entries())e.set(t,n);for(const t of e.keys())this.clone.has(t)||e.delete(t)}}class he extends w{constructor(e,t,n,p){super(void 0,t,n,p),this._argument1=n[0],this._weakValue=e.has(this._argument1)}isChanged(e){return this._weakValue!==e.has(this._argument1)}undo(e){this._weakValue&&!e.has(this._argument1)?e.add(this._argument1):e.delete(this._argument1)}}class ue extends w{constructor(e,t,n,p){super(void 0,t,n,p),this._weakKey=n[0],this._weakHas=e.has(this._weakKey),this._weakValue=e.get(this._weakKey)}isChanged(e){return this._weakValue!==e.get(this._weakKey)}undo(e){const t=e.has(this._weakKey);this._weakHas&&!t?e.set(this._weakKey,this._weakValue):!this._weakHas&&t?e.delete(this._weakKey):this._weakValue!==e.get(this._weakKey)&&e.set(this._weakKey,this._weakValue)}}class T{constructor(e){this._stack=[],this._hasOnValidate=e}static isHandledType(e){return L(e)||R(e)||P(e)}static isHandledMethod(e,t){return L(e)?w.isHandledMethod(t):R(e)?z.isHandledMethod(t):e instanceof Set?G.isHandledMethod(t):e instanceof Map?K.isHandledMethod(t):P(e)}get isCloning(){return this._stack.length>0}start(e,t,n){let p=w;R(e)?p=z:e instanceof Date?p=fe:e instanceof Set?p=G:e instanceof Map?p=K:e instanceof WeakSet?p=he:e instanceof WeakMap&&(p=ue),this._stack.push(new p(e,t,n,this._hasOnValidate))}update(e,t,n){this._stack.at(-1).update(e,t,n)}preferredThisArg(e,t,n){const{name:p}=e,c=T.isHandledMethod(n,p);return this._stack.at(-1).preferredThisArg(c,p,t,n)}isChanged(e,t,n){return this._stack.at(-1).isChanged(e,t,n)}isPartOfClone(e){return this._stack.at(-1).isPathApplicable(e)}undo(e){this._previousClone!==void 0&&this._previousClone.undo(e)}stop(){return this._previousClone=this._stack.pop(),this._previousClone.clone}}const me={equals:Object.is,isShallow:!1,pathAsArray:!1,ignoreSymbols:!1,ignoreUnderscores:!1,ignoreDetached:!1,details:!1},D=(s,e,t={})=>{t={...me,...t};const n=Symbol("ProxyTarget"),{equals:p,isShallow:c,ignoreDetached:d,details:h}=t,f=new re(p),_=typeof t.onValidate=="function",m=new T(_),y=(r,a,o,l,u)=>!_||m.isCloning||t.onValidate(b.concat(f.getPath(r),a),o,l,u)===!0,H=(r,a,o,l)=>{!W(f,t,a)&&!(d&&f.isDetached(r,s))&&N(f.getPath(r),a,o,l)},N=(r,a,o,l,u)=>{m.isCloning&&m.isPartOfClone(r)?m.update(r,a,l):e(b.concat(r,a),o,l,u)},B=r=>r&&(r[n]??r),x=(r,a,o,l)=>{if(ne(r)||o==="constructor"||c&&!T.isHandledMethod(a,o)||W(f,t,o)||f.isGetInvariant(a,o)||d&&f.isDetached(a,s))return r;l===void 0&&(l=f.getPath(a));const u=b.concat(l,o),v=f.getPath(r);return v&&te(u,v)?f.getProxy(r,v,q,n):f.getProxy(r,u,q,n)},te=(r,a)=>{if(E(r)||r.length<=a.length||R(a)&&a.length===0)return!1;const o=R(r)?r:r.split(g),l=R(a)?a:a.split(g);return o.length<=l.length?!1:!l.some((u,v)=>u!==o[v])},q={get(r,a,o){if(E(a)){if(a===n||a===I)return r;if(a===Y&&!f.isUnsubscribed&&f.getPath(r).length===0)return f.unsubscribe(),r}const l=P(r)?Reflect.get(r,a):Reflect.get(r,a,o);return x(l,r,a)},set(r,a,o,l){o=B(o);const u=r[n]??r,v=u[a];if(p(v,o)&&a in r)return!0;const S=y(r,a,o,v);return S&&f.setProperty(u,a,o,l,v)?(H(r,a,r[a],v),!0):!S},defineProperty(r,a,o){if(!f.isSameDescriptor(o,r,a)){const l=r[a];y(r,a,o.value,l)&&f.defineProperty(r,a,o,l)&&H(r,a,o.value,l)}return!0},deleteProperty(r,a){if(!Reflect.has(r,a))return!0;const o=Reflect.get(r,a),l=y(r,a,void 0,o);return l&&f.deleteProperty(r,a,o)?(H(r,a,void 0,o),!0):!l},apply(r,a,o){const l=a[n]??a;if(f.isUnsubscribed)return Reflect.apply(r,l,o);if((h===!1||h!==!0&&!h.includes(r.name))&&T.isHandledType(l)){let u=b.initial(f.getPath(r));const v=T.isHandledMethod(l,r.name);m.start(l,u,o);let S=Reflect.apply(r,m.preferredThisArg(r,a,l),v?o.map(C=>B(C)):o);const se=m.isChanged(l,p),V=m.stop();if(T.isHandledType(S)&&v&&(a instanceof Map&&r.name==="get"&&(u=b.concat(u,o[0])),S=f.getProxy(S,u,q)),se){const C={name:r.name,args:o,result:S},Q=m.isCloning?b.initial(u):u,U=m.isCloning?b.last(u):"";y(b.get(s,Q),U,l,V,C)?N(Q,U,l,V,C):m.undo(l)}return(a instanceof Map||a instanceof Set)&&pe(S)?ie(S,r,a,u,x):S}return Reflect.apply(r,a,o)}},$=f.getProxy(s,t.pathAsArray?[]:"",q);return e=e.bind($),_&&(t.onValidate=t.onValidate.bind($)),$};D.target=s=>(s==null?void 0:s[I])??s;D.unsubscribe=s=>(s==null?void 0:s[Y])??s;const i={isp:{interfaces:{hqRtr:{name:"ens19",ip:"172.16.4.1",mask:"28"},brRtr:{name:"ens20",ip:"172.16.5.1",mask:"28"}}},hqRtr:{interfaces:{isp:{name:"ens18",ip:"172.16.4.2",mask:"28"},brRtr:{ip:"10.5.5.1",mask:"30"},hqCli:{ip:"192.168.100.1",mask:"28"},hqSrv:{ip:"192.168.200.1",mask:"28"},vlan999:{ip:"192.168.99.1",mask:"29"}}},hqSrv:{interfaces:{hqRtr:{ip:"192.168.100.2",mask:"28"}}},hqCli:{interfaces:{hqRtr:{ip:"192.168.200.2",mask:"28"}}},brRtr:{interfaces:{isp:{name:"ens18",ip:"172.16.5.2",mask:"28"},brSrv:{ip:"192.168.0.1",mask:"28"},hqRtr:{ip:"10.5.5.2",mask:"30"}}},brSrv:{interfaces:{brRtr:{ip:"192.168.0.2"}}}},Re=()=>`
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
<p>выставляем ручной ip для ${i.isp.interfaces.hqRtr.name}: ${i.isp.interfaces.hqRtr.ip}/${i.isp.interfaces.hqRtr.mask}</p>
<p>аналогично настраиваем ${i.isp.interfaces.brRtr.name}: ${i.isp.interfaces.brRtr.ip}/${i.isp.interfaces.brRtr.mask}</p>
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
<p>Указываем статичный ipv4 адрес для ${i.hqRtr.interfaces.isp.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${i.hqRtr.interfaces.isp.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${i.hqRtr.interfaces.isp.ip}/${i.hqRtr.interfaces.isp.mask}' > /etc/net/ifaces/${i.hqRtr.interfaces.isp.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${i.isp.interfaces.hqRtr.ip}' > /etc/net/ifaces/${i.hqRtr.interfaces.isp.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${i.hqRtr.interfaces.isp.name}/resolv.conf></code></p>
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
<p>Указываем статичный ipv4 адрес для ${i.brRtr.interfaces.isp.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${i.brRtr.interfaces.isp.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${i.brRtr.interfaces.isp.ip}/${i.brRtr.interfaces.isp.mask}' > /etc/net/ifaces/${i.brRtr.interfaces.isp.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${i.isp.interfaces.brRtr.ip}' > /etc/net/ifaces/${i.brRtr.interfaces.isp.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${i.brRtr.interfaces.isp.name}/resolv.conf></code></p>
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
<p>ip ${i.brRtr.interfaces.brSrv.ip}/${i.brRtr.interfaces.brSrv.mask}</p>
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
<p>${i.brRtr.interfaces.brSrv.ip}/${i.brRtr.interfaces.brSrv.mask}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
<p>Вводим строку default via ${i.brRtr.interfaces.brSrv.ip}</p>
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
<p>${i.hqSrv.interfaces.hqRtr.ip}/${i.hqSrv.interfaces.hqRtr.mask}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
<p>Вводим строку default via ${i.hqRtr.interfaces.hqCli.ip}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>nameserver 8.8.8.8</p>
<p>systemctl restart network</p>
<p>systemctl restart NetworkManager</p>
<p>ping ${i.hqRtr.interfaces.hqCli.ip}</p>
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
<p>echo ‘${i.hqRtr.interfaces.hqCli.ip}/${i.hqRtr.interfaces.hqCli.mask}’ >> /etc/net/ifaces/vlan100/ipv4address</p>
<p>echo ‘${i.hqRtr.interfaces.hqSrv.ip}/${i.hqRtr.interfaces.hqSrv.mask}’ >> /etc/net/ifaces/vlan200/ipv4address</p>
<p>echo ‘${i.hqRtr.interfaces.vlan999.ip}/${i.hqRtr.interfaces.vlan999.mask}’ >> /etc/net/ifaces/vlan999/ipv4address</p>
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
<p>${i.hqCli.interfaces.hqRtr.ip}/${i.hqCli.interfaces.hqRtr.mask}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
<p>Вводим строку default via ${i.hqRtr.interfaces.hqSrv.ip}</p>
<p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>nameserver 8.8.8.8</p>
<p>systemctl restart network</p>
<p>systemctl restart NetworkManager</p>
<p>ip -br a</p>
<p>ping ${i.hqRtr.interfaces.hqSrv.ip}</p>
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
<p>Local ip ${i.brRtr.interfaces.isp.ip}</p>
<p>Remote ip ${i.hqRtr.interfaces.isp.ip}</p>
<p>IPv4 manual</p>
<p>Addresses ${i.brRtr.interfaces.hqRtr.ip}/${i.brRtr.interfaces.hqRtr.mask}</p>
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
<p>Local ip ${i.hqRtr.interfaces.isp.ip}</p>
<p>Remote ip ${i.brRtr.interfaces.isp.ip}</p>
<p>IPv4 manual</p>
<p>Addresses ${i.hqRtr.interfaces.brRtr.ip}/${i.hqRtr.interfaces.brRtr.mask}</p>
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
<p>option domain-name-servers ${i.hqSrv.interfaces.hqRtr.ip};</p>
<p>добавить после</p>
<p>ddns-update-style interim;</p>
<p>update-static-leases on;</p>
<p>zone au-team.irpo {</p>
<p>	primary ${i.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<p>выбрать начало “y” “3” и в конце “p”</p>
<br>
<p>zone 100.168.192.in-addr.arpa {</p>
<p>	primary ${i.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<br>
<p>zone 200.168.192.in-addr.arpa {</p>
<p>	primary ${i.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<br>
<p>меняем строки:</p>
<p>subnet 192.168.200.0 netmask 255.255.255.240 {</p>
<p>	range ${i.hqCli.interfaces.hqRtr.ip} 192.168.200.5;</p>
<p>	option routers ${i.hqRtr.interfaces.hqSrv.ip};</p>
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
<p>	IN	A	${i.hqSrv.interfaces.hqRtr.ip}</p>
<p>10	IN	PTR	hq-srv.au-team.irpo</p>
<p>1	IN	PTR	hq-rtr.au-team.irpo</p>
<p>сохраняем</p>
<p>cp zone/100.db zone/200.db</p>
<p>vim zone/200.db</p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	200.168.192.in-addr.apra. root.200.168.192.in-addr.apra. (...)</p>
<p>	IN	NS	200.168.192.in-addr.apra.</p>
<p>	IN	A	${i.hqSrv.interfaces.hqRtr.ip}</p>
<p>10	IN	PTR	hq-cli.au-team.irpo</p>
<p>1	IN	PTR	hq-rtr.au-team.irpo</p>
<p>сохраняем</p>
<p>vim zone/au-team.db</p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	hq-srv.au-team.irpo. root.au-taem.irpo. (...)</p>
<p>	IN	NS	hq-srv.au-team.irpo.</p>
<p>	IN	A	${i.hqSrv.interfaces.hqRtr.ip}</p>
<p>hq-rtr	IN	A	${i.hqRtr.interfaces.hqCli.ip}</p>
<p>br-rtr	IN	A	${i.brRtr.interfaces.brSrv.ip}</p>
<p>hq-srv	IN	A	${i.hqSrv.interfaces.hqRtr.ip}</p>
<p>hq-cli	IN	A	${i.hqSrv.interfaces.hqRtr.ip}</p>
<p>br-srv	IN	A	${i.brSrv.interfaces.brRtr.ip}</p>
<p>wiki	IN	CNAME	hq-rtr.au-team.irpo.</p>
<p>moodle	IN	CNAME	hq-rtr.au-team.irpo.</p>
<p>сохраняем</p>
<p>rndc-confgen > rndc.key</p>
<p>sed -i ‘6.$d’ rndc.key</p>
<p>chgrp -R named zone/</p>
<p>named-checkconf</p>
<p>named-checkconf -z</p>
<p>vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>nameserver ${i.hqSrv.interfaces.hqRtr.ip}</p>
<p>domain au-team.irpo</p>
<p>systemctl restart network</p>
<p>systemctl aneble -- now bind</p>
<br>
<p>BR-RTR</p>
<p>vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>Скорректировать nameserver ${i.hqRtr.interfaces.hqCli.ip}</p>
<p>domain au-team.irpo</p>
<p>systemctl restart network</p>
<p>nmtui</p>
<p>перезапустить активные соединения ens</p>
<br>
<p>HQ-RTR</p>
<p>vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>Скорректировать nameserver ${i.hqRtr.interfaces.hqCli.ip}</p>
<p>domain au-team.irpo</p>
<p>systemctl restart network</p>
<p>nmtui</p>
<p>перезапустить активные соединения ens</p>
<br>
<p>Задание 11</p>
<p>HQ-SRV, BR-SRV, HQ-RTR, BR-RTR, HQ-CLI</p>
<p>timedatectl set-timezone Europe/Moscow</p>
`,be=(s,{devices:e})=>{const t=document.createElement("table"),n=document.createElement("thead");n.innerHTML=`
    <tr>
      <th>Имя устройства</th>
      <th>Назначение (куда смотрит)</th>
      <th>IP-адрес</th>
      <th>Маска</th>
      <th>Шлюз по умолчанию</th>
    </tr>
  `,t.appendChild(n);const p=document.createElement("tbody");Object.values(e).forEach(({name:c,interfaces:d})=>{const h=Object.values(d);if(!h.length)return;const f=document.createElement("tr");f.innerHTML=`
      <td rowspan="${h.length}">${c}</td>
      <td>${h[0].destination||"-"}</td>
      <td>${h[0].ip}</td>
      <td>${h[0].mask}</td>
      <td>${h[0].gateway}</td>
    `,p.appendChild(f);for(let _=1;_<h.length;_+=1){const m=h[_],y=document.createElement("tr");y.innerHTML=`
        <td>${m.destination||"-"}</td>
        <td>${m.ip}</td>
        <td>${m.mask}</td>
        <td>${m.gateway}</td>
      `,p.appendChild(y)}}),t.appendChild(p),s.ipTableContainer.innerHTML="",s.ipTableContainer.appendChild(t)},ve=(s,e)=>{const t=Re();s.textContainer.innerHTML=t},Se=(s,e)=>(t,n)=>{switch(t){case"devices":be(s,e),ve(s);break}},ge={isp:{name:"ISP",interfaces:{external:{name:"ens18",ip:"<ВНЕШНИЙ>",mask:"24",gateway:"<ВНЕШНИЙ>",destination:"Интернет"},hqRtr:{name:"ens19",ip:"172.16.4.1",mask:"28",gateway:"-",destination:"HQ-RTR"},brRtr:{name:"ens20",ip:"172.16.5.1",mask:"28",gateway:"-",destination:"BR-RTR"}}},hqRtr:{name:"HQ-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.4.2",mask:"28",gateway:"172.16.4.1",destination:"ISP"},brRtr:{name:"gre1",ip:"10.5.5.1",mask:"30",gateway:"-",destination:"BR-RTR"},hqCli:{name:"VLAN100",ip:"192.168.100.1",mask:"28",gateway:"-",destination:"HQ-CLI"},hqSrv:{name:"VLAN200",ip:"192.168.200.1",mask:"28",gateway:"-",destination:"HQ-SRV"},vlan999:{name:"VLAN999",ip:"192.168.99.1",mask:"29",gateway:"-",destination:"VLAN999 (?)"}}},hqSrv:{name:"HQ-SRV",interfaces:{hqRtr:{name:"ens18",ip:"192.168.100.2",mask:"28",gateway:"192.168.100.1",destination:"HQ-RTR"}}},hqCli:{name:"HQ-CLI",interfaces:{hqRtr:{name:"ens18",ip:"192.168.200.2",mask:"28",gateway:"192.168.200.1",destination:"HQ-RTR"}}},brRtr:{name:"BR-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.5.2",mask:"28",gateway:"172.16.5.1",destination:"ISP"},brSrv:{name:"ens19",ip:"192.168.0.1",mask:"28",gateway:"-",destination:"BR-SRV"},hqRtr:{name:"gre1",ip:"10.5.5.2",mask:"30",gateway:"-",destination:"HQ-RTR"}}},brSrv:{name:"BR-SRV",interfaces:{brRtr:{name:"ens18",ip:"192.168.0.2",mask:"28",gateway:"192.168.0.1",destination:"BR-RTR"}}}},we=()=>{const s={ipTableContainer:document.getElementById("ip-table-container"),textContainer:document.getElementById("text-container")},e={devices:[]},t=D(e,Se(s,e));t.devices=ge};we();
