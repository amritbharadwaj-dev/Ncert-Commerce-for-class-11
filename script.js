// ==========================================================================
// CLASS 11 COMMERCE NCERT READER - FULLY FIXED SCRIPT.JS
// ==========================================================================

const booksData = [
    {
        id: 'acc1',
        title: { en: 'Accountancy Part I (Financial Accounting)', hi: 'लेखाशास्त्र भाग १ (वित्तीय लेखांकन)' },
        cover: { en: 'images/acc1_en_cover.jpg', hi: 'images/acc1_hi_cover.jpg' },
        chapters: [
            { name: { en: 'CH-1: Introduction to Accounting', hi: 'अध्याय-१: लेखांकन का परिचय' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_ACC1_CH1', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_ACC1_CH1' },
            { name: { en: 'CH-2: Theory Base of Accounting', hi: 'अध्याय-२: लेखांकन के सैद्धांतिक आधार' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_ACC1_CH2', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_ACC1_CH2' },
            { name: { en: 'CH-3: Recording of Transactions - I', hi: 'अध्याय-३: लेन-देन का अभिलेखन - १' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_ACC1_CH3', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_ACC1_CH3' },
            { name: { en: 'CH-4: Recording of Transactions - II', hi: 'अध्याय-४: लेन-देन का अभिलेखन - २' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_ACC1_CH4', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_ACC1_CH4' },
            { name: { en: 'CH-5: Bank Reconciliation Statement', hi: 'अध्याय-५: बैंक समाधान विवरण' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_ACC1_CH5', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_ACC1_CH5' },
            { name: { en: 'CH-6: Trial Balance and Rectification of Errors', hi: 'अध्याय-६: तलपट और अशुद्धियों का संशोधन' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_ACC1_CH6', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_ACC1_CH6' },
            { name: { en: 'CH-7: Depreciation, Provisions and Reserves', hi: 'अध्याय-७: हास, प्रावधान और संचय' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_ACC1_CH7', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_ACC1_CH7' },
            { name: { en: 'CH-8: Bill of Exchange', hi: 'अध्याय-८: विनिमय पत्र' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_ACC1_CH8', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_ACC1_CH8' }
        ]
    },
    {
        id: 'acc2',
        title: { en: 'Accountancy Part II', hi: 'लेखाशास्त्र भाग २' },
        cover: { en: 'images/acc2_en_cover.jpg', hi: 'images/acc2_hi_cover.jpg' },
        chapters: [
            { name: { en: 'CH-1: Financial Statements - I', hi: 'अध्याय-१: वित्तीय विवरण - १' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_ACC2_CH1', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_ACC2_CH1' },
            { name: { en: 'CH-2: Financial Statements - II', hi: 'अध्याय-२: वित्तीय विवरण - २' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_ACC2_CH2', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_ACC2_CH2' },
            { name: { en: 'CH-3: Accounts from Incomplete Records', hi: 'अध्याय-३: अधूरे अभिलेखों से खाते' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_ACC2_CH3', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_ACC2_CH3' },
            { name: { en: 'CH-4: Applications of Computers in Accounting', hi: 'अध्याय-४: लेखांकन में कंप्यूटर के अनुप्रयोग' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_ACC2_CH4', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_ACC2_CH4' }
        ]
    },
    {
        id: 'bst',
        title: { en: 'Business Studies', hi: 'व्यवसाय अध्ययन' },
        cover: { en: 'images/bst_en_cover.jpg', hi: 'images/bst_hi_cover.jpg' },
        chapters: [
            { name: { en: 'CH-1: Business, Trade and Commerce', hi: 'अध्याय-१: व्यवसाय, व्यापार और वाणिज्य' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_BST_CH1', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_BST_CH1' },
            { name: { en: 'CH-2: Forms of Business Organisation', hi: 'अध्याय-२: व्यवसाय संगठन के स्वरूप' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_BST_CH2', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_BST_CH2' },
            { name: { en: 'CH-3: Private, Public and Global Enterprises', hi: 'अध्याय-३: निजी, सार्वजनिक एवं भूमंडलीय उपक्रम' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_BST_CH3', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_BST_CH3' },
            { name: { en: 'CH-4: Business Services', hi: 'अध्याय-४: व्यावसायिक सेवाएं' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_BST_CH4', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_BST_CH4' },
            { name: { en: 'CH-5: Emerging Modes of Business', hi: 'अध्याय-५: व्यवसाय के उभरते हुए तरीके' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_BST_CH5', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_BST_CH5' },
            { name: { en: 'CH-6: Social Responsibilities of Business', hi: 'अध्याय-६: व्यवसाय की सामाजिक जिम्मेदारियां' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_BST_CH6', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_BST_CH6' },
            { name: { en: 'CH-7: Formation of a Company', hi: 'अध्याय-७: कंपनी की स्थापना' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_BST_CH7', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_BST_CH7' },
            { name: { en: 'CH-8: Sources of Business Finance', hi: 'अध्याय-८: व्यवसाय के वित्त के स्रोत' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_BST_CH8', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_BST_CH8' },
            { name: { en: 'CH-9: Small Business', hi: 'अध्याय-९: लघु व्यवसाय' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_BST_CH9', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_BST_CH9' },
            { name: { en: 'CH-10: Internal Trade', hi: 'अध्याय-१०: आंतरिक व्यापार' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_BST_CH10', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_BST_CH10' },
            { name: { en: 'CH-11: International Business', hi: 'अध्याय-११: अंतर्राष्ट्रीय व्यापार' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_BST_CH11', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_BST_CH11' }
        ]
    },
    {
        id: 'eco_ied',
        title: { en: 'Indian Economic Development', hi: 'भारतीय आर्थिक विकास' },
        cover: { en: 'images/eco_ied_en_cover.jpg', hi: 'images/eco_ied_hi_cover.jpg' },
        chapters: [
            { name: { en: 'CH-1: Indian Economy on the Eve of Independence', hi: 'अध्याय-१: स्वतंत्रता की पूर्वसंध्या पर भारतीय अर्थव्यवस्था' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_IED_CH1', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_IED_CH1' },
            { name: { en: 'CH-2: Indian Economy 1950-1990', hi: 'अध्याय-२: भारतीय अर्थव्यवस्था १९५०-१९९०' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_IED_CH2', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_IED_CH2' },
            { name: { en: 'CH-3: Liberalisation, Privatisation and Globalisation', hi: 'अध्याय-३: उदारीकरण, निजीकरण और वैश्वीकरण' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_IED_CH3', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_IED_CH3' },
            { name: { en: 'CH-4: Human Capital Formation in India', hi: 'अध्याय-४: भारत में मानव पूंजी का निर्माण' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_IED_CH4', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_IED_CH4' },
            { name: { en: 'CH-5: Rural Development', hi: 'अध्याय-५: ग्रामीण विकास' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_IED_CH5', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_IED_CH5' },
            { name: { en: 'CH-6: Employment: Growth, Informalisation and Other Issues', hi: 'अध्याय-६: रोजगार: वृद्धि, अनौपचारिकीकरण और अन्य मुद्दे' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_IED_CH6', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_IED_CH6' },
            { name: { en: 'CH-7: Environment and Sustainable Development', hi: 'अध्याय-७: पर्यावरण और सतत विकास' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_IED_CH7', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_IED_CH7' },
            { name: { en: 'CH-8: Comparative Development Experiences of India and Neighbours', hi: 'अध्याय-८: भारत और उसके पड़ोसी देशों के विकास के तुलनात्मक अनुभव' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_IED_CH8', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_IED_CH8' }
        ]
    },
    {
        id: 'eco_stats',
        title: { en: 'Statistics for Economics', hi: 'अर्थशास्त्र के लिए सांख्यिकी' },
        cover: { en: 'images/eco_stats_en_cover.jpg', hi: 'images/eco_stats_hi_cover.jpg' },
        chapters: [
            { name: { en: 'CH-1: Introduction to Statistics', hi: 'अध्याय-१: सांख्यिकी का परिचय' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_STATS_CH1', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_STATS_CH1' },
            { name: { en: 'CH-2: Collection of Data', hi: 'अध्याय-२: आंकड़ों का संग्रहण' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_STATS_CH2', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_STATS_CH2' },
            { name: { en: 'CH-3: Organisation of Data', hi: 'अध्याय-३: आंकड़ों का संगठन' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_STATS_CH3', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_STATS_CH3' },
            { name: { en: 'CH-4: Presentation of Data', hi: 'अध्याय-४: आंकड़ों का प्रस्तुतीकरण' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_STATS_CH4', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_STATS_CH4' },
            { name: { en: 'CH-5: Measures of Central Tendency', hi: 'अध्याय-५: केंद्रीय प्रवृत्ति की माप' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_STATS_CH5', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_STATS_CH5' },
            { name: { en: 'CH-6: Measures of Dispersion', hi: 'अध्याय-६: अपकिरण के माप' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_STATS_CH6', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_STATS_CH6' },
            { name: { en: 'CH-7: Correlation', hi: 'अध्याय-७: सहसंबंध' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_STATS_CH7', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_STATS_CH7' },
            { name: { en: 'CH-8: Index Numbers', hi: 'अध्याय-८: सूचकांक' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_STATS_CH8', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_STATS_CH8' }
        ]
    },
    {
        id: 'maths',
        title: { en: 'Applied Mathematics', hi: 'व्यावहारिक गणित' },
        cover: { en: 'images/maths_en_cover.jpg', hi: 'images/maths_hi_cover.jpg' },
        chapters: [
            { name: { en: 'CH-1: Numbers, Quantification and Numerical Applications', hi: 'अध्याय-१: संख्याएं, परिमाणीकरण और संख्यात्मक अनुप्रयोग' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_CH1', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_CH1' },
            { name: { en: 'CH-2: Indices, Logarithms and Antilogarithms', hi: 'अध्याय-२: घातांक, लघुगणक और प्रतिलघुगणक' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_CH2', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_CH2' },
            { name: { en: 'CH-3: Mensuration', hi: 'अध्याय-३: क्षेत्रमिति (Mensuration)' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_CH3', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_CH3' },
            { name: { en: 'CH-4: Quantitative Aptitude', hi: 'अध्याय-४: मात्रात्मक योग्यता' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_CH4', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_CH4' },
            { name: { en: 'CH-5: Permutations and Combinations', hi: 'अध्याय-५: क्रमचय और संचय' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_CH5', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_CH5' },
            { name: { en: 'CH-6: Sequence and Series (AP & GP)', hi: 'अध्याय-६: अनुक्रम और श्रेणियाँ (AP और GP)' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_CH6', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_CH6' },
            { name: { en: 'CH-7: Sets and Relations', hi: 'अध्याय-७: समुच्चय और संबंध' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_CH7', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_CH7' },
            { name: { en: 'CH-8: Functions', hi: 'अध्याय-८: फलन (Functions)' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_CH8', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_CH8' },
            { name: { en: 'CH-9: Limits and Continuity', hi: 'अध्याय-९: सीमा और सांतत्य' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_CH9', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_CH9' },
            { name: { en: 'CH-10: Differentiation', hi: 'अध्याय-१०: अवकलन (Differentiation)' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_CH10', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_CH10' },
            { name: { en: 'CH-11: Probability', hi: 'अध्याय-११: प्रायिकता (Probability)' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_CH11', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_CH11' },
            { name: { en: 'CH-12: Index Numbers and Time-Based Data', hi: 'अध्याय-१२: सूचकांक और समय-आधारित डेटा' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_CH12', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_CH12' },
            { name: { en: 'CH-13: Perpetuity, Sinking Funds and Annuities', hi: 'अध्याय-१३: वार्षिकी, सिंकिंग फंड और शाश्वतता' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_CH13', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_CH13' },
            { name: { en: 'CH-14: Basic Trigonometry', hi: 'अध्याय-१४: बुनियादी त्रिकोणमिति' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_CH14', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_CH14' },
            { name: { en: 'Answers / Appendix', hi: 'उत्तर माला (Answers)' }, url_en: 'YAHAN_ENGLISH_WALA_LINK_LAGAYE_MATHS_ANS', url_hi: 'YAHAN_HINDI_WALA_LINK_LAGAYE_MATHS_ANS' }
        ]
    }
];

let currentMedium = 'en';
let activeBook = null;

// Initialization on Window Load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const skeleton = document.getElementById('skeleton-screen');
        if(skeleton) {
            skeleton.style.opacity = '0';
            setTimeout(() => {
                skeleton.style.display = 'none';
                const container = document.getElementById('app-container');
                if(container) container.classList.remove('opacity-0');
            }, 300);
        }
    }, 1200);

    renderBooks();
    loadThemePreference();
});

// Switch Medium (English / Hindi)
function setMedium(medium) {
    currentMedium = medium;
    if(medium === 'en') {
        const tabEn = document.getElementById('tab-en');
        const tabHi = document.getElementById('tab-hi');
        if(tabEn) tabEn.className = "flex-1 py-2 text-sm font-semibold rounded-lg bg-white dark:bg-gray-700 shadow-sm transition";
        if(tabHi) tabHi.className = "flex-1 py-2 text-sm font-semibold rounded-lg text-gray-500 dark:text-gray-400 transition";
    } else {
        const tabEn = document.getElementById('tab-en');
        const tabHi = document.getElementById('tab-hi');
        if(tabHi) tabHi.className = "flex-1 py-2 text-sm font-semibold rounded-lg bg-white dark:bg-gray-700 shadow-sm transition";
        if(tabEn) tabEn.className = "flex-1 py-2 text-sm font-semibold rounded-lg text-gray-500 dark:text-gray-400 transition";
    }
    renderBooks();
}

// Render Books on Home Screen Grid
function renderBooks() {
    const grid = document.getElementById('books-grid');
    if(!grid) return;
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
    if(!activeBook) return;

    const detailCover = document.getElementById('detail-cover');
    const detailTitle = document.getElementById('detail-title');
    if(detailCover) detailCover.src = activeBook.cover[currentMedium];
    if(detailTitle) detailTitle.innerText = activeBook.title[currentMedium];
    
    updateBookmarkButtonState();

    const list = document.getElementById('chapters-list');
    if(list) {
        list.innerHTML = '';
        activeBook.chapters.forEach((ch) => {
            const item = document.createElement('div');
            item.className = "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm flex items-center justify-between border border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50";
            item.setAttribute('onclick', `openChapterByMedium('${ch.name[currentMedium]}', '${ch.url_en}', '${ch.url_hi}')`);
            item.innerHTML = `
                <span class="text-sm font-medium">${ch.name[currentMedium]}</span>
                <i class="fa-solid fa-file-pdf text-red-500 text-lg"></i>
            `;
            list.appendChild(item);
        });
    }

    switchView('view-chapters');
}

// Function to handle medium-specific links
function openChapterByMedium(title, urlEn, urlHi) {
    const selectedUrl = (currentMedium === 'hi') ? urlHi : urlEn;
    openPdfChapter(title, selectedUrl);
}

// Open PDF Viewer Screen with Loading Animation (Screen 3)
function openPdfChapter(title, url) {
    const pdfTitle = document.getElementById('pdf-title');
    if(pdfTitle) pdfTitle.innerText = title;
    switchView('view-pdf');
    
    const loader = document.getElementById('pdf-loader');
    const iframe = document.getElementById('pdf-frame');
    const bar = document.getElementById('progress-bar');
    
    if(loader) loader.style.display = 'flex';
    if(iframe) iframe.classList.add('hidden');
    if(bar) bar.style.width = '0%';

    let progress = 0;
    const interval = setInterval(() => {
        progress += 20;
        if(bar) bar.style.width = progress + '%';
        if(progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                if(loader) loader.style.display = 'none';
                if(iframe) {
                    iframe.src = url;
                    iframe.classList.remove('hidden');
                }
            }, 300);
        }
    }, 200);
}

function closePdfViewer() {
    switchView('view-chapters');
}

// Local Storage for "My Books" / Bookmarking
function toggleBookmark() {
    if(!activeBook) return;
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
    if(!activeBook) return;
    let savedBooks = JSON.parse(localStorage.getItem('my_saved_books')) || [];
    const btn = document.getElementById('bookmark-btn');
    if(!btn) return;
    
    const isSaved = savedBooks.some(b => b.id === activeBook.id);
    
    if(isSaved) {
        btn.innerHTML = `<i class="fa-solid fa-check"></i> Saved in My Books`;
        btn.className = "bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md";
    } else {
        btn.innerHTML = `<i class="fa-solid fa-bookmark"></i> Add to My Books`;
        btn.className = "bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md";
    }
}

// Render My Books View (Fully Fixed & Restored)
function renderMyBooks() {
    const grid = document.getElementById('mybooks-grid');
    if(!grid) return;
    grid.innerHTML = '';
    let savedBooks = JSON.parse(localStorage.getItem('my_saved_books')) || [];
    
    if(savedBooks.length === 0) {
        grid.innerHTML = `<p class="text-sm text-gray-400 col-span-2 text-center py-10">No saved books yet. Add books from explore screen!</p>`;
        return;
    }

    savedBooks.forEach(book => {
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between cursor-pointer hover:shadow-md transition";
        card.setAttribute('onclick', `openBookDetail('${book}$`).
                                                        
