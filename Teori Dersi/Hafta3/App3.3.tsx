// App.tsx
// telefonun karanlık modunun acikligina gore degisen ekran
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ColorSchemeName,
} from 'react-native';

const lightTheme = {
  background: '#FFFFFF',
  text: '#222222',
  accent: '#0066CC',
};

const darkTheme = {
  background: '#1E1E1E',
  text: '#E0E0E0',
  accent: '#64B5F6',
};

const SPACING = {
  small: 8,
  medium: 16,
  large: 24,
};

const getTheme = (scheme: ColorSchemeName) =>
  scheme === 'dark' ? darkTheme : lightTheme;

export default function App() {
  const scheme = useColorScheme();
  const theme = getTheme(scheme);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>
          Current theme: {scheme}
        </Text>
        <View style={[styles.box, { backgroundColor: theme.accent }]}>
          <Text style={[styles.boxText, { color: theme.text }]}>
            Accent Box
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.medium,
  },
  title: {
    fontSize: 20,
    marginBottom: SPACING.large,
  },
  box: {
    padding: SPACING.medium,
    borderRadius: 8,
  },
  boxText: {
    fontSize: 16,
  },
});
