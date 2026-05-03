import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-B5uGLt2-.js";import{n as r,t as i}from"./label-Djue4WdD.js";import{n as a,t as o}from"./switch-CSq_0ODi.js";var s,c,l,u,d,f;e((()=>{s=t(n(),1),a(),r(),c={title:`UI/Switch`,component:o,tags:[`autodocs`],argTypes:{size:{control:{type:`select`},options:[`default`,`sm`]}}},l={render:e=>(0,s.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,s.jsx)(o,{id:`airplane-mode`,...e}),(0,s.jsx)(i,{htmlFor:`airplane-mode`,children:`Airplane Mode`})]})},u={args:{size:`sm`},render:e=>(0,s.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,s.jsx)(o,{id:`small-mode`,...e}),(0,s.jsx)(i,{htmlFor:`small-mode`,className:`text-xs`,children:`Small Toggle`})]})},d={args:{defaultChecked:!0}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'sm'
  },
  render: args => <div className="flex items-center space-x-2">
      <Switch id="small-mode" {...args} />
      <Label htmlFor="small-mode" className="text-xs">
        Small Toggle
      </Label>
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    defaultChecked: true
  }
}`,...d.parameters?.docs?.source}}},f=[`Default`,`Small`,`Checked`]}))();export{d as Checked,l as Default,u as Small,f as __namedExportsOrder,c as default};