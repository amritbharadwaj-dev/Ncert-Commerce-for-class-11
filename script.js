// Core Logic & App Functionality (Pulls data from data.js)

let myBooks = JSON.parse(localStorage.getItem('my_saved_books')) || [];
let currentSlideIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    renderBooksGrid('books-grid', booksData);
    renderSlider();
    renderMyBooks();

    // Auto Slide Timer (Every 2 seconds)
    setInterval(() => {
        const featured = booksData.slice(0, 4);
        if (featured.length > 0) {
            currentSlideIndex = (currentSlideIndex + 1) % featured.length;
            updateSliderPosition();
        }
    }, 2000);
});

// Large Hero Banner Slider Renderer
function renderSlider() {
    const slider = document.getElementById('banner-slider');
    const dots = document.getElementById('slider-dots');
    if(!slider || !dots) return;
    
    slider.innerHTML = '';
    dots.innerHTML = '';

    const featured = booksData.slice(0, 4);
    featured.forEach((book, idx) => {
        const slide = document.createElement('div');
        slide.className = "min-w-full h-full relative flex items-center px-6 bg-slate-900 dark:bg-slate-900 text-white cursor-pointer select-none";
        slide.onclick = () => openBookDetail(book.id);
        slide.innerHTML = `
            <div class="w-2/3 space-y-2 pr-2">
                <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">${book.medium}</span>
                <h4 class="font-bold text-sm sm:text-base line-clamp-2 leading-tight">${book.title}</h4>
                <p class="text-xs text-slate-300">Tap to read chapters instantly</p>
            </div>
            <div class="w-1/3 flex justify-center">
                <img src="${book.cover}" alt="cover" class="h-36 object-contain rounded-xl shadow-lg border border-white/20 bg-white/5 p-1">
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

// Render Books Grid (Centered & Fully Visible Covers)
function renderBooksGrid(containerId, list) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = '';

    if(list.length === 0) {
        container.innerHTML = `<div class="col-span-2 text-center py-12 text-slate-400 text-xs font-semibold">No books found matching your search.</div>`;
        return;
    }

    list.forEach(book => {
        const card = document.createElement('div');
        card.className = "book-card ripple-btn bg-slate-50 dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between cursor-pointer text-center shadow-xs";
        card.onclick = () => openBookDetail(book.id);
        card.innerHTML = `
            <div class="relative w-full h-44 bg-white dark:bg-slate-950 rounded-xl overflow-hidden mb-2.5 flex items-center justify-center p-2 border border-slate-100 dark:border-slate-800">
                <img src="${book.cover}" alt="${book.title}" class="max-h-full max-w-full object-contain drop-shadow-sm">
            </div>
            <div class="flex flex-col items-center">
                <span class="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">${book.medium}</span>
                <h4 class="font-bold text-xs line-clamp-2 text-slate-900 dark:text-slate-100 mt-1 leading-snug">${book.title}</h4>
                <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-medium">${book.chapters.length} Chapters</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Live Search Filter Function
function handleSearch(query) {
    const q = query.toLowerCase().trim();
    const filtered = booksData.filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.medium.toLowerCase().includes(q)
    );
    renderBooksGrid('books-grid', filtered);
}

// Bottom Tab Switching Logic
function switchTab(tabName) {
    const homeTab = document.getElementById('tab-home');
    const myBooksTab = document.getElementById('tab-mybooks');
    const detailTab = document.getElementById('tab-book-detail');

    if(homeTab) homeTab.classList.add('hidden');
    if(myBooksTab) myBooksTab.classList.add('hidden');
    if(detailTab) detailTab.classList.add('hidden');

    const navHome = document.getElementById('nav-home');
    const navMyBooks = document.getElementById('nav-mybooks');

    if(navHome) navHome.className = "ripple-btn flex flex-col items-center text-slate-400 dark:text-slate-500 transition";
    if(navMyBooks) navMyBooks.className = "ripple-btn flex flex-col items-center text-slate-400 dark:text-slate-500 transition";

    if(tabName === 'home') {
        if(homeTab) homeTab.classList.remove('hidden');
        if(navHome) navHome.className = "ripple-btn flex flex-col items-center text-slate-900 dark:text-white transition";
        renderBooksGrid('books-grid', booksData);
    } else if(tabName === 'mybooks') {
        if(myBooksTab) myBooksTab.classList.remove('hidden');
        if(navMyBooks) navMyBooks.className = "ripple-btn flex flex-col items-center text-slate-900 dark:text-white transition";
        renderMyBooks();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Open Book Detail View
function openBookDetail(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if(!book) return;

    const homeTab = document.getElementById('tab-home');
    const myBooksTab = document.getElementById('tab-mybooks');
    const detailTab = document.getElementById('tab-book-detail');

    if(homeTab) homeTab.classList.add('hidden');
    if(myBooksTab) myBooksTab.classList.add('hidden');
    if(detailTab) detailTab.classList.remove('hidden');

    const isSaved = myBooks.includes(book.id);

    const header = document.getElementById('book-detail-header');
    if(header) {
        header.innerHTML = `
            <div class="h-48 bg-white dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-inner">
                <img src="${book.cover}" alt="cover" class="max-h-full max-w-full object-contain">
            </div>
            <h3 class="font-extrabold text-base text-slate-900 dark:text-slate-100">${book.title}</h3>
            <p class="text-xs font-semibold text-slate-500">${book.medium} • NCERT Edition</p>
            <button onclick="toggleSaveBook('${book.id}')" class="ripple-btn px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-sm ${isSaved ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800' : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'}">
                <i data-lucide="${isSaved ? 'check' : 'bookmark'}" class="w-4 h-4"></i>
                <span>${isSaved ? 'Saved in My Books' : 'Add to My Books'}</span>
            </button>
        `;
    }

    const chapContainer = document.getElementById('chapters-list-container');
    if(chapContainer) {
        chapContainer.innerHTML = '';
        book.chapters.forEach((chap, index) => {
            const item = document.createElement('div');
            item.className = "ripple-btn bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center shadow-xs hover:border-slate-400 transition cursor-pointer";
            item.onclick = () => openChapterPdf(chap.url, chap.name);
            item.innerHTML = `
                <div class="pr-2 text-left">
                    <span class="text-[10px] font-bold text-slate-400 uppercase">CH-${index + 1}</span>
                    <h5 class="font-bold text-xs text-slate-900 dark:text-slate-100 mt-0.5">${chap.name}</h5>
                </div>
                <div class="bg-white dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <i data-lucide="chevron-right" class="w-4 h-4"></i>
                </div>
            `;
            chapContainer.appendChild(item);
        });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function goBackToHome() {
    switchTab('home');
}

// LocalStorage My Books Management
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
        container.innerHTML = `<div class="col-span-2 text-center py-20 text-slate-400 text-xs font-semibold px-4">No books saved in My Books yet. Tap 'Add to My Books' on any book to save it here!</div>`;
        return;
    }

    savedList.forEach(book => {
        const card = document.createElement('div');
        card.className = "book-card ripple-btn bg-slate-50 dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between cursor-pointer text-center shadow-xs";
        card.onclick = () => openBookDetail(book.id);
        card.innerHTML = `
            <div class="relative w-full h-44 bg-white dark:bg-slate-950 rounded-xl overflow-hidden mb-2.5 flex items-center justify-center p-2 border border-slate-100 dark:border-slate-800">
                <img src="${book.cover}" alt="${book.title}" class="max-h-full max-w-full object-contain">
            </div>
            <div class="flex flex-col items-center">
                <span class="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Saved Book</span>
                <h4 class="font-bold text-xs line-clamp-2 text-slate-900 dark:text-slate-100 mt-1">${book.title}</h4>
            </div>
        `;
        container.appendChild(card);
    });
}

// Chapter PDF Loader with Custom Avatar & Progress
function openChapterPdf(url, title) {
    const loader = document.getElementById('loaderModal');
    const pdfModal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfFrame');
    
    if(loader) loader.classList.remove('hidden');
    const targetUrl = url ? url : 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

    setTimeout(() => {
        if(frame) frame.src = targetUrl;
        const modalTitle = document.getElementById('pdfModalTitle');
        if(modalTitle) modalTitle.innerText = title;
        if(loader) loader.classList.add('hidden');
        if(pdfModal) pdfModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }, 1200);
}

function closePdfModal() {
    const pdfModal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfFrame');
    if(pdfModal) pdfModal.classList.add('hidden');
    if(frame) frame.src = '';
    document.body.style.overflow = 'auto';
      }
