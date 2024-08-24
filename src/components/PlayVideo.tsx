"use client"

import Image from "next/image"

import { useState } from "react"

import styled from "styled-components"

import { Dialog } from "@headlessui/react"

import { Text } from "../ui/text"

import PlayVideoImg from "../assets/play.png"

export function PlayVideo() {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <>
      <PlayVideoContainer onClick={handleOpen}>
        <PlayIcon>
          <Image src={PlayVideoImg} alt="Sub: Play video" />
        </PlayIcon>

        <PlayVideoText as="span">Ver vídeo</PlayVideoText>
      </PlayVideoContainer>

      <Dialog open={isOpen} onClose={handleClose} className="fixed z-50">
        <Backdrop />

        <ScrollablePanel>
          <Wrapper>
            <Dialog.Panel>
              <VideoContainer>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/5uje6WkuOjk?si=R3nk5vRBpKkrqrkt&amp;controls=0"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </VideoContainer>
            </Dialog.Panel>
          </Wrapper>
        </ScrollablePanel>
      </Dialog>
    </>
  )
}

const PlayVideoContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const PlayIcon = styled.div`
  padding: 12px 12px 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 9999px;
  gap: 8px;
`

const PlayVideoText = styled(Text)`
  font-weight: 500;
  font-size: 18px;
`

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* padding: 24px; */
`

export const Backdrop = styled.div.attrs({ "aria-hidden": true })`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(8px);
  z-index: 3;
`

export const ScrollablePanel = styled.div`
  position: fixed;
  inset: 0;
  width: 100dvw;
  overflow-y: auto;
  z-index: 4;
`

export const Wrapper = styled.div`
  display: flex;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  padding: 16px;
`
