import {render, waitFor} from 'test/index'
import Cart from '../Cart'

describe('Cart', () => {
  test('Should initially render the component', async () => {
    const {getByLabelText, getByText, findByAltText, getByRole} = render(
      <Cart />,
      {
        route: `/cart`,
        preloadedState: {
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
      },
    )

    expect(getByText(/shopping basket/i)).toBeInTheDocument()
    expect(await findByAltText(/cw452/i)).toBeInTheDocument()
    expect(getByText(/cw452/i)).toBeInTheDocument()
    expect(getByLabelText('price')).toHaveTextContent('99.95')
    expect(getByLabelText(/item-1-quantity/i)).toBeInTheDocument()
    expect(getByText('1')).toBeInTheDocument()
    expect(getByLabelText('remove-button-1')).toBeInTheDocument()
    expect(getByLabelText('cart-subtotal')).toHaveTextContent(
      'Subtotal (1 item): $99.95',
    )
    expect(getByRole('button', {name: /checkout/i})).toBeInTheDocument()
  })

  test('Should return a message when the basket is empty', () => {
    const {getByText} = render(<Cart />, {
      route: `/cart`,
      preloadedState: {
        product: {
          cartItems: [],
        },
      },
    })

    expect(getByText('Your cart is empty')).toBeInTheDocument()
  })

  test('Should change the total when update the quantity', async () => {
    const {
      getByLabelText,
      getByText,
      findByText,
      user,
      container,
      findByLabelText,
    } = render(<Cart />, {
      route: `/cart`,
      preloadedState: {
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

    const selectQunatity = getByLabelText(/item-1-quantity/i)
    expect(selectQunatity).toBeInTheDocument()
    expect(getByText('1')).toBeInTheDocument()
    expect(getByLabelText('cart-subtotal')).toHaveTextContent(
      'Subtotal (1 item): $99.95',
    )
    await user.click(selectQunatity)
    await waitFor(() => getByText('2'), {container})
    const quantityValue = getByText('2')
    await user.click(quantityValue)
    expect(await findByText('2')).toBeInTheDocument()

    expect(await findByLabelText('cart-subtotal')).toHaveTextContent(
      'Subtotal (1 item): $199.9',
    )
  })

  test('Should remove an item from the cart list', async () => {
    const {getByLabelText, findByLabelText, user} = render(<Cart />, {
      route: `/cart`,
      preloadedState: {
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
            {
              item: {
                id: 2,
                brand: 'Anna',
                name: 'High heeled sandals - Pink',
                quantity: 500,
                provider: 'Anna',
                price: 100.95,
                imageUrl:
                  'https://images.unsplash.com/photo-1590099033615-be195f8d575c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop',
              },
              quantity: 1,
            },
          ],
        },
      },
    })

    expect(getByLabelText('cart-subtotal')).toHaveTextContent(
      'Subtotal (2 items): $200.9',
    )

    const firstProductRemoveButton = getByLabelText('remove-button-1')
    expect(firstProductRemoveButton).toBeInTheDocument()
    await user.click(firstProductRemoveButton)
    expect(await findByLabelText('cart-subtotal')).toHaveTextContent(
      'Subtotal (1 item): $100.95',
    )
  })

  test('Should render the address page when click checkout button', async () => {
    const {getByLabelText, getByText, getByRole, user, history} = render(
      <Cart />,
      {
        route: `/cart`,
        preloadedState: {
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
      },
    )

    expect(getByText(/shopping basket/i)).toBeInTheDocument()
    expect(getByLabelText('cart-subtotal')).toHaveTextContent(
      'Subtotal (1 item): $99.95',
    )
    const checkoutButton = getByRole('button', {name: /checkout/i})
    expect(checkoutButton).toBeInTheDocument()

    await user.click(checkoutButton)

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/address')
    })
  })
})
