if(!customElements.get("price-range")){class t extends HTMLElement{constructor(){super(),this.selectors={inputMin:".cc-price-range__input--min",inputMax:".cc-price-range__input--max",control:".cc-price-range__control",controlMin:".cc-price-range__control--min",controlMax:".cc-price-range__control--max",bar:".cc-price-range__bar",activeBar:".cc-price-range__bar-active"},this.controls={min:{barControl:this.querySelector(this.selectors.controlMin),input:this.querySelector(this.selectors.inputMin)},max:{barControl:this.querySelector(this.selectors.controlMax),input:this.querySelector(this.selectors.inputMax)}},this.controls.min.value=parseInt(""===this.controls.min.input.value?this.controls.min.input.placeholder:this.controls.min.input.value,10),this.controls.max.value=parseInt(""===this.controls.max.input.value?this.controls.max.input.placeholder:this.controls.max.input.value,10),this.valueMin=this.controls.min.input.min,this.valueMax=this.controls.min.input.max,this.valueRange=this.valueMax-this.valueMin,[this.controls.min,this.controls.max].forEach(t=>{t.barControl.setAttribute("aria-valuemin",this.valueMin),t.barControl.setAttribute("aria-valuemax",this.valueMax),t.barControl.setAttribute("tabindex",0)}),this.controls.min.barControl.setAttribute("role","slider"),this.controls.min.barControl.setAttribute("aria-valuenow",this.controls.min.value),this.controls.max.barControl.setAttribute("role","slider"),this.controls.max.barControl.setAttribute("aria-valuenow",this.controls.max.value),this.bar=this.querySelector(this.selectors.bar),this.activeBar=this.querySelector(this.selectors.activeBar),this.inDrag=!1,this.rtl=document.querySelector("html[dir=rtl]"),this.bindEvents(),this.render()}getPxToValueRatio(){let t=this.bar.clientWidth/(this.valueMax-this.valueMin);return this.rtl?-t:t}getPcToValueRatio(){return 100/(this.valueMax-this.valueMin)}setActiveControlValue(t){let e=t;Number.isNaN(parseInt(e,10))||(this.activeControl===this.controls.min?(""===e&&(e=this.valueMin),e=Math.min(e,this.controls.max.value-1),e=Math.max(this.valueMin,e)):(""===e&&(e=this.valueMax),e=Math.max(e,this.controls.min.value+1),e=Math.min(this.valueMax,e)),this.activeControl.value=Math.round(e),this.activeControl.input.value!==this.activeControl.value&&(this.activeControl.value===this.activeControl.input.placeholder?this.activeControl.input.value="":this.activeControl.input.value=this.activeControl.value,this.activeControl.input.dispatchEvent(new CustomEvent("change",{bubbles:!0,cancelable:!1,detail:{sender:"theme:component:price_range"}}))),this.activeControl.barControl.setAttribute("aria-valuenow",this.activeControl.value))}render(){this.drawControl(this.controls.min),this.drawControl(this.controls.max),this.drawActiveBar()}drawControl(t){let e=`${(t.value-this.valueMin)*this.getPcToValueRatio()}%`;this.rtl?t.barControl.style.right=e:t.barControl.style.left=e}drawActiveBar(){let t=`${(this.controls.min.value-this.valueMin)*this.getPcToValueRatio()}%`,e=`${(this.valueMax-this.controls.max.value)*this.getPcToValueRatio()}%`;this.rtl?(this.activeBar.style.left=e,this.activeBar.style.right=t):(this.activeBar.style.left=t,this.activeBar.style.right=e)}handleControlTouchStart(t){t.preventDefault(),this.startDrag(t.target,t.touches[0].clientX),this.boundControlTouchMoveEvent=this.handleControlTouchMove.bind(this),this.boundControlTouchEndEvent=this.handleControlTouchEnd.bind(this),window.addEventListener("touchmove",this.boundControlTouchMoveEvent,{passive:!0}),window.addEventListener("touchend",this.boundControlTouchEndEvent)}handleControlTouchMove(t){this.moveDrag(t.touches[0].clientX)}handleControlTouchEnd(t){t.preventDefault(),window.removeEventListener("touchmove",this.boundControlTouchMoveEvent),window.removeEventListener("touchend",this.boundControlTouchEndEvent),this.stopDrag()}handleControlMouseDown(t){t.preventDefault(),this.startDrag(t.target,t.clientX),this.boundControlMouseMoveEvent=this.handleControlMouseMove.bind(this),this.boundControlMouseUpEvent=this.handleControlMouseUp.bind(this),window.addEventListener("mousemove",this.boundControlMouseMoveEvent),window.addEventListener("mouseup",this.boundControlMouseUpEvent)}handleControlMouseMove(t){this.moveDrag(t.clientX)}handleControlMouseUp(t){t.preventDefault(),window.removeEventListener("mousemove",this.boundControlMouseMoveEvent),window.removeEventListener("mouseup",this.boundControlMouseUpEvent),this.stopDrag()}startDrag(t,e){this.controls.min.barControl===t?this.activeControl=this.controls.min:this.activeControl=this.controls.max,this.dragStartX=e,this.dragStartValue=this.activeControl.value,this.inDrag=!0}moveDrag(t){if(this.inDrag){let e=this.dragStartValue+(t-this.dragStartX)/this.getPxToValueRatio();this.setActiveControlValue(e),this.render()}}stopDrag(){this.inDrag=!1}handleControlKeyDown(t){"ArrowRight"===t.key?(this.adjustControlFromKeypress(t.target,10),t.preventDefault()):"ArrowLeft"===t.key?(this.adjustControlFromKeypress(t.target,-10),t.preventDefault()):"Home"===t.key?(this.adjustControlFromKeypress(t.target,!1,"min"),t.preventDefault()):"End"===t.key&&(this.adjustControlFromKeypress(t.target,!1,"max"),t.preventDefault())}adjustControlFromKeypress(t,e,o){this.controls.min.barControl===t?this.activeControl=this.controls.min:this.activeControl=this.controls.max,o?"min"===o?this.setActiveControlValue(this.activeControl.input.min):this.setActiveControlValue(this.activeControl.input.max):this.setActiveControlValue(this.activeControl.value+e/this.getPxToValueRatio()),this.render()}handleInputChange(t){t.target.value=t.target.value.replace(/\D/g,""),t.detail&&"theme:component:price_range"===t.detail.sender||(this.controls.min.input===t.target?this.activeControl=this.controls.min:this.activeControl=this.controls.max,this.setActiveControlValue(t.target.value),this.render())}static handleInputKeyup(t){setTimeout(()=>{t.target.value=t.target.value.replace(/\D/g,"")},10)}bindEvents(){[this.controls.min,this.controls.max].forEach(e=>{e.barControl.addEventListener("touchstart",this.handleControlTouchStart.bind(this),{passive:!1}),e.barControl.addEventListener("mousedown",this.handleControlMouseDown.bind(this)),e.barControl.addEventListener("keydown",this.handleControlKeyDown.bind(this)),e.input.addEventListener("change",this.handleInputChange.bind(this)),e.input.addEventListener("keyup",t.handleInputKeyup)})}}customElements.define("price-range",t)}
