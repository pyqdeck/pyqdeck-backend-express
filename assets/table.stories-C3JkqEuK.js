import{n as e}from"./chunk-BEldbCjX.js";import{Lr as t,ii as n,o as r,s as i}from"./iframe-BzLYIvcx.js";function a({className:e,...t}){return(0,p.jsx)(`div`,{"data-slot":`table-container`,className:`relative w-full overflow-x-auto`,children:(0,p.jsx)(`table`,{"data-slot":`table`,className:r(`w-full caption-bottom text-sm`,e),...t})})}function o({className:e,...t}){return(0,p.jsx)(`thead`,{"data-slot":`table-header`,className:r(`[&_tr]:border-b`,e),...t})}function s({className:e,...t}){return(0,p.jsx)(`tbody`,{"data-slot":`table-body`,className:r(`[&_tr:last-child]:border-0`,e),...t})}function c({className:e,...t}){return(0,p.jsx)(`tfoot`,{"data-slot":`table-footer`,className:r(`bg-muted/50 border-t font-medium [&>tr]:last:border-b-0`,e),...t})}function l({className:e,...t}){return(0,p.jsx)(`tr`,{"data-slot":`table-row`,className:r(`hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors`,e),...t})}function u({className:e,...t}){return(0,p.jsx)(`th`,{"data-slot":`table-head`,className:r(`text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0`,e),...t})}function d({className:e,...t}){return(0,p.jsx)(`td`,{"data-slot":`table-cell`,className:r(`p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0`,e),...t})}function f({className:e,...t}){return(0,p.jsx)(`caption`,{"data-slot":`table-caption`,className:r(`text-muted-foreground mt-4 text-sm`,e),...t})}var p,m=e((()=>{p=t(),n(),i(),a.__docgenInfo={description:``,methods:[],displayName:`Table`},o.__docgenInfo={description:``,methods:[],displayName:`TableHeader`},s.__docgenInfo={description:``,methods:[],displayName:`TableBody`},c.__docgenInfo={description:``,methods:[],displayName:`TableFooter`},u.__docgenInfo={description:``,methods:[],displayName:`TableHead`},l.__docgenInfo={description:``,methods:[],displayName:`TableRow`},d.__docgenInfo={description:``,methods:[],displayName:`TableCell`},f.__docgenInfo={description:``,methods:[],displayName:`TableCaption`}})),h,g,_,v,y;e((()=>{h=t(),m(),g={title:`UI/Table`,component:a,tags:[`autodocs`]},_=[{invoice:`INV001`,paymentStatus:`Paid`,totalAmount:`$250.00`,paymentMethod:`Credit Card`},{invoice:`INV002`,paymentStatus:`Pending`,totalAmount:`$150.00`,paymentMethod:`PayPal`},{invoice:`INV003`,paymentStatus:`Unpaid`,totalAmount:`$350.00`,paymentMethod:`Bank Transfer`}],v={render:e=>(0,h.jsxs)(a,{...e,children:[(0,h.jsx)(f,{children:`A list of your recent invoices.`}),(0,h.jsx)(o,{children:(0,h.jsxs)(l,{children:[(0,h.jsx)(u,{className:`w-[100px]`,children:`Invoice`}),(0,h.jsx)(u,{children:`Status`}),(0,h.jsx)(u,{children:`Method`}),(0,h.jsx)(u,{className:`text-right`,children:`Amount`})]})}),(0,h.jsx)(s,{children:_.map(e=>(0,h.jsxs)(l,{children:[(0,h.jsx)(d,{className:`font-medium`,children:e.invoice}),(0,h.jsx)(d,{children:e.paymentStatus}),(0,h.jsx)(d,{children:e.paymentMethod}),(0,h.jsx)(d,{className:`text-right`,children:e.totalAmount})]},e.invoice))}),(0,h.jsx)(c,{children:(0,h.jsxs)(l,{children:[(0,h.jsx)(d,{colSpan:3,children:`Total`}),(0,h.jsx)(d,{className:`text-right`,children:`$750.00`})]})})]})},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y=[`Default`]}))();export{v as Default,y as __namedExportsOrder,g as default};