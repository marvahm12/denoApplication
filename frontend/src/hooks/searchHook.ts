import {useState} from 'react'
import {SearchRequest} from '../types/product.types'
import {useSearchProductsQuery} from '../app/api'

const usePagination = (
  searchParams: SearchRequest,
  name: string,
  itemsPerPage: number,
) => {
  const {data, isLoading} = useSearchProductsQuery({
    limit: searchParams.limit,
    offset: searchParams.offset,
    name,
  })

  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = data?.total ? Math.ceil(data.total / itemsPerPage) : 0
  const total = data?.total ?? 0

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    return data?.products.slice(begin, end)
  }

  function next() {
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage))
  }

  function prev() {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1))
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page)
    setCurrentPage(currentPage => Math.min(pageNumber, maxPage))
  }

  return {next, prev, jump, currentData, currentPage, maxPage, isLoading, total}
}

export default usePagination
