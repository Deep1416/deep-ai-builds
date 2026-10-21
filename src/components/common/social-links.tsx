import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  withEmail?: boolean;
};

export function SocialLinks({ className, withEmail = false }: Props) {
  const links = [
    { href: site.github, label: "GitHub profile", Icon: Github },
    { href: site.linkedin, label: "LinkedIn profile", Icon: Linkedin },
    ...(withEmail
      ? [
          { href: site.whatsapp, label: "Message on WhatsApp", Icon: MessageCircle },
          { href: `mailto:${site.email}`, label: "Send an email", Icon: Mail },
        ]
      : []),
  ];

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer noopener"
          className="inline-flex size-9 items-center justify-center rounded-lg border border-border/70 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          <Icon className="size-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
