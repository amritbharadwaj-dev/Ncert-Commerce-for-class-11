const booksData = [
    {
        id: 'acc1_en',
        title: 'Accountancy Part I (Class XI)',
        medium: 'English Medium',
        cover: 'images/acc1_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Introduction to Accounting', url: 'https://drive.google.com/file/d/1SgxxxE6ckcNR8pm9Km77zGV2x68zSQTj/preview' },
            { name: 'Ch 2: Theory Base of Accounting', url: 'https://drive.google.com/file/d/1YN2s4XSGQpKnpUmNNHdMhrZNlY9YeO0U/preview' },
            { name: 'Ch 3: Recording of Transactions - I', url: 'https://drive.google.com/file/d/1ARX1zGG9jXSUC0F0-TqgE1ZHEXznZcS-/preview' },
            { name: 'Ch 4: Recording of Transactions - II', url: 'https://drive.google.com/file/d/1PSCcnlejwTHsuOhdp3ryNJEgKcpJjRm5/preview' },
            { name: 'Ch 5: Bank Reconciliation Statement', url: 'https://drive.google.com/file/d/1eYpMbXWyAS4CSyoWjaZdMcGaepfPwSf6/preview' },
            { name: 'Ch 6: Trial Balance and Rectification of Errors', url: 'https://drive.google.com/file/d/1GadhbO6iPqKOo0j37ivRilNyCG9SZ4dn/preview' },
            { name: 'Ch 7: Depreciation, Provisions and Reserves', url: 'https://drive.google.com/file/d/1Nt1cy3mTHXB7Y8eLbER-u6G9puj836bz/preview' },
        ]
    },
    {
        id: 'acc1_hi',
        title: 'लेखाशास्त्र भाग 1 (कक्षा XI)',
        medium: 'Hindi Medium',
        cover: 'images/acc1_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: लेखांकन परिचय', url: 'https://drive.google.com/file/d/1OGG8G8pibJtBdmeDAQOLcwFeM0IsBm4k/preview' },
            { name: 'अध्याय 2: लेखांकन का सैद्धांतिक आधार', url: 'https://drive.google.com/file/d/1zX8mauNEa82RcWRM-rAgxH0Pp0prnmjs/preview' },
            { name: 'अध्याय 3: लेन-देनों का अभिलेखन - I', url: 'https://drive.google.com/file/d/1yGeUeI7XKIyIdjiIKnZ1bkh2FQuJXXCu/preview' },
            { name: 'अध्याय 4: लेन-देनों का अभिलेखन - II', url: 'https://drive.google.com/file/d/15LoJi-yPcDukGwppokhhsv3YN32MgzG-/preview' },
            { name: 'अध्याय 5: बैंक समाधान विवरण', url: 'https://drive.google.com/file/d/1LrqWTiSuEeYunWT0BrWSXbioWnb5xyLQ/preview' },
            { name: 'अध्याय 6: तलपट एवं अशुद्धियों का सुधार', url: 'https://drive.google.com/file/d/13YS5xwf_hZkgTrdPFDD0RbPRydydPB7B/preview' },
            { name: 'अध्याय 7: ह्रास, प्रावधान तथा संचय', url: 'https://drive.google.com/file/d/1gg3h4iq8OtNP-6bLUmxnnN0SDfhElQR6/preview' },
        ]
    },
    {
        id: 'acc2_en',
        title: 'Accountancy Part II (Class XI)',
        medium: 'English Medium',
        cover: 'images/acc2_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Financial Statements - I', url: 'https://drive.google.com/file/d/15RCKACWESrxyeQ1TZdclPkOB34mcEGoR/preview' },
            { name: 'Ch 2: Financial Statements - II', url: 'https://drive.google.com/file/d/1lP0eo1Js1W32qscrMJxMgi0udGnl2H7c/preview' }
        ]
    },
    {
        id: 'acc2_hi',
        title: 'लेखाशास्त्र भाग 2 (कक्षा XI)',
        medium: 'Hindi Medium',
        cover: 'images/acc2_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: वित्तीय विवरण - I', url: 'https://drive.google.com/file/d/1EzIMEHNJkbeLcV4oCFMDW-CPTNu026jk/preview' },
            { name: 'अध्याय 2: वित्तीय विवरण - II', url: 'https://drive.google.com/file/d/11zgIVL35RLtaa_q961GsU55p1kaQ_M3Z/preview' }
        ]
    },
    {
        id: 'bst_en',
        title: 'Business Studies (Class XI)',
        medium: 'English Medium',
        cover: 'images/bst_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Business, Trade and Commerce', url: 'https://drive.google.com/file/d/1OaAt4nhtHXWpBKV-igRvMdzSMP9wIKiR/preview' },
            { name: 'Ch 2: Forms of Business Organisation', url: 'https://drive.google.com/file/d/1b2g0by3PaPtCWZ6cqRAB0mVtUfrfU030/preview' },
            { name: 'Ch 3: Private, Public and Global Enterprises', url: 'https://drive.google.com/file/d/1rqGr6HV_IQlsvRY7qP4k7BmYiSzJubZd/preview' },
            { name: 'Ch 4: Business Services', url: 'https://drive.google.com/file/d/1Qu1kTWts7YpYGhMBgkVG9_F9o5FlVBg_/preview' },
            { name: 'Ch 5: Emerging Modes of Business', url: 'https://drive.google.com/file/d/1UPNGuMi1V9jTqboJDX31U5wzDG4eMYZl/preview' },
            { name: 'Ch 6: Social Responsibilities of Business and Business Ethics', url: 'https://drive.google.com/file/d/1VTToRV6SuxNAYBrTuvawFJF_Bbdqj4uE/preview' },
            { name: 'Ch 7: Formation of a Company', url: 'https://drive.google.com/file/d/1jbvBDygQyta9gtf5c0jBKK5X_eL1vxnS/preview' },
            { name: 'Ch 8: Source of Business Finance', url: 'https://drive.google.com/file/d/1MkZlxMneHlhegZzDb1W5HXC50Xpbkr7Q/preview' },
            { name: 'Ch 9: MSME and Business Enterpreneneurship', url: 'https://drive.google.com/file/d/1jssbcIwJ0Q1NVrJvAH9vDJi7xLriefXU/preview' },
            { name: 'Ch 10: Internal Trade', url: 'https://drive.google.com/file/d/1BYRUW10PTwVo37O35igAZ6OFFRpEUBg7/preview' },
            { name: 'Ch 11: International Business', url: 'https://drive.google.com/file/d/123rDH2rXFK5Uil7mRaMWv7882VBT9DI_/preview' }
        ]
    },
    {
        id: 'bst_hi',
        title: 'व्यवसाय अध्ययन (कक्षा XI)',
        medium: 'Hindi Medium',
        cover: 'images/bst_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: व्यवसाय, व्यापार और वाणिज्य', url: 'https://drive.google.com/file/d/1fs-LELviF-0nH6XbCrMeMXPpcu4pOQzR/preview' },
            { name: 'अध्याय 2: व्यावसायिक संगठन के स्वरूप', url: 'https://drive.google.com/file/d/1dkonpY5GR3tUJ1yZBZ1PPv3C0bHEOeSP/preview' },
            { name: 'अध्याय 3: निजी, सार्वजनिक एवं भूमंडलीय उपक्रम', url: 'https://drive.google.com/file/d/1pTFxrgR9d3ecZFtz2eo8KHgQPMFxEQbY/preview' },
            { name: 'अध्याय 4: व्यावसायिक सेवाएँ', url: 'https://drive.google.com/file/d/1zOPTvnmatI1xKhEmwNYKp0voZY-SMa-I/preview' },
            { name: 'अध्याय 5: व्यवसाय के उभरते हुए तरीके', url: 'https://drive.google.com/file/d/1f6nRxL00ELpLOOHuaEGN1ztZl4Sh0Zy3/preview' },
            { name: 'अध्याय 6: व्यवसाय की सामाजिक उत्तरदायित्व तथा व्यावसायिक नैतिकता', url: 'https://drive.google.com/file/d/1qpJYi1qjA4RLM1KywzobHIdQVPJsZgnD/preview' },
            { name: 'अध्याय 7: कंपनी की स्थापना', url: 'https://drive.google.com/file/d/1xcxeEA6Eq1nxR39lXOj5Xynj8RC56Mj9/preview' },
            { name: 'अध्याय 8: व्यवसाय के वित्त के स्रोत', url: 'https://drive.google.com/file/d/1anmPfR5YLJXM1Xx3X2gSo0bQUQvD-e6l/preview' },
            { name: 'अध्याय 9: सूक्ष्म, लघु एवं मध्यम उद्यम और व्यवसाय उद्यमिता', url: 'https://drive.google.com/file/d/1njkMJ8MTt8m8zruvQSwQDd8z35VHzapG/preview' },
            { name: 'अध्याय 10: आंतरिक व्यापार', url: 'https://drive.google.com/file/d/1qmDX_Zc_OiF6A6jKIc8kxUNvr-GLfsdL/preview' },
            { name: 'अध्याय 11: अंतर्राष्ट्रीय व्यापार ', url: 'https://drive.google.com/file/d/1jacVrI_BjMVE6ZgoEfyaKYHub451kCNL/preview' }
        ]
    },
    {
        id: 'eco_ied_en',
        title: 'Indian Economic Development',
        medium: 'English Medium',
        cover: 'images/eco_ied_en_cover.jpg',
        chapters: [
            { name: 'Ch 1: Indian Economy on the Eve of Independence', url: 'https://drive.google.com/file/d/1B0v1ae_QAJ_HPhKSzV1nseFHQ_xNqDbv/preview' },
            { name: 'Ch 2: Indian Economy 1950-1990', url: 'https://drive.google.com/file/d/1BaUS45Hz9Fs6RHzwnCfkBCcK9wc1ACKn/preview' },
            { name: 'Ch 3: Liberalisation, Privatisation and Globalisation', url: 'https://drive.google.com/file/d/1WU1WIFFDjULW1nArHBxdVNOZdy-30o2q/preview' },
            { name: 'Ch 4: Human Capital Formation in India', url: 'https://drive.google.com/file/d/1wRKXj_SXNp4rFTn2LSTHdFTOqy-AH-iT/preview' },
            { name: 'Ch 5: Rural Development', url: 'https://drive.google.com/file/d/16AMSzc30of1apii6oqRy5euHKoJIOp9j/preview' },
            { name: 'Ch 6: Employment :Growth,Information and other Issues', url: 'https://drive.google.com/file/d/1ZQH8njz6Q4VTJGLcKiBers3tAxYL88cc/preview' },
            { name: 'Ch 7: Environment and Sustainable Development', url: 'https://drive.google.com/file/d/1W1o7J5EEV8szF9xEKX1VTRaIyPGiVmzH/preview' },
            { name: 'Ch 8: Comparative Development Experiences of India and its Neighbours', url: 'https://drive.google.com/file/d/1D_mfDTCQPTGVadcMXNLOSPsmzMiR7vkm/preview' }
        ]
    },
    {
        id: 'eco_ied_hi',
        title: 'भारतीय आर्थिक विकास',
        medium: 'Hindi Medium',
        cover: 'images/eco_ied_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: स्वतंत्रता की पूर्व संध्या पर भारतीय अर्थव्यवस्था', url: 'https://drive.google.com/file/d/1JU1fwZOxkTuiWgdANTFdbmHfVb_YImZX/preview' },
            { name: 'अध्याय 2: भारतीय अर्थव्यवस्था 1950-1990', url: 'https://drive.google.com/file/d/1AW3ZXLpeRrfJfItdvpWwkV_ebmsGUDwI/preview' },
            { name: 'अध्याय 3: उदारीकरण, निजीकरण और वैश्वीकरण', url: 'https://drive.google.com/file/d/1Fzzk5BUfnPaSGBcaTNYczIdhxpcEgmH2/preview' },
            { name: 'अध्याय 4: भारत में मानव पूंजी निर्माण', url: 'https://drive.google.com/file/d/1Vd8UpCAGPtxW19FM4WlUl97smAOWzhj2/preview' },
            { name: 'अध्याय 5: ग्रामीण विकास', url: 'https://drive.google.com/file/d/1JuQYVmD46JF8lQcp-f3-DW84pknOBmLH/preview' },
            { name: 'अध्याय 6: रोजगार - संवृद्धि, अनौपचारीकरण एवं अन्य मुद्दे', url: 'https://drive.google.com/file/d/1hnto20CkN9wm3SyDcXvM5k4qmuYqEbfF/preview' },
            { name: 'अध्याय 7: पर्यावरण और धारणीय विकास', url: 'https://drive.google.com/file/d/1rYHzvahCcqM5sUYd7m4EB8by6r0QhlEy/preview' },
            { name: 'अध्याय 8: भारत और पड़ोसी देशों के तुलनात्मक विकास अनुभव', url: 'https://drive.google.com/file/d/1hb47m3sZ4akJoenbU5QtjjNWDIDxxbzQ/preview' }
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
            { name: 'Ch 1: Sets', url: 'https://drive.google.com/file/d/1zuIFGb7v4ADi49zHfdxyavB6m5-PCEYz/preview' },
            { name: 'Ch 2: Relations and Functions', url: 'https://drive.google.com/file/d/1ED1-hPiunJ8qWzaSa3HQLW94J3lcoro5/preview' },
            { name: 'Ch 3: Trigonometric Functions', url: 'https://drive.google.com/file/d/1H76qsVEG089EoGNQpkGI_d3dG_ZM7kj8/preview' },
            { name: 'Ch 4: Complex Numbers & Quadratic Equations', url: 'https://drive.google.com/file/d/1CtmR3V8syjS3PQHYIILaGBM5GwvmVyXx/preview' },
            { name: 'Ch 5: Linear Inequalities', url: 'https://drive.google.com/file/d/1sKF0pN4sjkJJVLuauKlksJodKLo-GSOq/preview' },
            { name: 'Ch 6: Permutations and Combinations', url: 'https://drive.google.com/file/d/1zkVQ_obDJEHGLM2-v1jEVS5H9rTh4Tqj/preview' },
            { name: 'Ch 7: Binomial Theorem', url: 'https://drive.google.com/file/d/15n9Xs7YksjAxVFRhfcyU58knoG8_JGtX/preview' },
            { name: 'Ch 8: Sequence and Series', url: 'https://drive.google.com/file/d/1OpSceO_U0ZP12xXbsFs3FRpGrhgjxg5X/preview' },
            { name: 'Ch 9: Straight Lines', url: 'https://drive.google.com/file/d/1t_Cao_VFc1XQSo3GvFA2nAXKnqm8yL5l/preview' },
            { name: 'Ch 10: Conic Sections', url: 'https://drive.google.com/file/d/1NB9dRc2v25fVqCHn1H42m2eOQHtX0LuK/preview' },
            { name: 'Ch 11: Three Dimensional Geometry', url: 'https://drive.google.com/file/d/1zArIxd1qspCww9qRHYxNt98X7oBhd8ER/preview' },
            { name: 'Ch 12: Limits and Derivatives', url: 'https://drive.google.com/file/d/1Q3tO1fo9Gc2YtEdj2ZtloL1vPnRkjXRF/preview' },
            { name: 'Ch 13: Statistics', url: 'https://drive.google.com/file/d/185yoLkgWChOicEt3H91-IxpEvxfOloxz/preview' },
            { name: 'Ch 14: Probability', url: 'https://drive.google.com/file/d/1PlZAnfqvHUhW_obcYbsHedC6e8GoD9mr/preview' },
            { name: 'Answer Key (Solutions)', url: 'https://drive.google.com/file/d/1uBDPAb6D-6rj0cKb1Zzq-20gixQGXdJS/preview' }
        ]
    },
    {
        id: 'maths_hi',
        title: 'गणित (कक्षा XI)',
        medium: 'Hindi Medium',
        cover: 'images/maths_hi_cover.jpg',
        chapters: [
            { name: 'अध्याय 1: समुच्चय', url: 'https://drive.google.com/file/d/1fIAtWh4Oyw9iT4mTCIZbdvNYDFOOsTaf/preview' },
            { name: 'अध्याय 2: संबंध एवं फलन', url: 'https://drive.google.com/file/d/1iEhlZuYRoZCevX3xc_nnIDOpXCVqNh7o/preview' },
            { name: 'अध्याय 3: त्रिकोणमिति फलन', url: 'https://drive.google.com/file/d/13diGW-V0t5gXiyxvdpQUC2tVCi30Ecbz/preview' },
            { name: 'अध्याय 4: सम्मिश्र संख्याएँ और द्विघात समीकरण', url: 'https://drive.google.com/file/d/1LY4TBfsAfYMGWXaXkVhsxwlzVv7Prn41/preview' },
            { name: 'अध्याय 5: रैखिक असमिकाएँ', url: 'https://drive.google.com/file/d/1COE9t7b5eTk_WdJn_aN61N9ZoofkGVPG/preview' },
            { name: 'अध्याय 6: क्रमचय और संचय', url: 'https://drive.google.com/file/d/1Z-Wc4L1Nsdgb8V0uwkNsR-PnCr0sUhox/preview' },
            { name: 'अध्याय 7: द्विपद प्रमेय', url: 'https://drive.google.com/file/d/1VTz_WYWoSU5KZwmuDjPmMaWgTT-Vy-MO/preview' },
            { name: 'अध्याय 8: अनुक्रम तथा श्रेणी', url: 'https://drive.google.com/file/d/1OtxtdI0nlFNZdJ84PLVhfepKUrq6hxpS/preview' },
            { name: 'अध्याय 9: सरल रेखाएँ', url: 'https://drive.google.com/file/d/1xW_jRBn6l2LwueQ9nZLQhDZ_SxhFzePb/preview' },
            { name: 'अध्याय 10: शंखु परिच्छेद', url: 'https://drive.google.com/file/d/1whvL_1AK2TqS3hqTnFNYOE393qo5nHEW/preview' },
            { name: 'अध्याय 11: त्रिविमीय ज्यामिति', url: 'https://drive.google.com/file/d/1cuAMO0ae4CI2nF7q4LhG2Bdc514dHmgv/preview' },
            { name: 'अध्याय 12: सीमा और अवकलज', url: 'https://drive.google.com/file/d/1HsL8LiC7skKa-fahZlcYFsfgNXsq95hj/preview' },
            { name: 'अध्याय 13: सांख्यिकी एवं प्रायिकता', url: 'https://drive.google.com/file/d/1NDEEGUNBA0xq-ikhIWFZ0mfI4WoA1heI/preview' },
            { name: 'अध्याय 14: गणितीय विवेचन', url: 'https://drive.google.com/file/d/1HiJ8i74wKBKqS5eiwgECQAnmOVYSbWD0/preview' },
            { name: 'उत्तरमाला (Answer Key)', url: 'https://drive.google.com/file/d/1Nh2f80twN0bhb23K2bjENgi1xh3FsCie/preview' }
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
             
