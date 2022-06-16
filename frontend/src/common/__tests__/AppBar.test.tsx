import {render, waitFor} from 'test/index'
import {mockedToken, mockedUser} from 'test/mock.handlers'
import AppBar from '../AppBar'

describe('AppBar', () => {
  test('Should render initially the component', () => {
    const {getByRole} = render(<AppBar />, {
      route: '/',
      preloadedState: {
        auth: {
          user: mockedUser,
          token: mockedToken,
        },
      },
    })

    expect(getByRole('button', {name: /buy-it/i})).toBeInTheDocument()
    expect(
      getByRole('button', {name: /account of current user/i}),
    ).toBeInTheDocument()
    expect(getByRole('button', {name: /show cart items/i})).toBeInTheDocument()
    expect(getByRole('button', {name: /show more/i})).toBeInTheDocument()
  })

  test('Should display a notification when an item added to the cart', () => {
    const {getByRole} = render(<AppBar />, {
      route: '/',
      preloadedState: {
        auth: {
          user: mockedUser,
          token: mockedToken,
        },
        product: {
          cartItems: [
            {
              item: {
                id: 1,
                brand: 'NBalance',
                name: 'CW452',
                quantity: 500,
                provider: 'NBalance',
                price: 99.95,
                imageUrl:
                  'https://images.unsplash.com/photo-1590099033615-be195f8d575c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop',
              },
              quantity: 1,
            },
          ],
        },
      },
    })

    const cartButton = getByRole('button', {name: /show cart items/i})
    expect(cartButton.firstChild).toHaveTextContent('1')
  })

  test('Should redirects the user to cart items when click the cart icon', async () => {
    const {getByRole, history, user} = render(<AppBar />, {
      route: '/',
      preloadedState: {
        auth: {
          user: mockedUser,
          token: mockedToken,
        },
        product: {
          cartItems: [
            {
              item: {
                id: 1,
                brand: 'NBalance',
                name: 'CW452',
                quantity: 500,
                provider: 'NBalance',
                price: 99.95,
                imageUrl:
                  'https://images.unsplash.com/photo-1590099033615-be195f8d575c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop',
              },
              quantity: 1,
            },
          ],
        },
      },
    })

    const cartButton = getByRole('button', {name: /show cart items/i})
    await user.click(cartButton)

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/cart')
    })
  })
})
