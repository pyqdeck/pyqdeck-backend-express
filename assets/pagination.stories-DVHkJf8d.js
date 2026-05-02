import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,o as r,s as i,xi as a}from"./iframe-v22JUpF8.js";import{F as o,K as s,q as c,t as l}from"./lucide-react-CxBRhVC1.js";import{r as u,t as d}from"./button-CuVJ5O-Q.js";function f({className:e,...t}){return(0,y.jsx)(`nav`,{role:`navigation`,"aria-label":`pagination`,"data-slot":`pagination`,className:r(`mx-auto flex w-full justify-center`,e),...t})}function p({className:e,...t}){return(0,y.jsx)(`ul`,{"data-slot":`pagination-content`,className:r(`flex items-center gap-0.5`,e),...t})}function m({...e}){return(0,y.jsx)(`li`,{"data-slot":`pagination-item`,...e})}function h({className:e,isActive:t,size:n=`icon`,...i}){return(0,y.jsx)(d,{asChild:!0,variant:t?`outline`:`ghost`,size:n,className:r(e),children:(0,y.jsx)(`a`,{"aria-current":t?`page`:void 0,"data-slot":`pagination-link`,"data-active":t,...i})})}function g({className:e,text:t=`Previous`,...n}){return(0,y.jsxs)(h,{"aria-label":`Go to previous page`,size:`default`,className:r(`pl-1.5!`,e),...n,children:[(0,y.jsx)(c,{"data-icon":`inline-start`}),(0,y.jsx)(`span`,{className:`hidden sm:block`,children:t})]})}function _({className:e,text:t=`Next`,...n}){return(0,y.jsxs)(h,{"aria-label":`Go to next page`,size:`default`,className:r(`pr-1.5!`,e),...n,children:[(0,y.jsx)(`span`,{className:`hidden sm:block`,children:t}),(0,y.jsx)(s,{"data-icon":`inline-end`})]})}function v({className:e,...t}){return(0,y.jsxs)(`span`,{"aria-hidden":!0,"data-slot":`pagination-ellipsis`,className:r(`flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4`,e),...t,children:[(0,y.jsx)(o,{}),(0,y.jsx)(`span`,{className:`sr-only`,children:`More pages`})]})}var y,b=e((()=>{y=t(n(),1),a(),i(),u(),l(),f.__docgenInfo={description:``,methods:[],displayName:`Pagination`},p.__docgenInfo={description:``,methods:[],displayName:`PaginationContent`},v.__docgenInfo={description:``,methods:[],displayName:`PaginationEllipsis`},m.__docgenInfo={description:``,methods:[],displayName:`PaginationItem`},h.__docgenInfo={description:``,methods:[],displayName:`PaginationLink`,props:{size:{defaultValue:{value:`'icon'`,computed:!1},required:!1}}},_.__docgenInfo={description:``,methods:[],displayName:`PaginationNext`,props:{text:{defaultValue:{value:`'Next'`,computed:!1},required:!1}}},g.__docgenInfo={description:``,methods:[],displayName:`PaginationPrevious`,props:{text:{defaultValue:{value:`'Previous'`,computed:!1},required:!1}}}})),x,S,C,w;e((()=>{x=t(n(),1),b(),S={title:`UI/Pagination`,component:f,tags:[`autodocs`]},C={render:()=>(0,x.jsx)(f,{children:(0,x.jsxs)(p,{children:[(0,x.jsx)(m,{children:(0,x.jsx)(g,{href:`#`})}),(0,x.jsx)(m,{children:(0,x.jsx)(h,{href:`#`,children:`1`})}),(0,x.jsx)(m,{children:(0,x.jsx)(h,{href:`#`,isActive:!0,children:`2`})}),(0,x.jsx)(m,{children:(0,x.jsx)(h,{href:`#`,children:`3`})}),(0,x.jsx)(m,{children:(0,x.jsx)(v,{})}),(0,x.jsx)(m,{children:(0,x.jsx)(_,{href:`#`})})]})})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w=[`Default`]}))();export{C as Default,w as __namedExportsOrder,S as default};