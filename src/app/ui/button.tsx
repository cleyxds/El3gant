"use client"

import styled from "styled-components"

import { base_poppins } from "./text"

export const Button = styled.button`
  ${base_poppins};
  padding: 6px 12px;
  border: 0.8px solid #ffffff;
  color: #ffffff;

  transition: opacity 0.3s;
  opacity: 1;

  &:hover {
    opacity: 0.7;
    transition: opacity 0.3s;
  }
`
