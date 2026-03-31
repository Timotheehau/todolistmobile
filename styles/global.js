import { StyleSheet } from 'react-native';

export const Colors = {
    primary: '#6200ee',
    secondary: '#03dac6',
    danger: '#ff3b30',
    success: '#4CAF50',
    background: '#f8f9fa',
    white: '#fff',
    black: '#000',
    orange: 'orange',
    textGray: '#666',
    border: '#ddd',
};

export const globalStyles = StyleSheet.create({
    // BOUTON PRINCIPAL (Login/Validation)
    primaryButton: {
        backgroundColor: Colors.black,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },

    // BOUTON PROFIL (Le tien : noir et orange)
    profileButton: {
        backgroundColor: Colors.black,
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
    },
    profileButtonText: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },

    // BOUTON DANGER (Déconnexion/Annuler)
    dangerButton: {
        backgroundColor: Colors.danger,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },

    // INPUTS
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 12,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginBottom: 15,
    }
});