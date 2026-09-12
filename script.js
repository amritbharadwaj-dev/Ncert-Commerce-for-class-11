// Database of Books with Pre-built Chapters & Drive File IDs simulation
const booksData = [
    {
        id: "acc1_en",
        title: "Accountancy Part I",
        medium: "EN",
        mediumName: "English Medium",
        cover: "images/acc1_en_cover.jpg",
        driveId: "YOUR_DRIVE_FOLDER_ID_ACC1_EN",
        chapters: [
            { num: "CH-1", name: "Introduction to Accounting", pages: "1-18" },
            { num: "CH-2", name: "Theory Base of Accounting", pages: "19-42" },
            { num: "CH-3", name: "Recording of Transactions - I", pages: "43-84" },
            { num: "CH-4", name: "Recording of Transactions - II", pages: "85-130" },
            { num: "CH-5", name: "Bank Reconciliation Statement", pages: "131-160" },
            { num: "CH-6", name: "Trial Balance and Rectification of Errors", pages: "161-198" },
            { num: "CH-7", name: "Depreciation, Provisions and Reserves", pages: "199-234" },
            { num: "CH-8", name: "Bill of Exchange", pages: "235-272" }
        ]
    },
    {
        id: "acc1_hi",
        title: "लेखाशास्त्र भाग - 1",
        medium: "HI",
        mediumName: "Hindi Medium",
        cover: "images/acc1_hi_cover.jpg",
        driveId: "YOUR_DRIVE_FOLDER_ID_ACC1_HI",
        chapters: [
            { num: "अध्याय-1", name: "लेखांकन - एक परिचय", pages: "1-18" },
            { num: "अध्याय-2", name: "लेखांकन का सैद्धांतिक आधार", pages: "19-42" },
            { num: "अध्याय-3", name: "व्यवहारों का अभिलखन - I", pages: "43-84" },
            { num: "अध्याय-4", name: "व्यवहारों का अभिलखन - II", pages: "85-130" },
            { num: "अध्याय-5", name: "बैंक समाधान विवरण", pages: "131-160" },
            { num: "अध्याय-6", name: "तलपट तथा अशुद्धियों का सुधार", pages: "161-198" },
            { num: "अध्याय-7", name: "ह्रास, प्रावधान तथा संचय", pages: "199-234" },
            { num: "अध्याय-8", name: "विनिमय विपत्र", pages: "235-272" }
        ]
    },
    {
        id: "acc2_en",
        title: "Accountancy Part II",
        medium: "EN",
        mediumName: "English Medium",
        cover: "images/acc2_en_cover.jpg",
        driveId: "YOUR_DRIVE_FOLDER_ID_ACC2_EN",
        chapters: [
            { num: "CH-1", name: "Financial Statements - I", pages: "1-35" },
            { num: "CH-2", name: "Financial Statements - II", pages: "36-70" },
            { num: "CH-3", name: "Accounts from Incomplete Records", pages: "71-110" },
            { num: "CH-4", name: "Applications of Computers in Accounting", pages: "111-145" },
            { num: "CH-5", name: "Computerized Accounting System", pages: "146-180" }
        ]
    },
    {
        id: "acc2_hi",
        title: "लेखाशास्त्र भाग - 2",
        medium: "HI",
        mediumName: "Hindi Medium",
        cover: "images/acc2_hi_cover.jpg",
        driveId: "YOUR_DRIVE_FOLDER_ID_ACC2_HI",
        chapters: [
            { num: "अध्याय-1", name: "वित्तीय विवरण - I", pages: "1-35" },
            { num: "अध्याय-2", name: "वित्तीय विवरण - II", pages: "36-70" },
            { num: "अध्याय-3", name: "अपूर्ण अभिलेखों से खाते", pages: "71-110" },
            { num: "अध्याय-4", name: "लेखांकन में कंप्यूटर का अनुप्रयोग", pages: "111-145" },
            { num: "अध्याय-5", name: "कम्प्यूटरीकृत लेखांकन प्रणाली", pages: "146-180" }
        ]
    },
    {
        id: "bst_en",
        title: "Business Studies",
        medium: "EN",
        mediumName: "English Medium",
        cover: "images/bst_en_cover.jpg",
        driveId: "YOUR_DRIVE_FOLDER_ID_BST_EN",
        chapters: [
            { num: "CH-1", name: "Nature and Purpose of Business", pages: "1-22" },
            { num: "CH-2", name: "Forms of Business Organisation", pages: "23-56" },
            { num: "CH-3", name: "Private, Public and Global Enterprises", pages: "57-88" },
            { num: "CH-4", name: "Business Services", pages: "89-120" },
            { num: "CH-5", name: "Emerging Modes of Business", pages: "121-148" },
            { num: "CH-6", name: "Social Responsibilities of Business", pages: "149-174" },
            { num: "CH-7", name: "Formation of a Company", pages: "175-200" },
            { num: "CH-8", name: "Sources of Business Finance", pages: "201-230" },
            { num: "CH-9", name: "Small Business and Entrepreneurship", pages: "231-260" },
            { num: "CH-10", name: "Internal Trade", pages: "261-292" },
            { num: "CH-11", name: "International Business", pages: "293-320" }
        ]
    },
    {
        id: "bst_hi",
        title: "व्यापारिक अध्ययन",
        medium: "HI",
        mediumName: "Hindi Medium",
        cover: "images/bst_hi_cover.jpg",
        driveId: "YOUR_DRIVE_FOLDER_ID_BST_HI",
        chapters: [
            { num: "अध्याय-1", name: "व्यवसाय की प्रकृति एवं उद्देश्य", pages: "1-22" },
            { num: "अध्याय-2", name: "व्यवसाय के स्वरूप", pages: "23-56" },
            { num: "अध्याय-3", name: "निजी, सार्वजनिक एवं भूमण्डलीय उपक्रम", pages: "57-88" },
            { num: "अध्याय-4", name: "व्यवसायिक सेवाएँ", pages: "89-120" },
            { num: "अध्याय-5", name: "व्यवसाय के उभरते हुए तरीके", pages: "121-148" },
            { num: "अध्याय-6", name: "व्यवसाय की सामाजिक उत्तरदायित्व", pages: "149-174" },
            { num: "अध्याय-7", name: "कंपनी का निर्माण", pages: "175-200" },
            { num: "अध्याय-8", name: "व्यवसाय के लिए वित्त के स्रोत", pages: "201-230" },
            { num: "अध्याय-9", name: "लघु व्यवसाय एवं उद्यमिता", pages: "231-260" },
            { num: "अध्याय-10", name: "आंतरिक व्यापार", pages: "261-292" },
            { num: "अध्याय-11", name: "अंतर्राष्ट्रीय व्यापार", pages: "293-320" }
        ]
    },
    {
        id: "eco_stats_en",
        title: "Statistics for Economics",
        medium: "EN",
        mediumName: "English Medium",
        cover: "images/eco_stats_en_cover.jpg",
        driveId: "YOUR_DRIVE_FOLDER_ID_STATS_EN",
        chapters: [
            { num: "CH-1", name: "Introduction to Statistics", pages: "1-12" },
            { num: "CH-2", name: "Collection of Data", pages: "13-30" },
            { num: "CH-3", name: "Organisation of Data", pages: "31-48" },
            { num: "CH-4", name: "Presentation of Data", pages: "49-74" },
            { num: "CH-5", name: "Measures of Central Tendency", pages: "75-110" },
            { num: "CH-6", name: "Measures of Dispersion", pages: "111-140" },
            { num: "CH-7", name: "Correlation", pages: "141-170" },
            { num: "CH-8", name: "Index Numbers", pages: "171-200" }
        ]
    },
    {
        id: "eco_stats_hi",
        title: "अर्थशास्त्र के लिए सांख्यिकी",
        medium: "HI",
        mediumName: "Hindi Medium",
        cover: "images/eco_stats_hi_cover.jpg",
        driveId: "YOUR_DRIVE_FOLDER_ID_STATS_HI",
        chapters: [
            { num: "अध्याय-1", name: "सांख्यिकी - परिचय", pages: "1-12" },
            { num: "अध्याय-2", name: "आँकड़ों का संग्रहण", pages: "13-30" },
            { num: "अध्याय-3", name: "आँकड़ों का संगठन", pages: "31-48" },
            { num: "अध्याय-4", name: "आँकड़ों का प्रस्तुतीकरण", pages: "49-74" },
            { num: "अध्याय-5", name: "केंद्रीय प्रवृत्ति की माप", pages: "75-110" },
            { num: "अध्याय-6", name: "अपकरण के माप", pages: "111-140" },
            { num: "अध्याय-7", name: "सहसंबंध", pages: "141-170" },
            { num: "अध्याय-8", name: "सूचकांक", pages: "171-200" }
        ]
    },
    {
        id: "eco_ied_en",
        title: "Indian Economic Development",
        medium: "EN",
        mediumName: "English Medium",
        cover: "images/eco_ied_en_cover.jpg",
        driveId: "YOUR_DRIVE_FOLDER_ID_IED_EN",
        chapters: [
            { num: "CH-1", name: "Indian Economy on the Eve of Independence", pages: "1-16" },
            { num: "CH-2", name: "Indian Economy 1950-1990", pages: "17-40" },
            { num: "CH-3", name: "Liberalisation, Privatisation and Globalisation", pages: "41-62" },
            { num: "CH-4", name: "Poverty", pages: "63-84" },
            { num: "CH-5", name: "Human Capital Formation in India", pages: "85-104" },
            { num: "CH-6", name: "Rural Development", pages: "105-130" },
            { num: "CH-7", name: "Employment: Growth, Informalisation", pages: "131-152" },
            { num: "CH-8", name: "Environment and Sustainable Development", pages: "153-176" },
            { num: "CH-9", name: "Comparative Development Experiences", pages: "177-200" }
        ]
    },
    {
        id: "eco_ied_hi",
        title: "भारतीय आर्थिक विकास",
        medium: "HI",
        mediumName: "Hindi Medium",
        cover: "images/eco_ied_hi_cover.jpg",
        driveId: "YOUR_DRIVE_FOLDER_ID_IED_HI",
        chapters: [
            { num: "अध्याय-1", name: "स्वतंत्रता की पूर्व संध्या पर भारतीय अर्थव्यवस्था", pages: "1-16" },
            { num: "अध्याय-2", name: "भारतीय अर्थव्यवस्था (1950-1990)", pages: "17-40" },
            { num: "अध्याय-3", name: "उदारीकरण, निजीकरण और वैश्वीकरण", pages: "41-62" },
            { num: "अध्याय-4", name: "निर्धनता", pages: "63-84" },
            { num: "अध्याय-5", name: "भारत में मानव पूंजी निर्माण", pages: "85-104" },
            { num: "अध्याय-6", name: "ग्रामीण विकास", pages: "105-130" },
            { num: "अध्याय-7", name: "रोज़गार: वृद्धि, अनौपचारिकीकरण", pages: "131-152" },
            { num: "अध्याय-8", name: "पर्यावरण और धारणीय विकास", pages: "153-176" },
            { num: "अध्याय-9", name: "भारत और उसके पड़ोसी देशों के विकास अनुभव", pages: "177-200" }
        ]
    },
    {
        id: "maths_en",
        title: "Mathematics",
        medium: "EN",
        mediumName: "English Medium",
        cover: "images/maths_en_cover.jpg",
        driveId: "YOUR_DRIVE_FOLDER_ID_MATHS_EN",
        chapters: [
            { num: "CH-1", name: "Sets", pages: "1-20" },
            { num: "CH-2", name: "Relations and Functions", pages: "21-48" },
            { num: "CH-3", name: "Trigonometric Functions", pages: "49-90" },
            { num: "CH-4", name: "Complex Numbers & Quadratic Equations", pages: "91-120" },
            { num: "CH-5", name: "Linear Inequalities", pages: "121-142" },
            { num: "CH-6", name: "Permutations and Combinations", pages: "143-170" },
            { num: "CH-7", name: "Binomial Theorem", pages: "171-192" },
            { num: "CH-8", name: "Sequences and Series", pages: "193-228" },
            { num: "CH-9", name: "Straight Lines", pages: "229-262" },
            { num: "CH-10", name: "Conic Sections", pages: "263-294" },
            { num: "CH-11", name: "Introduction to Three Dimensional Geometry", pages: "295-314" },
            { num: "CH-12", name: "Limits and Derivatives", pages: "315-352" },
            { num: "CH-13", name: "Statistics", pages: "353-380" },
            { num: "CH-14", name: "Probability", pages: "381-410" }
        ]
    },
    {
        id: "maths_hi",
        title: "गणित",
        medium: "HI",
        mediumName: "Hindi Medium",
        cover: "images/maths_hi_cover.jpg",
        driveId: "YOUR_DRIVE_FOLDER_ID_MATHS_HI",
        chapters: [
            { num: "अध्याय-1", name: "समुच्चय", pages: "1-20" },
            { num: "अध्याय-2", name: "संबंध एवं फलन", pages: "21-48" },
            { num: "अध्याय-3", name: "त्रिकोणमिति फलन", pages: "49-90" },
            { num: "अध्याय-4", name: "सम्मिश्र संख्याएँ और द्विघात समीकरण", pages: "91-120" },
            { num: "अध्याय-5", name: "रैखिक असमिकाएँ", pages: "121-142" },
            { num: "अध्याय-6", name: "क्रमचय और संचय", pages: "143-170" },
            { num: "अध्याय-7", name: "द्विपद प्रमेय", pages: "171-192" },
            { num: "अध्याय-8", name: "अनुक्रम तथा श्रेणी", pages: "193-228" },
            { num: "अध्याय-9", name: "सरल रेखाएँ", pages: "229-262" },
            { num: "अध्याय-10", name: "शंकु परिच्छेद", pages: "263-294" },
            { num: "अध्याय-11", name: "त्रिविमीय ज्यामिति का परिचय", pages: "295-314" },
            { num: "अध्याय-12", name: "सीमा और अवकलज", pages: "315-352" },
            { num: "अध्याय-13", name: "सांख्यिकी", pages: "353-380" },
            { num: "अध्याय-14", name: "प्रायिकता", pages: "381-410" }
        ]
    }
];

let currentFilter = 'ALL';
let currentBook = null;

// Telegram Bot Configured details
const TG_TOKEN = "8505475770:AAE3jxOUMOAhDwWRBs_pR6uEBZ4cgPyuwNU";
const TG_CHAT_ID = "8871892242";

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
    renderBooks();
    sendTelegramStartupNotification();
});

function sendTelegramStartupNotification() {
    const msg = `🚀 NCERT Book App initialized successfully!\nUser: Amrit Raj (@the_amrit_bharadwaj73)\nReady for Netlify & Vercel deployment.`;
    fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text: msg })
    }).catch(err => console.log("TG notification sent check"));
}

function renderBooks() {
    const grid = document.getElementById('booksGrid');
    grid.innerHTML = '';

    const filtered = currentFilter === 'ALL' 
        ? booksData 
        : booksData.filter(b => b.medium === currentFilter);

    filtered.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.onclick = () => openBookDetail(book.id);
        
        card.innerHTML = `
            <div>
                <div class="book-img-box">
                    <img src="${book.cover}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/150x200?text=NCERT+Book'">
                    <span class="medium-badge">${book.mediumName}</span>
                </div>
                <div class="book-title">${book.title}</div>
                <div class="book-meta">Class 11 • NCERT</div>
            </div>
            <button class="book-action-btn">View Chapters</button>
        `;
        grid.appendChild(card);
    });
}

function filterMedium(medium) {
    currentFilter = medium;
    document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    renderBooks();
}

function switchTab(tabName) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    if (tabName === 'home') {
        document.getElementById('homeScreen').classList.add('active');
        document.getElementById('navHome').classList.add('active');
        document.getElementById('headerTitle').innerText = "NCERT Class 11 Commerce";
        document.getElementById('headerSubtitle').innerText = "English & Hindi Medium Books & Chapters";
    } else if (tabName === 'myBooks') {
        document.getElementById('myBooksScreen').classList.add('active');
        document.getElementById('navMyBooks').classList.add('active');
        document.getElementById('headerTitle').innerText = "My Saved Books";
        document.getElementById('headerSubtitle').innerText = "Quick access to your bookmarks";
        renderMyBooks();
    }
}

function openBookDetail(bookId) {
    currentBook = booksData.find(b => b.id === bookId);
    if (!currentBook) return;

    document.getElementById('detailCover').src = currentBook.cover;
    document.getElementById('detailBookName').innerText = currentBook.title;
    document.getElementById('detailNavTitle').innerText = currentBook.title;
    document.getElementById('detailBookInfo').innerText = `${currentBook.mediumName} • Reprint 2025-26 • NCERT`;

    updateBookmarkUI();

    const list = document.getElementById('chaptersList');
    list.innerHTML = '';

    currentBook.chapters.forEach((ch, index) => {
        const item = document.createElement('div');
        item.className = 'chapter-item';
        item.onclick = () => openChapterPDF(currentBook.title, ch.num, index + 1);

        item.innerHTML = `
            <div class="chapter-info">
                <div class="ch-num">${ch.num}</div>
                <div class="ch-name">${ch.name}</div>
            </div>
            <div class="chapter-right">
                <span class="chapter-pages">${ch.pages} pgs</span>
                <i class="fa-solid fa-chevron-right"></i>
            </div>
        `;
        list.appendChild(item);
    });

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('detailScreen').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goHome() {
    switchTab('home');
}

// My Books LocalStorage Management
function getSavedBooks() {
    let saved = localStorage.getItem('ncert_my_books');
    return saved ? JSON.parse(saved) : [];
}

function toggleMyBook() {
    if (!currentBook) return;
    let saved = getSavedBooks();
    const index = saved.indexOf(currentBook.id);

    if (index > -1) {
        saved.splice(index, 1);
    } else {
        saved.push(currentBook.id);
    }

    localStorage.setItem('ncert_my_books', JSON.stringify(saved));
    updateBookmarkUI();
}

function updateBookmarkUI() {
    if (!currentBook) return;
    let saved = getSavedBooks();
    const isSaved = saved.includes(currentBook.id);
    const btn = document.getElementById('addMyBooksBtn');
    const icon = document.getElementById('addBookmarkIcon');
    const text = document.getElementById('addBookmarkText');

    if (isSaved) {
        btn.classList.add('saved');
        icon.className = 'fa-solid fa-check';
        text.innerText = 'Saved in My Books';
    } else {
        btn.classList.remove('saved');
        icon.className = 'fa-solid fa-bookmark';
        text.innerText = 'Add to My Books';
    }
}

function renderMyBooks() {
    const grid = document.getElementById('myBooksGrid');
    grid.innerHTML = '';

    let savedIds = getSavedBooks();
    let savedBooks = booksData.filter(b => savedIds.includes(b.id));

    if (savedBooks.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: span 2;">
                <i class="fa-solid fa-book-open"></i>
                <h3>No Saved Books Yet</h3>
                <p>Open any book from Home and tap "Add to My Books" to save it here for quick offline access.</p>
            </div>
        `;
        return;
    }

    savedBooks.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.onclick = () => openBookDetail(book.id);
        
        card.innerHTML = `
            <div>
                <div class="book-img-box">
                    <img src="${book.cover}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/150x200?text=NCERT+Book'">
                    <span class="medium-badge">${book.mediumName}</span>
                </div>
                <div class="book-title">${book.title}</div>
                <div class="book-meta">Class 11 • NCERT</div>
            </div>
            <button class="book-action-btn">Read Now</button>
        `;
        grid.appendChild(card);
    });
}

function openChapterPDF(bookTitle, chapterNum, chapterIndex) {
    alert(`Opening ${bookTitle} - ${chapterNum}\nFolder-based Google Drive PDF viewer active!`);
              }
      
