import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,xi as r}from"./iframe-CDR7JB0Z.js";import{c as i,t as a}from"./lucide-react-CqzFfyNJ.js";import{n as o,t as s}from"./dist-DwLJy-Q9.js";import{a as c,c as l,i as u,n as d,o as f,r as p,s as m,t as h,u as g}from"./alert-dialog-Ce9FBWwH.js";function _({branch:e,open:t,onOpenChange:n,onDelete:r,loading:a=!1}){return(0,v.jsx)(h,{open:t,onOpenChange:n,children:(0,v.jsxs)(u,{className:`border-2 shadow-none`,children:[(0,v.jsxs)(m,{children:[(0,v.jsx)(`div`,{className:`bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full`,children:(0,v.jsx)(i,{className:`text-destructive h-6 w-6`})}),(0,v.jsx)(l,{className:`font-roboto text-xl font-bold`,children:`Delete Branch?`}),(0,v.jsxs)(c,{className:`font-roboto`,children:[`This will permanently delete`,` `,(0,v.jsx)(`span`,{className:`text-foreground font-bold`,children:e?.name}),` `,`and all its associated semesters, subjects and question papers. This action cannot be undone.`]})]}),(0,v.jsxs)(f,{children:[(0,v.jsx)(p,{className:`font-roboto border-2 font-bold shadow-none`,children:`Cancel`}),(0,v.jsx)(d,{onClick:e=>{e.preventDefault(),r?.()},disabled:a,className:`bg-destructive text-destructive-foreground font-roboto hover:bg-destructive/90 border-2 border-transparent font-bold shadow-none`,children:a?`Deleting...`:`Delete Branch`})]})]})})}var v,y=e((()=>{v=t(n(),1),r(),a(),g(),_.__docgenInfo={description:``,methods:[],displayName:`DeleteBranchDialogView`,props:{loading:{defaultValue:{value:`false`,computed:!1},required:!1}}}})),b,x,S,C,w;e((()=>{y(),o(),b={title:`Studio/Academics/DeleteBranchDialog`,component:_,tags:[`autodocs`],parameters:{layout:`centered`}},x={id:`b1`,name:`Computer Engineering`,universityId:`u1`},S={args:{branch:x,open:!0,onOpenChange:s(),onDelete:s(),loading:!1}},C={args:{...S.args,loading:!0}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    branch: mockBranch,
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