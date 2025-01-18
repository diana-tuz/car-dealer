export const baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/'

export const generateYears = (startYear: number) => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: currentYear - startYear + 1 }, (_, i) =>
    (startYear + i).toString(),
  )
}
