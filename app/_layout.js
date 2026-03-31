import { Stack } from 'expo-router';
import { createContext, useContext, useState } from 'react';

// 1. On crée le contexte
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export default function RootLayout() {
    const [user, setUser] = useState(null);
    // On transforme la DB en State pour pouvoir ajouter des inscrits
    const [users, setUsers] = useState([
        { email: "test@test.com", password: "123", name: "Timothée" },
        { email: "admin@app.com", password: "admin", name: "Administrateur" }
    ]);

    const [tasks, setTasks] = useState([
        { id: '1', title: 'Récupérer le colis', completed: false },
    ]);

    // LOGIN : On cherche dans le state 'users'
    const login = (email, password) => {
        const foundUser = users.find(
            (u) => u.email === email && u.password === password
        );

        if (foundUser) {
            setUser(foundUser);
            return { success: true };
        }
        return { success: false, message: "Email ou mot de passe incorrect." };
    };

    // 🆕 NOUVELLE FONCTION : REGISTER
    const register = (email, password) => {
        const exists = users.find(u => u.email === email);
        if (exists) {
            return { success: false, message: "Cet email est déjà utilisé." };
        }

        const newUser = { email, password, name: "Nouvel Utilisateur" };
        setUsers([...users, newUser]); // On l'ajoute à la liste réelle
        return { success: true };
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{
            user, isLoggedIn: !!user, login, logout, register, tasks
        }}>
            <Stack screenOptions={{ headerStyle: { backgroundColor: 'black' }, headerTintColor: '#fff' }} />
        </AuthContext.Provider>
    );
}