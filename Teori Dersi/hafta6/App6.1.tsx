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

// Parent Component (App.js)
export default function App() {
  const [name, setName] = useState("");
  const scheme = useColorScheme();
  const theme = getTheme(scheme);
  
  // 1. Parent bir fonksiyon tanımlar.
  const handleNameUpdate = (newName) => {
    setName(newName); // Kendi state'ini günceller.
  };

  return (
    <View style={[styles.safeArea, styles.container, { backgroundColor: theme.background }]}>
      <Text style={styles.viewText}>Girilen İsim: {name}</Text>
      {/* 2. Fonksiyonu 'prop' olarak aşağıya (Child'a) geçirir. */}
      <NameInput onNameSubmit={handleNameUpdate} />
    </View>
  );
}

// Child Component (NameInput.js)
function NameInput(props) { // 3. 'props' olarak fonksiyonu alır.
  const [text, setText] = useState("");

  const handleSubmit = () => {
    // 4. Child, bir olay tetiklendiğinde (Butona basıldığında)
    //    prop olarak aldığı fonksiyonu, kendi state'indeki veriyle çağırır.
    props.onNameSubmit(text); 
  };

  return (
    <View style={styles.view}>
      <TextInput 
        placeholder="İsim girin..."
        onChangeText={setText} // Kendi iç state'ini günceller
        value={text}
        style={styles.viewTextInput}
      />
      <Button title="Kaydet" onPress={handleSubmit} />
    </View>
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
  view: {
    marginVertical: 16
  },
  viewTextInput: {
    marginVertical: 16,
    borderWidth: 2,
    borderColor: '#fff',
    color: '#fff',
    padding: 4
  },
  viewText: {
    fontWeight: 500,
    borderColor: '#fff',
    color: '#fff',
    borderBottomWidth: 2,
  }
});
