import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-m_Vjo8Ag.js";import{c as i,t as a}from"./lucide-react-C9a0tzUo.js";import{n as o,t as s}from"./dist-DwLJy-Q9.js";import{a as c,c as l,i as u,n as d,o as f,r as p,s as m,t as h,u as g}from"./alert-dialog-XfcEuzAf.js";function _({subject:e,open:t,onOpenChange:n,onDelete:r,loading:a=!1}){return(0,v.jsx)(h,{open:t,onOpenChange:n,children:(0,v.jsxs)(u,{className:`border-2 shadow-none`,children:[(0,v.jsxs)(m,{children:[(0,v.jsx)(`div`,{className:`bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full`,children:(0,v.jsx)(i,{className:`text-destructive h-6 w-6`})}),(0,v.jsx)(l,{className:`font-roboto text-destructive text-xl font-bold`,children:`Remove Subject?`}),(0,v.jsxs)(c,{className:`font-roboto text-sm`,children:[`You are about to delete`,` `,(0,v.jsx)(`span`,{className:`text-foreground font-bold`,children:e?.name}),` `,`from the curriculum database. This will also disconnect all associated subject offerings and syllabus materials.`,(0,v.jsx)(`br`,{}),(0,v.jsx)(`br`,{}),(0,v.jsx)(`span`,{className:`font-bold`,children:`This action cannot be undone.`})]})]}),(0,v.jsxs)(f,{children:[(0,v.jsx)(p,{className:`font-roboto border-2 font-bold shadow-none`,children:`Cancel`}),(0,v.jsx)(d,{onClick:e=>{e.preventDefault(),r?.()},disabled:a,className:`bg-destructive text-destructive-foreground font-roboto hover:bg-destructive/90 border-2 border-transparent font-bold shadow-none`,children:a?`Removing...`:`Confirm Deletion`})]})]})})}var v,y=e((()=>{v=t(n(),1),r(),a(),g(),_.__docgenInfo={description:``,methods:[],displayName:`DeleteSubjectDialogView`,props:{loading:{defaultValue:{value:`false`,computed:!1},required:!1}}}})),b,x,S,C,w;e((()=>{y(),o(),b={title:`Studio/Academics/DeleteSubjectDialog`,component:_,tags:[`autodocs`],parameters:{layout:`centered`}},x={id:`s1`,name:`Data Structures and Algorithms`},S={args:{subject:x,open:!0,onOpenChange:s(),onDelete:s(),loading:!1}},C={args:{...S.args,loading:!0}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    subject: mockSubject,
    open: true,
    onOpenChange: fn(),
    onDelete: fn(),
    loading: false
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    loading: true
  }
}`,...C.parameters?.docs?.source}}},w=[`Default`,`Deleting`]}))();export{S as Default,C as Deleting,w as __namedExportsOrder,b as default};