// App.tsx
import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
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

// Parent (App.js)
export default function App() {
  // 1. State ortak ebeveyne taşınır.
  const [count, setCount] = useState(0);
  const scheme = useColorScheme();
  const theme = getTheme(scheme);

  return (
    <View style={[styles.safeArea, styles.container, { backgroundColor: theme.background }]}>
      {/* 2. State, veriyi okuyacak 'Display'e prop olarak geçilir. */}
      <Display count={count} />
      
      {/* 3. State'i değiştirecek fonksiyon, 'IncrementButton'a prop olarak geçilir. */}
      <IncrementButton onIncrement={() => setCount(count + 1)} />
    </View>
  );
}

// Child A (Display.js)
function Display(props) {
  return <Text style={styles.viewTextInput}>Sayı: {props.count}</Text>;
}

// Child B (IncrementButton.js)
function IncrementButton(props) {
  // Butona basıldığında, Parent'tan gelen fonksiyonu çağırır.
  return <Button title="Arttır" onPress={props.onIncrement} />;
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
  viewTextInput: {
    marginVertical: 16,
    borderWidth: 2,
    borderColor: '#fff',
    color: '#fff',
    padding: 4
  }
});
