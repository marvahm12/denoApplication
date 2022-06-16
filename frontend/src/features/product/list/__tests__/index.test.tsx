import {render, RenderType, fireEvent, waitFor} from 'test/index'
import {server, rest} from 'test/server'
import HomePage from '../index'

describe('Product list', () => {
  test('Should return no product found if the list is empty', async () => {
    const wrapper: RenderType = render(<HomePage />, {
      route: '/register',
    })
    const {getByText} = wrapper
    expect(getByText(/no product found!/i)).toBeInTheDocument()
  })

  test('Should the list of products', async () => {
    server.use(
      rest.get('http://localhost/products/search', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.set('Content-Type', 'application/json'),
          ctx.json({
            products: [
              {
                id: 1,
                brand: 'NBalance',
                name: 'CW452 - Trainers - Pink',
                quantity: 500,
                provider: 'NBalance',
                price: 99.95,
                imageUrl:
                  'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop',
              },
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
            total: 2,
          }),
        )
      }),
    )
    const wrapper: RenderType = render(<HomePage />, {
      route: '/register',
    })
    const {findAllByRole, findByText, getByLabelText, getByPlaceholderText} =
      wrapper

    const infoButtons = await findAllByRole('button', {
      name: /more-info-button/i,
    })
    const favoriteListButtons = await findAllByRole('button', {
      name: /add-to-favorite-list/i,
    })
    const addToCartButtons = await findAllByRole('button', {
      name: /add-to-cart/i,
    })
    const firstProductName = await findByText(/CW452 - Trainers - Pink/i)
    const secondProductName = await findByText(/High heeled sandals - Pink/i)
    const pageButtons = await findAllByRole('button', {name: /page [0-9]/i})
    const searchField = getByLabelText('search-field')

    expect(infoButtons).toHaveLength(2)
    expect(favoriteListButtons).toHaveLength(2)
    expect(addToCartButtons).toHaveLength(2)
    expect(firstProductName).toBeInTheDocument()
    expect(secondProductName).toBeInTheDocument()
    expect(pageButtons).toHaveLength(1)
    expect(searchField).toBeInTheDocument()
    expect(
      getByPlaceholderText('what are you looking for?'),
    ).toBeInTheDocument()
  })

  test('Should update the Search field when change the value', async () => {
    const wrapper: RenderType = render(<HomePage />, {
      route: '/register',
    })
    const {getByLabelText} = wrapper

    const searchField = getByLabelText(/search-field/i)
    fireEvent.change(searchField, {target: {value: 'new product name'}})

    await waitFor(() => {
      expect(searchField).toHaveValue('new product name')
    })
  })
})
