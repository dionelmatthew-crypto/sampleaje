const userIdInput = document.querySelector('#userId');
const nominalSelect = document.querySelector('#nominal');
const form = document.querySelector('#topupForm');
const formMessage = document.querySelector('#formMessage');
const priceRows = document.querySelectorAll('.price-row');
const dismissAlert = document.querySelector('#dismissAlert');
const alertCard = document.querySelector('.alert-card');

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID').format(Number(value));
}

function showMessage(message, type = 'error') {
  formMessage.textContent = message;
  formMessage.classList.toggle('success', type === 'success');
}

function selectNominal(nominal) {
  nominalSelect.value = nominal;
  priceRows.forEach((row) => {
    row.classList.toggle('selected', row.dataset.nominal === nominal);
  });
  formMessage.textContent = '';
}

priceRows.forEach((row) => {
  row.addEventListener('click', () => selectNominal(row.dataset.nominal));
});

nominalSelect.addEventListener('change', () => selectNominal(nominalSelect.value));

userIdInput.addEventListener('input', () => {
  // Hapus pesan lama ketika pengguna mulai memperbaiki input.
  formMessage.textContent = '';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const userId = userIdInput.value.trim();
  const selectedOption = nominalSelect.selectedOptions[0];
  const nominal = selectedOption.value;
  const price = selectedOption.dataset.price;

  if (!userId) {
    showMessage('User ID wajib diisi.');
    userIdInput.focus();
    return;
  }

  if (!/^\d+$/.test(userId)) {
    showMessage('User ID hanya boleh berisi angka!');
    userIdInput.focus();
    return;
  }

  showMessage(
    `Validasi berhasil. ${nominal} Diamond untuk User ID ${userId}, total Rp ${formatRupiah(price)}. Ini hanya simulasi, pembayaran belum dilakukan.`,
    'success'
  );
});

dismissAlert.addEventListener('click', () => {
  alertCard.style.display = 'none';
});

// Tandai nominal 172 Diamond sebagai pilihan awal.
selectNominal(nominalSelect.value);
