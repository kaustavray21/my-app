import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

export default function AdminProtectedRoute({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const checkAdmin = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setIsLoading(false)
                return
            }
            try {
                const response = await fetch('http://localhost:3000/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = await response.json()
                if (data.role === 'admin') {
                    setIsAdmin(true)
                }
            } catch (error) {
                console.error('Admin check failed', error)
            } finally {
                setIsLoading(false)
            }
        }
        checkAdmin()
    }, [])

    if (isLoading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>
}