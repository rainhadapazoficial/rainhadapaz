import { Metadata } from "next";
import GruposClient from "./GruposClient";

export const metadata: Metadata = {
    title: "Grupos de Oração em Mato Grosso | Sinop e Região",
    description: "Encontre um Grupo de Oração da RCC no Mato Grosso. Localização, horários e dias de encontro em Sinop, Cuiabá e todo o estado.",
};

export default function GruposPage() {
    return <GruposClient />;
}
