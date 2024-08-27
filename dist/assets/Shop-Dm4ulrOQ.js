import{j as e,r as x,P as j,c as l,F as u,f as C,C as f,L as m,a as h,b as k,d as I,e as S,g as W,h as g,u as q,i as F,k as L}from"./index-yy4pZdLe.js";function b(){return e.jsxs("div",{className:" flex h-full items-center p-3 ",children:[e.jsx("img",{className:" h-full aspect-square object-contain ",src:"/logo.png",alt:"Logo de Fruteria"}),e.jsx("h1",{className:" hidden sm:block text-2xl font-bold text-[--c1-txt] ",children:"Fruteria"})]})}function N({classWrapp:s=""}){const{filterBySearch:t}=x.useContext(j);return e.jsxs("div",{className:l(" flex items-center my-auto bg-[--c2] p-2 rounded-md border ",s),children:[e.jsx("input",{className:" bg-transparent flex-1 ",type:"text",placeholder:" Buscar.. ",onChange:a=>t(a.target.value)}),e.jsx(u,{icon:C})]})}function P(){const{products:s,combos:t}=x.useContext(f),a=(s==null?void 0:s.length)+(t==null?void 0:t.length);return e.jsx("header",{className:" sticky top-0 z-10 lg:hidden w-full h-20 bg-[--c1]",children:e.jsxs("div",{className:"flex justify-between w-full h-full px-5 py-3 gap-3 items-center shadow-sm ",children:[e.jsx(b,{}),e.jsx(N,{classWrapp:" flex-1 max-w-96 "}),e.jsxs("button",{className:" relative flex items-center justify-center w-10 aspect-square bg-[--c2] text-[--c2-txt2] rounded-full ",type:"button",children:[e.jsx("div",{className:" absolute -left-0 -top-1 flex justify-center items-center w-4 aspect-square  bg-red-500 text-white text-[10px]  rounded-full ",children:a||0}),e.jsx(m,{to:"/cart",className:" flex justify-center items-center w-full h-full ",children:e.jsx(u,{icon:h})})]})]})})}function v({classWrapp:s="",classOption:t="",classIcon:a="",classText:n=""}){return e.jsxs("div",{className:l(" flex gap-2 my-auto ",s),children:[e.jsx(d,{classWrapp:l("",t),classIcon:l("",a),classText:l("",n),to:"/",name:"Todos",icon:k}),e.jsx(d,{classWrapp:l("",t),classIcon:l("",a),classText:l("",n),to:"/frutas",name:"Frutas",icon:I}),e.jsx(d,{classWrapp:l("",t),classIcon:l("",a),classText:l("",n),to:"/verduras",name:"Verduras",icon:S}),e.jsx(d,{classWrapp:l("",t),classIcon:l("",a),classText:l("",n),to:"/combos",name:"Combos",icon:W}),e.jsx(d,{classWrapp:l("",t),classIcon:l("",a),classText:l("",n),to:"/ofertas",name:"Ofertas",icon:g})]})}function d({children:s,to:t,name:a,icon:n,color:r,classWrapp:o="",classIcon:c="",classText:w=""}){const{pathname:y}=q(),p=y==t;return e.jsxs(m,{to:t||"#",className:l(" relative flex items-center gap-1 transition text-[--c2-txt] group ","flex-col lg:flex-row",o,{" text-[--c2-txt2] ":p}),style:{color:r},children:[e.jsx(u,{className:l(" opacity-70 transition-all group-hover:opacity-100 ",c,{" opacity-100 ":p}),icon:n}),e.jsx("span",{className:l("  ",w),children:a}),s||null]})}function _(){const{products:s,combos:t}=x.useContext(f),a=(s==null?void 0:s.length)+(t==null?void 0:t.length);return e.jsx("header",{className:" hidden lg:flex sticky top-0 z-10 h-24 px-[--p] bg-[--c2] shadow-sm  ",children:e.jsxs("div",{className:" container h-full justify-between ",children:[e.jsx(b,{}),e.jsx(v,{classWrapp:" gap-5 "}),e.jsx(N,{}),e.jsxs("button",{className:" relative flex items-center justify-center w-10 aspect-square bg-[--c2] text-[--c2-txt2] rounded-full ",type:"button",children:[e.jsx("div",{className:" absolute -left-0 -top-1 flex justify-center items-center w-4 aspect-square  bg-red-500 text-white text-[10px]  rounded-full ",children:a||0}),e.jsx(m,{to:"/cart",className:" flex justify-center items-center w-full h-full ",children:e.jsx(u,{icon:h})})]})]})})}function A(){return e.jsx("div",{style:{boxShadow:"0px -5px 5px 0px rgba(0,0,0,.05)"},className:" lg:hidden sticky bottom-0 flex w-full py-2 justify-center bg-[--c2] ",children:e.jsx(v,{classWrapp:" gap-5 justify-evenly w-full ",classIcon:" text-xl ",classText:" text-xs "})})}function T({category:s="all",filterCombos:t=!1,filterOffers:a=!1}){const{products:n,selectCategory:r}=x.useContext(j),{combos:o}=x.useContext(F);return x.useEffect(()=>{r(s)},[s,r]),e.jsxs(L,{children:[e.jsx(P,{}),e.jsx(_,{}),e.jsxs("div",{className:" flex flex-col gap-5 p-10 min-h-[100dvh] ",children:[e.jsxs("div",{className:" container grid gap-5 md:gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ",children:[s=="all"&&!a&&(o==null?void 0:o.map(c=>e.jsx(B,{combo:c},c.id))),s=="all"&&!a&&o===null&&e.jsxs(e.Fragment,{children:[e.jsx(i,{}),e.jsx(i,{}),e.jsx(i,{}),e.jsx(i,{})]})]}),e.jsxs("div",{className:" container grid gap-5 md:gap-10 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ",children:[!t&&(n==null?void 0:n.map(c=>a&&!c.offer?null:e.jsx(E,{product:c},c.id))),!t&&n===null&&e.jsxs(e.Fragment,{children:[e.jsx(i,{}),e.jsx(i,{}),e.jsx(i,{}),e.jsx(i,{})]})]})]}),e.jsx(A,{})]})}function B({combo:s}){var n;const{addCombo:t}=x.useContext(f);if(!((n=s==null?void 0:s.combo_products)!=null&&n.length)>0)return null;let a=s.combo_products.map(r=>r.product);return e.jsxs("button",{onClick:()=>t(s),className:" relative overflow-hidden flex flex-col justify-center items-center border rounded-3xl p-5 transition duration-300 ease-in-out transform hover:scale-105 group ",children:[e.jsx("span",{className:" absolute top-2 -left-6 -rotate-45 w-24 text-center bg-[--c4] text-[--c4-txt] text-[10px] px-2 py-1 rounded",children:"Combo"}),e.jsx("div",{className:"flex-1 grid grid-cols-[repeat(auto-fit,minmax(65px,1fr))] w-full min-h-36 gap-2 bg-[--c1] rounded-2xl p-5 ",children:a.map(r=>e.jsxs("div",{children:[e.jsx("img",{className:" object-contain aspect-square md:grayscale-[.8] transition group-hover:grayscale-0  ",src:r.image_url,alt:"Imagen de "+r.name},r.id),e.jsx("span",{className:" block text-[11px] leading-[11px] text-center text-black/80 ",children:r.name})]},r.id))}),e.jsxs("div",{className:" gap-2 w-full text-sm ",children:[e.jsx("h2",{className:" text-center text-black/50 ",children:s.name}),e.jsx("p",{className:" text-center  ",children:s.description}),e.jsxs("p",{className:" text-center  ",children:["$",s.price]})]})]},s.id)}function E({product:s}){const{addProduct:t}=x.useContext(f),a=s.offer;return e.jsxs("button",{onClick:()=>t(s),className:" relative overflow-hidden flex flex-col justify-center items-center border rounded-3xl p-5 transition duration-300 ease-in-out transform hover:scale-105 group ",children:[!!a&&e.jsxs("span",{className:" absolute top-2 -left-6 -rotate-45 w-24 text-center bg-red-400 text-white text-[10px] px-2 py-1 rounded ",children:[e.jsx(u,{icon:g})," Oferta"]}),e.jsx("div",{className:"flex-1 aspect-square bg-[--c1] rounded-2xl p-5 ",children:e.jsx("img",{className:" w-full h-full object-contain md:grayscale-[.8] transition group-hover:grayscale-0  ",src:s.image_url,alt:"Imagen de "+s.name})}),e.jsxs("div",{className:" gap-2 w-full text-sm ",children:[e.jsxs("h2",{className:" text-center text-black/50 ",children:[s.name," / ",s.category]}),e.jsxs("p",{className:" text-center  ",children:["$",s.price,"/",s.sale_type]})]})]},s.id)}function i(){return e.jsxs("div",{className:" flex flex-col bg-black/10 rounded-3xl p-5 animate-pulse gap-1",children:[e.jsx("div",{className:" block w-full aspect-square rounded-2xl border bg-black/5 "}),e.jsx("div",{className:"flex flex-col items-center ",children:e.jsxs("div",{className:"w-full flex flex-col gap-2 items-center",children:[e.jsx("span",{className:" h-4 w-full max-w-48 bg-black/5 rounded-full"}),e.jsx("span",{className:"h-4 w-full max-w-20 bg-black/5 rounded-full"}),e.jsx("span",{className:"h-4 w-full max-w-28 bg-black/5 rounded-full"})]})})]})}export{T as default};
