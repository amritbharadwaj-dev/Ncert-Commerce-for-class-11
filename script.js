document.addEventListener("DOMContentLoaded", () => {
    checkUserName();
    renderBanner();
    renderBooks(booksData);
});

// First time user name prompt
function checkUserName() {
    let userName = localStorage.getItem('bseb_user_name');
    if (!userName || userName.trim() === "") {
        userName = prompt("Welcome, Scholar! What is your name?");
        if (userName && userName.trim() !== "") {
            localStorage.setItem('bseb_user_name', userName.trim());
        } else {
            localStorage.setItem('bseb_user_name', "Scholar");
        }
    }
}

// Render top auto-scrolling banner (First 5 books)
function renderBanner() {
    const slider = document.getElementById("bannerSlider");
    const top5 = booksData.slice(0, 5);
    slider.innerHTML = top5.map(book => `
        <div class="banner-card">
            <img src="${book.cover}" alt="${book.title}">
            <div class="banner-info">
                <h3>${book.title}</h3>
                <p>BSEB Class 11 (${book.mediumName})</p>
            </div>
        </div>
    `).join('');
}

// Render all books in grid
function renderBooks(books) {
    const grid = document.getElementById("booksGrid");
    grid.innerHTML = books.map(book => `
        <div class="book-card">
            <div>
                <img src="${book.cover}" alt="${book.title}">
                <h4>${book.title}</h4>
                <p>Class 11 • ${book.mediumName}</p>
            </div>
            <button class="view-btn ripple-btn" onclick="openBookDetails('${book.id}')">View Chapters</button>
        </div>
    `).join('');
}

// Filter books by medium
function filterBooks(medium) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (medium === 'all') {
        renderBooks(booksData);
    } else {
        const filtered = booksData.filter(b => b.medium === medium);
        renderBooks(filtered);
    }
}

// Open Book Details (Second Screenshot UI view simulation)
function openBookDetails(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;

    const mainContainer = document.querySelector('.main-container');
    mainContainer.innerHTML = `
        <button class="filter-btn ripple-btn" onclick="location.reload()" style="margin-bottom: 15px;">← Back to Home</button>
        <div style="text-align: center; margin-bottom: 20px; background: #f9f9f9; padding: 20px; border-radius: 12px;">
            <img src="${book.cover}" style="width: 110px; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <h3 style="font-size: 1.1rem; font-weight: 700;">${book.title}</h3>
            <p style="font-size: 0.8rem; color: #666; margin-bottom: 12px;">BSEB Class 11 • ${book.mediumName}</p>
            <button class="view-btn ripple-btn" style="max-width: 160px; margin: 0 auto;">Add to My Books</button>
        </div>
        <div style="background: #fff; border-radius: 12px; border: 1px solid #eee;">
            ${book.chapters.map((ch, index) => `
                <div onclick="simulateChapterLoad('${book.title}', '${ch.title}')" style="padding: 15px; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                    <div>
                        <span style="font-size: 0.75rem; color: #888; font-weight: 600;">CH-${index + 1}</span>
                        <h4 style="font-size: 0.9rem; font-weight: 600; color: #000; margin-top: 2px;">${ch.title}</h4>
                    </div>
                    <span style="font-size: 0.8rem; color: #666;">Pages ${ch.pages} &gt;</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Chapter Loading Screen trigger with Progress Bar
function simulateChapterLoad(bookTitle, chapterTitle) {
    const loadingScreen = document.getElementById('chapterLoadingScreen');
    loadingScreen.style.display = 'flex';

    setTimeout(() => {
        loadingScreen.style.display = 'none';
        alert(`Successfully opened: ${bookTitle} -> ${chapterTitle}\n(Local PDF Viewer & Highlighting view will render here)`);
    }, 1200);
}

function openChat() {
    window.open("https://t.me/the_amrit_bharadwaj73", "_blank");
}

function openSettings() {
    alert("Settings screen opens here.");
}

function switchTab(tabName) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');
}
