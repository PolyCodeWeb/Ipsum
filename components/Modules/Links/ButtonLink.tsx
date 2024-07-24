import NextLink from "next/link";
type Link = {
  To: string;
  Title?: string;
  Classes?: string;
  ScreenReader?: string;
};

export default function ButtonLink({ link }: { link: Link }) {
  return (
    <NextLink href={link.To} passHref className={link.Classes}>
      {link.Title}
      <span className="sr-only">{link.ScreenReader}</span>
    </NextLink>
  );
}