import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{$ as n,Br as r,Q as i,X as a,Z as o,et as s,o as c,s as l,u,xi as d}from"./iframe-TXawFLUM.js";import{h as f,t as p}from"./lucide-react-5sYaPeTn.js";import{r as m,t as h}from"./button-C4T8b_qj.js";function g({...e}){return(0,C.jsx)(n,{"data-slot":`popover`,...e})}function _({...e}){return(0,C.jsx)(s,{"data-slot":`popover-trigger`,...e})}function v({className:e,align:t=`center`,sideOffset:n=4,...r}){return(0,C.jsx)(i,{children:(0,C.jsx)(o,{"data-slot":`popover-content`,align:t,sideOffset:n,className:c(`bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg p-2.5 text-sm shadow-md ring-1 outline-hidden duration-100`,e),...r})})}function y({...e}){return(0,C.jsx)(a,{"data-slot":`popover-anchor`,...e})}function b({className:e,...t}){return(0,C.jsx)(`div`,{"data-slot":`popover-header`,className:c(`flex flex-col gap-0.5 text-sm`,e),...t})}function x({className:e,...t}){return(0,C.jsx)(`div`,{"data-slot":`popover-title`,className:c(`font-medium`,e),...t})}function S({className:e,...t}){return(0,C.jsx)(`p`,{"data-slot":`popover-description`,className:c(`text-muted-foreground`,e),...t})}var C,w=e((()=>{C=t(r(),1),d(),u(),l(),g.__docgenInfo={description:``,methods:[],displayName:`Popover`},y.__docgenInfo={description:``,methods:[],displayName:`PopoverAnchor`},v.__docgenInfo={description:``,methods:[],displayName:`PopoverContent`,props:{align:{defaultValue:{value:`'center'`,computed:!1},required:!1},sideOffset:{defaultValue:{value:`4`,computed:!1},required:!1}}},S.__docgenInfo={description:``,methods:[],displayName:`PopoverDescription`},b.__docgenInfo={description:``,methods:[],displayName:`PopoverHeader`},x.__docgenInfo={description:``,methods:[],displayName:`PopoverTitle`},_.__docgenInfo={description:``,methods:[],displayName:`PopoverTrigger`}})),T,E,D,O;e((()=>{T=t(r(),1),w(),m(),p(),E={title:`UI/Popover`,component:g,tags:[`autodocs`]},D={render:e=>(0,T.jsxs)(g,{...e,children:[(0,T.jsx)(_,{asChild:!0,children:(0,T.jsx)(h,{variant:`outline`,size:`icon`,children:(0,T.jsx)(f,{className:`h-4 w-4`})})}),(0,T.jsxs)(v,{className:`w-80`,children:[(0,T.jsxs)(b,{children:[(0,T.jsx)(x,{children:`Dimensions`}),(0,T.jsx)(S,{children:`Set the dimensions for the layer.`})]}),(0,T.jsxs)(`div`,{className:`grid gap-2`,children:[(0,T.jsxs)(`div`,{className:`grid grid-cols-3 items-center gap-4`,children:[(0,T.jsx)(`span`,{className:`text-xs`,children:`Width`}),(0,T.jsx)(`div`,{className:`bg-muted col-span-2 h-8 rounded`})]}),(0,T.jsxs)(`div`,{className:`grid grid-cols-3 items-center gap-4`,children:[(0,T.jsx)(`span`,{className:`text-xs`,children:`Height`}),(0,T.jsx)(`div`,{className:`bg-muted col-span-2 h-8 rounded`})]})]})]})]})},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O=[`Default`]}))();export{D as Default,O as __namedExportsOrder,E as default};