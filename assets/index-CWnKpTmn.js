(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function t(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(i){if(i.ep)return;i.ep=!0;const c=t(i);fetch(i.href,c)}})();const w=".",I=Symbol("target"),Y=Symbol("unsubscribe");function L(s){return s instanceof Date||s instanceof Set||s instanceof Map||s instanceof WeakSet||s instanceof WeakMap||ArrayBuffer.isView(s)}function ne(s){return(typeof s=="object"?s===null:typeof s!="function")||s instanceof RegExp}const R=Array.isArray;function O(s){return typeof s=="symbol"}const b={after(s,e){return R(s)?s.slice(e.length):e===""?s:s.slice(e.length+1)},concat(s,e){return R(s)?(s=[...s],e&&s.push(e),s):e&&e.toString!==void 0?(s!==""&&(s+=w),O(e)?s+e.toString():s+e):s},initial(s){if(R(s))return s.slice(0,-1);if(s==="")return s;const e=s.lastIndexOf(w);return e===-1?"":s.slice(0,e)},last(s){if(R(s))return s.at(-1)??"";if(s==="")return s;const e=s.lastIndexOf(w);return e===-1?s:s.slice(e+1)},walk(s,e){if(R(s))for(const t of s)e(t);else if(s!==""){let t=0,n=s.indexOf(w);if(n===-1)e(s);else for(;t<s.length;)n===-1&&(n=s.length),e(s.slice(t,n)),t=n+1,n=s.indexOf(w,t)}},get(s,e){return this.walk(e,t=>{s&&(s=s[t])}),s},isSubPath(s,e){if(R(s)){if(s.length<e.length)return!1;for(let t=0;t<e.length;t++)if(s[t]!==e[t])return!1;return!0}return s.length<e.length?!1:s===e?!0:s.startsWith(e)?s[e.length]===w:!1},isRootPath(s){return R(s)?s.length===0:s===""}};function ie(s){return typeof s=="object"&&typeof s.next=="function"}function re(s,e,t,n,i){const c=s.next;if(e.name==="entries")s.next=function(){const d=c.call(this);return d.done===!1&&(d.value[0]=i(d.value[0],e,d.value[0],n),d.value[1]=i(d.value[1],e,d.value[0],n)),d};else if(e.name==="values"){const d=t[I].keys();s.next=function(){const h=c.call(this);return h.done===!1&&(h.value=i(h.value,e,d.next().value,n)),h}}else s.next=function(){const d=c.call(this);return d.done===!1&&(d.value=i(d.value,e,d.value,n)),d};return s}function W(s,e,t){return s.isUnsubscribed||e.ignoreSymbols&&O(t)||e.ignoreUnderscores&&t.charAt(0)==="_"||"ignoreKeys"in e&&e.ignoreKeys.includes(t)}class pe{constructor(e){this._equals=e,this._proxyCache=new WeakMap,this._pathCache=new WeakMap,this.isUnsubscribed=!1}_getDescriptorCache(){return this._descriptorCache===void 0&&(this._descriptorCache=new WeakMap),this._descriptorCache}_getProperties(e){const t=this._getDescriptorCache();let n=t.get(e);return n===void 0&&(n={},t.set(e,n)),n}_getOwnPropertyDescriptor(e,t){if(this.isUnsubscribed)return Reflect.getOwnPropertyDescriptor(e,t);const n=this._getProperties(e);let i=n[t];return i===void 0&&(i=Reflect.getOwnPropertyDescriptor(e,t),n[t]=i),i}getProxy(e,t,n,i){if(this.isUnsubscribed)return e;const c=e[i],d=c??e;this._pathCache.set(d,t);let h=this._proxyCache.get(d);return h===void 0&&(h=c===void 0?new Proxy(e,n):e,this._proxyCache.set(d,h)),h}getPath(e){return this.isUnsubscribed?void 0:this._pathCache.get(e)}isDetached(e,t){return!Object.is(e,b.get(t,this.getPath(e)))}defineProperty(e,t,n){return Reflect.defineProperty(e,t,n)?(this.isUnsubscribed||(this._getProperties(e)[t]=n),!0):!1}setProperty(e,t,n,i,c){if(!this._equals(c,n)||!(t in e)){const d=this._getOwnPropertyDescriptor(e,t);return d!==void 0&&"set"in d?Reflect.set(e,t,n,i):Reflect.set(e,t,n)}return!0}deleteProperty(e,t,n){if(Reflect.deleteProperty(e,t)){if(!this.isUnsubscribed){const i=this._getDescriptorCache().get(e);i&&(delete i[t],this._pathCache.delete(n))}return!0}return!1}isSameDescriptor(e,t,n){const i=this._getOwnPropertyDescriptor(t,n);return e!==void 0&&i!==void 0&&Object.is(e.value,i.value)&&(e.writable||!1)===(i.writable||!1)&&(e.enumerable||!1)===(i.enumerable||!1)&&(e.configurable||!1)===(i.configurable||!1)&&e.get===i.get&&e.set===i.set}isGetInvariant(e,t){const n=this._getOwnPropertyDescriptor(e,t);return n!==void 0&&n.configurable!==!0&&n.writable!==!0}unsubscribe(){this._descriptorCache=null,this._pathCache=null,this._proxyCache=null,this.isUnsubscribed=!0}}function P(s){return toString.call(s)==="[object Object]"}function A(){return!0}function k(s,e){return s.length!==e.length||s.some((t,n)=>e[n]!==t)}const j=new Set(["hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]),ae=new Set(["concat","includes","indexOf","join","keys","lastIndexOf"]),F={push:A,pop:A,shift:A,unshift:A,copyWithin:k,reverse:k,sort:k,splice:k,flat:k,fill:k},ce=new Set([...j,...ae,...Object.keys(F)]);function M(s,e){if(s.size!==e.size)return!0;for(const t of s)if(!e.has(t))return!0;return!1}const J=["keys","values","entries"],X=new Set(["has","toString"]),Z={add:M,clear:M,delete:M,forEach:M},oe=new Set([...X,...Object.keys(Z),...J]);function $(s,e){if(s.size!==e.size)return!0;let t;for(const[n,i]of s)if(t=e.get(n),t!==i||t===void 0&&!e.has(n))return!0;return!1}const de=new Set([...X,"get"]),ee={set:$,clear:$,delete:$,forEach:$},le=new Set([...de,...Object.keys(ee),...J]);class g{constructor(e,t,n,i){this._path=t,this._isChanged=!1,this._clonedCache=new Set,this._hasOnValidate=i,this._changes=i?[]:null,this.clone=t===void 0?e:this._shallowClone(e)}static isHandledMethod(e){return j.has(e)}_shallowClone(e){let t=e;if(P(e))t={...e};else if(R(e)||ArrayBuffer.isView(e))t=[...e];else if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set([...e].map(n=>this._shallowClone(n)));else if(e instanceof Map){t=new Map;for(const[n,i]of e.entries())t.set(n,this._shallowClone(i))}return this._clonedCache.add(t),t}preferredThisArg(e,t,n,i){return e?(R(i)?this._onIsChanged=F[t]:i instanceof Set?this._onIsChanged=Z[t]:i instanceof Map&&(this._onIsChanged=ee[t]),i):n}update(e,t,n){const i=b.after(e,this._path);if(t!=="length"){let c=this.clone;b.walk(i,d=>{c!=null&&c[d]&&(this._clonedCache.has(c[d])||(c[d]=this._shallowClone(c[d])),c=c[d])}),this._hasOnValidate&&this._changes.push({path:i,property:t,previous:n}),c!=null&&c[t]&&(c[t]=n)}this._isChanged=!0}undo(e){let t;for(let n=this._changes.length-1;n!==-1;n--)t=this._changes[n],b.get(e,t.path)[t.property]=t.previous}isChanged(e){return this._onIsChanged===void 0?this._isChanged:this._onIsChanged(this.clone,e)}isPathApplicable(e){return b.isRootPath(this._path)||b.isSubPath(e,this._path)}}class z extends g{static isHandledMethod(e){return ce.has(e)}}class fe extends g{undo(e){e.setTime(this.clone.getTime())}isChanged(e,t){return!t(this.clone.valueOf(),e.valueOf())}}class K extends g{static isHandledMethod(e){return oe.has(e)}undo(e){for(const t of this.clone)e.add(t);for(const t of e)this.clone.has(t)||e.delete(t)}}class G extends g{static isHandledMethod(e){return le.has(e)}undo(e){for(const[t,n]of this.clone.entries())e.set(t,n);for(const t of e.keys())this.clone.has(t)||e.delete(t)}}class he extends g{constructor(e,t,n,i){super(void 0,t,n,i),this._argument1=n[0],this._weakValue=e.has(this._argument1)}isChanged(e){return this._weakValue!==e.has(this._argument1)}undo(e){this._weakValue&&!e.has(this._argument1)?e.add(this._argument1):e.delete(this._argument1)}}class ue extends g{constructor(e,t,n,i){super(void 0,t,n,i),this._weakKey=n[0],this._weakHas=e.has(this._weakKey),this._weakValue=e.get(this._weakKey)}isChanged(e){return this._weakValue!==e.get(this._weakKey)}undo(e){const t=e.has(this._weakKey);this._weakHas&&!t?e.set(this._weakKey,this._weakValue):!this._weakHas&&t?e.delete(this._weakKey):this._weakValue!==e.get(this._weakKey)&&e.set(this._weakKey,this._weakValue)}}class q{constructor(e){this._stack=[],this._hasOnValidate=e}static isHandledType(e){return P(e)||R(e)||L(e)}static isHandledMethod(e,t){return P(e)?g.isHandledMethod(t):R(e)?z.isHandledMethod(t):e instanceof Set?K.isHandledMethod(t):e instanceof Map?G.isHandledMethod(t):L(e)}get isCloning(){return this._stack.length>0}start(e,t,n){let i=g;R(e)?i=z:e instanceof Date?i=fe:e instanceof Set?i=K:e instanceof Map?i=G:e instanceof WeakSet?i=he:e instanceof WeakMap&&(i=ue),this._stack.push(new i(e,t,n,this._hasOnValidate))}update(e,t,n){this._stack.at(-1).update(e,t,n)}preferredThisArg(e,t,n){const{name:i}=e,c=q.isHandledMethod(n,i);return this._stack.at(-1).preferredThisArg(c,i,t,n)}isChanged(e,t,n){return this._stack.at(-1).isChanged(e,t,n)}isPartOfClone(e){return this._stack.at(-1).isPathApplicable(e)}undo(e){this._previousClone!==void 0&&this._previousClone.undo(e)}stop(){return this._previousClone=this._stack.pop(),this._previousClone.clone}}const me={equals:Object.is,isShallow:!1,pathAsArray:!1,ignoreSymbols:!1,ignoreUnderscores:!1,ignoreDetached:!1,details:!1},N=(s,e,t={})=>{t={...me,...t};const n=Symbol("ProxyTarget"),{equals:i,isShallow:c,ignoreDetached:d,details:h}=t,f=new pe(i),y=typeof t.onValidate=="function",m=new q(y),_=(p,a,o,l,u)=>!y||m.isCloning||t.onValidate(b.concat(f.getPath(p),a),o,l,u)===!0,H=(p,a,o,l)=>{!W(f,t,a)&&!(d&&f.isDetached(p,s))&&D(f.getPath(p),a,o,l)},D=(p,a,o,l,u)=>{m.isCloning&&m.isPartOfClone(p)?m.update(p,a,l):e(b.concat(p,a),o,l,u)},x=p=>p&&(p[n]??p),B=(p,a,o,l)=>{if(ne(p)||o==="constructor"||c&&!q.isHandledMethod(a,o)||W(f,t,o)||f.isGetInvariant(a,o)||d&&f.isDetached(a,s))return p;l===void 0&&(l=f.getPath(a));const u=b.concat(l,o),v=f.getPath(p);return v&&te(u,v)?f.getProxy(p,v,T,n):f.getProxy(p,u,T,n)},te=(p,a)=>{if(O(p)||p.length<=a.length||R(a)&&a.length===0)return!1;const o=R(p)?p:p.split(w),l=R(a)?a:a.split(w);return o.length<=l.length?!1:!l.some((u,v)=>u!==o[v])},T={get(p,a,o){if(O(a)){if(a===n||a===I)return p;if(a===Y&&!f.isUnsubscribed&&f.getPath(p).length===0)return f.unsubscribe(),p}const l=L(p)?Reflect.get(p,a):Reflect.get(p,a,o);return B(l,p,a)},set(p,a,o,l){o=x(o);const u=p[n]??p,v=u[a];if(i(v,o)&&a in p)return!0;const S=_(p,a,o,v);return S&&f.setProperty(u,a,o,l,v)?(H(p,a,p[a],v),!0):!S},defineProperty(p,a,o){if(!f.isSameDescriptor(o,p,a)){const l=p[a];_(p,a,o.value,l)&&f.defineProperty(p,a,o,l)&&H(p,a,o.value,l)}return!0},deleteProperty(p,a){if(!Reflect.has(p,a))return!0;const o=Reflect.get(p,a),l=_(p,a,void 0,o);return l&&f.deleteProperty(p,a,o)?(H(p,a,void 0,o),!0):!l},apply(p,a,o){const l=a[n]??a;if(f.isUnsubscribed)return Reflect.apply(p,l,o);if((h===!1||h!==!0&&!h.includes(p.name))&&q.isHandledType(l)){let u=b.initial(f.getPath(p));const v=q.isHandledMethod(l,p.name);m.start(l,u,o);let S=Reflect.apply(p,m.preferredThisArg(p,a,l),v?o.map(C=>x(C)):o);const se=m.isChanged(l,i),V=m.stop();if(q.isHandledType(S)&&v&&(a instanceof Map&&p.name==="get"&&(u=b.concat(u,o[0])),S=f.getProxy(S,u,T)),se){const C={name:p.name,args:o,result:S},Q=m.isCloning?b.initial(u):u,U=m.isCloning?b.last(u):"";_(b.get(s,Q),U,l,V,C)?D(Q,U,l,V,C):m.undo(l)}return(a instanceof Map||a instanceof Set)&&ie(S)?re(S,p,a,u,B):S}return Reflect.apply(p,a,o)}},E=f.getProxy(s,t.pathAsArray?[]:"",T);return e=e.bind(E),y&&(t.onValidate=t.onValidate.bind(E)),E};N.target=s=>(s==null?void 0:s[I])??s;N.unsubscribe=s=>(s==null?void 0:s[Y])??s;const r={isp:{interfaces:{hqRtr:{name:"ens19",ip:"172.16.4.1",mask:"28"},brRtr:{name:"ens20",ip:"172.16.5.1",mask:"28"}}},hqRtr:{interfaces:{isp:{name:"ens18",ip:"172.16.4.2",mask:"28"},brRtr:{ip:"10.5.5.1",mask:"30"},hqCli:{ip:"192.168.100.1",mask:"28"},hqSrv:{ip:"192.168.200.1",mask:"28"},vlan999:{ip:"192.168.99.1",mask:"29"}}},hqSrv:{interfaces:{hqRtr:{name:"ens18",ip:"192.168.100.2",mask:"28"}}},hqCli:{interfaces:{hqRtr:{ip:"192.168.200.2",mask:"28"}}},brRtr:{interfaces:{isp:{name:"ens18",ip:"172.16.5.2",mask:"28"},brSrv:{ip:"192.168.0.1",mask:"28"},hqRtr:{ip:"10.5.5.2",mask:"30"}}},brSrv:{interfaces:{brRtr:{name:"ens18",ip:"192.168.0.2",mask:"28"}}}},Re=()=>`
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
<p>выставляем ручной ip для ${r.isp.interfaces.hqRtr.name}: ${r.isp.interfaces.hqRtr.ip}/${r.isp.interfaces.hqRtr.mask}</p>
<p>аналогично настраиваем ${r.isp.interfaces.brRtr.name}: ${r.isp.interfaces.brRtr.ip}/${r.isp.interfaces.brRtr.mask}</p>
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
<p>Указываем статичный ipv4 адрес для ${r.hqRtr.interfaces.isp.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${r.hqRtr.interfaces.isp.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${r.hqRtr.interfaces.isp.ip}/${r.hqRtr.interfaces.isp.mask}' > /etc/net/ifaces/${r.hqRtr.interfaces.isp.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${r.isp.interfaces.hqRtr.ip}' > /etc/net/ifaces/${r.hqRtr.interfaces.isp.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${r.hqRtr.interfaces.isp.name}/resolv.conf></code></p>
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
<p>Указываем статичный ipv4 адрес для ${r.brRtr.interfaces.isp.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${r.brRtr.interfaces.isp.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${r.brRtr.interfaces.isp.ip}/${r.brRtr.interfaces.isp.mask}' > /etc/net/ifaces/${r.brRtr.interfaces.isp.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${r.isp.interfaces.brRtr.ip}' > /etc/net/ifaces/${r.brRtr.interfaces.isp.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${r.brRtr.interfaces.isp.name}/resolv.conf></code></p>
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
<p>ip ${r.brRtr.interfaces.brSrv.ip}/${r.brRtr.interfaces.brSrv.mask}</p>
<br>
<p>Запуск консоли BR-SRV</p>
<p><code>hostnamectl set-hostname BR-SRV.au-team.irpo</code></p>
<p>Указываем статичный ipv4 адрес для ${r.brSrv.interfaces.brRtr.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${r.brSrv.interfaces.brRtr.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${r.brSrv.interfaces.brRtr.ip}/${r.brSrv.interfaces.brRtr.mask}' > /etc/net/ifaces/${r.brSrv.interfaces.brRtr.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${r.brRtr.interfaces.brSrv.ip}' > /etc/net/ifaces/${r.brSrv.interfaces.brRtr.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${r.brSrv.interfaces.brRtr.name}/resolv.conf></code></p>
<p><code>systemctl restart network</code></p>
<br>
<p>Запуск консоли HQ-SRV</p>
<p><code>hostnamectl set-hostname HQ-SRV.au-team.irpo</code></p>
<p>Указываем статичный ipv4 адрес для ${r.hqSrv.interfaces.hqRtr.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${r.hqSrv.interfaces.hqRtr.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${r.hqSrv.interfaces.hqRtr.ip}/${r.hqSrv.interfaces.hqRtr.mask}' > /etc/net/ifaces/${r.hqSrv.interfaces.hqRtr.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${r.hqSrv.interfaces.hqRtr.ip}' > /etc/net/ifaces/${r.hqSrv.interfaces.hqRtr.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${r.hqSrv.interfaces.hqRtr.name}/resolv.conf></code></p>
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
echo ‘${r.hqRtr.interfaces.hqCli.ip}/${r.hqRtr.interfaces.hqCli.mask}’ >> /etc/net/ifaces/vlan100/ipv4address
echo ‘${r.hqRtr.interfaces.hqSrv.ip}/${r.hqRtr.interfaces.hqSrv.mask}’ >> /etc/net/ifaces/vlan200/ipv4address
echo ‘${r.hqRtr.interfaces.vlan999.ip}/${r.hqRtr.interfaces.vlan999.mask}’ >> /etc/net/ifaces/vlan999/ipv4address
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
  <p>${r.hqCli.interfaces.hqRtr.ip}/${r.hqCli.interfaces.hqRtr.mask}</p>
  <p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
  <p>Вводим строку default via ${r.hqRtr.interfaces.hqSrv.ip}</p>
  <p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf</p>
  <p>nameserver 8.8.8.8</p>
  <p>systemctl restart network</p>
  <p>systemctl restart NetworkManager</p>
  <p>ip -br a</p>
  <p>ping ${r.hqRtr.interfaces.hqSrv.ip}</p>
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
<p>Local ip: <code>${r.brRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${r.hqRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${r.brRtr.interfaces.hqRtr.ip}/${r.brRtr.interfaces.hqRtr.mask}</code></p>
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
<p>Local ip: <code>${r.hqRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${r.brRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${r.hqRtr.interfaces.brRtr.ip}/${r.hqRtr.interfaces.brRtr.mask}</code></p>
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
<p><code>timedatectl set-timezone Europe/Moscow</code></p>
`,be=(s,{devices:e})=>{const t=document.createElement("table"),n=document.createElement("thead");n.innerHTML=`
    <tr>
      <th>Имя устройства</th>
      <th>Назначение (куда смотрит)</th>
      <th>IP-адрес</th>
      <th>Маска</th>
      <th>Шлюз по умолчанию</th>
    </tr>
  `,t.appendChild(n);const i=document.createElement("tbody");Object.values(e).forEach(({name:c,interfaces:d})=>{const h=Object.values(d);if(!h.length)return;const f=document.createElement("tr");f.innerHTML=`
      <td rowspan="${h.length}">${c}</td>
      <td>${h[0].destination||"-"}</td>
      <td>${h[0].ip}</td>
      <td>${h[0].mask}</td>
      <td>${h[0].gateway}</td>
    `,i.appendChild(f);for(let y=1;y<h.length;y+=1){const m=h[y],_=document.createElement("tr");_.innerHTML=`
        <td>${m.destination||"-"}</td>
        <td>${m.ip}</td>
        <td>${m.mask}</td>
        <td>${m.gateway}</td>
      `,i.appendChild(_)}}),t.appendChild(i),s.ipTableContainer.innerHTML="",s.ipTableContainer.appendChild(t)},ve=(s,e)=>{const t=Re();s.textContainer.innerHTML=t,document.querySelectorAll("code").forEach(n=>{const i=document.createElement("span");i.className="code-wrapper";const c=document.createElement("div");c.className="code-copy-toast",c.textContent="Скопировано!",n.parentNode.insertBefore(i,n),i.appendChild(n),i.appendChild(c),n.style.cursor="pointer",n.title="Кликни, чтобы скопировать",n.addEventListener("click",()=>{navigator.clipboard.writeText(n.innerText).then(()=>{c.classList.add("show"),setTimeout(()=>c.classList.remove("show"),300)})})})},Se=(s,e)=>(t,n)=>{switch(t){case"devices":be(s,e),ve(s);break}},we={isp:{name:"ISP",interfaces:{external:{name:"ens18",ip:"<ВНЕШНИЙ>",mask:"24",gateway:"<ВНЕШНИЙ>",destination:"Интернет"},hqRtr:{name:"ens19",ip:"172.16.4.1",mask:"28",gateway:"-",destination:"HQ-RTR"},brRtr:{name:"ens20",ip:"172.16.5.1",mask:"28",gateway:"-",destination:"BR-RTR"}}},hqRtr:{name:"HQ-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.4.2",mask:"28",gateway:"172.16.4.1",destination:"ISP"},brRtr:{name:"gre1",ip:"10.5.5.1",mask:"30",gateway:"-",destination:"BR-RTR"},hqCli:{name:"VLAN100",ip:"192.168.100.1",mask:"28",gateway:"-",destination:"HQ-CLI"},hqSrv:{name:"VLAN200",ip:"192.168.200.1",mask:"28",gateway:"-",destination:"HQ-SRV"},vlan999:{name:"VLAN999",ip:"192.168.99.1",mask:"29",gateway:"-",destination:"VLAN999 (?)"}}},hqSrv:{name:"HQ-SRV",interfaces:{hqRtr:{name:"ens18",ip:"192.168.100.2",mask:"28",gateway:"192.168.100.1",destination:"HQ-RTR"}}},hqCli:{name:"HQ-CLI",interfaces:{hqRtr:{name:"ens18",ip:"192.168.200.2",mask:"28",gateway:"192.168.200.1",destination:"HQ-RTR"}}},brRtr:{name:"BR-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.5.2",mask:"28",gateway:"172.16.5.1",destination:"ISP"},brSrv:{name:"ens19",ip:"192.168.0.1",mask:"28",gateway:"-",destination:"BR-SRV"},hqRtr:{name:"gre1",ip:"10.5.5.2",mask:"30",gateway:"-",destination:"HQ-RTR"}}},brSrv:{name:"BR-SRV",interfaces:{brRtr:{name:"ens18",ip:"192.168.0.2",mask:"28",gateway:"192.168.0.1",destination:"BR-RTR"}}}},ge=()=>{const s={ipTableContainer:document.getElementById("ip-table-container"),textContainer:document.getElementById("text-container")},e={devices:[]},t=N(e,Se(s,e));t.devices=we};ge();
