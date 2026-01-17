export type CategoryQuery = {
  categoryMain?: string
  categorySub?: string
}

export const buildCategoryQuery = ({
  categoryMain,
  categorySub,
}: CategoryQuery) => {
  const params = new URLSearchParams()
  if (categoryMain) {
    params.set('categoryMain', categoryMain)
  }
  if (categorySub && categorySub !== '전체') {
    params.set('categorySub', categorySub)
  }
  return params.toString()
}
