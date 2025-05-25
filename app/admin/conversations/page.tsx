'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    MessageCircle,
    Search,
    Filter,
    Eye,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Clock,
    Video,
    Flag,
    MoreHorizontal
} from 'lucide-react'
import { Navigation } from '@/components/navigation'

export default function AdminConversationsPage() {
    const [activeTab, setActiveTab] = useState('pending')
    const [searchTerm, setSearchTerm] = useState('')

    // Mock data - replace with real data from your backend
    const conversations = [
        {
            id: 1,
            participants: ['Ahmed Ibn Omar', 'Khadija Bint Said'],
            status: 'pending',
            lastMessage: 'Assalamu alaikum, j&apos;aimerais faire votre connaissance...',
            messageCount: 5,
            startDate: '2024-01-20',
            lastActivity: '2024-01-20 14:30',
            flagged: false,
            videoRequested: false,
            priority: 'normal'
        },
        {
            id: 2,
            participants: ['Yusuf Al-Mansouri', 'Fatima Al-Zahra'],
            status: 'flagged',
            lastMessage: 'Pouvons-nous nous rencontrer en privé?',
            messageCount: 12,
            startDate: '2024-01-18',
            lastActivity: '2024-01-19 16:45',
            flagged: true,
            videoRequested: false,
            priority: 'high',
            flagReason: 'Demande de rencontre non supervisée'
        },
        {
            id: 3,
            participants: ['Omar Bin Khalid', 'Aisha Bint Amr'],
            status: 'approved',
            lastMessage: 'Barakallahu fikoum pour cette opportunité...',
            messageCount: 25,
            startDate: '2024-01-15',
            lastActivity: '2024-01-20 10:15',
            flagged: false,
            videoRequested: true,
            priority: 'normal'
        },
        {
            id: 4,
            participants: ['Hassan Al-Maghribi', 'Zahra Bint Ali'],
            status: 'suspended',
            lastMessage: 'Message suspendu par modération',
            messageCount: 8,
            startDate: '2024-01-17',
            lastActivity: '2024-01-18 09:20',
            flagged: true,
            videoRequested: false,
            priority: 'urgent',
            flagReason: 'Contenu inapproprié'
        }
    ]

    const stats = {
        total: conversations.length,
        pending: conversations.filter(c => c.status === 'pending').length,
        approved: conversations.filter(c => c.status === 'approved').length,
        flagged: conversations.filter(c => c.status === 'flagged').length,
        suspended: conversations.filter(c => c.status === 'suspended').length
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return <CheckCircle className="h-4 w-4 text-green-500" />
            case 'pending':
                return <Clock className="h-4 w-4 text-yellow-500" />
            case 'flagged':
                return <Flag className="h-4 w-4 text-orange-500" />
            case 'suspended':
                return <XCircle className="h-4 w-4 text-red-500" />
            default:
                return <Clock className="h-4 w-4 text-gray-500" />
        }
    }

    const getStatusBadge = (status: string) => {
        const baseClasses = "px-2 py-1 text-xs font-medium rounded-full"
        switch (status) {
            case 'approved':
                return `${baseClasses} bg-green-100 text-green-800`
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800`
            case 'flagged':
                return `${baseClasses} bg-orange-100 text-orange-800`
            case 'suspended':
                return `${baseClasses} bg-red-100 text-red-800`
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent':
                return 'bg-red-500'
            case 'high':
                return 'bg-orange-500'
            case 'normal':
                return 'bg-green-500'
            default:
                return 'bg-gray-500'
        }
    }

    const filteredConversations = conversations.filter(conversation => {
        const matchesSearch = conversation.participants.some(p =>
            p.toLowerCase().includes(searchTerm.toLowerCase())
        )

        if (activeTab === 'all') return matchesSearch
        return matchesSearch && conversation.status === activeTab
    })

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation isAuthenticated={true} userRole="admin" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Modération des Conversations</h1>
                    <p className="text-gray-600">Surveillez et modérez les échanges entre utilisateurs</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total</CardTitle>
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
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
                            <CardTitle className="text-sm font-medium">Approuvées</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Signalées</CardTitle>
                            <Flag className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">{stats.flagged}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Suspendues</CardTitle>
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
                                        placeholder="Rechercher par participants..."
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

                {/* Conversations Table */}
                <Card>
                    <CardHeader>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-5">
                                <TabsTrigger value="pending">En Attente ({stats.pending})</TabsTrigger>
                                <TabsTrigger value="flagged">Signalées ({stats.flagged})</TabsTrigger>
                                <TabsTrigger value="approved">Approuvées ({stats.approved})</TabsTrigger>
                                <TabsTrigger value="suspended">Suspendues ({stats.suspended})</TabsTrigger>
                                <TabsTrigger value="all">Toutes ({stats.total})</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredConversations.map((conversation) => (
                                <div key={conversation.id} className="border rounded-lg p-4 hover:bg-gray-50">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(conversation.priority)}`} />
                                                <div className="font-medium text-gray-900">
                                                    {conversation.participants.join(' ↔ ')}
                                                </div>
                                                {conversation.flagged && (
                                                    <Flag className="h-4 w-4 text-orange-500" />
                                                )}
                                                {conversation.videoRequested && (
                                                    <Video className="h-4 w-4 text-purple-500" />
                                                )}
                                            </div>

                                            <div className="flex items-center space-x-4 mb-3">
                                                {getStatusIcon(conversation.status)}
                                                <span className={getStatusBadge(conversation.status)}>
                                                    {conversation.status === 'approved' ? 'Approuvée' :
                                                        conversation.status === 'pending' ? 'En attente' :
                                                            conversation.status === 'flagged' ? 'Signalée' :
                                                                conversation.status === 'suspended' ? 'Suspendue' : conversation.status}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {conversation.messageCount} messages
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    Début: {conversation.startDate}
                                                </span>
                                            </div>

                                            <div className="bg-gray-100 rounded p-3 mb-3">
                                                <p className="text-sm text-gray-700 italic">
                                                    &ldquo;{conversation.lastMessage}&rdquo;
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Dernière activité: {conversation.lastActivity}
                                                </p>
                                            </div>

                                            {conversation.flagReason && (
                                                <div className="bg-orange-50 border border-orange-200 rounded p-2 mb-3">
                                                    <div className="flex items-center space-x-2">
                                                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                                                        <span className="text-sm font-medium text-orange-800">
                                                            Raison du signalement:
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-orange-700 mt-1">
                                                        {conversation.flagReason}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center space-x-2 ml-4">
                                            <Button size="sm" variant="outline">
                                                <Eye className="h-4 w-4 mr-1" />
                                                Voir
                                            </Button>

                                            {conversation.status === 'pending' && (
                                                <>
                                                    <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                                                        <CheckCircle className="h-4 w-4 mr-1" />
                                                        Approuver
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                                        <XCircle className="h-4 w-4 mr-1" />
                                                        Rejeter
                                                    </Button>
                                                </>
                                            )}

                                            {conversation.status === 'flagged' && (
                                                <>
                                                    <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                                                        <CheckCircle className="h-4 w-4 mr-1" />
                                                        Résoudre
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                                        <XCircle className="h-4 w-4 mr-1" />
                                                        Suspendre
                                                    </Button>
                                                </>
                                            )}

                                            {conversation.videoRequested && (
                                                <Button size="sm" variant="outline" className="text-purple-600 hover:text-purple-700">
                                                    <Video className="h-4 w-4 mr-1" />
                                                    Planifier
                                                </Button>
                                            )}

                                            <Button size="sm" variant="outline">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredConversations.length === 0 && (
                            <div className="text-center py-8">
                                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">Aucune conversation trouvée</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 