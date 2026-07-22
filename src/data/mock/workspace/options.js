export const INITIAL_SUPPLIERS = [
  { id: "s1", nama: "PT. Rental Alat Nusantara", alamat: "Jl. Pemuda No. 12, Rembang", kontak: "Rudi Hermawan (0812-3456-789)" },
  { id: "s2", nama: "CV. Material Utama Sejahtera", alamat: "Jl. Pantura Km. 4, Rembang", kontak: "H. Slamet (0821-9876-543)" }
];

export const INITIAL_KSO_PARTNERS = [
  { id: 'kso1', nama: "PT. KSO Karya Pratama", email: "admin@karyapratama.co.id", SBU: "BG009 - Gedung", KD_Individual: 4200000000.00, SKP_Individual: 4 },
  { id: 'kso2', nama: "CV. Sinergi Beton Nusantara", email: "tender@sinergibeton.com", SBU: "SP004 - Beton", KD_Individual: 1500000000.00, SKP_Individual: 3 }
];

export const INITIAL_PERSONEL_LIST = [
  { 
    id: 'p1', nama: 'Budi Santoso, ST', jabatan: 'Manajer Pelaksanaan/Proyek', 
    tempatLahir: 'Semarang', tglLahir: '15/08/1985', pendidikan: 'S1 Teknik Sipil, Universitas Diponegoro (2007)',
    pengalaman: [
      { tahun: 2024, nama: 'Pembangunan RSUD Kota', lokasi: 'Semarang', pemberi: 'Dinas Kesehatan', perusahaan: 'PT. Maju Konstruksi', tugas: 'Manajer Proyek', waktu: '8 Bulan', posisi: 'Manajer Pelaksanaan' },
      { tahun: 2023, nama: 'Pembangunan Gedung Perkantoran', lokasi: 'Demak', pemberi: 'Kementerian PUPR', perusahaan: 'PT. Maju Konstruksi', tugas: 'Manajer Proyek', waktu: '10 Bulan', posisi: 'Manajer Pelaksanaan' }
    ]
  },
  { 
    id: 'p2', nama: 'Siti Aminah, ST', jabatan: 'Ahli K3 Konstruksi', 
    tempatLahir: 'Kendal', tglLahir: '22/03/1990', pendidikan: 'S1 Teknik Sipil, Universitas Negeri Semarang (2012)',
    pengalaman: [
      { tahun: 2024, nama: 'Pembangunan RSUD Kota', lokasi: 'Semarang', pemberi: 'Dinas Kesehatan', perusahaan: 'PT. Maju Konstruksi', tugas: 'Mengawasi K3', waktu: '8 Bulan', posisi: 'Ahli K3' }
    ]
  }
];

export const INITIAL_PERALATAN_LIST = [
  { id: 'eq1', jenis: 'Excavator', merek: 'Komatsu PC200', kapasitas: '0.8 m3', jumlah: 2, status: 'Milik Sendiri' },
  { id: 'eq2', jenis: 'Dump Truck', merek: 'Hino Dutro', kapasitas: '8 Ton', jumlah: 5, status: 'Sewa' },
  { id: 'eq3', jenis: 'Concrete Mixer', merek: 'Hercules', kapasitas: '0.3 m3', jumlah: 3, status: 'Milik Sendiri' }
];

export const INITIAL_UPAH_LIST = [
  { id: "u1", nama: "Pekerja", harga: 110000.00 },
  { id: "u2", nama: "Tukang Batu", harga: 130000.00 },
  { id: "u3", nama: "Kepala Tukang", harga: 145000.00 },
  { id: "u4", nama: "Mandor", harga: 160000.00 }
];

export const INITIAL_BAHAN_LIST = [
  { id: "b1", nama: "Semen Portland (per 50kg)", harga: 72000.00 },
  { id: "b2", nama: "Pasir Beton (per m³)", harga: 230000.00 },
  { id: "b3", nama: "Batu Pecah 2/3 (per m³)", harga: 290000.00 },
  { id: "b4", nama: "Besi Beton Polos (per kg)", harga: 12500.00 }
];

export const INITIAL_ALAT_LIST = [
  { id: "e1", nama: "Excavator (sewa per jam)", harga: 275000.00 },
  { id: "e2", nama: "Dump Truck (sewa per hari)", harga: 850000.00 },
  { id: "e3", nama: "Concrete Mixer (sewa per hari)", harga: 350000.00 }
];

export const INITIAL_AHSP_ITEMS = [
  { 
    id: "a1", 
    nama: "1 m³ Beton Mutu f'c = 19.3 MPa (K225)", 
    upah: [ { item: "u1", koef: 1.65 }, { item: "u2", koef: 0.275 }, { item: "u3", koef: 0.028 }, { item: "u4", koef: 0.083 } ],
    bahan: [ { item: "b1", koef: 7.42 }, { item: "b2", koef: 0.499 }, { item: "b3", koef: 0.776 } ],
    alat: [ { item: "e3", koef: 0.15 } ]
  },
  {
    id: "a2",
    nama: "1 m³ Galian Tanah Keras (Kedalaman 1m)",
    upah: [ { item: "u1", koef: 0.75 }, { item: "u4", koef: 0.025 } ],
    bahan: [],
    alat: [ { item: "e1", koef: 0.05 } ]
  }
];

export const INITIAL_BOQ_LIST = [
  { id: "bq1", nama: "Pekerjaan Galian Tanah Struktur Gedung", vol: 245.0, sat: "m³", ahspId: "a2" },
  { id: "bq2", nama: "Pekerjaan Beton Struktur Utama K225", vol: 180.0, sat: "m³", ahspId: "a1" },
  { id: "bq3", nama: "Pekerjaan Finishing Cat Dinding Gedung (Lumpsum)", vol: 1, sat: "LS", isLumpsum: true, basePrice: 45000000.00 }
];
