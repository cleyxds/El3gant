import { Suspense } from "react"

import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Skeleton from "@mui/material/Skeleton"

import OrdersHistoryTable from "./orders-history-table"

export default function Orders({ user }: { user: User }) {
  return (
    <Stack gap="1.5rem">
      <Typography
        color="common.white"
        fontSize="1.25rem"
        lineHeight="2rem"
        fontWeight="600"
        fontFamily="var(--font-inter)"
      >
        Histórico de pedidos
      </Typography>

      <Suspense
        fallback={
          <Skeleton
            variant="rounded"
            height="95%"
            sx={{ bgcolor: "grayLine.main" }}
          />
        }
      >
        <OrdersHistoryTable user={user} />
      </Suspense>
    </Stack>
  )
}
