const booksData = [
    {
        id: 'acc1_en',
        title: 'Accountancy Part I (Class XI)',
        medium: 'English Medium',
        cover: 'images/acc1_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Introduction to Accounting', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 2: Theory Base of Accounting', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 3: Recording of Transactions - I', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 4: Recording of Transactions - II', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 5: Bank Reconciliation Statement', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 6: Trial Balance and Rectification of Errors', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 7: Depreciation, Provisions and Reserves', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 8: Bill of Exchange', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' }
        ]
    },
    {
        id: 'acc1_hi',
        title: 'लेखाशास्त्र भाग 1 (कक्षा XI)',
        medium: 'Hindi Medium',
        cover: 'images/acc1_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: लेखांकन परिचय', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 2: लेखांकन का सैद्धांतिक आधार', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 3: लेन-देनों का अभिलेखन - I', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 4: लेन-देनों का अभिलेखन - II', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 5: बैंक समाधान विवरण', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 6: तलपट एवं अशुद्धियों का सुधार', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 7: ह्रास, प्रावधान तथा संचय', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 8: विनिमय विपपत्र', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' }
        ]
    },
    {
        id: 'acc2_en',
        title: 'Accountancy Part II (Class XI)',
        medium: 'English Medium',
        cover: 'images/acc2_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Financial Statements - I', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 2: Financial Statements - II', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' }
        ]
    },
    {
        id: 'acc2_hi',
        title: 'लेखाशास्त्र भाग 2 (कक्षा XI)',
        medium: 'Hindi Medium',
        cover: 'images/acc2_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: वित्तीय विवरण - I', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 2: वित्तीय विवरण - II', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' }
        ]
    },
    {
        id: 'bst_en',
        title: 'Business Studies (Class XI)',
        medium: 'English Medium',
        cover: 'images/bst_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Nature and Purpose of Business', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 2: Forms of Business Organisation', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 3: Private, Public and Global Enterprises', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 4: Business Services', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 5: Emerging Modes of Business', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 6: Social Responsibilities of Business', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 7: Sources of Business Finance', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 8: Small Business', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 9: Internal Trade', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 10: International Business - I', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 11: International Business - II', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' }
        ]
    },
    {
        id: 'bst_hi',
        title: 'व्यवसाय अध्ययन (कक्षा XI)',
        medium: 'Hindi Medium',
        cover: 'images/bst_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: व्यवसाय की प्रकृति एवं उद्देश्य', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 2: व्यावसायिक संगठन के स्वरूप', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 3: निजी, सार्वजनिक एवं भूमंडलीय उपक्रम', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 4: व्यावसायिक सेवाएँ', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 5: व्यवसाय के उभरते हुए तरीके', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 6: व्यवसाय की सामाजिक उत्तरदायित्व', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 7: व्यवसाय के लिए वित्त के स्रोत', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 8: लघु व्यवसाय', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 9: आंतरिक व्यापार', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 10: अंतर्राष्ट्रीय व्यापार - I', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 11: अंतर्राष्ट्रीय व्यापार - II', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' }
        ]
    },
    {
        id: 'eco_ied_en',
        title: 'Indian Economic Development',
        medium: 'English Medium',
        cover: 'images/eco_ied_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Indian Economy on the Eve of Independence', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 2: Indian Economy 1950-1990', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 3: Liberalisation, Privatisation and Globalisation', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 4: Human Capital Formation in India', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 5: Rural Development', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 6: Employment & Growth', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 7: Environment and Sustainable Development', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 8: Comparative Development Experiences', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' }
        ]
    },
    {
        id: 'eco_ied_hi',
        title: 'भारतीय आर्थिक विकास',
        medium: 'Hindi Medium',
        cover: 'images/eco_ied_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: स्वतंत्रता की पूर्व संध्या पर भारतीय अर्थव्यवस्था', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 2: भारतीय अर्थव्यवस्था 1950-1990', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 3: उदारीकरण, निजीकरण और वैश्वीकरण', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 4: भारत में मानव पूंजी निर्माण', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 5: ग्रामीण विकास', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 6: रोजगार एवं वृद्धि', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 7: पर्यावरण और सतत विकास', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 8: भारत और पड़ोसी देशों के तुलनात्मक विकास अनुभव', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' }
        ]
    },
    {
        id: 'eco_stats_en',
        title: 'Statistics for Economics',
        medium: 'English Medium',
        cover: 'images/eco_stats_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Introduction to Statistics', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 2: Collection of Data', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 3: Organisation of Data', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 4: Presentation of Data', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 5: Measures of Central Tendency', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 6: Measures of Dispersion', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 7: Correlation', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 8: Index Numbers', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' }
        ]
    },
    {
        id: 'eco_stats_hi',
        title: 'अर्थशास्त्र के लिए सांख्यिकी',
        medium: 'Hindi Medium',
        cover: 'images/eco_stats_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: सांख्यिकी परिचय', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 2: आंकड़ों का संकलन', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 3: आंकड़ों का संगठन', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 4: आंकड़ों का प्रस्तुतिकरण', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 5: केंद्रीय प्रवृत्ति की माप', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 6: अपकिरण के माप', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 7: सहसंबंध', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 8: सूचकांक', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' }
        ]
    },
    {
        id: 'maths_en',
        title: 'Mathematics (Class XI)',
        medium: 'English Medium',
        cover: 'images/maths_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Sets', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 2: Relations and Functions', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 3: Trigonometric Functions', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 4: Complex Numbers & Quadratic Equations', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 5: Linear Inequalities', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 6: Permutations and Combinations', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 7: Binomial Theorem', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 8: Sequence and Series', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 9: Straight Lines', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 10: Conic Sections', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 11: Three Dimensional Geometry', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 12: Limits and Derivatives', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 13: Statistics & Probability', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Ch 14: Mathematical Reasoning / Extra', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Answer Key (Solutions)', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' }
        ]
    },
    {
        id: 'maths_hi',
        title: 'गणित (कक्षा XI)',
        medium: 'Hindi Medium',
        cover: 'images/maths_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: समुच्चय', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 2: संबंध एवं फलन', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 3: त्रिकोणमिति फलन', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 4: सम्मिश्र संख्याएँ और द्विघात समीकरण', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 5: रैखिक असमिकाएँ', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 6: क्रमचय और संचय', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 7: द्विपद प्रमेय', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 8: अनुक्रम तथा श्रेणी', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 9: सरल रेखाएँ', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 10: शंखु परिच्छेद', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 11: त्रिविमीय ज्यामिति', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 12: सीमा और अवकलज', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 13: सांख्यिकी एवं प्रायिकता', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'अध्याय 14: गणितीय विवेचन', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'उत्तरमाला (Answer Key)', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' }
        ]
    },
    {
        id: 'lang_eng',
        title: 'English Core (Hornbill & Snapshots)',
        medium: 'English',
        cover: 'images/lang_eng_cover.jpg',
        chapters: [
            { name: 'Hornbill Ch 1: The Portrait of a Lady', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Hornbill Ch 2: We’re Not Afraid to Die...', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Hornbill Ch 3: Discovering Tut', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Snapshots Ch 1: The Summer of the Beautiful White Horse', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'Snapshots Ch 2: The Address', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' }
        ]
    },
    {
        id: 'lang_hindi',
        title: 'हिन्दी कोर (आरोह और वितान)',
        medium: 'Hindi',
        cover: 'images/lang_hindi_cover.jpg',
        chapters: [
            { name: 'आरोह पाठ 1: नमक का दरोगा', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'आरोह पाठ 2: मियाँ नसीरुद्दीन', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'आरोह पाठ 3: अप्पू के साथ ढाई साल', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'वितान पाठ 1: भारतीय गायिकाओं में बेजोड़ - लता मंगेशकर', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' },
            { name: 'वितान पाठ 2: राजस्थान की रजत बूंदें', url: 'YOUR_DRIVE_DIRECT_LINK_HERE/preview' }
        ]
    }
];
             
