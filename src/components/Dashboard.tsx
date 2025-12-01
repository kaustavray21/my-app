import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface UserProfile {
    username: string
    email: string
}

export default function Dashboard() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState<UserProfile | null>(null)

    const handleLogout = () => {
        logout()
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/')
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                handleLogout()
                return
            }

            try {
                const response = await fetch('http://localhost:3000/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (response.ok) {
                    const data = await response.json()
                    setUser(data)
                } else {
                    handleLogout()
                }
            } catch (error) {
                console.error('Error fetching profile:', error)
                handleLogout()
            }
        }

        fetchProfile()
    }, [])

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md text-center">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Dashboard</h2>
                <div className="mb-6 text-left">
                    <p className="text-gray-600">
                        <strong>Username:</strong> {user.username}
                    </p>
                    <p className="text-gray-600">
                        <strong>Email:</strong> {user.email}
                    </p>
                </div>
            </div>
        </div>
    )
}