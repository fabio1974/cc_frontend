import React from "react";
import { AiFillHome } from "react-icons/ai";
import { IoIosPaper, IoMdPeople } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Pesquisa",
    path: "/pesquisa",
    icon: <FaSearch />,
    cName: "nav-text",
  },
  {
    title: "Clientes",
    path: "/cliente",
    icon: <IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Boletos",
    path: "/boleto",
    icon: <IoIosPaper />,
    cName: "nav-text",
  },
];
