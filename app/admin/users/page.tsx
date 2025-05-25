'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Users,
    Search,
    Filter,
    UserCheck,
    UserX,
    Eye,
    MoreHorizontal,
    CheckCircle,
    XCircle,
    Clock
} from 'lucide-react'
import { Navigation } from '@/components/navigation'

export default function AdminUsersPage() {
    const [activeTab, setActiveTab] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')

    // Mock data - replace with real data from your backend
    const users = [
        {
            id: 1,
            name: 'Fatima Al-Zahra',
            email: 'fatima.alzahra@email.com',
            gender: 'female',
            age: 28,
            status: 'verified',
            joinDate: '2024-01-15',
            lastActive: '2024-01-20',
            profileComplete: 95,
            conversations: 3
        },
        {
            id: 2,
            name: 'Ahmed Ibn Omar',
            email: 'ahmed.omar@email.com',
            gender: 'male',
            age: 32,
            status: 'pending',
            joinDate: '2024-01-18',
            lastActive: '2024-01-19',
            profileComplete: 80,
            conversations: 1
        },
        {
            id: 3,
            name: 'Khadija Bint Said',
            email: 'khadija.said@email.com',
            gender: 'female',
            age: 26,
            status: 'verified',
            joinDate: '2024-01-10',
            lastActive: '2024-01-20',
            profileComplete: 100,
            conversations: 5
        },
        {
            id: 4,
            name: 'Yusuf Al-Mansouri',
            email: 'yusuf.mansouri@email.com',
            gender: 'male',
            age: 29,
            status: 'suspended',
            joinDate: '2024-01-12',
            lastActive: '2024-01-16',
            profileComplete: 70,
            conversations: 0
        }
    ]

    const stats = {
        total: users.length,
        verified: users.filter(u => u.status === 'verified').length,
        pending: users.filter(u => u.status === 'pending').length,
        suspended: users.filter(u => u.status === 'suspended').length
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'verified':
                return <CheckCircle className="h-4 w-4 text-green-500" />
            case 'pending':
                return <Clock className="h-4 w-4 text-yellow-500" />
            case 'suspended':
                return <XCircle className="h-4 w-4 text-red-500" />
            default:
                return <Clock className="h-4 w-4 text-gray-500" />
        }
    }

    const getStatusBadge = (status: string) => {
        const baseClasses = "px-2 py-1 text-xs font-medium rounded-full"
        switch (status) {
            case 'verified':
                return `${baseClasses} bg-green-100 text-green-800`
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800`
            case 'suspended':
                return `${baseClasses} bg-red-100 text-red-800`
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`
        }
    }

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())

        if (activeTab === 'all') return matchesSearch
        return matchesSearch && user.status === activeTab
    })

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation isAuthenticated={true} userRole="admin" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Utilisateurs</h1>
                    <p className="text-gray-600">Gérez les comptes utilisateurs, vérifications et statuts</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Vérifiés</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Suspendus</CardTitle>
                            <XCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher par nom ou email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <Button variant="outline">
                                <Filter className="h-4 w-4 mr-2" />
                                Filtres
                            </Button>
                        </div>
                    </CardHeader>
                </Card>

                {/* Users Table */}
                <Card>
                    <CardHeader>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="all">Tous ({stats.total})</TabsTrigger>
                                <TabsTrigger value="verified">Vérifiés ({stats.verified})</TabsTrigger>
                                <TabsTrigger value="pending">En Attente ({stats.pending})</TabsTrigger>
                                <TabsTrigger value="suspended">Suspendus ({stats.suspended})</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-medium text-gray-500">Utilisateur</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500">Statut</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500">Profil</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500">Activité</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="border-b hover:bg-gray-50">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                        <span className="text-primary font-medium">
                                                            {user.name.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-sm text-gray-500">{user.email}</div>
                                                        <div className="text-xs text-gray-400">
                                                            {user.gender === 'male' ? 'Homme' : 'Femme'}, {user.age} ans
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center space-x-2">
                                                    {getStatusIcon(user.status)}
                                                    <span className={getStatusBadge(user.status)}>
                                                        {user.status === 'verified' ? 'Vérifié' :
                                                            user.status === 'pending' ? 'En attente' :
                                                                user.status === 'suspended' ? 'Suspendu' : user.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="text-sm">
                                                    <div className="text-gray-900">{user.profileComplete}% complet</div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                                        <div
                                                            className="bg-primary h-2 rounded-full"
                                                            style={{ width: `${user.profileComplete}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="text-sm">
                                                    <div className="text-gray-900">{user.conversations} conversations</div>
                                                    <div className="text-gray-500">Actif: {user.lastActive}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <Button size="sm" variant="outline">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    {user.status === 'pending' && (
                                                        <>
                                                            <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                                                                <UserCheck className="h-4 w-4" />
                                                            </Button>
                                                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                                                <UserX className="h-4 w-4" />
                                                            </Button>
                                                        </>
                                                    )}
                                                    <Button size="sm" variant="outline">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredUsers.length === 0 && (
                            <div className="text-center py-8">
                                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">Aucun utilisateur trouvé</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 