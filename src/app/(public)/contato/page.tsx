import { Metadata } from "next";
import ContatoClient from "./ContatoClient";

export const metadata: Metadata = {
    title: "Contato e Localização | Grupo Rainha da Paz",
    description: "Entre em contato com o Grupo de Oração Rainha da Paz em Sinop MT. WhatsApp, e-mail e informações de atendimento.",
};

export default function ContatoPage() {
    return <ContatoClient />;
}
