'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { User, Heart, Users, Eye, Shield, FileText, Save } from 'lucide-react'

const profileSchema = z.object({
    // Informations personnelles
    profession: z.string().min(2, 'Veuillez indiquer votre métier'),
    age: z.number().min(18, 'Vous devez avoir au moins 18 ans').max(80, 'Âge maximum 80 ans'),
    origin: z.string().min(2, 'Veuillez indiquer votre origine'),
    nationality: z.string().min(2, 'Veuillez indiquer votre nationalité'),
    residenceCountry: z.string().min(2, 'Veuillez indiquer votre pays de résidence'),
    languages: z.array(z.string()).min(1, 'Veuillez sélectionner au moins une langue'),

    // Situation familiale
    maritalStatus: z.enum(['celibataire', 'marie', 'divorce', 'veuf'], {
        required_error: 'Veuillez indiquer votre situation maritale',
    }),
    hasChildren: z.boolean(),
    numberOfBoys: z.number().min(0).optional(),
    numberOfGirls: z.number().min(0).optional(),
    childrenInCharge: z.boolean().optional(),
    childrenAges: z.string().optional(),

    // Apparence physique
    height: z.string().min(1, 'Veuillez indiquer votre taille'),
    ethnicity: z.string().min(1, 'Veuillez indiquer votre ethnie'),
    bodyType: z.string().min(1, 'Veuillez indiquer votre morphologie'),
    clothingStyle: z.string().min(10, 'Veuillez décrire votre style vestimentaire'),

    // Religiosité
    followsMinhaj: z.enum(['oui', 'non'], {
        required_error: 'Veuillez indiquer si vous suivez le minhaj salafi',
    }),
    hijraProject: z.enum(['court_terme', 'moyen_terme', 'long_terme', 'aucun'], {
        required_error: 'Veuillez indiquer votre projet hijra',
    }),
    scholarsFollowed: z.string().min(5, 'Veuillez citer les savants que vous suivez'),
    yearsOfPractice: z.number().min(0, 'Veuillez indiquer depuis combien d\'années vous pratiquez'),

    // Santé
    physicalHealth: z.string().min(10, 'Veuillez décrire votre santé physique/morale'),
    hiddenIllnesses: z.string().optional(),

    // Descriptions personnelles
    personalDescription: z.string().min(50, 'Veuillez vous décrire en au moins 50 caractères'),
    partnerDescription: z.string().min(50, 'Veuillez décrire ce que vous cherchez en au moins 50 caractères'),
    dealBreakers: z.string().min(20, 'Veuillez indiquer vos critères rédhibitoires'),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [activeSection, setActiveSection] = useState('personal')

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            hasChildren: false,
            childrenInCharge: false,
            numberOfBoys: 0,
            numberOfGirls: 0,
            languages: [],
        },
    })

    const hasChildren = watch('hasChildren')
    const selectedLanguages = watch('languages') || []

    const onSubmit = async (data: ProfileFormData) => {
        setIsLoading(true)
        try {
            console.log('Profile data:', data)
            // TODO: Implement profile save logic
            await new Promise(resolve => setTimeout(resolve, 2000))
        } catch (error) {
            console.error('Profile save error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleLanguageChange = (language: string, checked: boolean) => {
        const currentLanguages = selectedLanguages || []
        if (checked) {
            setValue('languages', [...currentLanguages, language])
        } else {
            setValue('languages', currentLanguages.filter(l => l !== language))
        }
    }

    const sections = [
        { id: 'personal', label: 'Informations personnelles', icon: User },
        { id: 'family', label: 'Situation familiale', icon: Users },
        { id: 'appearance', label: 'Apparence physique', icon: Eye },
        { id: 'religion', label: 'Religiosité', icon: Shield },
        { id: 'health', label: 'Santé', icon: Heart },
        { id: 'description', label: 'Descriptions', icon: FileText },
    ]

    const languages = [
        'Français', 'Arabe', 'Anglais', 'Espagnol', 'Italien', 'Allemand',
        'Portugais', 'Turc', 'Berbère', 'Wolof', 'Autre'
    ]

    const countries = [
        'France', 'Maroc', 'Algérie', 'Tunisie', 'Égypte', 'Arabie Saoudite',
        'Émirats Arabes Unis', 'Qatar', 'Koweït', 'Jordanie', 'Liban', 'Syrie',
        'Turquie', 'Malaisie', 'Indonésie', 'Pakistan', 'Bangladesh', 'Autre'
    ]

    const ethnicities = [
        'Arabe', 'Berbère', 'Africain', 'Européen', 'Asiatique', 'Mixed (métisse)', 'Autre'
    ]

    const bodyTypes = [
        'Mince', 'Normal', 'Athlétique', 'Corpulent', 'Autre'
    ]

    return (
        <div className="min-h-screen zawajuna-hero-bg relative overflow-hidden">
            <div className="zj-pattern absolute inset-0 opacity-10"></div>

            <div className="relative container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-zawajuna-rosewood arabic-accent mb-4">
                            Complétez votre profil
                        </h1>
                        <p className="text-lg text-zawajuna-muted-brown max-w-2xl mx-auto">
                            Remplissez toutes les informations pour créer un profil complet et attractif
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Navigation Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="zawajuna-card sticky top-8">
                                <CardHeader>
                                    <CardTitle className="text-zawajuna-rosewood">Sections</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {sections.map((section) => {
                                        const Icon = section.icon
                                        return (
                                            <button
                                                key={section.id}
                                                onClick={() => setActiveSection(section.id)}
                                                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all ${activeSection === section.id
                                                    ? 'bg-zawajuna-rosewood text-white'
                                                    : 'hover:bg-zawajuna-linen text-zawajuna-muted-brown'
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                                <span className="text-sm font-medium">{section.label}</span>
                                            </button>
                                        )
                                    })}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Informations personnelles */}
                                {activeSection === 'personal' && (
                                    <Card className="zawajuna-card">
                                        <CardHeader>
                                            <CardTitle className="text-zawajuna-rosewood flex items-center">
                                                <User className="w-6 h-6 mr-2" />
                                                Informations personnelles
                                            </CardTitle>
                                            <CardDescription>
                                                Vos informations de base et votre localisation
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="profession">Votre métier</Label>
                                                    <Input
                                                        id="profession"
                                                        placeholder="Ingénieur informatique"
                                                        {...register('profession')}
                                                        className={errors.profession ? 'border-red-500' : ''}
                                                    />
                                                    {errors.profession && (
                                                        <p className="text-sm text-red-500">{errors.profession.message}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="age">Âge</Label>
                                                    <Input
                                                        id="age"
                                                        type="number"
                                                        placeholder="30"
                                                        {...register('age', { valueAsNumber: true })}
                                                        className={errors.age ? 'border-red-500' : ''}
                                                    />
                                                    {errors.age && (
                                                        <p className="text-sm text-red-500">{errors.age.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="origin">Votre origine</Label>
                                                    <Select onValueChange={(value) => setValue('origin', value)}>
                                                        <SelectTrigger className={errors.origin ? 'border-red-500' : ''}>
                                                            <SelectValue placeholder="Sélectionnez votre origine" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {countries.map((country) => (
                                                                <SelectItem key={country} value={country}>
                                                                    {country}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.origin && (
                                                        <p className="text-sm text-red-500">{errors.origin.message}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="nationality">Votre nationalité</Label>
                                                    <Select onValueChange={(value) => setValue('nationality', value)}>
                                                        <SelectTrigger className={errors.nationality ? 'border-red-500' : ''}>
                                                            <SelectValue placeholder="Sélectionnez votre nationalité" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {countries.map((country) => (
                                                                <SelectItem key={country} value={country}>
                                                                    {country}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.nationality && (
                                                        <p className="text-sm text-red-500">{errors.nationality.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="residenceCountry">Pays de résidence</Label>
                                                <Select onValueChange={(value) => setValue('residenceCountry', value)}>
                                                    <SelectTrigger className={errors.residenceCountry ? 'border-red-500' : ''}>
                                                        <SelectValue placeholder="Sélectionnez votre pays de résidence" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {countries.map((country) => (
                                                            <SelectItem key={country} value={country}>
                                                                {country}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.residenceCountry && (
                                                    <p className="text-sm text-red-500">{errors.residenceCountry.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Langues parlées</Label>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                    {languages.map((language) => (
                                                        <div key={language} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`language-${language}`}
                                                                checked={selectedLanguages.includes(language)}
                                                                onCheckedChange={(checked) =>
                                                                    handleLanguageChange(language, checked as boolean)
                                                                }
                                                            />
                                                            <Label
                                                                htmlFor={`language-${language}`}
                                                                className="text-sm font-normal"
                                                            >
                                                                {language}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                                {errors.languages && (
                                                    <p className="text-sm text-red-500">{errors.languages.message}</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Situation familiale */}
                                {activeSection === 'family' && (
                                    <Card className="zawajuna-card">
                                        <CardHeader>
                                            <CardTitle className="text-zawajuna-rosewood flex items-center">
                                                <Users className="w-6 h-6 mr-2" />
                                                Situation familiale
                                            </CardTitle>
                                            <CardDescription>
                                                Votre statut marital et informations sur vos enfants
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-2">
                                                <Label>Situation maritale</Label>
                                                <Select onValueChange={(value) => setValue('maritalStatus', value as 'celibataire' | 'marie' | 'divorce' | 'veuf')}>
                                                    <SelectTrigger className={errors.maritalStatus ? 'border-red-500' : ''}>
                                                        <SelectValue placeholder="Sélectionnez votre situation" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="celibataire">Célibataire</SelectItem>
                                                        <SelectItem value="marie">Marié(e)</SelectItem>
                                                        <SelectItem value="divorce">Divorcé(e)</SelectItem>
                                                        <SelectItem value="veuf">Veuf/Veuve</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors.maritalStatus && (
                                                    <p className="text-sm text-red-500">{errors.maritalStatus.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="hasChildren"
                                                        checked={hasChildren}
                                                        onCheckedChange={(checked) => setValue('hasChildren', checked as boolean)}
                                                    />
                                                    <Label htmlFor="hasChildren">Avez-vous des enfants ?</Label>
                                                </div>

                                                {hasChildren && (
                                                    <div className="space-y-4 pl-6 border-l-2 border-zawajuna-linen">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="numberOfBoys">Nombre de garçons</Label>
                                                                <Input
                                                                    id="numberOfBoys"
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="0"
                                                                    {...register('numberOfBoys', { valueAsNumber: true })}
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="numberOfGirls">Nombre de filles</Label>
                                                                <Input
                                                                    id="numberOfGirls"
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="0"
                                                                    {...register('numberOfGirls', { valueAsNumber: true })}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id="childrenInCharge"
                                                                {...register('childrenInCharge')}
                                                            />
                                                            <Label htmlFor="childrenInCharge">Enfants à charge ?</Label>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="childrenAges">Précisez leurs âges</Label>
                                                            <Textarea
                                                                id="childrenAges"
                                                                placeholder="2 ans et 1 an"
                                                                {...register('childrenAges')}
                                                                className="min-h-[80px]"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Apparence physique */}
                                {activeSection === 'appearance' && (
                                    <Card className="zawajuna-card">
                                        <CardHeader>
                                            <CardTitle className="text-zawajuna-rosewood flex items-center">
                                                <Eye className="w-6 h-6 mr-2" />
                                                Apparence physique
                                            </CardTitle>
                                            <CardDescription>
                                                Votre description physique et style vestimentaire
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="height">Votre taille ?</Label>
                                                    <Input
                                                        id="height"
                                                        placeholder="1m95"
                                                        {...register('height')}
                                                        className={errors.height ? 'border-red-500' : ''}
                                                    />
                                                    <p className="text-xs text-zawajuna-muted-brown">
                                                        Ne pas donner votre poids
                                                    </p>
                                                    {errors.height && (
                                                        <p className="text-sm text-red-500">{errors.height.message}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Ethnie</Label>
                                                    <Select onValueChange={(value) => setValue('ethnicity', value)}>
                                                        <SelectTrigger className={errors.ethnicity ? 'border-red-500' : ''}>
                                                            <SelectValue placeholder="Sélectionnez votre ethnie" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {ethnicities.map((ethnicity) => (
                                                                <SelectItem key={ethnicity} value={ethnicity}>
                                                                    {ethnicity}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.ethnicity && (
                                                        <p className="text-sm text-red-500">{errors.ethnicity.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Votre morphologie</Label>
                                                <Select onValueChange={(value) => setValue('bodyType', value)}>
                                                    <SelectTrigger className={errors.bodyType ? 'border-red-500' : ''}>
                                                        <SelectValue placeholder="Sélectionnez votre morphologie" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {bodyTypes.map((type) => (
                                                            <SelectItem key={type} value={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.bodyType && (
                                                    <p className="text-sm text-red-500">{errors.bodyType.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="clothingStyle">Votre tenue vestimentaire</Label>
                                                <Textarea
                                                    id="clothingStyle"
                                                    placeholder="Qamis, saroual, ensembles légifères"
                                                    {...register('clothingStyle')}
                                                    className={`min-h-[120px] ${errors.clothingStyle ? 'border-red-500' : ''}`}
                                                />
                                                {errors.clothingStyle && (
                                                    <p className="text-sm text-red-500">{errors.clothingStyle.message}</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Religiosité */}
                                {activeSection === 'religion' && (
                                    <Card className="zawajuna-card">
                                        <CardHeader>
                                            <CardTitle className="text-zawajuna-rosewood flex items-center">
                                                <Shield className="w-6 h-6 mr-2" />
                                                Religiosité
                                            </CardTitle>
                                            <CardDescription>
                                                Votre pratique religieuse et vos références
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Suivez-vous le minhaj salafi ?</Label>
                                                    <Select onValueChange={(value) => setValue('followsMinhaj', value as 'oui' | 'non')}>
                                                        <SelectTrigger className={errors.followsMinhaj ? 'border-red-500' : ''}>
                                                            <SelectValue placeholder="Sélectionnez" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="oui">Oui</SelectItem>
                                                            <SelectItem value="non">Non</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.followsMinhaj && (
                                                        <p className="text-sm text-red-500">{errors.followsMinhaj.message}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Projet Hijra</Label>
                                                    <Select onValueChange={(value) => setValue('hijraProject', value as 'court_terme' | 'moyen_terme' | 'long_terme' | 'aucun')}>
                                                        <SelectTrigger className={errors.hijraProject ? 'border-red-500' : ''}>
                                                            <SelectValue placeholder="Sélectionnez" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="court_terme">Court terme</SelectItem>
                                                            <SelectItem value="moyen_terme">Moyen terme</SelectItem>
                                                            <SelectItem value="long_terme">Long terme</SelectItem>
                                                            <SelectItem value="aucun">Aucun projet</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.hijraProject && (
                                                        <p className="text-sm text-red-500">{errors.hijraProject.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="scholarsFollowed">Savants suivis</Label>
                                                <p className="text-sm text-zawajuna-muted-brown">
                                                    Veuillez citer des noms
                                                </p>
                                                <Textarea
                                                    id="scholarsFollowed"
                                                    placeholder="Cheikh Al fawzan, Cheikh Ibn Baz, Cheikh Ibn Outheymin"
                                                    {...register('scholarsFollowed')}
                                                    className={`min-h-[120px] ${errors.scholarsFollowed ? 'border-red-500' : ''}`}
                                                />
                                                {errors.scholarsFollowed && (
                                                    <p className="text-sm text-red-500">{errors.scholarsFollowed.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="yearsOfPractice">
                                                    Religion pratiquée sérieusement depuis quand (années) ?
                                                </Label>
                                                <Input
                                                    id="yearsOfPractice"
                                                    type="number"
                                                    min="0"
                                                    placeholder="10"
                                                    {...register('yearsOfPractice', { valueAsNumber: true })}
                                                    className={errors.yearsOfPractice ? 'border-red-500' : ''}
                                                />
                                                {errors.yearsOfPractice && (
                                                    <p className="text-sm text-red-500">{errors.yearsOfPractice.message}</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Santé */}
                                {activeSection === 'health' && (
                                    <Card className="zawajuna-card">
                                        <CardHeader>
                                            <CardTitle className="text-zawajuna-rosewood flex items-center">
                                                <Heart className="w-6 h-6 mr-2" />
                                                Santé
                                            </CardTitle>
                                            <CardDescription>
                                                Informations sur votre état de santé
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="physicalHealth">Votre santé physique / morale</Label>
                                                <Textarea
                                                    id="physicalHealth"
                                                    placeholder="الحمد لله tout va bien"
                                                    {...register('physicalHealth')}
                                                    className={`min-h-[120px] ${errors.physicalHealth ? 'border-red-500' : ''}`}
                                                />
                                                {errors.physicalHealth && (
                                                    <p className="text-sm text-red-500">{errors.physicalHealth.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="hiddenIllnesses">Maladie occulte</Label>
                                                <Textarea
                                                    id="hiddenIllnesses"
                                                    placeholder="Aucune الحمد لله"
                                                    {...register('hiddenIllnesses')}
                                                    className="min-h-[120px]"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Descriptions */}
                                {activeSection === 'description' && (
                                    <Card className="zawajuna-card">
                                        <CardHeader>
                                            <CardTitle className="text-zawajuna-rosewood flex items-center">
                                                <FileText className="w-6 h-6 mr-2" />
                                                Descriptions personnelles
                                            </CardTitle>
                                            <CardDescription>
                                                Présentez-vous et décrivez vos attentes
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="personalDescription">Qui vous êtes ?</Label>
                                                <Textarea
                                                    id="personalDescription"
                                                    placeholder="J'ai 30 ans je suis d'origine italienne/marocaine. Physiquement 1m94, bronzé, yeux noirs, cheveux courts et barbe longue, corpulence normale..."
                                                    {...register('personalDescription')}
                                                    className={`min-h-[150px] ${errors.personalDescription ? 'border-red-500' : ''}`}
                                                />
                                                {errors.personalDescription && (
                                                    <p className="text-sm text-red-500">{errors.personalDescription.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="partnerDescription">Ce que cherche chez le/la prétendant(e)</Label>
                                                <Textarea
                                                    id="partnerDescription"
                                                    placeholder="Je recherche une femme qui a entre 18 et 35 ans. Jamais mariée, divorcée, veuve, stérile, des enfants ou pas peu importe..."
                                                    {...register('partnerDescription')}
                                                    className={`min-h-[150px] ${errors.partnerDescription ? 'border-red-500' : ''}`}
                                                />
                                                {errors.partnerDescription && (
                                                    <p className="text-sm text-red-500">{errors.partnerDescription.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="dealBreakers">Mes critères rédhibitoires</Label>
                                                <Textarea
                                                    id="dealBreakers"
                                                    placeholder="Critères rédhibitoires : Le mensonge et la trahison, la légèreté dans la religion, la volonté de rester dans une terre de mécréance"
                                                    {...register('dealBreakers')}
                                                    className={`min-h-[120px] ${errors.dealBreakers ? 'border-red-500' : ''}`}
                                                />
                                                {errors.dealBreakers && (
                                                    <p className="text-sm text-red-500">{errors.dealBreakers.message}</p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Save Button */}
                                <div className="mt-8">
                                    <Button
                                        type="submit"
                                        className="w-full bg-zawajuna-rosewood hover:bg-zawajuna-warm-clay text-white py-3 text-lg"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            'Sauvegarde en cours...'
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5 mr-2" />
                                                Sauvegarder mon profil
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 