import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r,o as i,s as a}from"./iframe-ZxqeRaYS.js";import{h as o,t as s,vt as c}from"./lucide-react-L9_kZoeS.js";import{n as l,t as u}from"./dist-BfLG6s4Z.js";import{r as d,t as f}from"./button-CQOZVsk5.js";function p({className:e,variant:t,...n}){return(0,_.jsx)(`div`,{"data-slot":`alert`,role:`alert`,className:i(v({variant:t}),e),...n})}function m({className:e,...t}){return(0,_.jsx)(`div`,{"data-slot":`alert-title`,className:i(`[&_a]:hover:text-foreground font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3`,e),...t})}function h({className:e,...t}){return(0,_.jsx)(`div`,{"data-slot":`alert-description`,className:i(`text-muted-foreground [&_a]:hover:text-foreground text-sm text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4`,e),...t})}function g({className:e,...t}){return(0,_.jsx)(`div`,{"data-slot":`alert-action`,className:i(`absolute top-2 right-2`,e),...t})}var _,v,y=e((()=>{_=t(n(),1),r(),l(),a(),v=u(`group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4`,{variants:{variant:{default:`bg-card text-card-foreground`,destructive:`bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current`}},defaultVariants:{variant:`default`}}),p.__docgenInfo={description:``,methods:[],displayName:`Alert`},m.__docgenInfo={description:``,methods:[],displayName:`AlertTitle`},h.__docgenInfo={description:``,methods:[],displayName:`AlertDescription`},g.__docgenInfo={description:``,methods:[],displayName:`AlertAction`}})),b,x,S,C,w,T;e((()=>{b=t(n(),1),y(),s(),d(),x={title:`UI/Alert`,component:p,tags:[`autodocs`],argTypes:{variant:{control:{type:`select`},options:[`default`,`destructive`]}}},S={args:{variant:`default`},render:e=>(0,b.jsxs)(p,{...e,children:[(0,b.jsx)(o,{className:`h-4 w-4`}),(0,b.jsx)(m,{children:`Heads up!`}),(0,b.jsx)(h,{children:`You can add components to your app using the cli.`})]})},C={args:{variant:`destructive`},render:e=>(0,b.jsxs)(p,{...e,children:[(0,b.jsx)(c,{className:`h-4 w-4`}),(0,b.jsx)(m,{children:`Error`}),(0,b.jsx)(h,{children:`Your session has expired. Please log in again.`})]})},w={args:{variant:`default`},render:e=>(0,b.jsxs)(p,{...e,children:[(0,b.jsx)(o,{className:`h-4 w-4`}),(0,b.jsx)(m,{children:`Update available`}),(0,b.jsx)(h,{children:`A new version of the software is available. Please update now.`}),(0,b.jsx)(g,{children:(0,b.jsx)(f,{variant:`outline`,size:`sm`,children:`Update`})})]})},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default'
  },
  render: args => <Alert {...args}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default'
  },
  render: args => <Alert {...args}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>
        A new version of the software is available. Please update now.
      </AlertDescription>
      <AlertAction>
        <Button variant="outline" size="sm">
          Update
        </Button>
      </AlertAction>
    </Alert>
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Destructive`,`WithAction`]}))();export{S as Default,C as Destructive,w as WithAction,T as __namedExportsOrder,x as default};