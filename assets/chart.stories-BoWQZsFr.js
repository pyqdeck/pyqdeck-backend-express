import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-CGqnZNpi.js";import{a as r,c as i,d as a,i as o,n as s,p as c,r as l,t as u,u as d}from"./chart-5Yb9YQyz.js";var f,p,m,h,g,_;e((()=>{f=t(n(),1),o(),r(),p={title:`UI/Chart`,component:u,tags:[`autodocs`]},m=[{month:`Jan`,desktop:186,mobile:80},{month:`Feb`,desktop:305,mobile:200},{month:`Mar`,desktop:237,mobile:120},{month:`Apr`,desktop:73,mobile:190},{month:`May`,desktop:209,mobile:130},{month:`Jun`,desktop:214,mobile:140}],h={desktop:{label:`Desktop`,color:`hsl(var(--primary))`},mobile:{label:`Mobile`,color:`hsl(var(--muted-foreground))`}},g={render:()=>(0,f.jsx)(`div`,{className:`h-[400px] w-full max-w-2xl`,children:(0,f.jsx)(u,{config:h,children:(0,f.jsxs)(i,{data:m,children:[(0,f.jsx)(c,{vertical:!1,strokeDasharray:`3 3`}),(0,f.jsx)(d,{dataKey:`month`,tickLine:!1,tickMargin:10,axisLine:!1}),(0,f.jsx)(s,{content:(0,f.jsx)(l,{})}),(0,f.jsx)(a,{dataKey:`desktop`,fill:`var(--color-desktop)`,radius:4}),(0,f.jsx)(a,{dataKey:`mobile`,fill:`var(--color-mobile)`,radius:4})]})})})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="h-[400px] w-full max-w-2xl">
      <ChartContainer config={chartConfig}>
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
}`,...g.parameters?.docs?.source}}},_=[`BarChartExample`]}))();export{g as BarChartExample,_ as __namedExportsOrder,p as default};