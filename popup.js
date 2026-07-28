document.addEventListener('DOMContentLoaded', () => {
  // Element References
  const passwordOutput = document.getElementById('passwordOutput');
  const copyBtn = document.getElementById('copyBtn');
  const lengthSlider = document.getElementById('lengthSlider');
  const lengthValue = document.getElementById('lengthValue');
  const includeUppercase = document.getElementById('includeUppercase');
  const includeLowercase = document.getElementById('includeLowercase');
  const includeNumbers = document.getElementById('includeNumbers');
  const includeSymbols = document.getElementById('includeSymbols');
  const generateBtn = document.getElementById('generateBtn');
  const strengthText = document.getElementById('strengthText');
  const strengthBar = document.getElementById('strengthBar');
  const statusMessage = document.getElementById('statusMessage');

  const CHAR_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%&?',
  };

  // Restore saved preferences using chrome.storage API
  if (chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['pwdSettings'], (result) => {
      if (result.pwdSettings) {
        const s = result.pwdSettings;
        lengthSlider.value = s.length || 12;
        includeUppercase.checked = s.uppercase ?? true;
        includeLowercase.checked = s.lowercase ?? true;
        includeNumbers.checked = s.numbers ?? true;
        includeSymbols.checked = s.symbols ?? true;      }
      updateLengthDisplay();
      generatePassword();
    });
  } else {
    generatePassword();
  }

  // Event Handlers
  lengthSlider.addEventListener('input', () => {
    updateLengthDisplay();
    generatePassword();
    saveSettings();
  });

  [includeUppercase, includeLowercase, includeNumbers, includeSymbols].forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      generatePassword();
      saveSettings();
    });
  });

  generateBtn.addEventListener('click', generatePassword);
  copyBtn.addEventListener('click', copyToClipboard);

  function updateLengthDisplay() {
    lengthValue.textContent = lengthSlider.value;
  }

  function saveSettings() {
    if (chrome.storage && chrome.storage.local) {
      const settings = {
        length: lengthSlider.value,
        uppercase: includeUppercase.checked,
        lowercase: includeLowercase.checked,
        numbers: includeNumbers.checked,
        symbols: includeSymbols.checked,      };
      chrome.storage.local.set({ pwdSettings: settings });
    }
  }

  function generatePassword() {
    let pool = '';
    if (includeUppercase.checked) pool += CHAR_SETS.uppercase;
    if (includeLowercase.checked) pool += CHAR_SETS.lowercase;
    if (includeNumbers.checked) pool += CHAR_SETS.numbers;
    if (includeSymbols.checked) pool += CHAR_SETS.symbols;


    if (!pool) {
      passwordOutput.value = '';
      updateStrength(0);
      showStatus('Select at least one character set!', true);
      return;
    }

    const length = parseInt(lengthSlider.value, 10);
    let password = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      password += pool[array[i] % pool.length];
    }

    passwordOutput.value = password;
    calculateStrength(password, length);
    showStatus('');
  }

  function calculateStrength(pwd, len) {
    let score = 0;
    if (len >= 12) score += 2;
    else if (len >= 8) score += 1;

    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    updateStrength(score);
  }

  function updateStrength(score) {
    let label = 'Weak';
    let color = 'var(--strength-weak)';
    let percent = '33%';

    if (score >= 5) {
      label = 'Strong';
      color = 'var(--strength-strong)';
      percent = '100%';
    } else if (score >= 3) {
      label = 'Medium';
      color = 'var(--strength-medium)';
      percent = '66%';
    } else if (score === 0) {
      label = 'None';
      color = 'var(--border-color)';
      percent = '0%';
    }

    strengthText.textContent = label;
    strengthText.style.color = color === 'var(--border-color)' ? 'var(--text-muted)' : color;
    strengthBar.style.width = percent;
    strengthBar.style.backgroundColor = color;
  }

  async function copyToClipboard() {
    if (!passwordOutput.value) return;

    try {
      await navigator.clipboard.writeText(passwordOutput.value);
      showStatus('Copied to clipboard!');
    } catch (err) {
      showStatus('Failed to copy', true);
    }
  }

  function showStatus(msg, isError = false) {
    statusMessage.textContent = msg;
    statusMessage.style.color = isError ? 'var(--strength-weak)' : 'var(--primary)';
    if (msg && !isError) {
      setTimeout(() => {
        if (statusMessage.textContent === msg) {
          statusMessage.textContent = '';
        }
      }, 2000);
    }
  }
});