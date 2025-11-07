// App.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

const COLORS = {
  primary: '#6200EE',
  pressed: '#3700B3',
  background: '#FFFFFF',
  text: '#FFFFFF',
};

const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
};

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.button,
      pressed && styles.buttonPressed,
      style,
    ]}
  >
    {({pressed}) => 
    (<Text style={[styles.buttonText, textStyle]}>
      {pressed ? 'Pressed!' : title}
    </Text> 
  )}
  </Pressable>
);

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <CustomButton title="Press Me" onPress={() => console.log('Pressed')} />
        <CustomButton
          title="Styled Bot"
          onPress={() => {}}
          style={{ marginTop: SPACING.m, backgroundColor: '#03DAC6' }}
          textStyle={{ color: '#000' }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.m,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderWidth: 1
  },
  buttonText: {
    fontSize: SPACING.s,
  },
  buttonPressed: {
    borderColor: '#c273d6ff',
  },
});