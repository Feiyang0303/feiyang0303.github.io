export const CONTACT_EMAIL = 'feiyangxuca@gmail.com';

export const buildMailtoLink = (name: string, email: string, message: string) => {
  const subject = `Contact from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
