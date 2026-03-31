import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, Redirect, Stack } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../_layout'; // Import de ton contexte global
import { globalStyles } from '../../styles/global'; // Ajuste les ../ selon l'emplacement

export default function NewTaskScreen() {
    const router = useRouter();
    const { isLoggedIn } = useAuth(); // Utilisation de la vraie connexion
    const { addTask } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // 1. PROTECTION RÉELLE : Redirection si non connecté
    if (!isLoggedIn) {
        return <Redirect href="/login" />;
    }

    const handleCreateTask = () => {
        if (title.trim() === '') {
            Alert.alert("Erreur", "Le titre est obligatoire");
            return;
        }
        addTask(title, description);

        console.log("Nouvelle tâche créée :", { title, description });

        // 2. NAVIGATION : Retour à la liste après création
        router.push('/tasks');
    };

    return (
        <View style={globalStyles.container}>
            <Stack.Screen options={{ title: 'Nouvelle Tâche' }} />

            <View style={styles.formCard}>
                <Text style={styles.label}>Titre de la tâche</Text>
                <TextInput
                    style={globalStyles.input} // Style global
                    placeholder="Ex: Finir le projet Expo"
                    value={title}
                    onChangeText={setTitle}
                />

                <Text style={styles.label}>Description (Optionnel)</Text>
                <TextInput
                    style={[globalStyles.input, styles.textArea]} // Style global + extension locale
                    placeholder="Ajouter des détails..."
                    multiline
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                />

                {/* On utilise ton bouton profil (noir) pour enregistrer */}
                <TouchableOpacity
                    style={globalStyles.profileButton}
                    onPress={handleCreateTask}
                >
                    <Text style={globalStyles.profileButtonText}>Enregistrer la tâche</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formCard: {
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top', // Important pour Android
    },
    cancelButton: {
        marginTop: 15,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#666',
        textDecorationLine: 'underline',
    },
});