import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-zQGOC5jD.js";import{A as r,N as i,O as a,Q as o,S as s,X as c,a as l,i as u,j as d,nt as f,o as p,t as m,y as h}from"./lucide-react-D_zBGtrA.js";import{r as g,t as _}from"./button-ZxsGeWGV.js";import{a as v,c as y,d as b,f as x,i as S,l as C,n as w,o as T,p as E,r as D,s as O,t as k,u as A}from"./dropdown-menu-DRYB90yJ.js";var j,M,N,P;e((()=>{j=t(n(),1),E(),g(),m(),M={title:`UI/DropdownMenu`,component:k,tags:[`autodocs`]},N={render:e=>(0,j.jsxs)(k,{...e,children:[(0,j.jsx)(x,{asChild:!0,children:(0,j.jsx)(_,{variant:`outline`,children:`Open Menu`})}),(0,j.jsxs)(w,{className:`w-56`,children:[(0,j.jsx)(v,{children:`My Account`}),(0,j.jsx)(O,{}),(0,j.jsxs)(D,{children:[(0,j.jsxs)(S,{children:[(0,j.jsx)(l,{className:`mr-2 h-4 w-4`}),(0,j.jsx)(`span`,{children:`Profile`}),(0,j.jsx)(y,{children:`⇧⌘P`})]}),(0,j.jsxs)(S,{children:[(0,j.jsx)(c,{className:`mr-2 h-4 w-4`}),(0,j.jsx)(`span`,{children:`Billing`}),(0,j.jsx)(y,{children:`⌘B`})]}),(0,j.jsxs)(S,{children:[(0,j.jsx)(h,{className:`mr-2 h-4 w-4`}),(0,j.jsx)(`span`,{children:`Settings`}),(0,j.jsx)(y,{children:`⌘S`})]})]}),(0,j.jsx)(O,{}),(0,j.jsxs)(D,{children:[(0,j.jsxs)(S,{children:[(0,j.jsx)(u,{className:`mr-2 h-4 w-4`}),(0,j.jsx)(`span`,{children:`Team`})]}),(0,j.jsxs)(C,{children:[(0,j.jsxs)(b,{children:[(0,j.jsx)(p,{className:`mr-2 h-4 w-4`}),(0,j.jsx)(`span`,{children:`Invite users`})]}),(0,j.jsx)(T,{children:(0,j.jsxs)(A,{children:[(0,j.jsxs)(S,{children:[(0,j.jsx)(r,{className:`mr-2 h-4 w-4`}),(0,j.jsx)(`span`,{children:`Email`})]}),(0,j.jsxs)(S,{children:[(0,j.jsx)(a,{className:`mr-2 h-4 w-4`}),(0,j.jsx)(`span`,{children:`Message`})]}),(0,j.jsx)(O,{}),(0,j.jsxs)(S,{children:[(0,j.jsx)(f,{className:`mr-2 h-4 w-4`}),(0,j.jsx)(`span`,{children:`More...`})]})]})})]}),(0,j.jsxs)(S,{children:[(0,j.jsx)(s,{className:`mr-2 h-4 w-4`}),(0,j.jsx)(`span`,{children:`New Team`}),(0,j.jsx)(y,{children:`⌘+T`})]})]}),(0,j.jsx)(O,{}),(0,j.jsxs)(S,{children:[(0,j.jsx)(i,{className:`mr-2 h-4 w-4`}),(0,j.jsx)(`span`,{children:`Support`})]}),(0,j.jsxs)(S,{disabled:!0,children:[(0,j.jsx)(o,{className:`mr-2 h-4 w-4`}),(0,j.jsx)(`span`,{children:`API`})]}),(0,j.jsx)(O,{}),(0,j.jsxs)(S,{variant:`destructive`,children:[(0,j.jsx)(d,{className:`mr-2 h-4 w-4`}),(0,j.jsx)(`span`,{children:`Log out`}),(0,j.jsx)(y,{children:`⇧⌘Q`})]})]})]})},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...N.parameters?.docs?.source}}},P=[`Default`]}))();export{N as Default,P as __namedExportsOrder,M as default};