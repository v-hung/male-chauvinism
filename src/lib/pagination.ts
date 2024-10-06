import { useEffect, useState } from "react"

export type Page = {
  label: string | number,
  active:boolean,
  page: number | null
}

export const generatePaginationArray = (currentPage: number, maxPage: number) => {
  const paginationArray: Page[] = []

  // Always include the first page
  paginationArray.push({
    label: 1,
    active: 1 == currentPage,
    page: 1
  })

  // Calculate the range of pages to show around the current page
  const pagesToShow = 1
  const startPage = Math.max(2, currentPage - pagesToShow)
  const endPage = Math.min(maxPage - 1, currentPage + pagesToShow)

  // Add '...' before pages if there are gaps
  if (startPage > 2) {
    paginationArray.push({
      label: '...',
      active: false,
      page: null
    })
  }

  // Add the range of visible pages
  for (let page = startPage; page <= endPage; page++) {
    paginationArray.push({
      label: page,
      active: page == currentPage,
      page: page
    });
  }

  // Add '...' after pages if there are gaps
  if (endPage < maxPage - 1) {
    paginationArray.push({
      label: '...',
      active: false,
      page: null
    });
  }

  // Always include the last page
  if (maxPage > 1) {
    paginationArray.push({
      label: maxPage,
      active: currentPage == maxPage,
      page: maxPage
    });
  }

  return paginationArray;
}

export const usePagination = (currentPage: number, maxPage: number) => {
  const [pages, setPages] = useState<Page[]>([])

  useEffect(() => {
    setPages(generatePaginationArray(currentPage, maxPage))
  }, [currentPage, maxPage])

  return { pages}
}