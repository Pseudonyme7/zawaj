'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Heart,
    MessageCircle,
    Settings,
    Eye,
    Star,
    MapPin,
    Calendar,
    BookOpen,
    Briefcase,
    Users,
    Shield,
    Edit,
    Camera
} from 'lucide-react'
import { Navigation } from '@/components/navigation'

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState('profile')

    // Mock user data - replace with real data from your backend
    const user = {
        id: 1,
        name: 'Fatima Al-Zahra',
        age: 28,
        location: 'Paris, France',
        profession: 'Enseignante',
        education: 'Master en Éducation',
        profileComplete: 85,
        verified: true,
        joinDate: '2024-01-15',
        lastActive: '2024-01-20',
        bio: 'Assalamu alaikum, je suis une musulmane pratiquante à la recherche d&apos;un époux pieux et respectueux des valeurs islamiques. J&apos;aime la lecture, l&apos;enseignement et passer du temps en famille.',
        interests: ['Lecture', 'Cuisine', 'Voyages', 'Éducation', 'Bénévolat'],
        religiousInfo: {
            practice: 'Pratiquante',
            prayer: '5 fois par jour',
            hijab: 'Oui',
            quranMemorization: 'Quelques sourates'
        }
    }

    const stats = {
        profileViews: 45,
        likes: 12,
        conversations: 3,
        matches: 8
    }

    const recentActivity = [
        { id: 1, type: 'profile_view', user: 'Ahmed M.', time: '2h ago' },
        { id: 2, type: 'like_received', user: 'Omar B.', time: '5h ago' },
        { id: 3, type: 'message', user: 'Yusuf K.', time: '1d ago' },
        { id: 4, type: 'match', user: 'Hassan T.', time: '2d ago' },
    ]

    const suggestions = [
        {
            id: 1,
            name: 'Ahmed Ibn Omar',
            age: 32,
            location: 'Lyon, France',
            profession: 'Ingénieur',
            education: 'Master en Informatique',
            compatibility: 92,
            verified: true,
            lastActive: '1h ago'
        },
        {
            id: 2,
            name: 'Omar Al-Maghribi',
            age: 29,
            location: 'Marseille, France',
            profession: 'Médecin',
            education: 'Doctorat en Médecine',
            compatibility: 88,
            verified: true,
            lastActive: '3h ago'
        },
        {
            id: 3,
            name: 'Yusuf Al-Andalusi',
            age: 35,
            location: 'Toulouse, France',
            profession: 'Professeur',
            education: 'Doctorat en Histoire',
            compatibility: 85,
            verified: false,
            lastActive: '1d ago'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation isAuthenticated={true} userRole="user" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Assalamu alaikum, {user.name.split(' ')[0]}
                    </h1>
                    <p className="text-gray-600">Gérez votre profil et découvrez vos correspondances</p>
                </div>

                {/* Profile Completion Alert */}
                {user.profileComplete < 100 && (
                    <Card className="mb-6 border-orange-200 bg-orange-50">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Shield className="h-5 w-5 text-orange-500" />
                                    <div>
                                        <p className="font-medium text-orange-800">
                                            Complétez votre profil ({user.profileComplete}%)
                                        </p>
                                        <p className="text-sm text-orange-600">
                                            Un profil complet augmente vos chances de trouver votre moitié
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="border-orange-300 text-orange-700 hover:bg-orange-100"
                                    onClick={() => window.location.href = '/dashboard/profile'}
                                >
                                    Compléter
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Vues du Profil</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.profileViews}</div>
                            <p className="text-xs text-muted-foreground">
                                +5 cette semaine
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Likes Reçus</CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.likes}</div>
                            <p className="text-xs text-muted-foreground">
                                +3 cette semaine
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Conversations</CardTitle>
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.conversations}</div>
                            <p className="text-xs text-muted-foreground">
                                1 nouvelle
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Correspondances</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.matches}</div>
                            <p className="text-xs text-muted-foreground">
                                2 nouvelles
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="profile">Mon Profil</TabsTrigger>
                        <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                        <TabsTrigger value="activity">Activité</TabsTrigger>
                        <TabsTrigger value="settings">Paramètres</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-6">
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Profile Card */}
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Informations Personnelles</CardTitle>
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4 mr-2" />
                                            Modifier
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center relative">
                                            <span className="text-2xl font-bold text-primary">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                            <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                                                <Camera className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">{user.name}</h3>
                                            <p className="text-gray-600">{user.age} ans</p>
                                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {user.location}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center text-sm">
                                                <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                                                <span className="font-medium">Profession:</span>
                                                <span className="ml-2">{user.profession}</span>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                                                <span className="font-medium">Éducation:</span>
                                                <span className="ml-2">{user.education}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center text-sm">
                                                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                                <span className="font-medium">Membre depuis:</span>
                                                <span className="ml-2">{user.joinDate}</span>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                {user.verified && (
                                                    <>
                                                        <Shield className="h-4 w-4 mr-2 text-green-500" />
                                                        <span className="text-green-600 font-medium">Profil vérifié</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">À propos de moi</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">{user.bio}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">Centres d&apos;intérêt</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {user.interests.map((interest, index) => (
                                                <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                                                    {interest}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Religious Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informations Religieuses</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <span className="font-medium text-sm">Pratique:</span>
                                        <p className="text-gray-600">{user.religiousInfo.practice}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-sm">Prière:</span>
                                        <p className="text-gray-600">{user.religiousInfo.prayer}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-sm">Hijab:</span>
                                        <p className="text-gray-600">{user.religiousInfo.hijab}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-sm">Mémorisation du Coran:</span>
                                        <p className="text-gray-600">{user.religiousInfo.quranMemorization}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="suggestions" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Suggestions de Correspondances</CardTitle>
                                <CardDescription>Profils compatibles avec vos critères</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {suggestions.map((suggestion) => (
                                        <Card key={suggestion.id} className="hover:shadow-lg transition-shadow">
                                            <CardContent className="pt-6">
                                                <div className="text-center space-y-4">
                                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                                        <span className="text-lg font-bold text-primary">
                                                            {suggestion.name.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">{suggestion.name}</h3>
                                                        <p className="text-sm text-gray-600">{suggestion.age} ans</p>
                                                        <div className="flex items-center justify-center text-xs text-gray-500 mt-1">
                                                            <MapPin className="h-3 w-3 mr-1" />
                                                            {suggestion.location}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-center space-x-2">
                                                            <Star className="h-4 w-4 text-yellow-500" />
                                                            <span className="text-sm font-medium">{suggestion.compatibility}% compatible</span>
                                                        </div>
                                                        {suggestion.verified && (
                                                            <div className="flex items-center justify-center text-xs text-green-600">
                                                                <Shield className="h-3 w-3 mr-1" />
                                                                Vérifié
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Button className="w-full" size="sm">
                                                            <Heart className="h-4 w-4 mr-2" />
                                                            Intéressé(e)
                                                        </Button>
                                                        <Button variant="outline" className="w-full" size="sm">
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            Voir le profil
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Activité Récente</CardTitle>
                                <CardDescription>Vos dernières interactions sur la plateforme</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentActivity.map((activity) => (
                                        <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                                            <div className="flex-shrink-0">
                                                {activity.type === 'profile_view' && <Eye className="h-5 w-5 text-blue-500" />}
                                                {activity.type === 'like_received' && <Heart className="h-5 w-5 text-red-500" />}
                                                {activity.type === 'message' && <MessageCircle className="h-5 w-5 text-green-500" />}
                                                {activity.type === 'match' && <Users className="h-5 w-5 text-purple-500" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">
                                                    {activity.type === 'profile_view' && `${activity.user} a consulté votre profil`}
                                                    {activity.type === 'like_received' && `${activity.user} s&apos;intéresse à votre profil`}
                                                    {activity.type === 'message' && `Nouveau message de ${activity.user}`}
                                                    {activity.type === 'match' && `Nouvelle correspondance avec ${activity.user}`}
                                                </p>
                                                <p className="text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Paramètres du Compte</CardTitle>
                                <CardDescription>Gérez vos préférences et paramètres de confidentialité</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8">
                                    <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">Interface des paramètres en cours de développement</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
} 