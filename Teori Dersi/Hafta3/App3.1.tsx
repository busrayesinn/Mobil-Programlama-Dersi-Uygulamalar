// App.tsx
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const COLORS = {
  background: '#f0f0f0',
  primary: '#0066cc',
  text: '#333333',
};

const Spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.boxRow}>
          <View style={styles.boxSmall} />
          <View style={styles.boxMedium} />
          <View style={styles.boxLarge} />
        </View>
        <Text style={styles.text}>
          Bu, üç farklı boyutta kutunun flexbox ile hizalandığı örnektir.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: Spacing.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxRow: {
    flexDirection: 'row',
    marginBottom: Spacing.large,
  },
  boxSmall: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.primary,
    marginHorizontal: Spacing.small,
  },
  boxMedium: {
    flex: 2,
    height: 50,
    backgroundColor: '#3399ff',
    marginHorizontal: Spacing.small,
  },
  boxLarge: {
    flex: 3,
    height: 50,
    backgroundColor: '#99ccff',
    marginHorizontal: Spacing.small,
  },
  text: {
    fontSize: 18,
    color: COLORS.text,
  },
});
