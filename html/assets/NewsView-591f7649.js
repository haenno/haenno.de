import{o as _,c as g,a as e,d as u,b as f,e as x,f as m,g as d,u as l,B as h,F as w,r as k,n as v,t as y}from"./index-ac2ab298.js";function c(a,t){return _(),g("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"})])}const b="https://drfjwt.haenno.de/news_api/latest_news/",$="https://drfjwt.haenno.de/news_api/news_after_id/",C="https://drfjwt.haenno.de/news_api/fake_news/",p=new Headers;p.append("Content-Type","application/json; charset=UTF-8");p.append("Accept","application/json");const T=u("newsstore",{state:()=>({last_id:0,news_array:[]}),getters:{getLastId(){return this.last_id},getNewsArray(){return this.news_array.sort((a,t)=>t.id-a.id)}},actions:{async get_latest_news(){const a=await fetch(b,{headers:p,method:"GET"});if(console.log(a),a.ok){const t=await a.json();console.log(t);for(let s=0;s<t.length;s++)if(t[s].id>this.last_id&&(this.last_id=t[s].id),this.news_array.find(n=>n.id===t[s].id)){console.log("passing duplicate");continue}else console.log("adding new news"),this.news_array.push({id:t[s].id,text:t[s].news_text})}else{console.log("get_latest_news: did NOT work!");const t=await a.json();return{status:a.status,message:t.detail}}},async get_news_after_id(){console.log("get_news_after_id"),this.last_id===0&&this.get_latest_news();const a=$+this.last_id+"/",t=await fetch(a,{headers:p,method:"GET"});if(console.log(t),t.ok){const s=await t.json();console.log(s);for(let n=0;n<s.length;n++)if(s[n].id>this.last_id&&(this.last_id=s[n].id),this.news_array.find(i=>i.id===s[n].id)){console.log("passing duplicate");continue}else console.log("adding new news"),this.news_array.push({id:s[n].id,text:s[n].news_text})}else{console.log("get_latest_news: did NOT work!");const s=await t.json();return{status:t.status,message:s.detail}}},async create_fake_news(){const a=await fetch(C,{headers:p,method:"GET"}),t=await a.json();console.log(t),a.ok?console.log("fake news created!"):console.log("fake news NOT created!")}}}),j=e("h1",null,"This is an news page",-1),N={class:"place-content-center inline-flex w-full"},M={id:"news_box",class:"m-5 scroll-p-2 overflow-auto h-40 flex flex-col-reverse px-4 py-2 bg-gray-200 rounded-t-lg dark:bg-gray-700"},S={id:"table"},B={class:"relative overflow-x-auto shadow-md sm:rounded-lg"},E={class:"w-full text-sm text-left text-gray-500 dark:text-gray-400"},A=e("thead",{class:"text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-600 dark:text-gray-400"},[e("tr",null,[e("th",{scope:"col",class:"px-6 py-3"},"Folder"),e("th",{scope:"col",class:"px-6 py-3"},"Function"),e("th",{scope:"col",class:"px-6 py-3"},"E-Mails"),e("th",{scope:"col",class:"px-6 py-3"},"Action")])],-1),F={class:"bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"},G=e("th",{scope:"row",class:"px-6 py-4 font-medium whitespace-nowrap"}," Microsoft Surface Pro ",-1),I=e("td",{class:"px-6 py-4"},"White",-1),V=e("td",{class:"px-6 py-4"},"21",-1),O={class:"px-6 py-4"},D={class:"bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"},H=e("th",{scope:"row",class:"px-6 py-4 font-medium whitespace-nowrap"},"Magic Mouse 2",-1),L=e("td",{class:"px-6 py-4"},"Black",-1),P=e("td",{class:"px-6 py-4"},"23",-1),U={class:"px-6 py-4"},W={class:"bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"},z=e("th",{scope:"row",class:"px-6 py-4 font-medium whitespace-nowrap"},"Apple Watch",-1),J=e("td",{class:"px-6 py-4"},"Silver",-1),q=e("td",{class:"px-6 py-4"},"44",-1),K={class:"px-6 py-4"},Q={class:"bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"},R=e("th",{scope:"row",class:"px-6 py-4 font-medium whitespace-nowrap"},"iPad",-1),X=e("td",{class:"px-6 py-4"},"Gold",-1),Y=e("td",{class:"px-6 py-4"},"19",-1),Z={class:"px-6 py-4"},ee={class:"bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"},te=e("th",{scope:"row",class:"px-6 py-4 font-medium whitespace-nowrap"},'Apple iMac 27"',-1),se=e("td",{class:"px-6 py-4"},"Silver",-1),oe=e("td",{class:"px-6 py-4"},"34",-1),ae={class:"px-6 py-4"},re=f({__name:"NewsView",setup(a){const t=T();let s=0;x(()=>{console.log("news updated"),s!=t.last_id&&(s=t.last_id,n(`news-index-${t.last_id}`))}),setInterval(()=>{t.get_news_after_id()},2e3),m(()=>{t.get_latest_news(),n(`news-index-${t.last_id}`)});function n(i){const o=document.getElementsByClassName(i)[0];o?o.scrollIntoView({behavior:"smooth"}):console.log("element not found")}return(i,o)=>(_(),g(w,null,[j,e("div",N,[d(h,{button:{text:"Get news"},class:"w-48",onClick:o[0]||(o[0]=r=>l(t).get_latest_news())}),d(h,{button:{text:"Create more news"},class:"w-48",onClick:o[1]||(o[1]=r=>l(t).create_fake_news())})]),e("div",M,[(_(!0),g(w,null,k(l(t).getNewsArray,r=>(_(),g("div",{key:r.id,class:v(`news-index-${r.id}`)},y(r.id)+": "+y(r.text),3))),128))]),e("div",S,[e("div",B,[e("table",E,[A,e("tbody",null,[e("tr",F,[G,I,V,e("td",O,[d(l(c),{class:"w-5 h-5 hover:cursor-pointer hover:animate-spin",onClick:o[2]||(o[2]=r=>i.$toast.open({message:"Thats the default type!",type:"default"}))})])]),e("tr",D,[H,L,P,e("td",U,[d(l(c),{class:"w-5 h-5 hover:cursor-pointer hover:animate-spin",onClick:o[3]||(o[3]=r=>i.$toast.open({message:"It works!",type:"success"}))})])]),e("tr",W,[z,J,q,e("td",K,[d(l(c),{class:"w-5 h-5 hover:cursor-pointer hover:animate-spin",onClick:o[4]||(o[4]=r=>i.$toast.open({message:"Just a info!",type:"info"}))})])]),e("tr",Q,[R,X,Y,e("td",Z,[d(l(c),{class:"w-5 h-5 hover:cursor-pointer hover:animate-spin",onClick:o[5]||(o[5]=r=>i.$toast.open({message:"This is a warning!",type:"warning"}))})])]),e("tr",ee,[te,se,oe,e("td",ae,[d(l(c),{class:"w-5 h-5 hover:cursor-pointer hover:animate-spin",onClick:o[6]||(o[6]=r=>i.$toast.open({message:"Something went wrong!",type:"error"}))})])])])])])])],64))}});export{re as default};
