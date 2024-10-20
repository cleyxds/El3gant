import { alpha } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import Image from "@/components/image"

import theme from "@/theme"

const scrollerEnabled = false

export default function MultipleImagesScroller({ data }: { data: Product }) {
  return (
    <Stack direction="row" gap="2rem" alignItems="center">
      <Image
        width={412}
        height={412}
        src={data.image_url}
        alt={data.title}
        sx={{ objectFit: "cover" }}
      />

      {scrollerEnabled && (
        <Stack alignItems="center" gap="0.5rem" position="relative">
          <Typography fontSize=".75rem" fontWeight="700" color="common.white">
            01
          </Typography>

          <Box width="1px" height="7.5rem" bgcolor="#E5E5E5" />

          <Box
            component={Button}
            sx={{
              width: "5px",
              minWidth: "5px",
              borderRadius: 0,
              padding: 0,
              top: "26px",
              left: "34%",
              bgcolor: "common.white",
              height: "1.375rem",
              position: "absolute",

              "&:hover": {
                backgroundColor: alpha(theme.palette.common.white, 0.8),
              },
            }}
          />

          <Typography fontSize=".75rem" fontWeight="700" color="common.white">
            03
          </Typography>
        </Stack>
      )}
    </Stack>
  )
}
