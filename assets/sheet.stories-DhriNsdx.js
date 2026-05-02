import{n as e}from"./chunk-BEldbCjX.js";import{Lr as t}from"./iframe-BzLYIvcx.js";import{r as n,t as r}from"./button-B8CLU6L2.js";import{a as i,c as a,i as o,l as s,n as c,o as l,r as u,s as d,t as f}from"./sheet-7IbXava-.js";var p,m,h,g,_;e((()=>{p=t(),s(),n(),m={title:`UI/Sheet`,component:f,tags:[`autodocs`],argTypes:{side:{control:{type:`select`},options:[`top`,`bottom`,`left`,`right`]}}},h={render:e=>(0,p.jsxs)(f,{...e,children:[(0,p.jsx)(a,{asChild:!0,children:(0,p.jsx)(r,{variant:`outline`,children:`Open Sheet`})}),(0,p.jsxs)(u,{children:[(0,p.jsxs)(l,{children:[(0,p.jsx)(d,{children:`Edit profile`}),(0,p.jsx)(o,{children:`Make changes to your profile here. Click save when you're done.`})]}),(0,p.jsx)(`div`,{className:`grid gap-4 py-4`,children:(0,p.jsxs)(`div`,{className:`grid grid-cols-4 items-center gap-4`,children:[(0,p.jsx)(`span`,{className:`text-right`,children:`Name`}),(0,p.jsx)(`div`,{className:`bg-muted col-span-3 h-8 rounded`})]})}),(0,p.jsx)(i,{children:(0,p.jsx)(c,{asChild:!0,children:(0,p.jsx)(r,{type:`submit`,children:`Save changes`})})})]})]})},g={args:{side:`left`},render:e=>(0,p.jsxs)(f,{...e,children:[(0,p.jsx)(a,{asChild:!0,children:(0,p.jsx)(r,{variant:`outline`,children:`Open Left Sheet`})}),(0,p.jsx)(u,{side:`left`,children:(0,p.jsxs)(l,{children:[(0,p.jsx)(d,{children:`Left Menu`}),(0,p.jsx)(o,{children:`This is a left-aligned sheet.`})]})})]})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Left`]}))();export{h as Default,g as Left,_ as __namedExportsOrder,m as default};