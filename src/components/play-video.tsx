"use client"

import { useState } from "react"

import Image from "next/image"

import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

import PlayVideoImg from "../assets/play.png"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min-content",
}

export default function PlayVideo() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Stack
        component={Button}
        onClick={handleOpen}
        alignItems="center"
        direction="row"
        justifyContent="center"
        gap="0.5rem"
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          bgcolor="#FFFFFF"
          borderRadius="9999px"
          padding=".75rem .75rem .75rem 1rem"
        >
          <Image src={PlayVideoImg} alt="Sub: Play video" />
        </Stack>

        <Typography
          color="#FFFFFF"
          component="span"
          fontWeight="500"
          variant="h6"
        >
          Ver vídeo
        </Typography>
      </Stack>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/5uje6WkuOjk?si=R3nk5vRBpKkrqrkt&amp;controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </Box>
      </Modal>
    </>
  )
}
