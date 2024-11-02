import Link from "next/link"

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { getOrders } from "@/app/actions/orders"

export default async function OrdersHistoryTable({ user }: { user: User }) {
  const rows = await getOrders(user?.userID)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="orders-table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography
                fontFamily="var(--font-inter)"
                fontSize=".875rem"
                fontWeight="400"
                lineHeight="1.375rem"
                color="#ACACAD"
              >
                Number ID
              </Typography>
            </TableCell>

            <TableCell align="left">
              <Typography
                fontFamily="var(--font-inter)"
                fontSize=".875rem"
                fontWeight="400"
                lineHeight="1.375rem"
                color="#ACACAD"
              >
                Efetuado em
              </Typography>
            </TableCell>

            <TableCell align="left">
              <Typography
                fontFamily="var(--font-inter)"
                fontSize=".875rem"
                fontWeight="400"
                lineHeight="1.375rem"
                color="#ACACAD"
              >
                Status
              </Typography>
            </TableCell>

            <TableCell align="left">
              <Typography
                fontFamily="var(--font-inter)"
                fontSize=".875rem"
                fontWeight="400"
                lineHeight="1.375rem"
                color="#ACACAD"
              >
                Preço
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody sx={{ overflow: "scroll" }}>
          {rows.map((row) => {
            const placed_at_NUMBER = row.placed_at as unknown as number
            const js_placed_at = placed_at_NUMBER * 1000

            return (
              <TableRow
                key={row.docID}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  <Link href={`/tracking/order/${row.orderID}`}>
                    <Typography
                      fontFamily="var(--font-inter)"
                      fontSize=".875rem"
                      fontWeight="400"
                      lineHeight="1.375rem"
                      color="#141718"
                      sx={{
                        textDecoration: "underline",
                      }}
                    >
                      #{row.orderID}
                    </Typography>
                  </Link>
                </TableCell>

                <TableCell>
                  <Typography
                    fontFamily="var(--font-inter)"
                    fontSize=".875rem"
                    fontWeight="400"
                    lineHeight="1.375rem"
                    color="#141718"
                  >
                    {format(js_placed_at, "MMMM dd, yyyy", {
                      locale: ptBR,
                    })}
                  </Typography>
                </TableCell>

                <TableCell
                  sx={{
                    textAlign: {
                      xs: "center",
                      lg: "left",
                    },
                  }}
                >
                  <Typography
                    fontFamily="var(--font-inter)"
                    fontSize=".875rem"
                    fontWeight="400"
                    lineHeight="1.375rem"
                    color="#141718"
                  >
                    {row.status}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    fontFamily="var(--font-inter)"
                    fontSize=".875rem"
                    fontWeight="400"
                    lineHeight="1.375rem"
                    color="#141718"
                  >
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(row.price)}
                  </Typography>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
