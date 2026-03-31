import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useState } from 'react';
import { globalStyles, Colors } from '../styles/global'; // On importe aussi Colors pour la cohérence

export default function SignupScreen() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = () => {
        const cleanEmail = email.trim();

        if (!cleanEmail || !password) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Erreur", "Les mots de passe ne correspondent pas !");
            return;
        }

        console.log("Compte créé pour :", email);
        router.replace('/login');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Stack.Screen options={{ title: 'Créer un compte' }} />

            <View style={styles.card}>
                <Text style={styles.title}>Inscription</Text>
                <Text style={styles.subtitle}>Rejoignez-nous pour gérer vos tâches efficacement</Text>

                <TextInput
                    style={globalStyles.input} // Utilisation du style global
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={globalStyles.input} // Utilisation du style global
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={globalStyles.input} // Utilisation du style global
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={globalStyles.primaryButton}
                    onPress={handleSignup}
                >
                    <Text style={globalStyles.primaryButtonText}>S'inscrire</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text>Déjà un compte ? </Text>
                    <TouchableOpacity onPress={() => router.push('/login')}>
                        <Text style={styles.loginLink}>Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#03dac6', // Couleur spécifique au Signup pour le différencier
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    title: {
        fontSize: 26,
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
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginLink: {
        color: '#6200ee', // On utilise la couleur primaire de l'app pour le lien
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});