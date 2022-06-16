import {render, RenderType, waitFor, fireEvent} from 'test/index'
import {server, rest} from 'test/server'
import {googleAuthUrl} from 'test/mock.handlers'
import Login from '../Login'

describe('Login', () => {
  let wrapper: RenderType
  beforeEach(() => {
    wrapper = render(<Login />, {route: '/login'})
  })
  test('Should return initially the component', () => {
    const {getByText, getByLabelText} = wrapper

    expect(getByText(/welcome back/i)).toBeInTheDocument()
    expect(getByText(/log in to your account/i)).toBeInTheDocument()

    expect(getByLabelText('username')).toBeInTheDocument()
    expect(getByLabelText('username')).toHaveTextContent('')

    expect(getByLabelText('password')).toBeInTheDocument()
    expect(getByLabelText('password')).toHaveTextContent('')

    expect(getByText(/login/i)).toBeInTheDocument()
    expect(getByText(/register/i)).toBeInTheDocument()
    expect(getByText(/sign in with google/i)).toBeInTheDocument()
  })

  test('Should redirect to register page', async () => {
    const {getByText, user, history} = wrapper

    expect(getByText(/welcome back/i)).toBeInTheDocument()

    const button = getByText(/register/i)
    expect(button).toBeInTheDocument()
    await user.click(button)
    expect(history.location.pathname).toEqual('/register')
  })

  test('Should return the logged in user info successfully', async () => {
    const {getByText, user, history, getByLabelText} = wrapper

    expect(getByText(/welcome back/i)).toBeInTheDocument()
    expect(history.location.pathname).toEqual('/login')

    fireEvent.change(getByLabelText('username'), {target: {value: 'john123'}})
    fireEvent.change(getByLabelText('password'), {
      target: {value: 'sS123456789@@'},
    })

    const button = getByText(/login/i)
    expect(button).toBeInTheDocument()

    await user.click(button)
    await waitFor(() => {
      expect(history.location.pathname).toEqual('/')
    })
  })

  test('Should return an error if the password is wrong', async () => {
    const {getByText, user, history, getByLabelText} = wrapper
    server.use(
      rest.post('http://localhost/signin', async (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({message: 'Password wrong.'}))
      }),
    )

    expect(getByText(/welcome back/i)).toBeInTheDocument()
    expect(history.location.pathname).toEqual('/login')

    fireEvent.change(getByLabelText('username'), {target: {value: 'john123'}})
    fireEvent.change(getByLabelText('password'), {
      target: {value: 'sS123456789@@'},
    })

    const button = getByText(/login/i)
    expect(button).toBeInTheDocument()

    await user.click(button)
    await waitFor(() => {
      expect(getByText(/password wrong/i)).toBeInTheDocument()
    })
  })

  test('Should redirect the user to the google authentication page', async () => {
    window.open = jest.fn().mockReturnValue({})
    const {getByText, user} = wrapper

    const button = getByText(/sign in with google/i)
    expect(button).toBeInTheDocument()

    await user.click(button)
    await waitFor(() => {
      expect(window.open).toHaveBeenCalled()
      expect(window.open).toHaveBeenCalledWith(googleAuthUrl, '_self')
    })
  })
})
