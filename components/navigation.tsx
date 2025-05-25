'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Heart } from 'lucide-react'
import { useScrollSpy, smoothScrollTo } from '@/lib/use-scroll-spy'

interface NavigationProps {
    isAuthenticated?: boolean
    userRole?: 'user' | 'admin'
}

export function Navigation({ isAuthenticated = false, userRole = 'user' }: NavigationProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    // Navigation items for non-authenticated users
    const navigationItems = [
        { id: 'accueil', label: 'Accueil', href: '#accueil' },
        { id: 'services', label: 'Nos Services', href: '#services' },
        { id: 'fonctionnement', label: 'Fonctionnement', href: '#fonctionnement' },
        { id: 'pourquoi-nous', label: 'Pourquoi nous ?', href: '#pourquoi-nous' },
        { id: 'abonnements', label: 'Abonnements', href: '#abonnements' },
    ]

    // Use scroll spy to detect active section
    const activeSection = useScrollSpy(navigationItems.map(item => item.id), 120)

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Enhanced smooth scroll function
    const handleSmoothScroll = (elementId: string) => {
        smoothScrollTo(elementId, 80)
        setIsMenuOpen(false)
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
            : 'bg-white/80 backdrop-blur-sm'
            }`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'
                    }`}>
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 group"
                            onClick={() => handleSmoothScroll('accueil')}
                        >
                            <div className="relative">
                                <Heart className="h-8 w-8 text-emerald-500 group-hover:text-emerald-600 transition-colors duration-300" />
                                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-lg group-hover:bg-emerald-600/30 transition-all duration-300"></div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:from-emerald-700 group-hover:to-teal-700 transition-all duration-300">
                                Zawajuna
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block">
                        <div className="flex items-center space-x-1">
                            {!isAuthenticated ? (
                                <>
                                    {navigationItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleSmoothScroll(item.id)}
                                            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${activeSection === item.id
                                                ? 'text-emerald-600'
                                                : 'text-gray-700 hover:text-emerald-600'
                                                }`}
                                        >
                                            {item.label}
                                            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                                                }`}></span>
                                        </button>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {userRole === 'admin' ? (
                                        <>
                                            <Link href="/admin/dashboard" className="nav-link">
                                                Tableau de Bord
                                            </Link>
                                            <Link href="/admin/users" className="nav-link">
                                                Utilisateurs
                                            </Link>
                                            <Link href="/admin/conversations" className="nav-link">
                                                Conversations
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/dashboard" className="nav-link">
                                                Mon Profil
                                            </Link>
                                            <Link href="/profiles" className="nav-link">
                                                Découvrir
                                            </Link>
                                            <Link href="/conversations" className="nav-link">
                                                Messages
                                            </Link>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {!isAuthenticated ? (
                            <>
                                <Link href="/auth/login">
                                    <Button
                                        variant="outline"
                                        className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
                                    >
                                        Se Connecter
                                    </Button>
                                </Link>
                                <Link href="/auth/register">
                                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                        Créer un Compte
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <Button
                                variant="outline"
                                className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
                            >
                                Déconnexion
                            </Button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={toggleMenu}
                            className="relative inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                        >
                            <div className="relative w-6 h-6">
                                <span className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : 'rotate-0 -translate-y-1'}`}>
                                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen
                    ? 'max-h-screen opacity-100 visible'
                    : 'max-h-0 opacity-0 invisible'
                    }`}>
                    <div className="px-2 pt-2 pb-6 space-y-1 bg-white/95 backdrop-blur-md rounded-b-2xl border-t border-gray-200/50 shadow-lg">
                        {!isAuthenticated ? (
                            <>
                                {navigationItems.map((item, index) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleSmoothScroll(item.id)}
                                        className={`w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 transform ${activeSection === item.id
                                            ? 'text-emerald-600 bg-emerald-50 translate-x-2'
                                            : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 hover:translate-x-1'
                                            }`}
                                        style={{ transitionDelay: `${index * 50}ms` }}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                                <div className="pt-4 mt-4 border-t border-gray-200">
                                    <div className="flex flex-col space-y-3 px-4">
                                        <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                                            <Button
                                                variant="outline"
                                                className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                                            >
                                                Se Connecter
                                            </Button>
                                        </Link>
                                        <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                                            <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all duration-300">
                                                Créer un Compte
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {userRole === 'admin' ? (
                                    <>
                                        <Link
                                            href="/admin/dashboard"
                                            className="mobile-nav-link"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Tableau de Bord
                                        </Link>
                                        <Link
                                            href="/admin/users"
                                            className="mobile-nav-link"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Utilisateurs
                                        </Link>
                                        <Link
                                            href="/admin/conversations"
                                            className="mobile-nav-link"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Conversations
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/dashboard"
                                            className="mobile-nav-link"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Mon Profil
                                        </Link>
                                        <Link
                                            href="/profiles"
                                            className="mobile-nav-link"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Découvrir
                                        </Link>
                                        <Link
                                            href="/conversations"
                                            className="mobile-nav-link"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Messages
                                        </Link>
                                    </>
                                )}
                                <div className="pt-4 mt-4 border-t border-gray-200">
                                    <div className="px-4">
                                        <Button
                                            variant="outline"
                                            className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                                        >
                                            Déconnexion
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
				.nav-link {
					@apply relative px-4 py-2 text-sm font-medium text-gray-700 rounded-lg transition-all duration-300 hover:text-emerald-600 hover:bg-emerald-50/50;
				}
				.nav-link::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 0;
					height: 2px;
					background: linear-gradient(to right, #10b981, #14b8a6);
					transition: width 0.3s ease;
				}
				.nav-link:hover::after {
					width: 100%;
				}
				.mobile-nav-link {
					@apply block px-4 py-3 text-base font-medium text-gray-700 rounded-lg transition-all duration-300 hover:text-emerald-600 hover:bg-emerald-50/50 hover:translate-x-1;
				}
			`}</style>
        </nav>
    )
} 