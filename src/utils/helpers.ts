export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormatter('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const generatePDFContent = (formData: Record<string, any>): string => {
  const { firstName, lastName, username, email, phoneNumber, country, city, panNumber, aadharNumber } = formData;
  
  return `
    User Information
    ------------------------
    Name: ${firstName} ${lastName}
    Username: ${username}
    Email: ${email}
    Phone: ${formData.countryCode} ${phoneNumber}
    Location: ${city}, ${country}
    PAN Number: ${panNumber}
    Aadhar Number: ${aadharNumber}
    ------------------------
    Generated on: ${new Date().toLocaleString()}
  `;
};

export const saveFormToLocalStorage = (formData: Record<string, any>): void => {
  try {
    localStorage.setItem('formData', JSON.stringify({
      ...formData,
      lastSaved: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error saving form data to localStorage:', error);
  }
};

export const loadFormFromLocalStorage = (): Record<string, any> | null => {
  try {
    const data = localStorage.getItem('formData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading form data from localStorage:', error);
    return null;
  }
};

export const detectUserCountry = (): string => {
  const countries = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia'];
  return countries[Math.floor(Math.random() * countries.length)];
};

export const convertToCSV = (formData: Record<string, any>): string => {
  const headers = Object.keys(formData).filter(key => key !== 'lastSaved' && key !== 'formStep');
  const headerRow = headers.join(',');
  const dataRow = headers.map(header => `"${formData[header] || ''}"`).join(',');
  
  return `${headerRow}\n${dataRow}`;
};

export const downloadFile = (data: string, filename: string, type: string): void => {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const getPreferredTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  
  if (savedTheme) {
    return savedTheme;
  }
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
};