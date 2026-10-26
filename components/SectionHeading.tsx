import Link from "next/link";
import { ArrowIcon } from "./icons";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  link?: { href: string; label: string };
};

export function SectionHeading({ id, eyebrow, title, intro, link }: Props) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id}>{title}</h2>
        {intro && <p className="section-heading__intro">{intro}</p>}
      </div>
      {link && (
        <Link href={link.href} className="text-link text-link--arrow">
          {link.label}
          <ArrowIcon />
        </Link>
      )}
    </div>
  );
}
