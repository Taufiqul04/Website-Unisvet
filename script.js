document.addEventListener('DOMContentLoaded', function() {

    // --- ELEMEN DOM ---
    const loginSection = document.getElementById('login-section');
    const absensiSection = document.getElementById('absensi-section');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    
    const studentNameEl = document.getElementById('student-name');
    const studentNimEl = document.getElementById('student-nim');
    const courseListEl = document.getElementById('course-list');

    // --- SIMULASI DATABASE ---
    // Di aplikasi nyata, data ini akan datang dari server/database
    const studentsDB = {
        "3322110016": { 
            password: "040703", 
            name: "Muhammad Taufiqul Aziz", 
            courses: [
                { code: "TIF201", name: "Pemrograman Dasar", time: "08:00 - 09:40", lecturer: "Dr. Ir. H. Setyo Purnomo, M.Pd" },
                { code: "TIF203", name: "Jaringan Komputer", time: "10:00 - 11:40", lecturer: "Andi, S.Kom., M.Cs" },
                { code: "MKU101", name: "Pendidikan Kewarganegaraan", time: "13:00 - 14:40", lecturer: "Dra. Siti Aminah, M.Hum" }
            ] 
        },
        "3322110013": { 
            password: "311004", 
            name: "Alfonsius Joifan Sar",
            courses: [
                { code: "PBI102", name: "Jaringan Komputer", time: "08:00 - 09:40", lecturer: "Lingga Kurnia Dhani, M.Kom" },
                { code: "PBI105", name: "Pemrograman Dasar", time: "10:00 - 11:40", lecturer: "Dr. Maria, S.S., M.Pd" }
            ]
        }

    };

    // --- EVENT LISTENER UNTUK LOGIN ---
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form mengirim data dan me-refresh halaman
        
        const nim = document.getElementById('nim').value;
        const password = document.getElementById('password').value;
        
        loginError.textContent = ''; // Kosongkan pesan error

        // Cek kredensial di 'database'
        const user = studentsDB[nim];

        if (user && user.password === password) {
            // Login Berhasil
            showAbsensiPanel(user, nim);
        } else {
            // Login Gagal
            loginError.textContent = 'NIM atau Password salah. Silakan coba lagi.';
        }
    });

    // --- FUNGSI UNTUK MENAMPILKAN PANEL ABSENSI ---
    function showAbsensiPanel(user, nim) {
        // Sembunyikan form login, tampilkan panel absensi
        loginSection.classList.add('hidden');
        absensiSection.classList.remove('hidden');

        // Tampilkan informasi mahasiswa
        studentNameEl.textContent = user.name;
        studentNimEl.textContent = nim;

        // Kosongkan daftar mata kuliah sebelumnya
        courseListEl.innerHTML = '';

        // Generate daftar mata kuliah
        user.courses.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.className = 'course-item';
            
            courseItem.innerHTML = `
                <div class="course-details">
                    <h5>${course.name} (${course.code})</h5>
                    <p>Pukul: ${course.time} | Dosen: ${course.lecturer}</p>
                </div>
                <div class="course-action">
                    <p class="status">Belum Absen</p>
                    <button class="absen-btn" data-code="${course.code}">Hadir</button>
                </div>
            `;
            courseListEl.appendChild(courseItem);
        });
    }

    // --- EVENT LISTENER UNTUK TOMBOL HADIR (delegasi event) ---
    courseListEl.addEventListener('click', function(event) {
        if (event.target.classList.contains('absen-btn')) {
            const button = event.target;
            const courseItem = button.closest('.course-item');
            const statusEl = courseItem.querySelector('.status');
            
            // Ubah tampilan setelah tombol diklik
            button.textContent = 'Sudah Absen';
            button.disabled = true;
            statusEl.textContent = `Hadir tercatat pada ${new Date().toLocaleTimeString('id-ID')}`;
            statusEl.style.color = 'var(--success-color)';
            statusEl.style.fontWeight = 'bold';
        }
    });

    // --- EVENT LISTENER UNTUK LOGOUT ---
    logoutBtn.addEventListener('click', function() {
        // Tampilkan lagi form login, sembunyikan panel absensi
        loginSection.classList.remove('hidden');
        absensiSection.classList.add('hidden');

        // Reset form login
        loginForm.reset();
        loginError.textContent = '';
    });
});