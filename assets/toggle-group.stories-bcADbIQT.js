import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,d as r,f as i,o as a,s as o,u as s,xi as c}from"./iframe-zQGOC5jD.js";import{F as l,St as u,s as d,t as f}from"./lucide-react-D_zBGtrA.js";import{n as p,r as m}from"./toggle-DIrUABw7.js";function h({className:e,variant:t,size:n,spacing:r=0,orientation:o=`horizontal`,children:s,...c}){return(0,_.jsx)(i,{"data-slot":`toggle-group`,"data-variant":t,"data-size":n,"data-spacing":r,"data-orientation":o,style:{"--gap":r},className:a(`group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-vertical:flex-col data-vertical:items-stretch data-[size=sm]:rounded-[min(var(--radius-md),10px)]`,e),...c,children:(0,_.jsx)(y.Provider,{value:{variant:t,size:n,spacing:r,orientation:o},children:s})})}function g({className:e,children:t,variant:n=`default`,size:i=`default`,...o}){let s=v.useContext(y);return(0,_.jsx)(r,{"data-slot":`toggle-group-item`,"data-variant":s.variant||n,"data-size":s.size||i,"data-spacing":s.spacing,className:a(`shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t`,m({variant:s.variant||n,size:s.size||i}),e),...o,children:t})}var _,v,y,b=e((()=>{_=t(n(),1),v=t(c(),1),s(),o(),p(),y=v.createContext({size:`default`,variant:`default`,spacing:0,orientation:`horizontal`}),h.__docgenInfo={description:``,methods:[],displayName:`ToggleGroup`,props:{spacing:{defaultValue:{value:`0`,computed:!1},required:!1},orientation:{defaultValue:{value:`'horizontal'`,computed:!1},required:!1}}},g.__docgenInfo={description:``,methods:[],displayName:`ToggleGroupItem`,props:{variant:{defaultValue:{value:`'default'`,computed:!1},required:!1},size:{defaultValue:{value:`'default'`,computed:!1},required:!1}}}})),x,S,C,w,T;e((()=>{x=t(n(),1),b(),f(),S={title:`UI/ToggleGroup`,component:h,tags:[`autodocs`],argTypes:{type:{control:{type:`select`},options:[`single`,`multiple`]},variant:{control:{type:`select`},options:[`default`,`outline`]},size:{control:{type:`select`},options:[`default`,`sm`,`lg`]}}},C={args:{type:`single`,defaultValue:`bold`},render:e=>(0,x.jsxs)(h,{...e,children:[(0,x.jsx)(g,{value:`bold`,"aria-label":`Toggle bold`,children:(0,x.jsx)(u,{className:`h-4 w-4`})}),(0,x.jsx)(g,{value:`italic`,"aria-label":`Toggle italic`,children:(0,x.jsx)(l,{className:`h-4 w-4`})}),(0,x.jsx)(g,{value:`underline`,"aria-label":`Toggle underline`,children:(0,x.jsx)(d,{className:`h-4 w-4`})})]})},w={args:{type:`multiple`,variant:`outline`},render:e=>(0,x.jsxs)(h,{...e,children:[(0,x.jsx)(g,{value:`bold`,"aria-label":`Toggle bold`,children:(0,x.jsx)(u,{className:`h-4 w-4`})}),(0,x.jsx)(g,{value:`italic`,"aria-label":`Toggle italic`,children:(0,x.jsx)(l,{className:`h-4 w-4`})}),(0,x.jsx)(g,{value:`underline`,"aria-label":`Toggle underline`,children:(0,x.jsx)(d,{className:`h-4 w-4`})})]})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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