import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Sr as r,o as i,s as a,u as o,xi as s}from"./iframe-CZCIq5XG.js";import{J as c,t as l,ut as u}from"./lucide-react-CEHuUSpL.js";function d({className:e,...t}){return(0,v.jsx)(`nav`,{"aria-label":`breadcrumb`,"data-slot":`breadcrumb`,className:i(e),...t})}function f({className:e,...t}){return(0,v.jsx)(`ol`,{"data-slot":`breadcrumb-list`,className:i(`text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm wrap-break-word`,e),...t})}function p({className:e,...t}){return(0,v.jsx)(`li`,{"data-slot":`breadcrumb-item`,className:i(`inline-flex items-center gap-1`,e),...t})}function m({asChild:e,className:t,...n}){return(0,v.jsx)(e?r:`a`,{"data-slot":`breadcrumb-link`,className:i(`hover:text-foreground transition-colors`,t),...n})}function h({className:e,...t}){return(0,v.jsx)(`span`,{"data-slot":`breadcrumb-page`,role:`link`,"aria-disabled":`true`,"aria-current":`page`,className:i(`text-foreground font-normal`,e),...t})}function g({children:e,className:t,...n}){return(0,v.jsx)(`li`,{"data-slot":`breadcrumb-separator`,role:`presentation`,"aria-hidden":`true`,className:i(`[&>svg]:size-3.5`,t),...n,children:e??(0,v.jsx)(u,{})})}function _({className:e,...t}){return(0,v.jsxs)(`span`,{"data-slot":`breadcrumb-ellipsis`,role:`presentation`,"aria-hidden":`true`,className:i(`flex size-5 items-center justify-center [&>svg]:size-4`,e),...t,children:[(0,v.jsx)(c,{}),(0,v.jsx)(`span`,{className:`sr-only`,children:`More`})]})}var v,y=e((()=>{v=t(n(),1),s(),o(),a(),l(),d.__docgenInfo={description:``,methods:[],displayName:`Breadcrumb`},f.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbList`},p.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbItem`},m.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbLink`},h.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbPage`},g.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbSeparator`},_.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbEllipsis`}})),b,x,S,C,w;e((()=>{b=t(n(),1),y(),x={title:`UI/Breadcrumb`,component:d,tags:[`autodocs`]},S={render:()=>(0,b.jsx)(d,{children:(0,b.jsxs)(f,{children:[(0,b.jsx)(p,{children:(0,b.jsx)(m,{href:`/`,children:`Home`})}),(0,b.jsx)(g,{}),(0,b.jsx)(p,{children:(0,b.jsx)(m,{href:`/docs/components`,children:`Components`})}),(0,b.jsx)(g,{}),(0,b.jsx)(p,{children:(0,b.jsx)(h,{children:`Breadcrumb`})})]})})},C={render:()=>(0,b.jsx)(d,{children:(0,b.jsxs)(f,{children:[(0,b.jsx)(p,{children:(0,b.jsx)(m,{href:`/`,children:`Home`})}),(0,b.jsx)(g,{}),(0,b.jsx)(p,{children:(0,b.jsx)(_,{})}),(0,b.jsx)(g,{}),(0,b.jsx)(p,{children:(0,b.jsx)(m,{href:`/docs/components`,children:`Components`})}),(0,b.jsx)(g,{}),(0,b.jsx)(p,{children:(0,b.jsx)(h,{children:`Breadcrumb`})})]})})},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
}`,...C.parameters?.docs?.source}}},w=[`Default`,`WithEllipsis`]}))();export{S as Default,C as WithEllipsis,w as __namedExportsOrder,x as default};