import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,xi as r}from"./iframe-C3c6E3cA.js";import{H as i,S as ee,W as te,b as a,d as o,t as s}from"./lucide-react-DKTBuAIS.js";import{r as c,t as l}from"./button-jIEtzpup.js";import{n as ne,t as re}from"./input-BID50Ohj.js";import{c as u,i as d,l as ie,n as ae,o as f,s as p,t as m}from"./table-B3yayWp_.js";import{a as h,i as g,n as _,o as v,r as oe,s as se,t as y}from"./card-BJSDB9Ad.js";import{n as b,t as x}from"./badge-B1-b1Jnu.js";import{n as S,t as C}from"./dist-BS5ucfep.js";import{t as w}from"./link-BI8TggCJ.js";import{a as T,n as E,o as D,t as O}from"./avatar-Nr43jlYK.js";import{a as k,c as A,i as j,n as M,o as N,r as ce,s as P,t as F}from"./pagination-sNx3umA1.js";import{a as I,f as L,i as R,n as z,p as B,s as V,t as H}from"./dropdown-menu-BP86By4X.js";function U({universities:e,pagination:t,search:n,onSearchChange:r,onEdit:s,onDelete:c}){return(0,W.jsxs)(y,{className:`border-border/50 border-2 shadow-none`,children:[(0,W.jsx)(h,{className:`pb-3`,children:(0,W.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(v,{className:`font-roboto text-xl`,children:`Institution Database`}),(0,W.jsxs)(oe,{className:`font-roboto`,children:[`Total `,t?.total||e.length,` universities registered.`]})]}),(0,W.jsxs)(`div`,{className:`relative w-72`,children:[(0,W.jsx)(a,{className:`text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2`}),(0,W.jsx)(re,{placeholder:`Search universities...`,className:`font-roboto border-2 pl-9 focus-visible:ring-0`,value:n,onChange:e=>r(e.target.value)})]})]})}),(0,W.jsx)(_,{children:(0,W.jsxs)(m,{children:[(0,W.jsx)(p,{children:(0,W.jsxs)(u,{className:`border-b-2 hover:bg-transparent`,children:[(0,W.jsx)(f,{className:`text-foreground font-roboto w-[400px] font-bold`,children:`Institution`}),(0,W.jsx)(f,{className:`text-foreground font-roboto font-bold`,children:`State`}),(0,W.jsx)(f,{className:`text-foreground font-roboto font-bold`,children:`Country`}),(0,W.jsx)(f,{className:`text-foreground font-roboto font-bold`,children:`Status`}),(0,W.jsx)(f,{className:`text-foreground font-roboto w-[100px] text-right font-bold`,children:`Actions`})]})}),(0,W.jsx)(ae,{children:e.length===0?(0,W.jsx)(u,{children:(0,W.jsx)(d,{colSpan:5,className:`text-muted-foreground font-roboto h-48 text-center italic`,children:n?`No universities match your search.`:`No universities found. Add your first institution to get started!`})}):e.map(e=>(0,W.jsxs)(u,{className:`group border-b`,children:[(0,W.jsx)(d,{className:`py-4`,children:(0,W.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,W.jsxs)(O,{className:`border-muted bg-muted/50 h-12 w-12 rounded-lg border-2`,children:[(0,W.jsx)(T,{src:e.logo,alt:e.name}),(0,W.jsx)(E,{className:`rounded-lg`,children:e.name.charAt(0)})]}),(0,W.jsxs)(`div`,{className:`flex flex-col`,children:[(0,W.jsxs)(`span`,{className:`text-foreground group-hover:text-primary font-roboto flex cursor-pointer items-center gap-1 font-bold transition-colors`,children:[e.name,(0,W.jsx)(i,{className:`h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100`})]}),(0,W.jsxs)(`span`,{className:`text-muted-foreground font-roboto text-xs lowercase`,children:[`/`,e.slug]})]})]})}),(0,W.jsx)(d,{children:(0,W.jsx)(`div`,{className:`text-foreground font-roboto text-sm font-medium`,children:e.state||`N/A`})}),(0,W.jsx)(d,{children:(0,W.jsx)(`div`,{className:`text-muted-foreground font-roboto flex items-center gap-2 text-sm`,children:e.country||`India`})}),(0,W.jsx)(d,{children:(0,W.jsx)(x,{variant:e.isActive===!1?`secondary`:`default`,className:`font-roboto rounded-full px-2.5 py-0.5 font-semibold ${e.isActive===!1?`bg-muted text-muted-foreground`:`bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400`}`,children:e.isActive===!1?`Inactive`:`Active`})}),(0,W.jsx)(d,{className:`text-right`,children:(0,W.jsxs)(H,{children:[(0,W.jsx)(L,{asChild:!0,children:(0,W.jsxs)(l,{variant:`ghost`,className:`hover:bg-muted/50 h-9 w-9 border-2 p-0 transition-colors`,children:[(0,W.jsx)(`span`,{className:`sr-only`,children:`Open menu`}),(0,W.jsx)(te,{className:`h-4 w-4`})]})}),(0,W.jsxs)(z,{align:`end`,className:`font-roboto w-56 border-2 p-2 shadow-none`,children:[(0,W.jsx)(I,{className:`text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase`,children:`Management`}),(0,W.jsx)(V,{className:`my-1 border-b`}),(0,W.jsxs)(R,{className:`focus:bg-primary/5 group cursor-pointer rounded-md py-2.5`,onClick:()=>s(e),children:[(0,W.jsx)(ee,{className:`text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors`}),(0,W.jsx)(`span`,{className:`font-medium`,children:`Edit University`})]}),(0,W.jsx)(R,{asChild:!0,className:`focus:bg-primary/5 group cursor-pointer rounded-md py-2.5`,children:(0,W.jsxs)(G.default,{href:e.websiteUrl||`#`,target:`_blank`,rel:`noopener noreferrer`,className:`flex w-full items-center`,children:[(0,W.jsx)(i,{className:`text-muted-foreground group-hover:text-primary mr-3 h-4 w-4 transition-colors`}),(0,W.jsx)(`span`,{className:`font-medium`,children:`View Details`})]})}),(0,W.jsx)(V,{className:`my-1 border-b`}),(0,W.jsxs)(R,{className:`text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5`,onClick:()=>c(e),children:[(0,W.jsx)(o,{className:`text-destructive/70 group-hover:text-destructive mr-3 h-4 w-4 transition-colors`}),(0,W.jsx)(`span`,{className:`font-bold`,children:`Delete Institution`})]})]})]})})]},e.id))})]})}),t&&t.pages>1&&(0,W.jsxs)(g,{className:`border-t-2 pt-6`,children:[(0,W.jsx)(F,{className:`mx-0 w-auto justify-start`,children:(0,W.jsxs)(M,{children:[(0,W.jsx)(j,{children:(0,W.jsx)(P,{href:t.current>1?`?page=${t.current-1}`:`#`,className:t.current===1?`pointer-events-none opacity-50`:`border-2`})}),[...Array(t.pages)].map((e,n)=>{let r=n+1;return r===1||r===t.pages||r>=t.current-1&&r<=t.current+1?(0,W.jsx)(j,{children:(0,W.jsx)(k,{href:`?page=${r}`,isActive:r===t.current,className:`font-roboto border-2 font-bold`,children:r})},r):r===t.current-2||r===t.current+2?(0,W.jsx)(j,{children:(0,W.jsx)(ce,{})},r):null}),(0,W.jsx)(j,{children:(0,W.jsx)(N,{href:t.current<t.pages?`?page=${t.current+1}`:`#`,className:t.current===t.pages?`pointer-events-none opacity-50`:`border-2`})})]})}),(0,W.jsxs)(`div`,{className:`text-muted-foreground font-roboto ml-auto text-sm`,children:[`Showing`,` `,(0,W.jsx)(`span`,{className:`text-foreground font-bold`,children:(t.current-1)*10+1}),` `,`to`,` `,(0,W.jsx)(`span`,{className:`text-foreground font-bold`,children:Math.min(t.current*10,t.total)}),` `,`of`,` `,(0,W.jsx)(`span`,{className:`text-foreground font-bold`,children:t.total}),` `,`entries`]})]})]})}var W,G,le=e((()=>{W=t(n(),1),r(),s(),ie(),se(),b(),D(),c(),ne(),A(),B(),G=t(w(),1),U.__docgenInfo={description:``,methods:[],displayName:`UniversitiesTableView`}})),K,q,J,Y,X,Z,Q,$;e((()=>{le(),S(),K={title:`Studio/Universities/UniversitiesTableView`,component:U,tags:[`autodocs`],args:{onSearchChange:C(),onEdit:C(),onDelete:C()}},q=[{id:`1`,name:`University of Mumbai`,shortName:`MU`,slug:`mumbai-university`,logo:`https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/University_of_Mumbai_logo.png/220px-University_of_Mumbai_logo.png`,state:`Maharashtra`,country:`India`,websiteUrl:`https://mu.ac.in`,isActive:!0},{id:`2`,name:`Delhi University`,shortName:`DU`,slug:`delhi-university`,logo:``,state:`Delhi`,country:`India`,websiteUrl:`https://du.ac.in`,isActive:!0},{id:`3`,name:`Indian Institute of Technology Bombay`,shortName:`IITB`,slug:`iit-bombay`,logo:`https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/IIT_Bombay_Logo.svg/1200px-IIT_Bombay_Logo.svg.png`,state:`Maharashtra`,country:`India`,websiteUrl:`https://iitb.ac.in`,isActive:!0},{id:`4`,name:`Savitribai Phule Pune University`,shortName:`SPPU`,slug:`pune-university`,logo:``,state:`Maharashtra`,country:`India`,websiteUrl:`https://unipune.ac.in`,isActive:!1}],J={args:{universities:q,pagination:{total:4,pages:1,current:1},search:``}},Y={args:{universities:q,pagination:{total:45,pages:5,current:2},search:``}},X={args:{universities:[q[0]],pagination:{total:1,pages:1,current:1},search:`Mumbai`}},Z={args:{universities:[],pagination:{total:0,pages:0,current:0},search:``}},Q={args:{universities:[],pagination:{total:0,pages:0,current:0},search:`Something that does not exist`}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    universities: mockUniversities,
    pagination: {
      total: 4,
      pages: 1,
      current: 1
    },
    search: ''
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    universities: mockUniversities,
    pagination: {
      total: 45,
      pages: 5,
      current: 2
    },
    search: ''
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    universities: [mockUniversities[0]],
    pagination: {
      total: 1,
      pages: 1,
      current: 1
    },
    search: 'Mumbai'
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    universities: [],
    pagination: {
      total: 0,
      pages: 0,
      current: 0
    },
    search: ''
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    universities: [],
    pagination: {
      total: 0,
      pages: 0,
      current: 0
    },
    search: 'Something that does not exist'
  }
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`WithPagination`,`Searching`,`Empty`,`NoResults`]}))();export{J as Default,Z as Empty,Q as NoResults,X as Searching,Y as WithPagination,$ as __namedExportsOrder,K as default};