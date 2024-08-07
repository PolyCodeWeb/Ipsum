# Ipsum
 
## Current Issues

- Navbar Dropdown component & Navbar Avatar component: Adding an icon to the dropdown Type <IconType | ReactNode | JSX.ElementType> does not support React Icon input. (Works in dev, will not build production.) How can I fix this?

Problems located in files here:

- [NavDropdown.tsx](/components/Modules/Nav/NavDropdown.tsx) Lines [62 -> 65, 87, 191]
- [NavAvatar.tsx](/components/Modules/Nav/NavAvatar.tsx) Lines [57, 103, 212]