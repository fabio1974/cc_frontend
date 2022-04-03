import React from "react";
import { AiFillHome } from "react-icons/ai";
import { IoIosPaper, IoMdPeople } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

export const SidebarData = [
  {
    title: "Pesquisa Sigv",
    path: "/",
    icon: <FaSearch />,
    cName: "nav-text",
  },
  {
    title: "Listar Boletos",
    path: "/boleto",
    icon: <IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Criar Boleto",
    path: "/boletoAvulso",
    icon: <IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Pesquisa Cliente",
    path: "/pesquisaCliente",
    icon: <IoIosPaper />,
    cName: "nav-text",
  },
];
