import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Users, Video, CheckCircle, Edit, FileText, UserCheck, MessageCircle, BadgeCheck, UserSearch } from 'lucide-react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation isAuthenticated={false} />

      {/* Hero Section */}
      <section id="accueil" className="relative overflow-hidden hero-gradient min-h-screen flex items-center">
        <div className="zj-pattern absolute inset-0 opacity-10"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-responsive-xl font-bold text-white mb-8 text-shadow">
              <span className="arabic-accent block mb-4">Unissez-vous dans le respect</span>
              <span className="bg-gradient-to-r from-emerald-200 to-white bg-clip-text text-transparent">
                de la Sunnah
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Zawajuna vous accompagne dans votre quête du mariage islamique avec des rencontres
              sécurisées, modérées et respectueuses des préceptes de l&apos;Islam.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg px-10 py-4 rounded-xl font-semibold shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Créer un Compte
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" className="bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-emerald-600 backdrop-blur-md text-lg px-10 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  Découvrir nos Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-zawajuna-muted-brown max-w-2xl mx-auto">
              Des solutions complètes pour faciliter votre mariage dans le respect des valeurs islamiques
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center card-elegant animate-fade-in border-emerald-100 hover:border-emerald-200">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <UserSearch className="w-10 h-10 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-emerald-800">Mouqabala Assistée</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-zawajuna-muted-brown">
                  Rencontres supervisées par nos modérateurs pour garantir le respect des règles islamiques
                  et faciliter les échanges dans un cadre approprié.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center card-elegant animate-fade-in-delay border-emerald-100 hover:border-emerald-200">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Users className="w-10 h-10 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-emerald-800">Promotion de Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-zawajuna-muted-brown">
                  Mettez en valeur votre profil pour augmenter vos chances de rencontrer
                  la personne qui vous correspond selon vos critères religieux et personnels.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center card-elegant animate-fade-in border-emerald-100 hover:border-emerald-200">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Video className="w-10 h-10 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-emerald-800">Visio Accompagnée</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-zawajuna-muted-brown">
                  Rencontres vidéo modérées par un administrateur pour maintenir un environnement
                  respectueux et conforme aux enseignements islamiques.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="fonctionnement" className="py-24 zawajuna-section-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-zawajuna-muted-brown max-w-2xl mx-auto">
              Un processus simple et sécurisé en 4 étapes pour trouver votre moitié
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1: Inscription */}
            <div className="text-left animate-fade-in">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Edit className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="w-full h-1 bg-emerald-400 rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold text-emerald-700 mb-3">Inscription</h3>
                </div>
              </div>
              <p className="text-zawajuna-muted-brown leading-relaxed">
                Créez votre profil en toute simplicité. Il vous suffit de remplir le formulaire d&apos;inscription dans lequel vous
                seront posées quelques questions qui nous permettront d&apos;en savoir plus sur vous et vos attentes.
              </p>
            </div>

            {/* Step 2: Validation du profil */}
            <div className="text-left animate-fade-in-delay">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="w-full h-1 bg-emerald-400 rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold text-emerald-700 mb-3">Validation du profil</h3>
                </div>
              </div>
              <p className="text-zawajuna-muted-brown leading-relaxed">
                Chez Zawajuna, nous avons à cœur de vous proposer des profils qui partagent vos valeurs et vos principes,
                c&apos;est pourquoi nous faisons en sorte d&apos;étudier chaque inscription avant de la valider.
              </p>
            </div>

            {/* Step 3: Accès aux profils */}
            <div className="text-left animate-fade-in">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="w-full h-1 bg-emerald-400 rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold text-emerald-700 mb-3">Accès aux profils</h3>
                </div>
              </div>
              <p className="text-zawajuna-muted-brown leading-relaxed">
                Une fois votre profil vérifié et validé, vous recevrez un email de confirmation et vous aurez la possibilité de
                consulter les profils des prétendant(e)s.
              </p>
            </div>

            {/* Step 4: Mise en relation */}
            <div className="text-left animate-fade-in-delay">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="w-full h-1 bg-emerald-400 rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold text-emerald-700 mb-3">Mise en relation</h3>
                </div>
              </div>
              <p className="text-zawajuna-muted-brown leading-relaxed">
                La mise en relation s&apos;effectue exclusivement par l&apos;intermédiaire du tuteur indiqué par la prétendante lors de son inscription.
                La demande est initiée par la sœur, et un superviseur se chargera de transmettre les coordonnées du tuteur au prétendant.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-block p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200">
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">
                Prêt à commencer votre parcours ?
              </h3>
              <p className="text-zawajuna-muted-brown mb-6 max-w-md mx-auto">
                Rejoignez notre communauté et trouvez votre moitié dans le respect des valeurs islamiques
              </p>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Créer mon profil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="pourquoi-nous" className="py-24 section-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-8">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Pourquoi Choisir</span> Zawajuna ?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-800 mb-2">Sécurité et Modération</h3>
                    <p className="text-zawajuna-muted-brown">
                      Tous les profils sont vérifiés et les conversations sont modérées par nos administrateurs
                      pour garantir un environnement sûr et respectueux.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-800 mb-2">Respect des Valeurs Islamiques</h3>
                    <p className="text-zawajuna-muted-brown">
                      Notre plateforme respecte scrupuleusement les préceptes islamiques concernant
                      les rencontres et le mariage.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-800 mb-2">Accompagnement Personnalisé</h3>
                    <p className="text-zawajuna-muted-brown">
                      Notre équipe vous accompagne tout au long de votre parcours pour maximiser
                      vos chances de trouver votre moitié.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:text-center animate-fade-in-delay">
              <div className="inline-block p-12 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl shadow-2xl border border-emerald-500/20">
                <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Shield className="w-20 h-20 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6 arabic-accent">
                  Plateforme 100% Sécurisée
                </h3>
                <p className="text-lg text-emerald-50 leading-relaxed">
                  Vos données sont protégées et vos interactions sont surveillées pour votre sécurité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="abonnements" className="py-24 zawajuna-section-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4 arabic-accent">
              Nos Abonnements
            </h2>
            <p className="text-xl text-zawajuna-muted-brown max-w-2xl mx-auto">
              Choisissez l&apos;abonnement qui vous correspond pour accéder à tous nos services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan Frères */}
            <div className="relative">
              <Card className="zawajuna-card text-center p-8 h-full border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="mx-auto w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <BadgeCheck className="w-10 h-10 text-white" />
                  </div>
                  <CardDescription className="text-zawajuna-muted-brown text-lg">
                    Abonnement pour les frères
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-700 mb-2">
                      8,90€
                    </div>
                    <div className="text-zawajuna-muted-brown">par mois</div>
                  </div>

                  <div className="space-y-4 text-left">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-zawajuna-muted-brown">Accès complet aux profils</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-zawajuna-muted-brown">Mouqabala assistée</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-zawajuna-muted-brown">Visio accompagnée</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-zawajuna-muted-brown">Support prioritaire</span>
                    </div>
                  </div>

                  <Link href="/auth/register?plan=freres" className="block">
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                      Choisir ce plan
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Plan Soeurs */}
            <div className="relative">
              <Card className="zawajuna-card text-center p-8 h-full border-2 border-emerald-300 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
                <CardHeader className="pb-6">
                  <div className="mx-auto w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <BadgeCheck className="w-10 h-10 text-white" />
                  </div>
                  <CardDescription className="text-zawajuna-muted-brown text-lg">
                    Abonnement pour les sœurs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-700 mb-2">
                      1,90€
                    </div>
                    <div className="text-zawajuna-muted-brown">par mois</div>
                  </div>

                  <div className="space-y-4 text-left">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-zawajuna-muted-brown">Accès complet aux profils</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-zawajuna-muted-brown">Mouqabala assistée</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-zawajuna-muted-brown">Visio accompagnée</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-zawajuna-muted-brown">Support prioritaire</span>
                    </div>
                  </div>

                  <Link href="/auth/register?plan=soeurs" className="block">
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                      Choisir ce plan
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-zawajuna-muted-brown mb-4">
              Tous nos abonnements incluent une période d&apos;essai gratuite de 3 jours
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-zawajuna-muted-brown">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Paiement sécurisé</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Résiliation à tout moment</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Conformité islamique</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 cta-gradient text-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center cta-content">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-shadow arabic-accent">
              Prêt à Commencer Votre Parcours ?
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-white/90">
              Rejoignez des milliers de musulmans qui ont trouvé leur moitié grâce à Zawajuna.
              <br className="hidden md:block" />
              <span className="text-secondary font-semibold">Créez votre profil dès aujourd&apos;hui.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg px-10 py-4 rounded-xl font-semibold shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Créer un Compte Gratuit
                </Button>
              </Link>
              <Link href="/profiles">
                <Button size="lg" className="bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-emerald-600 backdrop-blur-md text-lg px-10 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  Voir les Profils
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center space-x-8 text-white/70">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-300" />
                <span className="text-sm">Essai gratuit 3 jours</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-300" />
                <span className="text-sm">Sécurisé</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-300" />
                <span className="text-sm">Respectueux</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 arabic-accent text-emerald-100">Zawajuna</h3>
              <p className="text-emerald-200">
                Plateforme de mariage islamique respectueuse des valeurs de la Sunnah.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-emerald-100">Services</h4>
              <ul className="space-y-2 text-emerald-200">
                <li>Mouqabala</li>
                <li>Promotion de Profil</li>
                <li>Visio Accompagnée</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-emerald-100">Support</h4>
              <ul className="space-y-2 text-emerald-200">
                <li>Centre d&apos;Aide</li>
                <li>Contact</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-emerald-100">Légal</h4>
              <ul className="space-y-2 text-emerald-200">
                <li>Conditions d&apos;Utilisation</li>
                <li>Politique de Confidentialité</li>
                <li>Règlement Intérieur</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-700 mt-8 pt-8 text-center text-emerald-200">
            <p>&copy; 2024 Zawajuna. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
