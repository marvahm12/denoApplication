// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import {api} from 'app/api'
import {store} from 'app/store'
import {server} from './test/server'

beforeAll(() => server.listen({}))

afterEach(() => {
  server.resetHandlers()
  store.dispatch(api.util.resetApiState())
})

afterAll(() => server.close())
