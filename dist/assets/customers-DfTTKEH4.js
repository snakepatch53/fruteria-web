import{a8 as t}from"./index-fJAL8YZ-.js";const r="customers";function o(e){return e.map(({...s})=>({...s}))}async function u(){const e=await t({resource:r});return o(e)}async function c(e){return await t({resource:r,data:e,method:"POST",all:!0})}async function m(e,s){return await t({resource:r+"/"+e,data:s,method:"PUT",all:!0})}export{u as g,c as s,m as u};
