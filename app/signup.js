import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useState } from 'react';
import { globalStyles } from '../styles/global';
import { useAuth } from './_layout'; // 1. IMPORTATION CRUCIALE

export default function SignupScreen() {
    const router = useRouter();
    const { register } = useAuth(); // 2. RÉCUPÉRATION DE LA FONCTION

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = () => {
        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        // Validation de base
        if (!cleanEmail || !cleanPassword || !confirmPassword) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        if (cleanPassword !== confirmPassword) {
            Alert.alert("Erreur", "Les mots de passe ne correspondent pas !");
            return;
        }

        // 3. ENREGISTREMENT RÉEL DANS LE CONTEXTE
        const result = register(cleanEmail, cleanPassword);

        if (result.success) {
            console.log("Compte créé avec succès pour :", cleanEmail);
            Alert.alert(
                "Succès",
                "Votre compte a été créé. Vous pouvez maintenant vous connecter.",
                [{ text: "OK", onPress: () => router.replace('/login') }]
            );
        } else {
            // Affiche l'erreur si l'email est déjà pris par exemple
            Alert.alert("Erreur", result.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Stack.Screen options={{ title: 'Créer un compte' }} />

            <View style={styles.card}>
                <Text style={styles.title}>Inscription</Text>
                <Text style={styles.subtitle}>Rejoignez-nous pour gérer vos tâches efficacement</Text>

                <TextInput
                    style={globalStyles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={globalStyles.input}
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
        backgroundColor: '#03dac6',
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
        color: '#6200ee',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});