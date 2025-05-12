import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "XOR Servicio Técnico" },
    { name: "description", content: "XOR Centro de Reparación Electrónica, Somos expertos en Apple, Macbook, Iphone, Laptops y Tv" },
  ];
}

export default function Home() {
  return <Welcome />;
}
