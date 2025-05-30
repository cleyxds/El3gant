import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 48 48"
    {...props}
  >
    <path d="M16.5 5C10.166 5 5 10.166 5 16.5v15C5 37.833 10.166 43 16.5 43h15C37.833 43 43 37.833 43 31.5v-15C43 10.166 37.833 5 31.5 5h-15zm0 3h15c4.711 0 8.5 3.788 8.5 8.5v15c0 4.711-3.789 8.5-8.5 8.5h-15A8.478 8.478 0 0 1 8 31.5v-15C8 11.788 11.788 8 16.5 8zM34 12a2 2 0 1 0-.001 3.999A2 2 0 0 0 34 12zm-10 2c-5.505 0-10 4.495-10 10s4.495 10 10 10 10-4.495 10-10-4.495-10-10-10zm0 3c3.883 0 7 3.117 7 7s-3.117 7-7 7-7-3.117-7-7 3.117-7 7-7z" />
  </svg>
)

export default SvgComponent
