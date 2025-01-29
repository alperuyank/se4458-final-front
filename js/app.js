// Modal elementlerini alıyoruz
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');

// Butonları alıyoruz
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');

// Kapatma butonları
const closeLogin = document.getElementById('closeLogin');
const closeRegister = document.getElementById('closeRegister');

// Modal açma işlemleri
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex'; // Modal'ı açıyoruz
});

registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'flex'; // Modal'ı açıyoruz
});

// Modal kapatma işlemleri
closeLogin.addEventListener('click', () => {
    loginModal.style.display = 'none'; // Modal'ı kapatıyoruz
});

closeRegister.addEventListener('click', () => {
    registerModal.style.display = 'none'; // Modal'ı kapatıyoruz
});

// Modal dışına tıklanarak kapanma işlemleri
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    let token = localStorage.getItem('authToken');

    if (token) {
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('registerBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';
    }
});

// Çıkış Yapma İşlemi
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('authToken'); // Token’i temizle
    alert("Çıkış yaptınız.");
    location.reload(); // Sayfayı yenile
});

// Giriş yapma işlemi
document.getElementById('loginSubmit').addEventListener('click', async () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const loginData = {
        username: username,
        password: password
    };

    try {
        const response = await fetch('https://se4458-final.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();
        if (response.ok) {
            alert('Giriş başarılı! Token: ' + data.token);
            localStorage.setItem('authToken', data.token); // Token’i localStorage’a kaydet
            loginModal.style.display = 'none'; // Modal'ı kapatıyoruz
        } else {
            alert('Hata: ' + data.message);
        }
    } catch (error) {
        console.error('Hata:', error);
        alert('Bir hata oluştu.');
    }
});

// Kayıt olma işlemi
document.getElementById('registerSubmit').addEventListener('click', async () => {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole').value;

    const registerData = {
        username: username,
        password: password,
        role: role
    };

    try {
        const response = await fetch('https://se4458-final.onrender.com/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        const data = await response.json();
        if (response.ok) {
            alert('Kayıt başarılı! Hoş geldiniz!');
            registerModal.style.display = 'none'; // Modal'ı kapatıyoruz
        } else {
            alert('Hata: ' + data.message);
        }
    } catch (error) {
        console.error('Hata:', error);
        alert('Bir hata oluştu.');
    }
});
