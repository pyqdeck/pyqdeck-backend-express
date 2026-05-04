import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-BisVWlkQ.js";import{r,t as i}from"./button-CVfakvrn.js";import{a,c as o,i as s,l as c,n as l,o as u,r as d,s as f,t as p}from"./sheet-Cj-oXfUV.js";var m,h,g,_,v;e((()=>{m=t(n(),1),c(),r(),h={title:`UI/Sheet`,component:p,tags:[`autodocs`],argTypes:{side:{control:{type:`select`},options:[`top`,`bottom`,`left`,`right`]}}},g={render:e=>(0,m.jsxs)(p,{...e,children:[(0,m.jsx)(o,{asChild:!0,children:(0,m.jsx)(i,{variant:`outline`,children:`Open Sheet`})}),(0,m.jsxs)(d,{children:[(0,m.jsxs)(u,{children:[(0,m.jsx)(f,{children:`Edit profile`}),(0,m.jsx)(s,{children:`Make changes to your profile here. Click save when you're done.`})]}),(0,m.jsx)(`div`,{className:`grid gap-4 py-4`,children:(0,m.jsxs)(`div`,{className:`grid grid-cols-4 items-center gap-4`,children:[(0,m.jsx)(`span`,{className:`text-right`,children:`Name`}),(0,m.jsx)(`div`,{className:`bg-muted col-span-3 h-8 rounded`})]})}),(0,m.jsx)(a,{children:(0,m.jsx)(l,{asChild:!0,children:(0,m.jsx)(i,{type:`submit`,children:`Save changes`})})})]})]})},_={args:{side:`left`},render:e=>(0,m.jsxs)(p,{...e,children:[(0,m.jsx)(o,{asChild:!0,children:(0,m.jsx)(i,{variant:`outline`,children:`Open Left Sheet`})}),(0,m.jsx)(d,{side:`left`,children:(0,m.jsxs)(u,{children:[(0,m.jsx)(f,{children:`Left Menu`}),(0,m.jsx)(s,{children:`This is a left-aligned sheet.`})]})})]})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right">Name</span>
            <div className="bg-muted col-span-3 h-8 rounded" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    side: 'left'
  },
  render: args => <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left Menu</SheetTitle>
          <SheetDescription>This is a left-aligned sheet.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
}`,..._.parameters?.docs?.source}}},v=[`Default`,`Left`]}))();export{g as Default,_ as Left,v as __namedExportsOrder,h as default};