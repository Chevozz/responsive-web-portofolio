// Prema - Shared JavaScript
const siteData = [
    { title: "Aplikasi TrackKuy", category: "UI/UX Design", desc: "Aplikasi optimasi rute perjalanan wisata di Bali dengan Design Thinking.", link: "karya.html" },
    { title: "Home Server Infrastructure", category: "DevOps", desc: "Setup Ubuntu Server, Docker, CasaOS, dan jaringan aman Tailscale.", link: "karya.html" },
    { title: "Technical Garment Mockup", category: "Vector Design", desc: "Desain teknis mockup jaket vektor menggunakan Adobe Illustrator.", link: "karya.html" },
    { title: "Desain Lanyard & Event Merchandise", category: "Graphic Design", desc: "Perancangan identitas visual dan perlengkapan acara.", link: "karya.html" },
    { title: "Setting Up a Minecraft Server", category: "Game Server", desc: "Manajemen Pterodactyl, Paper Server, dan konfigurasi in-game voice chat.", link: "karya.html" },
    { title: "Setting Up a Discord Server", category: "Community", desc: "Konfigurasi server komunitas, role permissions, dan integrasi bot otomatis.", link: "karya.html" },
    { title: "Profil Made Premadharma Yogananda", category: "Tentang", desc: "Biodata, latar belakang pendidikan, NIM 2415101056, Ilmu Komputer Undiksha.", link: "tentang.html" },
    { title: "Tugas Pencarian JS (Live Filter)", category: "JavaScript", desc: "Pencarian DOM interaktif real-time menggunakan JavaScript murni.", link: "tugas.html" },
    { title: "Hubungi Saya", category: "Kontak", desc: "Formulir interaktif untuk kirim pesan, kolaborasi, dan diskusi.", link: "kontak.html" }
];

function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
}

function toggleSearchModal() {
    const modal = document.getElementById('searchModal');
    const searchBox = document.getElementById('searchBox');
    const inputField = document.getElementById('globalSearchInput');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            searchBox.classList.remove('scale-95');
            inputField.focus();
        }, 10);
    } else {
        modal.classList.add('opacity-0');
        searchBox.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            inputField.value = '';
            performSearch();
        }, 250);
    }
}

function performSearch() {
    const query = document.getElementById('globalSearchInput').value.toLowerCase().trim();
    const container = document.getElementById('searchResults');
    if (!query) {
        container.innerHTML = '<div class="text-center text-slate-400 dark:text-slate-500 text-sm py-8">Ketik kata kunci (misal: "TrackKuy", "Docker", "Figma", "Undiksha") untuk mencari...</div>';
        return;
    }
    const filtered = siteData.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
    if (!filtered.length) {
        container.innerHTML = '<div class="text-center text-slate-400 dark:text-slate-500 text-sm py-8">Tidak ada hasil yang cocok dengan kata kunci tersebut.</div>';
        return;
    }
    container.innerHTML = filtered.map(item => `
        <a href="${item.link}" class="block p-4 rounded-2xl glass-panel hover:border-blue-500/40 hover:bg-white/90 dark:hover:bg-white/10 transition-all border border-white/40 dark:border-white/10 group">
            <div class="flex justify-between items-start mb-1.5">
                <h4 class="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-500 transition-colors text-sm">${item.title}</h4>
                <span class="text-[10px] uppercase font-bold tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full">${item.category}</span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">${item.desc}</p>
        </a>
    `).join('');
}

document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('searchModal');
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) toggleSearchModal();
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleSearchModal();
    }
});
