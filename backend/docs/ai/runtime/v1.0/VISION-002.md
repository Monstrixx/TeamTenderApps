# VISION-002: Retrieval Vision (Knowledge Access Layer)

## Mengapa Retrieval Platform Diciptakan?
Di era komputasi masa lalu, aplikasi bergantung pada kueri (SQL/NoSQL) yang dirancang secara statis untuk mengambil data (*Search*). Dalam paradigma **TeamTender Era-2**, AI tidak mengonsumsi sekadar *Search Results* mentah. AI mengonsumsi **Pengetahuan (Knowledge)**.

Visi dari **Retrieval Platform** bukan untuk membangun "Mesin Pencari", melainkan mendirikan **Knowledge Access Layer** yang memutlakkan pemrosesan data (dari Vektor, Graf, atau RDB) menjadi satu bentuk objek kekal yang sahih: `KnowledgePackage`. 

## Apa Tujuan Jangka Panjangnya?
- **Pemusatan Suplai Kognitif**: Seluruh produk hilir (*Agent Runtime*, *Executive Copilot*, *Tender Plugin*, *Company Plugin*) dilarang melakukan pencarian Vektor sendiri. Mereka hanya boleh memesan pengetahuan lewat layer ini.
- **Kedaulatan & Keamanan Data (Isolation)**: Dengan tersentralisasinya aliran pengetahuan, isolasi *Workspace* (Tenant) dan penyensoran privasi (Sensitive Leakage) bisa ditegakkan di satu leher botol (*bottleneck*) yang terukur.
- **Transendensi Multi-Domain (Multi-Hop)**: Eksekutif kelak membutuhkan rangkuman penalaran tingkat tinggi (Misal: "Hubungkan sertifikasi pegawai dengan kemungkinan kita menang tender X"). Retrieval harus mampu menjahit koneksi multi-domain ini secara terstruktur (*Graph* -> *Vector* -> *SQL*).

## Apa yang TIDAK Akan Dilakukan?
- **Tidak Menyimpan Data Mentah**: Retrieval Engine sama sekali tidak memiliki basis data fisik mandiri. Ia adalah orkestrator yang mengendalikan *IndexRegistry* yang dikelola *Knowledge Platform* dan *Third-Party Data Stores*.
- **Tidak Membiarkan Model LLM Berpikir Sepihak**: LLM *Agent* tidak akan diizinkan merangkai probabilitas tanpa bukti (halusinasi). *Evidence Scoring Framework* memaksa AI bersikap taat fakta.
