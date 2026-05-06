import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r,d as i,f as a,o,s,u as c}from"./iframe-DrW39PJl.js";import{Ft as l,G as u,s as d,t as f}from"./lucide-react-BkMIyRAJ.js";import{n as p,r as m}from"./toggle-B1cZbxZM.js";function h({className:e,variant:t,size:n,spacing:r=0,orientation:i=`horizontal`,children:s,...c}){return(0,_.jsx)(a,{"data-slot":`toggle-group`,"data-variant":t,"data-size":n,"data-spacing":r,"data-orientation":i,style:{"--gap":r},className:o(`group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-vertical:flex-col data-vertical:items-stretch data-[size=sm]:rounded-[min(var(--radius-md),10px)]`,e),...c,children:(0,_.jsx)(y.Provider,{value:{variant:t,size:n,spacing:r,orientation:i},children:s})})}function g({className:e,children:t,variant:n=`default`,size:r=`default`,...a}){let s=v.useContext(y);return(0,_.jsx)(i,{"data-slot":`toggle-group-item`,"data-variant":s.variant||n,"data-size":s.size||r,"data-spacing":s.spacing,className:o(`shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t`,m({variant:s.variant||n,size:s.size||r}),e),...a,children:t})}var _,v,y,b=e((()=>{_=t(n(),1),v=t(r(),1),c(),s(),p(),y=v.createContext({size:`default`,variant:`default`,spacing:0,orientation:`horizontal`}),h.__docgenInfo={description:``,methods:[],displayName:`ToggleGroup`,props:{spacing:{defaultValue:{value:`0`,computed:!1},required:!1},orientation:{defaultValue:{value:`'horizontal'`,computed:!1},required:!1}}},g.__docgenInfo={description:``,methods:[],displayName:`ToggleGroupItem`,props:{variant:{defaultValue:{value:`'default'`,computed:!1},required:!1},size:{defaultValue:{value:`'default'`,computed:!1},required:!1}}}})),x,S,C,w,T;e((()=>{x=t(n(),1),b(),f(),S={title:`UI/ToggleGroup`,component:h,tags:[`autodocs`],argTypes:{type:{control:{type:`select`},options:[`single`,`multiple`]},variant:{control:{type:`select`},options:[`default`,`outline`]},size:{control:{type:`select`},options:[`default`,`sm`,`lg`]}}},C={args:{type:`single`,defaultValue:`bold`},render:e=>(0,x.jsxs)(h,{...e,children:[(0,x.jsx)(g,{value:`bold`,"aria-label":`Toggle bold`,children:(0,x.jsx)(l,{className:`h-4 w-4`})}),(0,x.jsx)(g,{value:`italic`,"aria-label":`Toggle italic`,children:(0,x.jsx)(u,{className:`h-4 w-4`})}),(0,x.jsx)(g,{value:`underline`,"aria-label":`Toggle underline`,children:(0,x.jsx)(d,{className:`h-4 w-4`})})]})},w={args:{type:`multiple`,variant:`outline`},render:e=>(0,x.jsxs)(h,{...e,children:[(0,x.jsx)(g,{value:`bold`,"aria-label":`Toggle bold`,children:(0,x.jsx)(l,{className:`h-4 w-4`})}),(0,x.jsx)(g,{value:`italic`,"aria-label":`Toggle italic`,children:(0,x.jsx)(u,{className:`h-4 w-4`})}),(0,x.jsx)(g,{value:`underline`,"aria-label":`Toggle underline`,children:(0,x.jsx)(d,{className:`h-4 w-4`})})]})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'single',
    defaultValue: 'bold'
  },
  render: args => <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'multiple',
    variant: 'outline'
  },
  render: args => <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Outline`]}))();export{C as Default,w as Outline,T as __namedExportsOrder,S as default};