function setCookie(e,t,s){let i="";if(s){let o=new Date;o.setTime(o.getTime()+864e5*s),i=`; expires=${o.toUTCString()}`}document.cookie=`${encodeURIComponent(e)}=${encodeURIComponent(t)}${i}; path=/; SameSite=None; Secure`}function getCookie(e){let t=`; ${document.cookie}`,s=t.split(`; ${e}=`);return 2===s.length?s.pop().split(";").shift():null}customElements.get("pop-up")||customElements.whenDefined("modal-dialog").then(()=>{class e extends Modal{constructor(){super(),this.cookie=`${this.id}-dismissed`,Shopify.designMode?(document.addEventListener("shopify:section:select",e=>{e.target===this.closest(".shopify-section")&&this.open()}),document.addEventListener("shopify:section:deselect",this.close.bind(this))):!getCookie(this.cookie)&&("true"===this.dataset.showOnMobile||theme.mediaMatches.md)&&(this.querySelector(".alert")?this.open():"delay"===this.dataset.trigger?setTimeout(()=>this.open(),1e3*Number(this.dataset.delay)):"exit"===this.dataset.trigger&&theme.mediaMatches.md&&(this.mouseLeaveHandler=this.mouseLeaveHandler||this.handleMouseLeave.bind(this),document.body.addEventListener("mouseleave",this.mouseLeaveHandler)))}disconnectedCallback(){this.mouseLeaveHandler&&document.body.removeEventListener("mouseleave",this.mouseLeaveHandler)}handleMouseLeave(e){e.clientY<0&&!getCookie(this.cookie)&&this.open()}close(){super.close(),setCookie(this.cookie,!0,this.dataset.dismissDays)}}customElements.define("pop-up",e)});
