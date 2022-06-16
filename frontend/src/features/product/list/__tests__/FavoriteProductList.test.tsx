import {render} from 'test/index'
import FavoriteProductList from '../FavoriteProductList'

describe('FavoriteProductList', () => {
  test('Should return the list of favorite items', () => {
    const {getByText, getByAltText} = render(<FavoriteProductList />, {
      route: '/favorites',
      preloadedState: {
        product: {
          favoriteItems: [
            {
              id: 2,
              brand: 'Anna',
              name: 'High heeled sandals - Pink',
              quantity: 500,
              provider: 'Anna',
              price: 100.95,
              imageUrl:
                'https://images.unsplash.com/photo-1590099033615-be195f8d575c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop',
            },
          ],
        },
      },
    })

    expect(getByAltText(/High heeled sandals - Pink/i)).toBeInTheDocument()
    expect(getByText(/High heeled sandals - Pink/i)).toBeInTheDocument()
    expect(getByText(/100.95/i)).toBeInTheDocument()
  })
  test('Should return a message when the list is empty', () => {
    const {getByText} = render(<FavoriteProductList />, {
      route: '/favorites',
      preloadedState: {
        product: {
          favoriteItems: [],
        },
      },
    })
    expect(getByText(/no favorite item found/i)).toBeInTheDocument()
  })
})
