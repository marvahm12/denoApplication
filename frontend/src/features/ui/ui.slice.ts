import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'

interface InitialState {
  openDialog: boolean
}
const initialState: InitialState = {
  openDialog: false,
}

const uiSlice = createSlice({
  name: 'Ui',
  initialState,
  reducers: {
    updateOpenDialog: (
      state,
      {payload: openDialog}: PayloadAction<boolean>,
    ) => {
      state.openDialog = openDialog
    },
  },
})

export const {updateOpenDialog} = uiSlice.actions

export default uiSlice.reducer

export const selectOpenDialog = (state: RootState) => state.ui.openDialog
