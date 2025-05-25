'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

import {
    Users,
    MessageCircle,
    Heart,
    Shield,
    TrendingUp,
    AlertTriangle,
    Video,
    UserCheck,
    Eye
} from 'lucide-react'
import { Navigation } from '@/components/navigation'

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview')

    // Mock data - replace with real data from your backend
    const stats = {
        totalUsers: 1247,
        activeUsers: 892,
        pendingVerifications: 23,
        totalConversations: 456,
        pendingModeration: 12,
        successfulMatches: 89,
        videoCallsToday: 15,
        reportsToday: 3
    }

    const recentActivity = [
        { id: 1, type: 'user_registration', user: 'Fatima A.', time: '5 min ago' },
        { id: 2, type: 'conversation_flagged', users: 'Ahmed M. & Khadija S.', time: '12 min ago' },
        { id: 3, type: 'profile_verification', user: 'Omar B.', time: '25 min ago' },
        { id: 4, type: 'video_call_request', users: 'Yusuf K. & Aisha L.', time: '1h ago' },
    ]

    const pendingReviews = [
        { id: 1, type: 'profile', user: 'Mariam H.', reason: 'Photo verification needed', priority: 'high' },
        { id: 2, type: 'conversation', users: 'Ali R. & Zahra M.', reason: 'Inappropriate content reported', priority: 'urgent' },
        { id: 3, type: 'profile', user: 'Hassan T.', reason: 'Information verification', priority: 'medium' },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation isAuthenticated={true} userRole="admin" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord Administrateur</h1>
                    <p className="text-gray-600">Gérez et surveillez la plateforme Zawajuna</p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
                        <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                        <TabsTrigger value="moderation">Modération</TabsTrigger>
                        <TabsTrigger value="analytics">Analyses</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Utilisateurs Total</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">
                                        +12% par rapport au mois dernier
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
                                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% du total
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Conversations</CardTitle>
                                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.totalConversations.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {stats.pendingModeration} en attente de modération
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Mariages Réussis</CardTitle>
                                    <Heart className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.successfulMatches}</div>
                                    <p className="text-xs text-muted-foreground">
                                        +5 ce mois-ci
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions Rapides</CardTitle>
                                <CardDescription>Accès rapide aux tâches administratives courantes</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                        <Shield className="h-6 w-6 mb-2" />
                                        <span className="text-sm">Vérifications</span>
                                        {stats.pendingVerifications > 0 && (
                                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 mt-1">
                                                {stats.pendingVerifications}
                                            </span>
                                        )}
                                    </Button>
                                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                        <MessageCircle className="h-6 w-6 mb-2" />
                                        <span className="text-sm">Modération</span>
                                        {stats.pendingModeration > 0 && (
                                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 mt-1">
                                                {stats.pendingModeration}
                                            </span>
                                        )}
                                    </Button>
                                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                        <Video className="h-6 w-6 mb-2" />
                                        <span className="text-sm">Visio Calls</span>
                                        <span className="text-xs text-muted-foreground mt-1">
                                            {stats.videoCallsToday} aujourd&apos;hui
                                        </span>
                                    </Button>
                                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                        <AlertTriangle className="h-6 w-6 mb-2" />
                                        <span className="text-sm">Signalements</span>
                                        {stats.reportsToday > 0 && (
                                            <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1 mt-1">
                                                {stats.reportsToday}
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity & Pending Reviews */}
                        <div className="grid lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Activité Récente</CardTitle>
                                    <CardDescription>Dernières actions sur la plateforme</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentActivity.map((activity) => (
                                            <div key={activity.id} className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    {activity.type === 'user_registration' && <UserCheck className="h-4 w-4 text-green-500" />}
                                                    {activity.type === 'conversation_flagged' && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                                                    {activity.type === 'profile_verification' && <Shield className="h-4 w-4 text-blue-500" />}
                                                    {activity.type === 'video_call_request' && <Video className="h-4 w-4 text-purple-500" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {activity.user || activity.users}
                                                    </p>
                                                    <p className="text-sm text-gray-500 capitalize">
                                                        {activity.type.replace('_', ' ')}
                                                    </p>
                                                </div>
                                                <div className="flex-shrink-0 text-sm text-gray-500">
                                                    {activity.time}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Révisions en Attente</CardTitle>
                                    <CardDescription>Éléments nécessitant votre attention</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {pendingReviews.map((review) => (
                                            <div key={review.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-2 h-2 rounded-full ${review.priority === 'urgent' ? 'bg-red-500' :
                                                        review.priority === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                                                        }`} />
                                                    <div>
                                                        <p className="text-sm font-medium">{review.user || review.users}</p>
                                                        <p className="text-xs text-gray-500">{review.reason}</p>
                                                    </div>
                                                </div>
                                                <Button size="sm" variant="outline">
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    Voir
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="users" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gestion des Utilisateurs</CardTitle>
                                <CardDescription>Gérez les comptes utilisateurs et les vérifications</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8">
                                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">Interface de gestion des utilisateurs en cours de développement</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="moderation" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Centre de Modération</CardTitle>
                                <CardDescription>Modérez les conversations et les profils</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8">
                                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">Interface de modération en cours de développement</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="analytics" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Analyses et Statistiques</CardTitle>
                                <CardDescription>Suivez les performances de la plateforme</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8">
                                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">Tableau de bord analytique en cours de développement</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
} 