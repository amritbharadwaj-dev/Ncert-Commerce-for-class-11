// Commerce Class 11 Complete Data Setup (English & Hindi Google Drive links mapped)
const booksData = [
    {
        id: 'acc1',
        title: { en: 'Accountancy Part I', hi: 'लेखाशास्त्र भाग १' },
        cover: { en: 'images/acc1_en_cover.jpg', hi: 'images/acc1_hi_cover.jpg' },
        chapters: [
            { name: { en: 'CH-1: Introduction to Accounting', hi: 'अध्याय-१: लेखांकन का परिचय' }, url: 'https://drive.google.com/file/d/1_sample_link_1/preview' },
            { name: { en: 'CH-2: Theory Base of Accounting', hi: 'अध्याय-२: लेखांकन के सैद्धांतिक आधार' }, url: 'https://drive.google.com/file/d/1_sample_link_2/preview' }
        ]
    },
    {
        id: 'acc2',
        title: { en: 'Accountancy Part II', hi: 'लेखाशास्त्र भाग २' },
        cover: { en: 'images/acc2_en_cover.jpg', hi: 'images/acc2_hi_cover.jpg' },
        chapters: [
            { name: { en: 'CH-1: Financial Statements - I', hi: 'अध्याय-१: वित्तीय विवरण - १' }, url: 'https://drive.google.com/file/d/2_sample_link_1/preview' }
        ]
    },
    {
        id: 'bst',
        title: { en: 'Business Studies', hi: 'व्यवसाय अध्ययन' },
        cover: { en: 'images/bst_en_cover.jpg', hi: 'images/bst_hi_cover.jpg' },
        chapters: [
            { name: { en: 'CH-1: Business, Trade and Commerce', hi: 'अध्याय-१: व्यवसाय, व्यापार और वाणिज्य' }, url: 'https://drive.google.com/file/d/3_sample_link_1/preview' }
        ]
    },
    {
        id: 'eco_ied',
        title: { en: 'Indian Economic Development', hi: 'भारतीय आर्थिक विकास' },
        cover: { en: 'images/eco_ied_en_cover.jpg', hi: 'images/eco_ied_hi_cover.jpg' },
        chapters: [
            { name: { en: 'CH-1: Indian Economy on Eve of Independence', hi: 'अध्याय-१: स्वतंत्रता की पूर्वसंध्या पर भारतीय अर्थव्यवस्था' }, url: 'https://drive.google.com/file/d/4_sample_link_1/preview' }
        ]
    },
    {
        id: 'eco_stats',
        title: { en: 'Statistics for Economics', hi: 'अर्थशास्त्र के लिए सांख्यिकी' },
        cover: { en: 'images/eco_stats_en_cover.jpg', hi: 'images/eco_stats_hi_cover.jpg' },
        chapters: [
            { name: { en: 'CH-1: Introduction to Statistics', hi: 'अध्याय-१: सांख्यिकी का परिचय' }, url: 'https://drive.google.com/file/d/5_sample_link_1/preview' }
        ]
    },
    {
        id: 'maths',
        title: { en: 'Applied Mathematics', hi: 'व्यावहारिक गणित' },
        cover: { en: 'images/maths_en_cover.jpg', hi: 'images/maths_hi_cover.jpg' },
        chapters: [
            { name: { en: 'CH-1: Sets and Functions', hi: 'अध्याय-१: समुच्चय और फलन' }, url: 'https://drive.google.com/file/d/6_sample_link_1/preview' }
        ]
    }
];

let currentMedium = 'en';
let activeBook = null;

// Initialization on Window Load with Skeleton Fade-out Effect
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('skeleton-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('skeleton-screen').style.display = 'none';
            document.getElementById('app-container').classList.remove('opacity-0');
        }, 300);
    }, 1200); // 1.2s smooth skeleton preview

    renderBooks();
    loadThemePreference();
});

// Switch Medium (English / Hindi)
function setMedium(medium) {
    currentMedium = medium;
    if(medium === 'en') {
        document.getElementById('tab-en').className = "flex-1 py-2 text-sm font-semibold rounded-lg bg-white dark:bg-gray-700 shadow-sm transition";
        document.getElementById('tab-hi').className = "flex-1 py-2 text-sm font-semibold rounded-lg text-gray-500 dark:text-gray-400 transition";
    } else {
        document.getElementById('tab-hi').className = "flex-1 py-2 text-sm font-semibold rounded-lg bg-white dark:bg-gray-700 shadow-sm transition";
        document.getElementById('tab-en').className = "flex-1 py-2 text-sm font-semibold rounded-lg text-gray-500 dark:text-gray-400 transition";
    }
    renderBooks();
}

// Render Books on Home Screen Grid
function renderBooks() {
    const grid = document.getElementById('books-grid');
    grid.innerHTML = '';
    booksData.forEach(book => {
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between cursor-pointer hover:shadow-md transition";
        card.setAttribute('onclick', `openBookDetail('${book.id}')`);
        card.innerHTML = `
            <img src="${book.cover[currentMedium]}" alt="Cover" class="w-full h-36 object-cover rounded-xl mb-2">
            <h4 class="font-bold text-sm line-clamp-2">${book.title[currentMedium]}</h4>
            <span class="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">View Chapters <i class="fa-solid fa-chevron-right text-[10px]"></i></span>
        `;
        grid.appendChild(card);
    });
}

// Open Chapter List Screen (Screen 2)
function openBookDetail(bookId) {
    activeBook = booksData.find(b => b.id === bookId);
    document.getElementById('detail-cover').src = activeBook.cover[currentMedium];
    document.getElementById('detail-title').innerText = activeBook.title[currentMedium];
    
    updateBookmarkButtonState();

    const list = document.getElementById('chapters-list');
    list.innerHTML = '';
    activeBook.chapters.forEach((ch, idx) => {
        const item = document.createElement('div');
        item.className = "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm flex items-center justify-between border border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50";
        item.setAttribute('onclick', `openPdfChapter('${ch.name[currentMedium]}', '${ch.url}')`);
        item.innerHTML = `
            <span class="text-sm font-medium">${ch.name[currentMedium]}</span>
            <i class="fa-solid fa-file-pdf text-red-500 text-lg"></i>
        `;
        list.appendChild(item);
    });

    switchView('view-chapters');
}

// Open PDF Viewer Screen with Loading Animation (Screen 3)
function openPdfChapter(title, url) {
    document.getElementById('pdf-title').innerText = title;
    switchView('view-pdf');
    
    // Show Loader & simulate progress bar
    const loader = document.getElementById('pdf-loader');
    const iframe = document.getElementById('pdf-frame');
    const bar = document.getElementById('progress-bar');
    
    loader.style.display = 'flex';
    iframe.classList.add('hidden');
    bar.style.width = '0%';

    let progress = 0;
    const interval = setInterval(() => {
        progress += 20;
        bar.style.width = progress + '%';
        if(progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.display = 'none';
                iframe.src = url;
                iframe.classList.remove('hidden');
            }, 300);
        }
    }, 200);
}

function closePdfViewer() {
    switchView('view-chapters');
}

// Local Storage for "My Books" / Bookmarking
function toggleBookmark() {
    let savedBooks = JSON.parse(localStorage.getItem('my_saved_books')) || [];
    const index = savedBooks.findIndex(b => b.id === activeBook.id);
    
    if(index > -1) {
        savedBooks.splice(index, 1);
    } else {
        savedBooks.push(activeBook);
    }
    localStorage.setItem('my_saved_books', JSON.stringify(savedBooks));
    updateBookmarkButtonState();
}

function updateBookmarkButtonState() {
    let savedBooks = JSON.parse(localStorage.getItem('my_saved_books')) || [];
    const btn = document.getElementById('bookmark-btn');
    const isSaved = savedBooks.some(b => b.id === activeBook.id);
    
    if(isSaved) {
        btn.innerHTML = `<i class="fa-solid fa-check"></i> Saved in My Books`;
        btn.className = "bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md";
    } else {
        btn.innerHTML = `<i class="fa-solid fa-bookmark"></i> Add to My Books`;
        btn.className = "bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md";
    }
}

// Render My Books View
function renderMyBooks() {
    const grid = document.getElementById('mybooks-grid');
    grid.innerHTML = '';
    let savedBooks = JSON.parse(localStorage.getItem('my_saved_books')) || [];
    
    if(savedBooks.length === 0) {
        grid.innerHTML = `<p class="text-sm text-gray-400 col-span-2 text-center py-10">No saved books yet. Add books from explore screen!</p>`;
        return;
    }

    savedBooks.forEach(book => {
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between cursor-pointer";
        card.setAttribute('onclick', `openBookDetail('${book.id}')`);
        card.innerHTML = `
            <img src="${book.cover[currentMedium]}" alt="Cover" class="w-full h-36 object-cover rounded-xl mb-2">
            <h4 class="font-bold text-sm line-clamp-2">${book.title[currentMedium]}</h4>
        `;
        grid.appendChild(card);
    });
}

// Highlighter Simulation Placeholder
function highlightText(color) {
    alert(`Highlighted selected text with ${color} color and saved to local device memory!`);
}

// Bottom Navigation Switcher
function switchTab(tabName) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    
    // Reset nav colors
    document.getElementById('nav-home').className = "flex flex-col items-center text-gray-400 hover:text-blue-600";
    document.getElementById('nav-mybooks').className = "flex flex-col items-center text-gray-400 hover:text-blue-600";

    if(tabName === 'home') {
        document.getElementById('view-home').classList.remove('hidden');
        document.getElementById('nav-home').className = "flex flex-col items-center text-blue-600";
    } else if(tabName === 'mybooks') {
        document.getElementById('view-mybooks').classList.remove('hidden');
        document.getElementById('nav-mybooks').className = "flex flex-col items-center text-blue-600";
        renderMyBooks();
    }
}

function goHome() {
    switchTab('home');
}

// Dark Mode Toggle & Preference
function toggleDarkMode() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    if(html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        icon.className = "fa-solid fa-moon";
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        icon.className = "fa-solid fa-sun";
    }
}

function loadThemePreference() {
    if(localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        document.getElementById('theme-icon').className = "fa-solid fa-sun";
    }
}
  
