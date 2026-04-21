import Image from "next/image";
import Link from "next/link";
// import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto py-12 md:py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-border">
          {/* Logo and description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
                <Image
                  src="/logo.png"
                  width={500}
                  height={500}
                  alt="Blockbot"
                  className="size-5"
                />
              </div>
              <span
                className="text-lg font-bold text-foreground"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                blockbot
              </span>
            </div>
            <p
              className="text-sm text-muted-foreground"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              AI Agent & Tool Marketplace on Stellar
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <p
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Product
            </p>
            <Link href="/agents">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Agents
              </span>
            </Link>
            <Link href="/tools">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Tools
              </span>
            </Link>
            <Link href="/stats">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Stats
              </span>
            </Link>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <p
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Resources
            </p>
            {/* <Link href="/docs">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Documentation
              </span>
            </Link> */}
            <a
              href="https://github.com/rodweleo/blockbot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              {/* <Github size={16} /> */}
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/blockbot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              npm
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            - Built on Stellar . MIT License -
          </p>
        </div>
      </div>
    </footer>
  );
}
