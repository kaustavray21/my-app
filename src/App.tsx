import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import HomePage from './components/HomePage'
import BusinessOpportunities from './components/BusinessOpportunities'

// Guide Components
import GuideRegistration from './components/guide/GuideRegistration'
import GuideDashboard from './components/guide/GuideDashboard'

import AdminDashboard from './components/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import './App.css'
import Footer from "./components/Footer.tsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/business" element={<BusinessOpportunities/>}/>

                    {/* Guide Routes */}
                    <Route
                        path="/register-guide"
                        element={
                            <PublicOnlyRoute>
                                <GuideRegistration/>
                            </PublicOnlyRoute>
                        }
                    />
                    <Route
                        path="/guide-dashboard"
                        element={
                            <ProtectedRoute>
                                <GuideDashboard/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/signup"
                        element={
                            <PublicOnlyRoute>
                                <Signup/>
                            </PublicOnlyRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <PublicOnlyRoute>
                                <Login/>
                            </PublicOnlyRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <AdminProtectedRoute>
                                <AdminDashboard/>
                            </AdminProtectedRoute>
                        }
                    />
                </Routes>
                <Footer/>
            </Router>
        </AuthProvider>
    )
}

export default App