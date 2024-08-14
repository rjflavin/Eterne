const MainSearch=class extends HTMLElement{constructor(){super(),this.querySelectorAll(".main-search__close").forEach(e=>{e.addEventListener("click",e=>{e.preventDefault(),document.body.classList.remove("show-search"),document.body.style.paddingRight="0"})}),this.querySelector(".main-search__input").addEventListener("keyup",e=>{"Escape"===e.key&&this.querySelector(".main-search__close").dispatchEvent(new Event("click"))}),"true"===this.dataset.quickSearch&&this.initQuickSearch()}initQuickSearch(){let e=this.querySelector(".main-search__input"),s="true"===this.dataset.quickSearchMeta,t=-1,a=null,r=()=>{let r=this.querySelector(".main-search__results"),l=e.value;if(l.length&&l!==this.oldSearchValue){this.oldSearchValue=l,null!==a&&(a.abort(),a=null),clearTimeout(t);let i=e.closest("form"),n=new URL(i.action),c=new URLSearchParams(new FormData(i));c.forEach((e,s)=>{n.searchParams.set(s,e)}),this.classList.remove("main-search--has-results","main-search--results-on-multiple-lines","main-search--no-results"),this.classList.add("main-search--loading"),this.querySelector(".main-search__results-spinner")||(r.innerHTML='<div class="main-search__results-spinner"><div class="loading-spinner"></div></div>'),t=setTimeout(()=>{a=new AbortController;let e;theme.Shopify.features.predictiveSearch?((e=new URL(theme.routes.base+theme.routes.predictiveSearch)).searchParams.set("q",l),e.searchParams.set("section_id","predictive-search"),e.searchParams.set("resources[limit]",8),e.searchParams.set("resources[options][fields]",s?"title,product_type,variants.title,vendor,tag,variants.sku":"title,product_type,variants.title,vendor")):(e=new URL(n)).searchParams.set("section_id","main-search"),fetch(e,{method:"get",signal:a.signal}).then(e=>{if(!e.ok)throw Error(`HTTP error! Status: ${e.status}`);return e.text()}).then(e=>{let s=document.createElement("template");s.innerHTML=e;let t=null;t=theme.Shopify.features.predictiveSearch?s.content.querySelector(".product-grid"):s.content.querySelector(".section-search-template .product-grid"),a=null,this.classList.remove("main-search--has-results","main-search--results-on-multiple-lines","main-search--no-results"),r.innerHTML="";let l=document.createElement("div");l.className="main-search__results__products collection-listing",l.innerHTML="<div></div>";let i=document.createElement("div");i.className="main-search__results__pages",l.firstElementChild.className=t.className,t.querySelectorAll(".product-block:not(.collection-block):not(.page-block)").forEach((e,s)=>{s<=8&&(e.classList.add("main-search-result"),e.querySelectorAll(".btn.quickbuy-toggle").forEach(e=>e.remove()),e.querySelectorAll(".quickbuy-toggle").forEach(e=>e.classList.remove("quickbuy-toggle")),l.firstElementChild.appendChild(e))}),t.querySelectorAll(".product-block.page-block").forEach(e=>{let s=document.createElement("a");s.className="main-search-result main-search-result--page",s.href=e.querySelector("a").href,s.innerHTML='<div class="main-search-result__text"></div>',s.firstElementChild.innerText=e.querySelector(".page-block__title").innerText,i.appendChild(s)}),this.classList.remove("main-search--loading");let c=!!l.querySelector(".main-search-result"),h=!!i.querySelector(".main-search-result");if(c||h){if(this.classList.add("main-search--has-results"),this.classList.toggle("main-search--results-on-multiple-lines",l.querySelectorAll(".product-block").length>4),c&&r.appendChild(l),h){let o=document.createElement("h6");o.className="main-search-result__heading",o.innerHTML=theme.strings.generalSearchPages,i.insertAdjacentElement("afterbegin",o),r.appendChild(i)}let u=document.createElement("a");u.className="main-search__results-all-link btn btn--secondary",u.href=n,u.innerHTML=theme.strings.generalSearchViewAll,r.appendChild(u)}else{this.classList.add("main-search--no-results");let d=document.createElement("div");d.className="main-search__empty-message",d.innerHTML=theme.strings.generalSearchNoResultsWithoutTerms,r.appendChild(d)}})},500)}else l.length||(this.oldSearchValue=l,null!==a&&(a.abort(),a=null),clearTimeout(t),this.classList.remove("main-search--has-results","main-search--results-on-multiple-lines","main-search--loading"),r.innerHTML="")};e.addEventListener("keyup",r.bind(this)),e.addEventListener("change",r.bind(this))}};window.customElements.define("main-search",MainSearch);
