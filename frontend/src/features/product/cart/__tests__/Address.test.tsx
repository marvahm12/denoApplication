import {render, fireEvent, waitFor} from 'test/index'
import Address from '../Address'

describe('Address', () => {
  test('Should return initially the component', () => {
    const {getByLabelText, getByRole} = render(<Address />, {
      route: '/address',
    })

    const nameField = getByLabelText('name')
    const phoneNumberField = getByLabelText('phoneNumber')
    const addressField = getByLabelText('address')
    const zipCodeField = getByLabelText('zipCode')
    const cityField = getByLabelText('city')
    const countryField = getByLabelText('country')
    const button = getByRole('button', {name: /confirm address/i})

    expect(nameField).toBeInTheDocument()
    expect(nameField).toHaveTextContent('')

    expect(phoneNumberField).toBeInTheDocument()
    expect(phoneNumberField).toHaveTextContent('')

    expect(addressField).toBeInTheDocument()
    expect(addressField).toHaveTextContent('')

    expect(zipCodeField).toBeInTheDocument()
    expect(zipCodeField).toHaveTextContent('')

    expect(cityField).toBeInTheDocument()
    expect(cityField).toHaveTextContent('')

    expect(countryField).toBeInTheDocument()
    expect(countryField).toHaveTextContent('')

    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  test('Should return an error if phoneNumber input does not match the pattern', async () => {
    const {getByLabelText, getByText} = render(<Address />, {
      route: '/address',
    })

    const nameField = getByLabelText('name')
    expect(nameField).toBeInTheDocument()
    fireEvent.change(nameField, {target: {value: 'john'}})
    expect(nameField).toHaveValue('john')
    const phoneNumberField = getByLabelText('phoneNumber')
    fireEvent.change(phoneNumberField, {target: {value: '125'}})
    expect(
      getByText('Eg: +(033)-123-456789 or +33123456789'),
    ).toBeInTheDocument()
  })

  test('Should return required if the input is not filled', async () => {
    const {getByLabelText, getAllByText, user} = render(<Address />, {
      route: '/address',
    })

    const nameField = getByLabelText('name')
    const phoneNumberField = getByLabelText('phoneNumber')
    const addressField = getByLabelText('address')
    const zipCodeField = getByLabelText('zipCode')
    const cityField = getByLabelText('city')
    const countryField = getByLabelText('country')

    nameField.focus()
    expect(nameField).toHaveFocus()
    await user.tab()
    fireEvent.focusOut(nameField)

    phoneNumberField.focus()
    expect(phoneNumberField).toHaveFocus()
    await user.tab()
    fireEvent.focusOut(phoneNumberField)

    addressField.focus()
    expect(addressField).toHaveFocus()
    await user.tab()
    fireEvent.focusOut(addressField)

    zipCodeField.focus()
    expect(zipCodeField).toHaveFocus()
    await user.tab()
    fireEvent.focusOut(zipCodeField)

    cityField.focus()
    expect(cityField).toHaveFocus()
    await user.tab()
    fireEvent.focusOut(cityField)

    countryField.focus()
    expect(countryField).toHaveFocus()
    await user.tab()
    fireEvent.focusOut(countryField)
    expect(getAllByText(/required/i)).toHaveLength(6)
  })

  test('Should redirect to payment page when all the fields are valid', async () => {
    const {getByLabelText, getByText, user, history} = render(<Address />, {
      route: '/address',
    })

    const nameField = getByLabelText('name')
    const phoneNumberField = getByLabelText('phoneNumber')
    const addressField = getByLabelText('address')
    const zipCodeField = getByLabelText('zipCode')
    const cityField = getByLabelText('city')
    const countryField = getByLabelText('country')
    const button = getByText(/confirm address/i)

    fireEvent.change(nameField, {target: {value: 'john'}})
    fireEvent.change(phoneNumberField, {target: {value: '+33123456789'}})
    fireEvent.change(addressField, {target: {value: '3393 Ronny Way Apt. 742'}})
    fireEvent.change(zipCodeField, {target: {value: '17839'}})
    fireEvent.change(cityField, {target: {value: 'Larrymouth'}})
    fireEvent.change(countryField, {target: {value: 'USA'}})

    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
    await user.click(button)
    await waitFor(() => {
      expect(history.location.pathname).toEqual('/payment')
    })
  })
})
