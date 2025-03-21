(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const g=".",L=Symbol("target"),j=Symbol("unsubscribe");function H(t){return t instanceof Date||t instanceof Set||t instanceof Map||t instanceof WeakSet||t instanceof WeakMap||ArrayBuffer.isView(t)}function se(t){return(typeof t=="object"?t===null:typeof t!="function")||t instanceof RegExp}const m=Array.isArray;function E(t){return typeof t=="symbol"}const R={after(t,e){return m(t)?t.slice(e.length):e===""?t:t.slice(e.length+1)},concat(t,e){return m(t)?(t=[...t],e&&t.push(e),t):e&&e.toString!==void 0?(t!==""&&(t+=g),E(e)?t+e.toString():t+e):t},initial(t){if(m(t))return t.slice(0,-1);if(t==="")return t;const e=t.lastIndexOf(g);return e===-1?"":t.slice(0,e)},last(t){if(m(t))return t.at(-1)??"";if(t==="")return t;const e=t.lastIndexOf(g);return e===-1?t:t.slice(e+1)},walk(t,e){if(m(t))for(const n of t)e(n);else if(t!==""){let n=0,s=t.indexOf(g);if(s===-1)e(t);else for(;n<t.length;)s===-1&&(s=t.length),e(t.slice(n,s)),n=s+1,s=t.indexOf(g,n)}},get(t,e){return this.walk(e,n=>{t&&(t=t[n])}),t},isSubPath(t,e){if(m(t)){if(t.length<e.length)return!1;for(let n=0;n<e.length;n++)if(t[n]!==e[n])return!1;return!0}return t.length<e.length?!1:t===e?!0:t.startsWith(e)?t[e.length]===g:!1},isRootPath(t){return m(t)?t.length===0:t===""}};function re(t){return typeof t=="object"&&typeof t.next=="function"}function pe(t,e,n,s,r){const a=t.next;if(e.name==="entries")t.next=function(){const o=a.call(this);return o.done===!1&&(o.value[0]=r(o.value[0],e,o.value[0],s),o.value[1]=r(o.value[1],e,o.value[0],s)),o};else if(e.name==="values"){const o=n[L].keys();t.next=function(){const d=a.call(this);return d.done===!1&&(d.value=r(d.value,e,o.next().value,s)),d}}else t.next=function(){const o=a.call(this);return o.done===!1&&(o.value=r(o.value,e,o.value,s)),o};return t}function U(t,e,n){return t.isUnsubscribed||e.ignoreSymbols&&E(n)||e.ignoreUnderscores&&n.charAt(0)==="_"||"ignoreKeys"in e&&e.ignoreKeys.includes(n)}class ie{constructor(e){this._equals=e,this._proxyCache=new WeakMap,this._pathCache=new WeakMap,this.isUnsubscribed=!1}_getDescriptorCache(){return this._descriptorCache===void 0&&(this._descriptorCache=new WeakMap),this._descriptorCache}_getProperties(e){const n=this._getDescriptorCache();let s=n.get(e);return s===void 0&&(s={},n.set(e,s)),s}_getOwnPropertyDescriptor(e,n){if(this.isUnsubscribed)return Reflect.getOwnPropertyDescriptor(e,n);const s=this._getProperties(e);let r=s[n];return r===void 0&&(r=Reflect.getOwnPropertyDescriptor(e,n),s[n]=r),r}getProxy(e,n,s,r){if(this.isUnsubscribed)return e;const a=e[r],o=a??e;this._pathCache.set(o,n);let d=this._proxyCache.get(o);return d===void 0&&(d=a===void 0?new Proxy(e,s):e,this._proxyCache.set(o,d)),d}getPath(e){return this.isUnsubscribed?void 0:this._pathCache.get(e)}isDetached(e,n){return!Object.is(e,R.get(n,this.getPath(e)))}defineProperty(e,n,s){return Reflect.defineProperty(e,n,s)?(this.isUnsubscribed||(this._getProperties(e)[n]=s),!0):!1}setProperty(e,n,s,r,a){if(!this._equals(a,s)||!(n in e)){const o=this._getOwnPropertyDescriptor(e,n);return o!==void 0&&"set"in o?Reflect.set(e,n,s,r):Reflect.set(e,n,s)}return!0}deleteProperty(e,n,s){if(Reflect.deleteProperty(e,n)){if(!this.isUnsubscribed){const r=this._getDescriptorCache().get(e);r&&(delete r[n],this._pathCache.delete(s))}return!0}return!1}isSameDescriptor(e,n,s){const r=this._getOwnPropertyDescriptor(n,s);return e!==void 0&&r!==void 0&&Object.is(e.value,r.value)&&(e.writable||!1)===(r.writable||!1)&&(e.enumerable||!1)===(r.enumerable||!1)&&(e.configurable||!1)===(r.configurable||!1)&&e.get===r.get&&e.set===r.set}isGetInvariant(e,n){const s=this._getOwnPropertyDescriptor(e,n);return s!==void 0&&s.configurable!==!0&&s.writable!==!0}unsubscribe(){this._descriptorCache=null,this._pathCache=null,this._proxyCache=null,this.isUnsubscribed=!0}}function N(t){return toString.call(t)==="[object Object]"}function C(){return!0}function A(t,e){return t.length!==e.length||t.some((n,s)=>e[s]!==n)}const J=new Set(["hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]),ae=new Set(["concat","includes","indexOf","join","keys","lastIndexOf"]),F={push:C,pop:C,shift:C,unshift:C,copyWithin:A,reverse:A,sort:A,splice:A,flat:A,fill:A},oe=new Set([...J,...ae,...Object.keys(F)]);function v(t,e){if(t.size!==e.size)return!0;for(const n of t)if(!e.has(n))return!0;return!1}const Y=["keys","values","entries"],X=new Set(["has","toString"]),Z={add:v,clear:v,delete:v,forEach:v},ce=new Set([...X,...Object.keys(Z),...Y]);function O(t,e){if(t.size!==e.size)return!0;let n;for(const[s,r]of t)if(n=e.get(s),n!==r||n===void 0&&!e.has(s))return!0;return!1}const de=new Set([...X,"get"]),ee={set:O,clear:O,delete:O,forEach:O},le=new Set([...de,...Object.keys(ee),...Y]);class y{constructor(e,n,s,r){this._path=n,this._isChanged=!1,this._clonedCache=new Set,this._hasOnValidate=r,this._changes=r?[]:null,this.clone=n===void 0?e:this._shallowClone(e)}static isHandledMethod(e){return J.has(e)}_shallowClone(e){let n=e;if(N(e))n={...e};else if(m(e)||ArrayBuffer.isView(e))n=[...e];else if(e instanceof Date)n=new Date(e);else if(e instanceof Set)n=new Set([...e].map(s=>this._shallowClone(s)));else if(e instanceof Map){n=new Map;for(const[s,r]of e.entries())n.set(s,this._shallowClone(r))}return this._clonedCache.add(n),n}preferredThisArg(e,n,s,r){return e?(m(r)?this._onIsChanged=F[n]:r instanceof Set?this._onIsChanged=Z[n]:r instanceof Map&&(this._onIsChanged=ee[n]),r):s}update(e,n,s){const r=R.after(e,this._path);if(n!=="length"){let a=this.clone;R.walk(r,o=>{a!=null&&a[o]&&(this._clonedCache.has(a[o])||(a[o]=this._shallowClone(a[o])),a=a[o])}),this._hasOnValidate&&this._changes.push({path:r,property:n,previous:s}),a!=null&&a[n]&&(a[n]=s)}this._isChanged=!0}undo(e){let n;for(let s=this._changes.length-1;s!==-1;s--)n=this._changes[s],R.get(e,n.path)[n.property]=n.previous}isChanged(e){return this._onIsChanged===void 0?this._isChanged:this._onIsChanged(this.clone,e)}isPathApplicable(e){return R.isRootPath(this._path)||R.isSubPath(e,this._path)}}class W extends y{static isHandledMethod(e){return oe.has(e)}}class fe extends y{undo(e){e.setTime(this.clone.getTime())}isChanged(e,n){return!n(this.clone.valueOf(),e.valueOf())}}class z extends y{static isHandledMethod(e){return ce.has(e)}undo(e){for(const n of this.clone)e.add(n);for(const n of e)this.clone.has(n)||e.delete(n)}}class K extends y{static isHandledMethod(e){return le.has(e)}undo(e){for(const[n,s]of this.clone.entries())e.set(n,s);for(const n of e.keys())this.clone.has(n)||e.delete(n)}}class he extends y{constructor(e,n,s,r){super(void 0,n,s,r),this._argument1=s[0],this._weakValue=e.has(this._argument1)}isChanged(e){return this._weakValue!==e.has(this._argument1)}undo(e){this._weakValue&&!e.has(this._argument1)?e.add(this._argument1):e.delete(this._argument1)}}class ue extends y{constructor(e,n,s,r){super(void 0,n,s,r),this._weakKey=s[0],this._weakHas=e.has(this._weakKey),this._weakValue=e.get(this._weakKey)}isChanged(e){return this._weakValue!==e.get(this._weakKey)}undo(e){const n=e.has(this._weakKey);this._weakHas&&!n?e.set(this._weakKey,this._weakValue):!this._weakHas&&n?e.delete(this._weakKey):this._weakValue!==e.get(this._weakKey)&&e.set(this._weakKey,this._weakValue)}}class k{constructor(e){this._stack=[],this._hasOnValidate=e}static isHandledType(e){return N(e)||m(e)||H(e)}static isHandledMethod(e,n){return N(e)?y.isHandledMethod(n):m(e)?W.isHandledMethod(n):e instanceof Set?z.isHandledMethod(n):e instanceof Map?K.isHandledMethod(n):H(e)}get isCloning(){return this._stack.length>0}start(e,n,s){let r=y;m(e)?r=W:e instanceof Date?r=fe:e instanceof Set?r=z:e instanceof Map?r=K:e instanceof WeakSet?r=he:e instanceof WeakMap&&(r=ue),this._stack.push(new r(e,n,s,this._hasOnValidate))}update(e,n,s){this._stack.at(-1).update(e,n,s)}preferredThisArg(e,n,s){const{name:r}=e,a=k.isHandledMethod(s,r);return this._stack.at(-1).preferredThisArg(a,r,n,s)}isChanged(e,n,s){return this._stack.at(-1).isChanged(e,n,s)}isPartOfClone(e){return this._stack.at(-1).isPathApplicable(e)}undo(e){this._previousClone!==void 0&&this._previousClone.undo(e)}stop(){return this._previousClone=this._stack.pop(),this._previousClone.clone}}const me={equals:Object.is,isShallow:!1,pathAsArray:!1,ignoreSymbols:!1,ignoreUnderscores:!1,ignoreDetached:!1,details:!1},I=(t,e,n={})=>{n={...me,...n};const s=Symbol("ProxyTarget"),{equals:r,isShallow:a,ignoreDetached:o,details:d}=n,f=new ie(r),w=typeof n.onValidate=="function",u=new k(w),_=(p,i,c,l,h)=>!w||u.isCloning||n.onValidate(R.concat(f.getPath(p),i),c,l,h)===!0,$=(p,i,c,l)=>{!U(f,n,i)&&!(o&&f.isDetached(p,t))&&P(f.getPath(p),i,c,l)},P=(p,i,c,l,h)=>{u.isCloning&&u.isPartOfClone(p)?u.update(p,i,l):e(R.concat(p,i),c,l,h)},D=p=>p&&(p[s]??p),x=(p,i,c,l)=>{if(se(p)||c==="constructor"||a&&!k.isHandledMethod(i,c)||U(f,n,c)||f.isGetInvariant(i,c)||o&&f.isDetached(i,t))return p;l===void 0&&(l=f.getPath(i));const h=R.concat(l,c),b=f.getPath(p);return b&&te(h,b)?f.getProxy(p,b,q,s):f.getProxy(p,h,q,s)},te=(p,i)=>{if(E(p)||p.length<=i.length||m(i)&&i.length===0)return!1;const c=m(p)?p:p.split(g),l=m(i)?i:i.split(g);return c.length<=l.length?!1:!l.some((h,b)=>h!==c[b])},q={get(p,i,c){if(E(i)){if(i===s||i===L)return p;if(i===j&&!f.isUnsubscribed&&f.getPath(p).length===0)return f.unsubscribe(),p}const l=H(p)?Reflect.get(p,i):Reflect.get(p,i,c);return x(l,p,i)},set(p,i,c,l){c=D(c);const h=p[s]??p,b=h[i];if(r(b,c)&&i in p)return!0;const S=_(p,i,c,b);return S&&f.setProperty(h,i,c,l,b)?($(p,i,p[i],b),!0):!S},defineProperty(p,i,c){if(!f.isSameDescriptor(c,p,i)){const l=p[i];_(p,i,c.value,l)&&f.defineProperty(p,i,c,l)&&$(p,i,c.value,l)}return!0},deleteProperty(p,i){if(!Reflect.has(p,i))return!0;const c=Reflect.get(p,i),l=_(p,i,void 0,c);return l&&f.deleteProperty(p,i,c)?($(p,i,void 0,c),!0):!l},apply(p,i,c){const l=i[s]??i;if(f.isUnsubscribed)return Reflect.apply(p,l,c);if((d===!1||d!==!0&&!d.includes(p.name))&&k.isHandledType(l)){let h=R.initial(f.getPath(p));const b=k.isHandledMethod(l,p.name);u.start(l,h,c);let S=Reflect.apply(p,u.preferredThisArg(p,i,l),b?c.map(T=>D(T)):c);const ne=u.isChanged(l,r),B=u.stop();if(k.isHandledType(S)&&b&&(i instanceof Map&&p.name==="get"&&(h=R.concat(h,c[0])),S=f.getProxy(S,h,q)),ne){const T={name:p.name,args:c,result:S},V=u.isCloning?R.initial(h):h,Q=u.isCloning?R.last(h):"";_(R.get(t,V),Q,l,B,T)?P(V,Q,l,B,T):u.undo(l)}return(i instanceof Map||i instanceof Set)&&re(S)?pe(S,p,i,h,x):S}return Reflect.apply(p,i,c)}},M=f.getProxy(t,n.pathAsArray?[]:"",q);return e=e.bind(M),w&&(n.onValidate=n.onValidate.bind(M)),M};I.target=t=>(t==null?void 0:t[L])??t;I.unsubscribe=t=>(t==null?void 0:t[j])??t;const Re=t=>`
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
<p>выставляем ручной ip для ${t.isp.interfaces.hqRtr.name}: ${t.isp.interfaces.hqRtr.ip}/${t.isp.interfaces.hqRtr.mask}</p>
<p>аналогично настраиваем ${t.isp.interfaces.brRtr.name}: ${t.isp.interfaces.brRtr.ip}/${t.isp.interfaces.brRtr.mask}</p>
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
<p>Указываем статичный ipv4 адрес для ${t.hqRtr.interfaces.isp.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${t.hqRtr.interfaces.isp.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${t.hqRtr.interfaces.isp.ip}/${t.hqRtr.interfaces.isp.mask}' > /etc/net/ifaces/${t.hqRtr.interfaces.isp.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${t.isp.interfaces.hqRtr.ip}' > /etc/net/ifaces/${t.hqRtr.interfaces.isp.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${t.hqRtr.interfaces.isp.name}/resolv.conf></code></p>
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
<p>Указываем статичный ipv4 адрес для ${t.brRtr.interfaces.isp.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${t.brRtr.interfaces.isp.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${t.brRtr.interfaces.isp.ip}/${t.brRtr.interfaces.isp.mask}' > /etc/net/ifaces/${t.brRtr.interfaces.isp.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${t.isp.interfaces.brRtr.ip}' > /etc/net/ifaces/${t.brRtr.interfaces.isp.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${t.brRtr.interfaces.isp.name}/resolv.conf></code></p>
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
<p>ip ${t.brRtr.interfaces.brSrv.ip}/${t.brRtr.interfaces.brSrv.mask}</p>
<br>
<p>Запуск консоли BR-SRV</p>
<p><code>hostnamectl set-hostname BR-SRV.au-team.irpo</code></p>
<p>Указываем статичный ipv4 адрес для ${t.brSrv.interfaces.brRtr.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${t.brSrv.interfaces.brRtr.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${t.brSrv.interfaces.brRtr.ip}/${t.brSrv.interfaces.brRtr.mask}' > /etc/net/ifaces/${t.brSrv.interfaces.brRtr.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${t.brRtr.interfaces.brSrv.ip}' > /etc/net/ifaces/${t.brSrv.interfaces.brRtr.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${t.brSrv.interfaces.brRtr.name}/resolv.conf></code></p>
<p><code>systemctl restart network</code></p>
<br>
<p>Запуск консоли HQ-SRV</p>
<p><code>hostnamectl set-hostname HQ-SRV.au-team.irpo</code></p>
<p>Указываем статичный ipv4 адрес для ${t.hqSrv.interfaces.hqRtr.name}</p>
<p><code>sed -i 's/\bdhcp4\b/static/g; s/\bdhcp\b/static/g' /etc/net/ifaces/${t.hqSrv.interfaces.hqRtr.name}/options</code></p>
<p>Настраиваем IP-адрес</p>
<p><code>echo '${t.hqSrv.interfaces.hqRtr.ip}/${t.hqSrv.interfaces.hqRtr.mask}' > /etc/net/ifaces/${t.hqSrv.interfaces.hqRtr.name}/ipv4address</code></p>
<p>Настраиваем шлюз</p>
<p><code>echo 'default via ${t.hqSrv.interfaces.hqRtr.ip}' > /etc/net/ifaces/${t.hqSrv.interfaces.hqRtr.name}/ipv4route</code></p>
<p>Указываем DNS</p>
<p><code>echo 'nameserver 8.8.8.8' /etc/net/ifaces/${t.hqSrv.interfaces.hqRtr.name}/resolv.conf></code></p>
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
echo ‘${t.hqRtr.interfaces.hqCli.ip}/${t.hqRtr.interfaces.hqCli.mask}’ >> /etc/net/ifaces/vlan100/ipv4address
echo ‘${t.hqRtr.interfaces.hqSrv.ip}/${t.hqRtr.interfaces.hqSrv.mask}’ >> /etc/net/ifaces/vlan200/ipv4address
echo ‘${t.hqRtr.interfaces.vlan999.ip}/${t.hqRtr.interfaces.vlan999.mask}’ >> /etc/net/ifaces/vlan999/ipv4address
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
  <p>${t.hqCli.interfaces.hqRtr.ip}/${t.hqCli.interfaces.hqRtr.mask}</p>
  <p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/ipv4route</p>
  <p>Вводим строку default via ${t.hqRtr.interfaces.hqSrv.ip}</p>
  <p>Создаем файл конфигурации vim /etc/net/ifaces/ens18/resolv.conf</p>
  <p>nameserver 8.8.8.8</p>
  <p>systemctl restart network</p>
  <p>systemctl restart NetworkManager</p>
  <p>ip -br a</p>
  <p>ping ${t.hqRtr.interfaces.hqSrv.ip}</p>
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
<p>Local ip: <code>${t.brRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${t.hqRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${t.brRtr.interfaces.hqRtr.ip}/${t.brRtr.interfaces.hqRtr.mask}</code></p>
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
<p>Local ip: <code>${t.hqRtr.interfaces.isp.ip}</code></p>
<p>Remote ip: <code>${t.brRtr.interfaces.isp.ip}</code></p>
<p>IPv4: <code>manual</code></p>
<p>Addresses: <code>${t.hqRtr.interfaces.brRtr.ip}/${t.hqRtr.interfaces.brRtr.mask}</code></p>
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
<p>option domain-name-servers ${t.hqSrv.interfaces.hqRtr.ip};</p>
<p>добавить после</p>
<p>ddns-update-style interim;</p>
<p>update-static-leases on;</p>
<p>zone au-team.irpo {</p>
<p>	primary ${t.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<p>выбрать начало “y” “3” и в конце “p”</p>
<br>
<p>zone 100.168.192.in-addr.arpa {</p>
<p>	primary ${t.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<br>
<p>zone 200.168.192.in-addr.arpa {</p>
<p>	primary ${t.hqSrv.interfaces.hqRtr.ip}</p>
<p>}</p>
<br>
<p>меняем строки:</p>
<p>subnet 192.168.200.0 netmask 255.255.255.240 {</p>
<p>	range ${t.hqCli.interfaces.hqRtr.ip} 192.168.200.5;</p>
<p>	option routers ${t.hqRtr.interfaces.hqSrv.ip};</p>
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
<p>	IN	A	${t.hqSrv.interfaces.hqRtr.ip}</p>
<p>10	IN	PTR	hq-srv.au-team.irpo</p>
<p>1	IN	PTR	hq-rtr.au-team.irpo</p>
<p>сохраняем</p>
<p>cp zone/100.db zone/200.db</p>
<p>vim zone/200.db</p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	200.168.192.in-addr.apra. root.200.168.192.in-addr.apra. (...)</p>
<p>	IN	NS	200.168.192.in-addr.apra.</p>
<p>	IN	A	${t.hqSrv.interfaces.hqRtr.ip}</p>
<p>10	IN	PTR	hq-cli.au-team.irpo</p>
<p>1	IN	PTR	hq-rtr.au-team.irpo</p>
<p>сохраняем</p>
<p>vim zone/au-team.db</p>
<p>Убираем лишнее и пишем основные моменты:</p>
<p>0	IN	SOA	hq-srv.au-team.irpo. root.au-taem.irpo. (...)</p>
<p>	IN	NS	hq-srv.au-team.irpo.</p>
<p>	IN	A	${t.hqSrv.interfaces.hqRtr.ip}</p>
<p>hq-rtr	IN	A	${t.hqRtr.interfaces.hqCli.ip}</p>
<p>br-rtr	IN	A	${t.brRtr.interfaces.brSrv.ip}</p>
<p>hq-srv	IN	A	${t.hqSrv.interfaces.hqRtr.ip}</p>
<p>hq-cli	IN	A	${t.hqSrv.interfaces.hqRtr.ip}</p>
<p>br-srv	IN	A	${t.brSrv.interfaces.brRtr.ip}</p>
<p>wiki	IN	CNAME	hq-rtr.au-team.irpo.</p>
<p>moodle	IN	CNAME	hq-rtr.au-team.irpo.</p>
<p>сохраняем</p>
<p>rndc-confgen > rndc.key</p>
<p>sed -i ‘6.$d’ rndc.key</p>
<p>chgrp -R named zone/</p>
<p>named-checkconf</p>
<p>named-checkconf -z</p>
<p>vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>nameserver ${t.hqSrv.interfaces.hqRtr.ip}</p>
<p>domain au-team.irpo</p>
<p>systemctl restart network</p>
<p>systemctl aneble -- now bind</p>
<br>
<p>BR-RTR</p>
<p>vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>Скорректировать nameserver ${t.hqRtr.interfaces.hqCli.ip}</p>
<p>domain au-team.irpo</p>
<p>systemctl restart network</p>
<p>nmtui</p>
<p>перезапустить активные соединения ens</p>
<br>
<p>HQ-RTR</p>
<p>vim /etc/net/ifaces/ens18/resolv.conf</p>
<p>Скорректировать nameserver ${t.hqRtr.interfaces.hqCli.ip}</p>
<p>domain au-team.irpo</p>
<p>systemctl restart network</p>
<p>nmtui</p>
<p>перезапустить активные соединения ens</p>
<br>
<p>Задание 11</p>
<p>HQ-SRV, BR-SRV, HQ-RTR, BR-RTR, HQ-CLI</p>
<p><code>timedatectl set-timezone Europe/Moscow</code></p>
`,be=(t,{devices:e})=>{const n=document.createElement("table"),s=document.createElement("thead");s.innerHTML=`
    <tr>
      <th>Имя устройства</th>
      <th>Назначение (куда смотрит)</th>
      <th>IP-адрес</th>
      <th>Маска</th>
      <th>Шлюз по умолчанию</th>
    </tr>
  `,n.appendChild(s);const r=document.createElement("tbody");Object.values(e).forEach(({name:a,interfaces:o})=>{const d=Object.values(o);if(!d.length)return;const f=document.createElement("tr");f.innerHTML=`
      <td rowspan="${d.length}">${a}</td>
      <td>${d[0].destination||"-"}</td>
      <td>${d[0].ip}</td>
      <td>${d[0].mask}</td>
      <td>${d[0].gateway}</td>
    `,r.appendChild(f);for(let w=1;w<d.length;w+=1){const u=d[w],_=document.createElement("tr");_.innerHTML=`
        <td>${u.destination||"-"}</td>
        <td>${u.ip}</td>
        <td>${u.mask}</td>
        <td>${u.gateway}</td>
      `,r.appendChild(_)}}),n.appendChild(r),t.ipTableContainer.innerHTML="",t.ipTableContainer.appendChild(n)},we=(t,e)=>{const n=Re(e);t.textContainer.innerHTML=n,document.querySelectorAll("code").forEach(s=>{const r=document.createElement("span");r.className="code-wrapper";const a=document.createElement("div");a.className="code-copy-toast",a.textContent="Скопировано!",s.parentNode.insertBefore(r,s),r.appendChild(s),r.appendChild(a),s.style.cursor="pointer",s.title="Кликни, чтобы скопировать",s.addEventListener("click",()=>{navigator.clipboard.writeText(s.innerText).then(()=>{a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),300)})})})},Se=(t,e)=>(n,s)=>{switch(n){case"devices":be(t,e),we(t,e);break}};function ge(t){const e=new Set;return Object.values(t).forEach(n=>{Object.values(n.interfaces).forEach(s=>{s.netAddress&&!s.netAddress.startsWith("<")&&e.add(s.netAddress)})}),Array.from(e)}function ye(t,e){const n=document.createElement("form");n.id="network-form",n.innerHTML="<h3>Настройки сетей</h3>",t.forEach(r=>{const a=document.createElement("div");a.className="network-input";const o=document.createElement("label");o.textContent=`Сеть ${r}:`;const d=document.createElement("input");d.type="text",d.placeholder="Базовый адрес (напр. 192.168.0)",d.dataset.network=r;const f=document.createElement("input");f.type="text",f.placeholder="Маска (напр. 24)",f.dataset.network=r,a.append(o,d,f),n.append(a)});const s=document.createElement("button");s.type="button",s.textContent="Обновить",n.append(s),e.innerHTML="",e.append(n)}function _e(){const t=document.querySelectorAll("#network-form input"),e={};return t.forEach(n=>{const{network:s}=n.dataset;e[s]||(e[s]={}),n.placeholder.includes("Базовый")?e[s].base=n.value.trim():e[s].mask=n.value.trim()}),e}function ke(t,e){const n=JSON.parse(JSON.stringify(t));return Object.entries(e).forEach(([s,{base:r,mask:a}])=>{!r||!a||Object.values(n).forEach(o=>{Object.values(o.interfaces).forEach(d=>{if(d.netAddress===s){d.mask=a;const[f]=d.ip.split(".").slice(-1);if(d.ip=`${r}.${f}`,d.netAddress=`${r}.0`,d.gateway!=="-"){const w=d.gateway.split(".");w.splice(0,3,...r.split(".")),d.gateway=w.join(".")}}})})}),n}const G={isp:{name:"ISP",interfaces:{external:{name:"ens18",ip:"<ВНЕШНИЙ>",mask:"24",gateway:"<ВНЕШНИЙ>",destination:"Интернет",netAddress:""},hqRtr:{name:"ens19",ip:"172.16.4.1",mask:"28",gateway:"-",destination:"HQ-RTR",netAddress:"172.16.4.0"},brRtr:{name:"ens20",ip:"172.16.5.1",mask:"28",gateway:"-",destination:"BR-RTR",netAddress:"172.16.5.0"}}},hqRtr:{name:"HQ-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.4.2",mask:"28",gateway:"172.16.4.1",destination:"ISP",netAddress:"172.16.4.0"},brRtr:{name:"gre1",ip:"10.5.5.1",mask:"30",gateway:"-",destination:"BR-RTR",netAddress:"10.5.5.0"},hqCli:{name:"VLAN100",ip:"192.168.100.1",mask:"28",gateway:"-",destination:"HQ-CLI",netAddress:"192.168.100.0"},hqSrv:{name:"VLAN200",ip:"192.168.200.1",mask:"28",gateway:"-",destination:"HQ-SRV",netAddress:"192.168.200.0"},vlan999:{name:"VLAN999",ip:"192.168.99.1",mask:"29",gateway:"-",destination:"VLAN999 (?)",netAddress:"192.168.99.0"}}},hqSrv:{name:"HQ-SRV",interfaces:{hqRtr:{name:"ens18",ip:"192.168.100.2",mask:"28",gateway:"192.168.100.1",destination:"HQ-RTR",netAddress:"192.168.100.0"}}},hqCli:{name:"HQ-CLI",interfaces:{hqRtr:{name:"ens18",ip:"192.168.200.2",mask:"28",gateway:"192.168.200.1",destination:"HQ-RTR",netAddress:"192.168.200.0"}}},brRtr:{name:"BR-RTR",interfaces:{isp:{name:"ens18",ip:"172.16.5.2",mask:"28",gateway:"172.16.5.1",destination:"ISP",netAddress:"172.16.5.0"},brSrv:{name:"ens19",ip:"192.168.0.1",mask:"28",gateway:"-",destination:"BR-SRV",netAddress:"192.168.0.0"},hqRtr:{name:"gre1",ip:"10.5.5.2",mask:"30",gateway:"-",destination:"HQ-RTR",netAddress:"10.5.5.0"}}},brSrv:{name:"BR-SRV",interfaces:{brRtr:{name:"ens18",ip:"192.168.0.2",mask:"28",gateway:"192.168.0.1",destination:"BR-RTR",netAddress:"192.168.0.0"}}}},Ae=()=>{const t={ipTableContainer:document.getElementById("ip-table-container"),textContainer:document.getElementById("text-container"),networkFormContainer:document.getElementById("network-form-container")},e={devices:[]},n=I(e,Se(t,e));n.devices=G;const s=JSON.parse(JSON.stringify(G)),r=ge(s);ye(r,t.networkFormContainer),document.querySelector("#network-form button").addEventListener("click",()=>{const a=_e(),o=ke(s,a);console.log(o),n.devices=o})};Ae();
