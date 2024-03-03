"use client"

import styled, { css } from "styled-components"

export const base_poppins = css`
  font-family: var(--font-poppins);
  font-weight: 400;
`

export const Text = styled.p`
  ${base_poppins};
  font-weight: 500;
  font-size: 1.5rem;
  color: #ffffff;
`
