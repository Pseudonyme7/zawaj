'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, ArrowLeft, User, UserCheck, Heart, Shield, Users, MapPin, FileText } from 'lucide-react'

const registerSchema = z.object({
    // Étape 1: Genre
    gender: z.enum(['homme', 'femme'], {
        required_error: 'Veuillez sélectionner votre genre',
    }),

    // Étape 2: Informations de base
    firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
    lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Adresse email invalide'),
    age: z.number().min(18, 'Vous devez avoir au moins 18 ans').max(80, 'Âge maximum 80 ans'),
    city: z.string().min(2, 'Veuillez indiquer votre ville'),
    country: z.string().min(2, 'Veuillez indiquer votre pays'),

    // Étape 3: Informations personnelles détaillées
    profession: z.string().min(2, 'Veuillez indiquer votre métier'),
    origin: z.string().min(2, 'Veuillez indiquer votre origine'),
    nationality: z.string().min(2, 'Veuillez indiquer votre nationalité'),
    residenceCountry: z.string().min(2, 'Veuillez indiquer votre pays de résidence'),
    languages: z.array(z.string()).min(1, 'Veuillez sélectionner au moins une langue'),

    // Étape 4: Situation familiale
    maritalStatus: z.enum(['celibataire', 'marie', 'divorce', 'veuf'], {
        required_error: 'Veuillez indiquer votre situation maritale',
    }),
    hasChildren: z.boolean(),
    numberOfBoys: z.number().min(0).optional(),
    numberOfGirls: z.number().min(0).optional(),
    childrenInCharge: z.boolean().optional(),
    childrenAges: z.string().optional(),

    // Étape 5: Apparence physique
    height: z.string().min(1, 'Veuillez indiquer votre taille'),
    ethnicity: z.string().min(1, 'Veuillez indiquer votre ethnie'),
    bodyType: z.string().min(1, 'Veuillez indiquer votre morphologie'),
    clothingStyle: z.string().min(10, 'Veuillez décrire votre style vestimentaire'),

    // Étape 6: Religiosité
    religiosity: z.enum(['debutant', 'pratiquant', 'tres_pratiquant'], {
        required_error: 'Veuillez indiquer votre niveau de religiosité',
    }),
    followsMinhaj: z.enum(['oui', 'non'], {
        required_error: 'Veuillez indiquer si vous suivez le minhaj salafi',
    }),
    hijraProject: z.enum(['court_terme', 'moyen_terme', 'long_terme', 'aucun'], {
        required_error: 'Veuillez indiquer votre projet hijra',
    }),
    scholarsFollowed: z.string().min(5, 'Veuillez citer les savants que vous suivez'),
    yearsOfPractice: z.number().min(0, 'Veuillez indiquer depuis combien d\'années vous pratiquez'),

    // Étape 7: Santé
    physicalHealth: z.string().min(10, 'Veuillez décrire votre santé physique/morale'),
    hiddenIllnesses: z.string().optional(),

    // Étape 8: Descriptions personnelles
    personalDescription: z.string().min(50, 'Veuillez vous décrire en au moins 50 caractères'),
    partnerDescription: z.string().min(50, 'Veuillez décrire ce que vous cherchez en au moins 50 caractères'),
    dealBreakers: z.string().min(20, 'Veuillez indiquer vos critères rédhibitoires'),

    // Étape 9: Sécurité
    password: z.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine(val => val === true, {
        message: 'Vous devez accepter les conditions d&apos;utilisation',
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(1)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            hasChildren: false,
            childrenInCharge: false,
            numberOfBoys: 0,
            numberOfGirls: 0,
            languages: [],
        },
    })

    const selectedGender = watch('gender')
    const hasChildren = watch('hasChildren')
    const selectedLanguages = watch('languages') || []

    // Auto-advance when gender is selected
    useEffect(() => {
        if (selectedGender && step === 1) {
            const timer = setTimeout(() => {
                nextStep()
            }, 500) // Small delay for better UX
            return () => clearTimeout(timer)
        }
    }, [selectedGender, step])

    const handleLanguageChange = (language: string, checked: boolean) => {
        const currentLanguages = selectedLanguages || []
        if (checked) {
            setValue('languages', [...currentLanguages, language])
        } else {
            setValue('languages', currentLanguages.filter(l => l !== language))
        }
    }

    // Data arrays
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

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true)
        try {
            // TODO: Implement registration logic
            console.log('Registration data:', data)
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))
        } catch (error) {
            console.error('Registration error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const nextStep = () => {
        if (step < 9) setStep(step + 1)
    }

    const prevStep = () => {
        if (step > 1) setStep(step - 1)
    }

    return (
        <div className="min-h-screen zawajuna-hero-bg relative overflow-hidden">
            {/* Background Pattern */}
            <div className="zj-pattern absolute inset-0 opacity-10"></div>

            <div className="relative flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-2xl">
                    {/* Back to home - Enhanced */}
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-zawajuna-rosewood text-zawajuna-rosewood hover:bg-zawajuna-rosewood hover:text-white transition-all duration-300 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <ArrowLeft className="w-5 h-5 mr-3" />
                            Retour à l&apos;accueil
                        </Link>
                        <p className="text-sm text-zawajuna-muted-brown mt-2 ml-2">
                            Vous pouvez revenir à tout moment
                        </p>
                    </div>

                    <Card className="zawajuna-card shadow-2xl border-0 overflow-hidden">
                        <CardHeader className="text-center bg-gradient-to-br from-zawajuna-light-beige to-zawajuna-desert-sand py-8">
                            <CardTitle className="text-3xl font-bold text-zawajuna-rosewood arabic-accent mb-2">
                                Zawajuna
                            </CardTitle>
                            <CardDescription className="text-lg text-zawajuna-muted-brown">
                                Créez votre compte - Étape {step} sur 9
                            </CardDescription>

                            {/* Enhanced Progress Bar */}
                            <div className="flex justify-center mt-6">
                                <div className="w-full max-w-md">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-xs text-zawajuna-muted-brown">Début</span>
                                        <span className="text-xs text-zawajuna-muted-brown">Fin</span>
                                    </div>
                                    <div className="w-full bg-zawajuna-linen rounded-full h-2">
                                        <div
                                            className="bg-zawajuna-rosewood h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${(step / 9) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-center mt-2">
                                        <span className="text-sm font-medium text-zawajuna-rosewood">
                                            {Math.round((step / 9) * 100)}% complété
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Step Labels */}
                            <div className="flex justify-center mt-4">
                                <div className="text-center">
                                    <span className="text-sm font-medium text-zawajuna-rosewood">
                                        {step === 1 && 'Genre'}
                                        {step === 2 && 'Informations de base'}
                                        {step === 3 && 'Informations détaillées'}
                                        {step === 4 && 'Situation familiale'}
                                        {step === 5 && 'Apparence physique'}
                                        {step === 6 && 'Religiosité'}
                                        {step === 7 && 'Santé'}
                                        {step === 8 && 'Descriptions'}
                                        {step === 9 && 'Sécurité'}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Step 1: Gender Selection */}
                                {step === 1 && (
                                    <div className="space-y-8">
                                        <div className="text-center">
                                            <h3 className="text-2xl font-bold text-zawajuna-rosewood mb-2 arabic-accent">
                                                Sélectionnez votre genre
                                            </h3>
                                            <p className="text-zawajuna-muted-brown mb-8">
                                                Choisissez votre profil pour commencer votre parcours
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
                                                <label className="cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        value="homme"
                                                        {...register('gender')}
                                                        className="sr-only"
                                                    />
                                                    <div className={`relative p-8 border-2 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${selectedGender === 'homme'
                                                        ? 'border-zawajuna-rosewood bg-gradient-to-br from-zawajuna-rosewood/10 to-zawajuna-dusty-pink/5 shadow-lg'
                                                        : 'border-zawajuna-linen hover:border-zawajuna-dusty-pink bg-white hover:shadow-md'
                                                        }`}>
                                                        {selectedGender === 'homme' && (
                                                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-zawajuna-rosewood rounded-full flex items-center justify-center">
                                                                <Shield className="w-4 h-4 text-white" />
                                                            </div>
                                                        )}
                                                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${selectedGender === 'homme'
                                                            ? 'bg-zawajuna-rosewood'
                                                            : 'bg-zawajuna-linen group-hover:bg-zawajuna-dusty-pink/20'
                                                            } transition-all duration-300`}>
                                                            <User className={`w-8 h-8 ${selectedGender === 'homme'
                                                                ? 'text-white'
                                                                : 'text-zawajuna-muted-brown group-hover:text-zawajuna-rosewood'
                                                                }`} />
                                                        </div>
                                                        <h4 className={`text-xl font-bold mb-2 ${selectedGender === 'homme'
                                                            ? 'text-zawajuna-rosewood'
                                                            : 'text-zawajuna-muted-brown group-hover:text-zawajuna-rosewood'
                                                            } arabic-accent`}>
                                                            Les Frères
                                                        </h4>
                                                        <p className="text-sm text-zawajuna-muted-brown">
                                                            Abonnement 8,90€/mois
                                                        </p>
                                                    </div>
                                                </label>

                                                <label className="cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        value="femme"
                                                        {...register('gender')}
                                                        className="sr-only"
                                                    />
                                                    <div className={`relative p-8 border-2 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${selectedGender === 'femme'
                                                        ? 'border-zawajuna-dusty-pink bg-gradient-to-br from-zawajuna-dusty-pink/10 to-zawajuna-rosewood/5 shadow-lg'
                                                        : 'border-zawajuna-linen hover:border-zawajuna-dusty-pink bg-white hover:shadow-md'
                                                        }`}>
                                                        {selectedGender === 'femme' && (
                                                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-zawajuna-dusty-pink rounded-full flex items-center justify-center">
                                                                <Heart className="w-4 h-4 text-white" />
                                                            </div>
                                                        )}
                                                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${selectedGender === 'femme'
                                                            ? 'bg-zawajuna-dusty-pink'
                                                            : 'bg-zawajuna-linen group-hover:bg-zawajuna-dusty-pink/20'
                                                            } transition-all duration-300`}>
                                                            <UserCheck className={`w-8 h-8 ${selectedGender === 'femme'
                                                                ? 'text-white'
                                                                : 'text-zawajuna-muted-brown group-hover:text-zawajuna-dusty-pink'
                                                                }`} />
                                                        </div>
                                                        <h4 className={`text-xl font-bold mb-2 ${selectedGender === 'femme'
                                                            ? 'text-zawajuna-dusty-pink'
                                                            : 'text-zawajuna-muted-brown group-hover:text-zawajuna-dusty-pink'
                                                            } arabic-accent`}>
                                                            Les Sœurs
                                                        </h4>
                                                        <p className="text-sm text-zawajuna-muted-brown">
                                                            Abonnement 1,90€/mois
                                                        </p>
                                                    </div>
                                                </label>
                                            </div>

                                            {errors.gender && (
                                                <p className="text-sm text-red-500 mt-4">{errors.gender.message}</p>
                                            )}

                                            {selectedGender && (
                                                <div className="mt-6 animate-fade-in">
                                                    <p className="text-sm text-zawajuna-muted-brown">
                                                        ✨ Passage automatique à l&apos;étape suivante...
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Personal Information */}
                                {step === 2 && (
                                    <div className="space-y-6">
                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold text-zawajuna-rosewood mb-2 arabic-accent">
                                                Informations personnelles
                                            </h3>
                                            <p className="text-zawajuna-muted-brown">
                                                Complétez votre profil avec vos informations
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">Prénom</Label>
                                                <Input
                                                    id="firstName"
                                                    placeholder="Votre prénom"
                                                    {...register('firstName')}
                                                    className={errors.firstName ? 'border-red-500' : ''}
                                                />
                                                {errors.firstName && (
                                                    <p className="text-sm text-red-500">{errors.firstName.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Nom</Label>
                                                <Input
                                                    id="lastName"
                                                    placeholder="Votre nom"
                                                    {...register('lastName')}
                                                    className={errors.lastName ? 'border-red-500' : ''}
                                                />
                                                {errors.lastName && (
                                                    <p className="text-sm text-red-500">{errors.lastName.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Adresse email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="votre@email.com"
                                                {...register('email')}
                                                className={errors.email ? 'border-red-500' : ''}
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-500">{errors.email.message}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="age">Âge</Label>
                                                <Input
                                                    id="age"
                                                    type="number"
                                                    placeholder="25"
                                                    {...register('age', { valueAsNumber: true })}
                                                    className={errors.age ? 'border-red-500' : ''}
                                                />
                                                {errors.age && (
                                                    <p className="text-sm text-red-500">{errors.age.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="city">Ville</Label>
                                                <Input
                                                    id="city"
                                                    placeholder="Paris"
                                                    {...register('city')}
                                                    className={errors.city ? 'border-red-500' : ''}
                                                />
                                                {errors.city && (
                                                    <p className="text-sm text-red-500">{errors.city.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="country">Pays</Label>
                                            <Input
                                                id="country"
                                                placeholder="France"
                                                {...register('country')}
                                                className={errors.country ? 'border-red-500' : ''}
                                            />
                                            {errors.country && (
                                                <p className="text-sm text-red-500">{errors.country.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="religiosity">Niveau de religiosité</Label>
                                            <select
                                                id="religiosity"
                                                {...register('religiosity')}
                                                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background ${errors.religiosity ? 'border-red-500' : ''
                                                    }`}
                                            >
                                                <option value="">Sélectionnez votre niveau</option>
                                                <option value="debutant">Débutant dans la pratique</option>
                                                <option value="pratiquant">Pratiquant régulier</option>
                                                <option value="tres_pratiquant">Très pratiquant</option>
                                            </select>
                                            {errors.religiosity && (
                                                <p className="text-sm text-red-500">{errors.religiosity.message}</p>
                                            )}
                                        </div>

                                        <div className="flex gap-4">
                                            <Button
                                                type="button"
                                                onClick={prevStep}
                                                variant="outline"
                                                className="flex-1 border-zawajuna-linen text-zawajuna-muted-brown hover:bg-zawajuna-linen hover:text-zawajuna-rosewood"
                                            >
                                                Retour
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={nextStep}
                                                className="flex-1 bg-zawajuna-rosewood hover:bg-zawajuna-warm-clay text-white"
                                            >
                                                Continuer
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Informations détaillées */}
                                {step === 3 && (
                                    <div className="space-y-6">
                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold text-zawajuna-rosewood mb-2 arabic-accent">
                                                Informations détaillées
                                            </h3>
                                            <p className="text-zawajuna-muted-brown">
                                                Complétez vos informations personnelles
                                            </p>
                                        </div>

                                        <div className="space-y-4">
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

                                            <div className="grid grid-cols-2 gap-4">
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
                                        </div>

                                        <div className="flex gap-4">
                                            <Button
                                                type="button"
                                                onClick={prevStep}
                                                variant="outline"
                                                className="flex-1 border-zawajuna-linen text-zawajuna-muted-brown hover:bg-zawajuna-linen hover:text-zawajuna-rosewood"
                                            >
                                                Retour
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={nextStep}
                                                className="flex-1 bg-zawajuna-rosewood hover:bg-zawajuna-warm-clay text-white"
                                            >
                                                Continuer
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Situation familiale */}
                                {step === 4 && (
                                    <div className="space-y-6">
                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold text-zawajuna-rosewood mb-2 arabic-accent">
                                                Situation familiale
                                            </h3>
                                            <p className="text-zawajuna-muted-brown">
                                                Informations sur votre statut marital et vos enfants
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Situation maritale</Label>
                                                <Select onValueChange={(value) => setValue('maritalStatus', value as any)}>
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
                                        </div>

                                        <div className="flex gap-4">
                                            <Button
                                                type="button"
                                                onClick={prevStep}
                                                variant="outline"
                                                className="flex-1 border-zawajuna-linen text-zawajuna-muted-brown hover:bg-zawajuna-linen hover:text-zawajuna-rosewood"
                                            >
                                                Retour
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={nextStep}
                                                className="flex-1 bg-zawajuna-rosewood hover:bg-zawajuna-warm-clay text-white"
                                            >
                                                Continuer
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 5: Apparence physique */}
                                {step === 5 && (
                                    <div className="space-y-6">
                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold text-zawajuna-rosewood mb-2 arabic-accent">
                                                Apparence physique
                                            </h3>
                                            <p className="text-zawajuna-muted-brown">
                                                Décrivez votre apparence et votre style
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
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
                                        </div>

                                        <div className="flex gap-4">
                                            <Button
                                                type="button"
                                                onClick={prevStep}
                                                variant="outline"
                                                className="flex-1 border-zawajuna-linen text-zawajuna-muted-brown hover:bg-zawajuna-linen hover:text-zawajuna-rosewood"
                                            >
                                                Retour
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={nextStep}
                                                className="flex-1 bg-zawajuna-rosewood hover:bg-zawajuna-warm-clay text-white"
                                            >
                                                Continuer
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 6: Religiosité */}
                                {step === 6 && (
                                    <div className="space-y-6">
                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold text-zawajuna-rosewood mb-2 arabic-accent">
                                                Religiosité
                                            </h3>
                                            <p className="text-zawajuna-muted-brown">
                                                Votre pratique religieuse et vos références
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="religiosity">Niveau de religiosité</Label>
                                                <select
                                                    id="religiosity"
                                                    {...register('religiosity')}
                                                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background ${errors.religiosity ? 'border-red-500' : ''
                                                        }`}
                                                >
                                                    <option value="">Sélectionnez votre niveau</option>
                                                    <option value="debutant">Débutant dans la pratique</option>
                                                    <option value="pratiquant">Pratiquant régulier</option>
                                                    <option value="tres_pratiquant">Très pratiquant</option>
                                                </select>
                                                {errors.religiosity && (
                                                    <p className="text-sm text-red-500">{errors.religiosity.message}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Suivez-vous le minhaj salafi ?</Label>
                                                    <Select onValueChange={(value) => setValue('followsMinhaj', value as any)}>
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
                                                    <Select onValueChange={(value) => setValue('hijraProject', value as any)}>
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
                                        </div>

                                        <div className="flex gap-4">
                                            <Button
                                                type="button"
                                                onClick={prevStep}
                                                variant="outline"
                                                className="flex-1 border-zawajuna-linen text-zawajuna-muted-brown hover:bg-zawajuna-linen hover:text-zawajuna-rosewood"
                                            >
                                                Retour
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={nextStep}
                                                className="flex-1 bg-zawajuna-rosewood hover:bg-zawajuna-warm-clay text-white"
                                            >
                                                Continuer
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 7: Santé */}
                                {step === 7 && (
                                    <div className="space-y-6">
                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold text-zawajuna-rosewood mb-2 arabic-accent">
                                                Santé
                                            </h3>
                                            <p className="text-zawajuna-muted-brown">
                                                Informations sur votre état de santé
                                            </p>
                                        </div>

                                        <div className="space-y-4">
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
                                        </div>

                                        <div className="flex gap-4">
                                            <Button
                                                type="button"
                                                onClick={prevStep}
                                                variant="outline"
                                                className="flex-1 border-zawajuna-linen text-zawajuna-muted-brown hover:bg-zawajuna-linen hover:text-zawajuna-rosewood"
                                            >
                                                Retour
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={nextStep}
                                                className="flex-1 bg-zawajuna-rosewood hover:bg-zawajuna-warm-clay text-white"
                                            >
                                                Continuer
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 8: Descriptions personnelles */}
                                {step === 8 && (
                                    <div className="space-y-6">
                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold text-zawajuna-rosewood mb-2 arabic-accent">
                                                Descriptions personnelles
                                            </h3>
                                            <p className="text-zawajuna-muted-brown">
                                                Présentez-vous et décrivez vos attentes
                                            </p>
                                        </div>

                                        <div className="space-y-4">
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
                                                <Label htmlFor="partnerDescription">Ce que vous cherchez chez le/la prétendant(e)</Label>
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
                                        </div>

                                        <div className="flex gap-4">
                                            <Button
                                                type="button"
                                                onClick={prevStep}
                                                variant="outline"
                                                className="flex-1 border-zawajuna-linen text-zawajuna-muted-brown hover:bg-zawajuna-linen hover:text-zawajuna-rosewood"
                                            >
                                                Retour
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={nextStep}
                                                className="flex-1 bg-zawajuna-rosewood hover:bg-zawajuna-warm-clay text-white"
                                            >
                                                Continuer
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 9: Password and Confirmation */}
                                {step === 9 && (
                                    <div className="space-y-6">
                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold text-zawajuna-rosewood mb-2 arabic-accent">
                                                Sécurité du compte
                                            </h3>
                                            <p className="text-zawajuna-muted-brown">
                                                Créez un mot de passe sécurisé pour protéger votre compte
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Mot de passe</Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="••••••••"
                                                    {...register('password')}
                                                    className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.password && (
                                                <p className="text-sm text-red-500">{errors.password.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                                            <div className="relative">
                                                <Input
                                                    id="confirmPassword"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    placeholder="••••••••"
                                                    {...register('confirmPassword')}
                                                    className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.confirmPassword && (
                                                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id="acceptTerms"
                                                    {...register('acceptTerms')}
                                                    className="rounded border-gray-300"
                                                />
                                                <Label htmlFor="acceptTerms" className="text-sm">
                                                    J&apos;accepte les{' '}
                                                    <Link href="/terms" className="text-primary hover:underline">
                                                        conditions d&apos;utilisation
                                                    </Link>{' '}
                                                    et la{' '}
                                                    <Link href="/privacy" className="text-primary hover:underline">
                                                        politique de confidentialité
                                                    </Link>
                                                </Label>
                                            </div>
                                            {errors.acceptTerms && (
                                                <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
                                            )}
                                        </div>

                                        <div className="flex gap-4">
                                            <Button
                                                type="button"
                                                onClick={prevStep}
                                                variant="outline"
                                                className="flex-1 border-zawajuna-linen text-zawajuna-muted-brown hover:bg-zawajuna-linen hover:text-zawajuna-rosewood"
                                            >
                                                Retour
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="flex-1 bg-zawajuna-rosewood hover:bg-zawajuna-warm-clay text-white"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? 'Création du compte...' : 'Créer mon compte'}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </form>

                            {step === 1 && (
                                <div className="mt-8 text-center">
                                    <p className="text-sm text-zawajuna-muted-brown">
                                        Vous avez déjà un compte ?{' '}
                                        <Link
                                            href="/auth/login"
                                            className="text-zawajuna-rosewood hover:text-zawajuna-warm-clay font-medium transition-colors"
                                        >
                                            Se connecter
                                        </Link>
                                    </p>
                                </div>
                            )}

                            {/* Progress indicator for steps 2-9 */}
                            {step > 1 && step < 9 && (
                                <div className="mt-8 text-center">
                                    <p className="text-sm text-zawajuna-muted-brown">
                                        Étape {step} sur 9 - Continuez pour compléter votre profil
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 