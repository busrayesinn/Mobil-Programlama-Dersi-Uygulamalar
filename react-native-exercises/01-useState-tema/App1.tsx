// butona tiklandiginda degisen arkaplan
import React, {useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const containerStyles = isDarkMode ? styles.darkTheme : styles.lightTheme;
  return (
    <View style={[styles.container ,containerStyles]}>
      <Button
        title={'temayı değiştir'}
        onPress={() => setIsDarkMode(!isDarkMode)}
      />
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>
        temaya göre değişecek metin rengi
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  darkTheme: {
    backgroundColor: 'black',
  },
  darkText: {
    color: 'white',
  },
  lightTheme: {
    backgroundColor: 'white',
  },
  lightText: {
    color: 'black',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
