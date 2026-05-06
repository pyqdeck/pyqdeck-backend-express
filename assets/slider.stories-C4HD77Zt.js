import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,C as r,Ci as i,S as a,b as o,o as s,s as c,u as l,x as u}from"./iframe-BGIDaLVl.js";function d({className:e,defaultValue:t,value:n,min:i=0,max:c=100,...l}){let d=p.useMemo(()=>Array.isArray(n)?n:Array.isArray(t)?t:[i,c],[n,t,i,c]);return(0,f.jsxs)(u,{"data-slot":`slider`,defaultValue:t,value:n,min:i,max:c,className:s(`relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col`,e),...l,children:[(0,f.jsx)(r,{"data-slot":`slider-track`,className:`bg-muted relative grow overflow-hidden rounded-full data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1`,children:(0,f.jsx)(o,{"data-slot":`slider-range`,className:`bg-primary absolute select-none data-horizontal:h-full data-vertical:w-full`})}),Array.from({length:d.length},(e,t)=>(0,f.jsx)(a,{"data-slot":`slider-thumb`,className:`border-ring ring-ring/50 relative block size-3 shrink-0 rounded-full border bg-white transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50`},t))]})}var f,p,m=e((()=>{f=t(n(),1),p=t(i(),1),l(),c(),d.__docgenInfo={description:``,methods:[],displayName:`Slider`,props:{min:{defaultValue:{value:`0`,computed:!1},required:!1},max:{defaultValue:{value:`100`,computed:!1},required:!1}}}})),h,g,_,v,y;e((()=>{h=t(n(),1),m(),g={title:`UI/Slider`,component:d,tags:[`autodocs`]},_={args:{defaultValue:[50],max:100,step:1},render:e=>(0,h.jsx)(`div`,{className:`w-[300px]`,children:(0,h.jsx)(d,{...e})})},v={args:{defaultValue:[20,80],max:100,step:1},render:e=>(0,h.jsx)(`div`,{className:`w-[300px]`,children:(0,h.jsx)(d,{...e})})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: [50],
    max: 100,
    step: 1
  },
  render: args => <div className="w-[300px]">
      <Slider {...args} />
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: [20, 80],
    max: 100,
    step: 1
  },
  render: args => <div className="w-[300px]">
      <Slider {...args} />
    </div>
}`,...v.parameters?.docs?.source}}},y=[`Default`,`Range`]}))();export{_ as Default,v as Range,y as __namedExportsOrder,g as default};