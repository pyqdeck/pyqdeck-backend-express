import{n as e}from"./chunk-BEldbCjX.js";import{Lr as t,ii as n,o as r,s as i}from"./iframe-BzLYIvcx.js";import{D as a,F as o,I as s,t as c}from"./lucide-react-Di0yrQBx.js";import{r as l,t as u}from"./button-B8CLU6L2.js";function d({className:e,...t}){return(0,v.jsx)(`nav`,{role:`navigation`,"aria-label":`pagination`,"data-slot":`pagination`,className:r(`mx-auto flex w-full justify-center`,e),...t})}function f({className:e,...t}){return(0,v.jsx)(`ul`,{"data-slot":`pagination-content`,className:r(`flex items-center gap-0.5`,e),...t})}function p({...e}){return(0,v.jsx)(`li`,{"data-slot":`pagination-item`,...e})}function m({className:e,isActive:t,size:n=`icon`,...i}){return(0,v.jsx)(u,{asChild:!0,variant:t?`outline`:`ghost`,size:n,className:r(e),children:(0,v.jsx)(`a`,{"aria-current":t?`page`:void 0,"data-slot":`pagination-link`,"data-active":t,...i})})}function h({className:e,text:t=`Previous`,...n}){return(0,v.jsxs)(m,{"aria-label":`Go to previous page`,size:`default`,className:r(`pl-1.5!`,e),...n,children:[(0,v.jsx)(s,{"data-icon":`inline-start`}),(0,v.jsx)(`span`,{className:`hidden sm:block`,children:t})]})}function g({className:e,text:t=`Next`,...n}){return(0,v.jsxs)(m,{"aria-label":`Go to next page`,size:`default`,className:r(`pr-1.5!`,e),...n,children:[(0,v.jsx)(`span`,{className:`hidden sm:block`,children:t}),(0,v.jsx)(o,{"data-icon":`inline-end`})]})}function _({className:e,...t}){return(0,v.jsxs)(`span`,{"aria-hidden":!0,"data-slot":`pagination-ellipsis`,className:r(`flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4`,e),...t,children:[(0,v.jsx)(a,{}),(0,v.jsx)(`span`,{className:`sr-only`,children:`More pages`})]})}var v,y=e((()=>{v=t(),n(),i(),l(),c(),d.__docgenInfo={description:``,methods:[],displayName:`Pagination`},f.__docgenInfo={description:``,methods:[],displayName:`PaginationContent`},_.__docgenInfo={description:``,methods:[],displayName:`PaginationEllipsis`},p.__docgenInfo={description:``,methods:[],displayName:`PaginationItem`},m.__docgenInfo={description:``,methods:[],displayName:`PaginationLink`,props:{size:{defaultValue:{value:`'icon'`,computed:!1},required:!1}}},g.__docgenInfo={description:``,methods:[],displayName:`PaginationNext`,props:{text:{defaultValue:{value:`'Next'`,computed:!1},required:!1}}},h.__docgenInfo={description:``,methods:[],displayName:`PaginationPrevious`,props:{text:{defaultValue:{value:`'Previous'`,computed:!1},required:!1}}}})),b,x,S,C;e((()=>{b=t(),y(),x={title:`UI/Pagination`,component:d,tags:[`autodocs`]},S={render:()=>(0,b.jsx)(d,{children:(0,b.jsxs)(f,{children:[(0,b.jsx)(p,{children:(0,b.jsx)(h,{href:`#`})}),(0,b.jsx)(p,{children:(0,b.jsx)(m,{href:`#`,children:`1`})}),(0,b.jsx)(p,{children:(0,b.jsx)(m,{href:`#`,isActive:!0,children:`2`})}),(0,b.jsx)(p,{children:(0,b.jsx)(m,{href:`#`,children:`3`})}),(0,b.jsx)(p,{children:(0,b.jsx)(_,{})}),(0,b.jsx)(p,{children:(0,b.jsx)(g,{href:`#`})})]})})},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...S.parameters?.docs?.source}}},C=[`Default`]}))();export{S as Default,C as __namedExportsOrder,x as default};