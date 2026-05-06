import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r,J as i,Y as a,o,s,u as c}from"./iframe-oRvXYUo0.js";function l({className:e,value:t,...n}){return(0,u.jsx)(a,{"data-slot":`progress`,className:o(`bg-muted relative flex h-1 w-full items-center overflow-x-hidden rounded-full`,e),...n,children:(0,u.jsx)(i,{"data-slot":`progress-indicator`,className:`bg-primary size-full flex-1 transition-all`,style:{transform:`translateX(-${100-(t||0)}%)`}})})}var u,d=e((()=>{u=t(n(),1),r(),c(),s(),l.__docgenInfo={description:``,methods:[],displayName:`Progress`}})),f,p,m,h,g;e((()=>{f=t(n(),1),d(),p={title:`UI/Progress`,component:l,tags:[`autodocs`]},m={args:{value:33},render:e=>(0,f.jsx)(`div`,{className:`w-[300px]`,children:(0,f.jsx)(l,{...e})})},h={args:{value:100},render:e=>(0,f.jsx)(`div`,{className:`w-[300px]`,children:(0,f.jsx)(l,{...e})})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    value: 33
  },
  render: args => <div className="w-[300px]">
      <Progress {...args} />
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    value: 100
  },
  render: args => <div className="w-[300px]">
      <Progress {...args} />
    </div>
}`,...h.parameters?.docs?.source}}},g=[`Default`,`Completed`]}))();export{h as Completed,m as Default,g as __namedExportsOrder,p as default};