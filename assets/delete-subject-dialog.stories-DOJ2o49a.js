import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-CYxgJkJZ.js";import{n as i,t as a}from"./dist-DTXUM9xK.js";import{c as o,t as s}from"./lucide-react-dYu2m82I.js";import{a as c,d as l,i as u,l as d,n as f,o as p,r as m,s as h,t as g}from"./alert-dialog-CJz9foq5.js";function _({subject:e,open:t,onOpenChange:n,onDelete:r,loading:i=!1}){return(0,v.jsx)(g,{open:t,onOpenChange:n,children:(0,v.jsxs)(u,{className:`border-2 shadow-none`,children:[(0,v.jsxs)(h,{children:[(0,v.jsx)(`div`,{className:`bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full`,children:(0,v.jsx)(o,{className:`text-destructive h-6 w-6`})}),(0,v.jsx)(d,{className:`font-roboto text-destructive text-xl font-bold`,children:`Remove Subject?`}),(0,v.jsxs)(c,{className:`font-roboto text-sm`,children:[`You are about to delete`,` `,(0,v.jsx)(`span`,{className:`text-foreground font-bold`,children:e?.name}),` `,`from the curriculum database. This will also disconnect all associated subject offerings and syllabus materials.`,(0,v.jsx)(`br`,{}),(0,v.jsx)(`br`,{}),(0,v.jsx)(`span`,{className:`font-bold`,children:`This action cannot be undone.`})]})]}),(0,v.jsxs)(p,{children:[(0,v.jsx)(m,{className:`font-roboto border-2 font-bold shadow-none`,children:`Cancel`}),(0,v.jsx)(f,{onClick:e=>{e.preventDefault(),r?.()},disabled:i,className:`bg-destructive text-destructive-foreground font-roboto hover:bg-destructive/90 border-2 border-transparent font-bold shadow-none`,children:i?`Removing...`:`Confirm Deletion`})]})]})})}var v,y=e((()=>{v=t(n(),1),r(),s(),l(),_.__docgenInfo={description:``,methods:[],displayName:`DeleteSubjectDialogView`,props:{loading:{defaultValue:{value:`false`,computed:!1},required:!1}}}})),b,x,S,C,w;e((()=>{y(),i(),b={title:`Studio/Academics/DeleteSubjectDialog`,component:_,tags:[`autodocs`],parameters:{layout:`centered`}},x={id:`s1`,name:`Data Structures and Algorithms`},S={args:{subject:x,open:!0,onOpenChange:a(),onDelete:a(),loading:!1}},C={args:{...S.args,loading:!0}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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