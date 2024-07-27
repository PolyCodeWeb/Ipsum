# Ipsum
 
## Current Issues

- Navbar mega menu (shown under Men's and Women's) links dont actually function as links.
- Navbar mega menu CSS absolute is relative to container instead of DOM, it should be a full-width container but is only to the max-width of content or to the max-width of .dropdown.

Problems located in files here:

- [NavMegaMenu.tsx](/components/Modules/Nav/NavMegaMenu.tsx)
- [Navigation.tsx](/components/Templates/[Client]/[Global]/Navigation.tsx)
- [global.css](/app/globals.css)