import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { globalStyles } from '../styles/global'; // Vérifie bien les ../..

export default function TaskDetail() {
    // 1. On récupère le titre (task) et la description passée en paramètre
    const { task, description } = useLocalSearchParams();
    const router = useRouter();

    return (
        <View style={globalStyles.container}>
            <Stack.Screen options={{ title: `Détail : ${task}` }} />

            <View style={styles.card}>
                <Text style={styles.label}>Tâche sélectionnée :</Text>
                <Text style={styles.taskTitle}>{task}</Text>

                {/* 2. On affiche la description dynamique ou un message par défaut */}
                <Text style={styles.description}>
                    {description || "Aucune description fournie pour cette tâche."}
                </Text>

                <TouchableOpacity
                    style={globalStyles.profileButton}
                    onPress={() => router.back()}
                >
                    <Text style={globalStyles.profileButtonText}>Retour à la liste</Text>
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
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    label: {
        fontSize: 12,
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: 'bold'
    },
    taskTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 15,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30,
    }
});