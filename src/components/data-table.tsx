"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MoreHorizontal, Download, Plus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const initialData = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "Active", amount: "$150.00", date: "2024-03-20" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", status: "Inactive", amount: "$85.00", date: "2024-03-19" },
    { id: "3", name: "Charlie Brown", email: "charlie@example.com", status: "Active", amount: "$230.50", date: "2024-03-18" },
    { id: "4", name: "Diana Prince", email: "diana@example.com", status: "Pending", amount: "$0.00", date: "2024-03-17" },
    { id: "5", name: "Edward Norton", email: "edward@example.com", status: "Active", amount: "$99.99", date: "2024-03-16" },
    { id: "6", name: "Fiona Gallagher", email: "fiona@example.com", status: "Active", amount: "$45.00", date: "2024-03-15" },
];

export default function DataTableDemo() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = initialData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card className="shadow-sm border-primary/10 mt-6">
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>Manage your recent customer transactions and payments.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-9">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Button size="sm" className="h-9">
                            <Plus className="mr-2 h-4 w-4" />
                            New Transaction
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mb-4 gap-4">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter by name or email..."
                            className="pl-8 h-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="ghost" size="sm" className="h-10 px-3">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="w-[200px]">Customer</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            item.status === "Active" ? "default" :
                                                item.status === "Pending" ? "outline" : "secondary"
                                        } className={
                                            item.status === "Active" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : ""
                                        }>
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-mono">{item.amount}</TableCell>
                                    <TableCell className="text-muted-foreground">{item.date}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.id)}>
                                                    Copy ID
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>View customer</DropdownMenuItem>
                                                <DropdownMenuItem>View payment details</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
