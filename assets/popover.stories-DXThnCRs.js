import{n as e}from"./chunk-BEldbCjX.js";import{$ as t,Lr as n,Q as r,X as i,Z as a,et as o,ii as s,o as c,s as l,u}from"./iframe-BzLYIvcx.js";import{t as d,u as f}from"./lucide-react-Di0yrQBx.js";import{r as p,t as m}from"./button-B8CLU6L2.js";function h({...e}){return(0,S.jsx)(t,{"data-slot":`popover`,...e})}function g({...e}){return(0,S.jsx)(o,{"data-slot":`popover-trigger`,...e})}function _({className:e,align:t=`center`,sideOffset:n=4,...i}){return(0,S.jsx)(r,{children:(0,S.jsx)(a,{"data-slot":`popover-content`,align:t,sideOffset:n,className:c(`bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg p-2.5 text-sm shadow-md ring-1 outline-hidden duration-100`,e),...i})})}function v({...e}){return(0,S.jsx)(i,{"data-slot":`popover-anchor`,...e})}function y({className:e,...t}){return(0,S.jsx)(`div`,{"data-slot":`popover-header`,className:c(`flex flex-col gap-0.5 text-sm`,e),...t})}function b({className:e,...t}){return(0,S.jsx)(`div`,{"data-slot":`popover-title`,className:c(`font-medium`,e),...t})}function x({className:e,...t}){return(0,S.jsx)(`p`,{"data-slot":`popover-description`,className:c(`text-muted-foreground`,e),...t})}var S,C=e((()=>{S=n(),s(),u(),l(),h.__docgenInfo={description:``,methods:[],displayName:`Popover`},v.__docgenInfo={description:``,methods:[],displayName:`PopoverAnchor`},_.__docgenInfo={description:``,methods:[],displayName:`PopoverContent`,props:{align:{defaultValue:{value:`'center'`,computed:!1},required:!1},sideOffset:{defaultValue:{value:`4`,computed:!1},required:!1}}},x.__docgenInfo={description:``,methods:[],displayName:`PopoverDescription`},y.__docgenInfo={description:``,methods:[],displayName:`PopoverHeader`},b.__docgenInfo={description:``,methods:[],displayName:`PopoverTitle`},g.__docgenInfo={description:``,methods:[],displayName:`PopoverTrigger`}})),w,T,E,D;e((()=>{w=n(),C(),p(),d(),T={title:`UI/Popover`,component:h,tags:[`autodocs`]},E={render:e=>(0,w.jsxs)(h,{...e,children:[(0,w.jsx)(g,{asChild:!0,children:(0,w.jsx)(m,{variant:`outline`,size:`icon`,children:(0,w.jsx)(f,{className:`h-4 w-4`})})}),(0,w.jsxs)(_,{className:`w-80`,children:[(0,w.jsxs)(y,{children:[(0,w.jsx)(b,{children:`Dimensions`}),(0,w.jsx)(x,{children:`Set the dimensions for the layer.`})]}),(0,w.jsxs)(`div`,{className:`grid gap-2`,children:[(0,w.jsxs)(`div`,{className:`grid grid-cols-3 items-center gap-4`,children:[(0,w.jsx)(`span`,{className:`text-xs`,children:`Width`}),(0,w.jsx)(`div`,{className:`bg-muted col-span-2 h-8 rounded`})]}),(0,w.jsxs)(`div`,{className:`grid grid-cols-3 items-center gap-4`,children:[(0,w.jsx)(`span`,{className:`text-xs`,children:`Height`}),(0,w.jsx)(`div`,{className:`bg-muted col-span-2 h-8 rounded`})]})]})]})]})},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-xs">Width</span>
            <div className="bg-muted col-span-2 h-8 rounded" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="text-xs">Height</span>
            <div className="bg-muted col-span-2 h-8 rounded" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
}`,...E.parameters?.docs?.source}}},D=[`Default`]}))();export{E as Default,D as __namedExportsOrder,T as default};