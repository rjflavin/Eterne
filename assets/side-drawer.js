const trapFocusHandlers={};function removeTrapFocus(e=null){document.removeEventListener("focusin",trapFocusHandlers.focusin),document.removeEventListener("focusout",trapFocusHandlers.focusout),document.removeEventListener("keydown",trapFocusHandlers.keydown),e&&e.focus()}function trapFocus(e,t=e){let s=Array.from(e.querySelectorAll('summary, a[href], area[href], button:not([disabled]), input:not([type=hidden]):not([disabled]), select:not([disabled]), textarea:not([disabled]), object, iframe, audio[controls], video[controls], [tabindex]:not([tabindex^="-"])')),r=s[0],o=s[s.length-1];removeTrapFocus(),trapFocusHandlers.focusin=t=>{(t.target===e||t.target===o||t.target===r)&&document.addEventListener("keydown",trapFocusHandlers.keydown)},trapFocusHandlers.focusout=()=>{document.removeEventListener("keydown",trapFocusHandlers.keydown)},trapFocusHandlers.keydown=t=>{"Tab"===t.code&&(t.target!==o||t.shiftKey||(t.preventDefault(),r.focus()),(t.target===e||t.target===r)&&t.shiftKey&&(t.preventDefault(),o.focus()))},document.addEventListener("focusout",trapFocusHandlers.focusout),document.addEventListener("focusin",trapFocusHandlers.focusin),(t||e).focus()}class SideDrawer extends HTMLElement{constructor(){super(),this.overlay=document.querySelector(".js-overlay")}handleClick(e){(e.target.matches(".js-close-drawer")||e.target===this.overlay)&&this.close()}open(e,t,s){this.dispatchEvent(new CustomEvent(`on:${this.dataset.name}:before-open`,{bubbles:!0})),this.scrollY=window.scrollY,document.body.classList.add("fixed"),document.body.style.top=`-${this.scrollY}px`,document.documentElement.style.height="100vh",this.overlay.classList.add("is-visible"),this.setAttribute("open",""),this.setAttribute("aria-hidden","false"),this.opener=e,trapFocus(this,t),this.clickHandler=this.clickHandler||this.handleClick.bind(this),this.keyupHandler=e=>{"Escape"!==e.key||e.target.closest(".cart-drawer-popup")||this.close()},this.addEventListener("click",this.clickHandler),this.addEventListener("keyup",this.keyupHandler),this.overlay.addEventListener("click",this.clickHandler);let r=parseFloat(getComputedStyle(this).getPropertyValue("--longest-transition-in-ms"));setTimeout(()=>{s&&s(),this.dispatchEvent(new CustomEvent(`on:${this.dataset.name}:after-open`,{bubbles:!0}))},r)}close(e){this.dispatchEvent(new CustomEvent(`on:${this.dataset.name}:before-close`,{bubbles:!0})),this.removeAttribute("open"),this.setAttribute("aria-hidden","true"),this.overlay.classList.remove("is-visible"),removeTrapFocus(this.opener),document.documentElement.style.height="",document.body.style.top="",document.body.classList.remove("fixed"),window.scrollTo(0,this.scrollY),this.removeEventListener("click",this.clickHandler),this.removeEventListener("keyup",this.keyupHandler),this.overlay.removeEventListener("click",this.clickHandler);let t=parseFloat(getComputedStyle(this).getPropertyValue("--longest-transition-in-ms"));setTimeout(()=>{e&&e(),this.dispatchEvent(new CustomEvent(`on:${this.dataset.name}:after-close`,{bubbles:!0}))},t)}}customElements.define("side-drawer",SideDrawer);
