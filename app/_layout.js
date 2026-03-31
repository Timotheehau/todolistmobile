import { Stack } from 'expo-router';
import { createContext, useContext, useState } from 'react';

// 1. On crée le contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser l'auth facilement ailleurs
export const useAuth = () => useContext(AuthContext);

// Dans app/_layout.js
export default function RootLayout() {
    const [user, setUser] = useState(null);
    // On initialise avec tes tâches par défaut
    const [tasks, setTasks] = useState([
        { id: '1', title: 'Récupérer le colis', completed: false },
        { id: '2', title: 'Préparer la réunion', completed: true },
    ]);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    // Fonction pour ajouter une tâche
    const addTask = (title, description) => {
        const newTask = {
            id: Date.now().toString(), // ID unique basé sur le temps
            title: title,
            description: description,
            completed: false,
        };
        setTasks([...tasks, newTask]); // On ajoute la nouvelle tâche à la liste
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, tasks, addTask }}>
            <Stack screenOptions={{ headerStyle: { backgroundColor: 'black' }, headerTintColor: '#fff' }} />
        </AuthContext.Provider>
    );
}