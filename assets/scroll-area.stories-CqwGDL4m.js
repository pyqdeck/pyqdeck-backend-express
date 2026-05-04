import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-DLCUz78v.js";import{n as i,t as a}from"./scroll-area-CxGfEmcR.js";import{n as o,t as s}from"./separator-BD_H6k6D.js";var c,l,u,d,f,p;e((()=>{c=t(n(),1),i(),o(),l=t(r(),1),u={title:`UI/ScrollArea`,component:a,tags:[`autodocs`]},d=Array.from({length:50}).map((e,t,n)=>`v1.2.0-beta.${n.length-t}`),f={render:e=>(0,c.jsx)(a,{...e,className:`h-72 w-48 rounded-md border`,children:(0,c.jsxs)(`div`,{className:`p-4`,children:[(0,c.jsx)(`h4`,{className:`mb-4 text-sm leading-none font-medium`,children:`Tags`}),d.map(e=>(0,c.jsxs)(l.Fragment,{children:[(0,c.jsx)(`div`,{className:`text-sm`,children:e}),(0,c.jsx)(s,{className:`my-2`})]},e))]})})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <ScrollArea {...args} className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map(tag => <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>)}
      </div>
    </ScrollArea>
}`,...f.parameters?.docs?.source}}},p=[`Default`]}))();export{f as Default,p as __namedExportsOrder,u as default};