
type Translations = {
  [key: string]: string | Translations;
};

export const translations: { id: Translations, en: Translations } = {
  id: {
    "header": {
      "subtitle": "Fotografi Produk AI",
      "about": "Tentang"
    },
    "footer": {
      "createdBy": "dibuat oleh"
    },
    "sidebar": {
      "virtualTryOn": "Digi TryOn",
      "productStudio": "Digi Product",
      "digiModel": "Digi Model",
      "digiFashion": "Digi Fashion",
      "digiBRoll": "Digi B-Roll",
      "povStudio": "Digi POV Studio",
      "listingStudio": "Digi Listing",
      "digiPose": "Digi Pose",
      "digiGenEditor": "Digi Editor",
      "digiRestore": "Digi Restore",
      "digiFaceSwap": "Digi Face Swap",
      "digiFusion": "Digi Fusion",
      "mergeProduct": "Digi Merge",
      "backgroundChanger": "Digi Background",
      "lifestylePhotoshoot": "Digi Lifestyle",
      "digiCarousel": "Digi Carousel",
      "adCreator": "Digi Poster",
      "mockupGenerator": "Digi Mockup",
      "digiPhotoshoot": "Digi Photoshoot",
      "digiVideo": "Digi Video",
      "digiStoryboard": "Digi Storyboard",
      "digiVoice": "Digi Voice",
      "motionPromptStudio": "Digi Motion Prompt",
      "videoStudio": "Studio Video",
      "mirrorStudio": "Digi Mirror",
      "perspectiveStudio": "Digi Perspective",
      "digitalImaging": "Digi Imaging"
    },
    "about": {
      "title": "Tentang AIDIGITRANS.COM",
      "description": "Aplikasi ini menggunakan teknologi Google Gemini AI terbaru untuk membantu UMKM dan konten kreator membuat aset visual berkualitas tinggi dengan mudah, cepat, dan hemat biaya.",
      "techStack": "Tentang",
      "geminiModels": "Model Gemini yang Digunakan",
      "geminiFlashImage": "Otak di balik pengeditan dan pembuatan gambar.",
      "geminiFlash": "Otak untuk membuat teks iklan dan ide kreatif.",
      "geminiVeo": "Teknologi untuk membuat video dari gambar.",
      "productStudio": "Ubah foto produk biasa jadi foto studio profesional dengan berbagai tema estetik.",
      "virtualTryOn": "Cobain baju ke model AI atau fotomu sendiri tanpa perlu ganti baju beneran.",
      "lifestylePhotoshoot": "Masukin produk ke situasi nyata (misal: di kafe, di taman) biar lebih hidup.",
      "mergeProduct": "Gabungin beberapa gambar jadi satu frame yang rapi. Cocok buat bikin paket bundling atau koleksi.",
      "poseStudio": "Ubah gaya pose model di fotomu jadi macem-macem gaya baru biar nggak bosenin.",
      "adCreator": "Bikin desain poster iklan otomatis lengkap dengan teks promosi yang menarik.",
      "imageEditor": "Edit bagian foto yang nggak dimau, hapus objek, atau ganti detail foto sesuka hati.",
      "digitalImaging": "Bikin foto produk yang artistik dan unik, kayak editan profesional.",
      "videoStudio": "Hidupkan foto produk yang diam jadi video gerak singkat yang estetik.",
      "povStudio": "Bikin foto seolah-olah produk lagi dipegang tangan kamu (POV), cocok buat review.",
      "mirrorStudio": "Bikin foto gaya selfie di depan cermin buat produk fashion atau casing HP.",
      "listingStudio": "Bikin gambar info produk (infografis) yang jelas buat ditaruh di marketplace.",
      "perspectiveStudio": "Samakan gaya foto produk dari depan, samping, dan belakang biar seragam.",
      "backgroundChanger": "Hapus dan ganti background foto produkmu dengan pemandangan lain secara instan.",
      "digiStoryboard": "Visualisasikan ide ceritamu jadi gambar panel (storyboard) sebelum bikin video.",
      "digiVideo": "Ubah ide tulisan atau gambar jadi video sinematik keren.",
      "mockupGenerator": "Tempel desain logomu ke berbagai produk (kaos, mug, dll) secara instan.",
      "digiPhotoshoot": "Ubah foto biasa jadi potret studio kelas atas dengan nuansa Korea atau Cinematic.",
      "digiBRoll": "Unggah 1 gambar produk, tambahkan model (opsional), dan biarkan AI membuat 6 pose foto profesional.",
      "developedBy": "Dikembangkan oleh",
      "closeButton": "Tutup"
    },
    "sections": {
      "upload": {
        "title": "1. Unggah Gambar",
        "subtitle": "Pilih foto terbaikmu yang jelas dan terang."
      },
      "style": {
        "title": "2. Pilih Gaya",
        "subtitle": "Mau dibuat seperti apa fotonya? Pilih di sini."
      },
      "tools": {
        "title": "2. Pilih Alat",
        "subtitle": "Pilih alat ajaib untuk mengedit fotomu.",
        "options": {
          "title": "3. Pengaturan",
          "subtitle": "Sesuaikan detailnya biar makin pas."
        }
      }
    },
    "uploader": {
      "productLabel": "Unggah Foto Produk",
      "imageLabel": "Unggah Gambar",
      "modelLabel": "Unggah Foto Model",
      "referenceLabel": "Unggah Contoh Gaya (Referensi)",
      "styleReferenceLabel": "Unggah Referensi Gaya",
      "backgroundLabel": "Unggah Background Baru",
      "designLabel": "Unggah Desain/Logo",
      "mockupLabel": "Unggah Mockup Polos",
      "fileTypes": "Format: PNG, JPG, WEBP (Maks 10MB)"
    },
    "options": {
      "smart": {
        "title": "Otomatis Cerdas",
        "description": "Biarkan AI yang mikir dan pilihin gaya terbaik buat produkmu."
      },
      "customize": {
        "theme": {
          "label": "Pilih Tema",
          "other": "Tulis Sendiri..."
        },
        "customTheme": {
          "label": "Tema Kustom",
          "placeholder": "cth., 'Di atas meja kayu dengan sinar matahari pagi'"
        },
        "props": {
          "label": "Tambah Properti (Opsional)",
          "placeholder": "cth., 'ada bunga kering dan biji kopi'"
        }
      },
      "reference": {
        "description": "Punya contoh foto bagus? Unggah di sini, AI akan meniru gayanya."
      },
      "shared": {
        "instructions": {
          "label": "Catatan Tambahan (Opsional)",
          "placeholderCustomize": "cth., 'Pastikan produk terlihat terang dan jelas'",
          "placeholderReference": "cth., 'Ikuti pencahayaan dari foto contoh ini'"
        }
      },
      "enhanceButton": "Mulai Sulap Foto"
    },
    "results": {
      "title": "3. Hasil Foto",
      "titleEditor": "4. Hasil Edit",
      "description": "Tadaa! Ini dia hasil foto barumu.",
      "descriptionEditor": "Ini hasil editan fotomu.",
      "loading": {
        "title": "Sedang menyulap foto...",
        "titleEditor": "Sedang mengedit...",
        "subtitle": "Tunggu sebentar ya, AI lagi bekerja buat kamu."
      },
      "error": {
        "title": "Yah, Gagal...",
        "button": "Coba Lagi Yuk"
      },
      "placeholder": "Hasil foto nanti muncul di sini.",
      "imageAlt": "Foto hasil generasi AI",
      "variantLabel": "Pilihan",
      "downloadButton": "Simpan Gambar",
      "resetButton": "Ulangi Lagi"
    },
    "errors": {
      "noProductImage": "Jangan lupa upload foto produknya dulu ya.",
      "noImage": "Upload gambarnya dulu dong.",
      "noReferenceImage": "Kamu perlu upload foto contoh (referensi) buat mode ini."
    },
    "themes": {
      "cleanStudio": "Studio Bersih (Latar Putih)",
      "dramaticMoody": "Dramatis & Elegan (Latar Gelap)",
      "naturalOrganic": "Nuansa Alam & Organik",
      "vibrantPlayful": "Ceria & Warna-warni",
      "modernSleek": "Modern & Kekinian",
      "softDreamy": "Lembut & Estetik",
      "industrialRugged": "Gaya Industrial",
      "vintageNostalgic": "Vintage / Jadul",
      "luxeElegant": "Mewah & Mahal",
      "minimalistZen": "Tenang & Minimalis",
      "cosmicFuturistic": "Masa Depan & Neon",
      "cozyRustic": "Nyaman & Homey",
      "tropicalParadise": "Suasana Liburan Tropis",
      "aquaticFreshness": "Segar & Berair",
      "urbanStreet": "Gaya Jalanan Kota",
      "holidayCheer": "Suasana Liburan / Natal"
    },
    "perspectiveStudio": {
      "page": {
        "title": "Digi Perspective",
        "description": "Punya foto produk dari depan, samping, and belakang? Upload semua di sini, AI akan bikin background mereka seragam dan estetik."
      },
      "sections": {
        "upload": {
          "title": "1. Unggah Sisi Produk",
          "subtitle": "Minimal upload 1 sisi, tapi lebih banyak lebih bagus."
        },
        "style": {
          "title": "2. Pilih Gaya",
          "subtitle": "Mau background seperti apa untuk semua foto ini?"
        }
      },
      "labels": {
        "front": "Tampak Depan",
        "back": "Tampak Belakang",
        "side": "Tampak Samping",
        "top": "Tampak Atas/Detail"
      },
      "generateButton": "✨ Seragamkan Background",
      "errors": {
        "noImages": "Upload minimal satu sisi foto produk ya."
      }
    },
    "povStudio": {
      "page": {
        "title": "Digi POV Studio",
        "description": "Bikin foto seolah-olah produk lagi dipegang tangan kamu (POV), cocok buat review."
      },
      "sections": {
        "upload": {
          "title": "1. Unggah Produk",
          "subtitle": "Foto produknya aja, tanpa tangan."
        },
        "configure": {
          "title": "2. Atur Gaya",
          "subtitle": "Pilih tangan siapa dan mau di mana fotonya."
        }
      },
      "handStyle": {
        "label": "Model Tangan",
        "auto": "Otomatis Aja",
        "female": "Tangan Cewek",
        "male": "Tangan Cowok",
        "sweater": "Pakai Sweater"
      },
      "background": {
        "modeLabel": "Background",
        "preset": "Pilih Tema",
        "custom": "Upload Sendiri",
        "themeLabel": "Mau suasana apa?"
      },
      "themes": {
        "cozyBedroom": "Di Kamar Nyaman",
        "aestheticDesk": "Di Meja Kerja Estetik",
        "softMinimalist": "Dinding Polos Minimalis",
        "cafeVibes": "Nongkrong di Kafe",
        "urbanOutdoor": "Jalanan Kota",
        "natureWalk": "Jalan-jalan di Alam",
        "bathroomSelfie": "Di Depan Caca Wastafel"
      },
      "generateButton": "✨ Buat Foto POV",
      "errors": {
        "noBackground": "Jangan lupa upload backgroundnya ya."
      }
    },
    "backgroundChanger": {
      "page": {
        "title": "Digi Background",
        "description": "Hapus dan ganti background foto produkmu dengan pemandangan lain secara instan."
      },
      "tabs": {
        "change": "Ubah Background",
        "remove": "Remove Background"
      },
      "sections": {
        "upload": {
          "title": "1. Unggah Produk",
          "subtitle": "Pilih foto produk yang mau diganti backgroundnya."
        },
        "method": {
          "title": "2. Pilih Background",
          "subtitle": "Mau upload gambar sendiri atau dibuatin AI?"
        },
        "remove": {
          "title": "2. Hapus Latar",
          "subtitle": "AI akan memisahkan objek dari latar belakang."
        }
      },
      "modes": {
        "upload": "Upload Sendiri",
        "generate": "Dibuatin AI"
      },
      "form": {
        "prompt": {
          "label": "Mau Background Apa?",
          "placeholder": "cth., 'Di atas meja marmer putih', 'Di pasir pantai bali'"
        },
        "instructions": {
          "label": "Catatan Tambahan (Opsional)",
          "placeholder": "cth., 'Bikin bayangannya lebih natural', 'Cahayanya dari kiri'"
        }
      },
      "generateButton": "✨ Ganti Background",
      "removeButton": "✂️ Hapus Background",
      "errors": {
        "noProduct": "Upload foto produknya dulu ya.",
        "noBackground": "Upload foto background penggantinya dong.",
        "noPrompt": "Tulis dulu mau background kayak gimana."
      }
    },
    "mirrorStudio": {
      "page": {
        "title": "Digi Mirror",
        "description": "Bikin foto gaya selfie di depan cermin buat produk fashion atau casing HP."
      },
      "sections": {
        "upload": {
          "title": "1. Unggah Produk",
          "subtitle": "Produk apa yang mau dipamerin? (Casing HP, Tas, Baju)"
        },
        "configure": {
          "title": "2. Atur Model & Lokasi",
          "subtitle": "Pilih siapa modelnya dan di mana fotonya."
        }
      },
      "options": {
        "modelSourceLabel": "Modelnya Dari Mana?",
        "generate": "Bikin Model AI",
        "upload": "Upload Foto Sendiri",
        "uploadModelLabel": "Unggah Foto Model",
        "genderLabel": "Gender Model",
        "ethnicityLabel": "Wajah Model (Etnis)",
        "ethnicityPlaceholder": "cth., Indonesia, Asia, Bule",
        "frameLabel": "Jarak Foto",
        "themeLabel": "Lokasi Cermin",
        "female": "Cewek",
        "male": "Cowok"
      },
      "themes": {
        "elevatorSelfie": "Cermin Lift",
        "gymMirror": "Cermin Gym",
        "bathroomAesthetic": "Kamar Mandi Estetik",
        "bedroomOotd": "Cermin Kamar Tidur",
        "fittingRoom": "Kamar Ganti Mall",
        "streetReflection": "Kaca Jendela Toko"
      },
      "frames": {
        "halfBody": "Setengah Badan",
        "fullBody": "Seluruh Badan",
        "closeUp": "Close Up (Fokus HP/Tangan)"
      },
      "generateButton": "✨ Cekrek Selfie",
      "errors": {
        "noModel": "Upload foto orangnya dulu ya."
      }
    },
    "listingStudio": {
      "page": {
        "title": "Digi Listing",
        "description": "Bikin gambar info produk (infografis) yang jelas buat ditaruh di marketplace."
      },
      "sections": {
        "upload": {
          "title": "1. Unggah Produk",
          "subtitle": "Pilih foto produk utamamu."
        },
        "features": {
          "title": "2. Fitur Unggulan",
          "subtitle": "Apa kelebihan produkmu? Tulis 3-5 poin."
        },
        "style": {
          "title": "3. Desain Tampilan",
          "subtitle": "Pilih gaya desain yang cocok sama brandmu."
        }
      },
      "form": {
        "addFeature": "Tambah Poin",
        "featurePlaceholder": "cth. 'Anti Air', 'Baterai Awet'",
        "styleLabel": "Pilih Gaya Desain"
      },
      "styles": {
        "minimalistWhite": "Putih Bersih (Minimalis)",
        "techSpecs": "Teknologi (Gelap & Neon)",
        "ecoOrganic": "Natural (Warna Bumi)",
        "boldSale": "Promo (Tegas & Mencolok)",
        "luxuryElegant": "Mewah (Elegan)"
      },
      "generateButton": "✨ Buat Gambar Listing",
      "errors": {
        "minFeatures": "Tulis minimal 1 kelebihan produkmu ya."
      }
    },
    "productStudio": {
      "page": {
        "title": "Digi Product",
        "description": "Ubah foto produk biasa jadi foto studio profesional dengan berbagai tema estetik."
      },
      "steps": {
        "upload": "1. Unggah Foto",
        "lighting": "2. Pencahayaan",
        "mood": "3. Suasana",
        "ratio": "4. Ukuran Foto",
        "location": "5. Lokasi"
      },
      "options": {
        "light": "Terang",
        "dark": "Gelap",
        "clean": "Bersih",
        "crowd": "Ramai",
        "indoor": "Dalam Ruangan",
        "outdoor": "Luar Ruangan"
      },
      "generateButton": "Buat Foto Studio",
      "generatingConcepts": "Mencari ide konsep...",
      "visualizing": "Memvisualisasikan...",
      "resultsTitle": "4 Variasi Foto Studio"
    },
    "mergeProduct": {
      "page": {
        "title": "Digi Merge",
        "description": "Gabungin beberapa gambar jadi satu frame yang rapi. Cocok buat bikin paket bundling atau koleksi."
      },
      "sections": {
        "uploadProducts": {
          "title": "1. Unggah Gambar",
          "subtitle": "Minimal 2 gambar yang mau digabungin.",
          "addProduct": "Tambah Gambar Lain"
        }
      },
      "errors": {
        "atLeastTwo": "Minimal harus ada 2 gambar buat digabungin."
      }
    },
    "digitalImaging": {
      "page": {
        "title": "Digi Imaging",
        "description": "Bikin foto produk yang artistik dan unik, kayak editan profesional."
      },
      "modes": {
        "customize": "Atur Sendiri",
        "generateConcept": "Minta Ide AI"
      },
      "sections": {
        "style": {
          "title": "3. Atur Gaya",
          "subtitle": "Pilih tema seni yang kamu suka."
        },
        "concept": {
          "title": "2. Pilih Cara",
          "subtitle": "Mau atur sendiri atau biarkan AI kasih ide kreatif?"
        }
      },
      "conceptGenerator": {
        "title": "3. Cari Ide Kreatif",
        "subtitle": "Biarkan AI melihat produkmu dan kasih saran konsep yang keren.",
        "button": "✨ Cari Ide Konsep",
        "loading": "Lagi mikirin ide-ide liar...",
        "resultsTitle": "4. Pilih Concept",
        "resultsSubtitle": "Pilih salah satu ide di bawah ini buat digenerate.",
        "generateImageButton": "Pilih & Buat"
      },
      "generateButton": "✨ Buat Karya Seni",
      "errors": {
        "conceptError": "Gagal cari ide nih. Coba lagi ya."
      },
      "themes": {
        "miniatureWorld": "Dunia Miniatur (Kecil)",
        "natureFusion": "Menatu dengan Alam",
        "surrealFloating": "Melayang & Ajaib",
        "cyberneticGlow": "Cyberpunk & Neon",
        "watercolorSplash": "Percikan Cat Air",
        "papercraftArt": "Kerajinan Kertas",
        "galaxyInfused": "Luar Angkasa",
        "architecturalIllusion": "Ilusi Bangunan"
      }
    },
    "virtualTryOn": {
      "page": {
        "title": "Digi TryOn",
        "description": "Cobain baju ke model AI atau fotomu sendiri tanpa perlu ganti baju beneran."
      },
      "sections": {
        "uploadProduct": {
          "title": "1. Unggah Baju",
          "subtitle": "Lengkapi slot tampak depan dan belakang untuk hasil 360° maksimal.",
          "addProduct": "Tambah Baju"
        },
        "provideModel": {
          "title": "2. Siapkan Model",
          "subtitle": "Mau pakai foto sendiri atau model buatan AI?"
        }
      },
      "labels": {
        "front": "Tampak Depan",
        "back": "Tampak Belakang"
      },
      "modelOptions": {
        "upload": "Foto Sendiri",
        "generate": "Buat Model AI",
        "gender": "Gender",
        "female": "Cewek",
        "male": "Cowok",
        "other": "Lainnya",
        "ethnicity": "Wajah (Etnis)",
        "aspectRatio": "Ukuran Foto",
        "ethnicities": {
          "caucasian": "Bule (Eropa)",
          "asian": "Asia",
          "african": "Afrika",
          "hispanic": "Latin",
          "middleEastern": "Timur Tengah",
          "other": "Lainnya"
        },
        "details": "Detail Tambahan",
        "detailsPlaceholder": "cth., 'rambut panjang, tersenyum, pakai kacamata'",
        "customEthnicity": {
          "label": "Etnis Khusus",
          "placeholder": "cth., 'Jawa', 'Sunda', 'Korea'"
        }
      },
      "errors": {
        "noProducts": "Upload foto bajunya dulu ya.",
        "noFrontImage": "Upload foto tampak depan baju dulu ya (slot utama).",
        "noModel": "Upload foto modelnya (orangnya) dulu."
      },
      "generateButton": "✨ Pasang Baju"
    },
    "lifestylePhotoshoot": {
      "page": {
        "title": "Digi Lifestyle",
        "description": "Masukin produk ke situasi nyata (misal: di kafe, di taman) biar lebih hidup."
      },
      "sections": {
        "uploadProduct": {
          "title": "1. Unggah Produk",
          "subtitle": "Produk apa yang mau difoto?"
        },
        "provideModel": {
          "title": "2. Model",
          "subtitle": "Siapa yang pakai? Upload foto atau buat model AI."
        },
        "direct": {
          "title": "3. Arahan Gaya",
          "subtitle": "Ceritain adegan apa yang kamu mau."
        }
      },
      "form": {
        "interaction": {
          "label": "Deskripsi Adegan",
          "placeholder": "cth., 'Wanita sedang duduk santai di sofa sambil memegang botol skincare, tersenyum rileks, cahaya matahari pagi masuk dari jendela.'"
        }
      },
      "generateButton": "✨ Buat Foto Lifestyle",
      "errors": {
        "noProduct": "Produknya belum diupload.",
        "noModel": "Modelnya belum ada."
      }
    },
    "poseStudio": {
      "page": {
        "title": "Digi Pose",
        "description": "Ubah gaya pose model di fotomu jadi macem-macem gaya baru biar nggak bosenin."
      },
      "sections": {
        "uploadModel": {
          "title": "1. Unggah Foto",
          "subtitle": "Foto model yang sedang pakai produk."
        },
        "chooseStyle": {
          "title": "2. Pilih Pose Baru",
          "subtitle": "Mau diganti jadi gaya apa?"
        }
      },
      "modes": {
        "smart": {
          "title": "Otomatis",
          "description": "Biarkan AI yang pilihin pose-pose keren buat kamu."
        },
        "customize": {
          "title": "Atur Sendiri"
        }
      },
      "form": {
        "theme": {
          "label": "Tema Foto"
        },
        "angle": {
          "label": "Sudut Kamera"
        },
        "framing": {
          "label": "Jarak Foto"
        },
        "instructions": {
          "label": "Catatan (Opsional)",
          "placeholder": "cth., 'Bikin modelnya terlihat lebih bahagia'"
        }
      },
      "angles": {
        "eyeLevel": "Sejajar Mata",
        "highAngle": "Dari Atas",
        "lowAngle": "Dari Bawah"
      },
      "frames": {
        "fullBody": "Seluruh Badan",
        "mediumShot": "Setengah Badan",
        "cowboyShot": "Sampai Lutut",
        "closeup": "Close-up Wajah"
      },
      "generateButton": "✨ Ganti Pose",
      "errors": {
        "noModelImage": "Upload foto modelnya dulu dong."
      }
    },
    "adCreator": {
      "page": {
        "title": "Digi Poster",
        "description": "Bikin desain poster iklan otomatis lengkap dengan teks promosi yang menarik."
      },
      "sections": {
        "addCopy": {
          "title": "2. Isi Teks Iklan",
          "subtitle": "Apa yang mau ditulis di poster?"
        }
      },
      "form": {
        "headline": {
          "label": "Judul Besar",
          "placeholder": "cth., 'Diskon Spesial Hari Ini!'"
        },
        "description": {
          "label": "Tulisan Kecil / Deskripsi",
          "placeholder": "cth., 'Beli 1 Gratis 1 khusus member.'"
        },
        "cta": {
          "label": "Tombol / Ajakan (Call to Action)",
          "placeholder": "cth., 'Beli Sekarang'"
        },
        "reference": {
          "label": "Contoh Desain (Opsional)",
          "description": "Punya contoh poster yang disuka? Upload biar AI niru gayanya."
        },
        "instructions": {
          "label": "Catatan Desain (Opsional)",
          "placeholder": "cth., 'Bikin warnanya dominan merah dan emas.'"
        }
      },
      "generateButton": "✨ Desain Poster",
      "errors": {
        "noProductImage": "Upload produknya dulu ya.",
        "noHeadline": "Judul iklannya belum diisi."
      },
      "copywriter": {
        "button": "✨ Bantu Bikin Kata-kata",
        "modalTitle": "Asisten Penulis AI",
        "productNameLabel": "Nama Produk",
        "productNamePlaceholder": "cth., 'Sepatu Lari Kencang'",
        "keywordsLabel": "Kata Kunci / Fitur",
        "keywordsPlaceholder": "cth., 'ringan, empuk, diskon'",
        "generateButton": "Cari Ide",
        "useButton": "Pakai Ini",
        "loading": "Lagi mikirin kata-kata jualan...",
        "suggestionsFor": {
          "headline": "Ide Judul",
          "description": "Ide Deskripsi",
          "cta": "Ide Tombol Ajakan"
        },
        "error": "Gagal cari ide. Coba lagi ya."
      }
    },
    "imageEditor": {
      "page": {
        "title": "Digi Editor",
        "description": "Edit bagian foto yang nggak dimau, hapus objek, atau ganti detail foto sesuka hati."
      },
      "tools": {
        "resize": {
          "title": "Ubah Ukuran (Resize)",
          "description": "Ubah ukuran foto jadi kotak, portrait, atau landscape tanpa bikin gepeng (AI akan nambahin backgroundnya).",
          "label": "Pilih Ukuran Baru",
          "ar_1_1": "1:1 (Kotak)",
          "ar_4_3": "4:3",
          "ar_3_4": "3:4",
          "ar_16_9": "16:9 (Youtube)",
          "ar_9_16": "9:16 (Story/Reels)",
          "ar_3_2": "3:2",
          "ar_2_3": "2:3"
        },
        "digiBrush": {
          "title": "Kuas Ajaib (Digi Brush)",
          "description": "Warnai area yang mau diedit, terus suruh AI ngapain aja.",
          "promptLabel": "Perintah Edit",
          "promptPlaceholder": "cth., 'hapus orang ini', 'ganti jadi vas bunga', 'ganti warna baju jadi merah'",
          "brushSize": "Ukuran Kuas",
          "undo": "Batal",
          "clear": "Hapus Semua"
        }
      },
      "generateButton": "✨ Jalankan Perintah",
      "errors": {
        "noMask": "Warnai dulu bagian foto yang mau diedit pakai kuas.",
        "noPrompt": "Tulis perintahnya dulu, mau diapain bagian itu?"
      }
    },
    "videoStudio": {
      "page": {
        "title": "Studio Video",
        "description": "Hidupkan foto produk yang diam jadi video gerak singkat yang estetik."
      },
      "sections": {
        "upload": {
          "title": "1. Unggah Gambar",
          "subtitle": "Pilih foto yang mau digerakkan."
        },
        "prompt": {
          "title": "2. Mau Gerak Kayak Gimana?",
          "subtitle": "Ceritain gerakannya."
        }
      },
      "form": {
        "prompt": {
          "label": "Deskripsi Gerakan",
          "placeholder": "cth., 'Kamera zoom in perlahan ke produk, ada asap tipis mengepul, cahaya berkilauan.'"
        },
        "digiPrompt": {
          "label": "Bantu Bikin Deskripsi",
          "loading": "Mikirin..."
        }
      },
      "generateButton": "✨ Bikin Video",
      "loading": {
        "title": "Lagi syuting video...",
        "messages": "[\"Sabar ya, bikin video emang butuh waktu...\",\"Lagi ngatur kamera dan pencahayaan...\",\"Render frame demi frame biar halus...\",\"Dikit lagi jadi kok, hasilnya bakal keren!\"]"
      },
      "results": {
        "title": "3. Hasil Video",
        "description": "Videomu sudah jadi! Bisa langsung diputar atau didownload.",
        "downloadButton": "Simpan Video",
        "placeholder": "Video hasil karyamu bakal muncul di sini."
      },
      "errors": {
        "noPrompt": "Tulis dulu deskripsi gerakannya.",
        "noImage": "Upload gambarnya dulu."
      },
      "quotaWarning": "Info: Fitur Video ini adalah BONUS ujicoba. Google membatasi kuota pembuatan video (sekitar 10 video per akun). Kalau gagal, mungkin kuotanya habis."
    },
    "notes": {
      "staticWarning": "Demo: Hasil tidak disimpan di server. Langsung download ya kalau sudah jadi.",
      "navigationWarning": "JANGAN tutup atau pindah halaman ini selagi proses berjalan, nanti gagal."
    },
    "mockupGenerator": {
      "page": {
        "title": "Digi Mockup",
        "description": "Tempel desain logomu ke berbagai produk (kaos, mug, dll) secara instan."
      },
      "sections": {
        "uploadDesign": {
          "title": "1. Unggah Desain",
          "subtitle": "Logo atau gambar yang mau ditempel."
        },
        "chooseMockup": {
          "title": "2. Pilih Mockup",
          "subtitle": "Pilih jenis barang atau upload foto barang sendiri."
        }
      },
      "presets": {
        "tshirt": "Kaos Putih",
        "mug": "Mug Keramik",
        "totebag": "Tote Bag Kanvas",
        "hoodie": "Hoodie Hitam",
        "box": "Box Kemasan"
      },
      "tabs": {
        "presets": "Pilih dari Daftar",
        "upload": "Upload Mockup Sendiri"
      },
      "generateButton": "✨ Pasang Mockup",
      "errors": {
        "noDesign": "Upload desainnya dulu ya.",
        "noMockup": "Pilih mockup dari daftar atau upload foto barangnya sendiri."
      }
    },
    "digiPhotoshoot": {
      "page": {
        "title": "Digi Photoshoot",
        "description": "Ubah foto biasa jadi potret studio kelas atas dengan nuansa Korea atau Cinematic."
      },
      "sections": {
        "upload": {
          "title": "1. Unggah Foto Sumber",
          "subtitle": "Direkomendasikan foto resolusi tinggi."
        },
        "theme": {
          "title": "2. Tema Khusus (Opsional)",
          "subtitle": "Tambahkan nuansa khusus jika diinginkan."
        }
      },
      "form": {
        "customTheme": {
          "placeholder": "Contoh: Nuansa neon city malam hari, atau elegan di perpustakaan tua..."
        }
      },
      "generateButton": "Buat 4 Foto Studio",
      "errors": {
        "noImage": "Harap unggah gambar terlebih dahulu."
      }
    }
  },
  "en": {
    "header": {
      "subtitle": "AI Product Photography",
      "about": "About"
    },
    "footer": {
      "createdBy": "made by"
    },
    "sidebar": {
      "virtualTryOn": "Digi TryOn",
      "productStudio": "DigiProducts",
      "digiModel": "Digi Models",
      "digiFashion": "DigiFashion",
      "digiBRoll": "Digi B-Roll",
      "povStudio": "Digi POV Studio",
      "listingStudio": "Digi Listing",
      "digiPose": "Digi Pose",
      "digiGenEditor": "Digi Editor",
      "digiRestore": "Digi Restore",
      "digiFaceSwap": "Digi Face Swap",
      "digiFusion": "Digi Fusion",
      "mergeProduct": "DigiMerge",
      "backgroundChanger": "DigiBackground",
      "lifestylePhotoshoot": "DigiLifestyle",
      "digiCarousel": "Digi Carousel",
      "adCreator": "Digi Posters",
      "mockupGenerator": "Digi Mockup",
      "digiPhotoshoot": "Digi Photoshoot",
      "digiVideo": "DigiVideo",
      "digiStoryboard": "DigiStoryboard",
      "digiVoice": "DigiVoice",
      "motionPromptStudio": "Digi Motion Prompt",
      "videoStudio": "Video Studios",
      "mirrorStudio": "Digi Mirror",
      "perspectiveStudio": "DigiPerspective",
      "digitalImaging": "Digi Imaging"
    },
    "about": {
      "title": "About AIDIGITRANS.COM",
      "description": "This application uses the latest Google Gemini AI technology to help MSMEs and content creators create high-quality visual assets easily, quickly and cost-effectively.",
      "techStack": "About",
      "geminiModels": "Gemini Models Used",
      "geminiFlashImage": "The brains behind editing and creating images.",
      "geminiFlash": "Brain for creating advertising texts and creative ideas.",
      "geminiVeo": "Technology for creating videos from images.",
      "productStudio": "Turn ordinary product photos into professional studio photos with various aesthetic themes.",
      "virtualTryOn": "Try clothes on AI models or your own photos without having to change into real clothes.",
      "lifestylePhotoshoot": "Put the product in a real situation (eg: in a cafe, in a park) to make it more alive.",
      "mergeProduct": "Combine several images into one neat frame. Suitable for making bundling packages or collections.",
      "poseStudio": "Change the style of the model's pose in your photo to a variety of new styles so you don't get bored.",
      "adCreator": "Create an auto advertising poster design complete with attractive promotional text.",
      "imageEditor": "Edit unwanted parts of the photo, delete objects, or change photo details as you wish.",
      "digitalImaging": "Create artistic and unique product photos, like professional editing.",
      "videoStudio": "Turn still product photos into short, aesthetic motion videos.",
      "povStudio": "Make photos as if the product is being held in your hand (POV), suitable for reviews.",
      "mirrorStudio": "Take selfie style photos in front of the mirror for fashion products or cellphone cases.",
      "listingStudio": "Create clear product information images (infographics) to place on the marketplace.",
      "perspectiveStudio": "Match the style of product photos from the front, side and back so that they are uniform.",
      "backgroundChanger": "Erase and replace the background of your product photo with another scene instantly.",
      "digiStoryboard": "Visualize your story idea into a panel image (storyboard) before making a video.",
      "digiVideo": "Turn a written idea or image into a cool cinematic video.",
      "mockupGenerator": "Paste your logo design onto various products (t-shirts, mugs, etc.) instantly.",
      "digiPhotoshoot": "Turn ordinary photos into high-end studio portraits with a Korean or Cinematic feel.",
      "digiBRoll": "Upload 1 product image, add a model (optional), and let AI create 6 professional photo poses.",
      "developedBy": "Developed by",
      "closeButton": "Closed"
    },
    "sections": {
      "upload": {
        "title": "1. Upload Image",
        "subtitle": "Choose your best photo that is clear and bright."
      },
      "style": {
        "title": "2. Choose a Style",
        "subtitle": "What kind of photo do you want to make? Vote here."
      },
      "tools": {
        "title": "2. Select Tools",
        "subtitle": "Choose a magic tool to edit your photos.",
        "options": {
          "title": "3. Settings",
          "subtitle": "Adjust the details to make it fit better."
        }
      }
    },
    "uploader": {
      "productLabel": "Upload Product Photos",
      "imageLabel": "Upload Image",
      "modelLabel": "Upload Model Photo",
      "referenceLabel": "Upload Style Example (Reference)",
      "styleReferenceLabel": "Upload Style Reference",
      "backgroundLabel": "Upload New Background",
      "designLabel": "Upload Design/Logo",
      "mockupLabel": "Upload a Plain Mockup",
      "fileTypes": "Format: PNG, JPG, WEBP (Max 10MB)"
    },
    "options": {
      "smart": {
        "title": "Smart Auto",
        "description": "Let AI think and choose the best style for your product."
      },
      "customize": {
        "theme": {
          "label": "Select Theme",
          "other": "Write Yourself..."
        },
        "customTheme": {
          "label": "Custom Themes",
          "placeholder": "e.g., 'On a wooden table in the morning sun'"
        },
        "props": {
          "label": "Add Property (Optional)",
          "placeholder": "e.g., 'there are dried flowers and coffee beans'"
        }
      },
      "reference": {
        "description": "Have examples of good photos? Upload it here, AI will copy the style."
      },
      "shared": {
        "instructions": {
          "label": "Additional Notes (Optional)",
          "placeholderCustomize": "e.g., 'Make sure the product looks bright and clear'",
          "placeholderReference": "e.g., 'Follow the lighting from this example photo'"
        }
      },
      "enhanceButton": "Start Photo Magic"
    },
    "results": {
      "title": "3. Photo Results",
      "titleEditor": "4. Edit Results",
      "description": "Tadaa! This is your new photo.",
      "descriptionEditor": "This is your edited photo.",
      "loading": {
        "title": "Taking photos...",
        "titleEditor": "Editing...",
        "subtitle": "Wait a moment, AI is working for you."
      },
      "error": {
        "title": "Well, Failed...",
        "button": "Come on, try again"
      },
      "placeholder": "The resulting photos will appear here.",
      "imageAlt": "AI generation photo",
      "variantLabel": "Choice",
      "downloadButton": "Save Image",
      "resetButton": "Repeat again"
    },
    "errors": {
      "noProductImage": "Don't forget to upload a photo of the product first.",
      "noImage": "Please upload the picture first.",
      "noReferenceImage": "You need to upload an example (reference) photo for this mode."
    },
    "themes": {
      "cleanStudio": "Clean Studio (White Background)",
      "dramaticMoody": "Dramatic & Elegant (Dark Background)",
      "naturalOrganic": "Natural & Organic Feel",
      "vibrantPlayful": "Cheerful & Colorful",
      "modernSleek": "Modern & Contemporary",
      "softDreamy": "Soft & Aesthetic",
      "industrialRugged": "Industrial Style",
      "vintageNostalgic": "Vintage / Old School",
      "luxeElegant": "Luxurious & Expensive",
      "minimalistZen": "Calm & Minimalist",
      "cosmicFuturistic": "Future & Neon",
      "cozyRustic": "Comfortable & Homey",
      "tropicalParadise": "Tropical Holiday Atmosphere",
      "aquaticFreshness": "Fresh & Juicy",
      "urbanStreet": "City Street Style",
      "holidayCheer": "Holiday / Christmas atmosphere"
    },
    "perspectiveStudio": {
      "page": {
        "title": "DigiPerspective",
        "description": "Do you have product photos from the front, side and back? Upload them all here, AI will make their backgrounds uniform and aesthetic."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Product Side",
          "subtitle": "At least upload 1 side, but more is better."
        },
        "style": {
          "title": "2. Choose a Style",
          "subtitle": "What kind of background do you want for all these photos?"
        }
      },
      "labels": {
        "front": "Front look",
        "back": "Back view",
        "side": "Side view",
        "top": "Top/Detail View"
      },
      "generateButton": "✨ Uniform the background",
      "errors": {
        "noImages": "Upload at least one side of the product photo."
      }
    },
    "povStudio": {
      "page": {
        "title": "Digi POV Studio",
        "description": "Make photos as if the product is being held in your hand (POV), suitable for reviews."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Products",
          "subtitle": "Just take a photo of the product, no hands."
        },
        "configure": {
          "title": "2. Set Style",
          "subtitle": "Choose whose hand and where you want the photo."
        }
      },
      "handStyle": {
        "label": "Hand Model",
        "auto": "Just automatically",
        "female": "Girl's Hands",
        "male": "Boy's Hands",
        "sweater": "Wear a Sweater"
      },
      "background": {
        "modeLabel": "Backgrounds",
        "preset": "Select Theme",
        "custom": "Upload Yourself",
        "themeLabel": "What atmosphere do you want?"
      },
      "themes": {
        "cozyBedroom": "In a Comfortable Room",
        "aestheticDesk": "On Aesthetic Workbench",
        "softMinimalist": "Minimalist Plain Walls",
        "cafeVibes": "Hanging out at the Cafe",
        "urbanOutdoor": "City Streets",
        "natureWalk": "Take a Walk in Nature",
        "bathroomSelfie": "In Front of the Sink Glass"
      },
      "generateButton": "✨ Create POV Photos",
      "errors": {
        "noBackground": "Don't forget to upload the background."
      }
    },
    "backgroundChanger": {
      "page": {
        "title": "DigiBackground",
        "description": "Erase and replace the background of your product photo with another scene instantly."
      },
      "tabs": {
        "change": "Change Background",
        "remove": "Remove Background"
      },
      "sections": {
        "upload": {
          "title": "1. Upload Products",
          "subtitle": "Select the product photo whose background you want to change."
        },
        "method": {
          "title": "2. Select Background",
          "subtitle": "Do you want to upload your own images or have them created by AI?"
        },
        "remove": {
          "title": "2. Remove Background",
          "subtitle": "AI will separate objects from the background."
        }
      },
      "modes": {
        "upload": "Upload Yourself",
        "generate": "Made by AI"
      },
      "form": {
        "prompt": {
          "label": "What background do you want?",
          "placeholder": "e.g., 'On a white marble table', 'On the sand of Bali beach'"
        },
        "instructions": {
          "label": "Additional Notes (Optional)",
          "placeholder": "e.g., 'Make the shadows more natural', 'Light from the left'"
        }
      },
      "generateButton": "✨ Change Background",
      "removeButton": "✂️ Remove Background",
      "errors": {
        "noProduct": "Upload a photo of the product first.",
        "noBackground": "Please upload a replacement background photo.",
        "noPrompt": "First write down what kind of background you want."
      }
    },
    "mirrorStudio": {
      "page": {
        "title": "Digi Mirror",
        "description": "Take selfie style photos in front of the mirror for fashion products or cellphone cases."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Products",
          "subtitle": "What products do you want to display? (HP Cases, Bags, Clothes)"
        },
        "configure": {
          "title": "2. Set Model & Location",
          "subtitle": "Choose who the model is and where the photo is."
        }
      },
      "options": {
        "modelSourceLabel": "Where does the model come from?",
        "generate": "Create an AI Model",
        "upload": "Upload your own photos",
        "uploadModelLabel": "Upload Model Photo",
        "genderLabel": "Gender Models",
        "ethnicityLabel": "Model Face (Ethnicity)",
        "ethnicityPlaceholder": "e.g., Indonesian, Asian, Caucasian",
        "frameLabel": "Photo Distance",
        "themeLabel": "Mirror Location",
        "female": "Girl",
        "male": "Guy"
      },
      "themes": {
        "elevatorSelfie": "Elevator Mirror",
        "gymMirror": "Gym Mirror",
        "bathroomAesthetic": "Aesthetic Bathroom",
        "bedroomOotd": "Bedroom Mirror",
        "fittingRoom": "Mall Changing Rooms",
        "streetReflection": "Shop Window Glass"
      },
      "frames": {
        "halfBody": "Half Body",
        "fullBody": "Whole Body",
        "closeUp": "Close Up (Focus on HP/Hands)"
      },
      "generateButton": "✨ Check Selfie",
      "errors": {
        "noModel": "Upload a photo of the person first."
      }
    },
    "listingStudio": {
      "page": {
        "title": "Digi Listing",
        "description": "Create clear product information images (infographics) to place on the marketplace."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Products",
          "subtitle": "Select your main product photo."
        },
        "features": {
          "title": "2. Featured Features",
          "subtitle": "What are the advantages of your product? Write 3-5 points."
        },
        "style": {
          "title": "3. Appearance Design",
          "subtitle": "Choose a design style that matches your brand."
        }
      },
      "form": {
        "addFeature": "Add Points",
        "featurePlaceholder": "e.g. 'Waterproof', 'Long Battery Life'",
        "styleLabel": "Select Design Style"
      },
      "styles": {
        "minimalistWhite": "Clean White (Minimalist)",
        "techSpecs": "Technology (Dark & ​​Neon)",
        "ecoOrganic": "Natural (Earth Color)",
        "boldSale": "Promo (Strong & Striking)",
        "luxuryElegant": "Luxury (Elegant)"
      },
      "generateButton": "✨ Create Listing Image",
      "errors": {
        "minFeatures": "Write down at least 1 advantage of your product."
      }
    },
    "productStudio": {
      "page": {
        "title": "DigiProducts",
        "description": "Turn ordinary product photos into professional studio photos with various aesthetic themes."
      },
      "steps": {
        "upload": "1. Upload Photos",
        "lighting": "2. Lighting",
        "mood": "3. Atmosphere",
        "ratio": "4. Photo Size",
        "location": "5. Location"
      },
      "options": {
        "light": "Bright",
        "dark": "Dark",
        "clean": "Clean",
        "crowd": "Crowded",
        "indoor": "Indoor",
        "outdoor": "Outdoor"
      },
      "generateButton": "Create Studio Photos",
      "generatingConcepts": "Looking for concept ideas...",
      "visualizing": "Visualizing...",
      "resultsTitle": "4 Photo Studio Variations"
    },
    "mergeProduct": {
      "page": {
        "title": "DigiMerge",
        "description": "Combine several images into one neat frame. Suitable for making bundling packages or collections."
      },
      "sections": {
        "uploadProducts": {
          "title": "1. Upload Image",
          "subtitle": "Minimum 2 images to be combined.",
          "addProduct": "Add Another Image"
        }
      },
      "errors": {
        "atLeastTwo": "There must be a minimum of 2 images to combine."
      }
    },
    "digitalImaging": {
      "page": {
        "title": "Digi Imaging",
        "description": "Create artistic and unique product photos, like professional editing."
      },
      "modes": {
        "customize": "Arrange Yourself",
        "generateConcept": "Ask for AI Ideas"
      },
      "sections": {
        "style": {
          "title": "3. Set Style",
          "subtitle": "Choose an art theme that you like."
        },
        "concept": {
          "title": "2. Choose a method",
          "subtitle": "Do you want to organize it yourself or let AI give you creative ideas?"
        }
      },
      "conceptGenerator": {
        "title": "3. Look for Creative Ideas",
        "subtitle": "Biarkan AI melihat produkmu dan kasih saran konsep yang keren.",
        "button": "✨ Cari Ide Konsep",
        "loading": "Lagi mikirin ide-ide liar...",
        "resultsTitle": "4. Pilih Concept",
        "resultsSubtitle": "Pilih salah satu ide di bawah ini buat digenerate.",
        "generateImageButton": "Pilih & Buat"
      },
      "generateButton": "✨ Buat Karya Seni",
      "errors": {
        "conceptError": "Gagal cari ide nih. Coba lagi ya."
      },
      "themes": {
        "miniatureWorld": "Dunia Miniatur (Kecil)",
        "natureFusion": "Menatu dengan Alam",
        "surrealFloating": "Melayang & Ajaib",
        "cyberneticGlow": "Cyberpunk & Neon",
        "watercolorSplash": "Percikan Cat Air",
        "papercraftArt": "Kerajinan Kertas",
        "galaxyInfused": "Luar Angkasa",
        "architecturalIllusion": "Ilusi Bangunan"
      }
    },
    "virtualTryOn": {
      "page": {
        "title": "Digi TryOn",
        "description": "Cobain baju ke model AI atau fotomu sendiri tanpa perlu ganti baju beneran."
      },
      "sections": {
        "uploadProduct": {
          "title": "1. Unggah Baju",
          "subtitle": "Lengkapi slot tampak depan dan belakang untuk hasil 360° maksimal.",
          "addProduct": "Tambah Baju"
        },
        "provideModel": {
          "title": "2. Siapkan Model",
          "subtitle": "Mau pakai foto sendiri atau model buatan AI?"
        }
      },
      "labels": {
        "front": "Tampak Depan",
        "back": "Tampak Belakang"
      },
      "modelOptions": {
        "upload": "Foto Sendiri",
        "generate": "Buat Model AI",
        "gender": "Gender",
        "female": "Cewek",
        "male": "Cowok",
        "other": "Lainnya",
        "ethnicity": "Wajah (Etnis)",
        "aspectRatio": "Ukuran Foto",
        "ethnicities": {
          "caucasian": "Bule (Eropa)",
          "asian": "Asia",
          "african": "Afrika",
          "hispanic": "Latin",
          "middleEastern": "Timur Tengah",
          "other": "Lainnya"
        },
        "details": "Detail Tambahan",
        "detailsPlaceholder": "cth., 'rambut panjang, tersenyum, pakai kacamata'",
        "customEthnicity": {
          "label": "Etnis Khusus",
          "placeholder": "cth., 'Jawa', 'Sunda', 'Korea'"
        }
      },
      "errors": {
        "noProducts": "Upload foto bajunya dulu ya.",
        "noFrontImage": "Upload foto tampak depan baju dulu ya (slot utama).",
        "noModel": "Upload foto modelnya (orangnya) dulu."
      },
      "generateButton": "✨ Pasang Baju"
    },
    "lifestylePhotoshoot": {
      "page": {
        "title": "Digi Lifestyle",
        "description": "Masukin produk ke situasi nyata (misal: di kafe, di taman) biar lebih hidup."
      },
      "sections": {
        "uploadProduct": {
          "title": "1. Unggah Produk",
          "subtitle": "Produk apa yang mau difoto?"
        },
        "provideModel": {
          "title": "2. Model",
          "subtitle": "Siapa yang pakai? Upload foto atau buat model AI."
        },
        "direct": {
          "title": "3. Arahan Gaya",
          "subtitle": "Ceritain adegan apa yang kamu mau."
        }
      },
      "form": {
        "interaction": {
          "label": "Deskripsi Adegan",
          "placeholder": "cth., 'Wanita sedang duduk santai di sofa sambil memegang botol skincare, tersenyum rileks, cahaya matahari pagi masuk dari jendela.'"
        }
      },
      "generateButton": "✨ Buat Foto Lifestyle",
      "errors": {
        "noProduct": "Produknya belum diupload.",
        "noModel": "Modelnya belum ada."
      }
    },
    "poseStudio": {
      "page": {
        "title": "Digi Pose",
        "description": "Ubah gaya pose model di fotomu jadi macem-macem gaya baru biar nggak bosenin."
      },
      "sections": {
        "uploadModel": {
          "title": "1. Unggah Foto",
          "subtitle": "Foto model yang sedang pakai produk."
        },
        "chooseStyle": {
          "title": "2. Pilih Pose Baru",
          "subtitle": "Mau diganti jadi gaya apa?"
        }
      },
      "modes": {
        "smart": {
          "title": "Otomatis",
          "description": "Biarkan AI yang pilihin pose-pose keren buat kamu."
        },
        "customize": {
          "title": "Atur Sendiri"
        }
      },
      "form": {
        "theme": {
          "label": "Tema Foto"
        },
        "angle": {
          "label": "Sudut Kamera"
        },
        "framing": {
          "label": "Jarak Foto"
        },
        "instructions": {
          "label": "Catatan (Opsional)",
          "placeholder": "cth., 'Bikin modelnya terlihat lebih bahagia'"
        }
      },
      "angles": {
        "eyeLevel": "Sejajar Mata",
        "highAngle": "Dari Atas",
        "lowAngle": "Dari Bawah"
      },
      "frames": {
        "fullBody": "Seluruh Badan",
        "mediumShot": "Setengah Badan",
        "cowboyShot": "Sampai Lutut",
        "closeup": "Close-up Wajah"
      },
      "generateButton": "✨ Ganti Pose",
      "errors": {
        "noModelImage": "Upload foto modelnya dulu dong."
      }
    },
    "adCreator": {
      "page": {
        "title": "Digi Poster",
        "description": "Bikin desain poster iklan otomatis lengkap dengan teks promosi yang menarik."
      },
      "sections": {
        "addCopy": {
          "title": "2. Isi Teks Iklan",
          "subtitle": "Apa yang mau ditulis di poster?"
        }
      },
      "form": {
        "headline": {
          "label": "Judul Besar",
          "placeholder": "cth., 'Diskon Spesial Hari Ini!'"
        },
        "description": {
          "label": "Tulisan Kecil / Deskripsi",
          "placeholder": "cth., 'Beli 1 Gratis 1 khusus member.'"
        },
        "cta": {
          "label": "Tombol / Ajakan (Call to Action)",
          "placeholder": "cth., 'Beli Sekarang'"
        },
        "reference": {
          "label": "Contoh Desain (Opsional)",
          "description": "Punya contoh poster yang disuka? Upload biar AI niru gayanya."
        },
        "instructions": {
          "label": "Catatan Desain (Opsional)",
          "placeholder": "cth., 'Bikin warnanya dominan merah dan emas.'"
        }
      },
      "generateButton": "✨ Desain Poster",
      "errors": {
        "noProductImage": "Upload produknya dulu ya.",
        "noHeadline": "Judul iklannya belum diisi."
      },
      "copywriter": {
        "button": "✨ Bantu Bikin Kata-kata",
        "modalTitle": "Asisten Penulis AI",
        "productNameLabel": "Nama Produk",
        "productNamePlaceholder": "cth., 'Sepatu Lari Kencang'",
        "keywordsLabel": "Kata Kunci / Fitur",
        "keywordsPlaceholder": "cth., 'ringan, empuk, diskon'",
        "generateButton": "Cari Ide",
        "useButton": "Pakai Ini",
        "loading": "Lagi mikirin kata-kata jualan...",
        "suggestionsFor": {
          "headline": "Ide Judul",
          "description": "Ide Deskripsi",
          "cta": "Ide Tombol Ajakan"
        },
        "error": "Gagal cari ide. Coba lagi ya."
      }
    },
    "imageEditor": {
      "page": {
        "title": "Digi Editor",
        "description": "Edit bagian foto yang nggak dimau, hapus objek, atau ganti detail foto sesuka hati."
      },
      "tools": {
        "resize": {
          "title": "Ubah Ukuran (Resize)",
          "description": "Ubah ukuran foto jadi kotak, portrait, atau landscape tanpa bikin gepeng (AI akan nambahin backgroundnya).",
          "label": "Pilih Ukuran Baru",
          "ar_1_1": "1:1 (Kotak)",
          "ar_4_3": "4:3",
          "ar_3_4": "3:4",
          "ar_16_9": "16:9 (Youtube)",
          "ar_9_16": "9:16 (Story/Reels)",
          "ar_3_2": "3:2",
          "ar_2_3": "2:3"
        },
        "digiBrush": {
          "title": "Kuas Ajaib (Digi Brush)",
          "description": "Warnai area yang mau diedit, terus suruh AI ngapain aja.",
          "promptLabel": "Perintah Edit",
          "promptPlaceholder": "cth., 'hapus orang ini', 'ganti jadi vas bunga', 'ganti warna baju jadi merah'",
          "brushSize": "Ukuran Kuas",
          "undo": "Batal",
          "clear": "Hapus Semua"
        }
      },
      "generateButton": "✨ Jalankan Perintah",
      "errors": {
        "noMask": "Warnai dulu bagian foto yang mau diedit pakai kuas.",
        "noPrompt": "Tulis perintahnya dulu, mau diapain bagian itu?"
      }
    },
    "videoStudio": {
      "page": {
        "title": "Studio Video",
        "description": "Hidupkan foto produk yang diam jadi video gerak singkat yang estetik."
      },
      "sections": {
        "upload": {
          "title": "1. Unggah Gambar",
          "subtitle": "Pilih foto yang mau digerakkan."
        },
        "prompt": {
          "title": "2. Mau Gerak Kayak Gimana?",
          "subtitle": "Ceritain gerakannya."
        }
      },
      "form": {
        "prompt": {
          "label": "Deskripsi Gerakan",
          "placeholder": "cth., 'Kamera zoom in perlahan ke produk, ada asap tipis mengepul, cahaya berkilauan.'"
        },
        "digiPrompt": {
          "label": "Bantu Bikin Deskripsi",
          "loading": "Mikirin..."
        }
      },
      "generateButton": "✨ Bikin Video",
      "loading": {
        "title": "Lagi syuting video...",
        "messages": "[\"Sabar ya, bikin video emang butuh waktu...\",\"Lagi ngatur kamera dan pencahayaan...\",\"Render frame demi frame biar halus...\",\"Dikit lagi jadi kok, hasilnya bakal keren!\"]"
      },
      "results": {
        "title": "3. Hasil Video",
        "description": "Videomu sudah jadi! Bisa langsung diputar atau didownload.",
        "downloadButton": "Simpan Video",
        "placeholder": "Video hasil karyamu bakal muncul di sini."
      },
      "errors": {
        "noPrompt": "Tulis dulu deskripsi gerakannya.",
        "noImage": "Upload gambarnya dulu."
      },
      "quotaWarning": "Info: Fitur Video ini adalah BONUS ujicoba. Google membatasi kuota pembuatan video (sekitar 10 video per akun). Kalau gagal, mungkin kuotanya habis."
    },
    "notes": {
      "staticWarning": "Demo: Hasil tidak disimpan di server. Langsung download ya kalau sudah jadi.",
      "navigationWarning": "JANGAN tutup atau pindah halaman ini selagi proses berjalan, nanti gagal."
    },
    "mockupGenerator": {
      "page": {
        "title": "Digi Mockup",
        "description": "Tempel desain logomu ke berbagai produk (kaos, mug, dll) secara instan."
      },
      "sections": {
        "uploadDesign": {
          "title": "1. Unggah Desain",
          "subtitle": "Logo atau gambar yang mau ditempel."
        },
        "chooseMockup": {
          "title": "2. Pilih Mockup",
          "subtitle": "Pilih jenis barang atau upload foto barang sendiri."
        }
      },
      "presets": {
        "tshirt": "Kaos Putih",
        "mug": "Mug Keramik",
        "totebag": "Tote Bag Kanvas",
        "hoodie": "Hoodie Hitam",
        "box": "Box Kemasan"
      },
      "tabs": {
        "presets": "Pilih dari Daftar",
        "upload": "Upload Mockup Sendiri"
      },
      "generateButton": "✨ Pasang Mockup",
      "errors": {
        "noDesign": "Upload desainnya dulu ya.",
        "noMockup": "Pilih mockup dari daftar atau upload foto barangnya sendiri."
      }
    },
    "digiPhotoshoot": {
      "page": {
        "title": "Digi Photoshoot",
        "description": "Ubah foto biasa jadi potret studio kelas atas dengan nuansa Korea atau Cinematic."
      },
      "sections": {
        "upload": {
          "title": "1. Unggah Foto Sumber",
          "subtitle": "Direkomendasikan foto resolusi tinggi."
        },
        "theme": {
          "title": "2. Tema Khusus (Opsional)",
          "subtitle": "Tambahkan nuansa khusus jika diinginkan."
        }
      },
      "form": {
        "customTheme": {
          "placeholder": "Contoh: Nuansa neon city malam hari, atau elegan di perpustakaan tua..."
        }
      },
      "generateButton": "Buat 4 Foto Studio",
      "errors": {
        "noImage": "Harap unggah gambar terlebih dahulu."
      }
    },
    "license": {
      "title": "Lisensi & Penggunaan Aplikasi",
      "subtitle": "Harap pahami hak dan batasan Anda saat menggunakan AIDIGITRANS.COM.",
      "intellectualProperty": {
        "title": "Kepemilikan Intelektual",
        "desc": "Seluruh hak kekayaan intelektual atas aplikasi ini—termasuk konsep, desain, kode, dan alur kerja—adalah milik eksklusif",
        "desc2": "Lisensi ini tidak memberikan hak kepemilikan apa pun kepada pengguna."
      },
      "permittedUse": {
        "title": "Penggunaan yang Diizinkan",
        "desc": "Anda diberikan lisensi terbatas untuk menggunakan aplikasi ini untuk keperluan pribadi atau bisnis yang sah, sesuai dengan fungsionalitas yang disediakan."
      },
      "restrictions": {
        "title": "Batasan & Larangan",
        "desc": "Anda dilarang keras untuk melakukan tindakan berikut:",
        "item1": "Menyalin, menduplikasi, atau mereproduksi aplikasi dalam bentuk apa pun.",
        "item2": "Melakukan rekayasa balik (reverse-engineering), membongkar, atau memodifikasi sistem.",
        "item3": "Menjual kembali, menyewakan, atau mendistribusikan ulang aplikasi tanpa izin tertulis dari"
      },
      "warning": {
        "title": "Peringatan Keras",
        "desc": "Penyebaran, penjualan ulang, atau kloning aplikasi ini tanpa izin adalah pelanggaran hukum. Tindakan hukum akan diambil terhadap pihak mana pun yang melanggar ketentuan ini."
      }
    }
  },
  en: {
    "header": {
      "subtitle": "AI Product Photography",
      "about": "About"
    },
    "footer": {
      "createdBy": "made by"
    },
    "sidebar": {
      "virtualTryOn": "Digi TryOn",
      "productStudio": "DigiProducts",
      "digiModel": "Digi Models",
      "digiFashion": "DigiFashion",
      "digiBRoll": "Digi B-Roll",
      "povStudio": "Digi POV Studio",
      "listingStudio": "Digi Listing",
      "digiPose": "Digi Pose",
      "digiGenEditor": "Digi Editor",
      "digiRestore": "Digi Restore",
      "digiFaceSwap": "Digi Face Swap",
      "digiFusion": "Digi Fusion",
      "mergeProduct": "DigiMerge",
      "backgroundChanger": "DigiBackground",
      "lifestylePhotoshoot": "DigiLifestyle",
      "digiCarousel": "Digi Carousel",
      "adCreator": "Digi Posters",
      "mockupGenerator": "Digi Mockup",
      "digiPhotoshoot": "Digi Photoshoot",
      "digiVideo": "DigiVideo",
      "digiStoryboard": "DigiStoryboard",
      "digiVoice": "DigiVoice",
      "motionPromptStudio": "Digi Motion Prompt",
      "videoStudio": "Video Studios",
      "mirrorStudio": "Digi Mirror",
      "perspectiveStudio": "DigiPerspective",
      "digitalImaging": "Digi Imaging"
    },
    "about": {
      "title": "About AIDIGITRANS.COM",
      "description": "This application uses the latest Google Gemini AI technology to help MSMEs and content creators create high-quality visual assets easily, quickly and cost-effectively.",
      "techStack": "About",
      "geminiModels": "Gemini Models Used",
      "geminiFlashImage": "The brains behind editing and creating images.",
      "geminiFlash": "Brain for creating advertising texts and creative ideas.",
      "geminiVeo": "Technology for creating videos from images.",
      "productStudio": "Turn ordinary product photos into professional studio photos with various aesthetic themes.",
      "virtualTryOn": "Try clothes on AI models or your own photos without having to change into real clothes.",
      "lifestylePhotoshoot": "Put the product in a real situation (eg: in a cafe, in a park) to make it more alive.",
      "mergeProduct": "Combine several images into one neat frame. Suitable for making bundling packages or collections.",
      "poseStudio": "Change the style of the model's pose in your photo to a variety of new styles so you don't get bored.",
      "adCreator": "Create an auto advertising poster design complete with attractive promotional text.",
      "imageEditor": "Edit unwanted parts of the photo, delete objects, or change photo details as you wish.",
      "digitalImaging": "Create artistic and unique product photos, like professional editing.",
      "videoStudio": "Turn still product photos into short, aesthetic motion videos.",
      "povStudio": "Make photos as if the product is being held in your hand (POV), suitable for reviews.",
      "mirrorStudio": "Take selfie style photos in front of the mirror for fashion products or cellphone cases.",
      "listingStudio": "Create clear product information images (infographics) to place on the marketplace.",
      "perspectiveStudio": "Match the style of product photos from the front, side and back so that they are uniform.",
      "backgroundChanger": "Erase and replace the background of your product photo with another scene instantly.",
      "digiStoryboard": "Visualize your story idea into a panel image (storyboard) before making a video.",
      "digiVideo": "Turn a written idea or image into a cool cinematic video.",
      "mockupGenerator": "Paste your logo design onto various products (t-shirts, mugs, etc.) instantly.",
      "digiPhotoshoot": "Turn ordinary photos into high-end studio portraits with a Korean or Cinematic feel.",
      "digiBRoll": "Upload 1 product image, add a model (optional), and let AI create 6 professional photo poses.",
      "developedBy": "Developed by",
      "closeButton": "Closed"
    },
    "sections": {
      "upload": {
        "title": "1. Upload Image",
        "subtitle": "Choose your best photo that is clear and bright."
      },
      "style": {
        "title": "2. Choose a Style",
        "subtitle": "What kind of photo do you want to make? Vote here."
      },
      "tools": {
        "title": "2. Select Tools",
        "subtitle": "Choose a magic tool to edit your photos.",
        "options": {
          "title": "3. Settings",
          "subtitle": "Adjust the details to make it fit better."
        }
      }
    },
    "uploader": {
      "productLabel": "Upload Product Photos",
      "imageLabel": "Upload Image",
      "modelLabel": "Upload Model Photo",
      "referenceLabel": "Upload Style Example (Reference)",
      "styleReferenceLabel": "Upload Style Reference",
      "backgroundLabel": "Upload New Background",
      "designLabel": "Upload Design/Logo",
      "mockupLabel": "Upload a Plain Mockup",
      "fileTypes": "Format: PNG, JPG, WEBP (Max 10MB)"
    },
    "options": {
      "smart": {
        "title": "Smart Auto",
        "description": "Let AI think and choose the best style for your product."
      },
      "customize": {
        "theme": {
          "label": "Select Theme",
          "other": "Write Yourself..."
        },
        "customTheme": {
          "label": "Custom Themes",
          "placeholder": "e.g., 'On a wooden table in the morning sun'"
        },
        "props": {
          "label": "Add Property (Optional)",
          "placeholder": "e.g., 'there are dried flowers and coffee beans'"
        }
      },
      "reference": {
        "description": "Have examples of good photos? Upload it here, AI will copy the style."
      },
      "shared": {
        "instructions": {
          "label": "Additional Notes (Optional)",
          "placeholderCustomize": "e.g., 'Make sure the product looks bright and clear'",
          "placeholderReference": "e.g., 'Follow the lighting from this example photo'"
        }
      },
      "enhanceButton": "Start Photo Magic"
    },
    "results": {
      "title": "3. Photo Results",
      "titleEditor": "4. Edit Results",
      "description": "Tadaa! This is your new photo.",
      "descriptionEditor": "This is your edited photo.",
      "loading": {
        "title": "Taking photos...",
        "titleEditor": "Editing...",
        "subtitle": "Wait a moment, AI is working for you."
      },
      "error": {
        "title": "Well, Failed...",
        "button": "Come on, try again"
      },
      "placeholder": "The resulting photos will appear here.",
      "imageAlt": "AI generation photo",
      "variantLabel": "Choice",
      "downloadButton": "Save Image",
      "resetButton": "Repeat again"
    },
    "errors": {
      "noProductImage": "Don't forget to upload a photo of the product first.",
      "noImage": "Please upload the picture first.",
      "noReferenceImage": "You need to upload an example (reference) photo for this mode."
    },
    "themes": {
      "cleanStudio": "Clean Studio (White Background)",
      "dramaticMoody": "Dramatic & Elegant (Dark Background)",
      "naturalOrganic": "Natural & Organic Feel",
      "vibrantPlayful": "Cheerful & Colorful",
      "modernSleek": "Modern & Contemporary",
      "softDreamy": "Soft & Aesthetic",
      "industrialRugged": "Industrial Style",
      "vintageNostalgic": "Vintage / Old School",
      "luxeElegant": "Luxurious & Expensive",
      "minimalistZen": "Calm & Minimalist",
      "cosmicFuturistic": "Future & Neon",
      "cozyRustic": "Comfortable & Homey",
      "tropicalParadise": "Tropical Holiday Atmosphere",
      "aquaticFreshness": "Fresh & Juicy",
      "urbanStreet": "City Street Style",
      "holidayCheer": "Holiday / Christmas atmosphere"
    },
    "perspectiveStudio": {
      "page": {
        "title": "DigiPerspective",
        "description": "Do you have product photos from the front, side and back? Upload them all here, AI will make their backgrounds uniform and aesthetic."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Product Side",
          "subtitle": "At least upload 1 side, but more is better."
        },
        "style": {
          "title": "2. Choose a Style",
          "subtitle": "What kind of background do you want for all these photos?"
        }
      },
      "labels": {
        "front": "Front look",
        "back": "Back view",
        "side": "Side view",
        "top": "Top/Detail View"
      },
      "generateButton": "✨ Uniform the background",
      "errors": {
        "noImages": "Upload at least one side of the product photo."
      }
    },
    "povStudio": {
      "page": {
        "title": "Digi POV Studio",
        "description": "Make photos as if the product is being held in your hand (POV), suitable for reviews."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Products",
          "subtitle": "Just take a photo of the product, no hands."
        },
        "configure": {
          "title": "2. Set Style",
          "subtitle": "Choose whose hand and where you want the photo."
        }
      },
      "handStyle": {
        "label": "Hand Model",
        "auto": "Just automatically",
        "female": "Girl's Hands",
        "male": "Boy's Hands",
        "sweater": "Wear a Sweater"
      },
      "background": {
        "modeLabel": "Backgrounds",
        "preset": "Select Theme",
        "custom": "Upload Yourself",
        "themeLabel": "What atmosphere do you want?"
      },
      "themes": {
        "cozyBedroom": "In a Comfortable Room",
        "aestheticDesk": "On Aesthetic Workbench",
        "softMinimalist": "Minimalist Plain Walls",
        "cafeVibes": "Hanging out at the Cafe",
        "urbanOutdoor": "City Streets",
        "natureWalk": "Take a Walk in Nature",
        "bathroomSelfie": "In Front of the Sink Glass"
      },
      "generateButton": "✨ Create POV Photos",
      "errors": {
        "noBackground": "Don't forget to upload the background."
      }
    },
    "backgroundChanger": {
      "page": {
        "title": "DigiBackground",
        "description": "Erase and replace the background of your product photo with another scene instantly."
      },
      "tabs": {
        "change": "Change Background",
        "remove": "Remove Background"
      },
      "sections": {
        "upload": {
          "title": "1. Upload Products",
          "subtitle": "Select the product photo whose background you want to change."
        },
        "method": {
          "title": "2. Select Background",
          "subtitle": "Do you want to upload your own images or have them created by AI?"
        },
        "remove": {
          "title": "2. Remove Background",
          "subtitle": "AI will separate objects from the background."
        }
      },
      "modes": {
        "upload": "Upload Yourself",
        "generate": "Made by AI"
      },
      "form": {
        "prompt": {
          "label": "What background do you want?",
          "placeholder": "e.g., 'On a white marble table', 'On the sand of Bali beach'"
        },
        "instructions": {
          "label": "Additional Notes (Optional)",
          "placeholder": "e.g., 'Make the shadows more natural', 'Light from the left'"
        }
      },
      "generateButton": "✨ Change Background",
      "removeButton": "✂️ Remove Background",
      "errors": {
        "noProduct": "Upload a photo of the product first.",
        "noBackground": "Please upload a replacement background photo.",
        "noPrompt": "First write down what kind of background you want."
      }
    },
    "mirrorStudio": {
      "page": {
        "title": "Digi Mirror",
        "description": "Take selfie style photos in front of the mirror for fashion products or cellphone cases."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Products",
          "subtitle": "What products do you want to display? (HP Cases, Bags, Clothes)"
        },
        "configure": {
          "title": "2. Set Model & Location",
          "subtitle": "Choose who the model is and where the photo is."
        }
      },
      "options": {
        "modelSourceLabel": "Where does the model come from?",
        "generate": "Create an AI Model",
        "upload": "Upload your own photos",
        "uploadModelLabel": "Upload Model Photo",
        "genderLabel": "Gender Models",
        "ethnicityLabel": "Model Face (Ethnicity)",
        "ethnicityPlaceholder": "e.g., Indonesian, Asian, Caucasian",
        "frameLabel": "Photo Distance",
        "themeLabel": "Mirror Location",
        "female": "Girl",
        "male": "Guy"
      },
      "themes": {
        "elevatorSelfie": "Elevator Mirror",
        "gymMirror": "Gym Mirror",
        "bathroomAesthetic": "Aesthetic Bathroom",
        "bedroomOotd": "Bedroom Mirror",
        "fittingRoom": "Mall Changing Rooms",
        "streetReflection": "Shop Window Glass"
      },
      "frames": {
        "halfBody": "Half Body",
        "fullBody": "Whole Body",
        "closeUp": "Close Up (Focus on HP/Hands)"
      },
      "generateButton": "✨ Check Selfie",
      "errors": {
        "noModel": "Upload a photo of the person first."
      }
    },
    "listingStudio": {
      "page": {
        "title": "Digi Listing",
        "description": "Create clear product information images (infographics) to place on the marketplace."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Products",
          "subtitle": "Select your main product photo."
        },
        "features": {
          "title": "2. Featured Features",
          "subtitle": "What are the advantages of your product? Write 3-5 points."
        },
        "style": {
          "title": "3. Appearance Design",
          "subtitle": "Choose a design style that matches your brand."
        }
      },
      "form": {
        "addFeature": "Add Points",
        "featurePlaceholder": "e.g. 'Waterproof', 'Long Battery Life'",
        "styleLabel": "Select Design Style"
      },
      "styles": {
        "minimalistWhite": "Clean White (Minimalist)",
        "techSpecs": "Technology (Dark & ​​Neon)",
        "ecoOrganic": "Natural (Earth Color)",
        "boldSale": "Promo (Strong & Striking)",
        "luxuryElegant": "Luxury (Elegant)"
      },
      "generateButton": "✨ Create Listing Image",
      "errors": {
        "minFeatures": "Write down at least 1 advantage of your product."
      }
    },
    "productStudio": {
      "page": {
        "title": "DigiProducts",
        "description": "Turn ordinary product photos into professional studio photos with various aesthetic themes."
      },
      "steps": {
        "upload": "1. Upload Photos",
        "lighting": "2. Lighting",
        "mood": "3. Atmosphere",
        "ratio": "4. Photo Size",
        "location": "5. Location"
      },
      "options": {
        "light": "Bright",
        "dark": "Dark",
        "clean": "Clean",
        "crowd": "Crowded",
        "indoor": "Indoor",
        "outdoor": "Outdoor"
      },
      "generateButton": "Create Studio Photos",
      "generatingConcepts": "Looking for concept ideas...",
      "visualizing": "Visualizing...",
      "resultsTitle": "4 Photo Studio Variations"
    },
    "mergeProduct": {
      "page": {
        "title": "DigiMerge",
        "description": "Combine several images into one neat frame. Suitable for making bundling packages or collections."
      },
      "sections": {
        "uploadProducts": {
          "title": "1. Upload Image",
          "subtitle": "Minimum 2 images to be combined.",
          "addProduct": "Add Another Image"
        }
      },
      "errors": {
        "atLeastTwo": "There must be a minimum of 2 images to combine."
      }
    },
    "digitalImaging": {
      "page": {
        "title": "Digi Imaging",
        "description": "Create artistic and unique product photos, like professional editing."
      },
      "modes": {
        "customize": "Arrange Yourself",
        "generateConcept": "Ask for AI Ideas"
      },
      "sections": {
        "style": {
          "title": "3. Set Style",
          "subtitle": "Choose an art theme that you like."
        },
        "concept": {
          "title": "2. Choose a method",
          "subtitle": "Do you want to organize it yourself or let AI give you creative ideas?"
        }
      },
      "conceptGenerator": {
        "title": "3. Look for Creative Ideas",
        "subtitle": "Let AI look at your product and suggest cool concepts.",
        "button": "✨ Look for Concept Ideas",
        "loading": "Thinking of wild ideas...",
        "resultsTitle": "4. Select Concept",
        "resultsSubtitle": "Choose one of the ideas below to generate.",
        "generateImageButton": "Select & Create"
      },
      "generateButton": "✨ Create Artwork",
      "errors": {
        "conceptError": "I couldn't find any ideas. Try again, okay?"
      },
      "themes": {
        "miniatureWorld": "Miniature World (Small)",
        "natureFusion": "Unite with Nature",
        "surrealFloating": "Drift & Magic",
        "cyberneticGlow": "Cyberpunk & Neon",
        "watercolorSplash": "Watercolor Splash",
        "papercraftArt": "Paper Crafts",
        "galaxyInfused": "Outer space",
        "architecturalIllusion": "Building Illusion"
      }
    },
    "virtualTryOn": {
      "page": {
        "title": "Digi TryOn",
        "description": "Try clothes on AI models or your own photos without having to change into real clothes."
      },
      "sections": {
        "uploadProduct": {
          "title": "1. Upload clothes",
          "subtitle": "Complete the front and rear view slots for maximum 360° results.",
          "addProduct": "Add clothes"
        },
        "provideModel": {
          "title": "2. Prepare the Model",
          "subtitle": "Do you want to use your own photo or a model created by AI?"
        }
      },
      "labels": {
        "front": "Front look",
        "back": "Back view"
      },
      "modelOptions": {
        "upload": "Own Photo",
        "generate": "Create an AI Model",
        "gender": "Gender",
        "female": "Girl",
        "male": "Guy",
        "other": "Other",
        "ethnicity": "Face (Ethnicity)",
        "aspectRatio": "Photo Size",
        "ethnicities": {
          "caucasian": "Caucasian (European)",
          "asian": "Asia",
          "african": "Africa",
          "hispanic": "Latin",
          "middleEastern": "the middle East",
          "other": "Other"
        },
        "details": "Additional Details",
        "detailsPlaceholder": "e.g., 'long hair, smile, wear glasses'",
        "customEthnicity": {
          "label": "Special Ethnicity",
          "placeholder": "e.g., 'Javanese', 'Sundanese', 'Korean'"
        }
      },
      "errors": {
        "noProducts": "Please upload a photo of the clothes first.",
        "noFrontImage": "Upload a photo of the front of the shirt first (main slot).",
        "noModel": "Upload a photo of the model (person) first."
      },
      "generateButton": "✨ Put on clothes"
    },
    "lifestylePhotoshoot": {
      "page": {
        "title": "DigiLifestyle",
        "description": "Put the product in a real situation (eg: in a cafe, in a park) to make it more alive."
      },
      "sections": {
        "uploadProduct": {
          "title": "1. Upload Products",
          "subtitle": "What product do you want to photograph?"
        },
        "provideModel": {
          "title": "2. Models",
          "subtitle": "Who uses it? Upload photos or create AI models."
        },
        "direct": {
          "title": "3. Style Direction",
          "subtitle": "Tell me what scene you want."
        }
      },
      "form": {
        "interaction": {
          "label": "Scene Description",
          "placeholder": "for example, 'A woman is sitting relaxed on the sofa holding a skincare bottle, smiling relaxedly, morning sunlight coming in from the window.'"
        }
      },
      "generateButton": "✨ Create Lifestyle Photos",
      "errors": {
        "noProduct": "The product has not been uploaded yet.",
        "noModel": "The model doesn't exist yet."
      }
    },
    "poseStudio": {
      "page": {
        "title": "Digi Pose",
        "description": "Change the style of the model's pose in your photo to a variety of new styles so you don't get bored."
      },
      "sections": {
        "uploadModel": {
          "title": "1. Upload Photos",
          "subtitle": "Photo of the model using the product."
        },
        "chooseStyle": {
          "title": "2. Choose a New Pose",
          "subtitle": "What style do you want to change to?"
        }
      },
      "modes": {
        "smart": {
          "title": "Automatic",
          "description": "Let AI choose cool poses for you."
        },
        "customize": {
          "title": "Arrange Yourself"
        }
      },
      "form": {
        "theme": {
          "label": "Photo Themes"
        },
        "angle": {
          "label": "Camera Angle"
        },
        "framing": {
          "label": "Photo Distance"
        },
        "instructions": {
          "label": "Notes (Optional)",
          "placeholder": "e.g., 'Makes the model look happier'"
        }
      },
      "angles": {
        "eyeLevel": "Eye Level",
        "highAngle": "From above",
        "lowAngle": "From below"
      },
      "frames": {
        "fullBody": "Whole Body",
        "mediumShot": "Half Body",
        "cowboyShot": "Up to the Knees",
        "closeup": "Face Close-up"
      },
      "generateButton": "✨ Change Pose",
      "errors": {
        "noModelImage": "Please upload a photo of the model first."
      }
    },
    "adCreator": {
      "page": {
        "title": "Digi Posters",
        "description": "Create an auto advertising poster design complete with attractive promotional text."
      },
      "sections": {
        "addCopy": {
          "title": "2. Content of advertising text",
          "subtitle": "What do you want to write on the poster?"
        }
      },
      "form": {
        "headline": {
          "label": "Big Title",
          "placeholder": "e.g., 'Today's Special Discount!'"
        },
        "description": {
          "label": "Small Post / Description",
          "placeholder": "for example, 'Buy 1 Get 1 Free for members only.'"
        },
        "cta": {
          "label": "Button / Invitation (Call to Action)",
          "placeholder": "e.g., 'Buy Now'"
        },
        "reference": {
          "label": "Design Example (Optional)",
          "description": "Have an example of a poster you like? Upload it so AI imitates the style."
        },
        "instructions": {
          "label": "Design Notes (Optional)",
          "placeholder": "for example, 'Make the colors dominant red and gold.'"
        }
      },
      "generateButton": "✨ Poster Design",
      "errors": {
        "noProductImage": "Upload the product first.",
        "noHeadline": "The title of the advertisement has not been filled in."
      },
      "copywriter": {
        "button": "✨ Help Make Words",
        "modalTitle": "AI Writing Assistant",
        "productNameLabel": "Product name",
        "productNamePlaceholder": "e.g., 'Fast Running Shoes'",
        "keywordsLabel": "Keywords / Features",
        "keywordsPlaceholder": "e.g., 'light, soft, discount'",
        "generateButton": "Look for Ideas",
        "useButton": "Use This",
        "loading": "Thinking about sales words...",
        "suggestionsFor": {
          "headline": "Title Ideas",
          "description": "Description Ideas",
          "cta": "Invitation Button Ideas"
        },
        "error": "Failed to find ideas. Try again, okay?"
      }
    },
    "imageEditor": {
      "page": {
        "title": "Digi Editor",
        "description": "Edit unwanted parts of the photo, delete objects, or change photo details as you wish."
      },
      "tools": {
        "resize": {
          "title": "Change Size (Resize)",
          "description": "Change the size of the photo to square, portrait or landscape without making it sprawl (AI will add a background).",
          "label": "Select New Size",
          "ar_1_1": "1:1 (Square)",
          "ar_4_3": "4:3",
          "ar_3_4": "3:4",
          "ar_16_9": "16:9 (YouTube)",
          "ar_9_16": "9:16 (Story/Reels)",
          "ar_3_2": "3:2",
          "ar_2_3": "2:3"
        },
        "digiBrush": {
          "title": "Magic Brush (Digi Brush)",
          "description": "Color in the area you want to edit, then tell AI to do whatever.",
          "promptLabel": "Edit Command",
          "promptPlaceholder": "e.g., 'delete this person', 'change them to flower vases', 'change their clothes color to red'",
          "brushSize": "Brush Size",
          "undo": "Cancelled",
          "clear": "Remove all"
        }
      },
      "generateButton": "✨ Execute Command",
      "errors": {
        "noMask": "First color the part of the photo you want to edit using a brush.",
        "noPrompt": "Write the command first, what do you want to do with that part?"
      }
    },
    "videoStudio": {
      "page": {
        "title": "Video Studios",
        "description": "Turn still product photos into short, aesthetic motion videos."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Image",
          "subtitle": "Select the photo you want to move."
        },
        "prompt": {
          "title": "2. How do you want to move?",
          "subtitle": "Tell me about the movement."
        }
      },
      "form": {
        "prompt": {
          "label": "Movement Description",
          "placeholder": "e.g., 'The camera zooms in slowly on the product, there is thin smoke rising, the light shimmering.'"
        },
        "digiPrompt": {
          "label": "Help Create Descriptions",
          "loading": "Thinking..."
        }
      },
      "generateButton": "✨ Make Videos",
      "loading": {
        "title": "Shooting a video...",
        "messages": "[\"Be patient, making a video really takes time...\",\"Just setting up the camera and lighting...\",\"Render frame by frame so it's smooth...\",\"Just a little more, the results will be cool!\"]"
      },
      "results": {
        "title": "3. Video Results",
        "description": "Your video is ready! Can be played directly or downloaded.",
        "downloadButton": "Save Videos",
        "placeholder": "A video of your work will appear here."
      },
      "errors": {
        "noPrompt": "First write a description of the movement.",
        "noImage": "Upload the image first."
      },
      "quotaWarning": "Info: This Video feature is a trial BONUS. Google limits video creation quotas (around 10 videos per account). If it fails, maybe the quota runs out."
    },
    "notes": {
      "staticWarning": "Demo: Results are not stored on the server. Download it straight away when it's ready.",
      "navigationWarning": "DO NOT close or move this page while the process is running, it will fail."
    },
    "mockupGenerator": {
      "page": {
        "title": "Digi Mockup",
        "description": "Paste your logo design onto various products (t-shirts, mugs, etc.) instantly."
      },
      "sections": {
        "uploadDesign": {
          "title": "1. Upload Design",
          "subtitle": "The logo or image you want to paste."
        },
        "chooseMockup": {
          "title": "2. Select Mockup",
          "subtitle": "Select the type of item or upload your own photo of the item."
        }
      },
      "presets": {
        "tshirt": "White T-shirt",
        "mug": "Ceramic Mug",
        "totebag": "Canvas Tote Bag",
        "hoodie": "Black Hoodie",
        "box": "Packaging Box"
      },
      "tabs": {
        "presets": "Select from List",
        "upload": "Upload Your Own Mockup"
      },
      "generateButton": "✨ Install Mockup",
      "errors": {
        "noDesign": "Upload the design first.",
        "noMockup": "Choose a mockup from the list or upload a photo of the item yourself."
      }
    },
    "digiPhotoshoot": {
      "page": {
        "title": "Digi Photoshoot",
        "description": "Turn ordinary photos into high-end studio portraits with a Korean or Cinematic feel."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Source Photo",
          "subtitle": "High resolution photos recommended."
        },
        "theme": {
          "title": "2. Custom Theme (Optional)",
          "subtitle": "Add special nuances if desired."
        }
      },
      "form": {
        "customTheme": {
          "placeholder": "Example: The feel of a neon city at night, or the elegance of an old library..."
        }
      },
      "generateButton": "Create 4 Studio Photos",
      "errors": {
        "noImage": "Please upload an image first."
      }
    }
  },
  "en": {
    "header": {
      "subtitle": "AI Product Photography",
      "about": "About"
    },
    "footer": {
      "createdBy": "made by"
    },
    "sidebar": {
      "virtualTryOn": "Digi TryOn",
      "productStudio": "DigiProducts",
      "digiModel": "Digi Models",
      "digiFashion": "DigiFashion",
      "digiBRoll": "Digi B-Roll",
      "povStudio": "Digi POV Studio",
      "listingStudio": "Digi Listing",
      "digiPose": "Digi Pose",
      "digiGenEditor": "Digi Editor",
      "digiRestore": "Digi Restore",
      "digiFaceSwap": "Digi Face Swap",
      "digiFusion": "Digi Fusion",
      "mergeProduct": "DigiMerge",
      "backgroundChanger": "DigiBackground",
      "lifestylePhotoshoot": "DigiLifestyle",
      "digiCarousel": "Digi Carousel",
      "adCreator": "Digi Posters",
      "mockupGenerator": "Digi Mockup",
      "digiPhotoshoot": "Digi Photoshoot",
      "digiVideo": "DigiVideo",
      "digiStoryboard": "DigiStoryboard",
      "digiVoice": "DigiVoice",
      "motionPromptStudio": "Digi Motion Prompt",
      "videoStudio": "Video Studios",
      "mirrorStudio": "Digi Mirror",
      "perspectiveStudio": "DigiPerspective",
      "digitalImaging": "Digi Imaging"
    },
    "about": {
      "title": "About AIDIGITRANS.COM",
      "description": "This application uses the latest Google Gemini AI technology to help MSMEs and content creators create high-quality visual assets easily, quickly and cost-effectively.",
      "techStack": "About",
      "geminiModels": "Gemini Models Used",
      "geminiFlashImage": "The brains behind editing and creating images.",
      "geminiFlash": "Brain for creating advertising texts and creative ideas.",
      "geminiVeo": "Technology for creating videos from images.",
      "productStudio": "Turn ordinary product photos into professional studio photos with various aesthetic themes.",
      "virtualTryOn": "Try clothes on AI models or your own photos without having to change into real clothes.",
      "lifestylePhotoshoot": "Put the product in a real situation (eg: in a cafe, in a park) to make it more alive.",
      "mergeProduct": "Combine several images into one neat frame. Suitable for making bundling packages or collections.",
      "poseStudio": "Change the style of the model's pose in your photo to a variety of new styles so you don't get bored.",
      "adCreator": "Create an auto advertising poster design complete with attractive promotional text.",
      "imageEditor": "Edit unwanted parts of the photo, delete objects, or change photo details as you wish.",
      "digitalImaging": "Create artistic and unique product photos, like professional editing.",
      "videoStudio": "Turn still product photos into short, aesthetic motion videos.",
      "povStudio": "Make photos as if the product is being held in your hand (POV), suitable for reviews.",
      "mirrorStudio": "Take selfie style photos in front of the mirror for fashion products or cellphone cases.",
      "listingStudio": "Create clear product information images (infographics) to place on the marketplace.",
      "perspectiveStudio": "Match the style of product photos from the front, side and back so that they are uniform.",
      "backgroundChanger": "Erase and replace the background of your product photo with another scene instantly.",
      "digiStoryboard": "Visualize your story idea into a panel image (storyboard) before making a video.",
      "digiVideo": "Turn a written idea or image into a cool cinematic video.",
      "mockupGenerator": "Paste your logo design onto various products (t-shirts, mugs, etc.) instantly.",
      "digiPhotoshoot": "Turn ordinary photos into high-end studio portraits with a Korean or Cinematic feel.",
      "digiBRoll": "Upload 1 product image, add a model (optional), and let AI create 6 professional photo poses.",
      "developedBy": "Developed by",
      "closeButton": "Closed"
    },
    "sections": {
      "upload": {
        "title": "1. Upload Image",
        "subtitle": "Choose your best photo that is clear and bright."
      },
      "style": {
        "title": "2. Choose a Style",
        "subtitle": "What kind of photo do you want to make? Vote here."
      },
      "tools": {
        "title": "2. Select Tools",
        "subtitle": "Choose a magic tool to edit your photos.",
        "options": {
          "title": "3. Settings",
          "subtitle": "Adjust the details to make it fit better."
        }
      }
    },
    "uploader": {
      "productLabel": "Upload Product Photos",
      "imageLabel": "Upload Image",
      "modelLabel": "Upload Model Photo",
      "referenceLabel": "Upload Style Example (Reference)",
      "styleReferenceLabel": "Upload Style Reference",
      "backgroundLabel": "Upload New Background",
      "designLabel": "Upload Design/Logo",
      "mockupLabel": "Upload a Plain Mockup",
      "fileTypes": "Format: PNG, JPG, WEBP (Max 10MB)"
    },
    "options": {
      "smart": {
        "title": "Smart Auto",
        "description": "Let AI think and choose the best style for your product."
      },
      "customize": {
        "theme": {
          "label": "Select Theme",
          "other": "Write Yourself..."
        },
        "customTheme": {
          "label": "Custom Themes",
          "placeholder": "e.g., 'On a wooden table in the morning sun'"
        },
        "props": {
          "label": "Add Property (Optional)",
          "placeholder": "e.g., 'there are dried flowers and coffee beans'"
        }
      },
      "reference": {
        "description": "Have examples of good photos? Upload it here, AI will copy the style."
      },
      "shared": {
        "instructions": {
          "label": "Additional Notes (Optional)",
          "placeholderCustomize": "e.g., 'Make sure the product looks bright and clear'",
          "placeholderReference": "e.g., 'Follow the lighting from this example photo'"
        }
      },
      "enhanceButton": "Start Photo Magic"
    },
    "results": {
      "title": "3. Photo Results",
      "titleEditor": "4. Edit Results",
      "description": "Tadaa! This is your new photo.",
      "descriptionEditor": "This is your edited photo.",
      "loading": {
        "title": "Taking photos...",
        "titleEditor": "Editing...",
        "subtitle": "Wait a moment, AI is working for you."
      },
      "error": {
        "title": "Well, Failed...",
        "button": "Come on, try again"
      },
      "placeholder": "The resulting photos will appear here.",
      "imageAlt": "AI generation photo",
      "variantLabel": "Choice",
      "downloadButton": "Save Image",
      "resetButton": "Repeat again"
    },
    "errors": {
      "noProductImage": "Don't forget to upload a photo of the product first.",
      "noImage": "Please upload the picture first.",
      "noReferenceImage": "You need to upload an example (reference) photo for this mode."
    },
    "themes": {
      "cleanStudio": "Clean Studio (White Background)",
      "dramaticMoody": "Dramatic & Elegant (Dark Background)",
      "naturalOrganic": "Natural & Organic Feel",
      "vibrantPlayful": "Cheerful & Colorful",
      "modernSleek": "Modern & Contemporary",
      "softDreamy": "Soft & Aesthetic",
      "industrialRugged": "Industrial Style",
      "vintageNostalgic": "Vintage/Old School",
      "luxeElegant": "Luxurious & Expensive",
      "minimalistZen": "Calm & Minimalist",
      "cosmicFuturistic": "Future & Neon",
      "cozyRustic": "Comfortable & Homey",
      "tropicalParadise": "Tropical Holiday Atmosphere",
      "aquaticFreshness": "Fresh & Juicy",
      "urbanStreet": "City Street Style",
      "holidayCheer": "Holiday/Christmas atmosphere"
    },
    "perspectiveStudio": {
      "page": {
        "title": "DigiPerspective",
        "description": "Do you have product photos from the front, side and back? Upload them all here, AI will make their backgrounds uniform and aesthetic."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Product Side",
          "subtitle": "At least upload 1 side, but more is better."
        },
        "style": {
          "title": "2. Choose a Style",
          "subtitle": "What kind of background do you want for all these photos?"
        }
      },
      "labels": {
        "front": "Front view",
        "back": "Back view",
        "side": "Side view",
        "top": "Top/Detail View"
      },
      "generateButton": "✨ Uniform the background",
      "errors": {
        "noImages": "Upload at least one side of the product photo."
      }
    },
    "povStudio": {
      "page": {
        "title": "Digi POV Studio",
        "description": "Make photos as if the product is being held in your hand (POV), suitable for reviews."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Products",
          "subtitle": "Just take a photo of the product, no hands."
        },
        "configure": {
          "title": "2. Set Style",
          "subtitle": "Choose whose hand and where you want the photo."
        }
      },
      "handStyle": {
        "label": "Hand Models",
        "auto": "Just automatically",
        "female": "Girl's Hands",
        "male": "Boy's Hands",
        "sweater": "Wear a Sweater"
      },
      "background": {
        "modeLabel": "Backgrounds",
        "preset": "Select Theme",
        "custom": "Upload Yourself",
        "themeLabel": "What atmosphere do you want?"
      },
      "themes": {
        "cozyBedroom": "In a Comfortable Room",
        "aestheticDesk": "On Aesthetic Workbench",
        "softMinimalist": "Minimalist Plain Walls",
        "cafeVibes": "Hanging out at the Cafe",
        "urbanOutdoor": "City Streets",
        "natureWalk": "Take a Walk in Nature",
        "bathroomSelfie": "In Front of the Sink Glass"
      },
      "generateButton": "✨ Create POV Photos",
      "errors": {
        "noBackground": "Don't forget to upload the background."
      }
    },
    "backgroundChanger": {
      "page": {
        "title": "DigiBackground",
        "description": "Erase and replace the background of your product photo with another scene instantly."
      },
      "tabs": {
        "change": "Change Background",
        "remove": "Remove Background"
      },
      "sections": {
        "upload": {
          "title": "1. Upload Products",
          "subtitle": "Select the product photo whose background you want to change."
        },
        "method": {
          "title": "2. Select Background",
          "subtitle": "Do you want to upload your own images or have them created by AI?"
        },
        "remove": {
          "title": "2. Remove Background",
          "subtitle": "AI will separate objects from the background."
        }
      },
      "modes": {
        "upload": "Upload Yourself",
        "generate": "Made by AI"
      },
      "form": {
        "prompt": {
          "label": "What background do you want?",
          "placeholder": "e.g., 'On a white marble table', 'On the sand of Bali beach'"
        },
        "instructions": {
          "label": "Additional Notes (Optional)",
          "placeholder": "e.g., 'Make the shadows more natural', 'Light from the left'"
        }
      },
      "generateButton": "✨ Change Background",
      "removeButton": "✂️ Remove Background",
      "errors": {
        "noProduct": "Upload a photo of the product first.",
        "noBackground": "Please upload a replacement background photo.",
        "noPrompt": "First write down what kind of background you want."
      }
    },
    "mirrorStudio": {
      "page": {
        "title": "Digi Mirror",
        "description": "Take selfie style photos in front of the mirror for fashion products or cellphone cases."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Products",
          "subtitle": "What products do you want to display? (HP Cases, Bags, Clothes)"
        },
        "configure": {
          "title": "2. Set Model & Location",
          "subtitle": "Choose who the model is and where the photo is."
        }
      },
      "options": {
        "modelSourceLabel": "Where does the model come from?",
        "generate": "Create an AI Model",
        "upload": "Upload your own photos",
        "uploadModelLabel": "Upload Model Photo",
        "genderLabel": "Gender Models",
        "ethnicityLabel": "Model Face (Ethnicity)",
        "ethnicityPlaceholder": "e.g., Indonesian, Asian, Caucasian",
        "frameLabel": "Photo Distance",
        "themeLabel": "Mirror Location",
        "female": "Girls",
        "male": "Guy"
      },
      "themes": {
        "elevatorSelfie": "Elevator Mirrors",
        "gymMirror": "Gym Mirror",
        "bathroomAesthetic": "Aesthetic Bathroom",
        "bedroomOotd": "Bedroom Mirrors",
        "fittingRoom": "Mall Changing Rooms",
        "streetReflection": "Shop Window Glass"
      },
      "frames": {
        "halfBody": "Half Body",
        "fullBody": "Whole Body",
        "closeUp": "Close Up (Focus on HP/Hands)"
      },
      "generateButton": "✨ Check Selfies",
      "errors": {
        "noModel": "Upload a photo of the first person."
      }
    },
    "listingStudio": {
      "page": {
        "title": "Digi Listing",
        "description": "Create clear product information images (infographics) to place on the marketplace."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Products",
          "subtitle": "Select your main product photo."
        },
        "features": {
          "title": "2. Featured Features",
          "subtitle": "What are the advantages of your product? Write 3-5 points."
        },
        "style": {
          "title": "3. Appearance Design",
          "subtitle": "Choose a design style that matches your brand."
        }
      },
      "form": {
        "addFeature": "Add Points",
        "featurePlaceholder": "e.g. 'Waterproof', 'Long Battery Life'",
        "styleLabel": "Select Design Style"
      },
      "styles": {
        "minimalistWhite": "Clean White (Minimalist)",
        "techSpecs": "Technology (Dark & ​​Neon)",
        "ecoOrganic": "Natural (Earth Color)",
        "boldSale": "Promo (Strong & Striking)",
        "luxuryElegant": "Luxury (Elegant)"
      },
      "generateButton": "✨ Create Listing Image",
      "errors": {
        "minFeatures": "Write down at least 1 advantage of your product."
      }
    },
    "productStudio": {
      "page": {
        "title": "DigiProducts",
        "description": "Turn ordinary product photos into professional studio photos with various aesthetic themes."
      },
      "steps": {
        "upload": "1. Upload Photos",
        "lighting": "2. Lighting",
        "mood": "3. Atmosphere",
        "ratio": "4. Photo Size",
        "location": "5.Location"
      },
      "options": {
        "light": "Bright",
        "dark": "Dark",
        "clean": "Clean",
        "crowd": "Crowded",
        "indoor": "Indoor",
        "outdoor": "Outdoors"
      },
      "generateButton": "Create Studio Photos",
      "generatingConcepts": "Looking for concept ideas...",
      "visualizing": "Visualizing...",
      "resultsTitle": "4 Photo Studio Variations"
    },
    "mergeProduct": {
      "page": {
        "title": "DigiMerge",
        "description": "Combine several images into one neat frame. Suitable for making bundling packages or collections."
      },
      "sections": {
        "uploadProducts": {
          "title": "1. Upload Image",
          "subtitle": "Minimum 2 images to be combined.",
          "addProduct": "Add Another Image"
        }
      },
      "errors": {
        "atLeastTwo": "There must be a minimum of 2 images to combine."
      }
    },
    "digitalImaging": {
      "page": {
        "title": "Digi Imaging",
        "description": "Create artistic and unique product photos, like professional editing."
      },
      "modes": {
        "customize": "Arrange Yourself",
        "generateConcept": "Ask for AI Ideas"
      },
      "sections": {
        "style": {
          "title": "3. Set Style",
          "subtitle": "Choose an art theme that you like."
        },
        "concept": {
          "title": "2. Choose a method",
          "subtitle": "Do you want to organize it yourself or let AI give you creative ideas?"
        }
      },
      "conceptGenerator": {
        "title": "3. Look for Creative Ideas",
        "subtitle": "Let AI look at your product and suggest cool concepts.",
        "button": "✨ Look for Concept Ideas",
        "loading": "Thinking of wild ideas...",
        "resultsTitle": "4. Select Concept",
        "resultsSubtitle": "Choose one of the ideas below to generate.",
        "generateImageButton": "Select & Create"
      },
      "generateButton": "✨ Create Artwork",
      "errors": {
        "conceptError": "I couldn't find any ideas. Try again, okay?"
      },
      "themes": {
        "miniatureWorld": "Miniature World (Small)",
        "natureFusion": "Unite with Nature",
        "surrealFloating": "Drift & Magic",
        "cyberneticGlow": "Cyberpunk & Neon",
        "watercolorSplash": "Watercolor Splash",
        "papercraftArt": "Paper Crafts",
        "galaxyInfused": "Outer space",
        "architecturalIllusion": "Building Illusion"
      }
    },
    "virtualTryOn": {
      "page": {
        "title": "Digi TryOn",
        "description": "Try clothes on AI models or your own photos without having to change into real clothes."
      },
      "sections": {
        "uploadProduct": {
          "title": "1. Upload clothes",
          "subtitle": "Complete the front and rear view slots for maximum 360° results.",
          "addProduct": "Add clothes"
        },
        "provideModel": {
          "title": "2. Prepare the Model",
          "subtitle": "Do you want to use your own photo or a model created by AI?"
        }
      },
      "labels": {
        "front": "Front look",
        "back": "Back view"
      },
      "modelOptions": {
        "upload": "Own Photo",
        "generate": "Create an AI Model",
        "gender": "Gender",
        "female": "Girl",
        "male": "Guy",
        "other": "Other",
        "ethnicity": "Face (Ethnicity)",
        "aspectRatio": "Photo Size",
        "ethnicities": {
          "caucasian": "Caucasian (European)",
          "asian": "Asia",
          "african": "Africa",
          "hispanic": "Latin",
          "middleEastern": "the middle East",
          "other": "Other"
        },
        "details": "Additional Details",
        "detailsPlaceholder": "e.g., 'long hair, smile, wear glasses'",
        "customEthnicity": {
          "label": "Special Ethnicity",
          "placeholder": "e.g., 'Javanese', 'Sundanese', 'Korean'"
        }
      },
      "errors": {
        "noProducts": "Please upload a photo of the clothes first.",
        "noFrontImage": "Upload a photo of the front of the shirt first (main slot).",
        "noModel": "Upload a photo of the model (person) first."
      },
      "generateButton": "✨ Put on clothes"
    },
    "lifestylePhotoshoot": {
      "page": {
        "title": "DigiLifestyle",
        "description": "Put the product in a real situation (eg: in a cafe, in a park) to make it more alive."
      },
      "sections": {
        "uploadProduct": {
          "title": "1. Upload Products",
          "subtitle": "What product do you want to photograph?"
        },
        "provideModel": {
          "title": "2. Models",
          "subtitle": "Who uses it? Upload photos or create AI models."
        },
        "direct": {
          "title": "3. Style Direction",
          "subtitle": "Tell me what scene you want."
        }
      },
      "form": {
        "interaction": {
          "label": "Scene Description",
          "placeholder": "for example, 'A woman is sitting relaxed on the sofa holding a skincare bottle, smiling relaxedly, morning sunlight coming in from the window.'"
        }
      },
      "generateButton": "✨ Create Lifestyle Photos",
      "errors": {
        "noProduct": "The product has not been uploaded yet.",
        "noModel": "The model doesn't exist yet."
      }
    },
    "poseStudio": {
      "page": {
        "title": "Digi Pose",
        "description": "Change the style of the model's pose in your photo to a variety of new styles so you don't get bored."
      },
      "sections": {
        "uploadModel": {
          "title": "1. Upload Photos",
          "subtitle": "Photo of the model using the product."
        },
        "chooseStyle": {
          "title": "2. Choose a New Pose",
          "subtitle": "What style do you want to change to?"
        }
      },
      "modes": {
        "smart": {
          "title": "Automatic",
          "description": "Let AI choose cool poses for you."
        },
        "customize": {
          "title": "Arrange Yourself"
        }
      },
      "form": {
        "theme": {
          "label": "Photo Themes"
        },
        "angle": {
          "label": "Camera Angle"
        },
        "framing": {
          "label": "Photo Distance"
        },
        "instructions": {
          "label": "Notes (Optional)",
          "placeholder": "e.g., 'Makes the model look happier'"
        }
      },
      "angles": {
        "eyeLevel": "Eye Level",
        "highAngle": "From above",
        "lowAngle": "From below"
      },
      "frames": {
        "fullBody": "Whole Body",
        "mediumShot": "Half Body",
        "cowboyShot": "Up to the Knees",
        "closeup": "Face Close-up"
      },
      "generateButton": "✨ Change Pose",
      "errors": {
        "noModelImage": "Please upload a photo of the model first."
      }
    },
    "adCreator": {
      "page": {
        "title": "Digi Posters",
        "description": "Create an auto advertising poster design complete with attractive promotional text."
      },
      "sections": {
        "addCopy": {
          "title": "2. Content of advertising text",
          "subtitle": "What do you want to write on the poster?"
        }
      },
      "form": {
        "headline": {
          "label": "Big Title",
          "placeholder": "e.g., 'Today's Special Discount!'"
        },
        "description": {
          "label": "Small Post / Description",
          "placeholder": "for example, 'Buy 1 Get 1 Free for members only.'"
        },
        "cta": {
          "label": "Button / Invitation (Call to Action)",
          "placeholder": "e.g., 'Buy Now'"
        },
        "reference": {
          "label": "Design Example (Optional)",
          "description": "Have an example of a poster you like? Upload it so AI imitates the style."
        },
        "instructions": {
          "label": "Design Notes (Optional)",
          "placeholder": "for example, 'Make the colors dominant red and gold.'"
        }
      },
      "generateButton": "✨ Poster Design",
      "errors": {
        "noProductImage": "Upload the product first.",
        "noHeadline": "The title of the advertisement has not been filled in."
      },
      "copywriter": {
        "button": "✨ Help Make Words",
        "modalTitle": "AI Writing Assistant",
        "productNameLabel": "Product name",
        "productNamePlaceholder": "e.g., 'Fast Running Shoes'",
        "keywordsLabel": "Keywords / Features",
        "keywordsPlaceholder": "e.g., 'light, soft, discount'",
        "generateButton": "Look for Ideas",
        "useButton": "Use This",
        "loading": "Thinking about sales words...",
        "suggestionsFor": {
          "headline": "Title Ideas",
          "description": "Description Ideas",
          "cta": "Invitation Button Ideas"
        },
        "error": "Failed to find ideas. Try again, okay?"
      }
    },
    "imageEditor": {
      "page": {
        "title": "Digi Editor",
        "description": "Edit unwanted parts of the photo, delete objects, or change photo details as you wish."
      },
      "tools": {
        "resize": {
          "title": "Change Size (Resize)",
          "description": "Change the size of the photo to square, portrait or landscape without making it sprawl (AI will add a background).",
          "label": "Select New Size",
          "ar_1_1": "1:1 (Square)",
          "ar_4_3": "4:3",
          "ar_3_4": "3:4",
          "ar_16_9": "16:9 (YouTube)",
          "ar_9_16": "9:16 (Story/Reels)",
          "ar_3_2": "3:2",
          "ar_2_3": "2:3"
        },
        "digiBrush": {
          "title": "Magic Brush (Digi Brush)",
          "description": "Color in the area you want to edit, then tell AI to do whatever.",
          "promptLabel": "Edit Command",
          "promptPlaceholder": "e.g., 'delete this person', 'change them to flower vases', 'change their clothes color to red'",
          "brushSize": "Brush Size",
          "undo": "Cancelled",
          "clear": "Remove all"
        }
      },
      "generateButton": "✨ Execute Command",
      "errors": {
        "noMask": "First color the part of the photo you want to edit using a brush.",
        "noPrompt": "Write the command first, what do you want to do with that part?"
      }
    },
    "videoStudio": {
      "page": {
        "title": "Video Studios",
        "description": "Turn still product photos into short, aesthetic motion videos."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Image",
          "subtitle": "Select the photo you want to move."
        },
        "prompt": {
          "title": "2. How do you want to move?",
          "subtitle": "Tell me about the movement."
        }
      },
      "form": {
        "prompt": {
          "label": "Movement Description",
          "placeholder": "e.g., 'The camera zooms in slowly on the product, there is thin smoke rising, the light shimmering.'"
        },
        "digiPrompt": {
          "label": "Help Create Descriptions",
          "loading": "Thinking..."
        }
      },
      "generateButton": "✨ Make Videos",
      "loading": {
        "title": "Shooting a video...",
        "messages": "[\"Be patient, making a video really takes time...\",\"Just setting up the camera and lighting...\",\"Render frame by frame so it's smooth...\",\"Just a little more, the results will be cool!\"]"
      },
      "results": {
        "title": "3. Video Results",
        "description": "Your video is ready! Can be played directly or downloaded.",
        "downloadButton": "Save Videos",
        "placeholder": "A video of your work will appear here."
      },
      "errors": {
        "noPrompt": "First write a description of the movement.",
        "noImage": "Upload the image first."
      },
      "quotaWarning": "Info: This Video feature is a trial BONUS. Google limits video creation quotas (around 10 videos per account). If it fails, maybe the quota runs out."
    },
    "notes": {
      "staticWarning": "Demo: Results are not stored on the server. Download it straight away when it's ready.",
      "navigationWarning": "DO NOT close or move this page while the process is running, it will fail."
    },
    "mockupGenerator": {
      "page": {
        "title": "Digi Mockup",
        "description": "Paste your logo design onto various products (t-shirts, mugs, etc.) instantly."
      },
      "sections": {
        "uploadDesign": {
          "title": "1. Upload Design",
          "subtitle": "The logo or image you want to paste."
        },
        "chooseMockup": {
          "title": "2. Select Mockup",
          "subtitle": "Select the type of item or upload your own photo of the item."
        }
      },
      "presets": {
        "tshirt": "White T-shirt",
        "mug": "Ceramic Mug",
        "totebag": "Canvas Tote Bag",
        "hoodie": "Black Hoodie",
        "box": "Packaging Box"
      },
      "tabs": {
        "presets": "Select from List",
        "upload": "Upload Your Own Mockup"
      },
      "generateButton": "✨ Install Mockup",
      "errors": {
        "noDesign": "Upload the design first.",
        "noMockup": "Choose a mockup from the list or upload a photo of the item yourself."
      }
    },
    "digiPhotoshoot": {
      "page": {
        "title": "Digi Photoshoot",
        "description": "Turn ordinary photos into high-end studio portraits with a Korean or Cinematic feel."
      },
      "sections": {
        "upload": {
          "title": "1. Upload Source Photo",
          "subtitle": "High resolution photos recommended."
        },
        "theme": {
          "title": "2. Custom Theme (Optional)",
          "subtitle": "Add special nuances if desired."
        }
      },
      "form": {
        "customTheme": {
          "placeholder": "Example: The feel of a neon city at night, or the elegance of an old library..."
        }
      },
      "generateButton": "Create 4 Studio Photos",
      "errors": {
        "noImage": "Please upload an image first."
      }
    },
    "license": {
      "title": "License & App Usage",
      "subtitle": "Please understand your rights and restrictions when using AIDIGITRANS.COM.",
      "intellectualProperty": {
        "title": "Intellectual Property",
        "desc": "All intellectual property rights to this application—including concepts, designs, code, and workflows—are the exclusive property of",
        "desc2": "This license does not grant any ownership rights to the user."
      },
      "permittedUse": {
        "title": "Permitted Use",
        "desc": "You are granted a limited license to use this application for legitimate personal or business purposes, in accordance with the provided functionality."
      },
      "restrictions": {
        "title": "Restrictions & Prohibitions",
        "desc": "You are strictly prohibited from doing the following:",
        "item1": "Copying, duplicating, or reproducing the application in any form.",
        "item2": "Reverse-engineering, disassembling, or modifying the system.",
        "item3": "Reselling, renting, or redistributing the application without written permission from"
      },
      "warning": {
        "title": "Strict Warning",
        "desc": "Distribution, resale, or cloning of this application without permission is a violation of the law. Legal action will be taken against any party that violates these terms."
      }
    }
  }
}

export function getTranslation(key: string, source: any): string {
  const keys = key.split('.');
  let result = source;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return key;
    }
  }
  
  if (typeof result === 'string') {
      return result;
  }

  return key;
}
