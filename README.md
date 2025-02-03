# CheckMate 📸💰

[![React Native](https://img.shields.io/badge/React%20Native-0.73-blue)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-50.0.0-blue)](https://expo.dev/)

> **CheckMate** helps you effortlessly split bills from **receipt images**. Simply take a picture, and AI will extract the details, calculate totals, and let you share the costs with friends!

<!-- --- -->

<!-- ## **📸 Demo** -->
<!-- Add a gif or image showcasing the app -->
<!-- \![CheckMate Demo](https://your-image-url.gif) -->

---

## **🚀 Features**

✅ **Snap a Receipt** – Take a photo and extract the bill details automatically.  
✅ **Gallery Upload** – Pick a receipt from your photo library.  
✅ **AI-Powered Extraction** – Uses **GPT-4o Vision** for accurate text recognition.  
✅ **Auto Tax & Tip Calculation** – Splits your bill fairly.  
✅ **Split Options** – Even split or assign items manually.  
✅ **Secure & Private** – No data is stored, only processed locally and via OpenAI.

---

## **📲 Installation**

### **1️⃣ Clone the Repo**

```sh
git clone https://github.com/your-username/CheckMate.git
cd CheckMate
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

or with Yarn:

```sh
yarn install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the root directory and add:

```ini
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key
```

> 🔥 **DO NOT** share your API key publicly! Use a `.gitignore` file to exclude `.env` from commits.

### **4️⃣ Start the App**

For iOS:

```sh
npx expo start --ios
```

For Android:

```sh
npx expo start --android
```

For Web:

```sh
npx expo start
```

---

## **🛠️ Tech Stack**

- **Frontend:** React Native (Expo, TypeScript)
- **State Management:** React Hooks
- **Navigation:** Expo Router
- **Image Processing:** `expo-image-picker`, `expo-image-manipulator`
- **AI Processing:** OpenAI GPT-4o Vision API
- **UI Components:** React Native UI Kit, react-native-magnus

---

## **🧠 AI Receipt Extraction**

We use **OpenAI's GPT-4o Vision API** to analyze receipt images and extract structured data.

### **AI API Request Example**

```json
{
  "model": "gpt-4o",
  "messages": [
    {
      "role": "system",
      "content": "Extract structured receipt details. Return JSON only."
    },
    {
      "role": "user",
      "content": [
        { "type": "text", "text": "Extract receipt details from this image." },
        {
          "type": "image_url",
          "image_url": { "url": "data:image/jpeg;base64,..." }
        }
      ]
    }
  ],
  "max_tokens": 500
}
```

### **Expected AI Response**

```json
{
  "store": { "name": "Starbucks", "address": "123 Main St", "phone": null },
  "transaction": {
    "date": "2024-02-01",
    "time": "14:30",
    "paymentMethod": "Visa"
  },
  "items": [{ "name": "Latte", "price": 5.5, "quantity": 1, "discount": 0.5 }],
  "subtotal": 5.0,
  "tax": 0.4,
  "total": 5.4,
  "currency": "USD"
}
```

---

## **🚧 Roadmap**

- [x] **Capture Receipts via Camera**
- [x] **Extract Items & Costs Using AI**
- [ ] **Evenly Split Bills**
- [ ] **Custom Item Selection for Each Person**
- [ ] **Payment Integration (Zelle, Venmo)**
- [ ] **Dark Mode Support**
- [ ] **Multi-Language Support**

---

## **🌟 Acknowledgments**

Big thanks to:

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [OpenAI](https://platform.openai.com/)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
