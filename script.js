// 14 Commerce & Core Books Database with English & Hindi Medium Covers and Chapters
const booksData = [
    {
        id: 'acc1_en',
        title: 'Accountancy Part I (Class XI)',
        medium: 'English Medium',
        cover: 'images/acc1_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Introduction to Accounting', url: '' },
            { name: 'Ch 2: Theory Base of Accounting', url: '' },
            { name: 'Ch 3: Recording of Transactions - I', url: '' },
            { name: 'Ch 4: Recording of Transactions - II', url: '' },
            { name: 'Ch 5: Bank Reconciliation Statement', url: '' },
            { name: 'Ch 6: Trial Balance and Rectification of Errors', url: '' }
        ]
    },
    {
        id: 'acc1_hi',
        title: 'लेखाशास्त्र भाग 1 (कक्षा XI)',
        medium: 'Hindi Medium',
        cover: 'images/acc1_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: लेखांकन परिचय', url: '' },
            { name: 'अध्याय 2: लेखांकन का सैद्धांतिक आधार', url: '' },
            { name: 'अध्याय 3: लेन-देनों का अभिलेखन - I', url: '' },
            { name: 'अध्याय 4: लेन-देनों का अभिलेखन - II', url: '' },
            { name: 'अध्याय 5: बैंक समाधान विवरण', url: '' },
            { name: 'अध्याय 6: तलपट एवं अशुद्धियों का सुधार', url: '' }
        ]
    },
    {
        id: 'acc2_en',
        title: 'Accountancy Part II (Class XI)',
        medium: 'English Medium',
        cover: 'images/acc2_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Depreciation, Provisions and Reserves', url: '' },
            { name: 'Ch 2: Bill of Exchange', url: '' },
            { name: 'Ch 3: Financial Statements - I', url: '' },
            { name: 'Ch 4: Financial Statements - II', url: '' },
            { name: 'Ch 5: Accounts from Incomplete Records', url: '' }
        ]
    },
    {
        id: 'acc2_hi',
        title: 'लेखाशास्त्र भाग 2 (कक्षा XI)',
        medium: 'Hindi Medium',
        cover: 'images/acc2_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: ह्रास, प्रावधान तथा संचय', url: '' },
            { name: 'अध्याय 2: विनिमय विपपत्र', url: '' },
            { name: 'अध्याय 3: वित्तीय विवरण - I', url: '' },
            { name: 'अध्याय 4: वित्तीय विवरण - II', url: '' },
            { name: 'अध्याय 5: अधूरे अभिलेखों से खाते', url: '' }
        ]
    },
    {
        id: 'bst_en',
        title: 'Business Studies (Class XI)',
        medium: 'English Medium',
        cover: 'images/bst_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Nature and Purpose of Business', url: '' },
            { name: 'Ch 2: Forms of Business Organisation', url: '' },
            { name: 'Ch 3: Private, Public and Global Enterprises', url: '' },
            { name: 'Ch 4: Business Services', url: '' },
            { name: 'Ch 5: Emerging Modes of Business', url: '' },
            { name: 'Ch 6: Social Responsibilities of Business', url: '' },
            { name: 'Ch 7: Sources of Business Finance', url: '' },
            { name: 'Ch 8: Small Business', url: '' },
            { name: 'Ch 9: Internal Trade', url: '' },
            { name: 'Ch 10: International Business', url: '' }
        ]
    },
    {
        id: 'bst_hi',
        title: 'व्यवसाय अध्ययन (कक्षा XI)',
        medium: 'Hindi Medium',
        cover: 'images/bst_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: व्यवसाय की प्रकृति एवं उद्देश्य', url: '' },
            { name: 'अध्याय 2: व्यावसायिक संगठन के स्वरूप', url: '' },
            { name: 'अध्याय 3: निजी, सार्वजनिक एवं भूमंडलीय उपक्रम', url: '' },
            { name: 'अध्याय 4: व्यावसायिक सेवाएँ', url: '' },
            { name: 'अध्याय 5: व्यवसाय के उभरते हुए तरीके', url: '' },
            { name: 'अध्याय 6: व्यवसाय की सामाजिक उत्तरदायित्व', url: '' },
            { name: 'अध्याय 7: व्यवसाय के लिए वित्त के स्रोत', url: '' },
            { name: 'अध्याय 8: लघु व्यवसाय', url: '' },
            { name: 'अध्याय 9: आंतरिक व्यापार', url: '' },
            { name: 'अध्याय 10: अंतर्राष्ट्रीय व्यापार', url: '' }
        ]
    },
    {
        id: 'eco_ied_en',
        title: 'Indian Economic Development',
        medium: 'English Medium',
        cover: 'images/eco_ied_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Indian Economy on the Eve of Independence', url: '' },
            { name: 'Ch 2: Indian Economy 1950-1990', url: '' },
            { name: 'Ch 3: Liberalisation, Privatisation and Globalisation', url: '' },
            { name: 'Ch 4: Human Capital Formation in India', url: '' },
            { name: 'Ch 5: Rural Development', url: '' },
            { name: 'Ch 6: Employment & Growth', url: '' },
            { name: 'Ch 7: Environment and Sustainable Development', url: '' },
            { name: 'Ch 8: Comparative Development Experiences of India and Neighbours', url: '' }
        ]
    },
    {
        id: 'eco_ied_hi',
        title: 'भारतीय आर्थिक विकास',
        medium: 'Hindi Medium',
        cover: 'images/eco_ied_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: स्वतंत्रता की पूर्व संध्या पर भारतीय अर्थव्यवस्था', url: '' },
            { name: 'अध्याय 2: भारतीय अर्थव्यवस्था 1950-1990', url: '' },
            { name: 'अध्याय 3: उदारीकरण, निजीकरण और वैश्वीकरण', url: '' },
            { name: 'अध्याय 4: भारत में मानव पूंजी निर्माण', url: '' },
            { name: 'अध्याय 5: ग्रामीण विकास', url: '' },
            { name: 'अध्याय 6: रोजगार: वृद्धि, अनौपचारिकरण और अन्य मुद्दे', url: '' },
            { name: 'अध्याय 7: पर्यावरण और सतत विकास', url: '' },
            { name: 'अध्याय 8: भारत और उसके पड़ोसी देशों के तुलनात्मक विकास अनुभव', url: '' }
        ]
    },
    {
        id: 'eco_stats_en',
        title: 'Statistics for Economics',
        medium: 'English Medium',
        cover: 'images/eco_stats_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Introduction to Statistics', url: '' },
            { name: 'Ch 2: Collection of Data', url: '' },
            { name: 'Ch 3: Organisation of Data', url: '' },
            { name: 'Ch 4: Presentation of Data', url: '' },
            { name: 'Ch 5: Measures of Central Tendency', url: '' },
            { name: 'Ch 6: Measures of Dispersion', url: '' },
            { name: 'Ch 7: Correlation', url: '' },
            { name: 'Ch 8: Index Numbers', url: '' }
        ]
    },
    {
        id: 'eco_stats_hi',
        title: 'अर्थशास्त्र के लिए सांख्यिकी',
        medium: 'Hindi Medium',
        cover: 'images/eco_stats_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: सांख्यिकी परिचय', url: '' },
            { name: 'अध्याय 2: आंकड़ों का संकलन', url: '' },
            { name: 'अध्याय 3: आंकड़ों का संगठन', url: '' },
            { name: 'अध्याय 4: आंकड़ों का प्रस्तुतिकरण', url: '' },
            { name: 'अध्याय 5: केंद्रीय प्रवृत्ति की माप', url: '' },
            { name: 'अध्याय 6: अप किरण के माप', url: '' },
            { name: 'अध्याय 7: सहसंबंध', url: '' },
            { name: 'अध्याय 8: सूचकांक', url: '' }
        ]
    },
    {
        id: 'maths_en',
        title: 'Mathematics (Class XI)',
        medium: 'English Medium',
        cover: 'images/maths_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Sets', url: '' },
            { name: 'Ch 2: Relations and Functions', url: '' },
            { name: 'Ch 3: Trigonometric Functions', url: '' },
            { name: 'Ch 4: Complex Numbers & Quadratic Equations', url: '' },
            { name: 'Ch 5: Linear Inequalities', url: '' },
            { name: 'Ch 6: Permutations and Combinations', url: '' },
            { name: 'Ch 7: Binomial Theorem', url: '' },
            { name: 'Ch 8: Sequence and Series', url: '' },
            { name: 'Ch 9: Straight Lines', url: '' },
            { name: 'Ch 10: Conic Sections', url: '' },
            { name: 'Ch 11: Introduction to Three Dimensional Geometry', url: '' },
            { name: 'Ch 12: Limits and Derivatives', url: '' },
            { name: 'Ch 13: Statistics & Probability', url: '' }
        ]
    },
    {
        id: 'maths_hi',
        title: 'गणित (कक्षा XI)',
        medium: 'Hindi Medium',
        cover: 'images/maths_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: समुच्चय', url: '' },
            { name: 'अध्याय 2: संबंध एवं फलन', url: '' },
            { name: 'अध्याय 3: त्रिकोणमिति फलन', url: '' },
            { name: 'अध्याय 4: सम्मिश्र संख्याएँ और द्विघात समीकरण', url: '' },
            { name: 'अध्याय 5: रैखिक असमिकाएँ', url: '' },
            { name: 'अध्याय 6: क्रमचय और संचय', url: '' },
            { name: 'अध्याय 7: द्विपद प्रमेय', url: '' },
            { name: 'अध्याय 8: अनुक्रम तथा श्रेणी', url: '' },
            { name: 'अध्याय 9: सरल रेखाएँ', url: '' },
            { name: 'अध्याय 10: शंखु परिच्छेद', url: '' },
            { name: 'अध्याय 11: त्रिविमीय ज्यामिति का परिचय', url: '' },
            { name: 'अध्याय 12: सीमा और अवकलज', url: '' },
            { name: 'अध्याय 13: सांख्यिकी एवं प्रायिकता', url: '' }
        ]
    },
    {
        id: 'lang_eng',
        title: 'English Core (Hornbill & Snapshots)',
        medium: 'English',
        cover: 'images/lang_eng_cover.jpg',
        chapters: [
            { name: 'Hornbill Ch 1: The Portrait of a Lady', url: '' },
            { name: 'Hornbill Ch 2: We’re Not Afraid to Die...', url: '' },
            { name: 'Snapshots Ch 1: The Summer of the Beautiful White Horse', url: '' },
            { name: 'Snapshots Ch 2: The Address', url: '' }
        ]
    },
    {
        id: 'lang_hindi',
        title: 'हिन्दी कोर (आरोह और वितान)',
        medium: 'Hindi',
        cover: 'images/lang_hindi_cover.jpg',
        chapters: [
            { name: 'आरोह पाठ 1: नमक का दरोगा', url: '' },
            { name: 'आरोह पाठ 2: मियाँ नसीरुद्दीन', url: '' },
            { name: 'वितान पाठ 1: भारतीय गायिकाओं में बेजोड़ - लता मंगेशकर', url: '' },
            { name: 'वितान पाठ 2: राजस्थान की रजत बूंदें', url: '' }
        ]
    }
];

let myBooks = JSON.parse(localStorage.getItem('my_saved_books')) || [];
let currentActiveBook = null;
let currentSlideIndex = 0;

// Initialize Lucide icons & App on Load
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderBooksGrid('books-grid', booksData);
    renderSlider();
    renderMyBooks();

    // Setup 1-second auto slider interval
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % 4;
        updateSliderPosition();
    }, 1000);
});

// Auto Slider setup (Showing top 4 featured books)
function renderSlider() {
    const slider = document.getElementById('banner-slider');
    const dots = document.getElementById('slider-dots');
    slider.innerHTML = '';
    dots.innerHTML = '';

    const featured = booksData.slice(0, 4);
    
    featured.forEach((book, idx) => {
        const slide = document.createElement('div');
        slide.className = "min-w-full h-full relative flex items-center px-6 bg-gradient-to-r from-indigo-600 to-violet-700 text-white cursor-pointer";
        slide.onclick = () => openBookDetail(book.id);
        slide.innerHTML = `
            <div class="w-2/3 space-y-1">
                <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">${book.medium}</span>
                <h4 class="font-bold text-base line-clamp-2">${book.title}</h4>
                <p class="text-xs text-indigo-100">Tap to read chapters instantly</p>
            </div>
            <div class="w-1/3 flex justify-end">
                <img src="${book.cover}" alt="cover" class="h-32 rounded-lg shadow-md object-cover border border-white/20">
            </div>
        `;
        slider.appendChild(slide);

        const dot = document.createElement('div');
        dot.className = `h-1.5 rounded-full transition-all duration-300 ${idx === currentSlideIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`;
        dots.appendChild(dot);
    });
}

function updateSliderPosition() {
    const slider = document.getElementById('banner-slider');
    if(slider) {
        slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        const dots = document.getElementById('slider-dots').children;
        for(let i=0; i<dots.length; i++) {
            dots[i].className = `h-1.5 rounded-full transition-all duration-300 ${i === currentSlideIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`;
        }
    }
}

// Render Books in Grid
function renderBooksGrid(containerId, list) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if(list.length === 0) {
        container.innerHTML = `<div class="col-span-2 text-center py-10 text-slate-400 text-xs">No books found here yet.</div>`;
        return;
    }

    list.forEach(book => {
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs hover:border-indigo-500 transition cursor-pointer";
        card.onclick = () => openBookDetail(book.id);
        card.innerHTML = `
            <div class="relative w-full h-36 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden mb-2 flex items-center justify-center">
                <img src="${book.cover}" alt="${book.title}" class="h-full w-full object-cover">
            </div>
            <div>
                <span class="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">${book.medium}</span>
                <h4 class="font-bold text-xs line-clamp-2 text-slate-800 dark:text-slate-100">${book.title}</h4>
                <p class="text-[10px] text-slate-400 mt-1">${book.chapters.length} Chapters</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Switch Bottom Tabs
function switchTab(tabName) {
    document.getElementById('tab-home').classList.add('hidden');
    document.getElementById('tab-mybooks').classList.add('hidden');
    document.getElementById('tab-book-detail').classList.add('hidden');

    document.getElementById('nav-home').className = "flex flex-col items-center text-slate-400 transition";
    document.getElementById('nav-mybooks').className = "flex flex-col items-center text-slate-400 transition";

    if(tabName === 'home') {
        document.getElementById('tab-home').classList.remove('hidden');
        document.getElementById('nav-home').className = "flex flex-col items-center text-indigo-600 dark:text-indigo-400 transition";
    } else if(tabName === 'mybooks') {
        document.getElementById('tab-mybooks').classList.remove('hidden');
        document.getElementById('nav-mybooks').className = "flex flex-col items-center text-indigo-600 dark:text-indigo-400 transition";
        renderMyBooks();
    }
    lucide.createIcons();
}

// Open Book Detail Screen (Similar to Image 2403.jpg)
function openBookDetail(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if(!book) return;
    currentActiveBook = book;

    document.getElementById('tab-home').classList.add('hidden');
    document.getElementById('tab-mybooks').classList.add('hidden');
    document.getElementById('tab-book-detail').classList.remove('hidden');

    const isSaved = myBooks.includes(book.id);

    const header = document.getElementById('book-detail-header');
    header.innerHTML = `
        <img src="${book.cover}" alt="cover" class="h-32 rounded-xl shadow-md border border-slate-100 dark:border-slate-800 object-cover">
        <h3 class="font-bold text-base">${book.title}</h3>
        <p class="text-xs text-slate-400">${book.medium} • NCERT Edition</p>
        <button onclick="toggleSaveBook('${book.id}')" class="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${isSaved ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'}">
            <i data-lucide="${isSaved ? 'check' : 'bookmark'}" class="w-4 h-4"></i>
            <span>${isSaved ? 'Saved in My Books' : 'Add to My Books'}</span>
        </button>
    `;

    const chapContainer = document.getElementById('chapters-list-container');
    chapContainer.innerHTML = '';

    book.chapters.forEach((chap, index) => {
        const item = document.createElement('div');
        item.className = "bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center shadow-xs hover:border-indigo-300 transition cursor-pointer";
        item.onclick = () => openChapterPdf(chap.url, chap.name);
        item.innerHTML = `
            <div class="pr-2">
                <span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">CH-${index + 1}</span>
                <h5 class="font-semibold text-xs text-slate-800 dark:text-slate-200">${chap.name}</h5>
            </div>
            <div class="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-slate-500">
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </div>
        `;
        chapContainer.appendChild(item);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
}

function goBackToHome() {
    document.getElementById('tab-book-detail').classList.add('hidden');
    document.getElementById('tab-home').classList.remove('hidden');
}

// My Books Bookmark Toggle Logic
function toggleSaveBook(bookId) {
    if(myBooks.includes(bookId)) {
        myBooks = myBooks.filter(id => id !== bookId);
    } else {
        myBooks.push(bookId);
    }
    localStorage.setItem('my_saved_books', JSON.stringify(myBooks));
    openBookDetail(bookId); // Refresh detail view button state
}

function renderMyBooks() {
    const container = document.getElementById('my-books-container');
    container.innerHTML = '';

    const savedList = booksData.filter(b => myBooks.includes(b.id));

    if(savedList.length === 0) {
        container.innerHTML = `<div class="col-span-2 text-center py-16 text-slate-400 text-xs">No books saved in My Books yet. Tap 'Add to My Books' on any book!</div>`;
        return;
    }

    savedList.forEach(book => {
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs cursor-pointer";
        card.onclick = () => openBookDetail(book.id);
        card.innerHTML = `
            <div class="relative w-full h-36 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden mb-2">
                <img src="${book.cover}" alt="${book.title}" class="h-full w-full object-cover">
            </div>
            <div>
                <span class="text-[9px] font-bold text-emerald-600 uppercase">Saved Book</span>
                <h4 class="font-bold text-xs line-clamp-2">${book.title}</h4>
            </div>
        `;
        container.appendChild(card);
    });
}

// Smooth Loader & Background PDF Opening (As requested & Image 2537.jpg)
function openChapterPdf(url, title) {
    const loader = document.getElementById('loaderModal');
    const pdfModal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfFrame');
    
    // Show loader with avatar & text
    loader.classList.remove('hidden');

    // Fallback or preview link handling
    const targetUrl = url ? url : 'https://drive.google.com/file/d/1_sample_preview_id/preview';

    // Simulate smooth background loading
    setTimeout(() => {
        frame.src = targetUrl;
        document.getElementById('pdfModalTitle').innerText = title;
        loader.classList.add('hidden');
        pdfModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }, 1200);
}

function closePdfModal() {
    document.getElementById('pdfModal').classList.add('hidden');
    document.getElementById('pdfFrame').src = '';
    document.body.style.overflow = 'auto'
  }

// Settings & Theme Toggling (White Mode & Dark Mode)
function toggleSettingsModal() {
    const modal = document.getElementById('settingsModal');
    modal.classList.toggle('hidden');
}

function setTheme(mode) {
    const html = document.documentElement;
    if(mode === 'dark') {
        html.classList.add('dark');
        localStorage.setItem('app_theme', 'dark');
    } else {
        html.classList.remove('dark');
        localStorage.setItem('app_theme', 'light');
    }
    toggleSettingsModal();
}

// Load saved theme preference on start
if(localStorage.getItem('app_theme') === 'dark') {
    document.documentElement.classList.add('dark');
}
