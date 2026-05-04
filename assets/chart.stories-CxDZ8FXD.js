import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-Dru6yTxD.js";import{a as r,c as i,s as a,t as o,u as s}from"./es6-BserCVnU.js";import{i as c,n as l,r as u,t as d}from"./chart-g3G8vAK6.js";var f,p,m,h,g,_;e((()=>{f=t(n(),1),c(),o(),p={title:`UI/Chart`,component:d,tags:[`autodocs`]},m=[{month:`Jan`,desktop:186,mobile:80},{month:`Feb`,desktop:305,mobile:200},{month:`Mar`,desktop:237,mobile:120},{month:`Apr`,desktop:73,mobile:190},{month:`May`,desktop:209,mobile:130},{month:`Jun`,desktop:214,mobile:140}],h={desktop:{label:`Desktop`,color:`hsl(var(--primary))`},mobile:{label:`Mobile`,color:`hsl(var(--muted-foreground))`}},g={render:()=>(0,f.jsx)(`div`,{className:`h-[400px] w-full max-w-2xl`,children:(0,f.jsx)(d,{config:h,children:(0,f.jsxs)(r,{data:m,children:[(0,f.jsx)(s,{vertical:!1,strokeDasharray:`3 3`}),(0,f.jsx)(a,{dataKey:`month`,tickLine:!1,tickMargin:10,axisLine:!1}),(0,f.jsx)(l,{content:(0,f.jsx)(u,{})}),(0,f.jsx)(i,{dataKey:`desktop`,fill:`var(--color-desktop)`,radius:4}),(0,f.jsx)(i,{dataKey:`mobile`,fill:`var(--color-mobile)`,radius:4})]})})})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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