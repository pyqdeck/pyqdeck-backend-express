import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,xi as r}from"./iframe-zQGOC5jD.js";import{P as i,S as a,t as o}from"./lucide-react-D_zBGtrA.js";import{a as s,c,d as l,i as u,l as d,o as f,s as p,t as m,u as h}from"./zod-B8o4sJAU.js";import{r as g,t as _}from"./button-ZxsGeWGV.js";import{a as v,c as y,i as b,n as x,o as S,r as C,s as w,t as T}from"./dialog-CPXccQyb.js";import{n as E,t as D}from"./input-XI4Iwipe.js";import{n as O,t as k}from"./dist-DwLJy-Q9.js";import{n as A,t as j}from"./textarea-34x86yBf.js";import{a as M,i as N,n as P,o as F,r as I,t as L}from"./field-yemHvWrc.js";function R({form:e,onSubmit:t,open:n,onOpenChange:r,trigger:o=!0}){let{control:s,handleSubmit:c,formState:{errors:l={},isSubmitting:u=!1}={}}=e||{};return(0,z.jsxs)(T,{open:n,onOpenChange:r,children:[o&&(0,z.jsx)(w,{asChild:!0,children:(0,z.jsxs)(_,{size:`sm`,className:`font-roboto border-2 bg-indigo-600 font-bold shadow-none hover:bg-indigo-700`,children:[(0,z.jsx)(a,{className:`mr-2 h-4 w-4`}),` Add Module`]})}),(0,z.jsxs)(x,{className:`border-2 shadow-none sm:max-w-[500px]`,children:[(0,z.jsxs)(v,{children:[(0,z.jsxs)(`div`,{className:`mb-2 flex items-center gap-3`,children:[(0,z.jsx)(`div`,{className:`rounded-lg bg-indigo-100 p-2 text-indigo-600`,children:(0,z.jsx)(i,{className:`h-5 w-5`})}),(0,z.jsx)(S,{className:`font-roboto text-xl font-bold`,children:`New Curriculum Module`})]}),(0,z.jsx)(C,{className:`font-roboto text-sm`,children:`Define a new unit and its learning objectives for this syllabus.`})]}),(0,z.jsxs)(`form`,{onSubmit:c(t),className:`py-4`,children:[(0,z.jsxs)(N,{children:[(0,z.jsxs)(`div`,{className:`grid grid-cols-2 gap-4`,children:[(0,z.jsxs)(L,{"data-invalid":!!l.moduleNumber,children:[(0,z.jsx)(M,{className:`font-roboto font-bold`,children:`Module Number`}),(0,z.jsx)(d,{name:`moduleNumber`,control:s,render:({field:e})=>(0,z.jsx)(D,{...e,type:`number`,min:`1`,className:`font-roboto border-2 focus-visible:ring-0`,onChange:t=>e.onChange(parseInt(t.target.value)||0),"aria-invalid":!!l.moduleNumber})}),(0,z.jsx)(I,{errors:[l.moduleNumber]})]}),(0,z.jsxs)(L,{"data-invalid":!!l.weightage,children:[(0,z.jsx)(M,{className:`font-roboto font-bold`,children:`Exam Weightage (%)`}),(0,z.jsx)(d,{name:`weightage`,control:s,render:({field:e})=>(0,z.jsx)(D,{...e,type:`number`,min:`0`,max:`100`,className:`font-roboto border-2 focus-visible:ring-0`,onChange:t=>e.onChange(parseFloat(t.target.value)||0),"aria-invalid":!!l.weightage})}),(0,z.jsx)(I,{errors:[l.weightage]})]})]}),(0,z.jsxs)(L,{"data-invalid":!!l.title,children:[(0,z.jsx)(M,{className:`font-roboto font-bold`,children:`Module Title`}),(0,z.jsx)(d,{name:`title`,control:s,render:({field:e})=>(0,z.jsx)(D,{...e,placeholder:`e.g. Introduction to Neural Networks`,className:`font-roboto border-2 focus-visible:ring-0`,"aria-invalid":!!l.title})}),(0,z.jsx)(I,{errors:[l.title]})]}),(0,z.jsxs)(L,{"data-invalid":!!l.coMapping,children:[(0,z.jsx)(M,{className:`font-roboto font-bold`,children:`CO Mapping`}),(0,z.jsx)(d,{name:`coMapping`,control:s,render:({field:e})=>(0,z.jsx)(D,{...e,placeholder:`e.g. CO1, CO2`,className:`font-roboto border-2 focus-visible:ring-0`,"aria-invalid":!!l.coMapping})}),(0,z.jsx)(P,{children:`Map this unit to Course Outcomes.`}),(0,z.jsx)(I,{errors:[l.coMapping]})]}),(0,z.jsxs)(L,{"data-invalid":!!l.description,children:[(0,z.jsx)(M,{className:`font-roboto font-bold`,children:`Learning Objectives`}),(0,z.jsx)(d,{name:`description`,control:s,render:({field:e})=>(0,z.jsx)(j,{...e,placeholder:`Detailed scope of the module...`,className:`font-roboto min-h-[100px] resize-none border-2 focus-visible:ring-0`,"aria-invalid":!!l.description})}),(0,z.jsx)(I,{errors:[l.description]})]})]}),(0,z.jsx)(b,{className:`pt-6`,children:(0,z.jsx)(_,{type:`submit`,disabled:u,className:`font-roboto h-11 w-full border-2 bg-indigo-600 font-bold shadow-none hover:bg-indigo-700`,children:u?`Creating...`:`Add to Syllabus`})})]})]})]})}var z,B=e((()=>{z=t(n(),1),r(),o(),h(),g(),y(),E(),A(),F(),R.__docgenInfo={description:``,methods:[],displayName:`AddModuleDialogView`,props:{trigger:{defaultValue:{value:`true`,computed:!1},required:!1}}}})),V,H,U,W,G,K,q,J;e((()=>{V=t(n(),1),B(),h(),c(),m(),O(),H=s({syllabusId:f().min(1,`Syllabus ID is required`),moduleNumber:u().int().min(1,`Must be at least 1`),title:f().min(1,`Title is required`).max(200),description:f().max(1e3).optional().nullable(),weightage:u().min(0).max(100).optional().nullable(),coMapping:f().max(50).optional().nullable(),slug:f().min(1,`Slug is required`)}),U={title:`Studio/Curriculum/AddModuleDialog`,component:R,tags:[`autodocs`],parameters:{layout:`centered`}},W=({mockSubmitting:e=!1,...t})=>{let n=l({resolver:p(H),defaultValues:{syllabusId:`syl1`,moduleNumber:1,title:``,description:``,weightage:0,coMapping:``,slug:``}}),r={...n,formState:{...n.formState,errors:n.formState.errors,isSubmitting:e}};return(0,V.jsx)(R,{...t,form:r})},G={render:e=>(0,V.jsx)(W,{...e}),args:{open:!0,onOpenChange:k(),onSubmit:k()}},K={render:e=>(0,V.jsx)(W,{...e}),args:{...G.args,mockSubmitting:!0}},q={render:e=>{let t=l({resolver:p(H),defaultValues:{syllabusId:``,moduleNumber:0,title:``,description:`Too long `.repeat(200),weightage:150,coMapping:``,slug:``}});return React.useEffect(()=>{t.trigger()},[t]),(0,V.jsx)(R,{...e,form:t})},args:{open:!0,onOpenChange:k(),onSubmit:k()}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: args => <FormWrapper {...args} />,
  args: {
    open: true,
    onOpenChange: fn(),
    onSubmit: fn()
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: args => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockSubmitting: true
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: args => {
    const form = useForm({
      resolver: zodResolver(moduleSchema),
      defaultValues: {
        syllabusId: '',
        moduleNumber: 0,
        title: '',
        description: 'Too long '.repeat(200),
        weightage: 150,
        coMapping: '',
        slug: ''
      }
    });

    // Manually trigger validation to show errors
    React.useEffect(() => {
      form.trigger();
    }, [form]);
    return <AddModuleDialogView {...args} form={form} />;
  },
  args: {
    open: true,
    onOpenChange: fn(),
    onSubmit: fn()
  }
}`,...q.parameters?.docs?.source}}},J=[`Default`,`Submitting`,`WithErrors`]}))();export{G as Default,K as Submitting,q as WithErrors,J as __namedExportsOrder,U as default};