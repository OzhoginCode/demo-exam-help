(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(s){if(s.ep)return;s.ep=!0;const c=n(s);fetch(s.href,c)}})();const g=".",I=Symbol("target"),F=Symbol("unsubscribe");function L(e){return e instanceof Date||e instanceof Set||e instanceof Map||e instanceof WeakSet||e instanceof WeakMap||ArrayBuffer.isView(e)}function se(e){return(typeof e=="object"?e===null:typeof e!="function")||e instanceof RegExp}const m=Array.isArray;function H(e){return typeof e=="symbol"}const R={after(e,t){return m(e)?e.slice(t.length):t===""?e:e.slice(t.length+1)},concat(e,t){return m(e)?(e=[...e],t&&e.push(t),e):t&&t.toString!==void 0?(e!==""&&(e+=g),H(t)?e+t.toString():e+t):e},initial(e){if(m(e))return e.slice(0,-1);if(e==="")return e;const t=e.lastIndexOf(g);return t===-1?"":e.slice(0,t)},last(e){if(m(e))return e.at(-1)??"";if(e==="")return e;const t=e.lastIndexOf(g);return t===-1?e:e.slice(t+1)},walk(e,t){if(m(e))for(const n of e)t(n);else if(e!==""){let n=0,r=e.indexOf(g);if(r===-1)t(e);else for(;n<e.length;)r===-1&&(r=e.length),t(e.slice(n,r)),n=r+1,r=e.indexOf(g,n)}},get(e,t){return this.walk(t,n=>{e&&(e=e[n])}),e},isSubPath(e,t){if(m(e)){if(e.length<t.length)return!1;for(let n=0;n<t.length;n++)if(e[n]!==t[n])return!1;return!0}return e.length<t.length?!1:e===t?!0:e.startsWith(t)?e[t.length]===g:!1},isRootPath(e){return m(e)?e.length===0:e===""}};function oe(e){return typeof e=="object"&&typeof e.next=="function"}function pe(e,t,n,r,s){const c=e.next;if(t.name==="entries")e.next=function(){const a=c.call(this);return a.done===!1&&(a.value[0]=s(a.value[0],t,a.value[0],r),a.value[1]=s(a.value[1],t,a.value[0],r)),a};else if(t.name==="values"){const a=n[I].keys();e.next=function(){const d=c.call(this);return d.done===!1&&(d.value=s(d.value,t,a.next().value,r)),d}}else e.next=function(){const a=c.call(this);return a.done===!1&&(a.value=s(a.value,t,a.value,r)),a};return e}function z(e,t,n){return e.isUnsubscribed||t.ignoreSymbols&&H(n)||t.ignoreUnderscores&&n.charAt(0)==="_"||"ignoreKeys"in t&&t.ignoreKeys.includes(n)}class ce{constructor(t){this._equals=t,this._proxyCache=new WeakMap,this._pathCache=new WeakMap,this.isUnsubscribed=!1}_getDescriptorCache(){return this._descriptorCache===void 0&&(this._descriptorCache=new WeakMap),this._descriptorCache}_getProperties(t){const n=this._getDescriptorCache();let r=n.get(t);return r===void 0&&(r={},n.set(t,r)),r}_getOwnPropertyDescriptor(t,n){if(this.isUnsubscribed)return Reflect.getOwnPropertyDescriptor(t,n);const r=this._getProperties(t);let s=r[n];return s===void 0&&(s=Reflect.getOwnPropertyDescriptor(t,n),r[n]=s),s}getProxy(t,n,r,s){if(this.isUnsubscribed)return t;const c=t[s],a=c??t;this._pathCache.set(a,n);let d=this._proxyCache.get(a);return d===void 0&&(d=c===void 0?new Proxy(t,r):t,this._proxyCache.set(a,d)),d}getPath(t){return this.isUnsubscribed?void 0:this._pathCache.get(t)}isDetached(t,n){return!Object.is(t,R.get(n,this.getPath(t)))}defineProperty(t,n,r){return Reflect.defineProperty(t,n,r)?(this.isUnsubscribed||(this._getProperties(t)[n]=r),!0):!1}setProperty(t,n,r,s,c){if(!this._equals(c,r)||!(n in t)){const a=this._getOwnPropertyDescriptor(t,n);return a!==void 0&&"set"in a?Reflect.set(t,n,r,s):Reflect.set(t,n,r)}return!0}deleteProperty(t,n,r){if(Reflect.deleteProperty(t,n)){if(!this.isUnsubscribed){const s=this._getDescriptorCache().get(t);s&&(delete s[n],this._pathCache.delete(r))}return!0}return!1}isSameDescriptor(t,n,r){const s=this._getOwnPropertyDescriptor(n,r);return t!==void 0&&s!==void 0&&Object.is(t.value,s.value)&&(t.writable||!1)===(s.writable||!1)&&(t.enumerable||!1)===(s.enumerable||!1)&&(t.configurable||!1)===(s.configurable||!1)&&t.get===s.get&&t.set===s.set}isGetInvariant(t,n){const r=this._getOwnPropertyDescriptor(t,n);return r!==void 0&&r.configurable!==!0&&r.writable!==!0}unsubscribe(){this._descriptorCache=null,this._pathCache=null,this._proxyCache=null,this.isUnsubscribed=!0}}function P(e){return toString.call(e)==="[object Object]"}function v(){return!0}function _(e,t){return e.length!==t.length||e.some((n,r)=>t[r]!==n)}const J=new Set(["hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]),ae=new Set(["concat","includes","indexOf","join","keys","lastIndexOf"]),Y={push:v,pop:v,shift:v,unshift:v,copyWithin:_,reverse:_,sort:_,splice:_,flat:_,fill:_},ie=new Set([...J,...ae,...Object.keys(Y)]);function T(e,t){if(e.size!==t.size)return!0;for(const n of e)if(!t.has(n))return!0;return!1}const Z=["keys","values","entries"],X=new Set(["has","toString"]),ee={add:T,clear:T,delete:T,forEach:T},de=new Set([...X,...Object.keys(ee),...Z]);function E(e,t){if(e.size!==t.size)return!0;let n;for(const[r,s]of e)if(n=t.get(r),n!==s||n===void 0&&!t.has(r))return!0;return!1}const le=new Set([...X,"get"]),te={set:E,clear:E,delete:E,forEach:E},fe=new Set([...le,...Object.keys(te),...Z]);class y{constructor(t,n,r,s){this._path=n,this._isChanged=!1,this._clonedCache=new Set,this._hasOnValidate=s,this._changes=s?[]:null,this.clone=n===void 0?t:this._shallowClone(t)}static isHandledMethod(t){return J.has(t)}_shallowClone(t){let n=t;if(P(t))n={...t};else if(m(t)||ArrayBuffer.isView(t))n=[...t];else if(t instanceof Date)n=new Date(t);else if(t instanceof Set)n=new Set([...t].map(r=>this._shallowClone(r)));else if(t instanceof Map){n=new Map;for(const[r,s]of t.entries())n.set(r,this._shallowClone(s))}return this._clonedCache.add(n),n}preferredThisArg(t,n,r,s){return t?(m(s)?this._onIsChanged=Y[n]:s instanceof Set?this._onIsChanged=ee[n]:s instanceof Map&&(this._onIsChanged=te[n]),s):r}update(t,n,r){const s=R.after(t,this._path);if(n!=="length"){let c=this.clone;R.walk(s,a=>{c!=null&&c[a]&&(this._clonedCache.has(c[a])||(c[a]=this._shallowClone(c[a])),c=c[a])}),this._hasOnValidate&&this._changes.push({path:s,property:n,previous:r}),c!=null&&c[n]&&(c[n]=r)}this._isChanged=!0}undo(t){let n;for(let r=this._changes.length-1;r!==-1;r--)n=this._changes[r],R.get(t,n.path)[n.property]=n.previous}isChanged(t){return this._onIsChanged===void 0?this._isChanged:this._onIsChanged(this.clone,t)}isPathApplicable(t){return R.isRootPath(this._path)||R.isSubPath(t,this._path)}}class W extends y{static isHandledMethod(t){return ie.has(t)}}class he extends y{undo(t){t.setTime(this.clone.getTime())}isChanged(t,n){return!n(this.clone.valueOf(),t.valueOf())}}class K extends y{static isHandledMethod(t){return de.has(t)}undo(t){for(const n of this.clone)t.add(n);for(const n of t)this.clone.has(n)||t.delete(n)}}class j extends y{static isHandledMethod(t){return fe.has(t)}undo(t){for(const[n,r]of this.clone.entries())t.set(n,r);for(const n of t.keys())this.clone.has(n)||t.delete(n)}}class ue extends y{constructor(t,n,r,s){super(void 0,n,r,s),this._argument1=r[0],this._weakValue=t.has(this._argument1)}isChanged(t){return this._weakValue!==t.has(this._argument1)}undo(t){this._weakValue&&!t.has(this._argument1)?t.add(this._argument1):t.delete(this._argument1)}}class me extends y{constructor(t,n,r,s){super(void 0,n,r,s),this._weakKey=r[0],this._weakHas=t.has(this._weakKey),this._weakValue=t.get(this._weakKey)}isChanged(t){return this._weakValue!==t.get(this._weakKey)}undo(t){const n=t.has(this._weakKey);this._weakHas&&!n?t.set(this._weakKey,this._weakValue):!this._weakHas&&n?t.delete(this._weakKey):this._weakValue!==t.get(this._weakKey)&&t.set(this._weakKey,this._weakValue)}}class A{constructor(t){this._stack=[],this._hasOnValidate=t}static isHandledType(t){return P(t)||m(t)||L(t)}static isHandledMethod(t,n){return P(t)?y.isHandledMethod(n):m(t)?W.isHandledMethod(n):t instanceof Set?K.isHandledMethod(n):t instanceof Map?j.isHandledMethod(n):L(t)}get isCloning(){return this._stack.length>0}start(t,n,r){let s=y;m(t)?s=W:t instanceof Date?s=he:t instanceof Set?s=K:t instanceof Map?s=j:t instanceof WeakSet?s=ue:t instanceof WeakMap&&(s=me),this._stack.push(new s(t,n,r,this._hasOnValidate))}update(t,n,r){this._stack.at(-1).update(t,n,r)}preferredThisArg(t,n,r){const{name:s}=t,c=A.isHandledMethod(r,s);return this._stack.at(-1).preferredThisArg(c,s,n,r)}isChanged(t,n,r){return this._stack.at(-1).isChanged(t,n,r)}isPartOfClone(t){return this._stack.at(-1).isPathApplicable(t)}undo(t){this._previousClone!==void 0&&this._previousClone.undo(t)}stop(){return this._previousClone=this._stack.pop(),this._previousClone.clone}}const Re={equals:Object.is,isShallow:!1,pathAsArray:!1,ignoreSymbols:!1,ignoreUnderscores:!1,ignoreDetached:!1,details:!1},N=(e,t,n={})=>{n={...Re,...n};const r=Symbol("ProxyTarget"),{equals:s,isShallow:c,ignoreDetached:a,details:d}=n,f=new ce(s),w=typeof n.onValidate=="function",u=new A(w),$=(o,p,i,l,h)=>!w||u.isCloning||n.onValidate(R.concat(f.getPath(o),p),i,l,h)===!0,M=(o,p,i,l)=>{!z(f,n,p)&&!(a&&f.isDetached(o,e))&&D(f.getPath(o),p,i,l)},D=(o,p,i,l,h)=>{u.isCloning&&u.isPartOfClone(o)?u.update(o,p,l):t(R.concat(o,p),i,l,h)},x=o=>o&&(o[r]??o),Q=(o,p,i,l)=>{if(se(o)||i==="constructor"||c&&!A.isHandledMethod(p,i)||z(f,n,i)||f.isGetInvariant(p,i)||a&&f.isDetached(p,e))return o;l===void 0&&(l=f.getPath(p));const h=R.concat(l,i),b=f.getPath(o);return b&&ne(h,b)?f.getProxy(o,b,k,r):f.getProxy(o,h,k,r)},ne=(o,p)=>{if(H(o)||o.length<=p.length||m(p)&&p.length===0)return!1;const i=m(o)?o:o.split(g),l=m(p)?p:p.split(g);return i.length<=l.length?!1:!l.some((h,b)=>h!==i[b])},k={get(o,p,i){if(H(p)){if(p===r||p===I)return o;if(p===F&&!f.isUnsubscribed&&f.getPath(o).length===0)return f.unsubscribe(),o}const l=L(o)?Reflect.get(o,p):Reflect.get(o,p,i);return Q(l,o,p)},set(o,p,i,l){i=x(i);const h=o[r]??o,b=h[p];if(s(b,i)&&p in o)return!0;const S=$(o,p,i,b);return S&&f.setProperty(h,p,i,l,b)?(M(o,p,o[p],b),!0):!S},defineProperty(o,p,i){if(!f.isSameDescriptor(i,o,p)){const l=o[p];$(o,p,i.value,l)&&f.defineProperty(o,p,i,l)&&M(o,p,i.value,l)}return!0},deleteProperty(o,p){if(!Reflect.has(o,p))return!0;const i=Reflect.get(o,p),l=$(o,p,void 0,i);return l&&f.deleteProperty(o,p,i)?(M(o,p,void 0,i),!0):!l},apply(o,p,i){const l=p[r]??p;if(f.isUnsubscribed)return Reflect.apply(o,l,i);if((d===!1||d!==!0&&!d.includes(o.name))&&A.isHandledType(l)){let h=R.initial(f.getPath(o));const b=A.isHandledMethod(l,o.name);u.start(l,h,i);let S=Reflect.apply(o,u.preferredThisArg(o,p,l),b?i.map(C=>x(C)):i);const re=u.isChanged(l,s),B=u.stop();if(A.isHandledType(S)&&b&&(p instanceof Map&&o.name==="get"&&(h=R.concat(h,i[0])),S=f.getProxy(S,h,k)),re){const C={name:o.name,args:i,result:S},V=u.isCloning?R.initial(h):h,U=u.isCloning?R.last(h):"";$(R.get(e,V),U,l,B,C)?D(V,U,l,B,C):u.undo(l)}return(p instanceof Map||p instanceof Set)&&oe(S)?pe(S,o,p,h,Q):S}return Reflect.apply(o,p,i)}},O=f.getProxy(e,n.pathAsArray?[]:"",k);return t=t.bind(O),w&&(n.onValidate=n.onValidate.bind(O)),O};N.target=e=>(e==null?void 0:e[I])??e;N.unsubscribe=e=>(e==null?void 0:e[F])??e;const q=e=>e.split(".").slice(0,3).reverse().join("."),be=e=>Array(4).fill(0).map((n,r)=>256-2**(8-Math.min(8,Math.max(0,e-r*8)))).join("."),qe=e=>{const t=e.split(".").map(Number),n=t[3]+3;return t[3]=n,t.join(".")},we=({devices:e})=>`
<p>Запуск ISP</p>
<p>login <code>root</code></p>
<p>Password <code>toor</code></p>
<p><code>hostnamectl hostname ISP ; exec bash</code></p>
<p>Накатываем обновления</p>
<p><code>apt-get update</code></p>
<p><code>apt-get install -y NetworkManager-tui iptables</code></p>
<p><code>systemctl enable --now NetworkManager</code></p>
<p><code>nmtui</code></p>
<p>настраиваем первый интерфейс</p>
<p>задаем имя профиля в соответствии с номером оборудования, например HQ-RTR</p>
<p>выставляем ручной ip для ${e.isp.interfaces.hqRtr.name}: <code>${e.isp.interfaces.hqRtr.ip}/${e.isp.interfaces.hqRtr.mask}</code></p>
<p>аналогично настраиваем ${e.isp.interfaces.brRtr.name}: <code>${e.isp.interfaces.brRtr.ip}/${e.isp.interfaces.brRtr.mask}</code></p>
<p>проверяем:</p>
<p><code>ip -br a</code></p>
<p>настраиваем маршрутизацию</p>
<p>меняем 0 на 1 в forward:</p>
<p><code>sed -i 's/^net\\.ipv4\\.ip_forward *= *.*/net.ipv4.ip_forward = 1/' /etc/net/sysctl.conf</code></p>
<p><code>systemctl restart network</code></p>
<p>настраиваем nat</p>
<p><code>iptables -t nat -j MASQUERADE -A POSTROUTING -o ens18</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable iptables --now</code></p>
<br>
<p>Запуск HQ-RTR</p>
<p><code>hostnamectl hostname HQ-RTR.au-team.irpo ; exec bash</code></p>
<p>Указываем статичный ipv4 адрес для ${e.hqRtr.interfaces.isp.name}</p>
<p><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${e.hqRtr.interfaces.isp.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${e.hqRtr.interfaces.isp.ip}/${e.hqRtr.interfaces.isp.mask}' > /etc/net/ifaces/${e.hqRtr.interfaces.isp.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${e.isp.interfaces.hqRtr.ip}' > /etc/net/ifaces/${e.hqRtr.interfaces.isp.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${e.hqRtr.interfaces.isp.name}/resolv.conf</code></p>
<p><code>sed -i 's/^net\\.ipv4\\.ip_forward *= *.*/net.ipv4.ip_forward = 1/' /etc/net/sysctl.conf</code></p>
<p><code>iptables -t nat -j MASQUERADE -A POSTROUTING</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable iptables --now</code></p>
<p><code>systemctl restart network</code></p>
<p>Накатываем обновления <code>apt-get update</code></p>
<p><code>apt-get install -y NetworkManager-tui</code></p>
<p><code>systemctl enable --now NetworkManager</code></p>
<br>
<p>Запуск BR-RTR</p>
<p><code>hostnamectl hostname BR-RTR.au-team.irpo ; exec bash</code></p>
<p>Указываем статичный ipv4 адрес для ${e.brRtr.interfaces.isp.name}</p>
<p><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${e.brRtr.interfaces.isp.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${e.brRtr.interfaces.isp.ip}/${e.brRtr.interfaces.isp.mask}' > /etc/net/ifaces/${e.brRtr.interfaces.isp.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${e.isp.interfaces.brRtr.ip}' > /etc/net/ifaces/${e.brRtr.interfaces.isp.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${e.brRtr.interfaces.isp.name}/resolv.conf</code></p>
<p><code>sed -i 's/^net\\.ipv4\\.ip_forward *= *.*/net.ipv4.ip_forward = 1/' /etc/net/sysctl.conf</code></p>
<p><code>iptables -t nat -j MASQUERADE -A POSTROUTING</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable iptables --now</code></p>
<p><code>systemctl restart network</code></p>
<p>Накатываем обновления <code>apt-get update</code></p>
<p><code>apt-get install -y NetworkManager-tui</code></p>
<p><code>systemctl enable --now NetworkManager</code></p>
<p>запускаем <code>nmtui</code></p>
<p>редактируем 1 соединение ens19</p>
<p>имя профиля ставим BR-SRV</p>
<p>ip <code>${e.brRtr.interfaces.brSrv.ip}/${e.brRtr.interfaces.brSrv.mask}</code></p>
<p>перезагружаем соединение BR-SRV</p>
<br>
<p>Запуск консоли BR-SRV</p>
<p><code>hostnamectl hostname BR-SRV.au-team.irpo ; exec bash</code></p>
<p>Указываем статичный ipv4 адрес для ${e.brSrv.interfaces.brRtr.name}</p>
<p><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${e.brSrv.interfaces.brRtr.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${e.brSrv.interfaces.brRtr.ip}/${e.brSrv.interfaces.brRtr.mask}' > /etc/net/ifaces/${e.brSrv.interfaces.brRtr.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${e.brRtr.interfaces.brSrv.ip}' > /etc/net/ifaces/${e.brSrv.interfaces.brRtr.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${e.brSrv.interfaces.brRtr.name}/resolv.conf</code></p>
<p><code>systemctl restart network</code></p>
<br>
<p>Запуск консоли HQ-SRV</p>
<p><code>hostnamectl hostname HQ-SRV.au-team.irpo ; exec bash</code></p>
<p>Указываем статичный ipv4 адрес для ${e.hqSrv.interfaces.hqRtr.name}</p>
<p><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${e.hqSrv.interfaces.hqRtr.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${e.hqSrv.interfaces.hqRtr.ip}/${e.hqSrv.interfaces.hqRtr.mask}' > /etc/net/ifaces/${e.hqSrv.interfaces.hqRtr.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${e.hqSrv.interfaces.hqRtr.gateway}' > /etc/net/ifaces/${e.hqSrv.interfaces.hqRtr.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${e.hqSrv.interfaces.hqRtr.name}/resolv.conf</code></p>
<p><code>systemctl restart network</code></p>
<br>
<h3>Задание 3</h3>
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
<p>указываем <code>P@$$word</code></p>
<p><code>visudo</code></p>
<p>раскомментировать строки:</p>
<p><code>WHEEL_USERS ALL=(ALL:ALL) ALL</code></p>
<p><code>WHEEL_USERS ALL=(ALL:ALL) NOPASSWD: ALL</code></p>
<p><code>vim /etc/group</code></p>
<p>дополнить строку wheel пользователем net_admin</p>
<br>
<h3>Задание 4</h3>
<p>Запуск консоли HQ-RTR</p>
<pre><code>apt-get install -y openvswitch
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
echo '${e.hqRtr.interfaces.hqSrv.ip}/${e.hqRtr.interfaces.hqSrv.mask}' >> /etc/net/ifaces/vlan100/ipv4address
echo '${e.hqRtr.interfaces.hqCli.ip}/${e.hqRtr.interfaces.hqCli.mask}' >> /etc/net/ifaces/vlan200/ipv4address
echo '${e.hqRtr.interfaces.vlan999.ip}/${e.hqRtr.interfaces.vlan999.mask}' >> /etc/net/ifaces/vlan999/ipv4address
systemctl restart network
ip -br a</code></pre>
<br>
<p>Настройка статичного ip на HQ-CLI</p>
<p><code>hostnamectl hostname HQ-CLI.au-team.irpo ; exec bash</code></p>
<details>
  <summary>Можно не настраивать если у нас есть dhcp</summary>
  <p>Пароль <code>resu</code></p>
  <p>Открыть терминал</p>
  <p><code>su -</code></p>
  <p>пароль <code>toor</code></p>
  <p>Указываем статичный ipv4 адрес для ${e.brSrv.interfaces.brRtr.name}</p>
  <p><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${e.hqCli.interfaces.hqRtr.name}/options</code></p>
  <p>Настраиваем IP-адрес</p>
  <p><code>echo '${e.hqCli.interfaces.hqRtr.ip}/${e.hqCli.interfaces.hqRtr.mask}' > /etc/net/ifaces/${e.hqCli.interfaces.hqRtr.name}/ipv4address</code></p>
  <p>Настраиваем шлюз</p>
  <p><code>echo 'default via ${e.hqCli.interfaces.hqRtr.ip}' > /etc/net/ifaces/${e.hqCli.interfaces.hqRtr.name}/ipv4route</code></p>
  <p>Указываем DNS</p>
  <p><code>echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${e.hqCli.interfaces.hqRtr.name}/resolv.conf</code></p>
  <p><code>systemctl restart network</code></p>
  <p><code>ip -br a</code></p>
  <p><code>ping ${e.hqCli.interfaces.hqRtr.ip}</code></p>
</details>
<br>
<h3>Задание 5</h3>
<p>HQ-SRV и BR-SRV</p>
<p><code>vim /etc/openssh/sshd_config</code></p>
<p>правим строку на <code>Port 2024</code></p>
<p>добавляем строки</p>
<p><code>AllowUsers sshuser</code></p>
<p><code>MaxAuthTries 2</code></p>
<p><code>Banner /etc/ban</code></p>
<p><code>echo 'Authorized access only' > /etc/ban</code></p>
<p><code>systemctl restart sshd</code></p>
<br>
<h3>Задание 6</h3>
<p>HQ-RTR</code></p>
<p><code>nmtui</code></p>
<p>добавляем интерфейс <code>ip tunnel</code></p>
<p>Имя профиля: <code>BR-RTR</code></p>
<p>Device: <code>gre1</code></p>
<p>Mode: <code>GRE</code></p>
<p>Parent: <code>ens18</code></p>
<p>Local ip: <code>${e.hqRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${e.brRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${e.hqRtr.interfaces.brRtr.ip}/${e.hqRtr.interfaces.brRtr.mask}</code></p>
<p>перезагружаем соединение BR-RTR</p>
<p>проверяем: <code>ip -br a</code></p>
<br>
<p>BR-RTR</p>
<p><code>nmtui</code></p>
<p>добавляем интерфейс <code>ip tunnel</code></p>
<p>Имя профиля: <code>HQ-RTR</code></p>
<p>Device: <code>gre1</code></p>
<p>Mode: <code>GRE</code></p>
<p>Parent: <code>ens18</code></p>
<p>Local ip: <code>${e.brRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${e.hqRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${e.brRtr.interfaces.hqRtr.ip}/${e.brRtr.interfaces.hqRtr.mask}</code></p>
<p>перезагружаем соединение HQ-RTR</p>
<p>проверяем: <code>ip -br a</code></p>
<br>
<h3>Задание 7</h3>
<p>HQ-RTR</p>
<p><code>apt-get install -y frr</code></p>
<p><code>vim /etc/frr/daemons</code></p>
<p>исправить строку <code>ospfd=yes</code></p>
<p><code>systemctl restart frr</code></p>
<p><code>systemctl enable --now frr</code></p>
<p><code>vtysh</code></p>
<p><code>conf t</code></p>
<p><code>ip forwarding</code></p>
<p><code>router ospf</code></p>
<p><code>network ${e.hqRtr.interfaces.brRtr.netAddress}/${e.hqRtr.interfaces.brRtr.mask} area 0</code></p>
<p><code>network ${e.hqRtr.interfaces.hqSrv.netAddress}/${e.hqRtr.interfaces.hqSrv.mask} area 0</code></p>
<p><code>network ${e.hqRtr.interfaces.hqCli.netAddress}/${e.hqRtr.interfaces.hqCli.mask} area 0</code></p>
<p><code>network ${e.hqRtr.interfaces.vlan999.netAddress}/${e.hqRtr.interfaces.vlan999.mask} area 0</code></p>
<p><code>ex</code></p>
<p><code>int gre1</code></p>
<p><code>no ip ospf passive</code></p>
<p><code>ex</code></p>
<p><code>ex</code></p>
<p><code>wr</code></p>
<p><code>ex</code></p>
<p><code>reboot</code></p>
<br>
<p>BR-RTR</p>
<p><code>apt-get install -y frr</code></p>
<p><code>vim /etc/frr/daemons</code></p>
<p>исправить строку <code>ospfd=yes</code></p>
<p><code>systemctl restart frr</code></p>
<p><code>systemctl enable --now frr</code></p>
<p><code>vtysh</code></p>
<p><code>conf t</code></p>
<p><code>ip forwarding</code></p>
<p><code>router ospf</code></p>
<p><code>passive-interface default</code></p>
<p><code>network ${e.brRtr.interfaces.hqRtr.netAddress}/${e.brRtr.interfaces.hqRtr.mask} area 0</code></p>
<p><code>network ${e.brRtr.interfaces.brSrv.netAddress}/${e.brRtr.interfaces.brSrv.mask} area 0</code></p>
<p><code>ex</code></p>
<p><code>int gre1</code></p>
<p><code>no ip ospf passive</code></p>
<p><code>ex</code></p>
<p><code>ex</code></p>
<p><code>wr</code></p>
<p><code>ex</code></p>
<p><code>reboot</code></p>
<br>
<p>настроим ttl</p>
<p>HQ-RTR и BR-RTR</p>
<p><code>vim /etc/NetworkManager/system-connections/gre1.nmconnection</code></p>
<p><code>ttl=64</code></p>
<br>
<h3>Задание 8</h3>
<p>HQ-RTR</p>
<p><code>iptables -t nat -j MASQUERADE -A POSTROUTING</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable --now iptables</code></p>
<p>BR-RTR</p>
<p><code>iptables -t nat -j MASQUERADE -A POSTROUTING</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable --now iptables</code></p>
<br>
<h3>Задание 9</h3>
<p>HQ-RTR</p>
<p><code>apt-get install -y dhcp-server</code></p>
<p><code>vim /etc/sysconfig/dhcpd</code></p>
<p><code>DHCPDARCS = vlan200</code></p>
<p><code>cp /etc/dhcp/dhcpd.conf.example /etc/dhcp/dhcpd.conf</code></p>
<p><code>vim /etc/dhcp/dhcpd.conf</code></p>
<p><code>option domain-name “au-team.irpo”;</code></p>
<p><code>option domain-name-servers ${e.hqSrv.interfaces.hqRtr.ip};</code></p>
<p>добавить после</p>
<p><code>ddns-update-style interim;</code></p>
<p><code>update-static-leases on;</code></p>
<p>КОПИРОВАНИЕ В РАЗРАБОТКЕ, НЕ ЗАБЫТЬ ПРО ТАБЫ!!!</p>
<p><pre><code>
zone au-team.irpo {
&#9;primary ${e.hqSrv.interfaces.hqRtr.ip};
}

zone ${q(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa {
&#9;primary ${e.hqSrv.interfaces.hqRtr.ip};
}

zone ${q(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa {
&#9;primary ${e.hqSrv.interfaces.hqRtr.ip};
}
</code></pre></p>
<p>zone au-team.irpo {</p>
<p> primary ${e.hqSrv.interfaces.hqRtr.ip};</p>
<p>}</p>
<br>
<p>zone ${q(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa {</p>
<p> primary ${e.hqSrv.interfaces.hqRtr.ip};</p>
<p>}</p>
<br>
<p>zone ${q(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa {</p>
<p> primary ${e.hqSrv.interfaces.hqRtr.ip};</p>
<p>}</p>
<br>
<p>Подсказка: можно выбрать начало “y” и в конце “2” “p”, но можно руками</p>
<p>меняем строки:</p>
<p>subnet ${e.hqRtr.interfaces.hqCli.netAddress} netmask ${be(e.hqRtr.interfaces.hqCli.mask)} {</p>
<p>	range ${e.hqCli.interfaces.hqRtr.ip} ${qe(e.hqCli.interfaces.hqRtr.ip)};</p>
<p>	option routers ${e.hqRtr.interfaces.hqCli.ip};</p>
<br>
<p><code>systemctl restart dhcpd</code></p>
<p><code>systemctl enable dhcpd</code></p>
<br>
<p>HQ-CLI</p>
<p>проверка работы dhcp</p>
<p><code>ip -br a</code></p>
<br>
<h3>Задание 10</h3>
<p>HQ-SRV</p>
<p><code>apt-get update</code></p>
<p><code>apt-get install -y bind</code></p>
<p><code>cd /var/lib/bind/etc/</code></p>
<p><code>vim options.conf</code></p>
<p>скорректировать listen-on { any; };</p>
<p>listen-on-v6 { none; };</p>
<p>forwarders { 8.8.8.8; };</p>
<p>allow-query { any; };</p>
<p>allow-recursion { any; };</p>
<p><code>vim rfc1912.conf</code></p>
<p>Удалить лишнее и оставить</p>
<p>zone “au-team.irpo” {</p>
<p>type master;</p>
<p>file “au-team.irpo”;</p>
<p>allow-update { any; };</p>
<p>}</p>
<p>zone ${q(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa {</p>
<p>	type master;</p>
<p>	file “100.db”;</p>
<p>allow-update { any; };</p>
<p>}</p>
<p>zone ${q(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa {</p>
<p>type master;	</p>
<p>	file “200.db”;</p>
<p>allow-update { any; };</p>
<p>}</p>
<p>сохраняем файл</p>
<p><code>cp zone/localdomain zone/au-team.db</code></p>
<p><code>cp zone/127.in-addr.arpa zone/100.db</code></p>
<p><code>vim zone/100.db</code></p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	${q(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa. root.${q(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa. (...)</p>
<p>	IN	NS	${q(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa.</p>
<p>	IN	A	${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>2	IN	PTR	hq-srv.au-team.irpo</p>
<p>1	IN	PTR	hq-rtr.au-team.irpo</p>
<p>сохраняем</p>
<p><code>cp zone/100.db zone/200.db</code></p>
<p><code>vim zone/200.db</code></p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	${q(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa. root.${q(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa. (...)</p>
<p>	IN	NS	${q(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa.</p>
<p>	IN	A	${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>2	IN	PTR	hq-cli.au-team.irpo</p>
<p>1	IN	PTR	hq-rtr.au-team.irpo</p>
<p>сохраняем</p>
<p><code>vim zone/au-team.db</code></p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	hq-srv.au-team.irpo. root.au-team.irpo. (...)</p>
<p>	IN	NS	hq-srv.au-team.irpo.</p>
<p>	IN	A	${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>hq-rtr	IN	A	${e.hqRtr.interfaces.hqSrv.ip}</p>
<p>br-rtr	IN	A	${e.brRtr.interfaces.brSrv.ip}</p>
<p>hq-srv	IN	A	${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>hq-cli	IN	A	${e.hqCli.interfaces.hqRtr.ip}</p>
<p>br-srv	IN	A	${e.brSrv.interfaces.brRtr.ip}</p>
<p>wiki	IN	CNAME	hq-rtr.au-team.irpo.</p>
<p>moodle	IN	CNAME	hq-rtr.au-team.irpo.</p>
<p>сохраняем</p>
<p><code>rndc-confgen > rndc.key</code></p>
<p><code>sed -i '6,$d' rndc.key</code></p>
<p><code>chgrp -R named zone/</code></p>
<p><code>named-checkconf</code></p>
<p><code>named-checkconf -z</code></p>
<p><code>echo -e 'nameserver ${e.hqSrv.interfaces.hqRtr.ip}\\ndomain au-team.irpo' > /etc/net/ifaces/ens18/resolv.conf</code></p>
<p><code>systemctl restart network</code></p>
<p><code>systemctl enable --now bind</code></p>
<br>
<p>BR-RTR</p>
<p><code>echo -e 'nameserver ${e.hqSrv.interfaces.hqRtr.ip}\\ndomain au-team.irpo' > /etc/net/ifaces/ens18/resolv.conf</code></p>
<p><code>systemctl restart network</code></p>
<p><code>nmtui</code></p>
<p>перезапустить активные соединения ens</p>
<br>
<p>HQ-RTR</p>
<p><code>echo -e 'nameserver ${e.hqSrv.interfaces.hqRtr.ip}\\ndomain au-team.irpo' > /etc/net/ifaces/ens18/resolv.conf</code></p>
<p><code>systemctl restart network</code></p>
<p><code>nmtui</code></p>
<p>перезапустить активные соединения ens</p>
<br>
<h3>Задание 11</h3>
<p>HQ-SRV, BR-SRV, HQ-RTR, BR-RTR, HQ-CLI</p>
<p><code>timedatectl set-timezone Europe/Moscow</code></p>
<br>
<h2>Модуль № 2</h2>
<h3>Задание 1</h3>
<p>BR-SRV</p>
<p><code>apt-get update -y</code></p>
<p><code>apt-get install -y task-samba-dc</code></p>
<p><code>control krb5-conf-ccache default</code></p>
<p><code>rm -rf /etc/samba/smb.conf</code></p>
<p><code>rm -rf /var/lib/samba/</code></p>
<p><code>rm -rf /var/cache/samba/</code></p>
<p><code>mkdir -p /var/lib/samba/sysvol</code></p>
<p><code>samba-tool domain provision</code></p>
<p>пароль <code>P@ssw0rd</code></p>
<p><code>systemctl enable --now samba.service</code></p>
<p><code>cp /var/lib/samba/pivate/krb5.conf /etc/</code></p>
<p><code>visudo</code></p>
<p>добавляем ниже # root ALL=(ALL:ALL) ALL</p>
<p>%hq ALL=(ALL) NOPASSWD: /bin/cat, /bin/grep, /usr/bin/id</p>
<p>сохраняем</p>
<p><code>vim /opt/users.csv</code></p>
<p>добавляем user1.hq.P@ssw0rd</p>
<p>user2.hq.P@ssw0rd</p>
<p>user3.hq.P@ssw0rd</p>
<p>user4.hq.P@ssw0rd</p>
<p>user5.hq.P@ssw0rd</p>
<p>сохраняем</p>
<p><code>mkdir -p /opt/smdscripts</code></p>
<p><code>cd /opt/smdscripts</code></p>
<p><code>vim import.sh</code></p>
<p>добавить #!/bin/bash</p>
<p>while IFS=',' read -r username password; do</p>
<p>	samba-tool user create “$username” “$password”</p>
<p>	samba-tool group addmembers hq “$username”</p>
<p>done < /opt/users.csv</p>
<p>сохраняем</p>
<p><code>chmod +x /opt/smdscripts/import.sh</code></p>
<p><code>samba-tool group create hq</code></p>
<p><code>./import.sh</code></p>
<p><code>samba-tool dns add br-srv.au-team.irpo au-team.irpo hq-rtr A ${e.hqRtr.interfaces.hqSrv.ip} -U Administrator</code></p>
<p>пароль P@$$word</p>
<p><code>samba-tool dns add br-srv.au-team.irpo au-team.irpo wiki CNAME hq-rtr.au-team.irpo -U Administrator</code></p>
<p>пароль P@$$word</p>
<p><code>samba-tool dns add br-srv.au-team.irpo au-team.irpo moodle CNAME hq-rtr.au-team.irpo -U Administrator</code></p>
<p>пароль P@$$word</p>
<br>
<p>HQ-RTR</p>
<p><code>vim /etc/chrony.conf</code></p>
<p>добавляем server</p>
<p>${e.hqRtr.interfaces.brRtr.ip}</p>
<p>allow ${e.brRtr.interfaces.brSrv.netAddress}/${e.brRtr.interfaces.brSrv.mask}</p>
<p>allow ${e.hqRtr.interfaces.hqSrv.netAddress}/${e.hqRtr.interfaces.hqSrv.mask}</p>
<p>allow ${e.hqRtr.interfaces.hqCli.netAddress}/${e.hqRtr.interfaces.hqCli.mask}</p>
<p>local stratum 5</p>
<p>сохраняем</p>
<p><code>systemctl restart chronyd.service</code></p>
<p><code>systemctl restart dhcpd</code></p>
<br>
<p>HQ-CLI</p>
<p>Запускаем центр управления > центр управления системой</p>
<p>пароль <code>toor</code></p>
<p>Пользователи > Аутентификация</p>
<p>Активируем Домен AD</p>
<p>Рабочая группа: AU-TEAM</p>
<p>Применить</p>
<p>Пароль <code>P@ssw0rd</code></p>
<p>ок</p>
<p>reboot</p>
<p>проверяем через терминал</p>
<p><code>wbinfo --ping-dc</code></p>
<br>
<h3>Задание 2</h3>
<p>HQ-SRV</p>
<p><code>mdadm --create --verbose /dev/md0 --level =5 --raid-devices=3 /dev/sdc /dev/sdb /dev/sdd</code></p>
<p><code>mdadm --detail --scan I tee -a /etc/mdadm.conf</code></p>
<p><code>mkfs.ext4 /dev/md0</code></p>
<p><code>mkdir -p /raid5</code></p>
<p><code>bikid /dev/md0 > /etc/fstab</code></p>
<p><code>vim /etc/fstab</code></p>
<p>в последней строке оставляем только UUID и приписываем /raid5 ext4 defaults 0 0 </p>
<p>сохраняем</p>
<p>проверяем что пространство монтируется</p>
<p><code>mount -a</code></p>
<p>ошибок не должно быть</p>
<p><code>apt-get install -y nfs-server</code></p>
<p><code>mkdir -p /raid5/nfs</code></p>
<p><code>vim /etc/exports</code></p>
<p>добавляем второй строкой /raid5/nfs ${e.hqSrv.interfaces.hqRtr.ip}(rw,sync,no_subtree_check)</p>
<p>сохраняем</p>
<p><code>exportfs -a</code></p>
<p><code>systemctl restart nfs-server.service</code></p>
<p><code>systemctl enable --now nfs-server.service</code></p>
<br>
<p>HQ-CLI</p>
<p>пользователь <code>user</code></p>
<p>пароль <code>resu</code></p>
<p>открываем терминал</p>
<p><code>su -</code></p>
<p>пароль <code>toor</code></p>
<p><code>mkdir -p /mnt/nfs</code></p>
<p><code>vim /etc/fstab</code></p>
<p>дописываем</p>
<p>${e.hqSrv.interfaces.hqRtr.ip}:/raid5/nfs /mnt/nfs nfs defaults 0 0</p>
<p>сохраняем</p>
<p>проверяем что пространство монтируется <code>mount -a</code></p>
<p>ошибок не должно быть</p>
<br>
<h3>Задание 4</h3>
<p>BR-SRV</p>
<p><code>apt-get install -y ansible</code></p>
<p>одной командой:</p>
<p><code>echo -e "[all]\\nhq-srv ansible_host=${e.hqSrv.interfaces.hqRtr.ip} ansible_connection=local\\nhq-cli ansible_host=${e.hqCli.interfaces.hqRtr.ip} ansible_connection=local\\nhq-rtr ansible_host=${e.hqRtr.interfaces.hqSrv.ip} ansible_connection=local\\nbr-rtr ansible_host=${e.brRtr.interfaces.brSrv.ip} ansible_connection=local" | sudo tee /etc/ansible/hosts > /dev/null</code></p>
<p>или</p>
<p><code>vim /etc/ansible/hosts</code></p>
<p><code>[all]</code></p>
<p><code>hq-srv ansible_host=${e.hqSrv.interfaces.hqRtr.ip} ansible_connection=local</code></p>
<p><code>hq-cli ansible_host=${e.hqCli.interfaces.hqRtr.ip} ansible_connection=local</code></p>
<p><code>hq-rtr ansible_host=${e.hqRtr.interfaces.hqSrv.ip} ansible_connection=local</code></p>
<p><code>br-rtr ansible_host=${e.brRtr.interfaces.brSrv.ip} ansible_connection=local</code></p>
<p>проверка</p>
<p><code>ansible all -m ping</code></p>
<br>
<h3>Задание 9</h3>
<p>HQ-CLI</p>
<p><code>su -</code></p>
<p><code>apt-get update</code></p>
<p><code>apt-get install -y yandex-browser-stable</code></p>
<p><code>reboot</code></p>
<br>
`,Se=(e,{devices:t})=>{const n=document.createElement("table"),r=document.createElement("thead");r.innerHTML=`
    <tr>
      <th>Имя устройства</th>
      <th>Назначение (куда смотрит)</th>
      <th>IP-адрес</th>
      <th>Маска</th>
      <th>Шлюз по умолчанию</th>
    </tr>
  `,n.appendChild(r);const s=document.createElement("tbody");Object.values(t).forEach(({name:c,interfaces:a})=>{const d=Object.values(a);if(!d.length)return;const f=document.createElement("tr");f.innerHTML=`
      <td rowspan="${d.length}">${c}</td>
      <td>${d[0].destination||"-"}</td>
      <td>${d[0].ip}</td>
      <td>${d[0].mask}</td>
      <td>${d[0].gateway}</td>
    `,s.appendChild(f);for(let w=1;w<d.length;w+=1){const u=d[w],$=document.createElement("tr");$.innerHTML=`
        <td>${u.destination||"-"}</td>
        <td>${u.ip}</td>
        <td>${u.mask}</td>
        <td>${u.gateway}</td>
      `,s.appendChild($)}}),n.appendChild(s),e.ipTableContainer.innerHTML="",e.ipTableContainer.appendChild(n)},ge=(e,t)=>{const n=we(t);e.textContainer.innerHTML=n,document.querySelectorAll("code").forEach(r=>{const s=document.createElement("span");s.className="code-wrapper";const c=document.createElement("div");c.className="code-copy-toast",c.textContent="Скопировано!",r.parentNode.insertBefore(s,r),s.appendChild(r),s.appendChild(c),r.style.cursor="pointer",r.title="Кликни, чтобы скопировать",r.addEventListener("click",()=>{navigator.clipboard.writeText(r.innerText).then(()=>{c.classList.add("show"),setTimeout(()=>c.classList.remove("show"),300)})})})},ye=(e,t)=>(n,r)=>{switch(n){case"devices":Se(e,t),ge(e,t);break}};function $e(e){const t=new Set;return Object.values(e).forEach(n=>{Object.values(n.interfaces).forEach(r=>{r.netAddress&&!r.netAddress.startsWith("<")&&t.add(r.netAddress)})}),Array.from(t)}function Ae(e,t){const n=document.createElement("form");n.id="network-form",n.innerHTML="<h3>Настройки сетей</h3>",e.forEach(s=>{const c=document.createElement("div");c.className="network-input";const a=document.createElement("label");a.textContent=`Сеть ${s}:`;const d=document.createElement("input");d.type="text",d.placeholder="Базовый адрес (напр. 192.168.0)",d.dataset.network=s;const f=document.createElement("input");f.type="text",f.placeholder="Маска (напр. 24)",f.dataset.network=s,c.append(a,d,f),n.append(c)});const r=document.createElement("button");r.type="button",r.textContent="Обновить",n.append(r),t.innerHTML="",t.append(n)}function _e(){const e=document.querySelectorAll("#network-form input"),t={};return e.forEach(n=>{const{network:r}=n.dataset;t[r]||(t[r]={}),n.placeholder.includes("Базовый")?t[r].base=n.value.trim():t[r].mask=n.value.trim()}),t}function ke(e,t){const n=JSON.parse(JSON.stringify(e));return Object.entries(t).forEach(([r,{base:s,mask:c}])=>{!s||!c||Object.values(n).forEach(a=>{Object.values(a.interfaces).forEach(d=>{if(d.netAddress===r){d.mask=c;const[f]=d.ip.split(".").slice(-1);if(d.ip=`${s}.${f}`,d.netAddress=`${s}.0`,d.gateway!=="-"){const w=d.gateway.split(".");w.splice(0,3,...s.split(".")),d.gateway=w.join(".")}}})})}),n}const G={isp:{name:"ISP",interfaces:{external:{name:"ens18",ip:"<ВНЕШНИЙ>",mask:"24",gateway:"<ВНЕШНИЙ>",destination:"Интернет",netAddress:""},hqRtr:{name:"ens19",ip:"172.16.4.1",mask:"28",gateway:"-",destination:"HQ-RTR",netAddress:"172.16.4.0"},brRtr:{name:"ens20",ip:"172.16.5.1",mask:"28",gateway:"-",destination:"BR-RTR",netAddress:"172.16.5.0"}}},hqRtr:{name:"HQ-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.4.2",mask:"28",gateway:"172.16.4.1",destination:"ISP",netAddress:"172.16.4.0"},brRtr:{name:"gre1",ip:"10.5.5.1",mask:"30",gateway:"-",destination:"BR-RTR",netAddress:"10.5.5.0"},hqSrv:{name:"VLAN100",ip:"192.168.100.1",mask:"26",gateway:"-",destination:"HQ-SRV",netAddress:"192.168.100.0"},hqCli:{name:"VLAN200",ip:"192.168.200.1",mask:"28",gateway:"-",destination:"HQ-CLI",netAddress:"192.168.200.0"},vlan999:{name:"VLAN999",ip:"192.168.99.1",mask:"29",gateway:"-",destination:"VLAN999 (?)",netAddress:"192.168.99.0"}}},hqSrv:{name:"HQ-SRV",interfaces:{hqRtr:{name:"ens18",ip:"192.168.100.2",mask:"26",gateway:"192.168.100.1",destination:"HQ-RTR",netAddress:"192.168.100.0"}}},hqCli:{name:"HQ-CLI",interfaces:{hqRtr:{name:"ens18",ip:"192.168.200.2",mask:"28",gateway:"192.168.200.1",destination:"HQ-RTR",netAddress:"192.168.200.0"}}},brRtr:{name:"BR-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.5.2",mask:"28",gateway:"172.16.5.1",destination:"ISP",netAddress:"172.16.5.0"},brSrv:{name:"ens19",ip:"192.168.0.1",mask:"27",gateway:"-",destination:"BR-SRV",netAddress:"192.168.0.0"},hqRtr:{name:"gre1",ip:"10.5.5.2",mask:"30",gateway:"-",destination:"HQ-RTR",netAddress:"10.5.5.0"}}},brSrv:{name:"BR-SRV",interfaces:{brRtr:{name:"ens18",ip:"192.168.0.2",mask:"27",gateway:"192.168.0.1",destination:"BR-RTR",netAddress:"192.168.0.0"}}}},Ce=()=>{const e={ipTableContainer:document.getElementById("ip-table-container"),textContainer:document.getElementById("text-container"),networkFormContainer:document.getElementById("network-form-container")},t={devices:[]},n=N(t,ye(e,t));n.devices=G;const r=JSON.parse(JSON.stringify(G)),s=$e(r);Ae(s,e.networkFormContainer),document.querySelector("#network-form button").addEventListener("click",()=>{const c=_e(),a=ke(r,c);console.log(a),n.devices=a})};Ce();
