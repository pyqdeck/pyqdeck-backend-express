import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Si as r}from"./iframe-DvEPLiaD.js";import{b as i,t as a}from"./lucide-react-Dn19uea4.js";import{n as o,t as s}from"./label-C4DQqzUi.js";import{a as c,n as l,o as u,r as d,s as f,t as p}from"./card-DbdxJB_I.js";import{n as m,t as h}from"./switch-C_iBaGIV.js";function g({id:e,label:t,description:n,checked:r,disabled:i,onToggle:a}){return(0,v.jsxs)(`div`,{className:`flex items-start justify-between gap-4`,children:[(0,v.jsxs)(`div`,{className:`flex-1`,children:[(0,v.jsx)(s,{htmlFor:e,className:`font-roboto cursor-pointer text-sm font-medium`,children:t}),(0,v.jsx)(`p`,{className:`text-muted-foreground font-roboto mt-0.5 text-xs`,children:n})]}),(0,v.jsx)(h,{id:e,checked:r,disabled:i,onCheckedChange:a})]})}function _({settings:e,isUpdating:t,onToggle:n}){return(0,v.jsxs)(p,{className:`font-roboto`,children:[(0,v.jsxs)(c,{children:[(0,v.jsxs)(u,{className:`flex items-center gap-2`,children:[(0,v.jsx)(i,{className:`h-5 w-5`}),`General Settings`]}),(0,v.jsx)(d,{children:`Platform-wide operational flags.`})]}),(0,v.jsxs)(l,{className:`flex flex-col gap-5`,children:[(0,v.jsx)(g,{id:`devMode`,label:`Developer Mode`,description:`Enables debug logs and dev tooling across the platform.`,checked:e.devMode,disabled:t===`devMode`,onToggle:e=>n(`devMode`,e)}),(0,v.jsx)(g,{id:`contentFreeze`,label:`Content Freeze`,description:`Blocks all new papers and questions from being created by editors.`,checked:e.contentFreeze,disabled:t===`contentFreeze`,onToggle:e=>n(`contentFreeze`,e)}),(0,v.jsx)(g,{id:`maintenanceMode`,label:`Maintenance Mode`,description:`Signals that the platform is undergoing maintenance.`,checked:e.maintenanceMode,disabled:t===`maintenanceMode`,onToggle:e=>n(`maintenanceMode`,e)})]})]})}var v,y=e((()=>{v=t(n(),1),r(),a(),f(),m(),o(),_.__docgenInfo={description:``,methods:[],displayName:`GeneralSettingsCardView`}})),b,x,S,C,w,T,E,D;e((()=>{y(),b={title:`Studio/Settings/GeneralSettingsCard`,component:_,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{onToggle:{action:`toggled`}}},x={devMode:!1,contentFreeze:!1,maintenanceMode:!1},S={args:{settings:x,isUpdating:null}},C={args:{settings:{devMode:!0,contentFreeze:!0,maintenanceMode:!0},isUpdating:null}},w={args:{settings:x,isUpdating:`devMode`}},T={args:{settings:x,isUpdating:`contentFreeze`}},E={args:{settings:x,isUpdating:`maintenanceMode`}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    settings: defaultSettings,
    isUpdating: null
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    settings: {
      devMode: true,
      contentFreeze: true,
      maintenanceMode: true
    },
    isUpdating: null
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    settings: defaultSettings,
    isUpdating: 'devMode'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    settings: defaultSettings,
    isUpdating: 'contentFreeze'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    settings: defaultSettings,
    isUpdating: 'maintenanceMode'
  }
}`,...E.parameters?.docs?.source}}},D=[`Default`,`AllEnabled`,`UpdatingDevMode`,`UpdatingContentFreeze`,`UpdatingMaintenanceMode`]}))();export{C as AllEnabled,S as Default,T as UpdatingContentFreeze,w as UpdatingDevMode,E as UpdatingMaintenanceMode,D as __namedExportsOrder,b as default};