import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebaseApp from '../../firebase/firebaseApi';

export const signInWithGoogle = createAsyncThunk('auth/signInWithGoogle', async (_, { dispatch }) => {
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Google authentication successful', user);
    dispatch(loginUser(user));
    return user;
  } catch (error) {
    console.error('Error signing in with Google', error);
    throw error;
  }
});

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { uid, email, displayName } = action.payload;
      state.user = { uid, email, displayName };
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signInWithGoogle.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
