import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r,Gr as i,Hr as a,Kr as o,Wr as s,a as c,i as l,n as u,o as ee,r as te,s as ne,t as d}from"./iframe-DyKp0Sbj.js";import{D as re,M as ie,W as ae,X as oe,at as f,d as p,rt as m,t as h}from"./lucide-react-Bn_WhITf.js";import{r as g,t as _}from"./button-C7vRj7f8.js";import{n as v,t as y}from"./dist-Cc0aPTuP.js";import{c as b,i as x,l as S,n as C,o as w,s as se,t as ce}from"./table-y8M3IKhJ.js";import{a as le,c as ue,r as de,t as fe}from"./card-CJSSTjYH.js";import{n as pe,t as me}from"./badge-BfJmYZ22.js";import{a as T,i as E,o as D,r as O,s as k,t as A}from"./empty-2PmpfETf.js";import{t as j}from"./link-DkmuJDHP.js";import{a as M,g as N,h as P,o as F,r as I,t as L,u as R}from"./dropdown-menu-DP-gzvY_.js";import{a as z,c as he,i as B,n as ge,o as _e,r as ve,s as ye,t as be}from"./pagination-DPKw2i5o.js";import{o as xe,r as Se,s as Ce,t as we}from"./avatar-DNii3_V5.js";function V({label:e,tooltip:t,trigger:n,children:r,align:i=`end`,contentClassName:a,showSeparator:o=!0}){let s=n||(0,H.jsxs)(_,{variant:`outline`,size:`icon`,className:`h-8 w-8 border-2 shadow-none`,children:[(0,H.jsx)(f,{className:`h-4 w-4`}),(0,H.jsx)(`span`,{className:`sr-only`,children:`Open actions`})]}),c=(0,H.jsxs)(I,{align:i,className:ee(`font-roboto w-56 border-2 p-2 shadow-none`,a),children:[e&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(F,{className:`text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase`,children:e}),o&&(0,H.jsx)(R,{className:`my-1 border-b`})]}),r]});return(0,H.jsxs)(L,{children:[t?(0,H.jsx)(te,{children:(0,H.jsxs)(d,{children:[(0,H.jsx)(l,{asChild:!0,children:(0,H.jsx)(P,{asChild:!0,children:s})}),(0,H.jsx)(u,{className:`font-roboto font-bold`,children:t})]})}):(0,H.jsx)(P,{asChild:!0,children:s}),c]})}var H,Te=e((()=>{H=t(n(),1),r(),h(),N(),g(),c(),ne(),V.__docgenInfo={description:`A reusable action menu that combines a DropdownMenu with an optional Tooltip.

@param {Object} props
@param {string} [props.label] - Optional header label for the menu.
@param {string} [props.tooltip] - Optional tooltip text for the trigger button.
@param {React.ReactNode} [props.trigger] - Custom trigger element. Defaults to a MoreVertical icon button.
@param {React.ReactNode} props.children - Menu items.
@param {string} [props.align="end"] - Alignment of the dropdown content.
@param {string} [props.contentClassName] - Additional classes for the dropdown content.
@param {boolean} [props.showSeparator=true] - Whether to show a separator after the label.`,methods:[],displayName:`DropdownAction`,props:{align:{defaultValue:{value:`'end'`,computed:!1},required:!1},showSeparator:{defaultValue:{value:`true`,computed:!1},required:!1}}}}));function U({universities:e,pagination:t,onEdit:n,onDelete:r}){let a=o(),c=a?.get(`search`)||``,l=i(),u=s();return(0,W.jsxs)(fe,{className:`border-border/50 overflow-hidden border-2 py-0 shadow-none`,children:[(0,W.jsx)(de,{className:`overflow-x-auto p-0`,children:(0,W.jsxs)(ce,{className:`min-w-[500px]`,children:[(0,W.jsx)(se,{children:(0,W.jsxs)(b,{className:`bg-muted/30 border-b-2 hover:bg-transparent`,children:[(0,W.jsx)(w,{className:`text-foreground font-roboto h-12 px-6 font-bold`,children:`Institution`}),(0,W.jsx)(w,{className:`text-foreground font-roboto hidden h-12 px-6 font-bold sm:table-cell`,children:`Location`}),(0,W.jsx)(w,{className:`text-foreground font-roboto h-12 px-6 font-bold`,children:`Status`}),(0,W.jsx)(w,{className:`text-foreground font-roboto h-12 w-[100px] px-6 text-right font-bold`,children:`Actions`})]})}),(0,W.jsx)(C,{children:e.length===0?(0,W.jsx)(b,{children:(0,W.jsx)(x,{colSpan:4,className:`h-72 p-0`,children:(0,W.jsxs)(A,{className:`border-0 shadow-none`,children:[(0,W.jsxs)(E,{children:[(0,W.jsx)(T,{variant:`icon`,children:(0,W.jsx)(re,{className:`size-4`})}),(0,W.jsx)(D,{className:`text-lg`,children:c?`No matching universities`:`No universities found`}),(0,W.jsx)(O,{children:c?`We couldn't find any results for "${c}". Try adjusting your filters or search term.`:`Add your first institution to start managing your academic database.`})]}),c&&(0,W.jsx)(_,{variant:`outline`,onClick:()=>{let e=new URLSearchParams(a?.toString()||``);e.delete(`search`),e.set(`page`,`1`),l.push(`${u}?${e.toString()}`)},className:`mt-2 border-2`,children:`Clear Search`})]})})}):e.map(e=>(0,W.jsxs)(b,{className:`group border-b`,children:[(0,W.jsx)(x,{className:`px-6 py-4`,children:(0,W.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,W.jsxs)(we,{className:`border-muted bg-muted/50 size-12 rounded-lg border-2 after:rounded-lg`,children:[(0,W.jsx)(xe,{src:e.logo,alt:e.name,className:`rounded-lg object-contain`}),(0,W.jsx)(Se,{className:`rounded-lg text-lg font-bold`,children:e.name.charAt(0)})]}),(0,W.jsxs)(`div`,{className:`flex min-w-0 flex-col`,children:[(0,W.jsxs)(`span`,{className:`text-foreground group-hover:text-primary font-roboto flex items-center gap-1.5 truncate font-bold transition-colors`,children:[e.name,e.websiteUrl&&(0,W.jsx)(G.default,{href:e.websiteUrl,target:`_blank`,className:`text-muted-foreground hover:text-primary transition-colors`,children:(0,W.jsx)(m,{className:`size-3`})})]}),(0,W.jsxs)(`div`,{className:`flex items-center gap-2 leading-none`,children:[(0,W.jsx)(`span`,{className:`text-muted-foreground font-roboto text-[10px] font-bold tracking-wider uppercase`,children:e.shortName}),(0,W.jsx)(`span`,{className:`text-muted-foreground/30`,children:`•`}),(0,W.jsxs)(`span`,{className:`text-muted-foreground font-roboto text-xs lowercase`,children:[`/`,e.slug]})]})]})]})}),(0,W.jsx)(x,{className:`hidden px-6 py-4 sm:table-cell`,children:(0,W.jsxs)(`div`,{className:`flex flex-col`,children:[(0,W.jsx)(`span`,{className:`text-foreground font-roboto text-sm font-semibold`,children:e.state||`N/A`}),(0,W.jsx)(`span`,{className:`text-muted-foreground font-roboto text-xs`,children:e.country||`India`})]})}),(0,W.jsx)(x,{className:`px-6 py-4`,children:(0,W.jsx)(me,{variant:e.isActive===!1?`secondary`:`default`,className:`font-roboto rounded-full px-2.5 py-0.5 font-semibold ${e.isActive===!1?`bg-muted text-muted-foreground`:`bg-success/10 text-success hover:bg-success/10`}`,children:e.isActive===!1?`Inactive`:`Active`})}),(0,W.jsx)(x,{className:`px-6 py-4 text-right`,children:(0,W.jsxs)(V,{label:`Management`,trigger:(0,W.jsxs)(_,{variant:`ghost`,className:`hover:bg-muted/50 size-9 border-2 p-0 transition-colors`,children:[(0,W.jsx)(`span`,{className:`sr-only`,children:`Open menu`}),(0,W.jsx)(f,{className:`size-4`})]}),children:[(0,W.jsxs)(M,{className:`focus:bg-primary/5 group cursor-pointer rounded-md py-2.5`,onClick:()=>n(e),children:[(0,W.jsx)(ie,{className:`text-muted-foreground group-hover:text-primary mr-3 size-4 transition-colors`}),(0,W.jsx)(`span`,{className:`font-medium`,children:`Edit University`})]}),e.websiteUrl&&(0,W.jsx)(M,{asChild:!0,className:`focus:bg-primary/5 group cursor-pointer rounded-md py-2.5`,children:(0,W.jsxs)(G.default,{href:e.websiteUrl,target:`_blank`,rel:`noopener noreferrer`,className:`flex w-full items-center`,children:[(0,W.jsx)(m,{className:`text-muted-foreground group-hover:text-primary mr-3 size-4 transition-colors`}),(0,W.jsx)(`span`,{className:`font-medium`,children:`Visit Website`})]})}),(0,W.jsx)(R,{className:`my-1 border-b`}),(0,W.jsx)(M,{asChild:!0,className:`focus:bg-primary/5 group cursor-pointer rounded-md py-2.5`,children:(0,W.jsxs)(G.default,{href:`/studio/branches?universityId=${e.id}`,className:`flex w-full items-center`,children:[(0,W.jsx)(ae,{className:`text-muted-foreground group-hover:text-primary mr-3 size-4 transition-colors`}),(0,W.jsx)(`span`,{className:`text-primary font-medium`,children:`View Branches`})]})}),(0,W.jsx)(M,{asChild:!0,className:`focus:bg-primary/5 group cursor-pointer rounded-md py-2.5`,children:(0,W.jsxs)(G.default,{href:`/studio/semesters?universityId=${e.id}`,className:`flex w-full items-center`,children:[(0,W.jsx)(oe,{className:`text-muted-foreground group-hover:text-warning mr-3 size-4 transition-colors`}),(0,W.jsx)(`span`,{className:`text-warning font-medium`,children:`View Semesters`})]})}),(0,W.jsx)(R,{className:`my-1 border-b`}),(0,W.jsxs)(M,{className:`text-destructive focus:text-destructive focus:bg-destructive/5 group cursor-pointer rounded-md py-2.5`,onClick:()=>r(e),children:[(0,W.jsx)(p,{className:`text-destructive/70 group-hover:text-destructive mr-3 size-4 transition-colors`}),(0,W.jsx)(`span`,{className:`font-bold`,children:`Delete Institution`})]})]})})]},e.id))})]})}),t&&t.pages>1&&(0,W.jsxs)(le,{className:`flex-col items-start gap-4 border-t-2 pt-6 sm:flex-row sm:items-center`,children:[(0,W.jsx)(be,{className:`mx-0 w-auto justify-start`,children:(0,W.jsxs)(ge,{children:[(0,W.jsx)(B,{children:(0,W.jsx)(ye,{href:t.current>1?`?page=${t.current-1}`:`#`,className:t.current===1?`pointer-events-none opacity-50`:`border-2`})}),[...Array(t.pages)].map((e,n)=>{let r=n+1;return r===1||r===t.pages||r>=t.current-1&&r<=t.current+1?(0,W.jsx)(B,{children:(0,W.jsx)(z,{href:`?page=${r}`,isActive:r===t.current,className:`font-roboto border-2 font-bold`,children:r})},r):r===t.current-2||r===t.current+2?(0,W.jsx)(B,{children:(0,W.jsx)(ve,{})},r):null}),(0,W.jsx)(B,{children:(0,W.jsx)(_e,{href:t.current<t.pages?`?page=${t.current+1}`:`#`,className:t.current===t.pages?`pointer-events-none opacity-50`:`border-2`})})]})}),(0,W.jsxs)(`div`,{className:`text-muted-foreground font-roboto text-sm sm:ml-auto`,children:[`Showing`,` `,(0,W.jsx)(`span`,{className:`text-foreground font-bold`,children:(t.current-1)*10+1}),` `,`to`,` `,(0,W.jsx)(`span`,{className:`text-foreground font-bold`,children:Math.min(t.current*10,t.total)}),` `,`of`,` `,(0,W.jsx)(`span`,{className:`text-foreground font-bold`,children:t.total}),` `,`entries`]})]})]})}var W,G,Ee=e((()=>{W=t(n(),1),r(),a(),G=t(j(),1),Te(),N(),h(),ue(),S(),Ce(),pe(),g(),k(),he(),U.__docgenInfo={description:``,methods:[],displayName:`UniversitiesTableView`}})),K,q,J,Y,X,Z,Q,$;e((()=>{Ee(),v(),K={title:`Studio/Academics/UniversitiesTableView`,component:U,tags:[`autodocs`],args:{onSearchChange:y(),onEdit:y(),onDelete:y()}},q=[{id:`1`,name:`University of Mumbai`,shortName:`MU`,slug:`mumbai-university`,logo:`https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/University_of_Mumbai_logo.png/220px-University_of_Mumbai_logo.png`,state:`Maharashtra`,country:`India`,websiteUrl:`https://mu.ac.in`,isActive:!0},{id:`2`,name:`Delhi University`,shortName:`DU`,slug:`delhi-university`,logo:``,state:`Delhi`,country:`India`,websiteUrl:`https://du.ac.in`,isActive:!0},{id:`3`,name:`Indian Institute of Technology Bombay`,shortName:`IITB`,slug:`iit-bombay`,logo:`https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/IIT_Bombay_Logo.svg/1200px-IIT_Bombay_Logo.svg.png`,state:`Maharashtra`,country:`India`,websiteUrl:`https://iitb.ac.in`,isActive:!0},{id:`4`,name:`Savitribai Phule Pune University`,shortName:`SPPU`,slug:`pune-university`,logo:``,state:`Maharashtra`,country:`India`,websiteUrl:`https://unipune.ac.in`,isActive:!1}],J={args:{universities:q,pagination:{total:4,pages:1,current:1},search:``}},Y={args:{universities:q,pagination:{total:45,pages:5,current:2},search:``}},X={args:{universities:[q[0]],pagination:{total:1,pages:1,current:1},search:`Mumbai`},parameters:{nextjs:{navigation:{query:{search:`Mumbai`}}}}},Z={args:{universities:[],pagination:{total:0,pages:0,current:0},search:``}},Q={args:{universities:[],pagination:{total:0,pages:0,current:0},search:`Something that does not exist`},parameters:{nextjs:{navigation:{query:{search:`Something that does not exist`}}}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          search: 'Mumbai'
        }
      }
    }
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
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          search: 'Something that does not exist'
        }
      }
    }
  }
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`WithPagination`,`Searching`,`Empty`,`NoResults`]}))();export{J as Default,Z as Empty,Q as NoResults,X as Searching,Y as WithPagination,$ as __namedExportsOrder,K as default};