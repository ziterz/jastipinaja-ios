export const API_URL = 'https://api.jastipinaja.co.id';
export const INVOICE_URL = 'https://jastipinaja.co.id/#/invoice/';
// export const API_URL = 'http://localhost:6001';
export function convertToRupiah(angka) {
  let rupiah = '';
  const angkarev = `${angka}`.split('').reverse().join('');
  for (let i = 0; i < angkarev.length; i++)
    if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.';

  return (
    'Rp ' +
    rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('')
  );
}
