export type CategoryQuery = {
  categoryMain?: string
  categorySub?: string
  personType?: string
}

export const buildCategoryQuery = ({
  categoryMain,
  categorySub,
  personType,
}: CategoryQuery) => {
  const params = new URLSearchParams()
  if (categoryMain) {
    params.set('categoryMain', categoryMain)
  }
  if (categorySub && categorySub !== '전체') {
    params.set('categorySub', categorySub)
  }
  if (personType) {
    params.set('personType', personType)
  }
  return params.toString()
}
