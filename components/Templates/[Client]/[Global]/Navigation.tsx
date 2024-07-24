"use client";
import React, { useState, useRef, useEffect } from "react";
import NextLink from "next/link";
import { Cross as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { Dropdown, DropdownItem } from "@/Modules/Nav/NavDropdown";
import { MegaMenu, MegaMenuItem } from "@/Modules/Nav/NavMegaMenu";
import { Avatar, AvatarItem } from "@/Modules/Nav/NavAvatar";
import { NavItem } from "@/Modules/Nav/NavLink";

import ChildLink from "@/Modules/Links/ChildLink";

type MenuItems = {};

export default function Navigation({ ...props }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className={`navbar text-white px-8 py-6`} {...props}>
        <div className="flex flex-1">
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
        <div className="flex lg:hidden">
          <Hamburger toggled={isMenuOpen} size={20} toggle={setIsMenuOpen} />
        </div>
        <ul className="hidden lg:flex lg:gap-x-12">
          <MegaMenu label="Mens">
            <MegaMenuItem disabled={false}>
              <a href="#hats" className="dropdown-link">
                <h2>Hats</h2>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Neque sodales ut etiam sit. Justo donec enim diam vulputate ut.
              </p>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <a href="#hats" className="dropdown-link">
                <h2>Hats</h2>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Neque sodales ut etiam sit. Justo donec enim diam vulputate ut.
              </p>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <a href="#hats" className="dropdown-link">
                <h2>Hats</h2>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Neque sodales ut etiam sit. Justo donec enim diam vulputate ut.
              </p>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <a href="#hats" className="dropdown-link">
                <h2>Hats</h2>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Neque sodales ut etiam sit. Justo donec enim diam vulputate ut.
              </p>
            </MegaMenuItem>
          </MegaMenu>
          <MegaMenu label="Womens">
            <MegaMenuItem disabled={false}>
              <a href="#hats" className="dropdown-link">
                <h2>Hats</h2>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Neque sodales ut etiam sit. Justo donec enim diam vulputate ut.
              </p>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <a href="#hats" className="dropdown-link">
                <h2>Hats</h2>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Neque sodales ut etiam sit. Justo donec enim diam vulputate ut.
              </p>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <a href="#hats" className="dropdown-link">
                <h2>Hats</h2>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Neque sodales ut etiam sit. Justo donec enim diam vulputate ut.
              </p>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <a href="#hats" className="dropdown-link">
                <h2>Hats</h2>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Neque sodales ut etiam sit. Justo donec enim diam vulputate ut.
              </p>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <a href="#hats" className="dropdown-link">
                <h2>Hats</h2>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Neque sodales ut etiam sit. Justo donec enim diam vulputate ut.
              </p>
            </MegaMenuItem>
            <MegaMenuItem disabled={false}>
              <a href="#hats" className="dropdown-link">
                <h2>Hats</h2>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Neque sodales ut etiam sit. Justo donec enim diam vulputate ut.
              </p>
            </MegaMenuItem>
          </MegaMenu>
          <Dropdown classes="" label="Collections">
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Summer Specials"
              href="#"
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Year 'Round Highlights"
              href="#"
            />
            <DropdownItem
              disabled={false}
              classes="text-white"
              label="Clearance"
              href="#"
            />
          </Dropdown>
          <NavItem classes="" href="" label="Our Stories" />
          <NavItem classes="" href="" label="About Us" />
          <NavItem classes="" href="" label="Reach Us" />
        </ul>
        <div className=""></div>
        <div className="hidden lg:justify-end lg:flex lg:flex-1">
          <Avatar
            source="https://media.polycode.co/images/JPG/avatar.jpg"
            alt="Avatar Image"
            size={55}
            classes=""
          >
            <div className="avatar-container">
              <ul className="grid grid-cols-1 gap-y-2 ">
                <li className="">
                  <AvatarItem
                    disabled={false}
                    classes="text-white avatar-header"
                    label="Spencer Phillips"
                    subtext="hello@polycode.co"
                    href="#"
                  />
                </li>
                <li className=" my-2 border-b-2 border-seasondark-100/25"></li>
                <li className="">
                  <AvatarItem
                    disabled={false}
                    classes="text-white"
                    label="My Settings"
                    href="#"
                  />
                </li>
                <li className="">
                  <AvatarItem
                    disabled={false}
                    classes="text-white"
                    label="My Cart"
                    href="#"
                  />
                </li>
                <li className="">
                  <AvatarItem
                    disabled={false}
                    classes="text-white"
                    label="My Lists"
                    href="#"
                  />
                </li>
                <li className="">
                  <AvatarItem
                    disabled={false}
                    classes="text-white"
                    label="My Orders"
                    href="#"
                  />
                </li>
                <li className="">
                  <AvatarItem
                    disabled={false}
                    classes="text-white"
                    label="Customer Support"
                    href="#"
                  />
                </li>
                <li className="">
                  <AvatarItem
                    disabled={false}
                    classes="text-white"
                    label="Log Out"
                    href="#"
                  />
                </li>
              </ul>
            </div>
          </Avatar>
        </div>
      </nav>
      <div className={`mobile-nav ${isMenuOpen ? "mobile-open" : ""}`}>
        <ul className="nav-container">
          <Dropdown classes="" label="Mens">
            <div className="dropdown-container">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <li className="">
                  <DropdownItem
                    disabled={false}
                    classes="text-white"
                    label="Hats"
                    href="#"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
                    image=""
                  />
                </li>
                <li className="">
                  <DropdownItem
                    disabled={false}
                    classes="text-white"
                    label="Shirts"
                    href="#"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
                    image=""
                  />
                </li>
                <li className="">
                  <DropdownItem
                    disabled={false}
                    classes="text-white"
                    label="Pants"
                    href="#"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
                    image=""
                  />
                </li>
                <li className="">
                  <DropdownItem
                    disabled={false}
                    classes="text-white"
                    label="Shoes"
                    href="#"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
                    image=""
                  />
                </li>
              </ul>
            </div>
          </Dropdown>
          <Dropdown classes="" label="Womens">
            <div className="dropdown-container">
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <li className="">
                  <DropdownItem
                    disabled={false}
                    classes="text-white"
                    label="Hats"
                    href="#"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
                    image=""
                  />
                </li>
                <li className="">
                  <DropdownItem
                    disabled={false}
                    classes="text-white"
                    label="Shirts"
                    href="#"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
                    image=""
                  />
                </li>
                <li className="">
                  <DropdownItem
                    disabled={false}
                    classes="text-white"
                    label="Dresses"
                    href="#"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
                    image=""
                  />
                </li>
                <li className="">
                  <DropdownItem
                    disabled={false}
                    classes="text-white"
                    label="Pants"
                    href="#"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
                    image=""
                  />
                </li>
                <li className="">
                  <DropdownItem
                    disabled={false}
                    classes="text-white"
                    label="Shorts"
                    href="#"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
                    image=""
                  />
                </li>
                <li className="">
                  <DropdownItem
                    disabled={false}
                    classes="text-white"
                    label="Skirts"
                    href="#"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
                    image=""
                  />
                </li>
                <li className="">
                  <DropdownItem
                    disabled={false}
                    classes="text-white"
                    label="Shoes"
                    href="#"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit. Justo donec enim diam vulputate ut."
                    image=""
                  />
                </li>
              </ul>
            </div>
          </Dropdown>
          <Dropdown classes="" label="Collections">
            <div className="dropdown-container">
              <ul className="grid grid-cols-1 gap-y-2">
                <li className="">
                  <DropdownItem
                    disabled={false}
                    classes="text-white"
                    label="Summer Specials"
                    href="#"
                  />
                </li>
                <li className="">
                  <DropdownItem
                    disabled={false}
                    classes="text-white"
                    label="Year 'Round Highlights"
                    href="#"
                  />
                </li>
                <li className="">
                  <DropdownItem
                    disabled={false}
                    classes="text-white"
                    label="Clearance"
                    href="#"
                  />
                </li>
              </ul>
            </div>
          </Dropdown>
          <NavItem classes="" href="" label="Our Stories" />
          <NavItem classes="" href="" label="About Us" />
          <NavItem classes="" href="" label="Reach Us" />
        </ul>
      </div>
    </>
  );
}
