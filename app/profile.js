import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Redirect, Stack, useRouter } from 'expo-router';
import { useAuth } from './_layout';
import { globalStyles } from '../styles/global';

export default function ProfileScreen() {
    const router = useRouter();
    const { user, isLoggedIn, logout } = useAuth();

    if (!isLoggedIn) {
        return <Redirect href="/login" />;
    }

    const handlePressLogout = () => {
        logout();
        router.replace('/');
    };

    const initial = user?.email ? user.email.charAt(0).toUpperCase() : '?';

    return (
        <View style={globalStyles.container}>
            <Stack.Screen options={{ title: 'Mon Profil' }} />

            <View style={styles.profileCard}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{initial}</Text>
                </View>

                <Text style={styles.userName}>Bienvenue !</Text>

                <Text style={styles.userEmail}>
                    {user?.email || "Email non renseigné"}
                </Text>

                {/* On utilise le bouton de profil (noir) pour la déconnexion ici */}
                <TouchableOpacity
                    style={globalStyles.profileButton}
                    onPress={handlePressLogout}
                >
                    <Text style={globalStyles.profileButtonText}>Déconnexion</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileCard: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        // On garde l'élévation ici car elle est spécifique à cette carte
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'black', // Style cohérent avec tes boutons
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    avatarText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold'
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333'
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 25,
        marginTop: 5
    }
});