import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-CebCo9-G.js";import{a as r,c as i,i as a,l as o,n as s,o as c,r as l,s as u,t as d}from"./select-yr-Iyetd.js";import{n as f,t as p}from"./dist-Cc0aPTuP.js";var m,h,g,_,v,y,b,x;e((()=>{m=t(n(),1),f(),o(),h={title:`UI/Select`,component:d,tags:[`autodocs`],argTypes:{disabled:{control:`boolean`,description:`Whether the select is disabled.`,table:{defaultValue:{summary:`false`}}},onValueChange:{description:`Event handler called when the value changes.`,table:{category:`Events`}},onOpenChange:{description:`Event handler called when the open state changes.`,table:{category:`Events`}},dir:{control:`select`,options:[`ltr`,`rtl`],description:`The reading direction of the select.`,table:{defaultValue:{summary:`ltr`}}},size:{control:`select`,options:[`default`,`sm`],description:`The size of the select trigger.`,table:{defaultValue:{summary:`default`}}},placeholder:{control:`text`,description:`The placeholder text to display.`},position:{control:`select`,options:[`item-aligned`,`popper`],description:`The positioning strategy of the content.`,table:{defaultValue:{summary:`item-aligned`}}}},args:{onValueChange:p(),onOpenChange:p()},parameters:{docs:{description:{component:`A control that allows the user to select a value from a list of options.
Built on top of Radix UI Select.`}}}},g=({size:e,placeholder:t,position:n,...o})=>(0,m.jsxs)(d,{...o,children:[(0,m.jsx)(u,{className:`w-[220px]`,size:e,children:(0,m.jsx)(i,{placeholder:t||`Select an option`})}),(0,m.jsxs)(s,{position:n,children:[(0,m.jsxs)(l,{children:[(0,m.jsx)(r,{children:`Academics`}),(0,m.jsx)(a,{value:`computer-engineering`,children:`Computer Engineering`}),(0,m.jsx)(a,{value:`information-technology`,children:`Information Technology`}),(0,m.jsx)(a,{value:`electronics-engineering`,children:`Electronics Engineering`})]}),(0,m.jsx)(c,{}),(0,m.jsxs)(l,{children:[(0,m.jsx)(r,{children:`Semesters`}),(0,m.jsx)(a,{value:`sem-1`,children:`Semester 1`}),(0,m.jsx)(a,{value:`sem-2`,children:`Semester 2`}),(0,m.jsx)(a,{value:`sem-3`,children:`Semester 3`})]})]})]}),_={render:g,args:{placeholder:`Select branch or semester`}},v={render:g,args:{..._.args,size:`sm`}},y={render:g,args:{..._.args,disabled:!0}},b={render:g,args:{..._.args,position:`popper`}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    placeholder: 'Select branch or semester'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Default.args,
    size: 'sm'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Default.args,
    disabled: true
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Default.args,
    position: 'popper'
  }
}`,...b.parameters?.docs?.source}}},x=[`Default`,`Small`,`Disabled`,`Popper`]}))();export{_ as Default,y as Disabled,b as Popper,v as Small,x as __namedExportsOrder,h as default};