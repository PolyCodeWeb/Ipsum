import React, { useState, ReactNode } from "react";
import NextLink from "next/link";

interface NavItemProps {
  label?: string;
  classes?: string;
  href: string;
}

export const NavItemComponent = React.forwardRef<
  HTMLElement,
  NavItemProps & React.HtmlHTMLAttributes<HTMLElement>
>(({ label, href, classes, ...props }) => {
  return (
    <li className="nav-item">
      <NextLink className={`${classes} nav-link`} href={href} {...props}>
        {label}
      </NextLink>
    </li>
  );
});

export const NavItem = React.forwardRef<
  HTMLElement,
  NavItemProps & React.HtmlHTMLAttributes<HTMLElement>
>((props) => {
  return <NavItemComponent {...props} />;
});
