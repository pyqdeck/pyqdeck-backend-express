'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'How it Works', href: '/#how-it-works' },
  ];

  return (
    <nav className="bg-background/80 border-border fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-95"
        >
          <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-lg font-bold transition-all group-hover:shadow-md">
            PQ
          </div>
          <span className="text-xl font-bold tracking-tight">PyqDeck</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <Separator orientation="vertical" className="h-4" />

          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="rounded-full px-6 transition-all hover:shadow-md">
                  Get Started
                </Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            </Show>
          </div>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <Show when="signed-in">
            <UserButton afterSignOutUrl="/" />
          </Show>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] pt-12 sm:w-[400px]">
              <div className="flex flex-col gap-6">
                <Link
                  href="/"
                  className="mb-4 flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg font-bold">
                    PQ
                  </div>
                  <span className="text-lg font-bold">PyqDeck</span>
                </Link>

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="hover:text-primary text-lg font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                <Separator />

                <Show when="signed-out">
                  <div className="flex flex-col gap-3">
                    <SignInButton mode="modal">
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        Get Started
                      </Button>
                    </SignUpButton>
                  </div>
                </Show>

                <Show when="signed-in">
                  <Link
                    href="/dashboard"
                    className="hover:text-primary text-lg font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                </Show>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
