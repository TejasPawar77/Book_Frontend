import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { checkAdminAccess } from '../store/authSlice'

export default function AdminGate({ children }) {
  const dispatch = useDispatch()

  const {
    isAuthenticated,
    accessToken,
    adminStatus,
    isStaff,
    adminError,
  } = useSelector((state) => state.auth)

  console.log({
    isAuthenticated,
    hasAccessToken: Boolean(accessToken),
    adminStatus,
    isStaff,
  })

  useEffect(() => {
    if (
      isAuthenticated &&
      accessToken &&
      adminStatus === 'idle'
    ) {
      dispatch(checkAdminAccess())
    }
  }, [dispatch, isAuthenticated, accessToken, adminStatus])

  // Redirect unauthenticated users to login
  if (!isAuthenticated || !accessToken) {
    return <Navigate to="/login" replace />
  }

  // Wait for Django to verify administrator permissions
  if (adminStatus === 'idle' || adminStatus === 'loading') {
    return (
      <div className="min-h-screen bg-[#FFF4E0] flex items-center justify-center">
        <p className="text-xl font-black">
          VERIFYING ADMIN ACCESS...
        </p>
      </div>
    )
  }

  // Redirect users whose session has expired
  if (
    adminStatus === 'failed' &&
    adminError?.toLowerCase().includes('session has expired')
  ) {
    return <Navigate to="/login" replace />
  }

  // Display an error for other verification failures or non-admin users
  if (adminStatus === 'failed' || !isStaff) {
    return (
      <div className="min-h-screen bg-[#FFF4E0] flex flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-3xl font-black">ACCESS DENIED</h1>

        <p className="max-w-md text-center">
          {adminError ||
            'Your account does not have administrator permissions.'}
        </p>

        <div className="flex gap-3">
          <Link
            to="/"
            className="border-2 border-black bg-purple-500 px-5 py-2 font-bold text-white shadow-[4px_4px_0px_black]"
          >
            GO HOME
          </Link>

          <button
            onClick={() => dispatch(checkAdminAccess())}
            className="border-2 border-black bg-white px-5 py-2 font-bold shadow-[4px_4px_0px_black]"
          >
            TRY AGAIN
          </button>
        </div>
      </div>
    )
  }

  // Only verified administrators can access the admin panel
  return children
}