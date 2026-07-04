export const buildWhatsappUrl = (text: string) => {
  const base = `https://wa.me/`;
  return `${base}?text=${encodeURIComponent(text)}`;
};
