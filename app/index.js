import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useAuth } from './_layout';
import { globalStyles } from '../styles/global';

export default function HomeScreen() {
    const tasks = [
        { id: '1', title: 'Acheter du pain' },
        { id: '2', title: 'Réparer le vélo' },
        { id: '3', title: 'Apprendre Expo Router' },
    ];

    const { isLoggedIn } = useAuth();

    return (
        <View style={globalStyles.container}>
            <Stack.Screen
                options={{
                    title: 'Accueil',
                    headerRight: () => isLoggedIn ? (
                        <Link href="/tasks" asChild>
                            <TouchableOpacity>
                                <Text style={{ color: '#fff', fontWeight: 'bold', marginRight: 15 }}>Mes Tâches</Text>
                            </TouchableOpacity>
                        </Link>
                    ) : null
                }}
            />

            <Text style={styles.sectionTitle}>Tâches Publiques :</Text>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link href={`/${item.title}`} asChild>
                        <TouchableOpacity style={styles.taskCard}>
                            <Text style={styles.taskText}>{item.title}</Text>
                            <Text style={styles.arrow}>→</Text>
                        </TouchableOpacity>
                    </Link>
                )}
            />

            <View style={styles.footer}>
                {isLoggedIn ? (
                    <Link href="/profile" asChild>
                        <TouchableOpacity style={globalStyles.profileButton}>
                            <Text style={globalStyles.profileButtonText}>Voir mon Profil</Text>
                        </TouchableOpacity>
                    </Link>
                ) : (
                    <Link href="/login" asChild>
                        <TouchableOpacity style={globalStyles.profileButton}>
                            <Text style={globalStyles.profileButtonText}>Aller à la page Connexion</Text>
                        </TouchableOpacity>
                    </Link>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333'
    },
    taskCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
    },
    taskText: { fontSize: 16 },
    arrow: { color: '#6200ee', fontWeight: 'bold' },
    footer: {
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: '#ddd',
        paddingTop: 20
    },
});