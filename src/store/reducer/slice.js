import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

const initialState = {
  userDataArray: [],
  token: '',
  displayUser: [],
};
const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addDisplayUsers: (state, action) => {
      const data = state.displayUser;
      console.log('data', data);
      if (Array.isArray(data)) {
        const result = data.some(item => item.email === action.payload.email);
        console.log('result', result);
        if (!result) {
          state.displayUser.push(action.payload);
        }
      }

      console.log('Display array', state.displayUser);
    },
    addUsers: (state, action) => {
      console.log('user added');
      const data = state.userDataArray;
      if (Array.isArray(data)) {
        const result = data.some(item => item.email === action.payload.email);
        if (!result) {
          const output = [...state.userDataArray];
          output.push(action.payload);
          state.userDataArray = output;
          // state.userDataArray.push(action.payload);
        }
      }
      console.log('user Data array', state.userDataArray);
    },

    userAuthentication: (state, action) => {
      state.token = action.payload;
      alert('user authenticated');
      console.log('token', state.token);
    },

    editDisplayUser: (state, action) => {
      console.log('edit', action.payload);
      state.displayUser = action.payload;
    },
    deleteDisplayUser: (state, action) => {
      state.displayUser = action.payload;
    },

    logout: (state, action) => {
      state.token = '';
    },
    deleteCheckItem: (state, action) => {
      const data = action.payload;
      state.displayUser = data;
    },
  },
});
export const {
  addUsers,
  userAuthentication,
  addDisplayUsers,
  editDisplayUser,
  deleteDisplayUser,
  deleteCheckItem,
  logout,
} = userDataSlice.actions;
export const reducer = userDataSlice.reducer;
