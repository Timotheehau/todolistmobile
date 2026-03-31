import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, Redirect, Stack, Link } from 'expo-router';
import { useAuth } from '../_layout'; // Import du contexte global
import { globalStyles } from '../../styles/global';

export default function TaskManager() {
    const router = useRouter();

    // 1. On récupère les vraies infos globales
    const { tasks, isLoggedIn, logout, user } = useAuth();

    const userTasks = [
        { id: '1', title: 'Récupérer le colis', completed: false },
        { id: '2', title: 'Préparer la réunion', completed: true },
        { id: '3', title: 'Payer les factures', completed: false },
    ];

    // 2. PROTECTION RÉELLE : Si pas connecté, redirection automatique
    if (!isLoggedIn) {
        return <Redirect href="/login" />;
    }

    const handleLogout = () => {
        logout(); // On vide la session globale
        router.replace('/');
    };

    return (
        <View style={globalStyles.container}>
            <Stack.Screen
                options={{
                    title: 'Mes Tâches Privées',
                    headerRight: () => (
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.headerLogoutText}>Déconnexion</Text>
                        </TouchableOpacity>
                    ),
                }}
            />

            {/* Utilisation de l'email ou du nom du contexte */}
            <Text style={styles.welcome}>
                Bonjour, {user?.email.split('@')[0] || 'Utilisateur'} !
            </Text>

            <Link href="/tasks/new" asChild>
                <TouchableOpacity style={globalStyles.profileButton}>
                    <Text style={globalStyles.profileButtonText}>+ Ajouter une nouvelle tâche</Text>
                </TouchableOpacity>
            </Link>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link
                        href={{
                            pathname: `/${item.title}`, // Le nom du fichier est [task].js
                            params: { description: item.description } // On envoie la description en bonus
                        }}
                        asChild
                    >
                        <TouchableOpacity style={styles.taskCard}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.taskText, item.completed && styles.completedText]}>
                                    {item.title}
                                </Text>
                            </View>
                            <Text style={{ color: '#6200ee' }}>→</Text>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1a1a1a',
    },
    taskCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    taskText: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1, // Permet au texte de ne pas pousser le tag hors de l'écran
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    statusTag: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginLeft: 10,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    headerLogoutText: {
        color: '#fff',
        fontWeight: 'bold',
        marginRight: 15,
    }
});