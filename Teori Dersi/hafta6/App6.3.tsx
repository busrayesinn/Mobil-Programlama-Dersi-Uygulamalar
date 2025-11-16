import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';

// --- Yardımcı Componentler (Ders İçeriğini Bölmek İçin) ---

/**
 * Sunumdaki konuları görsel olarak ayırmak için kullanılan bir yardımcı.
 * (props.children konseptini de kullanır)
 */
const Section = ({ title, children }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

// --- 1. Ata -> Çocuk (Props) (Slayt 15) ---

/**
 * Ata component'ten (App) 'user' prop'u alan basit bir çocuk component.
 */
const WelcomeMessage = (props) => {
  return <Text style={styles.text}>Hoş geldin, {props.user}!</Text>;
};

// --- 2. Çocuk -> Ata (Callback) (Slayt 16-17) ---

/**
 * Bu component, kendi iç state'i olan 'text'i yönetir.
 * Ata'dan 'onNameSubmit' adında bir *fonksiyon* prop'u alır.
 * Butona basıldığında, bu fonksiyonu kendi state'i ile çağırır.
 */
const NameInput = ({ onNameSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onNameSubmit(text); // 4. Ata'dan gelen fonksiyonu, kendi verisiyle çağır.
    setText(''); // 5. Input'u temizle
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="İsim girin..."
        value={text}
        // Olay: 'onChangeText' doğrudan string (metin) döndürür
        onChangeText={setText} // 1. Kendi iç state'ini güncelle
      />
      {/* Olay: 'onPress' butona dokunulduğunda tetiklenir */}
      <Button
        title="Ata'ya Gönder"
        onPress={handleSubmit} // 2. Kendi handler'ını çağır
      />
    </View>
  );
};

// --- 3. Kardeşler Arası (Lifting State Up) (Slayt 18-19) ---

/**
 * Kardeş A: Sadece veriyi (count) okur ve gösterir.
 */
const DisplayCount = ({ count }) => {
  return <Text style={styles.counterText}>Sayı: {count}</Text>;
};

/**
 * Kardeş B: Veriyi değiştirme "yeteneğini" (onIncrement) prop olarak alır.
 */
const IncrementButton = ({ onIncrement }) => {
  return <Button title="+ Arttır" onPress={onIncrement} />;
};

// --- 6. Prop Drilling (Kötü Senaryo) (Slayt 20-21) ---

const userObject = { name: 'Ahmet', role: 'Admin' };

// Seviye 1 (user'a ihtiyacı yok ama delmek zorunda)
const Level1_Drill = ({ user }) => <Level2_Drill user={user} />;
// Seviye 2 (user'a ihtiyacı yok ama delmek zorunda)
const Level2_Drill = ({ user }) => <Level3_Drill user={user} />;
// Seviye 3 (user'a ihtiyacı var)
const Level3_Drill = ({ user }) => (
  <Text style={styles.text}>
    Hoş geldin, {user.name} (Prop Drilling ile geldi)
  </Text>
);

// --- 7. Component Kompozisyonu (İyi Senaryo) (Slayt 21) ---

// Seviye 1 (içeriği bilmez, sadece sarmalar)
const Level1_Comp = ({ children }) => (
  <View style={styles.compositionBorder}>{children}</View>
);
// Seviye 2 (içeriği bilmez, sadece sarmalar)
const Level2_Comp = ({ children }) => (
  <View style={styles.compositionBorder}>{children}</View>
);
// Seviye 3 (veriyi doğrudan en üst atadan alır, aradakiler bilmez)
const Level3_Final = ({ user }) => (
  <Text style={styles.text}>
    Hoş geldin, {user.name} (Kompozisyon ile geldi)
  </Text>
);

// --- Ana Uygulama Component'i (Tüm State'lerin Ebeveyni) ---

export default function App() {
  // 2. Çocuk -> Ata için State
  const [nameFromChild, setNameFromChild] = useState('');

  // 3. Kardeşler Arası için State (State'i yukarı taşıdık)
  const [sharedCount, setSharedCount] = useState(0);

  // 5. nativeEvent için State
  const [viewWidth, setViewWidth] = useState(0);

  // 8. State Batching için State
  const [batchCount, setBatchCount] = useState(0);

  // --- Olay Handler Fonksiyonları (Ebeveynde tanımlanırlar) ---

  // 2. Çocuk -> Ata için Callback Fonksiyonu
  const handleNameUpdate = (newName) => {
    setNameFromChild(newName);
  };

  // 3. Kardeşler Arası için Callback Fonksiyonu
  const handleSharedIncrement = () => {
    setSharedCount(sharedCount + 1);
  };

  // 5. nativeEvent (onLayout) Handler'ı
  const handleLayout = (e) => {
    // e.nativeEvent, platformdan gelen ham veriyi içerir
    const width = e.nativeEvent.layout.width;
    setViewWidth(width);
  };

  // 8. State Batching (HATALI Yöntem)
  const handleBadTripleClick = () => {
    // Bu scope'taki 'batchCount' değeri (örn: 0) hep aynıdır.
    setBatchCount(batchCount + 1); // 0 + 1 = 1
    setBatchCount(batchCount + 1); // 0 + 1 = 1
    setBatchCount(batchCount + 1); // 0 + 1 = 1
    // React bu 3 çağrıyı birleştirir (batch) ve SONUÇ = 1 olur.
  };

  // 8. Fonksiyonel Güncelleme (DOĞRU Yöntem)
  const handleGoodTripleClick = () => {
    // Fonksiyonel güncelleme, her zaman state'in "en son" halini
    // (prevCount) alır ve kuyruğa ekler.
    setBatchCount((prevCount) => prevCount + 1); // 0 + 1 = 1
    setBatchCount((prevCount) => prevCount + 1); // 1 + 1 = 2
    setBatchCount((prevCount) => prevCount + 1); // 2 + 1 = 3
    // SONUÇ = 3 olur.
  };

  return (
    <ScrollView style={styles.container}>
      {/* --- 1. ATA -> ÇOCUK (PROPS) --- */}
      <Section title="1. Ata -> Çocuk (Props)">
        <WelcomeMessage user="Ahmet" />
      </Section>

      {/* --- 2. ÇOCUK -> ATA (CALLBACK) --- */}
      <Section title="2. Çocuk -> Ata (Callback)">
        <Text style={styles.text}>Ebeveyndeki İsim: {nameFromChild}</Text>
        <NameInput onNameSubmit={handleNameUpdate} />
      </Section>

      {/* --- 3. KARDEŞLER ARASI (LIFTING STATE UP) --- */}
      <Section title="3. Kardeşler Arası (Lifting State Up)">
        {/* State (sharedCount) ve Handler (handleSharedIncrement) 
            ebeveynde (App.js) tanımlanır ve ilgili kardeşlere dağıtılır. */}
        <DisplayCount count={sharedCount} />
        <IncrementButton onIncrement={handleSharedIncrement} />
      </Section>

      {/* --- 4. DOKUNMA HİYERARŞİSİ (SLAYT 9-10) --- */}
      <Section title="4. Dokunma Hiyerarşisi">
        <Text style={styles.text}>1. Button (Stil almaz):</Text>
        <Button title="Native Button" onPress={() => alert('Button!')} />

        <Text style={styles.text}>2. TouchableOpacity (Opaklık):</Text>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => alert('TouchableOpacity!')}>
          <Text style={styles.customButtonText}>Özel Buton (TouchableOpacity)</Text>
        </TouchableOpacity>

        <Text style={styles.text}>3. Pressable (Modern):</Text>
        <Pressable
          style={({ pressed }) => [
            styles.customButton,
            { backgroundColor: pressed ? '#666' : '#007AFF' },
          ]}
          onPressIn={() => console.log('Dokunma Başladı (PressIn)')}
          onPressOut={() => console.log('Dokunma Bitti (PressOut)')}
          onPress={() => alert('Pressable!')}>
          <Text style={styles.customButtonText}>Özel Buton (Pressable)</Text>
        </Pressable>
      </Section>

      {/* --- 5. OLAY ARGÜMANI (e.nativeEvent) (SLAYT 11-13) --- */}
      <Section title="5. Olay Argümanı (e.nativeEvent)">
        <Text style={styles.text} onLayout={handleLayout}>
          (Bu Text'in genişliği: {viewWidth.toFixed(2)} px)
        </Text>
      </Section>

      {/* --- 6. PROP DRILLING (KÖTÜ) --- */}
      <Section title="6. Prop Drilling (Kötü)">
        <Level1_Drill user={userObject} />
      </Section>

      {/* --- 7. COMPONENT KOMPOZİSYONU (İYİ) --- */}
      <Section title="7. Component Kompozisyonu (İyi)">
        <Level1_Comp>
          <Level2_Comp>
            <Level3_Final user={userObject} />
          </Level2_Comp>
        </Level1_Comp>
      </Section>

      {/* --- 8. STATE BATCHING & FONKSİYONEL GÜNCELLEME (SLAYT 22-25) --- */}
      <Section title="8. State Güncelleme & Batching">
        <Text style={styles.counterText}>Sayaç: {batchCount}</Text>
        <Button title="HATALI: +3 Tıkla" onPress={handleBadTripleClick} />
        <View style={{ marginVertical: 4 }} />
        <Button title="DOĞRU: +3 Tıkla" onPress={handleGoodTripleClick} />
        <View style={{ marginVertical: 4 }} />
        <Button title="Sıfırla" onPress={() => setBatchCount(0)} />
      </Section>
    </ScrollView>
  );
}

// --- STİLLER ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#f4f4f4',
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  sectionContent: {
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 10,
    fontSize: 16,
  },
  counterText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  customButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  customButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  compositionBorder: {
    borderWidth: 1,
    borderColor: '#007AFF',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});