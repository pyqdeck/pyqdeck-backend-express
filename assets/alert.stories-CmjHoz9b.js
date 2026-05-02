import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,o as r,s as i,xi as a}from"./iframe-CGqnZNpi.js";import{n as o,t as s}from"./dist-DHGMkeEv.js";import{Y as c,l,t as u}from"./lucide-react-BLnmzfR8.js";function d({className:e,variant:t,...n}){return(0,h.jsx)(`div`,{"data-slot":`alert`,role:`alert`,className:r(g({variant:t}),e),...n})}function f({className:e,...t}){return(0,h.jsx)(`div`,{"data-slot":`alert-title`,className:r(`[&_a]:hover:text-foreground font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3`,e),...t})}function p({className:e,...t}){return(0,h.jsx)(`div`,{"data-slot":`alert-description`,className:r(`text-muted-foreground [&_a]:hover:text-foreground text-sm text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4`,e),...t})}function m({className:e,...t}){return(0,h.jsx)(`div`,{"data-slot":`alert-action`,className:r(`absolute top-2 right-2`,e),...t})}var h,g,_=e((()=>{h=t(n(),1),a(),o(),i(),g=s(`group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4`,{variants:{variant:{default:`bg-card text-card-foreground`,destructive:`bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current`}},defaultVariants:{variant:`default`}}),d.__docgenInfo={description:``,methods:[],displayName:`Alert`},f.__docgenInfo={description:``,methods:[],displayName:`AlertTitle`},p.__docgenInfo={description:``,methods:[],displayName:`AlertDescription`},m.__docgenInfo={description:``,methods:[],displayName:`AlertAction`}})),v,y,b,x,S;e((()=>{v=t(n(),1),_(),u(),y={title:`UI/Alert`,component:d,tags:[`autodocs`],argTypes:{variant:{control:{type:`select`},options:[`default`,`destructive`]}}},b={render:e=>(0,v.jsxs)(d,{...e,children:[(0,v.jsx)(l,{className:`h-4 w-4`}),(0,v.jsx)(f,{children:`Heads up!`}),(0,v.jsx)(p,{children:`You can add components to your app using the cli.`})]})},x={args:{variant:`destructive`},render:e=>(0,v.jsxs)(d,{...e,children:[(0,v.jsx)(c,{className:`h-4 w-4`}),(0,v.jsx)(f,{children:`Error`}),(0,v.jsx)(p,{children:`Your session has expired. Please log in again.`})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => <Alert {...args}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Destructive`]}))();export{b as Default,x as Destructive,S as __namedExportsOrder,y as default};