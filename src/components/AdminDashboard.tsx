import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface User {
    _id: string
    username: string
    email: string
    role: string
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<User[]>([])
    const { logout } = useAuth() // <--- Get logout function from context
    const navigate = useNavigate()

    const fetchUsers = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch('http://localhost:3000/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.ok) {
                const data = await response.json()
                setUsers(data)
            } else {
                console.error('Failed to fetch users')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return

        const token = localStorage.getItem('token')
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.ok) {
                setUsers(users.filter((user) => user._id !== id))
            } else {
                alert('Failed to delete user')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleLogout = () => {
        logout() // <--- Call context logout to update app state
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/')
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
                >
                    Logout
                </button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <div key={user._id} className="rounded-lg bg-white p-6 shadow-md">
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">{user.username}</h3>
                            <p className="text-gray-600">{user.email}</p>
                            <span className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                {user.role}
                            </span>
                        </div>
                        {user.role !== 'admin' && (
                            <button
                                onClick={() => handleDelete(user._id)}
                                className="w-full rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
                            >
                                Delete User
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}