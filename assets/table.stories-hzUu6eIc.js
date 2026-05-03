import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-DvEPLiaD.js";import{a as r,c as i,i as a,l as o,n as s,o as c,r as l,s as u,t as d}from"./table-DqIDrgPU.js";var f,p,m,h,g;e((()=>{f=t(n(),1),o(),p={title:`UI/Table`,component:d,tags:[`autodocs`]},m=[{invoice:`INV001`,paymentStatus:`Paid`,totalAmount:`$250.00`,paymentMethod:`Credit Card`},{invoice:`INV002`,paymentStatus:`Pending`,totalAmount:`$150.00`,paymentMethod:`PayPal`},{invoice:`INV003`,paymentStatus:`Unpaid`,totalAmount:`$350.00`,paymentMethod:`Bank Transfer`}],h={render:e=>(0,f.jsxs)(d,{...e,children:[(0,f.jsx)(l,{children:`A list of your recent invoices.`}),(0,f.jsx)(u,{children:(0,f.jsxs)(i,{children:[(0,f.jsx)(c,{className:`w-[100px]`,children:`Invoice`}),(0,f.jsx)(c,{children:`Status`}),(0,f.jsx)(c,{children:`Method`}),(0,f.jsx)(c,{className:`text-right`,children:`Amount`})]})}),(0,f.jsx)(s,{children:m.map(e=>(0,f.jsxs)(i,{children:[(0,f.jsx)(a,{className:`font-medium`,children:e.invoice}),(0,f.jsx)(a,{children:e.paymentStatus}),(0,f.jsx)(a,{children:e.paymentMethod}),(0,f.jsx)(a,{className:`text-right`,children:e.totalAmount})]},e.invoice))}),(0,f.jsx)(r,{children:(0,f.jsxs)(i,{children:[(0,f.jsx)(a,{colSpan:3,children:`Total`}),(0,f.jsx)(a,{className:`text-right`,children:`$750.00`})]})})]})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => <Table {...args}>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(invoice => <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>)}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
}`,...h.parameters?.docs?.source}}},g=[`Default`]}))();export{h as Default,g as __namedExportsOrder,p as default};