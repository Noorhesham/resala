"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import Actions from "@/app/components/Actions";
import Name from "@/app/components/Name";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "images",
    header: "",
    cell: ({ row }) => (
      <div className="relative w-12 h-12 rounded-lg">
        <Image src={row.original.images?.[0]?.secure_url} className="rounded-lg object-cover" fill alt="course image" />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Course Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <Name href={`/dashboard/course/${row.original._id}`} name={row.original.name} />,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Description
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell({ row }) {
      return <Name href={`/dashboard/course/${row.original._id}`} name={row.original.description} />;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center font-medium">{`$${row.original.price.toFixed(2)}`}</div>,
  },
  {
    id: "actions",

    cell: ({ row }) => {
      const course = row.original;
      console.log(row.original);
      return <Actions sheet={true} product={course} />;
    },
  },
];
