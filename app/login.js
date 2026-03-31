import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import { useRouter, Redirect, Stack } from 'expo-router';
import { useState } from 'react';
import { useAuth } from './_layout';
import { globalStyles } from '../styles/global';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const { login, isLoggedIn } = useAuth(); // On récupère l'état réel
    const router = useRouter();

    // 1. PROTECTION : Si l'utilisateur est déjà connecté, pas besoin de rester ici
    if (isLoggedIn) {
        return <Redirect href="/" />;
    }

    const handleLogin = () => {
        const cleanEmail = email.trim();

        if (!cleanEmail) {
            Alert.alert("Erreur", "Veuillez saisir votre adresse email.");
            return;
        }
        // On passe l'email saisi au contexte global
        login({ email: email, name: "Utilisateur" });

        // Redirection vers l'espace privé
        router.replace('/tasks');
    };

    return (
        <View style={globalStyles.container}>
            <Stack.Screen options={{ title: 'Connexion', headerLeft: () => null }} />

            <View style={styles.card}>
                <Text style={styles.title}>Bon retour !</Text>
                <Text style={styles.subtitle}>Connectez-vous pour gérer vos tâches</Text>

                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={globalStyles.input} // Style global
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={globalStyles.input} // Style global
                    placeholder="Mot de passe"
                    secureTextEntry
                />

                {/* Utilisation de ton style de bouton noir (profileButton) */}
                <TouchableOpacity
                    style={globalStyles.profileButton}
                    onPress={handleLogin}
                >
                    <Text style={globalStyles.profileButtonText}>Se connecter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.signupContainer}
                    onPress={() => router.push('/signup')}
                >
                    <Text style={styles.signupText}>
                        Pas encore de compte ? <Text style={styles.signupLink}>S'inscrire</Text>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backText}>Annuler</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 25,
    },
    backText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
        textDecorationLine: 'underline',
    },
    signupContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    signupText: {
        color: 'black'
    },
    signupLink: {
        color: 'black',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
});