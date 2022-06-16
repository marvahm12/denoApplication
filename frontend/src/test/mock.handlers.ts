import {rest} from './server'

const scopes = ['profile', 'email', 'openid']
const clientId = '3g0fcd42568948feb5ar89ae818b0czd'
const authEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
const redirectUri = 'http://localhost:5000/auth/google/callback'
export const googleAuthUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20',
)}&response_type=code`

export const mockedToken =
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJqb2huMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.wH8qj_DtTECvrpwREMRSribV6rRdX_6YShtWkO-GKipXZgXxdrqWKbqzhtvLJz-8zdFpUTT_c2OhJg8pWHWaBw'
export const mockedUser = {
  id: 1,
  firstName: 'john',
  lastName: 'smith',
  username: 'john123',
  phoneNumber: '+491234567898',
  email: 'john.smith@gmail.com',
  birthday: '01/01/1970',
}

export const handlers = [
  rest.post('http://localhost/signin', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        user: mockedUser,
        token: mockedToken,
      }),
    ),
  ),

  rest.get('http://localhost:3000/auth/google/url', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(googleAuthUrl))
  }),

  rest.post('http://localhost/signup', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        user: mockedUser,
        token: mockedToken,
      }),
    ),
  ),
  rest.get('http://localhost/products/search', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        products: [],
        total: 0,
      }),
    )
  }),
  rest.get('http://localhost/reviews/1', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          message: 'Nice',
          score: 2,
          productId: 1,
          user: 'john123',
          createdAt: '15/05/2020',
          updatedAt: '25/06/2021',
        },
      ]),
    )
  }),
  rest.get(
    'https://images.unsplash.com/photo-1590099033615-be195f8d575c',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}))
    },
  ),
]
