const palette = {
    bg: '#F2F2F2',
    card: '#FFFFFF',
    text: '#111827',
    subtext: '#6B7280',
    primary: '#111827',
    secondary: '#374151',
    danger: '#B91C1C',
    border: '#E5E7EB'
  };
  
  export const theme = {
    colors: palette,
    radius: { sm: 8, md: 12, lg: 16 },
    spacing: (n) => n * 8,
    shadow: {
      card: { elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }
    }
  };
  