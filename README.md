# 🔐 Secure Form – The Registration Manager

**Secure Form** is a modern, secure, and intuitive registration application that validates user details in real-time. With dynamic field validation, password visibility toggling, country-city cascading selects, and persistent navigation, it ensures a seamless onboarding experience.

---

## 🚀 Live Demo

👉 [Try the App Live](https://secure-form-two.vercel.app/)

---

## 📦 GitHub Repository

[https://github.com/sumit-616/secure-form](https://github.com/sumit-616/secure-form)

---

## ✨ Features

- **Real-Time Validation:** Every field is validated on the fly—no third-party form libraries used.  
- **Required Fields:**  
  - First Name & Last Name (letters only)  
  - Username (4-15 chars, alphanumeric + underscore)  
  - Email (RFC-5322-compliant)  
  - Password (≥ 8 chars, 1 uppercase, 1 lowercase, 1 digit) with **show/hide** toggle  
  - Phone Number split into **Country Code + 10-digit number**  
  - Country & City (dynamic dropdown; city list updates automatically)  
  - PAN Number (`ABCDE1234F` format)  
  - Aadhaar Number (12 digits)
- **Disabled Submit:** Button stays disabled until all fields are valid.  
- **Instant Error Messages:** Inline, accessible feedback under each field.  
- **Summary Page:** After successful submission, users are routed to `/summary` where all details are displayed read-only.  
- **Responsive Dark Theme:** Clean Tailwind CSS UI that adapts to any device.  
- **Zero Dependencies:** Built entirely with native React hooks—no Formik, Yup, or React-Hook-Form.

---

## 🛠️ Tech Stack

- **React 18** – Front-end framework  
- **React Router v6** – Client-side routing  
- **Tailwind CSS** – Utility-first styling  
- **Vite** – Lightning-fast build tool

---

## 📥 Installation

To run the app locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sumit-616/secure-form.git
   cd secure-form
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at **http://localhost:5173**.

---

## 📝 How to Use

- **Fill in Your Details:**  
  Enter data into each field. Errors appear instantly if a value is invalid or missing.

- **Toggle Password Visibility:**  
  Click the eye icon to show or hide your password.

- **Submit:**  
  The **Register** button becomes active only when every field is valid. Click it to proceed.

- **View Summary:**  
  After submission, you’re redirected to a summary page that displays all your entered information in a read-only card layout.

---

### Key Components & Hooks

| File / Hook        | Responsibility                                   |
|--------------------|---------------------------------------------------|
| `Form.jsx`         | Main form UI and local state                      |
| `Summary.jsx`      | Displays submitted data after navigation          |
| `InputField.jsx`   | Reusable controlled input component               |
| `Dropdown.jsx`     | Reusable select component for Country / City      |
| `useForm.js`       | Custom hook containing validation logic           |
| `countries.js`     | Static country → city mapping data                |

---

## 🤝 Contributing

1. **Fork** the repository  
2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-username/secure-form.git
   ```
3. **Create** a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Commit** your changes:
   ```bash
   git commit -m "Describe your changes"
   ```
5. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open** a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙌 Author

Built with ❤️ by [Sumit Kumar](https://github.com/sumit-616)
