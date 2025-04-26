"use client";

import Image from "next/image";

import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.svg"
            alt="Misty Step Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="font-bold text-xl">Misty Step</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-foreground/80 hover:text-foreground transition">
            Features
          </a>
          <a href="#solutions" className="text-foreground/80 hover:text-foreground transition">
            Solutions
          </a>
          <a href="#about" className="text-foreground/80 hover:text-foreground transition">
            About
          </a>
          <a href="#contact" className="text-foreground/80 hover:text-foreground transition">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <Button asChild>
            <a href="#contact">Get Started</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
