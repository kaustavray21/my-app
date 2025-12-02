import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
    _id: string
    username: string
    email: string
    role: string
    name?: string
    mobile?: string
    isVerified?: boolean
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<User[]>([])
    const [pendingGuides, setPendingGuides] = useState<User[]>([])
    const navigate = useNavigate()

    const fetchData = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }

        const headers = { Authorization: `Bearer ${token}` }

        try {
            // Fetch All Users
            const usersRes = await fetch('http://localhost:3000/users', { headers })
            if (usersRes.ok) {
                setUsers(await usersRes.json())
            }

            // Fetch Pending Guides
            const guidesRes = await fetch('http://localhost:3000/guides/pending', { headers })
            if (guidesRes.ok) {
                setPendingGuides(await guidesRes.json())
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const handleVerify = async (id: string) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(`http://localhost:3000/guides/${id}/verify`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` },
            })

            if (response.ok) {
                alert('Guide verified successfully')
                fetchData() // Refresh data
            } else {
                alert('Failed to verify guide')
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
                headers: { Authorization: `Bearer ${token}` },
            })
            if (response.ok) {
                fetchData() // Refresh data
            } else {
                alert('Failed to delete user')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8 pt-24">
            <div className="container mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                </div>

                {/* Pending Verifications Section */}
                {pendingGuides.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-300">
                            Pending Guide Verifications
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {pendingGuides.map((guide) => (
                                <div key={guide._id} className="rounded-xl bg-white p-6 shadow-md border-l-4 border-yellow-400">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">{guide.name || guide.username}</h3>
                                        <p className="text-gray-600 text-sm">{guide.email}</p>
                                        <p className="text-gray-600 text-sm">Mobile: {guide.mobile}</p>
                                        <span className="mt-2 inline-block rounded-full px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800">
                                            Pending Verification
                                        </span>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => handleVerify(guide._id)}
                                            className="flex-1 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors shadow-sm"
                                        >
                                            Verify
                                        </button>
                                        <button
                                            onClick={() => handleDelete(guide._id)}
                                            className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors shadow-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Users Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-300">
                        All Users
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {users.map((user) => (
                            <div key={user._id} className="rounded-lg bg-white p-6 shadow-md">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">{user.username}</h3>
                                    <p className="text-gray-600">{user.email}</p>
                                    <div className="mt-2 flex gap-2">
                                        <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : user.role === 'guide' ? 'bg-teal-100 text-teal-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {user.role}
                                        </span>
                                        {user.role === 'guide' && (
                                            <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {user.isVerified ? 'Verified' : 'Pending'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {user.role !== 'admin' && (
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="w-full rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 transition-colors"
                                    >
                                        Delete User
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}