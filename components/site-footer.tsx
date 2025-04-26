import Image from "next/image";

export function SiteFooter(): React.JSX.Element {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <Image
              src="/images/logo.svg"
              alt="Misty Step Logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="font-bold">Misty Step</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-foreground/70">
            <a href="#features" className="hover:text-foreground transition">
              Features
            </a>
            <a href="#solutions" className="hover:text-foreground transition">
              Solutions
            </a>
            <a href="#about" className="hover:text-foreground transition">
              About
            </a>
            <a href="#contact" className="hover:text-foreground transition">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-foreground/50">
          © {new Date().getFullYear()} Misty Step. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
