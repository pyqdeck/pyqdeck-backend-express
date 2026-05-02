import{n as e}from"./chunk-BEldbCjX.js";import{J as t,Lr as n,Y as r,ii as i,o as a,s as o,u as s}from"./iframe-BzLYIvcx.js";function c({className:e,value:n,...i}){return(0,l.jsx)(r,{"data-slot":`progress`,className:a(`bg-muted relative flex h-1 w-full items-center overflow-x-hidden rounded-full`,e),...i,children:(0,l.jsx)(t,{"data-slot":`progress-indicator`,className:`bg-primary size-full flex-1 transition-all`,style:{transform:`translateX(-${100-(n||0)}%)`}})})}var l,u=e((()=>{l=n(),i(),s(),o(),c.__docgenInfo={description:``,methods:[],displayName:`Progress`}})),d,f,p,m,h;e((()=>{d=n(),u(),f={title:`UI/Progress`,component:c,tags:[`autodocs`]},p={args:{value:33},render:e=>(0,d.jsx)(`div`,{className:`w-[300px]`,children:(0,d.jsx)(c,{...e})})},m={args:{value:100},render:e=>(0,d.jsx)(`div`,{className:`w-[300px]`,children:(0,d.jsx)(c,{...e})})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    value: 33
  },
  render: args => <div className="w-[300px]">
      <Progress {...args} />
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    value: 100
  },
  render: args => <div className="w-[300px]">
      <Progress {...args} />
    </div>
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Completed`]}))();export{m as Completed,p as Default,h as __namedExportsOrder,f as default};