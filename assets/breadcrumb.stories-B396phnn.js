import{n as e}from"./chunk-BEldbCjX.js";import{Lr as t,Sr as n,ii as r,o as i,s as a,u as o}from"./iframe-BzLYIvcx.js";import{D as s,F as c,t as l}from"./lucide-react-Di0yrQBx.js";function u({className:e,...t}){return(0,_.jsx)(`nav`,{"aria-label":`breadcrumb`,"data-slot":`breadcrumb`,className:i(e),...t})}function d({className:e,...t}){return(0,_.jsx)(`ol`,{"data-slot":`breadcrumb-list`,className:i(`text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm wrap-break-word`,e),...t})}function f({className:e,...t}){return(0,_.jsx)(`li`,{"data-slot":`breadcrumb-item`,className:i(`inline-flex items-center gap-1`,e),...t})}function p({asChild:e,className:t,...r}){return(0,_.jsx)(e?n:`a`,{"data-slot":`breadcrumb-link`,className:i(`hover:text-foreground transition-colors`,t),...r})}function m({className:e,...t}){return(0,_.jsx)(`span`,{"data-slot":`breadcrumb-page`,role:`link`,"aria-disabled":`true`,"aria-current":`page`,className:i(`text-foreground font-normal`,e),...t})}function h({children:e,className:t,...n}){return(0,_.jsx)(`li`,{"data-slot":`breadcrumb-separator`,role:`presentation`,"aria-hidden":`true`,className:i(`[&>svg]:size-3.5`,t),...n,children:e??(0,_.jsx)(c,{})})}function g({className:e,...t}){return(0,_.jsxs)(`span`,{"data-slot":`breadcrumb-ellipsis`,role:`presentation`,"aria-hidden":`true`,className:i(`flex size-5 items-center justify-center [&>svg]:size-4`,e),...t,children:[(0,_.jsx)(s,{}),(0,_.jsx)(`span`,{className:`sr-only`,children:`More`})]})}var _,v=e((()=>{_=t(),r(),o(),a(),l(),u.__docgenInfo={description:``,methods:[],displayName:`Breadcrumb`},d.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbList`},f.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbItem`},p.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbLink`},m.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbPage`},h.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbSeparator`},g.__docgenInfo={description:``,methods:[],displayName:`BreadcrumbEllipsis`}})),y,b,x,S,C;e((()=>{y=t(),v(),b={title:`UI/Breadcrumb`,component:u,tags:[`autodocs`]},x={render:()=>(0,y.jsx)(u,{children:(0,y.jsxs)(d,{children:[(0,y.jsx)(f,{children:(0,y.jsx)(p,{href:`/`,children:`Home`})}),(0,y.jsx)(h,{}),(0,y.jsx)(f,{children:(0,y.jsx)(p,{href:`/docs/components`,children:`Components`})}),(0,y.jsx)(h,{}),(0,y.jsx)(f,{children:(0,y.jsx)(m,{children:`Breadcrumb`})})]})})},S={render:()=>(0,y.jsx)(u,{children:(0,y.jsxs)(d,{children:[(0,y.jsx)(f,{children:(0,y.jsx)(p,{href:`/`,children:`Home`})}),(0,y.jsx)(h,{}),(0,y.jsx)(f,{children:(0,y.jsx)(g,{})}),(0,y.jsx)(h,{}),(0,y.jsx)(f,{children:(0,y.jsx)(p,{href:`/docs/components`,children:`Components`})}),(0,y.jsx)(h,{}),(0,y.jsx)(f,{children:(0,y.jsx)(m,{children:`Breadcrumb`})})]})})},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C=[`Default`,`WithEllipsis`]}))();export{x as Default,S as WithEllipsis,C as __namedExportsOrder,b as default};