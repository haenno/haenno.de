import{o as h,c as g,a as e,d as m,b as k,e as b,f as C,g as l,u as i,B as w,F as y,r as j,w as u,n as N,t as x,h as f,i as v}from"./index-e9e8d65f.js";function c(a,t){return h(),g("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"})])}const T="https://drfjwt.haenno.de/news_api/latest_news/",$="https://drfjwt.haenno.de/news_api/news_after_id/",M="https://drfjwt.haenno.de/news_api/fake_news/",p=new Headers;p.append("Content-Type","application/json; charset=UTF-8");p.append("Accept","application/json");const B=m("newsstore",{state:()=>({last_id:0,news_array:[]}),getters:{getLastId(){return this.last_id},getNewsArray(){return this.news_array.sort((a,t)=>t.id-a.id)}},actions:{async get_latest_news(){const a=await fetch(T,{headers:p,method:"GET"});if(console.log(a),a.ok){const t=await a.json();console.log(t);for(let s=0;s<t.length;s++)if(t[s].id>this.last_id&&(this.last_id=t[s].id),this.news_array.find(n=>n.id===t[s].id)){console.log("passing duplicate");continue}else console.log("adding new news"),this.news_array.push({id:t[s].id,text:t[s].news_text})}else{console.log("get_latest_news: did NOT work!");const t=await a.json();return{status:a.status,message:t.detail}}},async get_news_after_id(){console.log("get_news_after_id"),this.last_id===0&&this.get_latest_news();const a=$+this.last_id+"/",t=await fetch(a,{headers:p,method:"GET"});if(console.log(t),t.ok){const s=await t.json();console.log(s);for(let n=0;n<s.length;n++)if(s[n].id>this.last_id&&(this.last_id=s[n].id),this.news_array.find(d=>d.id===s[n].id)){console.log("passing duplicate");continue}else console.log("adding new news"),this.news_array.push({id:s[n].id,text:s[n].news_text})}else{console.log("get_latest_news: did NOT work!");const s=await t.json();return{status:t.status,message:s.detail}}},async create_fake_news(){const a=await fetch(M,{headers:p,method:"GET"}),t=await a.json();console.log(t),a.ok?console.log("fake news created!"):console.log("fake news NOT created!")}}}),S=e("h1",null,"This is an news page",-1),A={class:"place-content-center inline-flex w-full"},E={id:"news_box",class:"m-5 scroll-p-2 overflow-auto h-40 flex flex-col-reverse px-4 py-2 bg-gray-200 rounded-t-lg dark:bg-gray-700"},q={id:"table"},F={class:"relative overflow-x-auto shadow-md sm:rounded-lg"},G={class:"w-full text-sm text-left text-gray-500 dark:text-gray-400"},I=e("thead",{class:"text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-600 dark:text-gray-400"},[e("tr",null,[e("th",{scope:"col",class:"px-6 py-3"},"Folder"),e("th",{scope:"col",class:"px-6 py-3"},"Function"),e("th",{scope:"col",class:"px-6 py-3"},"E-Mails"),e("th",{scope:"col",class:"px-6 py-3"},"Action")])],-1),V={class:"bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"},O=e("th",{scope:"row",class:"px-6 py-4 font-medium whitespace-nowrap"},' Apple MacBook Pro 17" ',-1),P=e("td",{class:"px-6 py-4"},"Silver",-1),z=e("td",{class:"px-6 py-4"},"2",-1),D={class:"px-6 py-4"},H={class:"bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"},L=e("th",{scope:"row",class:"px-6 py-4 font-medium whitespace-nowrap"}," Microsoft Surface Pro ",-1),U=e("td",{class:"px-6 py-4"},"White",-1),W=e("td",{class:"px-6 py-4"},"21",-1),J={class:"px-6 py-4"},K={class:"bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"},Q=e("th",{scope:"row",class:"px-6 py-4 font-medium whitespace-nowrap"},"Magic Mouse 2",-1),R=e("td",{class:"px-6 py-4"},"Black",-1),X=e("td",{class:"px-6 py-4"},"23",-1),Y={class:"px-6 py-4"},Z={class:"bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"},ee=e("th",{scope:"row",class:"px-6 py-4 font-medium whitespace-nowrap"},"Apple Watch",-1),te=e("td",{class:"px-6 py-4"},"Silver",-1),se=e("td",{class:"px-6 py-4"},"44",-1),oe={class:"px-6 py-4"},ae={class:"bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"},ne=e("th",{scope:"row",class:"px-6 py-4 font-medium whitespace-nowrap"},"iPad",-1),re=e("td",{class:"px-6 py-4"},"Gold",-1),ie=e("td",{class:"px-6 py-4"},"19",-1),le={class:"px-6 py-4"},de={class:"bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"},ce=e("th",{scope:"row",class:"px-6 py-4 font-medium whitespace-nowrap"},'Apple iMac 27"',-1),pe=e("td",{class:"px-6 py-4"},"Silver",-1),_e=e("td",{class:"px-6 py-4"},"34",-1),he={class:"px-6 py-4"},ge={id:"toast-area"},ye=k({__name:"NewsView",setup(a){const t=B();let s=0;b(()=>{console.log("news updated"),s!=t.last_id&&(s=t.last_id,n(`news-index-${t.last_id}`))}),setInterval(()=>{t.get_news_after_id()},2e3),C(()=>{t.get_latest_news(),n(`news-index-${t.last_id}`)});function n(_){const o=document.getElementsByClassName(_)[0];o?o.scrollIntoView({behavior:"smooth"}):console.log("element not found")}function d(_){console.log("action button: "+_)}return(_,o)=>(h(),g(y,null,[S,e("div",A,[l(w,{button:{text:"Get news"},class:"w-48",onClick:o[0]||(o[0]=r=>i(t).get_latest_news())}),l(w,{button:{text:"Create more news"},class:"w-48",onClick:o[1]||(o[1]=r=>i(t).create_fake_news())})]),e("div",E,[(h(!0),g(y,null,j(i(t).getNewsArray,r=>(h(),g("div",{key:r.id,class:N(`news-index-${r.id}`)},x(r.id)+": "+x(r.text),3))),128))]),e("div",q,[e("div",F,[e("table",G,[I,e("tbody",null,[e("tr",V,[O,P,z,e("td",D,[l(i(c),{class:"w-5 h-5 hover:cursor-pointer hover:animate-spin",onClick:o[2]||(o[2]=r=>d("foo bar wiz"))})])]),e("tr",H,[L,U,W,e("td",J,[l(i(c),{class:"w-5 h-5 hover:cursor-pointer hover:animate-spin",onClick:o[3]||(o[3]=r=>d("12qq1q1q1q"))})])]),e("tr",K,[Q,R,X,e("td",Y,[l(i(c),{class:"w-5 h-5 hover:cursor-pointer hover:animate-spin",onClick:o[4]||(o[4]=r=>d("2124"))})])]),e("tr",Z,[ee,te,se,e("td",oe,[l(i(c),{class:"w-5 h-5 hover:cursor-pointer hover:animate-spin",onClick:o[5]||(o[5]=r=>d("yxcv"))})])]),e("tr",ae,[ne,re,ie,e("td",le,[l(i(c),{class:"w-5 h-5 hover:cursor-pointer hover:animate-spin",onClick:o[6]||(o[6]=r=>d("asdf"))})])]),e("tr",de,[ce,pe,_e,e("td",he,[l(i(c),{class:"w-5 h-5 hover:cursor-pointer hover:animate-spin",onClick:o[7]||(o[7]=r=>d("qwer"))})])])])])])]),e("div",ge,[l(i(v),{type:"warning",closable:"",divide:""},{default:u(()=>[f(" Improve password difficulty. ")]),_:1}),l(i(v),{type:"success",alignment:"end",closable:"",divide:""},{default:u(()=>[f(" Item moved successfully. ")]),_:1})])],64))}});export{ye as default};
