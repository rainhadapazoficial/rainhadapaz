import { supabase } from "@/lib/supabase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const revalidate = 0; // Fresh data on every visit

export default async function PedidosPage() {
    const { data: pedidos } = await supabase
        .from('prayer_requests')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="p-6">
            <Card className="rounded-3xl shadow-lg border-none bg-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-brand-blue">Pedidos de Oração</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b-2">
                                <TableHead className="font-bold text-brand-blue">Data</TableHead>
                                <TableHead className="font-bold text-brand-blue">Nome</TableHead>
                                <TableHead className="font-bold text-brand-blue">Pedido</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(pedidos || []).map((p: any) => (
                                <TableRow key={p.id} className="hover:bg-blue-50/50 transition-colors">
                                    <TableCell className="font-medium">{new Date(p.created_at).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell className="font-semibold">{p.name}</TableCell>
                                    <TableCell className="max-w-xl text-gray-600 italic">"{p.message}"</TableCell>
                                </TableRow>
                            ))}
                            {(!pedidos || pedidos.length === 0) && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-12 text-gray-500">
                                        Nenhum pedido de oração recebido ainda.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
