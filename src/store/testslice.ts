import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: '',
}

const receiverAddressSlice = createSlice({
    name: 'receiver',
    initialState,
    reducers: {
        selectReceiver(state, action) {
            const address = action.payload;
            state.value = address;
        }
    }
});

export const { selectReceiver } = receiverAddressSlice.actions;


export const reducer = receiverAddressSlice.reducer;