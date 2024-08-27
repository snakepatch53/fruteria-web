import{M as k,N as y,O as w,Q as q,j as e,z as E,A as D,c as O,D as o,L as S,R as P,E as F,G as I}from"./index-BKrANuFk.js";import{u as M,C as A,a as R,b as m,c as U}from"./useCrudPanel-C2Wkcd-E.js";function T(){var x;const{entityName:s,pluralEntityName:n,head:i,table:l,form:c,confirm:a,progress:p,datalist:r,$form:b,handleModeNew:j,handleModeEdit:f,handleModeDelete:g,hanleCancel:u,handleSubmit:h,handleDelete:N,handleSearch:v}=M({entityName:"Combo",pluralEntityName:"Combos",searchFields:["name","price"],crudGet:k,crudStorage:y,crudUpdate:w,crudDestroy:q});return e.jsxs("div",{className:"p-4 space-y-4 w-full ",children:[e.jsx(A,{title:n,icon:E,isOpen:i,onClickNew:j,handleSearch:v}),l&&e.jsxs("div",{className:"grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",children:[(x=r==null?void 0:r.sort((t,C)=>C.active-t.active))==null?void 0:x.map(t=>e.jsx(B,{row:t,onEdit:()=>f(t),onDelete:()=>g(t)},t.id)),r===null&&e.jsxs(e.Fragment,{children:[e.jsx(d,{}),e.jsx(d,{}),e.jsx(d,{}),e.jsx(d,{})]})]}),e.jsxs(R,{title:s,isOpen:c,onClickCancel:u,onSubmit:h,formRef:b,children:[e.jsx(m,{label:"Nombre",name:"name",placeholder:"Nombre del combo",required:!0}),e.jsx(m,{label:"Precio",name:"price",type:"number",placeholder:"Escriba unprecio para el combo",required:!0}),e.jsx(m,{name:"active",label:"Activo",type:"radio",radioOptions:[{value:1,label:"si",checked:!0},{value:0,label:"no"}],required:!0})]}),e.jsx(U,{isOpen:a,text:"¿Estás seguro de eliminar este usuario?",onClickDelete:N,onClickCancel:u}),e.jsx(D,{isOpen:p,text:"Procesando tu solicitud..."})]})}function B({row:s,onEdit:n,onDelete:i}){var c;const l=(c=s.combo_products)==null?void 0:c.map(a=>a.product);return e.jsxs("div",{className:" flex flex-col items-center gap-2 p-4 border rounded-lg shadow bg-[--c2] text-[--c2-txt] ",children:[(l==null?void 0:l.length)>0?e.jsx("div",{className:" flex-1 grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] w-full gap-1 p-2 border rounded-lg ",children:l.map(a=>e.jsx("img",{src:a.image_url,alt:a.name,className:"w-full aspect-square object-contain rounded-full"},a.id))}):e.jsx("p",{className:" w-full text-center px-2 py-5 border rounded-lg bg-black/5",children:"No hay productos en este combo"}),e.jsxs("div",{className:" min-w-0",children:[e.jsx("p",{className:"text-sm text-center font-medium text-[--c2-txt] truncate",children:s.name}),e.jsxs("p",{className:" text-sm text-center text-[--c2-txt3] truncate ",children:["$",s.price," / Unidad"]}),e.jsx("p",{className:" text-sm text-center text-[--c2-txt3] truncate ",children:s.category}),e.jsx("p",{className:O("text-xs text-center ",{" text-red-600 ":s.active!==1," text-green-600 ":s.active===1}),children:s.active===1?"Activo":"Inactivo"})]}),e.jsxs("div",{className:" flex flex-shrink-0 ",children:[e.jsx(o,{tag:S,to:"/panel/combos/"+s.id,icon:P}),e.jsx(o,{onClick:n,icon:F}),e.jsx(o,{onClick:i,icon:I})]})]})}function d(){return e.jsxs("div",{className:" flex flex-col items-center gap-1 w-full border shadow-md rounded-lg p-4 bg-black/5 animate-pulse ",children:[e.jsx("div",{className:" block w-full aspect-video rounded-md border bg-black/5 "}),e.jsx("div",{className:" w-2/3 h-5 rounded-full bg-black/5 "}),e.jsxs("div",{className:" flex justify-center gap-2 w-full ",children:[e.jsx("div",{className:" w-1/5 h-4 rounded-full bg-black/5 "}),e.jsx("div",{className:" w-1/5 h-4 rounded-full bg-black/5 "})]}),e.jsx("div",{className:" w-1/4 h-3 rounded-full bg-black/5 "}),e.jsxs("div",{className:" flex justify-center gap-2 w-full ",children:[e.jsx("div",{className:" w-8 aspect-square rounded-md bg-black/5 "}),e.jsx("div",{className:" w-8 aspect-square rounded-md bg-black/5 "}),e.jsx("div",{className:" w-8 aspect-square rounded-md bg-black/5 "})]})]})}export{T as default};
