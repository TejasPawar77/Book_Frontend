import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_LOGIN_URL
const adminProfileUrl = import.meta.env.VITE_ADMIN_PROFILE_URL

// Get username and access token from common API response formats
const getAuthData = (data) => {
  const user = data?.user ?? data?.data?.user ?? data

  const username =
    user?.username ??
    user?.name ??
    data?.username ??
    data?.data?.username ??
    null

  const accessToken =
    data?.access ??
    data?.accessToken ??
    data?.access_token ??
    data?.token ??
    data?.data?.access ??
    data?.data?.accessToken ??
    null

  return { user, username, accessToken }
}

// Login user with Django JWT authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password, remember }, { rejectWithValue }) => {
    try {
      const response = await axios.post(backendUrl, {
        username,
        password,
        remember,
      })

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
        error.response?.data?.error ||
        'Login failed. Please try again.'
      )
    }
  }
)

// Verify whether the logged-in user is an administrator
export const checkAdminAccess = createAsyncThunk(
  'auth/checkAdminAccess',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken

    if (!token) {
      return rejectWithValue('Access token is missing. Please log in again.')
    }

    if (!adminProfileUrl) {
      return rejectWithValue(
        'VITE_ADMIN_PROFILE_URL is missing from your .env file.'
      )
    }

    try {
      const response = await axios.get(adminProfileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
        (error.response?.status === 401
          ? 'Your session has expired. Please log in again.'
          : error.response?.status === 403
            ? 'Your account does not have administrator permissions.'
            : 'Unable to verify administrator access.')
      )
    }
  }
)

// Signup placeholder
// Replace this mock with your actual Django signup API.
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return {
        user: {
          id: 1,
          username: userData.username || userData.name,
          name: userData.name,
          email: userData.email,
        },
        username: userData.username || userData.name,
        accessToken: 'fake-jwt-token',
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create account')
    }
  }
)

const initialState = {
  user: null,
  username: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Admin verification state
  isStaff: false,
  adminStatus: 'idle',
  adminError: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null
      state.username = null
      state.accessToken = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
      state.isStaff = false
      state.adminStatus = 'idle'
      state.adminError = null
    },

    clearError: (state) => {
      state.error = null
    },
  },

  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null

        // Django Simple JWT returns { refresh, access }
        const data = action.payload
        const accessToken =
          data?.access ??
          data?.access_token ??
          data?.accessToken ??
          data?.data?.access ??
          data?.data?.accessToken ??
          null

        state.user = data?.user ?? data?.data?.user ?? null
        state.username =
          state.user?.username ??
          data?.username ??
          action.meta.arg.username

        state.accessToken = accessToken
        state.isAuthenticated = Boolean(accessToken)

        state.isStaff = false
        state.adminStatus = 'idle'
        state.adminError = null

        if (!accessToken) {
          state.error = 'Login succeeded, but Django did not return an access token.'
        }
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Login failed'
      })

      // Admin verification
      .addCase(checkAdminAccess.pending, (state) => {
        state.adminStatus = 'loading'
        state.adminError = null
        state.isStaff = false
      })
      .addCase(checkAdminAccess.fulfilled, (state, action) => {
        state.adminStatus = 'succeeded'

        state.isStaff =
          action.payload?.is_staff === true ||
          action.payload?.is_superuser === true

        state.adminError = state.isStaff
          ? null
          : 'Your account is not authorized to access the admin panel.'
      })
      .addCase(checkAdminAccess.rejected, (state, action) => {
        state.adminStatus = 'failed'
        state.isStaff = false
        state.adminError =
          action.payload || 'Admin verification failed.'
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false

        const { user, username, accessToken } = getAuthData(
          action.payload
        )

        state.user = user
        state.username = username
        state.accessToken = accessToken
        state.isAuthenticated = Boolean(accessToken)

        // A mock signup token must not grant admin access
        state.isStaff = false
        state.adminStatus = 'idle'
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Signup failed'
      })
  },
})

export const { logout, clearError } = authSlice.actions

export default authSlice.reducer
