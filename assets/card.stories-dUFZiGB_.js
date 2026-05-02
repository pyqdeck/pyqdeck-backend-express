import{n as e}from"./chunk-BEldbCjX.js";import{Lr as t}from"./iframe-BzLYIvcx.js";import{r as n,t as r}from"./button-B8CLU6L2.js";import{a as i,i as a,n as o,o as s,r as c,s as l,t as u}from"./card-io6UfrBD.js";var d,f,p,m,h;e((()=>{d=t(),l(),n(),f={title:`UI/Card`,component:u,tags:[`autodocs`],argTypes:{size:{control:{type:`select`},options:[`default`,`sm`]}}},p={render:e=>(0,d.jsxs)(u,{...e,className:`w-[350px]`,children:[(0,d.jsxs)(i,{children:[(0,d.jsx)(s,{children:`Create project`}),(0,d.jsx)(c,{children:`Deploy your new project in one-click.`})]}),(0,d.jsx)(o,{children:(0,d.jsx)(`div`,{className:`grid w-full items-center gap-4`,children:(0,d.jsx)(`p`,{className:`text-sm`,children:`This is the card content area.`})})}),(0,d.jsxs)(a,{className:`flex justify-between`,children:[(0,d.jsx)(r,{variant:`outline`,children:`Cancel`}),(0,d.jsx)(r,{children:`Deploy`})]})]})},m={args:{size:`sm`},render:e=>(0,d.jsxs)(u,{...e,className:`w-[300px]`,children:[(0,d.jsxs)(i,{children:[(0,d.jsx)(s,{children:`Small Card`}),(0,d.jsx)(c,{children:`Compact layout for sidebars.`})]}),(0,d.jsx)(o,{children:(0,d.jsx)(`p`,{className:`text-xs`,children:`Less padding and smaller text.`})}),(0,d.jsx)(a,{children:(0,d.jsx)(r,{size:`sm`,className:`w-full`,children:`Action`})})]})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <p className="text-sm">This is the card content area.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'sm'
  },
  render: args => <Card {...args} className="w-[300px]">
      <CardHeader>
        <CardTitle>Small Card</CardTitle>
        <CardDescription>Compact layout for sidebars.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs">Less padding and smaller text.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" className="w-full">
          Action
        </Button>
      </CardFooter>
    </Card>
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Small`]}))();export{p as Default,m as Small,h as __namedExportsOrder,f as default};