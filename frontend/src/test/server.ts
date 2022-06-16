import {rest} from 'msw'
import {setupServer, SetupServerApi} from 'msw/node'
import {handlers} from './mock.handlers'

const server: SetupServerApi = setupServer(...handlers)
export {server, rest}
