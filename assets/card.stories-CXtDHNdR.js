import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-j3_yFELf.js";import{r,t as i}from"./button--PwgU519.js";import{a,i as o,n as s,o as c,r as l,s as u,t as d}from"./card-DQlEhiBs.js";var f,p,m,h,g;e((()=>{f=t(n(),1),u(),r(),p={title:`UI/Card`,component:d,tags:[`autodocs`],argTypes:{size:{control:{type:`select`},options:[`default`,`sm`]}}},m={render:e=>(0,f.jsxs)(d,{...e,className:`w-[350px]`,children:[(0,f.jsxs)(a,{children:[(0,f.jsx)(c,{children:`Create project`}),(0,f.jsx)(l,{children:`Deploy your new project in one-click.`})]}),(0,f.jsx)(s,{children:(0,f.jsx)(`div`,{className:`grid w-full items-center gap-4`,children:(0,f.jsx)(`p`,{className:`text-sm`,children:`This is the card content area.`})})}),(0,f.jsxs)(o,{className:`flex justify-between`,children:[(0,f.jsx)(i,{variant:`outline`,children:`Cancel`}),(0,f.jsx)(i,{children:`Deploy`})]})]})},h={args:{size:`sm`},render:e=>(0,f.jsxs)(d,{...e,className:`w-[300px]`,children:[(0,f.jsxs)(a,{children:[(0,f.jsx)(c,{children:`Small Card`}),(0,f.jsx)(l,{children:`Compact layout for sidebars.`})]}),(0,f.jsx)(s,{children:(0,f.jsx)(`p`,{className:`text-xs`,children:`Less padding and smaller text.`})}),(0,f.jsx)(o,{children:(0,f.jsx)(i,{size:`sm`,className:`w-full`,children:`Action`})})]})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},g=[`Default`,`Small`]}))();export{m as Default,h as Small,g as __namedExportsOrder,p as default};