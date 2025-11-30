import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

interface UserProfile {
    username: string
    email: string
}

export default function Dashboard() {
    const { logout } = useAuth()
    const [user, setUser] = useState<UserProfile | null>(null)

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token')
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
                    logout()
                }
            } catch (error) {
                console.error('Error fetching profile:', error)
            }
        }

        fetchProfile()
    }, [logout])

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
                <button
                    onClick={logout}
                    className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}