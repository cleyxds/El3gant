import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Avatar from "@mui/material/Avatar"

function createData(slug: string, quantity: number, image_url?: string) {
  return { slug, quantity, image_url }
}

export default function InventoryTable({ data }: { data: InventoryItem[] }) {
  const rows = data.map((item) =>
    createData(item.slug, item.quantity, item.image_url)
  )

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                color: "#000000",
              }}
            >
              Slug
            </TableCell>

            <TableCell
              sx={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                color: "#000000",
              }}
            >
              Quantidade
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.slug}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 500,
                  color: "#000000E5",
                }}
              >
                <Avatar src={row.image_url} />

                {row.slug}
              </TableCell>

              <TableCell
                sx={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 500,
                  color: "#000000E5",
                }}
              >
                {row.quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
