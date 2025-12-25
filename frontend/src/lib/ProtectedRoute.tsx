import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

type ProtectedRouteProps = {
    role?: 'buyer' | 'admin'
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ role }) => {
    const jwtToken = localStorage.getItem('token')
    const userRole = localStorage.getItem('role') as 'buyer' | 'admin' | null

    if (!jwtToken) return <Navigate to="/login" replace />
    if (role && role !== userRole) return <Navigate to="/" replace />

    return <Outlet />
}
