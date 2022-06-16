import {render, waitFor} from 'test/index'
import Summary from '../Summary'

describe('Summary', () => {
  test('Should render initially the component', () => {
    const {getByText, getByLabelText, getByRole} = render(<Summary />, {
      route: '/summary',
      preloadedState: {
        product: {
          address: {
            name: 'john',
            phoneNumber: '+33123456789',
            address: '3393 Ronny Way Apt. 742',
            zipCode: '17839',
            city: 'Larrymouth',
            country: 'USA',
          },
        },
      },
    })

    const summaryTitle = getByText(/order placed successfully/i)
    const successIcon = getByLabelText(/success-icon/i)
    const deliveryAddress = getByText(/delivery address:/i)
    const button = getByRole('button', {name: /back to home/i})

    expect(summaryTitle).toBeInTheDocument()
    expect(successIcon).toBeInTheDocument()
    expect(deliveryAddress).toBeInTheDocument()
    expect(deliveryAddress).toHaveTextContent(
      /delivery address: john, 3393 Ronny Way Apt. 742, Larrymouth, 17839, USA/i,
    )
    expect(button).toBeInTheDocument()
  })

  test('Should redirect to the home page when click the button', async () => {
    const {getByRole, user, history} = render(<Summary />, {
      route: '/summary',
      preloadedState: {
        product: {
          address: {
            name: 'john',
            phoneNumber: '+33123456789',
            address: '3393 Ronny Way Apt. 742',
            zipCode: '17839',
            city: 'Larrymouth',
            country: 'USA',
          },
        },
      },
    })

    const button = getByRole('button', {name: /back to home/i})
    expect(button).toBeInTheDocument()

    await user.click(button)
    await waitFor(() => {
      expect(history.location.pathname).toEqual('/')
    })
  })
})
