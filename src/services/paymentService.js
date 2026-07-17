const STORAGE_KEY = "payments";

const defaultPayments = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    apartment: "A-12",
    amount: 500,
    date: "20.07.2026",
  },
  {
    id: 2,
    name: "Ayşe Demir",
    apartment: "B-08",
    amount: 500,
    date: "19.07.2026",
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    apartment: "C-15",
    amount: 500,
    date: "18.07.2026",
  },
];

export function getPayments() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPayments));
    return defaultPayments;
  }

  return JSON.parse(data);
}

export function savePayments(payments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
}
