import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,o as r,s as i,xi as a}from"./iframe-cfb33bu0.js";function o({className:e,...t}){return(0,m.jsx)(`div`,{"data-slot":`table-container`,className:`relative w-full overflow-x-auto`,children:(0,m.jsx)(`table`,{"data-slot":`table`,className:r(`w-full caption-bottom text-sm`,e),...t})})}function s({className:e,...t}){return(0,m.jsx)(`thead`,{"data-slot":`table-header`,className:r(`[&_tr]:border-b`,e),...t})}function c({className:e,...t}){return(0,m.jsx)(`tbody`,{"data-slot":`table-body`,className:r(`[&_tr:last-child]:border-0`,e),...t})}function l({className:e,...t}){return(0,m.jsx)(`tfoot`,{"data-slot":`table-footer`,className:r(`bg-muted/50 border-t font-medium [&>tr]:last:border-b-0`,e),...t})}function u({className:e,...t}){return(0,m.jsx)(`tr`,{"data-slot":`table-row`,className:r(`hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors`,e),...t})}function d({className:e,...t}){return(0,m.jsx)(`th`,{"data-slot":`table-head`,className:r(`text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0`,e),...t})}function f({className:e,...t}){return(0,m.jsx)(`td`,{"data-slot":`table-cell`,className:r(`p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0`,e),...t})}function p({className:e,...t}){return(0,m.jsx)(`caption`,{"data-slot":`table-caption`,className:r(`text-muted-foreground mt-4 text-sm`,e),...t})}var m,h=e((()=>{m=t(n(),1),a(),i(),o.__docgenInfo={description:``,methods:[],displayName:`Table`},s.__docgenInfo={description:``,methods:[],displayName:`TableHeader`},c.__docgenInfo={description:``,methods:[],displayName:`TableBody`},l.__docgenInfo={description:``,methods:[],displayName:`TableFooter`},d.__docgenInfo={description:``,methods:[],displayName:`TableHead`},u.__docgenInfo={description:``,methods:[],displayName:`TableRow`},f.__docgenInfo={description:``,methods:[],displayName:`TableCell`},p.__docgenInfo={description:``,methods:[],displayName:`TableCaption`}})),g,_,v,y,b;e((()=>{g=t(n(),1),h(),_={title:`UI/Table`,component:o,tags:[`autodocs`]},v=[{invoice:`INV001`,paymentStatus:`Paid`,totalAmount:`$250.00`,paymentMethod:`Credit Card`},{invoice:`INV002`,paymentStatus:`Pending`,totalAmount:`$150.00`,paymentMethod:`PayPal`},{invoice:`INV003`,paymentStatus:`Unpaid`,totalAmount:`$350.00`,paymentMethod:`Bank Transfer`}],y={render:e=>(0,g.jsxs)(o,{...e,children:[(0,g.jsx)(p,{children:`A list of your recent invoices.`}),(0,g.jsx)(s,{children:(0,g.jsxs)(u,{children:[(0,g.jsx)(d,{className:`w-[100px]`,children:`Invoice`}),(0,g.jsx)(d,{children:`Status`}),(0,g.jsx)(d,{children:`Method`}),(0,g.jsx)(d,{className:`text-right`,children:`Amount`})]})}),(0,g.jsx)(c,{children:v.map(e=>(0,g.jsxs)(u,{children:[(0,g.jsx)(f,{className:`font-medium`,children:e.invoice}),(0,g.jsx)(f,{children:e.paymentStatus}),(0,g.jsx)(f,{children:e.paymentMethod}),(0,g.jsx)(f,{className:`text-right`,children:e.totalAmount})]},e.invoice))}),(0,g.jsx)(l,{children:(0,g.jsxs)(u,{children:[(0,g.jsx)(f,{colSpan:3,children:`Total`}),(0,g.jsx)(f,{className:`text-right`,children:`$750.00`})]})})]})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b=[`Default`]}))();export{y as Default,b as __namedExportsOrder,_ as default};