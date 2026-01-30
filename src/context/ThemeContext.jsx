import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('primaryColor') || '#1a472a');

    useEffect(() => {
        const root = window.document.documentElement;

        // Aplicar Modo Escuro
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        // Aplicar Cor Primária Customizada
        document.documentElement.style.setProperty('--primary-green', primaryColor);
        localStorage.setItem('primaryColor', primaryColor);
    }, [primaryColor]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, primaryColor, setPrimaryColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
