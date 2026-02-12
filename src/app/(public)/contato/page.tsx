import { Metadata } from "next";
import ContatoClient from "./ContatoClient";

export const metadata: Metadata = {
    title: "Contato e Localização | RCC Diocese de Sinop",
    description: "Entre em contato com a coordenação diocesana da RCC em Sinop MT. WhatsApp, e-mail e informações de atendimento local.",
};

export default function ContatoPage() {
    return <ContatoClient />;
}
