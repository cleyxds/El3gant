export default (string: string) => {
  return string
    .normalize("NFD")
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
}
