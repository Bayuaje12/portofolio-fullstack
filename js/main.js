// Penanganan tema, validasi form, dan interaktivitas simulasi API

(function () {
  'use strict';

  // Inisialisasi tahun aktif pada footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  // Pengalih tema dengan penyimpanan preferensi di localStorage
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeStatusText = document.getElementById('theme-status-text');
  const htmlRoot = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlRoot.setAttribute('data-theme', 'dark');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-pressed', 'true');
        themeToggleBtn.setAttribute('aria-label', 'Ganti ke tema terang');
      }
      if (themeStatusText) {
        themeStatusText.textContent = 'Mode Terang';
      }
    } else {
      htmlRoot.removeAttribute('data-theme');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-pressed', 'false');
        themeToggleBtn.setAttribute('aria-label', 'Ganti ke tema gelap');
      }
      if (themeStatusText) {
        themeStatusText.textContent = 'Mode Gelap';
      }
    }
  }

  // Deteksi preferensi tersimpan atau preferensi sistem operasi
  const savedTheme = localStorage.getItem('theme-preference');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const isCurrentlyDark = htmlRoot.getAttribute('data-theme') === 'dark';
      const targetTheme = isCurrentlyDark ? 'light' : 'dark';
      applyTheme(targetTheme);
      localStorage.setItem('theme-preference', targetTheme);
    });
  }

  // Sinkronisasi status aktif tautan navigasi saat halaman digulir
  const navLinks = document.querySelectorAll('.nav-link');
  const trackedSections = document.querySelectorAll('main section[id]');

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;

    trackedSections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(function (link) {
          if (link.getAttribute('href') === '#' + id) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // Simulasi respons API logistik
  const demoToggleBtn = document.querySelector('[data-demo="logistiq"]');
  const demoContainer = document.getElementById('demo-logistiq');
  const demoCloseBtn = document.querySelector('[data-close="logistiq"]');
  const codeOutput = document.getElementById('code-output-logistiq');
  const sampleReqBtns = document.querySelectorAll('.btn-sample-req');

  const mockApiResponses = {
    'manifest-success': {
      status: 200,
      statusText: 'OK',
      payload: {
        success: true,
        data: {
          manifestId: 'MNF-2025-0819',
          originWarehouse: 'Hub Jakarta Barat (CGK-01)',
          destinationHub: 'Bandung Distribusi (BDO-02)',
          totalPackages: 142,
          departureSchedule: '2025-10-24T03:30:00.000Z',
          dispatchedPackages: [
            { trackingNumber: 'LOG-8812901', weightKg: 1.4, status: 'IN_TRANSIT' },
            { trackingNumber: 'LOG-8812902', weightKg: 0.8, status: 'IN_TRANSIT' }
          ]
        },
        meta: {
          executionTimeMs: 14.2,
          cacheHit: true
        }
      }
    },
    'manifest-empty': {
      status: 200,
      statusText: 'OK',
      payload: {
        success: true,
        data: {
          manifestId: 'MNF-2025-0820',
          originWarehouse: 'Hub Surabaya (SUB-01)',
          destinationHub: 'Malang Sentral (MLG-01)',
          totalPackages: 0,
          dispatchedPackages: []
        },
        message: 'Tidak ada paket terjadwal pada manifes ini.',
        meta: {
          executionTimeMs: 9.8,
          cacheHit: false
        }
      }
    },
    'manifest-error': {
      status: 422,
      statusText: 'Unprocessable Entity',
      payload: {
        success: false,
        error: {
          code: 'VALIDATION_FAILED',
          message: 'Payload data paket tidak memenuhi syarat skema validasi Zod.',
          details: [
            { field: 'recipientPhone', issue: 'Nomor telepon wajib menggunakan format E.164 (+62...)' },
            { field: 'weightKg', issue: 'Berat paket minimal bernilai 0.1 kg' }
          ]
        },
        timestamp: '2025-10-24T04:12:08.102Z'
      }
    }
  };

  if (demoToggleBtn && demoContainer) {
    demoToggleBtn.addEventListener('click', function () {
      const isHidden = demoContainer.hidden;
      demoContainer.hidden = !isHidden;
      demoToggleBtn.setAttribute('aria-expanded', String(isHidden));
      if (!isHidden) {
        demoToggleBtn.focus();
      } else {
        const firstBtn = demoContainer.querySelector('.btn-sample-req');
        if (firstBtn) firstBtn.focus();
      }
    });
  }

  if (demoCloseBtn && demoContainer) {
    demoCloseBtn.addEventListener('click', function () {
      demoContainer.hidden = true;
      if (demoToggleBtn) {
        demoToggleBtn.setAttribute('aria-expanded', 'false');
        demoToggleBtn.focus();
      }
    });
  }

  sampleReqBtns.forEach(function (button) {
    button.addEventListener('click', function () {
      const endpointKey = button.getAttribute('data-endpoint');
      const responseData = mockApiResponses[endpointKey];
      if (responseData && codeOutput) {
        const formatted = '// Status HTTP: ' + responseData.status + ' ' + responseData.statusText + '\n' +
          JSON.stringify(responseData.payload, null, 2);
        codeOutput.textContent = formatted;
      }
    });
  });

  // Logika kalkulator kasir interaktif
  const calcToggleBtn = document.querySelector('[data-calculator="toggle"]');
  const calcBox = document.getElementById('calculator-box');
  const calcCloseBtn = document.querySelector('[data-close="calc"]');
  const calcForm = document.getElementById('calc-form');
  const subtotalInput = document.getElementById('subtotal-input');
  const memberSelect = document.getElementById('member-select');
  const calcResultDisplay = document.getElementById('calc-result-display');

  if (calcToggleBtn && calcBox) {
    calcToggleBtn.addEventListener('click', function () {
      const isHidden = calcBox.hidden;
      calcBox.hidden = !isHidden;
      calcToggleBtn.setAttribute('aria-expanded', String(isHidden));
      if (!isHidden) {
        calcToggleBtn.focus();
      } else if (subtotalInput) {
        subtotalInput.focus();
      }
    });
  }

  if (calcCloseBtn && calcBox) {
    calcCloseBtn.addEventListener('click', function () {
      calcBox.hidden = true;
      if (calcToggleBtn) {
        calcToggleBtn.setAttribute('aria-expanded', 'false');
        calcToggleBtn.focus();
      }
    });
  }

  function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
  }

  if (calcForm) {
    calcForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const rawSubtotal = parseFloat(subtotalInput.value) || 0;
      const memberType = memberSelect.value;

      let discountRate = 0;
      let discountLabel = '0%';

      if (memberType === 'member') {
        discountRate = 0.05;
        discountLabel = '5%';
      } else if (memberType === 'vip') {
        discountRate = 0.10;
        discountLabel = '10%';
      }

      const discountAmount = rawSubtotal * discountRate;
      const finalTotal = Math.max(0, rawSubtotal - discountAmount);

      calcResultDisplay.innerHTML = '<p class="calc-summary">Total Akhir: <strong>' +
        formatRupiah(finalTotal) + '</strong> (Diskon ' + discountLabel + ': ' +
        formatRupiah(discountAmount) + ')</p>';
    });
  }

  // Validasi dan penanganan pengiriman formulir kontak
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const feedbackBanner = document.getElementById('contact-feedback');
  const submitButton = document.getElementById('btn-submit-contact');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    [nameInput, emailInput, messageInput].forEach(function (field) {
      if (field) field.classList.remove('has-error');
    });
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (messageError) messageError.textContent = '';
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      clearErrors();

      let hasError = false;

      // Validasi nama
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Nama lengkap wajib diisi.';
        nameInput.classList.add('has-error');
        hasError = true;
      }

      // Validasi email
      const emailVal = emailInput.value.trim();
      if (!emailVal) {
        emailError.textContent = 'Alamat email wajib diisi.';
        emailInput.classList.add('has-error');
        hasError = true;
      } else if (!validateEmail(emailVal)) {
        emailError.textContent = 'Format alamat email tidak valid (contoh: nama@domain.com).';
        emailInput.classList.add('has-error');
        hasError = true;
      }

      // Validasi pesan
      const messageVal = messageInput.value.trim();
      if (!messageVal) {
        messageError.textContent = 'Deskripsi pesan proyek wajib diisi.';
        messageInput.classList.add('has-error');
        hasError = true;
      } else if (messageVal.length < 15) {
        messageError.textContent = 'Pesan terlalu singkat (tuliskan minimal 15 karakter).';
        messageInput.classList.add('has-error');
        hasError = true;
      }

      if (hasError) {
        return;
      }

      // Tampilkan status proses kirim
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Memproses Pengiriman...';
      }

      // Simulasi pengiriman data lokal yang berhasil
      setTimeout(function () {
        contactForm.reset();
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Kirimkan Pesan Anda';
        }

        if (feedbackBanner) {
          feedbackBanner.hidden = false;
          feedbackBanner.textContent = 'Terima kasih, pesan Anda telah tersimpan secara lokal dan tercatat. Bayu akan merespons melalui email yang Anda cantumkan dalam 1x24 jam kerja.';
          feedbackBanner.focus();
        }
      }, 600);
    });
  }

  // Dukungan tombol Escape untuk menutup container simulasi aktif
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (demoContainer && !demoContainer.hidden) {
        demoContainer.hidden = true;
        if (demoToggleBtn) {
          demoToggleBtn.setAttribute('aria-expanded', 'false');
          demoToggleBtn.focus();
        }
      }
      if (calcBox && !calcBox.hidden) {
        calcBox.hidden = true;
        if (calcToggleBtn) {
          calcToggleBtn.setAttribute('aria-expanded', 'false');
          calcToggleBtn.focus();
        }
      }
    }
  });

})();
