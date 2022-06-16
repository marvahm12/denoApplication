import {FC, ReactElement, ReactNode} from 'react'
import {configureStore} from '@reduxjs/toolkit'
import {render, RenderOptions} from '@testing-library/react'
import {Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory, MemoryHistory} from 'history'
import {appReducer, storeMiddleware} from '../app/store'

type CustomRenderOptions = {
  route?: string
  preloadedState?: any
  renderOptions?: Omit<RenderOptions, 'wrapper'>
  history?: MemoryHistory
}

const customRender = (
  ui: ReactElement,
  {
    route = '/',
    history = createMemoryHistory({initialEntries: [route]}),
    preloadedState = {},
    ...options
  }: CustomRenderOptions = {},
) => {
  const store = configureStore({
    reducer: appReducer,
    preloadedState,
    middleware: storeMiddleware,
  })
  const WrapperProviders: FC<{children: ReactNode}> = ({children}) => {
    return <Provider store={store}>{children}</Provider>
  }
  return {
    user: userEvent.setup({pointerEventsCheck: 0}),
    history,
    ...render(
      <Router location={history.location} navigator={history}>
        {ui}
      </Router>,
      {wrapper: WrapperProviders, ...options},
    ),
  }
}

export * from '@testing-library/react'
export {customRender as render}
export type RenderType = ReturnType<typeof customRender>
