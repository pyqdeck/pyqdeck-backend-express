import{n as e}from"./chunk-BEldbCjX.js";import{Lr as t,ii as n,o as r,s as i}from"./iframe-BzLYIvcx.js";import{M as a,c as o,t as s}from"./lucide-react-Di0yrQBx.js";import{n as c,t as l}from"./dist-Xvo9kkiU.js";function u({className:e,variant:t,...n}){return(0,m.jsx)(`div`,{"data-slot":`alert`,role:`alert`,className:r(h({variant:t}),e),...n})}function d({className:e,...t}){return(0,m.jsx)(`div`,{"data-slot":`alert-title`,className:r(`[&_a]:hover:text-foreground font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3`,e),...t})}function f({className:e,...t}){return(0,m.jsx)(`div`,{"data-slot":`alert-description`,className:r(`text-muted-foreground [&_a]:hover:text-foreground text-sm text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4`,e),...t})}function p({className:e,...t}){return(0,m.jsx)(`div`,{"data-slot":`alert-action`,className:r(`absolute top-2 right-2`,e),...t})}var m,h,g=e((()=>{m=t(),n(),c(),i(),h=l(`group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4`,{variants:{variant:{default:`bg-card text-card-foreground`,destructive:`bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current`}},defaultVariants:{variant:`default`}}),u.__docgenInfo={description:``,methods:[],displayName:`Alert`},d.__docgenInfo={description:``,methods:[],displayName:`AlertTitle`},f.__docgenInfo={description:``,methods:[],displayName:`AlertDescription`},p.__docgenInfo={description:``,methods:[],displayName:`AlertAction`}})),_,v,y,b,x;e((()=>{_=t(),g(),s(),v={title:`UI/Alert`,component:u,tags:[`autodocs`],argTypes:{variant:{control:{type:`select`},options:[`default`,`destructive`]}}},y={render:e=>(0,_.jsxs)(u,{...e,children:[(0,_.jsx)(o,{className:`h-4 w-4`}),(0,_.jsx)(d,{children:`Heads up!`}),(0,_.jsx)(f,{children:`You can add components to your app using the cli.`})]})},b={args:{variant:`destructive`},render:e=>(0,_.jsxs)(u,{...e,children:[(0,_.jsx)(a,{className:`h-4 w-4`}),(0,_.jsx)(d,{children:`Error`}),(0,_.jsx)(f,{children:`Your session has expired. Please log in again.`})]})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => <Alert {...args}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'destructive'
  },
  render: args => <Alert {...args}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
}`,...b.parameters?.docs?.source}}},x=[`Default`,`Destructive`]}))();export{y as Default,b as Destructive,x as __namedExportsOrder,v as default};