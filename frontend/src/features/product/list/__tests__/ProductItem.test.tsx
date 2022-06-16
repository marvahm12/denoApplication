import {render} from 'test/index'
import {mockedToken, mockedUser} from 'test/mock.handlers'
import {server, rest} from 'test/server'
import ProductItem from '../ProductItem'

const mockProductName = 'CW452'
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      productName: mockProductName,
    },
  }),
}))

describe('ProductItem', () => {
  beforeEach(() => {
    server.use(
      rest.get('http://localhost/products/search', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            products: [
              {
                id: 1,
                brand: 'NBalance',
                name: 'CW452',
                quantity: 500,
                provider: 'NBalance',
                price: 99.95,
                imageUrl:
                  'https://images.unsplash.com/photo-1590099033615-be195f8d575c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop',
              },
            ],
            total: 1,
          }),
        )
      }),
    )
  })
  test('Should return the product item', async () => {
    const {findByAltText, findByText, findByRole} = render(<ProductItem />, {
      route: `/products/${mockProductName}`,
      preloadedState: {
        review: {
          reviewTree: {
            1: [{}],
          },
        },
      },
    })

    expect(await findByAltText(mockProductName)).toBeInTheDocument()
    expect(await findByText(/99.95/i)).toBeInTheDocument()
    expect(
      await findByRole('button', {name: 'Add to favorite list'}),
    ).toBeInTheDocument()
    expect(
      await findByRole('button', {name: 'Add to cart'}),
    ).toBeInTheDocument()
    expect(await findByText(/reviews/i)).toBeInTheDocument()
    expect(
      await findByRole('button', {name: /add review/i}),
    ).toBeInTheDocument()
  })

  test('Should return the update button when a user has an existent review', async () => {
    const {findByRole, findByLabelText, findByText, findAllByTestId} = render(
      <ProductItem />,
      {
        route: `/products/${mockProductName}`,
        preloadedState: {
          auth: {
            user: mockedUser,
            token: mockedToken,
          },
          review: {
            reviewTree: {
              1: [
                {
                  id: 1,
                  message: 'Nice',
                  score: 2,
                  productId: 1,
                  user: 'john123',
                  createdAt: '15/05/2020',
                  updatedAt: '25/06/2021',
                },
              ],
            },
          },
        },
      },
    )

    expect(
      await findByRole('button', {name: /update review/i}),
    ).toBeInTheDocument()

    expect(await findByText('john123')).toBeInTheDocument()

    expect(await findAllByTestId('StarIcon')).toHaveLength(2)

    expect(await findByText(/added on /i)).toBeInTheDocument()

    expect(await findByLabelText('review-message')).toHaveTextContent('Nice')
  })
})
