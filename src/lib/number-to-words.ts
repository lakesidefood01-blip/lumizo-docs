const ones = [
  "",
  "Satu",
  "Dua",
  "Tiga",
  "Empat",
  "Lima",
  "Enam",
  "Tujuh",
  "Delapan",
  "Sembilan",
  "Sepuluh",
  "Sebelas",
];

function convertGroup(n: number): string {
  if (n === 0) return "";

  let result = "";

  if (n >= 100) {
    const hundreds = Math.floor(n / 100);
    result += (hundreds === 1 ? "Se" : ones[hundreds] + " ") + "Ratus ";
    n %= 100;
  }

  if (n >= 20) {
    const tens = Math.floor(n / 10);
    result += ones[tens] + " Puluh ";
    n %= 10;
  } else if (n >= 12) {
    const tens = Math.floor(n / 10);
    result += ones[tens] + " Belas ";
    n %= 10;
  } else if (n >= 10) {
    result += "Sepuluh ";
    n = 0;
  } else if (n === 10) {
    result += "Sepuluh ";
    n = 0;
  }

  if (n > 0 && n < 12) {
    result += ones[n] + " ";
  }

  return result.trim();
}

export function numberToWords(num: number): string {
  if (num === 0) return "Nol";

  const billions = Math.floor(num / 1000000000);
  num %= 1000000000;
  const millions = Math.floor(num / 1000000);
  num %= 1000000;
  const thousands = Math.floor(num / 1000);
  num %= 1000;
  const remaining = num;

  let result = "";

  if (billions > 0) {
    result += convertGroup(billions) + " Miliar ";
  }
  if (millions > 0) {
    result += convertGroup(millions) + " Juta ";
  }
  if (thousands > 0) {
    result += convertGroup(thousands) + " Ribu ";
  }
  if (remaining > 0) {
    result += convertGroup(remaining);
  }

  return result.trim() + " Rupiah";
}
