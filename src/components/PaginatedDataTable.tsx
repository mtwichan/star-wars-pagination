import {
  Table as ReactTable,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import { Table, Tbody, Tr, Td, Flex, Button, Text } from "@chakra-ui/react";

export function PaginatedDataTable({
  data,
  columns,
  page,
  maxPage,
  setSelectedRow,
  setPagination,
}: {
  data: any[];
  columns: ColumnDef<any>[];
  page: number;
  maxPage: number | undefined;
  setSelectedRow: any;
  setPagination: any;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  return (
    <>
      <Table
        __css={{
          "table-layout": "fixed",
          width: "full",
          borderCollapse: "separate",
          borderSpacing: "0 0.5rem",
        }}
      >
        <Tbody p={5}>
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr
                key={row.id}
                background="white"
                width="100%"
                textAlign="left"
                _hover={{ background: "darkseagreen" }}
                _focus={{ background: "darkseagreen" }}
                onClick={(e) => {
                  setSelectedRow(row.original);
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td
                      key={cell.id}
                      textAlign="left"
                      padding={2}
                      borderRadius="5px"
                      border="2px solid black"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <br />
      <Flex gap={2} justifyContent={"center"} alignItems={"center"}>
        <Button
          onClick={() => {
            const newPageIndex = page - 1;
            if (newPageIndex <= 0) {
              return;
            }
            setPagination(newPageIndex);
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          size="sm"
        >
          {"<"}
        </Button>
        <Button
          onClick={() => {
            const newPageIndex = page + 1;
            if (newPageIndex > maxPage) {
              return;
            }
            
            setPagination(newPageIndex);
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          size="sm"
        >
          {">"}
        </Button>
        <span>
          <Text color="white">
            Page: {page} of {maxPage}
          </Text>
        </span>
      </Flex>
    </>
  );
}
