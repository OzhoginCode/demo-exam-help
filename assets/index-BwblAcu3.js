(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}})();const g=".",I=Symbol("target"),F=Symbol("unsubscribe");function L(e){return e instanceof Date||e instanceof Set||e instanceof Map||e instanceof WeakSet||e instanceof WeakMap||ArrayBuffer.isView(e)}function re(e){return(typeof e=="object"?e===null:typeof e!="function")||e instanceof RegExp}const m=Array.isArray;function O(e){return typeof e=="symbol"}const R={after(e,t){return m(e)?e.slice(t.length):t===""?e:e.slice(t.length+1)},concat(e,t){return m(e)?(e=[...e],t&&e.push(t),e):t&&t.toString!==void 0?(e!==""&&(e+=g),O(t)?e+t.toString():e+t):e},initial(e){if(m(e))return e.slice(0,-1);if(e==="")return e;const t=e.lastIndexOf(g);return t===-1?"":e.slice(0,t)},last(e){if(m(e))return e.at(-1)??"";if(e==="")return e;const t=e.lastIndexOf(g);return t===-1?e:e.slice(t+1)},walk(e,t){if(m(e))for(const n of e)t(n);else if(e!==""){let n=0,s=e.indexOf(g);if(s===-1)t(e);else for(;n<e.length;)s===-1&&(s=e.length),t(e.slice(n,s)),n=s+1,s=e.indexOf(g,n)}},get(e,t){return this.walk(t,n=>{e&&(e=e[n])}),e},isSubPath(e,t){if(m(e)){if(e.length<t.length)return!1;for(let n=0;n<t.length;n++)if(e[n]!==t[n])return!1;return!0}return e.length<t.length?!1:e===t?!0:e.startsWith(t)?e[t.length]===g:!1},isRootPath(e){return m(e)?e.length===0:e===""}};function pe(e){return typeof e=="object"&&typeof e.next=="function"}function oe(e,t,n,s,r){const c=e.next;if(t.name==="entries")e.next=function(){const a=c.call(this);return a.done===!1&&(a.value[0]=r(a.value[0],t,a.value[0],s),a.value[1]=r(a.value[1],t,a.value[0],s)),a};else if(t.name==="values"){const a=n[I].keys();e.next=function(){const d=c.call(this);return d.done===!1&&(d.value=r(d.value,t,a.next().value,s)),d}}else e.next=function(){const a=c.call(this);return a.done===!1&&(a.value=r(a.value,t,a.value,s)),a};return e}function W(e,t,n){return e.isUnsubscribed||t.ignoreSymbols&&O(n)||t.ignoreUnderscores&&n.charAt(0)==="_"||"ignoreKeys"in t&&t.ignoreKeys.includes(n)}class ce{constructor(t){this._equals=t,this._proxyCache=new WeakMap,this._pathCache=new WeakMap,this.isUnsubscribed=!1}_getDescriptorCache(){return this._descriptorCache===void 0&&(this._descriptorCache=new WeakMap),this._descriptorCache}_getProperties(t){const n=this._getDescriptorCache();let s=n.get(t);return s===void 0&&(s={},n.set(t,s)),s}_getOwnPropertyDescriptor(t,n){if(this.isUnsubscribed)return Reflect.getOwnPropertyDescriptor(t,n);const s=this._getProperties(t);let r=s[n];return r===void 0&&(r=Reflect.getOwnPropertyDescriptor(t,n),s[n]=r),r}getProxy(t,n,s,r){if(this.isUnsubscribed)return t;const c=t[r],a=c??t;this._pathCache.set(a,n);let d=this._proxyCache.get(a);return d===void 0&&(d=c===void 0?new Proxy(t,s):t,this._proxyCache.set(a,d)),d}getPath(t){return this.isUnsubscribed?void 0:this._pathCache.get(t)}isDetached(t,n){return!Object.is(t,R.get(n,this.getPath(t)))}defineProperty(t,n,s){return Reflect.defineProperty(t,n,s)?(this.isUnsubscribed||(this._getProperties(t)[n]=s),!0):!1}setProperty(t,n,s,r,c){if(!this._equals(c,s)||!(n in t)){const a=this._getOwnPropertyDescriptor(t,n);return a!==void 0&&"set"in a?Reflect.set(t,n,s,r):Reflect.set(t,n,s)}return!0}deleteProperty(t,n,s){if(Reflect.deleteProperty(t,n)){if(!this.isUnsubscribed){const r=this._getDescriptorCache().get(t);r&&(delete r[n],this._pathCache.delete(s))}return!0}return!1}isSameDescriptor(t,n,s){const r=this._getOwnPropertyDescriptor(n,s);return t!==void 0&&r!==void 0&&Object.is(t.value,r.value)&&(t.writable||!1)===(r.writable||!1)&&(t.enumerable||!1)===(r.enumerable||!1)&&(t.configurable||!1)===(r.configurable||!1)&&t.get===r.get&&t.set===r.set}isGetInvariant(t,n){const s=this._getOwnPropertyDescriptor(t,n);return s!==void 0&&s.configurable!==!0&&s.writable!==!0}unsubscribe(){this._descriptorCache=null,this._pathCache=null,this._proxyCache=null,this.isUnsubscribed=!0}}function P(e){return toString.call(e)==="[object Object]"}function C(){return!0}function _(e,t){return e.length!==t.length||e.some((n,s)=>t[s]!==n)}const J=new Set(["hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]),ae=new Set(["concat","includes","indexOf","join","keys","lastIndexOf"]),Y={push:C,pop:C,shift:C,unshift:C,copyWithin:_,reverse:_,sort:_,splice:_,flat:_,fill:_},ie=new Set([...J,...ae,...Object.keys(Y)]);function T(e,t){if(e.size!==t.size)return!0;for(const n of e)if(!t.has(n))return!0;return!1}const Z=["keys","values","entries"],X=new Set(["has","toString"]),ee={add:T,clear:T,delete:T,forEach:T},de=new Set([...X,...Object.keys(ee),...Z]);function E(e,t){if(e.size!==t.size)return!0;let n;for(const[s,r]of e)if(n=t.get(s),n!==r||n===void 0&&!t.has(s))return!0;return!1}const le=new Set([...X,"get"]),te={set:E,clear:E,delete:E,forEach:E},fe=new Set([...le,...Object.keys(te),...Z]);class y{constructor(t,n,s,r){this._path=n,this._isChanged=!1,this._clonedCache=new Set,this._hasOnValidate=r,this._changes=r?[]:null,this.clone=n===void 0?t:this._shallowClone(t)}static isHandledMethod(t){return J.has(t)}_shallowClone(t){let n=t;if(P(t))n={...t};else if(m(t)||ArrayBuffer.isView(t))n=[...t];else if(t instanceof Date)n=new Date(t);else if(t instanceof Set)n=new Set([...t].map(s=>this._shallowClone(s)));else if(t instanceof Map){n=new Map;for(const[s,r]of t.entries())n.set(s,this._shallowClone(r))}return this._clonedCache.add(n),n}preferredThisArg(t,n,s,r){return t?(m(r)?this._onIsChanged=Y[n]:r instanceof Set?this._onIsChanged=ee[n]:r instanceof Map&&(this._onIsChanged=te[n]),r):s}update(t,n,s){const r=R.after(t,this._path);if(n!=="length"){let c=this.clone;R.walk(r,a=>{c!=null&&c[a]&&(this._clonedCache.has(c[a])||(c[a]=this._shallowClone(c[a])),c=c[a])}),this._hasOnValidate&&this._changes.push({path:r,property:n,previous:s}),c!=null&&c[n]&&(c[n]=s)}this._isChanged=!0}undo(t){let n;for(let s=this._changes.length-1;s!==-1;s--)n=this._changes[s],R.get(t,n.path)[n.property]=n.previous}isChanged(t){return this._onIsChanged===void 0?this._isChanged:this._onIsChanged(this.clone,t)}isPathApplicable(t){return R.isRootPath(this._path)||R.isSubPath(t,this._path)}}class z extends y{static isHandledMethod(t){return ie.has(t)}}class he extends y{undo(t){t.setTime(this.clone.getTime())}isChanged(t,n){return!n(this.clone.valueOf(),t.valueOf())}}class K extends y{static isHandledMethod(t){return de.has(t)}undo(t){for(const n of this.clone)t.add(n);for(const n of t)this.clone.has(n)||t.delete(n)}}class G extends y{static isHandledMethod(t){return fe.has(t)}undo(t){for(const[n,s]of this.clone.entries())t.set(n,s);for(const n of t.keys())this.clone.has(n)||t.delete(n)}}class ue extends y{constructor(t,n,s,r){super(void 0,n,s,r),this._argument1=s[0],this._weakValue=t.has(this._argument1)}isChanged(t){return this._weakValue!==t.has(this._argument1)}undo(t){this._weakValue&&!t.has(this._argument1)?t.add(this._argument1):t.delete(this._argument1)}}class me extends y{constructor(t,n,s,r){super(void 0,n,s,r),this._weakKey=s[0],this._weakHas=t.has(this._weakKey),this._weakValue=t.get(this._weakKey)}isChanged(t){return this._weakValue!==t.get(this._weakKey)}undo(t){const n=t.has(this._weakKey);this._weakHas&&!n?t.set(this._weakKey,this._weakValue):!this._weakHas&&n?t.delete(this._weakKey):this._weakValue!==t.get(this._weakKey)&&t.set(this._weakKey,this._weakValue)}}class k{constructor(t){this._stack=[],this._hasOnValidate=t}static isHandledType(t){return P(t)||m(t)||L(t)}static isHandledMethod(t,n){return P(t)?y.isHandledMethod(n):m(t)?z.isHandledMethod(n):t instanceof Set?K.isHandledMethod(n):t instanceof Map?G.isHandledMethod(n):L(t)}get isCloning(){return this._stack.length>0}start(t,n,s){let r=y;m(t)?r=z:t instanceof Date?r=he:t instanceof Set?r=K:t instanceof Map?r=G:t instanceof WeakSet?r=ue:t instanceof WeakMap&&(r=me),this._stack.push(new r(t,n,s,this._hasOnValidate))}update(t,n,s){this._stack.at(-1).update(t,n,s)}preferredThisArg(t,n,s){const{name:r}=t,c=k.isHandledMethod(s,r);return this._stack.at(-1).preferredThisArg(c,r,n,s)}isChanged(t,n,s){return this._stack.at(-1).isChanged(t,n,s)}isPartOfClone(t){return this._stack.at(-1).isPathApplicable(t)}undo(t){this._previousClone!==void 0&&this._previousClone.undo(t)}stop(){return this._previousClone=this._stack.pop(),this._previousClone.clone}}const Re={equals:Object.is,isShallow:!1,pathAsArray:!1,ignoreSymbols:!1,ignoreUnderscores:!1,ignoreDetached:!1,details:!1},N=(e,t,n={})=>{n={...Re,...n};const s=Symbol("ProxyTarget"),{equals:r,isShallow:c,ignoreDetached:a,details:d}=n,f=new ce(r),S=typeof n.onValidate=="function",u=new k(S),A=(p,o,i,l,h)=>!S||u.isCloning||n.onValidate(R.concat(f.getPath(p),o),i,l,h)===!0,M=(p,o,i,l)=>{!W(f,n,o)&&!(a&&f.isDetached(p,e))&&D(f.getPath(p),o,i,l)},D=(p,o,i,l,h)=>{u.isCloning&&u.isPartOfClone(p)?u.update(p,o,l):t(R.concat(p,o),i,l,h)},x=p=>p&&(p[s]??p),B=(p,o,i,l)=>{if(re(p)||i==="constructor"||c&&!k.isHandledMethod(o,i)||W(f,n,i)||f.isGetInvariant(o,i)||a&&f.isDetached(o,e))return p;l===void 0&&(l=f.getPath(o));const h=R.concat(l,i),b=f.getPath(p);return b&&ne(h,b)?f.getProxy(p,b,$,s):f.getProxy(p,h,$,s)},ne=(p,o)=>{if(O(p)||p.length<=o.length||m(o)&&o.length===0)return!1;const i=m(p)?p:p.split(g),l=m(o)?o:o.split(g);return i.length<=l.length?!1:!l.some((h,b)=>h!==i[b])},$={get(p,o,i){if(O(o)){if(o===s||o===I)return p;if(o===F&&!f.isUnsubscribed&&f.getPath(p).length===0)return f.unsubscribe(),p}const l=L(p)?Reflect.get(p,o):Reflect.get(p,o,i);return B(l,p,o)},set(p,o,i,l){i=x(i);const h=p[s]??p,b=h[o];if(r(b,i)&&o in p)return!0;const w=A(p,o,i,b);return w&&f.setProperty(h,o,i,l,b)?(M(p,o,p[o],b),!0):!w},defineProperty(p,o,i){if(!f.isSameDescriptor(i,p,o)){const l=p[o];A(p,o,i.value,l)&&f.defineProperty(p,o,i,l)&&M(p,o,i.value,l)}return!0},deleteProperty(p,o){if(!Reflect.has(p,o))return!0;const i=Reflect.get(p,o),l=A(p,o,void 0,i);return l&&f.deleteProperty(p,o,i)?(M(p,o,void 0,i),!0):!l},apply(p,o,i){const l=o[s]??o;if(f.isUnsubscribed)return Reflect.apply(p,l,i);if((d===!1||d!==!0&&!d.includes(p.name))&&k.isHandledType(l)){let h=R.initial(f.getPath(p));const b=k.isHandledMethod(l,p.name);u.start(l,h,i);let w=Reflect.apply(p,u.preferredThisArg(p,o,l),b?i.map(v=>x(v)):i);const se=u.isChanged(l,r),Q=u.stop();if(k.isHandledType(w)&&b&&(o instanceof Map&&p.name==="get"&&(h=R.concat(h,i[0])),w=f.getProxy(w,h,$)),se){const v={name:p.name,args:i,result:w},V=u.isCloning?R.initial(h):h,U=u.isCloning?R.last(h):"";A(R.get(e,V),U,l,Q,v)?D(V,U,l,Q,v):u.undo(l)}return(o instanceof Map||o instanceof Set)&&pe(w)?oe(w,p,o,h,B):w}return Reflect.apply(p,o,i)}},H=f.getProxy(e,n.pathAsArray?[]:"",$);return t=t.bind(H),S&&(n.onValidate=n.onValidate.bind(H)),H};N.target=e=>(e==null?void 0:e[I])??e;N.unsubscribe=e=>(e==null?void 0:e[F])??e;const q=e=>e.split(".").slice(0,3).reverse().join("."),be=({devices:e})=>`
<p>Запуск ISP</p>
<p>login root</p>
<p>Password toor</p>
<p><code>hostnamectl hostname ISP</code></p>
<p>Накатываем обновления</p>
<p><code>apt-get update</code></p>
<p><code>apt-get install -y NetworkManager-tui iptables</code></p>
<p><code>systemctl enable --now NetworkManager</code></p>
<p><code>nmtui</code></p>
<p>настраиваем первый интерфейс</p>
<p>задаем имя профиля в соответствии с номером оборудования, например HQ-RTR</p>
<p>выставляем ручной ip для ${e.isp.interfaces.hqRtr.name}: ${e.isp.interfaces.hqRtr.ip}/${e.isp.interfaces.hqRtr.mask}</p>
<p>аналогично настраиваем ${e.isp.interfaces.brRtr.name}: ${e.isp.interfaces.brRtr.ip}/${e.isp.interfaces.brRtr.mask}</p>
<p>проверяем:</p>
<p><code>ip -br a</code></p>
<p>настраиваем маршрутизацию</p>
<p><code>vim /etc/net/sysctl.conf</code></p>
<p>меняем 0 на 1 в forward</p>
<p>настраиваем nat</p>
<p><code>iptables -t nat -j MASQUERADE -A POSTROUTING -o ens18</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable iptables --now # нужно проверить, работает ли эта команда именно на ISP</code></p>
<br>
<p>Запуск HQ-RTR</p>
<p><code>hostnamectl hostname HQ-RTR.au-team.irpo</code></p>
<p>Указываем статичный ipv4 адрес для ${e.hqRtr.interfaces.isp.name}</p>
<p><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${e.hqRtr.interfaces.isp.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${e.hqRtr.interfaces.isp.ip}/${e.hqRtr.interfaces.isp.mask}' > /etc/net/ifaces/${e.hqRtr.interfaces.isp.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${e.isp.interfaces.hqRtr.ip}' > /etc/net/ifaces/${e.hqRtr.interfaces.isp.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${e.hqRtr.interfaces.isp.name}/resolv.conf</code></p>
<p><code>iptables -t nat -j MASQUERADE -A POSTROUTING</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable iptables --now</code></p>
<p>Накатываем обновления <code>apt-get update</code></p>
<p><code>apt-get install -y NetworkManager-tui</code></p>
<p><code>systemctl enable --now NetworkManager</code></p>
<p><code>nmtui</code></p>
<br>
<p>Запуск BR-RTR</p>
<p><code>hostnamectl hostname BR-RTR.au-team.irpo</code></p>
<p>Указываем статичный ipv4 адрес для ${e.brRtr.interfaces.isp.name}</p>
<p><code>sed -i 's/dhcp4/static/g; s/dhcp/static/g' /etc/net/ifaces/${e.brRtr.interfaces.isp.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${e.brRtr.interfaces.isp.ip}/${e.brRtr.interfaces.isp.mask}' > /etc/net/ifaces/${e.brRtr.interfaces.isp.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${e.isp.interfaces.brRtr.ip}' > /etc/net/ifaces/${e.brRtr.interfaces.isp.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' > /etc/net/ifaces/${e.brRtr.interfaces.isp.name}/resolv.conf</code></p>
<p><code>iptables -t nat -j MASQUERADE -A POSTROUTING</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable iptables --now</code></p>
<p>Накатываем обновления <code>apt-get update</code></p>
<p><code>apt-get install -y NetworkManager-tui</code></p>
<p><code>systemctl enable --now NetworkManager</code></p>
<br>
<p>Запуск BR-RTR</p>
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
<p>ip ${e.brRtr.interfaces.brSrv.ip}/${e.brRtr.interfaces.brSrv.mask}</p>
<br>
<p>Запуск консоли BR-SRV</p>
<p><code>hostnamectl hostname BR-SRV.au-team.irpo</code></p>
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
<p><code>hostnamectl hostname HQ-SRV.au-team.irpo</code></p>
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
<p>указываем <code>P@$$word</code></p>
<p><code>visudo</code></p>
<p>раскомментировать строки:</p>
<p><code>WHEEL_USERS ALL=(ALL:ALL) ALL</code></p>
<p><code>WHEEL_USERS ALL=(ALL:ALL) NOPASSWD: ALL</code></p>
<p><code>vim /etc/group</code></p>
<p>дополнить строку wheel пользователем net_admin</p>
<br>
<p>Задание 4</p>
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
echo '${e.hqRtr.interfaces.hqCli.ip}/${e.hqRtr.interfaces.hqCli.mask}' >> /etc/net/ifaces/vlan100/ipv4address
echo '${e.hqRtr.interfaces.hqSrv.ip}/${e.hqRtr.interfaces.hqSrv.mask}' >> /etc/net/ifaces/vlan200/ipv4address
echo '${e.hqRtr.interfaces.vlan999.ip}/${e.hqRtr.interfaces.vlan999.mask}' >> /etc/net/ifaces/vlan999/ipv4address
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
  <p>${e.hqCli.interfaces.hqRtr.ip}/${e.hqCli.interfaces.hqRtr.mask}</p>
  <p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
  <p>Вводим строку default via ${e.hqRtr.interfaces.hqSrv.ip}</p>
  <p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf</p>
  <p>nameserver 8.8.8.8</p>
  <p>systemctl restart network</p>
  <p>systemctl restart NetworkManager</p>
  <p>ip -br a</p>
  <p>ping ${e.hqRtr.interfaces.hqSrv.ip}</p>
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
<p>Имя профиля: <code>gre1</code></p>
<p>Device: <code>gre1</code></p>
<p>Mode: <code>GRE</code></p>
<p>Parent: <code>ens18</code></p>
<p>Local ip: <code>${e.brRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${e.hqRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${e.brRtr.interfaces.hqRtr.ip}/${e.brRtr.interfaces.hqRtr.mask}</code></p>
<p>проверяем <code>ip -br a</code></p>
<br>
<p>Запуск HQ-RTR</code></p>
<p>смотрим сеть <code>ip -br a</code></p>
<p>nmtui</p>
<p>добавляем интерфейс <code>ip tunnel</code></p>
<p>Имя профиля: <code>gre1</code></p>
<p>Device: <code>gre1</code></p>
<p>Mode: <code>GRE</code></p>
<p>Parent: <code>ens18</code></p>
<p>Local ip: <code>${e.hqRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${e.brRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${e.hqRtr.interfaces.brRtr.ip}/${e.hqRtr.interfaces.brRtr.mask}</code></p>
<p>проверяем <code>ip -br a</code></p>
<br>
<p>Задание 7</p>
<p>BR-RTR</p>
<p><code>apt-get install -y frr</code></p>
<p><code>vim /etc/frr/daemons</code></p>
<p>исправить строку ospfd=yes</p>
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
<p>HQ-RTR</p>
<p><code>apt-get install -y frr</code></p>
<p><code>vim /etc/frr/daemons</code></p>
<p>исправить строку ospfd=yes</p>
<p><code>systemctl restart frr</code></p>
<p><code>systemctl enable --now frr</code></p>
<p><code>vtysh</code></p>
<p><code>conf t</code></p>
<p><code>router ospf</code></p>
<p><code>passive-interface default</code></p>
<p><code>network ${e.hqRtr.interfaces.brRtr.netAddress}/${e.hqRtr.interfaces.brRtr.mask} area 0</code></p>
<p><code>network ${e.hqRtr.interfaces.hqCli.netAddress}/${e.hqRtr.interfaces.hqCli.mask} area 0</code></p>
<p><code>network ${e.hqRtr.interfaces.hqSrv.netAddress}/${e.hqRtr.interfaces.hqSrv.mask} area 0</code></p>
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
<p>настроим ttl</p>
<p>HQ-RTR и BR-RTR</p>
<p><code>vim /etc/NetworkManager/system-connections/gre1.nmconnection</code></p>
<p>ttl=64</p>
<br>
<p>Задание 8</p>
<p>HQ-RTR</p>
<p><code>iptables -t nat -j MASQUERADE -A POSTROUTING</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable --now iptables</code></p>
<p>BR-RTR</p>
<p><code>iptables -t nat -j MASQUERADE -A POSTROUTING</code></p>
<p><code>iptables-save > /etc/sysconfig/iptables</code></p>
<p><code>systemctl enable --now iptables</code></p>
<br>
<p>Задание 9</p>
<p>HQ-RTR</p>
<p><code>apt-get install -y dhcp-server</code></p>
<p><code>vim /etc/sysconfig/dhcpd</code></p>
<p>DHCPDARCS = vlan200</p>
<p><code>cp /etc/dhcp/dhcpd.conf.example /etc/dhcp/dhcpd.conf</code></p>
<p><code>vim /etc/dhcp/dhcpd.conf</code></p>
<p>option domain-name “au-team.irpo”;</p>
<p>option domain-name-servers ${e.hqSrv.interfaces.hqRtr.ip};</p>
<p>добавить после</p>
<p>ddns-update-style interim;</p>
<p>update-static-leases on;</p>
<p>zone au-team.irpo {</p>
<p>	primary ${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<p>выбрать начало “y” и в конце “2” “p”, но можно руками</p>
<br>
<p>zone ${q(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa {</p>
<p>	primary ${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<br>
<p>zone ${q(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa {</p>
<p>	primary ${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<br>
<p>внимание со вторым IP!!! Нет автоподстановки</p>
<p>меняем строки:</p>
<p>subnet ${e.hqRtr.interfaces.hqSrv.netAddress} netmask 255.255.255.240 {</p>
<p>	range ${e.hqCli.interfaces.hqRtr.ip} 192.168.200.5;</p>
<p>	option routers ${e.hqRtr.interfaces.hqSrv.ip};</p>
<br>
<p><code>systemctl restart dhcpd</code></p>
<p><code>systemctl enable dhcpd</code></p>
<br>
<p>HQ-CLI</p>
<p>проверка работы dhcp</p>
<p><code>ip -br a</code></p>
<br>
<p>Задание 10</p>
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
<p>zone ${q(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.arpa {</p>
<p>	type master;</p>
<p>	file “100.db”;</p>
<p>allow-update { any; };</p>
<p>}</p>
<p>zone ${q(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.arpa {</p>
<p>type master;	</p>
<p>	file “200.db”;</p>
<p>allow-update { any; };</p>
<p>}</p>
<p>сохраняем файл</p>
<p><code>cp zone/localdomain zone/au-team.db</code></p>
<p><code>cp zone/127.in-addr.arpa zone/100.db</code></p>
<p><code>vim zone/100.db</code></p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	${q(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.apra. root.${q(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.apra. (...)</p>
<p>	IN	NS	${q(e.hqRtr.interfaces.hqCli.netAddress)}.in-addr.apra.</p>
<p>	IN	A	${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>10	IN	PTR	hq-srv.au-team.irpo</p>
<p>1	IN	PTR	hq-rtr.au-team.irpo</p>
<p>сохраняем</p>
<p><code>cp zone/100.db zone/200.db</code></p>
<p><code>vim zone/200.db</code></p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	${q(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.apra. root.${q(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.apra. (...)</p>
<p>	IN	NS	${q(e.hqRtr.interfaces.hqSrv.netAddress)}.in-addr.apra.</p>
<p>	IN	A	${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>10	IN	PTR	hq-cli.au-team.irpo</p>
<p>1	IN	PTR	hq-rtr.au-team.irpo</p>
<p>сохраняем</p>
<p><code>vim zone/au-team.db</code></p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	hq-srv.au-team.irpo. root.au-team.irpo. (...)</p>
<p>	IN	NS	hq-srv.au-team.irpo.</p>
<p>	IN	A	${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>hq-rtr	IN	A	${e.hqRtr.interfaces.hqCli.ip}</p>
<p>br-rtr	IN	A	${e.brRtr.interfaces.brSrv.ip}</p>
<p>hq-srv	IN	A	${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>hq-cli	IN	A	${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>br-srv	IN	A	${e.brSrv.interfaces.brRtr.ip}</p>
<p>wiki	IN	CNAME	hq-rtr.au-team.irpo.</p>
<p>moodle	IN	CNAME	hq-rtr.au-team.irpo.</p>
<p>сохраняем</p>
<p><code>rndc-confgen > rndc.key</code></p>
<p><code>sed -i '6.$d' rndc.key</code></p>
<p><code>chgrp -R named zone/</code></p>
<p><code>named-checkconf</code></p>
<p><code>named-checkconf -z</code></p>
<p><code>vim /etc/net/ifaces/ens18/resolv.conf</code></p>
<p>nameserver ${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>domain au-team.irpo</p>
<p><code>systemctl restart networ</code>k</p>
<p><code>systemctl aneble -- now bind</code></p>
<br>
<p>BR-RTR</p>
<p>vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>Скорректировать nameserver ${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>domain au-team.irpo</p>
<p>systemctl restart network</p>
<p>nmtui</p>
<p>перезапустить активные соединения ens</p>
<br>
<p>HQ-RTR</p>
<p>vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>Скорректировать nameserver ${e.hqSrv.interfaces.hqRtr.ip}</p>
<p>domain au-team.irpo</p>
<p>systemctl restart network</p>
<p>nmtui</p>
<p>перезапустить активные соединения ens</p>
<br>
<p>Задание 11</p>
<p>HQ-SRV, BR-SRV, HQ-RTR, BR-RTR, HQ-CLI</p>
<p><code>timedatectl set-timezone Europe/Moscow</code></p>
<br>
<p>Модуль № 2</p>
<p>Задание 1</p>
<p>BR-SRV</p>
<p><code>apt-get update -y</code></p>
<p><code>apt-get install -y task-samba-dc</code></p>
<p><code>control krb5-conf-ccache default</code></p>
<p><code>rm -rf /etc/samba/smb.conf</code></p>
<p><code>rm -rf /var/lib/samba/</code></p>
<p><code>rm -rf /var/cache/samba/</code></p>
<p><code>mkdir -p /var/lib/samba/sysvol</code></p>
<p><code>samba-tool domain provision</code></p>
<p>пароль P@ssw0rd</p>
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
<p><code>samba-tool dns add br-srv.au-tram.irpo au-team.irpo hq-rtr A ${e.hqRtr.interfaces.hqCli.ip} -U Administrator</code></p>
<p>пароль P@$$word</p>
<p><code>samba-tool dns add br-srv.au-tram.irpo au-team.irpo wiki CNAME hq-rtr.au-team.irpo -U Administrator</code></p>
<p>пароль P@$$word</p>
<p><code>samba-tool dns add br-srv.au-tram.irpo au-team.irpo moodle CNAME hq-rtr.au-team.irpo -U Administrator</code></p>
<p>>пароль P@$$word</p>
<br>
<p>HQ-RTR</p>
<p><code>vim /etc/chrony.conf</code></p>
<p>добавляем server</p>
<p>${e.hqRtr.interfaces.brRtr.ip}</p>
<p>allow ${e.brRtr.interfaces.brSrv.netAddress}/${e.brRtr.interfaces.brSrv.mask}</p>
<p>allow ${e.hqRtr.interfaces.hqCli.netAddress}/${e.hqRtr.interfaces.hqCli.mask}</p>
<p>allow ${e.hqRtr.interfaces.hqSrv.netAddress}/${e.hqRtr.interfaces.hqSrv.mask}</p>
<p>local stratum 5</p>
<p>сохраняем</p>
<p><code>systemctl restart chronyd.service</code></p>
<p><code>systemctl restart dhcpd</code></p>
<br>
<p>HQ-CLI</p>
<p>Запускаем центр управления > центр управления системой</p>
<p>пароль toor</p>
<p>Пользователи > Аутентификация</p>
<p>Активируем Домен AD</p>
<p>Рабочая группа: AU-TEAM</p>
<p>Применить</p>
<p>Пароль P@ssw0rd</p>
<p>ок</p>
<p>reboot</p>
<p>проверяем через терминал</p>
<p><code>wbinfo --ping-dc</code></p>
<br>
<p>Задание 2</p>
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
<p>пользователь user</p>
<p>пароль resu</p>
<p>терминал открываем</p>
<p><code>su -</code></p>
<p>пароль toor</p>
<p><code>mkdir -p /mnt/nfs</code></p>
<p><code>vim /etc/fstab</code></p>
<p>дописываем</p>
<p>${e.hqSrv.interfaces.hqRtr.ip}:/raid5/nfs /mnt/nfs nfs defaults 0 0</p>
<p>сохраняем</p>
<p>проверяем что пространство монтируется mount -a</p>
<p>ошибок не должно быть</p>
<br>
<p>Задание 4</p>
<p>BR-SRV</p>
<p><code>apt-get install -y ansible</code></p>
<p>одной командой:</p>
<p><code>echo -e "[all]
hq-srv ansible_host=${e.hqSrv.interfaces.hqRtr.ip} ansible_connection=local
hq-cli ansible_host=${e.hqCli.interfaces.hqRtr.ip} ansible_connection=local
hq-rtr ansible_host=${e.hqRtr.interfaces.hqCli.ip} ansible_connection=local
br-srv ansible_host=${e.brSrv.interfaces.brRtr.ip} ansible_connection=local" | sudo tee /etc/ansible/hosts > /dev/null</code></p>
<p>или</p>
<p><code>vim /etc/ansible/hosts</code></p>
<p>[all]</p>
<p>hq-srv ansible_host=${e.hqSrv.interfaces.hqRtr.ip} ansible_connection=local</p>
<p>hq-cli ansible_host=${e.hqCli.interfaces.hqRtr.ip} ansible_connection=local</p>
<p>hq-rtr ansible_host=${e.hqRtr.interfaces.hqCli.ip} ansible_connection=local</p>
<p>br-srv ansible_host=${e.brSrv.interfaces.brRtr.ip} ansible_connection=local</p>
<p>проверка</p>
<p><code>ansible all -m ping</code></p>
<br>
<p>Задание 9</p>
<p>HQ-CLI</p>
<p><code>su -</code></p>
<p><code>apt-get update</code></p>
<p><code>apt-get install -y yandex-browser-stable</code></p>
<p><code>reboot</code></p>
`,Se=(e,{devices:t})=>{const n=document.createElement("table"),s=document.createElement("thead");s.innerHTML=`
    <tr>
      <th>Имя устройства</th>
      <th>Назначение (куда смотрит)</th>
      <th>IP-адрес</th>
      <th>Маска</th>
      <th>Шлюз по умолчанию</th>
    </tr>
  `,n.appendChild(s);const r=document.createElement("tbody");Object.values(t).forEach(({name:c,interfaces:a})=>{const d=Object.values(a);if(!d.length)return;const f=document.createElement("tr");f.innerHTML=`
      <td rowspan="${d.length}">${c}</td>
      <td>${d[0].destination||"-"}</td>
      <td>${d[0].ip}</td>
      <td>${d[0].mask}</td>
      <td>${d[0].gateway}</td>
    `,r.appendChild(f);for(let S=1;S<d.length;S+=1){const u=d[S],A=document.createElement("tr");A.innerHTML=`
        <td>${u.destination||"-"}</td>
        <td>${u.ip}</td>
        <td>${u.mask}</td>
        <td>${u.gateway}</td>
      `,r.appendChild(A)}}),n.appendChild(r),e.ipTableContainer.innerHTML="",e.ipTableContainer.appendChild(n)},we=(e,t)=>{const n=be(t);e.textContainer.innerHTML=n,document.querySelectorAll("code").forEach(s=>{const r=document.createElement("span");r.className="code-wrapper";const c=document.createElement("div");c.className="code-copy-toast",c.textContent="Скопировано!",s.parentNode.insertBefore(r,s),r.appendChild(s),r.appendChild(c),s.style.cursor="pointer",s.title="Кликни, чтобы скопировать",s.addEventListener("click",()=>{navigator.clipboard.writeText(s.innerText).then(()=>{c.classList.add("show"),setTimeout(()=>c.classList.remove("show"),300)})})})},qe=(e,t)=>(n,s)=>{switch(n){case"devices":Se(e,t),we(e,t);break}};function ge(e){const t=new Set;return Object.values(e).forEach(n=>{Object.values(n.interfaces).forEach(s=>{s.netAddress&&!s.netAddress.startsWith("<")&&t.add(s.netAddress)})}),Array.from(t)}function ye(e,t){const n=document.createElement("form");n.id="network-form",n.innerHTML="<h3>Настройки сетей</h3>",e.forEach(r=>{const c=document.createElement("div");c.className="network-input";const a=document.createElement("label");a.textContent=`Сеть ${r}:`;const d=document.createElement("input");d.type="text",d.placeholder="Базовый адрес (напр. 192.168.0)",d.dataset.network=r;const f=document.createElement("input");f.type="text",f.placeholder="Маска (напр. 24)",f.dataset.network=r,c.append(a,d,f),n.append(c)});const s=document.createElement("button");s.type="button",s.textContent="Обновить",n.append(s),t.innerHTML="",t.append(n)}function Ae(){const e=document.querySelectorAll("#network-form input"),t={};return e.forEach(n=>{const{network:s}=n.dataset;t[s]||(t[s]={}),n.placeholder.includes("Базовый")?t[s].base=n.value.trim():t[s].mask=n.value.trim()}),t}function ke(e,t){const n=JSON.parse(JSON.stringify(e));return Object.entries(t).forEach(([s,{base:r,mask:c}])=>{!r||!c||Object.values(n).forEach(a=>{Object.values(a.interfaces).forEach(d=>{if(d.netAddress===s){d.mask=c;const[f]=d.ip.split(".").slice(-1);if(d.ip=`${r}.${f}`,d.netAddress=`${r}.0`,d.gateway!=="-"){const S=d.gateway.split(".");S.splice(0,3,...r.split(".")),d.gateway=S.join(".")}}})})}),n}const j={isp:{name:"ISP",interfaces:{external:{name:"ens18",ip:"<ВНЕШНИЙ>",mask:"24",gateway:"<ВНЕШНИЙ>",destination:"Интернет",netAddress:""},hqRtr:{name:"ens19",ip:"172.16.4.1",mask:"28",gateway:"-",destination:"HQ-RTR",netAddress:"172.16.4.0"},brRtr:{name:"ens20",ip:"172.16.5.1",mask:"28",gateway:"-",destination:"BR-RTR",netAddress:"172.16.5.0"}}},hqRtr:{name:"HQ-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.4.2",mask:"28",gateway:"172.16.4.1",destination:"ISP",netAddress:"172.16.4.0"},brRtr:{name:"gre1",ip:"10.5.5.1",mask:"30",gateway:"-",destination:"BR-RTR",netAddress:"10.5.5.0"},hqCli:{name:"VLAN100",ip:"192.168.100.1",mask:"28",gateway:"-",destination:"HQ-CLI",netAddress:"192.168.100.0"},hqSrv:{name:"VLAN200",ip:"192.168.200.1",mask:"28",gateway:"-",destination:"HQ-SRV",netAddress:"192.168.200.0"},vlan999:{name:"VLAN999",ip:"192.168.99.1",mask:"29",gateway:"-",destination:"VLAN999 (?)",netAddress:"192.168.99.0"}}},hqSrv:{name:"HQ-SRV",interfaces:{hqRtr:{name:"ens18",ip:"192.168.100.2",mask:"28",gateway:"192.168.100.1",destination:"HQ-RTR",netAddress:"192.168.100.0"}}},hqCli:{name:"HQ-CLI",interfaces:{hqRtr:{name:"ens18",ip:"192.168.200.2",mask:"28",gateway:"192.168.200.1",destination:"HQ-RTR",netAddress:"192.168.200.0"}}},brRtr:{name:"BR-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.5.2",mask:"28",gateway:"172.16.5.1",destination:"ISP",netAddress:"172.16.5.0"},brSrv:{name:"ens19",ip:"192.168.0.1",mask:"28",gateway:"-",destination:"BR-SRV",netAddress:"192.168.0.0"},hqRtr:{name:"gre1",ip:"10.5.5.2",mask:"30",gateway:"-",destination:"HQ-RTR",netAddress:"10.5.5.0"}}},brSrv:{name:"BR-SRV",interfaces:{brRtr:{name:"ens18",ip:"192.168.0.2",mask:"28",gateway:"192.168.0.1",destination:"BR-RTR",netAddress:"192.168.0.0"}}}},_e=()=>{const e={ipTableContainer:document.getElementById("ip-table-container"),textContainer:document.getElementById("text-container"),networkFormContainer:document.getElementById("network-form-container")},t={devices:[]},n=N(t,qe(e,t));n.devices=j;const s=JSON.parse(JSON.stringify(j)),r=ge(s);ye(r,e.networkFormContainer),document.querySelector("#network-form button").addEventListener("click",()=>{const c=Ae(),a=ke(s,c);console.log(a),n.devices=a})};_e();
