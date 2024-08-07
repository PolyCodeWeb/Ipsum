"use client";
import React, { useState, useRef, useEffect } from "react";
import NextLink from "next/link";
import { Cross as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { Dropdown, DropdownItem } from "@/Modules/Nav/NavDropdown";
import { MegaMenu, MegaMenuItem } from "@/Modules/Nav/NavMegaMenu";
import { Avatar, AvatarItem } from "@/Modules/Nav/NavAvatar";
import { NavItem } from "@/Modules/Nav/NavLink";

import { FaCircleUser } from "react-icons/fa6";

import ChildLink from "@/Modules/Links/ChildLink";

type MenuItems = {};

export default function Navigation({ ...props }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* create a ticker component for here: use https://www.greats.com/ as reference */}
      <nav className="">{/* Our Stories     About Us     Reach Us */}</nav>
      <nav
        className={`navbar border-b-2 border-season-500 bg-transparent text-white px-8 py-4`}
        {...props}
      >
        <div className="flex flex-1 justify-start">
          <NextLink
            className="p-1 -m-1 flex flex-row gap-2 align-middle"
            href=""
            passHref
          >
            <svg className="group" height="75" viewBox="0 0 32 32" width="75">
              <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                className="fill-current group-hover:fill-season-500"
                fillRule="evenodd"
              />
            </svg>
            <span className="sr-only">ACME</span>
          </NextLink>
        </div>
        <div className="flex lg:hidden justify-end">
          <Hamburger toggled={isMenuOpen} size={20} toggle={setIsMenuOpen} />
        </div>
        <ul className="hidden lg:flex lg:gap-x-12">
          <MegaMenu theme="bg-season-500" label="Mens">
            <MegaMenuItem disabled={false}>
              <>
                <h3 className="font-bold uppercase text-base mb-2 pb-2 border-b-2 border-seasondark-400/65">
                  Featured
                </h3>
                <NextLink href="#hats" passHref className="dropdown-link">
                  New Arrivals
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Our Best Sellers
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Just The Essentials
                </NextLink>
              </>
              <>
                <h3 className="font-bold uppercase text-base mt-2 mb-2 pb-2 border-b-2 border-seasondark-400/65">
                  Categories
                </h3>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Shirts
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Pants
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Shoes
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Accessories
                </NextLink>
              </>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <>
                <h3 className="font-bold uppercase text-base mb-2 pb-2 border-b-2 border-seasondark-400/65">
                  Collections
                </h3>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Tropical Vacation Line
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Men Can Wear Flowers
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Lilac Is In Season
                </NextLink>
              </>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <NextLink href="#" passHref className="">
                <img
                  src="https://www.taylorstitch.com/cdn/shop/files/ts__nav_feature_essentials_sidebyside_desktop_1024x1024.jpg?v=1695666364"
                  alt="placeholder"
                  className="max-w-64 h-auto rounded-sm"
                />
                <h4 className="text-center font-semibold text-base mt-2">
                  Collections
                </h4>
              </NextLink>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <NextLink href="#" passHref className="">
                <img
                  src="https://www.taylorstitch.com/cdn/shop/files/ts__nav_feature_essentials_sidebyside_desktop_1024x1024.jpg?v=1695666364"
                  alt="placeholder"
                  className="max-w-64 h-auto rounded-sm"
                />
                <h4 className="text-center font-semibold text-base mt-2">
                  Collections
                </h4>
              </NextLink>
            </MegaMenuItem>
          </MegaMenu>
          <MegaMenu theme="bg-season-500" label="Womens">
            <MegaMenuItem disabled={false}>
              <NextLink href="#" passHref className="">
                <img
                  src="https://www.taylorstitch.com/cdn/shop/files/ts__nav_feature_essentials_sidebyside_desktop_1024x1024.jpg?v=1695666364"
                  alt="placeholder"
                  className="max-w-64 h-auto rounded-sm"
                />
                <h4 className="text-center font-semibold text-base mt-2">
                  Collections
                </h4>
              </NextLink>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <NextLink href="#" passHref className="">
                <img
                  src="https://www.taylorstitch.com/cdn/shop/files/ts__nav_feature_essentials_sidebyside_desktop_1024x1024.jpg?v=1695666364"
                  alt="placeholder"
                  className="max-w-64 h-auto rounded-sm"
                />
                <h4 className="text-center font-semibold text-base mt-2">
                  Collections
                </h4>
              </NextLink>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <>
                <h3 className="font-bold uppercase text-base mb-2 pb-2 border-b-2 border-seasondark-400/65">
                  Featured
                </h3>
                <NextLink href="#hats" passHref className="dropdown-link">
                  New Arrivals
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Our Best Sellers
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Just The Essentials
                </NextLink>
              </>
              <>
                <h3 className="font-bold uppercase text-base mt-2 mb-2 pb-2 border-b-2 border-seasondark-400/65">
                  Categories
                </h3>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Shirts
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Pants
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Shoes
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Accessories
                </NextLink>
              </>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <>
                <h3 className="font-bold uppercase text-base mb-2 pb-2 border-b-2 border-seasondark-400/65">
                  Collections
                </h3>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Tropical Vacation Line
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Glow In Yellow
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  The Floral Collection
                </NextLink>
              </>
            </MegaMenuItem>
          </MegaMenu>
          <MegaMenu theme="bg-season-500" label="Childrens">
            <MegaMenuItem disabled={false}>
              <NextLink href="#" passHref className="">
                <img
                  src="https://www.taylorstitch.com/cdn/shop/files/ts__nav_feature_essentials_sidebyside_desktop_1024x1024.jpg?v=1695666364"
                  alt="placeholder"
                  className="max-w-64 h-auto rounded-sm"
                />
                <h4 className="text-center font-semibold text-base mt-2">
                  Collections
                </h4>
              </NextLink>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <>
                <h3 className="font-bold uppercase text-base mb-2 pb-2 border-b-2 border-seasondark-400/65">
                  Featured
                </h3>
                <NextLink href="#hats" passHref className="dropdown-link">
                  New Arrivals
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Our Best Sellers
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Just The Essentials
                </NextLink>
              </>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <>
                <h3 className="font-bold uppercase text-base mt-2 mb-2 pb-2 border-b-2 border-seasondark-400/65">
                  Categories
                </h3>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Shirts
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Pants
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Shoes
                </NextLink>
                <NextLink href="#hats" passHref className="dropdown-link">
                  Accessories
                </NextLink>
              </>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <NextLink href="#" passHref className="">
                <img
                  src="https://www.taylorstitch.com/cdn/shop/files/ts__nav_feature_essentials_sidebyside_desktop_1024x1024.jpg?v=1695666364"
                  alt="placeholder"
                  className="max-w-64 h-auto rounded-sm"
                />
                <h4 className="text-center font-semibold text-base mt-2">
                  Collections
                </h4>
              </NextLink>
            </MegaMenuItem>
          </MegaMenu>
        </ul>
        <div className=""></div>
        <div className="hidden lg:justify-end lg:flex lg:flex-1">
          <Avatar
            image={true}
            imageSource="https://media.polycode.co/images/JPG/avatar.jpg"
            imageSize="45"
            imageAlt="Avatar Image"
            imageClasses=""
            position="right"
            theme="bg-zinc-800"
          >
            <div className="avatar-container">
              <ul className="grid grid-cols-1 gap-y-2 ">
                <li className="">
                  <AvatarItem
                    disabled={false}
                    classes="dropdown-header"
                    label="Spencer Phillips"
                    subtext="hello@polycode.co"
                    href="#"
                    theme="hover:bg-season-600 text-white"
                  />
                </li>
                <li className=" mb-2 border-b-2 border-seasondark-100/25"></li>
                <li className="">
                  <AvatarItem
                    disabled={false}
                    classes="text-white"
                    label="My Settings"
                    href="#"
                    theme="hover:bg-zinc-900 text-white"
                  />
                </li>
                <li className="">
                  <AvatarItem
                    disabled={false}
                    classes="text-white"
                    label="My Cart"
                    href="#"
                    theme="hover:bg-zinc-900 text-white"
                  />
                </li>
                <li className="">
                  <AvatarItem
                    disabled={false}
                    classes="text-white"
                    label="My Lists"
                    href="#"
                    theme="hover:bg-zinc-900 text-white"
                  />
                </li>
                <li className="">
                  <AvatarItem
                    disabled={false}
                    classes="text-white"
                    label="My Orders"
                    href="#"
                    theme="hover:bg-zinc-900 text-white"
                  />
                </li>
                <li className="">
                  <AvatarItem
                    disabled={false}
                    classes="text-white"
                    label="Customer Support"
                    href="#"
                    theme="hover:bg-zinc-900 text-white"
                  />
                </li>
                <li className="">
                  <AvatarItem
                    disabled={false}
                    classes="text-white"
                    label="Log Out"
                    href="#"
                    theme="hover:bg-zinc-900 text-white"
                  />
                </li>
              </ul>
            </div>
          </Avatar>
        </div>
      </nav>
      <div
        className={`mobile-nav bg-seasondark-400 ${
          isMenuOpen ? "mobile-open" : ""
        }`}
      >
        <ul className="nav-container">
          <Dropdown classes="" theme="" label="Mens">
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Hats"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
              theme="hover:bg-season-500"
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Shirts"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Pants"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Shoes"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
            />
          </Dropdown>

          <Dropdown classes="" theme="" label="Womens">
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Hats"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
              theme="hover:bg-season-500"
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Shirts"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Pants"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Shoes"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
            />
          </Dropdown>

          <Dropdown classes="" theme="" label="Childrens">
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Hats"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
              theme="hover:bg-season-500"
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Shirts"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Pants"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Shoes"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
            />
          </Dropdown>

          <div className="divider bg-seasondark-600/65"></div>

          <NavItem classes="" href="" label="Our Stories" />
          <NavItem classes="" href="" label="About Us" />
          <NavItem classes="" href="" label="Reach Us" />

          <div className="divider bg-seasondark-600/65"></div>
          <Dropdown
            hasIcon={true}
            icon={<FaCircleUser />}
            classes=""
            theme=""
            label="Spencer Phillips"
          >
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="My Settings"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
              theme="hover:bg-season-500"
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="My Cart"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="My Lists"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="My Orders"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Customer Support"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Logout"
              href="#"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
              image=""
            />
          </Dropdown>
        </ul>
      </div>
    </>
  );
}
