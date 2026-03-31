import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from './_layout';

export default function LogoutScreen() {
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // 1. On exécute la déconnexion globale
        logout();

        // 2. On redirige vers l'accueil
        // On utilise replace pour que l'utilisateur ne puisse pas faire "Retour"
        // et retomber sur la page de déconnexion
        router.replace('/');
    }, []);

    // On ne retourne rien (ou un écran vide) car la redirection est quasi instantanée
    return null;
}