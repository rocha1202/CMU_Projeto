// components/Navbar.tsx

import React from "react";
import NavbarSemLogin from "./NavbarSemLogin";
import NavbarComLogin from "./NavbarComLogin";

export default function Navbar({ logged }: { logged: boolean }) {
  return logged ? <NavbarComLogin /> : <NavbarSemLogin />;
}