import {render, fireEvent, waitFor} from 'test/index'
import Payment from '../Payment'

describe('Payment', () => {
  test('Should render initially the component', () => {
    const {getByText, getByLabelText, getByRole} = render(<Payment />, {
      route: '/payment',
    })

    const paymentTitle = getByText(/add your card/i)
    const cardNameField = getByLabelText(/cardName/i)
    const cardNumberField = getByLabelText(/cardNumber/i)
    const securityCodeField = getByLabelText(/securityCode/i)
    const expirationDate = getByLabelText(/year and month/i)
    const button = getByRole('button', {name: /confirm card/i})

    expect(paymentTitle).toBeInTheDocument()

    expect(cardNameField).toBeInTheDocument()
    expect(cardNameField).toHaveTextContent('')

    expect(cardNumberField).toBeInTheDocument()
    expect(cardNumberField).toHaveTextContent('')

    expect(securityCodeField).toBeInTheDocument()
    expect(securityCodeField).toHaveTextContent('')

    expect(expirationDate).toBeInTheDocument()

    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  test('Should return required if the input is not filled', async () => {
    const {getAllByText, user, getByLabelText} = render(<Payment />, {
      route: '/payment',
    })

    const cardNameField = getByLabelText(/cardName/i)
    const cardNumberField = getByLabelText(/cardNumber/i)
    const securityCodeField = getByLabelText(/securityCode/i)
    const expirationDate = getByLabelText(/year and month/i)

    cardNameField.focus()
    expect(cardNameField).toHaveFocus()
    await user.tab()
    fireEvent.focusOut(cardNameField)

    cardNumberField.focus()
    expect(cardNumberField).toHaveFocus()
    await user.tab()
    fireEvent.focusOut(cardNumberField)

    securityCodeField.focus()
    expect(securityCodeField).toHaveFocus()
    await user.tab()
    fireEvent.focusOut(securityCodeField)

    expirationDate.focus()
    expect(expirationDate).toHaveFocus()
    await user.tab()
    fireEvent.focusOut(expirationDate)

    expect(getAllByText(/required/i)).toHaveLength(3)
  })

  test('Should redirect to the summary page', async () => {
    const {getByRole, user, getByLabelText, history} = render(<Payment />, {
      route: '/payment',
    })

    const cardNameField = getByLabelText(/cardName/i)
    const cardNumberField = getByLabelText(/cardNumber/i)
    const securityCodeField = getByLabelText(/securityCode/i)
    const expirationDate = getByLabelText(/year and month/i)
    const button = getByRole('button', {name: /confirm card/i})

    fireEvent.change(cardNameField, {target: {value: 'john'}})
    fireEvent.change(cardNumberField, {target: {value: '1234 5678 9812 3625'}})
    fireEvent.change(securityCodeField, {target: {value: '123'}})
    fireEvent.change(expirationDate, {target: {value: '01/01/2023'}})

    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
    await user.click(button)
    await waitFor(() => {
      expect(history.location.pathname).toEqual('/summary')
    })
  })
})
