import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_LOGIN_URL
const adminProfileUrl = import.meta.env.VITE_ADMIN_PROFILE_URL

// Restore saved authentication data
const storedToken = localStorage.getItem('accessToken')
const storedUsername = localStorage.getItem('username')

// Extract authentication data from common API response formats
const getAuthData = (data) => {
  const user = data?.user ?? data?.data?.user ?? null

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
        error.response?.data?.message ||
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
      return rejectWithValue(
        'Access token is missing. Please log in again.'
      )
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
  async (_, { rejectWithValue }) => {
    return rejectWithValue(
      'Signup API is not configured. Connect your Django signup endpoint.'
    )
  }
)

const initialState = {
  user: null,
  username: storedUsername,
  accessToken: storedToken,
  isAuthenticated: Boolean(storedToken),
  isLoading: false,
  error: null,

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

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('username')
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

        const data = action.payload
        const { user, username, accessToken } = getAuthData(data)

        state.user = user
        state.username = username ?? action.meta.arg.username
        state.accessToken = accessToken
        state.isAuthenticated = Boolean(accessToken)

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem(
            'username',
            state.username
          )

          // Save refresh token if Django returned one
          if (data?.refresh) {
            localStorage.setItem('refreshToken', data.refresh)
          }
        } else {
          localStorage.removeItem('accessToken')
          state.error =
            'Login response did not contain an access token.'
        }

        state.isStaff = false
        state.adminStatus = 'idle'
        state.adminError = null
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

        // Clear invalid authentication if the server returns 401
        if (
          typeof action.payload === 'string' &&
          action.payload.includes('session has expired')
        ) {
          state.accessToken = null
          state.isAuthenticated = false
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
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

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken)

          if (username) {
            localStorage.setItem('username', username)
          }

          if (action.payload?.refresh) {
            localStorage.setItem(
              'refreshToken',
              action.payload.refresh
            )
          }
        }

        state.isStaff = false
        state.adminStatus = 'idle'
        state.adminError = null
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Signup failed'
      })
  },
})

export const { logout, clearError } = authSlice.actions

export default authSlice.reducer