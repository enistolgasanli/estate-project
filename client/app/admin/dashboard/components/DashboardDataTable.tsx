"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const data: Properties[] = [
    {
        id: "m5gr84i9",
        imageSrc: "/home.jpg",
        title: "Lüks Villa",
        description: "Satılık mükemmel lüks villa",
        listing_type: "sale",
        price: "9999",
        area_m2: 100,
        beds: 1,
        baths: 1,
        toilet: 1,
        balcony: 1,
        rooms: "1+0",
        full_address: "İstanbul, Kadıköy",
        city: "İstanbul",
        district: "Kadıköy",
        property_type: "Daire",
        views_count: 100
    },
    {
        id: "m5gr84i9",
        imageSrc: "/home.jpg",
        title: "Lüks Daire",
        description: "Satılık mükemmel lüks villa",
        listing_type: "sale",
        price: "9999",
        area_m2: 100,
        beds: 1,
        baths: 1,
        toilet: 1,
        balcony: 1,
        rooms: "1+0",
        full_address: "İstanbul, Kadıköy",
        city: "İstanbul",
        district: "Kadıköy",
        property_type: "Daire",
        views_count: 100
    },
    {
        id: "m5gr84i9",
        imageSrc: "/home.jpg",
        title: "Lüks Villa",
        description: "Satılık mükemmel lüks villa",
        listing_type: "sale",
        price: "9999",
        area_m2: 100,
        beds: 1,
        baths: 1,
        toilet: 1,
        balcony: 1,
        rooms: "1+0",
        full_address: "İstanbul, Kadıköy",
        city: "İstanbul",
        district: "Kadıköy",
        property_type: "Daire",
        views_count: 100
    },
    {
        id: "m5gr84i9",
        imageSrc: "/home.jpg",
        title: "Lüks Villa",
        description: "Satılık mükemmel lüks villa",
        listing_type: "sale",
        price: "9999",
        area_m2: 100,
        beds: 1,
        baths: 1,
        toilet: 1,
        balcony: 1,
        rooms: "1+0",
        full_address: "İstanbul, Kadıköy",
        city: "İstanbul",
        district: "Kadıköy",
        property_type: "Daire",
        views_count: 100

    },
    {
        id: "m5gr84i9",
        imageSrc: "/home.jpg",
        title: "Lüks Villa",
        description: "Satılık mükemmel lüks villa",
        listing_type: "sale",
        price: "9999",
        area_m2: 100,
        beds: 1,
        baths: 1,
        toilet: 1,
        balcony: 1,
        rooms: "1+0",
        full_address: "İstanbul, Kadıköy",
        city: "İstanbul",
        district: "Kadıköy",
        property_type: "Daire",
        views_count: 100,
    },
]

export type Properties = {
    id: string
    imageSrc: string;
    title: string;
    description: string;
    listing_type: string;
    price: string;
    area_m2: number;
    beds: number;
    baths: number;
    toilet: number;
    balcony: number;
    rooms: string;
    full_address: string;
    city: string;
    district: string;
    property_type: string;
    views_count: number;
}

export const columns: ColumnDef<Properties>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "imageSrc",
        header: "Görsel",
        cell: ({ row }) => (
            <div className="relative w-[100px] h-[100px]">
                <Image
                    src="/home.jpg"
                    alt="Home"
                    fill
                    className="rounded-xl object-cover"
                />
            </div>
        )
    },
    {
        accessorKey: "title",
        size: 100,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    İlan Başlığı
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "description",
        size: 100,
        header: "Açıklama",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("description")}</div>
        ),
    },
    {
        accessorKey: "listing_type",
        size: 100,
        header: "Emlak Durumu",
        cell: ({ row }) => (
            <div className="capitalize">
                {
                    row.getValue("listing_type") === "sale" ? (
                        <span>
                            Satılık
                        </span>
                    ) : (
                        <span>
                            Kiralık
                        </span>
                    )
                }
            </div>
        ),
    },
    {
        accessorKey: "price",
        size: 100,
        header: "Fiyat",
        cell: ({ row }) => (
            <div className="capitalize"><span className="font-semibold">₺</span> {row.getValue("price")}</div>
        ),
    },
    {
        accessorKey: "area_m2",
        size: 100,
        header: "Metrekare",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("area_m2")}</div>
        ),
    },
    {
        accessorKey: "beds",
        size: 100,
        header: "Yatak Odası Sayısı",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("beds")}</div>
        ),
    },
    {
        accessorKey: "baths",
        size: 100,
        header: "Banyo Sayısı",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("baths")}</div>
        ),
    },
    {
        accessorKey: "toilet",
        size: 100,
        header: "Tuvalet Sayısı",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("toilet")}</div>
        ),
    },
    {
        accessorKey: "balcony",
        size: 100,
        header: "Balkon Sayısı",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("balcony")}</div>
        ),
    },
    {
        accessorKey: "rooms",
        size: 100,
        header: "Oda Sayısı",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("rooms")}</div>
        ),
    },
    {
        accessorKey: "full_address",
        size: 100,
        header: "Adres",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("full_address")}</div>
        ),
    },
    {
        accessorKey: "city",
        size: 100,
        header: "İl",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("city")}</div>
        ),
    },
    {
        accessorKey: "district",
        size: 100,
        header: "İlçe",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("district")}</div>
        ),
    },
    {
        accessorKey: "property_type",
        size: 100,
        header: "Ev Türü",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("property_type")}</div>
        ),
    },
    {
        accessorKey: "views_count",
        size: 100,
        header: "Görüntülenme Sayısı",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("views_count")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center gap-x-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 transition-all duration-500 cursor-pointer">
                                Güncelle
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Değişiklikleri Onayla</DialogTitle>
                            <DialogDescription>Onaylarsanız yaptığınız değişiklikler kaydedilecek ve geri alınamayacaktır.</DialogDescription>
                            <div className="flex items-center justify-start gap-x-4 mt-4">
                                <Button variant="default" className="bg-neutral-200 text-neutral-800 hover:bg-neutral-300 transition-all duration-500 cursor-pointer">
                                    İptal
                                </Button>
                                <Button variant="default" className="bg-green-500 hover:bg-green-600 transition-all duration-500 cursor-pointer">
                                    Onayla
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="default" className="bg-rose-600 hover:bg-rose-700 transition-all duration-500 cursor-pointer">
                                Kaldır
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>İlanı Kaldırma Onayı</DialogTitle>
                            <DialogDescription>Bu ilanı kaldırmak istediğinize emin misiniz? Bu işlem geri alınamaz.</DialogDescription>
                            <div className="flex items-center justify-start gap-x-4 mt-4">
                                <Button variant="default" className="bg-neutral-200 text-neutral-800 hover:bg-neutral-300 transition-all duration-500 cursor-pointer">
                                    İptal
                                </Button>
                                <Button variant="default" className="bg-rose-600 hover:bg-rose-700 transition-all duration-500 cursor-pointer">
                                    Kaldır
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            )
        },
    },
]

export function DashboardDataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center justify-between gap-x-8 py-4">
                <Input
                    placeholder="İlan Başlığı"
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="flex items-center justify-center gap-x-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="default" className="bg-[#191919] hover:bg-[#333] transition-all duration-500 cursor-pointer">
                                İlan Ekle
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle className="hidden" />
                            test
                        </DialogContent>
                    </Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Sütun <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} style={{ width: `${header.column.getSize()}px` }} className="px-8 text-center w-[150px]">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} style={{ width: `${cell.column.getSize()}px` }} className="text-center">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} satır seçildi.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Önceki Sayfa
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Diğer Sayfa
                    </Button>
                </div>
            </div>
        </div>
    )
}
