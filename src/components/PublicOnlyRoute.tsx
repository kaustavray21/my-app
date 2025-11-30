import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type {ReactNode} from 'react'

export default function PublicOnlyRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        const role = localStorage.getItem('role')
        if (role === 'admin') {
            return <Navigate to="/admin" replace />
        }
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>
}