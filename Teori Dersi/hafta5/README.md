# 📱 Mobil Programlama – Hafta 5

## React Hooks & Bilgi Geçişi

**Ders:** Mobil Programlama
**Konu:** Hooks, Bilgi Geçişi, Arrow Fonksiyonlar
**Kaynak:** Hafta 5 Sunumu (BTÜ)

---

# 📘 İçindekiler

* [1. Hooks (Kancalar)](#1-hooks-kancalar)
* [2. Hook Türleri](#2-hook-türleri)
* [3. Bilgi Geçişi](#3-bilgi-geçişi)
* [4. Özet Tablo](#5-özet-tablo)
* [5. Örnek Kodlar](#6-örnek-kodlar)

---

# 1. 🔗 Hooks (Kancalar)

React’ta **bileşenlerin içinde kullanılan özel fonksiyonlara** *Hook* denir.
Amaç:

* State yönetmek
* Context erişimi
* Harici sistemlerle (API, DOM, animasyon) iletişim
* Performans optimizasyonu

Hooks **sadece function component** içinde kullanılabilir.

---

# 2. 🧩 Hook Türleri

Aşağıdaki tablo haftanın tüm hook'larını özetler:

## 📋 Hook Kategorileri Tablosu

| Kategori                     | Hook                                              | İşlev                                       | Not                          |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------- | ---------------------------- |
| **Durum (State)**            | `useState`                                        | Bileşenin hatırlayacağı veri                | Değişince render olur        |
| **Bağlam (Context)**         | `useContext`                                      | Global temalardan/üst bileşenden bilgi alma | Prop zincirini engeller      |
| **Referans (Ref)**           | `useRef`                                          | DOM, animasyon değeri, zamanlayıcı saklar   | Değişince render olmaz       |
| **Etki (Effect)**            | `useEffect`                                       | Harici sistemlerle senkronizasyon           | API, event listener          |
| **Performans**               | `useMemo`                                         | Pahalı hesaplamayı önbelleğe alır           | `visibleTodos` örneği        |
|                              | `useCallback`                                     | Fonksiyon tanımını önbelleğe alır           | Child re-render azaltır      |
| **Diğer / Kütüphaneye Özgü** | `useParams`, `useNavigate`, `useQuery`, `useForm` | Router, Query, Form işleme                  | Harici paketlerin hook'ları  |
| **Custom Hooks**             | `useTodos`, `useAuth`                             | Özel tekrar eden mantıkları ayırır          | Kod okunabilirliğini artırır |

---

# 3. 🔄 Bilgi Geçişi

## 3.1 Props — Doğrudan Bilgi Aktarımı

Alt bileşene veri taşımak için kullanılır.

```jsx
<UserCard name="Ece" age={4} />
```

## 3.2 Context — Global Bilgi Aktarımı

Prop zinciri olmadan veri paylaşımı.

```jsx
const theme = useContext(ThemeContext);
```

---

# 4. ⚡ Arrow Fonksiyonlar (=>)

React projelerinde en çok kullanılan fonksiyon tipidir.

## 📋 Arrow Function Özeti

| Kullanım         | Örnek                           | Açıklama                           |
| ---------------- | ------------------------------- | ---------------------------------- |
| Temel tanım      | `const f = () => {}`            | Kısa yazım                         |
| Tek satır return | `const f = () => 5;`            | return yazmaya gerek yok           |
| Parametreli      | `x => x * x`                    | Tek parametrede parantez opsiyonel |
| Çok işlemli      | `() => { ... }`                 | Süslü + return                     |
| React event      | `onClick={() => setAge(age+1)}` | Tıklamada çalıştırmak için         |
| this kullanımı   | Sabit this                      | Bağlam problemi yok                |

---

# 5. 🧠 Özet Tablo

## 🟩 React Hook’ları Ne Zaman Kullanıyoruz?

| Durum                                                               | Çözüm             | Hook          |
| ------------------------------------------------------------------- | ----------------- | ------------- |
| Kullanıcı bir değeri değiştirdikçe UI güncellensin                  | State tut         | `useState`    |
| Üst bileşenden veri çekmek istiyorum ama prop göndermek istemiyorum | Context           | `useContext`  |
| Bir DOM elementine veya animasyon değerine erişmem lazım            | Referans          | `useRef`      |
| API isteği, timeout, event listener ekleyeceğim                     | Etki              | `useEffect`   |
| Pahalı bir hesaplamayı tekrar tekrar yapmak istemiyorum             | Memoize et        | `useMemo`     |
| Child’a gönderdiğim fonksiyon yüzünden gereksiz render olmasın      | Referansı sabitle | `useCallback` |
| Tekrarlayan iş mantığını ayırmak istiyorum                          | Özel hook yaz     | Custom Hook   |

---

# 6. 💻 Örnek Kodlar

## 🎯 useMemo ile Liste Filtreleme

```js
const visibleTodos = useMemo(() => {
  return todos.filter(todo => {
    if (tab === "completed") return todo.completed;
    if (tab === "active") return !todo.completed;
    return true;
  });
}, [todos, tab]);
```

## 🎯 useRef ile DOM Erişimi

```jsx
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current.focus();
}, []);
```

---