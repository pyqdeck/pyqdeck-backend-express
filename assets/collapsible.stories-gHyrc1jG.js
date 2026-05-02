import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,_r as r,gr as i,hr as a,u as o,xi as s}from"./iframe-zQGOC5jD.js";import{ot as c,t as l}from"./lucide-react-D_zBGtrA.js";import{r as u,t as d}from"./button-ZxsGeWGV.js";function f({...e}){return(0,h.jsx)(r,{"data-slot":`collapsible`,...e})}function p({...e}){return(0,h.jsx)(i,{"data-slot":`collapsible-trigger`,...e})}function m({...e}){return(0,h.jsx)(a,{"data-slot":`collapsible-content`,...e})}var h,g=e((()=>{h=t(n(),1),o(),f.__docgenInfo={description:``,methods:[],displayName:`Collapsible`},p.__docgenInfo={description:``,methods:[],displayName:`CollapsibleTrigger`},m.__docgenInfo={description:``,methods:[],displayName:`CollapsibleContent`}})),_,v,y,b,x;e((()=>{_=t(n(),1),g(),u(),l(),v=t(s(),1),y={title:`UI/Collapsible`,component:f,tags:[`autodocs`]},b={render:()=>{let[e,t]=v.useState(!1);return(0,_.jsxs)(f,{open:e,onOpenChange:t,className:`w-[350px] space-y-2`,children:[(0,_.jsxs)(`div`,{className:`flex items-center justify-between space-x-4 px-4`,children:[(0,_.jsx)(`h4`,{className:`text-sm font-semibold`,children:`@peduarte starred 3 repositories`}),(0,_.jsx)(p,{asChild:!0,children:(0,_.jsxs)(d,{variant:`ghost`,size:`sm`,className:`w-9 p-0`,children:[(0,_.jsx)(c,{className:`h-4 w-4`}),(0,_.jsx)(`span`,{className:`sr-only`,children:`Toggle`})]})})]}),(0,_.jsx)(`div`,{className:`rounded-md border px-4 py-3 font-mono text-sm`,children:`@radix-ui/primitives`}),(0,_.jsxs)(m,{className:`space-y-2`,children:[(0,_.jsx)(`div`,{className:`rounded-md border px-4 py-3 font-mono text-sm`,children:`@radix-ui/colors`}),(0,_.jsx)(`div`,{className:`rounded-md border px-4 py-3 font-mono text-sm`,children:`@stitches/react`})]})]})}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            @peduarte starred 3 repositories
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>;
  }
}`,...b.parameters?.docs?.source}}},x=[`Default`]}))();export{b as Default,x as __namedExportsOrder,y as default};