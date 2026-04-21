import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";

export default function TerminalDemo() {
  return (
    <Terminal className="!w-screen !h-screen !max-w-none" sequence>
      <TypingAnimation startOnView>$ npm install -g blockbot</TypingAnimation>
      <AnimatedSpan>
        npm warn deprecated node-domexception@1.0.0: Use your platform's native
      </AnimatedSpan>
      <AnimatedSpan> DOMException instead</AnimatedSpan>
      <AnimatedSpan>
        {" "}
        added 407 packages in 4m 95 packages are looking
      </AnimatedSpan>
      <AnimatedSpan> 95 packages are looking for funding</AnimatedSpan>
      <AnimatedSpan> run `npm fund` for details</AnimatedSpan>
      <TypingAnimation startOnView>$ blockbot init</TypingAnimation>
    </Terminal>
  );
}
