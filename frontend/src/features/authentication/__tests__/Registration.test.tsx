import {render, RenderType, fireEvent, waitFor} from 'test/index'
import Registration from '../Registration'

describe('Login', () => {
  let wrapper: RenderType
  beforeEach(() => {
    wrapper = render(<Registration />, {route: '/register'})
  })

  test('Should return initially the component', () => {
    const {getByText, getByLabelText} = wrapper

    expect(getByText(/registration/i)).toBeInTheDocument()

    expect(getByLabelText('username')).toBeInTheDocument()
    expect(getByLabelText('username')).toHaveTextContent('')

    expect(getByLabelText('firstName')).toBeInTheDocument()
    expect(getByLabelText('firstName')).toHaveTextContent('')

    expect(getByLabelText('lastName')).toBeInTheDocument()
    expect(getByLabelText('lastName')).toHaveTextContent('')

    expect(getByLabelText('email')).toBeInTheDocument()
    expect(getByLabelText('email')).toHaveTextContent('')

    expect(getByLabelText('password')).toBeInTheDocument()
    expect(getByLabelText('password')).toHaveTextContent('')

    expect(getByLabelText('confirmPassword')).toBeInTheDocument()
    expect(getByLabelText('confirmPassword')).toHaveTextContent('')

    expect(getByLabelText(/birthday/i)).toBeInTheDocument()
    expect(getByLabelText(/birthday/i)).toHaveValue('01/01/2004')

    expect(getByLabelText('phoneNumber')).toBeInTheDocument()
    expect(getByLabelText('phoneNumber')).toHaveTextContent('')

    expect(getByText(/send/i)).toBeInTheDocument()
    expect(getByText(/cancel/i)).toBeInTheDocument()
    expect(getByText(/login/i)).toBeInTheDocument()
  })

  test('Should return an error if the fields does not match the pattern', async () => {
    const {getByLabelText, user, getByText} = wrapper

    expect(getByLabelText('username')).toBeInTheDocument()
    await user.type(getByLabelText('username'), 'j')
    expect(
      getByText('Should contain digits and lower case characters.'),
    ).toBeInTheDocument()

    expect(getByLabelText('email')).toBeInTheDocument()
    await user.type(getByLabelText('email'), 'a')
    expect(getByText('Invalid email format')).toBeInTheDocument()

    expect(getByLabelText('phoneNumber')).toBeInTheDocument()
    await user.type(getByLabelText('phoneNumber'), '123')
    expect(
      getByText('Eg: +(033)-123-456789 or +33123456789'),
    ).toBeInTheDocument()
  })

  test('Should redirects the user successfully to the homepage', async () => {
    const {getByLabelText, user, history, getByRole} = wrapper

    const usernameInput = getByLabelText('username')
    const firstNameInput = getByLabelText('firstName')
    const lastNameInput = getByLabelText('lastName')
    const emailInput = getByLabelText('email')
    const phoneNumberInput = getByLabelText('phoneNumber')
    const passwordInput = getByLabelText('password')
    const confirmPasswordInput = getByLabelText('confirmPassword')
    const birthdayInput = getByLabelText('Birthday')

    fireEvent.change(usernameInput, {target: {value: 'john123'}})
    expect(usernameInput).toHaveValue('john123')

    fireEvent.change(firstNameInput, {target: {value: 'john'}})
    expect(firstNameInput).toHaveValue('john')

    fireEvent.change(lastNameInput, {target: {value: 'smith'}})
    expect(lastNameInput).toHaveValue('smith')

    fireEvent.change(emailInput, {target: {value: 'john.smith@gmail.com'}})
    expect(emailInput).toHaveValue('john.smith@gmail.com')

    expect(birthdayInput).toHaveValue('01/01/2004')

    fireEvent.change(passwordInput, {target: {value: 'sS123456789@'}})
    expect(passwordInput).toHaveValue('sS123456789@')

    fireEvent.change(confirmPasswordInput, {target: {value: 'sS123456789@'}})
    expect(confirmPasswordInput).toHaveValue('sS123456789@')

    await fireEvent.change(phoneNumberInput, {
      target: {value: '+33123456789'},
      waitFor: 1,
    })
    expect(phoneNumberInput).toHaveValue('+33123456789')

    const submitButton = getByRole('button', {name: /send/i})

    await user.click(submitButton)

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/')
    })
  })

  test('Should redirect to login page', async () => {
    const {getByRole, getByText, user, history} = wrapper

    expect(getByText(/registration/i)).toBeInTheDocument()

    const button = getByRole('button', {name: /login/i})
    await user.click(button)
    await waitFor(() => {
      expect(history.location.pathname).toEqual('/login')
    })
  })
})
