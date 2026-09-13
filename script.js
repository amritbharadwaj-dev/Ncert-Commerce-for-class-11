// Complete 14 Books Database with All Real Chapters (NCERT / Bihar Board)
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
            { name: 'Ch 6: Trial Balance and Rectification of Errors', url: '' },
            { name: 'Ch 7: Depreciation, Provisions and Reserves', url: '' },
            { name: 'Ch 8: Bill of Exchange', url: '' }
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
            { name: 'अध्याय 6: तलपट एवं अशुद्धियों का सुधार', url: '' },
            { name: 'अध्याय 7: ह्रास, प्रावधान तथा संचय', url: '' },
            { name: 'अध्याय 8: विनिमय विपपत्र', url: '' }
        ]
    },
    {
        id: 'acc2_en',
        title: 'Accountancy Part II (Class XI)',
        medium: 'English Medium',
        cover: 'images/acc2_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Financial Statements - I', url: '' },
            { name: 'Ch 2: Financial Statements - II', url: '' },
            { name: 'Ch 3: Accounts from Incomplete Records', url: '' },
            { name: 'Ch 4: Applications of Computers in Accounting', url: '' },
            { name: 'Ch 5: Computerised Accounting System', url: '' }
        ]
    },
    {
        id: 'acc2_hi',
        title: 'लेखाशास्त्र भाग 2 (कक्षा XI)',
        medium: 'Hindi Medium',
        cover: 'images/acc2_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: वित्तीय विवरण - I', url: '' },
            { name: 'अध्याय 2: वित्तीय विवरण - II', url: '' },
            { name: 'अध्याय 3: अधूरे अभिलेखों से खाते', url: '' },
            { name: 'अध्याय 4: लेखांकन में कंप्यूटर के अनुप्रयोग', url: '' },
            { name: 'अध्याय 5: कंप्यूटरीकृत लेखांकन प्रणाली', url: '' }
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
            { name: 'Ch 8: Comparative Development Experiences', url: '' }
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
            { name: 'अध्याय 6: रोजगार एवं वृद्धि', url: '' },
            { name: 'अध्याय 7: पर्यावरण और सतत विकास', url: '' },
            { name: 'अध्याय 8: भारत और पड़ोसी देशों के तुलनात्मक विकास अनुभव', url: '' }
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
            { name: 'अध्याय 6: अपकिरण के माप', url: '' },
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
            { name: 'Ch 11: Three Dimensional Geometry', url: '' },
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
            { name: 'अध्याय 11: त्रिविमीय ज्यामिति', url: '' },
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
            { name: 'Hornbill Ch 3: Discovering Tut', url: '' },
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
            { name: 'आरोह पाठ 3: अप्पू के साथ ढाई साल', url: '' },
            { name: 'वितान पाठ 1: भारतीय गायिकाओं में बेजोड़ - लता मंगेशकर', url: '' },
            { name: 'वितान पाठ 2: राजस्थान की रजत बूंदें', url: '' }
        ]
    }
];

let myBooks = JSON.parse(localStorage.getItem('my_saved_books')) || [];
let currentSlideIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderBooksGrid('books-grid', booksData);
    renderSlider();
    renderMyBooks();

    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % 4;
        updateSliderPosition();
    }, 1000);
});

// Auto Slider
function renderSlider() {
    const slider = document.getElementById('banner-slider');
    const dots = document.getElementById('slider-dots');
    if(!slider || !dots) return;
    slider.innerHTML = '';
    dots.innerHTML = '';

    const featured = booksData.slice(0, 4);
    featured.forEach((book, idx) => {
        const slide = document.createElement('div');
        slide.className = "min-w-full h-full relative flex items-center px-6 bg-slate-900 text-white cursor-pointer";
        slide.onclick = () => openBookDetail(book.id);
        slide.innerHTML = `
            <div class="w-2/3 space-y-1">
                <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">${book.medium}</span>
                <h4 class="font-bold text-sm sm:text-base line-clamp-2">${book.title}</h4>
                <p class="text-xs text-slate-300">Tap to read chapters instantly</p>
            </div>
            <div class="w-1/3 flex justify-center">
                <img src="${book.cover}" alt="cover" class="h-32 object-contain rounded-lg shadow-md border border-white/20 bg-white/5 p-1">
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
        const dotsContainer = document.getElementById('slider-dots');
        if(dotsContainer) {
            const dots = dotsContainer.children;
            for(let i=0; i<dots.length; i++) {
                dots[i].className = `h-1.5 rounded-full transition-all duration-300 ${i === currentSlideIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`;
            }
        }
    }
}

// Render Books in Centered Grid with complete cover visibility
function renderBooksGrid(containerId, list) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = '';

    if(list.length === 0) {
        container.innerHTML = `<div class="col-span-2 text-center py-10 text-slate-400 text-xs">No books available.</div>`;
        return;
    }

    list.forEach(book => {
        const card = document.createElement('div');
        card.className = "bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs hover:border-slate-400 transition cursor-pointer text-center";
        card.onclick = () => openBookDetail(book.id);
        card.innerHTML = `
            <div class="relative w-full h-40 bg-white dark:bg-slate-950 rounded-xl overflow-hidden mb-2 flex items-center justify-center p-2 border border-slate-100 dark:border-slate-800">
                <img src="${book.cover}" alt="${book.title}" class="max-h-full max-w-full object-contain">
            </div>
            <div class="flex flex-col items-center">
                <span class="text-[9px] font-bold text-slate-500 uppercase">${book.medium}</span>
                <h4 class="font-bold text-xs line-clamp-2 text-slate-900 dark:text-slate-100 mt-0.5">${book.title}</h4>
                <p class="text-[10px] text-slate-400 mt-1">${book.chapters.length} Chapters</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Tab Navigation
function switchTab(tabName) {
    document.getElementById('tab-home').classList.add('hidden');
    document.getElementById('tab-mybooks').classList.add('hidden');
    document.getElementById('tab-settings').classList.add('hidden');
    document.getElementById('tab-book-detail').classList.add('hidden');

    document.getElementById('nav-home').className = "flex flex-col items-center text-slate-400 transition";
    document.getElementById('nav-mybooks').className = "flex flex-col items-center text-slate-400 transition";

    if(tabName === 'home') {
        document.getElementById('tab-home').classList.remove('hidden');
        document.getElementById('nav-home').className = "flex flex-col items-center text-slate-900 dark:text-white transition";
    } else if(tabName === 'mybooks') {
        document.getElementById('tab-mybooks').classList.remove('hidden');
        document.getElementById('nav-mybooks').className = "flex flex-col items-center text-slate-900 dark:text-white transition";
        renderMyBooks();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
}

function openSettingsPage() {
    document.getElementById('tab-home').classList.add('hidden');
    document.getElementById('tab-mybooks').classList.add('hidden');
    document.getElementById('tab-book-detail').classList.add('hidden');
    document.getElementById('tab-settings').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
}

function closeSettingsPage() {
    switchTab('home');
}

// Book Detail View
function openBookDetail(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if(!book) return;

    document.getElementById('tab-home').classList.add('hidden');
    document.getElementById('tab-mybooks').classList.add('hidden');
    document.getElementById('tab-settings').classList.add('hidden');
    document.getElementById('tab-book-detail').classList.remove('hidden');

    const isSaved = myBooks.includes(book.id);

    const header = document.getElementById('book-detail-header');
    header.innerHTML = `
        <div class="h-44 bg-white dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center">
            <img src="${book.cover}" alt="cover" class="max-h-full max-w-full object-contain">
        </div>
        <h3 class="font-bold text-base text-slate-900 dark:text-slate-100">${book.title}</h3>
        <p class="text-xs text-slate-500">${book.medium} • NCERT Edition</p>
        <button onclick="toggleSaveBook('${book.id}')" class="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${isSaved ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'}">
            <i data-lucide="${isSaved ? 'check' : 'bookmark'}" class="w-4 h-4"></i>
            <span>${isSaved ? 'Saved in My Books' : 'Add to My Books'}</span>
        </button>
    `;

    const chapContainer = document.getElementById('chapters-list-container');
    chapContainer.innerHTML = '';

    book.chapters.forEach((chap, index) => {
        const item = document.createElement('div');
        item.className = "bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center shadow-xs hover:border-slate-400 transition cursor-pointer";
        item.onclick = () => openChapterPdf(chap.url, chap.name);
        item.innerHTML = `
            <div class="pr-2 text-left">
                <span class="text-[10px] font-bold text-slate-500">CH-${index + 1}</span>
                <h5 class="font-semibold text-xs text-slate-900 dark:text-slate-100">${chap.name}</h5>
            </div>
            <div class="bg-white dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </div>
        `;
        chapContainer.appendChild(item);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
}

function goBackToHome() {
    switchTab('home');
}

// My Books LocalStorage Persistence Logic
function toggleSaveBook(bookId) {
    if(myBooks.includes(bookId)) {
        myBooks = myBooks.filter(id => id !== bookId);
    } else {
        myBooks.push(bookId);
    }
    localStorage.setItem('my_saved_books', JSON.stringify(myBooks));
    openBookDetail(bookId);
}

function renderMyBooks() {
    const container = document.getElementById('my-books-container');
    if(!container) return;
    container.innerHTML = '';

    const savedList = booksData.filter(b => myBooks.includes(b.id));

    if(savedList.length === 0) {
        container.innerHTML = `<div class="col-span-2 text-center py-16 text-slate-400 text-xs">No books saved in My Books yet. Tap 'Add to My Books' on any book!</div>`;
        return;
    }

    savedList.forEach(book => {
        const card = document.createElement('div');
        card.className = "bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs cursor-pointer text-center";
        card.onclick = () => openBookDetail(book.id);
        card.innerHTML = `
            <div class="relative w-full h-40 bg-white dark:bg-slate-950 rounded-xl overflow-hidden mb-2 flex items-center justify-center p-2 border border-slate-100 dark:border-slate-800">
                <img src="${book.cover}" alt="${book.title}" class="max-h-full max-w-full object-contain">
            </div>
             <div class="flex flex-col items-center">
                <span class="text-[9px] font-bold text-emerald-600 uppercase">Saved Book</span>
                <h4 class="font-bold text-xs line-clamp-2 text-slate-900 dark:text-slate-100 mt-0.5">${book.title}</h4>
            </div>
        `;
        container.appendChild(card);
    });
}

// PDF Loader
function openChapterPdf(url, title) {
    const loader = document.getElementById('loaderModal');
    const pdfModal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfFrame');
    
    loader.classList.remove('hidden');
    const targetUrl = url ? url : 'https://drive.google.com/file/d/1_sample_preview_id/preview';

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
    document.body.style.overflow = 'auto';
}

// Theme Handling (Light, Dark, Auto)
function setTheme(mode) {
    const html = document.documentElement;
    if(mode === 'dark') {
        html.classList.add('dark');
        localStorage.setItem('app_theme', 'dark');
    } else if(mode === 'light') {
        html.classList.remove('dark');
        localStorage.setItem('app_theme', 'light');
    } else {
        localStorage.removeItem('app_theme');
        if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }
    closeSettingsPage();
}

// Initial theme setup
const savedTheme = localStorage.getItem('app_theme');
if(savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
} else if(savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
}
     
