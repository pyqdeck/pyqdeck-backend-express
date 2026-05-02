import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,cr as r,dr as i,fr as a,lr as o,o as s,s as c,u as l,ur as u,xi as d}from"./iframe-C4Sc4ZPD.js";import{G as f,J as p,t as m}from"./lucide-react-8MFGNzJ6.js";function h({className:e,...t}){return(0,y.jsx)(i,{"data-slot":`accordion`,className:s(`flex w-full flex-col`,e),...t})}function g({className:e,...t}){return(0,y.jsx)(u,{"data-slot":`accordion-item`,className:s(`not-last:border-b`,e),...t})}function _({className:e,children:t,...n}){return(0,y.jsx)(o,{className:`flex`,children:(0,y.jsxs)(a,{"data-slot":`accordion-trigger`,className:s(`group/accordion-trigger focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4`,e),...n,children:[t,(0,y.jsx)(p,{"data-slot":`accordion-trigger-icon`,className:`pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden`}),(0,y.jsx)(f,{"data-slot":`accordion-trigger-icon`,className:`pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline`})]})})}function v({className:e,children:t,...n}){return(0,y.jsx)(r,{"data-slot":`accordion-content`,className:`data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden text-sm`,...n,children:(0,y.jsx)(`div`,{className:s(`[&_a]:hover:text-foreground h-(--radix-accordion-content-height) pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4`,e),children:t})})}var y,b=e((()=>{y=t(n(),1),d(),l(),c(),m(),h.__docgenInfo={description:``,methods:[],displayName:`Accordion`},g.__docgenInfo={description:``,methods:[],displayName:`AccordionItem`},_.__docgenInfo={description:``,methods:[],displayName:`AccordionTrigger`},v.__docgenInfo={description:``,methods:[],displayName:`AccordionContent`}})),x,S,C,w;e((()=>{x=t(n(),1),b(),S={title:`UI/Accordion`,component:h,tags:[`autodocs`]},C={render:e=>(0,x.jsxs)(h,{type:`single`,collapsible:!0,...e,className:`w-[400px]`,children:[(0,x.jsxs)(g,{value:`item-1`,children:[(0,x.jsx)(_,{children:`Is it accessible?`}),(0,x.jsx)(v,{children:`Yes. It adheres to the WAI-ARIA design pattern.`})]}),(0,x.jsxs)(g,{value:`item-2`,children:[(0,x.jsx)(_,{children:`Is it styled?`}),(0,x.jsx)(v,{children:`Yes. It comes with default styles that matches the other components' aesthetic.`})]}),(0,x.jsxs)(g,{value:`item-3`,children:[(0,x.jsx)(_,{children:`Is it animated?`}),(0,x.jsx)(v,{children:`Yes. It's animated by default, but you can disable it if you prefer.`})]})]})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w=[`Default`]}))();export{C as Default,w as __namedExportsOrder,S as default};