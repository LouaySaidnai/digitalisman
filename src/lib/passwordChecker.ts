// Liste d'exemple, à compléter avec ta vraie liste
const commonPasswords: string[] = [
  "123456", "password", "123456789", "qwerty", "abc123", // ...
];

export function checkPasswordStrength(password: string): number {
  let score = 0;
  let x = 0;
  if (/[A-Z]/.test(password)) { score += 1; x += 1; }
  if (/[a-z]/.test(password)) { score += 1; x += 1; }
  if (/\d/.test(password))    { score += 1; x += 1; }
  if (/[^A-Za-z0-9]/.test(password)) { score += 1; x += 1; }
  if (x < 4) return score;
  if (password.length >= 8)  score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (password.length >= 20) score += 1;
  return score;
}

export function isPasswordCommon(password: string, username: string, birthdate: string, commonPasswords: string[]): boolean {
  // birthdate format attendu: "YYYY" ou "YYYYMMDD" ou autre, à adapter selon ton app
  const birthYear = birthdate.slice(0, 4);
  return (
    commonPasswords.includes(password) ||
    password === username + birthYear ||
    password === username + birthdate
  );
}

export function getPasswordFeedback(password: string, username: string, birthdate: string, commonPasswords: string[]): string {
  if (isPasswordCommon(password, username, birthdate, commonPasswords)) {
    return "Mot de passe trop commun ou basé sur des infos personnelles.";
  }
  const score = checkPasswordStrength(password);
  if (score === 0) return "Mot de passe trop faible. Il doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.";
  if (score <= 2) return "Mot de passe faible.";
  if (score <= 4) return "Mot de passe moyen.";
  if (score <= 6) return "Mot de passe fort.";
  return "Mot de passe extrêmement fort.";
} 