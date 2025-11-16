# 📘 Hafta 6 – React Native: Props, Callback, Lifting State Up

Bu hafta React Native’de **component iletişimi** ve **state yönetimi** üzerine üç farklı örnek uygulama geliştirildi.

Klasörde şu dosyalar bulunur:

```
📁 hafta6
 ├── 📁 app6.1
 ├── 📁 app6.2
 ├── 📁 app6.3
 └── 📁 pictures
       ├── app6.1.jpeg
       ├── app6.2.jpeg
       └── app6.3.jpeg
```

---

## 🔹 app6.1 — Çocuk → Ata (Callback Props)

Bu örnekte **child component**, input'a girilen veriyi bir butona basıldığında **parent'a geri gönderir**.

Temel noktalar:

* Parent bir fonksiyon oluşturur (`handleNameUpdate`)
* Bu fonksiyonu child’a **prop olarak gönderir**
* Child, kullanıcı butona bastığında bu fonksiyonu **kendi state’indeki değerle çağırır**
* Parent kendi state’ini günceller ve ekrana yansıtır

![App6.1](pictures/app6.1.jpg)

---

## 🔹 app6.2 — Kardeşler Arası İletişim (Lifting State Up)

Burada iki ayrı child component vardır:

* **Display** → değeri sadece gösterir
* **IncrementButton** → parent’taki değeri artırır

İki kardeşin veri paylaşabilmesi için state ortak bir parent’a taşınır.

Temel noktalar:

* State **App.js** içinde tutulur
* `count` değeri Display’e gönderilir
* `setCount` fonksiyonu IncrementButton’a gönderilir

![App6.2](pictures/app6.2.jpg)

---

## 🔹 app6.3 — Props, Callback, State Batching, Prop Drilling

En kapsamlı örnektir. İçerdiği başlıklar:

### ✦ 1. Ata → Çocuk (Props)

Basit bir şekilde parent’tan child’a veri gönderme

### ✦ 2. Çocuk → Ata (Callback)

Child içindeki veriyi parent’a geri iletme

### ✦ 3. Kardeşler Arası State Paylaşımı

State’in yukarı taşınması (Lifting State Up)

### ✦ 4. Dokunma Bileşenleri

`Button`, `TouchableOpacity`, `Pressable` farkları

### ✦ 5. Olay Argümanı

`e.nativeEvent.layout.width` kullanımı

### ✦ 6. Prop Drilling (Kötü Örnek)

Props’un gereksiz şekilde 3–4 component aşağı taşınması

### ✦ 7. Component Composition (İyi Örnek)

Component katmanları veri taşımadan sadece görünümü sarmalıyor

### ✦ 8. State Batching

Yanlış ve doğru state güncelleme örnekleri

![App6.3](pictures/app6.3.jpg)

---

## 📎 Kurulum

Projeyi çalıştırmak için:

```sh
npm install
npm start
```

---

## 📚 İçerik Özeti

Bu hafta öğrenilen temel React Native kavramları:

* Props ile veri gönderme
* Callback fonksiyonlarla veri geri döndürme
* Kardeşler arası iletişim için state’in yukarı taşınması
* Dokunma bileşenleri
* Olay argümanı (nativeEvent)
* Prop drilling ve component composition farkı
* State batching ve fonksiyonel güncellemeler

