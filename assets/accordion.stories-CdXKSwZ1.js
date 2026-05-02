import{n as e}from"./chunk-BEldbCjX.js";import{Lr as t,cr as n,dr as r,fr as i,ii as a,lr as o,o as s,s as c,u as l,ur as u}from"./iframe-BzLYIvcx.js";import{L as d,P as f,t as p}from"./lucide-react-Di0yrQBx.js";function m({className:e,...t}){return(0,v.jsx)(r,{"data-slot":`accordion`,className:s(`flex w-full flex-col`,e),...t})}function h({className:e,...t}){return(0,v.jsx)(u,{"data-slot":`accordion-item`,className:s(`not-last:border-b`,e),...t})}function g({className:e,children:t,...n}){return(0,v.jsx)(o,{className:`flex`,children:(0,v.jsxs)(i,{"data-slot":`accordion-trigger`,className:s(`group/accordion-trigger focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4`,e),...n,children:[t,(0,v.jsx)(d,{"data-slot":`accordion-trigger-icon`,className:`pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden`}),(0,v.jsx)(f,{"data-slot":`accordion-trigger-icon`,className:`pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline`})]})})}function _({className:e,children:t,...r}){return(0,v.jsx)(n,{"data-slot":`accordion-content`,className:`data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden text-sm`,...r,children:(0,v.jsx)(`div`,{className:s(`[&_a]:hover:text-foreground h-(--radix-accordion-content-height) pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4`,e),children:t})})}var v,y=e((()=>{v=t(),a(),l(),c(),p(),m.__docgenInfo={description:``,methods:[],displayName:`Accordion`},h.__docgenInfo={description:``,methods:[],displayName:`AccordionItem`},g.__docgenInfo={description:``,methods:[],displayName:`AccordionTrigger`},_.__docgenInfo={description:``,methods:[],displayName:`AccordionContent`}})),b,x,S,C;e((()=>{b=t(),y(),x={title:`UI/Accordion`,component:m,tags:[`autodocs`]},S={render:e=>(0,b.jsxs)(m,{type:`single`,collapsible:!0,...e,className:`w-[400px]`,children:[(0,b.jsxs)(h,{value:`item-1`,children:[(0,b.jsx)(g,{children:`Is it accessible?`}),(0,b.jsx)(_,{children:`Yes. It adheres to the WAI-ARIA design pattern.`})]}),(0,b.jsxs)(h,{value:`item-2`,children:[(0,b.jsx)(g,{children:`Is it styled?`}),(0,b.jsx)(_,{children:`Yes. It comes with default styles that matches the other components' aesthetic.`})]}),(0,b.jsxs)(h,{value:`item-3`,children:[(0,b.jsx)(g,{children:`Is it animated?`}),(0,b.jsx)(_,{children:`Yes. It's animated by default, but you can disable it if you prefer.`})]})]})},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <Accordion type="single" collapsible {...args} className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...S.parameters?.docs?.source}}},C=[`Default`]}))();export{S as Default,C as __namedExportsOrder,x as default};