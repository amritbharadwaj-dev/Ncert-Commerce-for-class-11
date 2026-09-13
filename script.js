// Sample Data Render Logic (Baad me isko data.js me shift kar lenge)
const sampleBooks = [
    { id: 1, title: "Accountancy Part I", medium: "EN", mediumName: "English Medium", cover: "https://via.placeholder.com/100" },
    { id: 2, title: "लेखाशास्त्र भाग - 1", medium: "HI", mediumName: "Hindi Medium", cover: "https://via.placeholder.com/100" },
    { id: 3, title: "Business Studies", medium: "EN", mediumName: "English Medium", cover: "https://via.placeholder.com/100" },
    { id: 4, title: "व्यवसाय अध्ययन", medium: "HI", mediumName: "Hindi Medium", cover: "https://via.placeholder.com/100" },
    { id: 5, title: "Economics / Business Math", medium: "EN", mediumName: "English Medium", cover: "https://via.placeholder.com/100" }
];

document.addEventListener("DOMContentLoaded", () => {
    renderBanner();
    renderBooks(sampleBooks);
});

function renderBanner() {
    const slider = document.getElementById("bannerSlider");
    slider.innerHTML = sampleBooks.map(book => `
        <div class="banner-card">
            <img src="${book.cover}" alt="${book.title}">
            <div class="banner-info">
                <h3>${book.title}</h3>
                <p>BSEB Class 11 Commerce (${book.mediumName})</p>
            </div>
        </div>
    `).join('');
}

function renderBooks(books) {
    const grid = document.getElementById("booksGrid");
    grid.innerHTML = books.map(book => `
        <div class="book-card">
            <div>
                <img src="${book.cover}" alt="${book.title}">
                <h4>${book.title}</h4>
                <p>Class 11 • ${book.mediumName}</p>
            </div>
            <button class="view-btn" onclick="openBook(${book.id})">View Chapters</button>
        </div>
    `).join('');
}

function filterBooks(medium) {
    // Update active button state
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (medium === 'all') {
        renderBooks(sampleBooks);
    } else {
        const filtered = sampleBooks.filter(b => b.medium === medium);
        renderBooks(filtered);
    }
}

function openBook(bookId) {
    alert("Book details screen will open here for Book ID: " + bookId);
}

function openSettings() {
    alert("Settings screen coming soon!");
}

function switchTab(tabName) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');
}
