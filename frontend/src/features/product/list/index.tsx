import {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Pagination from '@mui/material/Pagination'
import ProductList from './ProductList'
import usePagination from '../../../hooks/searchHook'
import {updateSearchParams} from '../product.slice'
import {useAppDispatch} from '../../../hooks/storeHooks'

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function HomePage() {
  let [page, setPage] = useState(1)
  const dispatch = useAppDispatch()
  const PER_PAGE = 10

  const [searchParams, setSearchParams] = useState({
    limit: 10,
    offset: 0,
    name: '',
  })
  const debouncedSearchValue = useDebounce(searchParams.name, 500)

  const {currentData, jump, isLoading, total} = usePagination(
    {
      limit: searchParams.limit,
      offset: searchParams.offset,
    },
    debouncedSearchValue,
    PER_PAGE,
  )

  const products = currentData()
  const count = Math.ceil(total / PER_PAGE)

  const handlePaginationChange = (e: React.ChangeEvent<unknown>, p: number) => {
    setPage(p)
    jump(p)
    setSearchParams({...searchParams, offset: (p - 1) * PER_PAGE})
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    setSearchParams({...searchParams, name: value})
    dispatch(updateSearchParams({name: value}))
  }

  let content
  if (isLoading)
    content = (
      <Box sx={{pt: 0.5}}>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    )
  if (products && products.length) {
    content = (
      <>
        <ProductList products={products} />
        <Box
          style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}
        >
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            color="secondary"
            onChange={handlePaginationChange}
          />
        </Box>
      </>
    )
  }
  if (!isLoading && products && !products.length) {
    content = (
      <h2
        style={{
          display: 'block',
          position: 'relative',
          left: '40%',
          top: '60%',
        }}
      >
        No product found!
      </h2>
    )
  }

  return (
    <Box sx={{marginTop: 5}}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        inputProps={{'aria-label': 'search-field'}}
        fullWidth
        placeholder="what are you looking for?"
        onChange={handleSearchChange}
        sx={{width: '40%', left: '25%', right: '25%'}}
        variant="outlined"
      />
      {content}
    </Box>
  )
}
