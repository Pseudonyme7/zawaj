'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

const loginSchema = z.object({
    email: z.string().email('Adresse email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)
        try {
            // TODO: Implement authentication logic
            console.log('Login data:', data)
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
        } catch (error) {
            console.error('Login error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back to home */}
                <Link
                    href="/"
                    className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à l&apos;accueil
                </Link>

                <Card className="shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold text-primary arabic-accent">
                            Zawajuna
                        </CardTitle>
                        <CardDescription className="text-lg">
                            Connectez-vous à votre compte
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                            <div className="flex items-center justify-between">
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Connexion...' : 'Se connecter'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Vous n&apos;avez pas de compte ?{' '}
                                <Link
                                    href="/auth/register"
                                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                                >
                                    Créer un compte
                                </Link>
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="text-xs text-gray-500 text-center">
                                En vous connectant, vous acceptez nos{' '}
                                <Link href="/terms" className="text-primary hover:underline">
                                    Conditions d&apos;utilisation
                                </Link>{' '}
                                et notre{' '}
                                <Link href="/privacy" className="text-primary hover:underline">
                                    Politique de confidentialité
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 