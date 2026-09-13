const booksData = [
    {
        id: "acc_1",
        title: "Accountancy Part I",
        medium: "EN",
        mediumName: "English Medium",
        cover: "https://via.placeholder.com/150",
        chapters: [
            { title: "CH-1: Introduction to Accounting", pages: "1 - 18", fileId: "SAMPLE_ID_1" },
            { title: "CH-2: Theory Base of Accounting", pages: "19 - 35", fileId: "SAMPLE_ID_2" },
            { title: "CH-3: Recording of Transactions - I", pages: "36 - 65", fileId: "SAMPLE_ID_3" }
        ]
    },
    {
        id: "acc_1_hi",
        title: "लेखाशास्त्र भाग - 1",
        medium: "HI",
        mediumName: "Hindi Medium",
        cover: "https://via.placeholder.com/150",
        chapters: [
            { title: "अध्याय 1: लेखांकन परिचय", pages: "1 - 18", fileId: "SAMPLE_ID_4" },
            { title: "अध्याय 2: लेखांकन के सैद्धांतिक आधार", pages: "19 - 35", fileId: "SAMPLE_ID_5" }
        ]
    },
    {
        id: "acc_2",
        title: "Accountancy Part II",
        medium: "EN",
        mediumName: "English Medium",
        cover: "https://via.placeholder.com/150",
        chapters: [
            { title: "CH-1: Financial Statements - I", pages: "1 - 25", fileId: "SAMPLE_ID_6" },
            { title: "CH-2: Accounts from Incomplete Records", pages: "26 - 50", fileId: "SAMPLE_ID_7" }
        ]
    },
    {
        id: "acc_2_hi",
        title: "लेखाशास्त्र भाग - 2",
        medium: "HI",
        mediumName: "Hindi Medium",
        cover: "https://via.placeholder.com/150",
        chapters: [
            { title: "अध्याय 1: वित्तीय विवरण - I", pages: "1 - 25", fileId: "SAMPLE_ID_8" }
        ]
    },
    {
        id: "bs_1",
        title: "Business Studies",
        medium: "EN",
        mediumName: "English Medium",
        cover: "https://via.placeholder.com/150",
        chapters: [
            { title: "CH-1: Nature and Purpose of Business", pages: "1 - 20", fileId: "SAMPLE_ID_9" },
            { title: "CH-2: Forms of Business Organisation", pages: "21 - 45", fileId: "SAMPLE_ID_10" }
        ]
    },
    {
        id: "bs_1_hi",
        title: "व्यवसाय अध्ययन",
        medium: "HI",
        mediumName: "Hindi Medium",
        cover: "https://via.placeholder.com/150",
        chapters: [
            { title: "अध्याय 1: व्यवसाय की प्रकृति एवं उद्देश्य", pages: "1 - 20", fileId: "SAMPLE_ID_11" }
        ]
    },
    {
        id: "ent_1",
        title: "Entrepreneurship",
        medium: "EN",
        mediumName: "English Medium",
        cover: "https://via.placeholder.com/150",
        chapters: [
            { title: "CH-1: Entrepreneurship: Concepts", pages: "1 - 15", fileId: "SAMPLE_ID_12" }
        ]
    },
    {
        id: "ent_1_hi",
        title: "उद्यमिता",
        medium: "HI",
        mediumName: "Hindi Medium",
        cover: "https://via.placeholder.com/150",
        chapters: [
            { title: "अध्याय 1: उद्यमिता: स्वरूप एवं महत्व", pages: "1 - 15", fileId: "SAMPLE_ID_13" }
        ]
    },
    {
        id: "eco_1",
        title: "Statistics for Economics",
        medium: "EN",
        mediumName: "English Medium",
        cover: "https://via.placeholder.com/150",
        chapters: [
            { title: "CH-1: Introduction to Statistics", pages: "1 - 14", fileId: "SAMPLE_ID_14" }
        ]
    },
    {
        id: "eco_1_hi",
        title: "अर्थशास्त्र के लिए सांख्यिकी",
        medium: "HI",
        mediumName: "Hindi Medium",
        cover: "https://via.placeholder.com/150",
        chapters: [
            { title: "अध्याय 1: सांख्यिकी परिचय", pages: "1 - 14", fileId: "SAMPLE_ID_15" }
        ]
    },
    {
        id: "eng_1",
        title: "English Class 11",
        medium: "EN",
        mediumName: "English Medium",
        cover: "https://via.placeholder.com/150",
        chapters: [
            { title: "Unit 1: Prose Section", pages: "1 - 30", fileId: "SAMPLE_ID_16" }
        ]
    },
    {
        id: "hin_1",
        title: "Hindi Digant Part 1",
        medium: "HI",
        mediumName: "Hindi Medium",
        cover: "https://via.placeholder.com/150",
        chapters: [
            { title: "पाठ 1: गद्य खंड", pages: "1 - 28", fileId: "SAMPLE_ID_17" }
        ]
    },
    {
        id: "comp_1",
        title: "Computer Science",
        medium: "EN",
        mediumName: "English Medium",
        cover: "https://via.placeholder.com/150",
        chapters: [
            { title: "CH-1: Computer System Overview", pages: "1 - 40", fileId: "SAMPLE_ID_18" }
        ]
    },
    {
        id: "b_math",
        title: "Business Mathematics",
        medium: "EN",
        mediumName: "English Medium",
        cover: "https://via.placeholder.com/150",
        chapters: [
            { title: "CH-1: Ratio and Proportion", pages: "1 - 22", fileId: "SAMPLE_ID_19" }
        ]
    }
];
