(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const o of c.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(r){if(r.ep)return;r.ep=!0;const c=t(r);fetch(r.href,c)}})();const g=".",I=Symbol("target"),J=Symbol("unsubscribe");function N(s){return s instanceof Date||s instanceof Set||s instanceof Map||s instanceof WeakSet||s instanceof WeakMap||ArrayBuffer.isView(s)}function re(s){return(typeof s=="object"?s===null:typeof s!="function")||s instanceof RegExp}const R=Array.isArray;function $(s){return typeof s=="symbol"}const b={after(s,e){return R(s)?s.slice(e.length):e===""?s:s.slice(e.length+1)},concat(s,e){return R(s)?(s=[...s],e&&s.push(e),s):e&&e.toString!==void 0?(s!==""&&(s+=g),$(e)?s+e.toString():s+e):s},initial(s){if(R(s))return s.slice(0,-1);if(s==="")return s;const e=s.lastIndexOf(g);return e===-1?"":s.slice(0,e)},last(s){if(R(s))return s.at(-1)??"";if(s==="")return s;const e=s.lastIndexOf(g);return e===-1?s:s.slice(e+1)},walk(s,e){if(R(s))for(const t of s)e(t);else if(s!==""){let t=0,n=s.indexOf(g);if(n===-1)e(s);else for(;t<s.length;)n===-1&&(n=s.length),e(s.slice(t,n)),t=n+1,n=s.indexOf(g,t)}},get(s,e){return this.walk(e,t=>{s&&(s=s[t])}),s},isSubPath(s,e){if(R(s)){if(s.length<e.length)return!1;for(let t=0;t<e.length;t++)if(s[t]!==e[t])return!1;return!0}return s.length<e.length?!1:s===e?!0:s.startsWith(e)?s[e.length]===g:!1},isRootPath(s){return R(s)?s.length===0:s===""}};function ie(s){return typeof s=="object"&&typeof s.next=="function"}function pe(s,e,t,n,r){const c=s.next;if(e.name==="entries")s.next=function(){const o=c.call(this);return o.done===!1&&(o.value[0]=r(o.value[0],e,o.value[0],n),o.value[1]=r(o.value[1],e,o.value[0],n)),o};else if(e.name==="values"){const o=t[I].keys();s.next=function(){const l=c.call(this);return l.done===!1&&(l.value=r(l.value,e,o.next().value,n)),l}}else s.next=function(){const o=c.call(this);return o.done===!1&&(o.value=r(o.value,e,o.value,n)),o};return s}function W(s,e,t){return s.isUnsubscribed||e.ignoreSymbols&&$(t)||e.ignoreUnderscores&&t.charAt(0)==="_"||"ignoreKeys"in e&&e.ignoreKeys.includes(t)}class ae{constructor(e){this._equals=e,this._proxyCache=new WeakMap,this._pathCache=new WeakMap,this.isUnsubscribed=!1}_getDescriptorCache(){return this._descriptorCache===void 0&&(this._descriptorCache=new WeakMap),this._descriptorCache}_getProperties(e){const t=this._getDescriptorCache();let n=t.get(e);return n===void 0&&(n={},t.set(e,n)),n}_getOwnPropertyDescriptor(e,t){if(this.isUnsubscribed)return Reflect.getOwnPropertyDescriptor(e,t);const n=this._getProperties(e);let r=n[t];return r===void 0&&(r=Reflect.getOwnPropertyDescriptor(e,t),n[t]=r),r}getProxy(e,t,n,r){if(this.isUnsubscribed)return e;const c=e[r],o=c??e;this._pathCache.set(o,t);let l=this._proxyCache.get(o);return l===void 0&&(l=c===void 0?new Proxy(e,n):e,this._proxyCache.set(o,l)),l}getPath(e){return this.isUnsubscribed?void 0:this._pathCache.get(e)}isDetached(e,t){return!Object.is(e,b.get(t,this.getPath(e)))}defineProperty(e,t,n){return Reflect.defineProperty(e,t,n)?(this.isUnsubscribed||(this._getProperties(e)[t]=n),!0):!1}setProperty(e,t,n,r,c){if(!this._equals(c,n)||!(t in e)){const o=this._getOwnPropertyDescriptor(e,t);return o!==void 0&&"set"in o?Reflect.set(e,t,n,r):Reflect.set(e,t,n)}return!0}deleteProperty(e,t,n){if(Reflect.deleteProperty(e,t)){if(!this.isUnsubscribed){const r=this._getDescriptorCache().get(e);r&&(delete r[t],this._pathCache.delete(n))}return!0}return!1}isSameDescriptor(e,t,n){const r=this._getOwnPropertyDescriptor(t,n);return e!==void 0&&r!==void 0&&Object.is(e.value,r.value)&&(e.writable||!1)===(r.writable||!1)&&(e.enumerable||!1)===(r.enumerable||!1)&&(e.configurable||!1)===(r.configurable||!1)&&e.get===r.get&&e.set===r.set}isGetInvariant(e,t){const n=this._getOwnPropertyDescriptor(e,t);return n!==void 0&&n.configurable!==!0&&n.writable!==!0}unsubscribe(){this._descriptorCache=null,this._pathCache=null,this._proxyCache=null,this.isUnsubscribed=!0}}function L(s){return toString.call(s)==="[object Object]"}function C(){return!0}function q(s,e){return s.length!==e.length||s.some((t,n)=>e[n]!==t)}const F=new Set(["hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]),ce=new Set(["concat","includes","indexOf","join","keys","lastIndexOf"]),Y={push:C,pop:C,shift:C,unshift:C,copyWithin:q,reverse:q,sort:q,splice:q,flat:q,fill:q},oe=new Set([...F,...ce,...Object.keys(Y)]);function O(s,e){if(s.size!==e.size)return!0;for(const t of s)if(!e.has(t))return!0;return!1}const X=["keys","values","entries"],Z=new Set(["has","toString"]),ee={add:O,clear:O,delete:O,forEach:O},de=new Set([...Z,...Object.keys(ee),...X]);function E(s,e){if(s.size!==e.size)return!0;let t;for(const[n,r]of s)if(t=e.get(n),t!==r||t===void 0&&!e.has(n))return!0;return!1}const le=new Set([...Z,"get"]),te={set:E,clear:E,delete:E,forEach:E},fe=new Set([...le,...Object.keys(te),...X]);class y{constructor(e,t,n,r){this._path=t,this._isChanged=!1,this._clonedCache=new Set,this._hasOnValidate=r,this._changes=r?[]:null,this.clone=t===void 0?e:this._shallowClone(e)}static isHandledMethod(e){return F.has(e)}_shallowClone(e){let t=e;if(L(e))t={...e};else if(R(e)||ArrayBuffer.isView(e))t=[...e];else if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set([...e].map(n=>this._shallowClone(n)));else if(e instanceof Map){t=new Map;for(const[n,r]of e.entries())t.set(n,this._shallowClone(r))}return this._clonedCache.add(t),t}preferredThisArg(e,t,n,r){return e?(R(r)?this._onIsChanged=Y[t]:r instanceof Set?this._onIsChanged=ee[t]:r instanceof Map&&(this._onIsChanged=te[t]),r):n}update(e,t,n){const r=b.after(e,this._path);if(t!=="length"){let c=this.clone;b.walk(r,o=>{c!=null&&c[o]&&(this._clonedCache.has(c[o])||(c[o]=this._shallowClone(c[o])),c=c[o])}),this._hasOnValidate&&this._changes.push({path:r,property:t,previous:n}),c!=null&&c[t]&&(c[t]=n)}this._isChanged=!0}undo(e){let t;for(let n=this._changes.length-1;n!==-1;n--)t=this._changes[n],b.get(e,t.path)[t.property]=t.previous}isChanged(e){return this._onIsChanged===void 0?this._isChanged:this._onIsChanged(this.clone,e)}isPathApplicable(e){return b.isRootPath(this._path)||b.isSubPath(e,this._path)}}class z extends y{static isHandledMethod(e){return oe.has(e)}}class he extends y{undo(e){e.setTime(this.clone.getTime())}isChanged(e,t){return!t(this.clone.valueOf(),e.valueOf())}}class K extends y{static isHandledMethod(e){return de.has(e)}undo(e){for(const t of this.clone)e.add(t);for(const t of e)this.clone.has(t)||e.delete(t)}}class G extends y{static isHandledMethod(e){return fe.has(e)}undo(e){for(const[t,n]of this.clone.entries())e.set(t,n);for(const t of e.keys())this.clone.has(t)||e.delete(t)}}class ue extends y{constructor(e,t,n,r){super(void 0,t,n,r),this._argument1=n[0],this._weakValue=e.has(this._argument1)}isChanged(e){return this._weakValue!==e.has(this._argument1)}undo(e){this._weakValue&&!e.has(this._argument1)?e.add(this._argument1):e.delete(this._argument1)}}class me extends y{constructor(e,t,n,r){super(void 0,t,n,r),this._weakKey=n[0],this._weakHas=e.has(this._weakKey),this._weakValue=e.get(this._weakKey)}isChanged(e){return this._weakValue!==e.get(this._weakKey)}undo(e){const t=e.has(this._weakKey);this._weakHas&&!t?e.set(this._weakKey,this._weakValue):!this._weakHas&&t?e.delete(this._weakKey):this._weakValue!==e.get(this._weakKey)&&e.set(this._weakKey,this._weakValue)}}class _{constructor(e){this._stack=[],this._hasOnValidate=e}static isHandledType(e){return L(e)||R(e)||N(e)}static isHandledMethod(e,t){return L(e)?y.isHandledMethod(t):R(e)?z.isHandledMethod(t):e instanceof Set?K.isHandledMethod(t):e instanceof Map?G.isHandledMethod(t):N(e)}get isCloning(){return this._stack.length>0}start(e,t,n){let r=y;R(e)?r=z:e instanceof Date?r=he:e instanceof Set?r=K:e instanceof Map?r=G:e instanceof WeakSet?r=ue:e instanceof WeakMap&&(r=me),this._stack.push(new r(e,t,n,this._hasOnValidate))}update(e,t,n){this._stack.at(-1).update(e,t,n)}preferredThisArg(e,t,n){const{name:r}=e,c=_.isHandledMethod(n,r);return this._stack.at(-1).preferredThisArg(c,r,t,n)}isChanged(e,t,n){return this._stack.at(-1).isChanged(e,t,n)}isPartOfClone(e){return this._stack.at(-1).isPathApplicable(e)}undo(e){this._previousClone!==void 0&&this._previousClone.undo(e)}stop(){return this._previousClone=this._stack.pop(),this._previousClone.clone}}const Re={equals:Object.is,isShallow:!1,pathAsArray:!1,ignoreSymbols:!1,ignoreUnderscores:!1,ignoreDetached:!1,details:!1},P=(s,e,t={})=>{t={...Re,...t};const n=Symbol("ProxyTarget"),{equals:r,isShallow:c,ignoreDetached:o,details:l}=t,h=new ae(r),S=typeof t.onValidate=="function",m=new _(S),k=(p,a,d,f,u)=>!S||m.isCloning||t.onValidate(b.concat(h.getPath(p),a),d,f,u)===!0,M=(p,a,d,f)=>{!W(h,t,a)&&!(o&&h.isDetached(p,s))&&D(h.getPath(p),a,d,f)},D=(p,a,d,f,u)=>{m.isCloning&&m.isPartOfClone(p)?m.update(p,a,f):e(b.concat(p,a),d,f,u)},x=p=>p&&(p[n]??p),B=(p,a,d,f)=>{if(re(p)||d==="constructor"||c&&!_.isHandledMethod(a,d)||W(h,t,d)||h.isGetInvariant(a,d)||o&&h.isDetached(a,s))return p;f===void 0&&(f=h.getPath(a));const u=b.concat(f,d),v=h.getPath(p);return v&&se(u,v)?h.getProxy(p,v,A,n):h.getProxy(p,u,A,n)},se=(p,a)=>{if($(p)||p.length<=a.length||R(a)&&a.length===0)return!1;const d=R(p)?p:p.split(g),f=R(a)?a:a.split(g);return d.length<=f.length?!1:!f.some((u,v)=>u!==d[v])},A={get(p,a,d){if($(a)){if(a===n||a===I)return p;if(a===J&&!h.isUnsubscribed&&h.getPath(p).length===0)return h.unsubscribe(),p}const f=N(p)?Reflect.get(p,a):Reflect.get(p,a,d);return B(f,p,a)},set(p,a,d,f){d=x(d);const u=p[n]??p,v=u[a];if(r(v,d)&&a in p)return!0;const w=k(p,a,d,v);return w&&h.setProperty(u,a,d,f,v)?(M(p,a,p[a],v),!0):!w},defineProperty(p,a,d){if(!h.isSameDescriptor(d,p,a)){const f=p[a];k(p,a,d.value,f)&&h.defineProperty(p,a,d,f)&&M(p,a,d.value,f)}return!0},deleteProperty(p,a){if(!Reflect.has(p,a))return!0;const d=Reflect.get(p,a),f=k(p,a,void 0,d);return f&&h.deleteProperty(p,a,d)?(M(p,a,void 0,d),!0):!f},apply(p,a,d){const f=a[n]??a;if(h.isUnsubscribed)return Reflect.apply(p,f,d);if((l===!1||l!==!0&&!l.includes(p.name))&&_.isHandledType(f)){let u=b.initial(h.getPath(p));const v=_.isHandledMethod(f,p.name);m.start(f,u,d);let w=Reflect.apply(p,m.preferredThisArg(p,a,f),v?d.map(T=>x(T)):d);const ne=m.isChanged(f,r),V=m.stop();if(_.isHandledType(w)&&v&&(a instanceof Map&&p.name==="get"&&(u=b.concat(u,d[0])),w=h.getProxy(w,u,A)),ne){const T={name:p.name,args:d,result:w},Q=m.isCloning?b.initial(u):u,U=m.isCloning?b.last(u):"";k(b.get(s,Q),U,f,V,T)?D(Q,U,f,V,T):m.undo(f)}return(a instanceof Map||a instanceof Set)&&ie(w)?pe(w,p,a,u,B):w}return Reflect.apply(p,a,d)}},H=h.getProxy(s,t.pathAsArray?[]:"",A);return e=e.bind(H),S&&(t.onValidate=t.onValidate.bind(H)),H};P.target=s=>(s==null?void 0:s[I])??s;P.unsubscribe=s=>(s==null?void 0:s[J])??s;const i={isp:{interfaces:{hqRtr:{name:"ens19",ip:"172.16.4.1",mask:"28"},brRtr:{name:"ens20",ip:"172.16.5.1",mask:"28"}}},hqRtr:{interfaces:{isp:{name:"ens18",ip:"172.16.4.2",mask:"28"},brRtr:{ip:"10.5.5.1",mask:"30"},hqCli:{ip:"192.168.100.1",mask:"28"},hqSrv:{ip:"192.168.200.1",mask:"28"},vlan999:{ip:"192.168.99.1",mask:"29"}}},hqSrv:{interfaces:{hqRtr:{name:"ens18",ip:"192.168.100.2",mask:"28"}}},hqCli:{interfaces:{hqRtr:{ip:"192.168.200.2",mask:"28"}}},brRtr:{interfaces:{isp:{name:"ens18",ip:"172.16.5.2",mask:"28"},brSrv:{ip:"192.168.0.1",mask:"28"},hqRtr:{ip:"10.5.5.2",mask:"30"}}},brSrv:{interfaces:{brRtr:{name:"ens18",ip:"192.168.0.2",mask:"28"}}}},be=()=>`
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
<p><code>hostnamectl set-hostname BR-SRV.au-team.irpo</code></p>
<p>Указываем статичный ipv4 адрес для ${i.brSrv.interfaces.brRtr.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${i.brSrv.interfaces.brRtr.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${i.brSrv.interfaces.brRtr.ip}/${i.brSrv.interfaces.brRtr.mask}' > /etc/net/ifaces/${i.brSrv.interfaces.brRtr.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${i.brRtr.interfaces.brSrv.ip}' > /etc/net/ifaces/${i.brSrv.interfaces.brRtr.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${i.brSrv.interfaces.brRtr.name}/resolv.conf></code></p>
<p><code>systemctl restart network</code></p>
<br>
<p>Запуск консоли HQ-SRV</p>
<p><code>hostnamectl set-hostname HQ-SRV.au-team.irpo</code></p>
<p>Указываем статичный ipv4 адрес для ${i.hqSrv.interfaces.hqRtr.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${i.hqSrv.interfaces.hqRtr.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${i.hqSrv.interfaces.hqRtr.ip}/${i.hqSrv.interfaces.hqRtr.mask}' > /etc/net/ifaces/${i.hqSrv.interfaces.hqRtr.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${i.hqSrv.interfaces.hqRtr.ip}' > /etc/net/ifaces/${i.hqSrv.interfaces.hqRtr.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${i.hqSrv.interfaces.hqRtr.name}/resolv.conf></code></p>
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
echo ‘${i.hqRtr.interfaces.hqCli.ip}/${i.hqRtr.interfaces.hqCli.mask}’ >> /etc/net/ifaces/vlan100/ipv4address
echo ‘${i.hqRtr.interfaces.hqSrv.ip}/${i.hqRtr.interfaces.hqSrv.mask}’ >> /etc/net/ifaces/vlan200/ipv4address
echo ‘${i.hqRtr.interfaces.vlan999.ip}/${i.hqRtr.interfaces.vlan999.mask}’ >> /etc/net/ifaces/vlan999/ipv4address
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
  <p>${i.hqCli.interfaces.hqRtr.ip}/${i.hqCli.interfaces.hqRtr.mask}</p>
  <p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
  <p>Вводим строку default via ${i.hqRtr.interfaces.hqSrv.ip}</p>
  <p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf</p>
  <p>nameserver 8.8.8.8</p>
  <p>systemctl restart network</p>
  <p>systemctl restart NetworkManager</p>
  <p>ip -br a</p>
  <p>ping ${i.hqRtr.interfaces.hqSrv.ip}</p>
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
<p>Local ip: <code>${i.brRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${i.hqRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${i.brRtr.interfaces.hqRtr.ip}/${i.brRtr.interfaces.hqRtr.mask}</code></p>
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
<p>Local ip: <code>${i.hqRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${i.brRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${i.hqRtr.interfaces.brRtr.ip}/${i.hqRtr.interfaces.brRtr.mask}</code></p>
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
<p><code>timedatectl set-timezone Europe/Moscow</code></p>
`,ve=(s,{devices:e})=>{const t=document.createElement("table"),n=document.createElement("thead");n.innerHTML=`
    <tr>
      <th>Имя устройства</th>
      <th>Назначение (куда смотрит)</th>
      <th>IP-адрес</th>
      <th>Маска</th>
      <th>Шлюз по умолчанию</th>
    </tr>
  `,t.appendChild(n);const r=document.createElement("tbody");Object.values(e).forEach(({name:c,interfaces:o})=>{const l=Object.values(o);if(!l.length)return;const h=document.createElement("tr");h.innerHTML=`
      <td rowspan="${l.length}">${c}</td>
      <td>${l[0].destination||"-"}</td>
      <td>${l[0].ip}</td>
      <td>${l[0].mask}</td>
      <td>${l[0].gateway}</td>
    `,r.appendChild(h);for(let S=1;S<l.length;S+=1){const m=l[S],k=document.createElement("tr");k.innerHTML=`
        <td>${m.destination||"-"}</td>
        <td>${m.ip}</td>
        <td>${m.mask}</td>
        <td>${m.gateway}</td>
      `,r.appendChild(k)}}),t.appendChild(r),s.ipTableContainer.innerHTML="",s.ipTableContainer.appendChild(t)},Se=(s,e)=>{const t=be();s.textContainer.innerHTML=t,document.querySelectorAll("code").forEach(n=>{const r=document.createElement("span");r.className="code-wrapper";const c=document.createElement("div");c.className="code-copy-toast",c.textContent="Скопировано!",n.parentNode.insertBefore(r,n),r.appendChild(n),r.appendChild(c),n.style.cursor="pointer",n.title="Кликни, чтобы скопировать",n.addEventListener("click",()=>{navigator.clipboard.writeText(n.innerText).then(()=>{c.classList.add("show"),setTimeout(()=>c.classList.remove("show"),300)})})})},we=(s,e)=>(t,n)=>{switch(t){case"devices":ve(s,e),Se(s);break}};function ge(s){const e=new Set;return Object.values(s).forEach(t=>{Object.values(t.interfaces).forEach(n=>{n.netAddress&&!n.netAddress.startsWith("<")&&e.add(n.netAddress)})}),Array.from(e)}function ye(s,e){const t=document.createElement("form");t.id="network-form",t.innerHTML="<h3>Настройки сетей</h3>",s.forEach(r=>{const c=document.createElement("div");c.className="network-input";const o=document.createElement("label");o.textContent=`Сеть ${r}:`;const l=document.createElement("input");l.type="text",l.placeholder="Базовый адрес (напр. 192.168.0)",l.dataset.network=r;const h=document.createElement("input");h.type="text",h.placeholder="Маска (напр. 24)",h.dataset.network=r,c.append(o,l,h),t.append(c)});const n=document.createElement("button");n.type="button",n.textContent="Обновить",t.append(n),e.innerHTML="",e.append(t)}function ke(){const s=document.querySelectorAll("#network-form input"),e={};return s.forEach(t=>{const{network:n}=t.dataset;e[n]||(e[n]={}),t.placeholder.includes("Базовый")?e[n].base=t.value.trim():e[n].mask=t.value.trim()}),e}function _e(s,e){const t=JSON.parse(JSON.stringify(s));return Object.entries(e).forEach(([n,{base:r,mask:c}])=>{!r||!c||Object.values(t).forEach(o=>{Object.values(o.interfaces).forEach(l=>{if(l.netAddress===n){l.mask=c;const[h]=l.ip.split(".").slice(-1);if(l.ip=`${r}.${h}`,l.netAddress=`${r}.0`,l.gateway!=="-"){const S=l.gateway.split(".");S.splice(0,3,...r.split(".")),l.gateway=S.join(".")}}})})}),t}const j={isp:{name:"ISP",interfaces:{external:{name:"ens18",ip:"<ВНЕШНИЙ>",mask:"24",gateway:"<ВНЕШНИЙ>",destination:"Интернет",netAddress:""},hqRtr:{name:"ens19",ip:"172.16.4.1",mask:"28",gateway:"-",destination:"HQ-RTR",netAddress:"172.16.4.0"},brRtr:{name:"ens20",ip:"172.16.5.1",mask:"28",gateway:"-",destination:"BR-RTR",netAddress:"172.16.5.0"}}},hqRtr:{name:"HQ-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.4.2",mask:"28",gateway:"172.16.4.1",destination:"ISP",netAddress:"172.16.4.0"},brRtr:{name:"gre1",ip:"10.5.5.1",mask:"30",gateway:"-",destination:"BR-RTR",netAddress:"10.5.5.0"},hqCli:{name:"VLAN100",ip:"192.168.100.1",mask:"28",gateway:"-",destination:"HQ-CLI",netAddress:"192.168.100.0"},hqSrv:{name:"VLAN200",ip:"192.168.200.1",mask:"28",gateway:"-",destination:"HQ-SRV",netAddress:"192.168.200.0"},vlan999:{name:"VLAN999",ip:"192.168.99.1",mask:"29",gateway:"-",destination:"VLAN999 (?)",netAddress:"192.168.99.0"}}},hqSrv:{name:"HQ-SRV",interfaces:{hqRtr:{name:"ens18",ip:"192.168.100.2",mask:"28",gateway:"192.168.100.1",destination:"HQ-RTR",netAddress:"192.168.100.0"}}},hqCli:{name:"HQ-CLI",interfaces:{hqRtr:{name:"ens18",ip:"192.168.200.2",mask:"28",gateway:"192.168.200.1",destination:"HQ-RTR",netAddress:"192.168.200.0"}}},brRtr:{name:"BR-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.5.2",mask:"28",gateway:"172.16.5.1",destination:"ISP",netAddress:"172.16.5.0"},brSrv:{name:"ens19",ip:"192.168.0.1",mask:"28",gateway:"-",destination:"BR-SRV",netAddress:"192.168.0.0"},hqRtr:{name:"gre1",ip:"10.5.5.2",mask:"30",gateway:"-",destination:"HQ-RTR",netAddress:"10.5.5.0"}}},brSrv:{name:"BR-SRV",interfaces:{brRtr:{name:"ens18",ip:"192.168.0.2",mask:"28",gateway:"192.168.0.1",destination:"BR-RTR",netAddress:"192.168.0.0"}}}},qe=()=>{const s={ipTableContainer:document.getElementById("ip-table-container"),textContainer:document.getElementById("text-container"),networkFormContainer:document.getElementById("network-form-container")},e={devices:[]},t=P(e,we(s,e));t.devices=j;const n=JSON.parse(JSON.stringify(j)),r=ge(n);ye(r,s.networkFormContainer),document.querySelector("#network-form button").addEventListener("click",()=>{const c=ke(),o=_e(n,c);console.log(o),t.devices=o})};qe();
