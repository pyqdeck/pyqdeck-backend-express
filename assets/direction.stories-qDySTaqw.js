import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,pr as r,u as i,xi as a}from"./iframe-_ctePF00.js";import{r as o,t as s}from"./button-gn6i2_x9.js";import{n as c,t as l}from"./input-Ctv4iylN.js";function u({dir:e,direction:t,children:n}){return(0,d.jsx)(r,{dir:t??e,children:n})}var d,f=e((()=>{d=t(n(),1),a(),i(),u.__docgenInfo={description:``,methods:[],displayName:`DirectionProvider`}})),p,m,h,g,_;e((()=>{p=t(n(),1),f(),o(),c(),m=t(a(),1),h={title:`UI/Direction`,component:u,tags:[`autodocs`]},g={render:()=>{let[e,t]=m.useState(`ltr`);return(0,p.jsxs)(`div`,{className:`space-y-4`,children:[(0,p.jsxs)(`div`,{className:`flex gap-2`,children:[(0,p.jsx)(s,{onClick:()=>t(`ltr`),variant:e===`ltr`?`primary`:`outline`,children:`LTR`}),(0,p.jsx)(s,{onClick:()=>t(`rtl`),variant:e===`rtl`?`primary`:`outline`,children:`RTL`})]}),(0,p.jsx)(u,{dir:e,children:(0,p.jsxs)(`div`,{dir:e,className:`space-y-4 rounded-lg border p-4`,children:[(0,p.jsxs)(`p`,{className:`text-sm`,children:[`Current Direction:`,` `,(0,p.jsx)(`span`,{className:`font-bold uppercase`,children:e})]}),(0,p.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,p.jsx)(l,{placeholder:`Enter text...`,className:`flex-1`}),(0,p.jsx)(s,{children:`Send`})]}),(0,p.jsx)(`p`,{className:`text-muted-foreground text-xs`,children:`Notice how the input and button swap places in RTL mode if using flex or logical properties.`})]})})]})}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [dir, setDir] = React.useState('ltr');
    return <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setDir('ltr')} variant={dir === 'ltr' ? 'primary' : 'outline'}>
            LTR
          </Button>
          <Button onClick={() => setDir('rtl')} variant={dir === 'rtl' ? 'primary' : 'outline'}>
            RTL
          </Button>
        </div>

        <DirectionProvider dir={dir}>
          <div dir={dir} className="space-y-4 rounded-lg border p-4">
            <p className="text-sm">
              Current Direction:{' '}
              <span className="font-bold uppercase">{dir}</span>
            </p>
            <div className="flex items-center gap-2">
              <Input placeholder="Enter text..." className="flex-1" />
              <Button>Send</Button>
            </div>
            <p className="text-muted-foreground text-xs">
              Notice how the input and button swap places in RTL mode if using
              flex or logical properties.
            </p>
          </div>
        </DirectionProvider>
      </div>;
  }
}`,...g.parameters?.docs?.source}}},_=[`Default`]}))();export{g as Default,_ as __namedExportsOrder,h as default};