export const theme = {
    colors: {
        primary: '#007AFF', // iOS Blue - Trustworthy, Professional
        secondary: '#5856D6', // Purple - Creative accent
        background: '#F2F2F7', // Light Gray - Standard iOS background
        surface: '#FFFFFF', // White - Cards, Input fields
        text: {
            primary: '#000000',
            secondary: '#8E8E93',
            inverse: '#FFFFFF',
        },
        border: '#C6C6C8',
        error: '#FF3B30',
        success: '#34C759',
        bubble: {
            sent: '#007AFF',
            received: '#E9E9EB',
        },
    },
    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
    },
    borderRadius: {
        s: 8,
        m: 12,
        l: 20,
        xl: 30, // For rounded buttons
    },
    typography: {
        h1: {
            fontSize: 32,
            fontWeight: '700',
            letterSpacing: 0.3,
        },
        h2: {
            fontSize: 24,
            fontWeight: '600',
            letterSpacing: -0.4,
        },
        body: {
            fontSize: 17,
            lineHeight: 22,
        },
        caption: {
            fontSize: 12,
            color: '#8E8E93',
        },
    },
    shadows: {
        small: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 5,
        },
    },
} as const;
