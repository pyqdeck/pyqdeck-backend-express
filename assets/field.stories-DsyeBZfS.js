import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-DINbWwyu.js";import{a as r,n as i,o as a,r as o,t as s}from"./field-D5RprsOM.js";import{n as c,t as l}from"./input-DbQT98zu.js";var u,d,f,p,m,h;e((()=>{u=t(n(),1),a(),c(),d={title:`UI/Field`,component:s,tags:[`autodocs`]},f={render:()=>(0,u.jsxs)(s,{children:[(0,u.jsx)(r,{children:`Email`}),(0,u.jsx)(l,{placeholder:`Enter your email`}),(0,u.jsx)(i,{children:`We'll never share your email.`})]})},p={render:()=>(0,u.jsxs)(s,{"data-invalid":`true`,children:[(0,u.jsx)(r,{children:`Username`}),(0,u.jsx)(l,{placeholder:`Enter username`}),(0,u.jsx)(o,{children:`Username is already taken.`})]})},m={render:()=>(0,u.jsxs)(s,{orientation:`horizontal`,className:`items-center`,children:[(0,u.jsx)(r,{className:`w-32`,children:`Username`}),(0,u.jsx)(`div`,{className:`flex-1`,children:(0,u.jsx)(l,{placeholder:`Enter username`})})]})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Field>
      <FieldLabel>Email</FieldLabel>
      <Input placeholder="Enter your email" />
      <FieldDescription>We&apos;ll never share your email.</FieldDescription>
    </Field>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Field data-invalid="true">
      <FieldLabel>Username</FieldLabel>
      <Input placeholder="Enter username" />
      <FieldError>Username is already taken.</FieldError>
    </Field>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Field orientation="horizontal" className="items-center">
      <FieldLabel className="w-32">Username</FieldLabel>
      <div className="flex-1">
        <Input placeholder="Enter username" />
      </div>
    </Field>
}`,...m.parameters?.docs?.source}}},h=[`Default`,`WithError`,`Horizontal`]}))();export{f as Default,m as Horizontal,p as WithError,h as __namedExportsOrder,d as default};