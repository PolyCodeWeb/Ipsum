import NextLink from "next/link";
type Link = {
  To: string;
  Title?: string;
  Classes?: string;
  ScreenReader?: string;
};

export default function ChildLink({
  children,
  link,
}: {
  children: React.ReactNode;
  link: Link;
}) {
  return (
    <NextLink href={link.To} passHref className={link.Classes}>
      {children}
      <span className="sr-only">{link.ScreenReader}</span>
    </NextLink>
  );
}
