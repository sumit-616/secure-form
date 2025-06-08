# 🔐 Secure Form – React Form with Validation

A React 18 form built without third-party libraries, featuring full client-side validation and real-time error handling. The form prevents submission until all fields are correctly filled and displays submitted user details on a new route (/summary).

## 🔗 Live Demo

- Deployed URL: https://secure-form-two.vercel.app  
- GitHub Repo: https://github.com/sumit-616/secure-form

## 📌 Features

- Built with React 18 and React Router v6  
- No third-party form libraries (e.g., Formik, Yup)  
- Custom real-time field-level validation  
- Displays inline error messages  
- Submit button disabled until form is valid  
- Show/Hide password toggle  
- Country and City dropdowns (dynamic)  
- Phone number input with country code  
- Redirects to summary page with all details on successful submission  

## 🧾 Fields & Validation Rules

| Field           | Validation Rules                                                   |
|----------------|---------------------------------------------------------------------|
| First Name      | Required, alphabets only                                           |
| Last Name       | Required, alphabets only                                           |
| Username        | Required, 4–15 characters, alphanumeric and underscore only        |
| Email           | Required, must be in valid email format                            |
| Password        | Required, min 8 chars, includes uppercase, lowercase, and number   |
| Phone Number    | Required, must include country code (+xx) and 10-digit number      |
| Country         | Required, selected from dropdown                                   |
| City            | Required, populated dynamically based on selected country          |
| PAN Number      | Required, format: 5 letters + 4 digits + 1 letter (ABCDE1234F)      |
| Aadhaar Number  | Required, exactly 12 digits                                        |

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Form.jsx
│   ├── Summary.jsx
│   ├── InputField.jsx
│   └── Dropdown.jsx
├── data/
│   └── countries.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🚀 Getting Started

1. Clone the repository  
   `git clone https://github.com/sumit-616/secure-form.git`

2. Navigate to the project folder  
   `cd secure-form`

3. Install dependencies  
   `npm install`

4. Start the development server  
   `npm run dev`

5. Visit `http://localhost:5173` in your browser

## 🧠 How It Works

- All form values and errors are managed using React `useState`.  
- Each input triggers validation on change and blur events.  
- Validation results are stored in a corresponding `errors` object.  
- The submit button is disabled if any error exists or any required field is empty.  
- Password visibility can be toggled using a button.  
- City dropdown options update based on selected country.  
- Phone number input is split into country code and phone number fields.  
- Upon successful form submission, the app navigates to the `/summary` route and displays all the entered data.

## 🛠️ Built With

- React 18  
- React Router DOM v6  
- Vite  
- Tailwind CSS
