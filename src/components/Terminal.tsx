import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";

export default function TerminalDemo() {
  return (
    <Terminal className="!w-screen !h-screen !max-w-none" sequence>
      <TypingAnimation startOnView>pnpm dlx shadcn@latest init</TypingAnimation>
      <AnimatedSpan>✔ Preflight checks.</AnimatedSpan>
      <AnimatedSpan>✔ Validating Tailwind CSS.</AnimatedSpan>
      <TypingAnimation>
        Success! Project initialization completed.
      </TypingAnimation>
    </Terminal>
  );
}
