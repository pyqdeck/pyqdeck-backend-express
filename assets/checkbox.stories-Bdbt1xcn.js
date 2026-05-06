import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r,Ln as i,Rn as a,o,s,u as c}from"./iframe-BVyBimCE.js";import{Ct as l,t as u}from"./lucide-react-B6Wjw9Zj.js";import{n as d,t as f}from"./label-BUWH9FTv.js";import{n as p,t as m}from"./dist-Cc0aPTuP.js";function h({className:e,...t}){return(0,g.jsx)(i,{"data-slot":`checkbox`,className:o(`peer border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3`,e),...t,children:(0,g.jsx)(a,{"data-slot":`checkbox-indicator`,className:`grid place-content-center text-current transition-none [&>svg]:size-3.5`,children:(0,g.jsx)(l,{})})})}var g,_=e((()=>{g=t(n(),1),r(),c(),s(),u(),h.__docgenInfo={description:``,methods:[],displayName:`Checkbox`}})),v,y,b,x,S,C,w,T;e((()=>{v=t(n(),1),p(),_(),d(),y={title:`UI/Checkbox`,component:h,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{checked:{control:`boolean`,description:`The controlled checked state of the checkbox`},defaultChecked:{control:`boolean`,description:`The default checked state of the checkbox`},disabled:{control:`boolean`,description:`When true, prevents the user from interacting with the checkbox`,table:{defaultValue:{summary:`false`}}},required:{control:`boolean`,description:`When true, indicates that the user must check the checkbox before the owning form can be submitted`,table:{defaultValue:{summary:`false`}}},onCheckedChange:{description:`Event handler called when the checked state of the checkbox changes`,action:`checked change`}},args:{onCheckedChange:m()}},b={render:e=>(0,v.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,v.jsx)(h,{id:`terms`,...e}),(0,v.jsx)(f,{htmlFor:`terms`,children:`I accept the university's terms of service`})]})},x={args:{defaultChecked:!0},render:e=>(0,v.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,v.jsx)(h,{id:`checked`,...e}),(0,v.jsx)(f,{htmlFor:`checked`,children:`Mark paper as reviewed`})]})},S={args:{checked:`indeterminate`},render:e=>(0,v.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,v.jsx)(h,{id:`indeterminate`,...e}),(0,v.jsx)(f,{htmlFor:`indeterminate`,children:`Select all modules`})]})},C={args:{disabled:!0},render:e=>(0,v.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,v.jsx)(h,{id:`disabled`,...e}),(0,v.jsx)(f,{htmlFor:`disabled`,children:`This option is currently unavailable`})]})},w={args:{required:!0},render:e=>(0,v.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,v.jsx)(h,{id:`required`,...e}),(0,v.jsxs)(f,{htmlFor:`required`,children:[`Agree to privacy policy `,(0,v.jsx)(`span`,{className:`text-destructive`,children:`*`})]})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">
        I accept the university&apos;s terms of service
      </Label>
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    defaultChecked: true
  },
  render: args => <div className="flex items-center space-x-2">
      <Checkbox id="checked" {...args} />
      <Label htmlFor="checked">Mark paper as reviewed</Label>
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    checked: 'indeterminate'
  },
  render: args => <div className="flex items-center space-x-2">
      <Checkbox id="indeterminate" {...args} />
      <Label htmlFor="indeterminate">Select all modules</Label>
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: args => <div className="flex items-center space-x-2">
      <Checkbox id="disabled" {...args} />
      <Label htmlFor="disabled">This option is currently unavailable</Label>
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    required: true
  },
  render: args => <div className="flex items-center space-x-2">
      <Checkbox id="required" {...args} />
      <Label htmlFor="required">
        Agree to privacy policy <span className="text-destructive">*</span>
      </Label>
    </div>
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Checked`,`Indeterminate`,`Disabled`,`Required`]}))();export{x as Checked,b as Default,C as Disabled,S as Indeterminate,w as Required,T as __namedExportsOrder,y as default};