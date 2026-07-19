const fs = require('fs');

let content = fs.readFileSync('src/pages/Workspace.jsx', 'utf8');

// 1. PAKTA: Add A.1
const paktaSearch = '<div className="font-bold text-[10px] mb-4">A. Kepemimpinan dan Partisipasi Pekerja dalam Keselamatan Konstruksi<br/>A.1 Komitmen Keselamatan Konstruksi</div>';
const paktaReplacement = `<div className="font-bold text-[10px] mb-2">A. Kepemimpinan dan Partisipasi Pekerja dalam Keselamatan Konstruksi</div>
<div className="mb-4">
    <div className="font-bold mb-1">A.1. Kepedulian pimpinan terhadap Isu eksternal dan internal:</div>
    <p className="text-justify mb-2">Manajemen PT. Maju Konstruksi sangat peduli dan menyadari bahwa isu eksternal dan internal berdampak signifikan pada penerapan Sistem Manajemen Keselamatan Konstruksi (SMKK). Oleh karena itu, pimpinan perusahaan berkomitmen untuk mengelola risiko-risiko yang berasal dari isu sosial, budaya, kebijakan pemerintah, serta memastikan ketersediaan sumber daya, kesiapan teknologi, dan kompetensi personel internal. Kepedulian ini ditunjukkan melalui penyediaan anggaran K3 yang memadai, pembentukan tim K3 yang kompeten, dan adaptasi proaktif terhadap perubahan peraturan terkait di lingkungan {tenderMeta.instansi}.</p>
    
    <div className="font-bold mb-1 mt-4">A.2. Komitmen Keselamatan Konstruksi</div>
</div>`;
content = content.replace(paktaSearch, paktaReplacement);

// 2. IBPRP: Add B.3
const ibprpSearch = `                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}

                                                    {rkkMenu === 'dukungan' && (`;
const ibprpReplacement = `                                                                    ))}
                                                                </tbody>
                                                            </table>

                                                            <div className="font-bold text-[10px] mt-6 mb-2">B.3. Standar dan peraturan perundangan</div>
                                                            <div className="text-justify mb-4">
                                                                <p className="mb-2">Daftar peraturan perundang-undangan dan persyaratan lainnya yang diterapkan dalam proyek <b>{tenderMeta.namaPaket}</b> meliputi:</p>
                                                                <ul className="list-disc pl-4 space-y-1">
                                                                    <li>Undang-Undang No. 1 Tahun 1970 tentang Keselamatan Kerja.</li>
                                                                    <li>Undang-Undang No. 2 Tahun 2017 tentang Jasa Konstruksi.</li>
                                                                    <li>Peraturan Menteri PUPR No. 10 Tahun 2021 tentang Pedoman SMKK.</li>
                                                                    <li>Peraturan Menteri Ketenagakerjaan No. 5 Tahun 2018 tentang K3 Lingkungan Kerja.</li>
                                                                    <li>Peraturan Pemerintah No. 50 Tahun 2012 tentang Penerapan SMK3.</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {rkkMenu === 'dukungan' && (`;
content = content.replace(ibprpSearch, ibprpReplacement);


// 3. DUKUNGAN: Add C.1, C.2, C.3 before C.4 and C.5 after
const dukunganSearch = `<div className="font-bold text-[10px] mb-4">C. Dukungan Keselamatan Konstruksi</div>
                                                            
                                                            <div className="mb-2">Jadwal Program Komunikasi:</div>`;
const dukunganReplacement = `<div className="font-bold text-[10px] mb-4">C. Dukungan Keselamatan Konstruksi</div>

                                                            <div className="mb-4">
                                                                <div className="font-bold mb-1">C.1. Sumber Daya</div>
                                                                <p className="text-justify mb-2">PT. Maju Konstruksi menyediakan sumber daya yang memadai, meliputi ketersediaan personil bersertifikat Ahli K3 Konstruksi, anggaran biaya SMKK yang sesuai dengan ketentuan, peralatan kerja yang laik pakai, serta fasilitas kesehatan dan keselamatan di lapangan. Kebutuhan APD, rambu K3, dan fasilitas P3K dipastikan selalu tersedia sebelum pekerjaan dimulai.</p>
                                                                
                                                                <div className="font-bold mb-1 mt-3">C.2. Kompetensi</div>
                                                                <p className="text-justify mb-2">Setiap pekerja yang terlibat dalam proyek wajib memiliki tingkat pendidikan, sertifikat keahlian/keterampilan (SKK/SBU), dan pengalaman yang sesuai. Petugas K3 dan Ahli K3 akan memberikan pelatihan (training) secara berkala terkait cara kerja aman, penggunaan alat bantu, dan respon darurat.</p>
                                                                
                                                                <div className="font-bold mb-1 mt-3">C.3. Kepedulian</div>
                                                                <p className="text-justify mb-2">Kepedulian (Awareness) dibangun melalui pembiasaan dan teguran langsung. Seluruh elemen proyek dari Manajer hingga Pekerja wajib mematuhi Kebijakan K3, menyadari bahaya pekerjaannya masing-masing, dan memahami dampak jika mengabaikan prosedur K3.</p>
                                                            </div>

                                                            <div className="font-bold mb-2">C.4. Komunikasi</div>
                                                            <div className="mb-2">Jadwal Program Komunikasi:</div>`;
content = content.replace(dukunganSearch, dukunganReplacement);

const dukunganEndSearch = `                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}

                                                    {rkkMenu === 'operasi' && (`;
const dukunganEndReplacement = `                                                                </tbody>
                                                            </table>

                                                            <div className="mb-4 mt-6">
                                                                <div className="font-bold mb-1">C.5. Informasi Terdokumentasi</div>
                                                                <p className="text-justify mb-2">Semua aktivitas terkait K3 didokumentasikan dan diarsipkan. Hal ini meliputi form JSA, form Izin Kerja (Permit to Work), notulensi Toolbox Meeting, Laporan Harian/Mingguan K3, serta laporan inspeksi dan investigasi insiden. Dokumen akan dipelihara dan dikendalikan agar selalu up-to-date dan mudah diakses selama pelaksanaan konstruksi.</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {rkkMenu === 'operasi' && (`;
content = content.replace(dukunganEndSearch, dukunganEndReplacement);


// 4. OPERASI: Add D.2
const operasiSearch = `                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}

                                                    {rkkMenu === 'evaluasi' && (`;
const operasiReplacement = `                                                                </tbody>
                                                            </table>

                                                            <div className="mb-4 mt-6">
                                                                <div className="font-bold mb-1">D.2. Kesiapan dan Tanggapan Terhadap Kondisi Darurat</div>
                                                                <p className="text-justify mb-2">Dalam menghadapi situasi darurat (seperti kebakaran, gempa bumi, kecelakaan kerja fatal, atau tumpahan bahan kimia berbahaya), tim proyek telah membentuk Tim Tanggap Darurat (Emergency Response Team). Nomor telepon darurat (Rumah Sakit terdekat, Pemadam Kebakaran, Kepolisian) telah dipasang di papan informasi proyek.</p>
                                                                <p className="text-justify mb-2">Prosedur evakuasi ditetapkan dengan rute yang jelas menuju Titik Kumpul (Muster Point) yang aman. Simulasi (drill) tanggap darurat akan dilakukan minimal satu kali dalam periode pelaksanaan proyek untuk memastikan kesiapan seluruh personel.</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {rkkMenu === 'evaluasi' && (`;
content = content.replace(operasiSearch, operasiReplacement);


// 5. EVALUASI: Add E.2 and E.3
const evaluasiSearch = `                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Upload Bottom */}`;
const evaluasiReplacement = `                                                                </tbody>
                                                            </table>

                                                            <div className="mb-4 mt-6">
                                                                <div className="font-bold mb-1">E.2. Tinjauan manajemen</div>
                                                                <p className="text-justify mb-2">Manajemen PT. Maju Konstruksi akan secara rutin (minimal sebulan sekali) melakukan rapat tinjauan manajemen untuk mengevaluasi efektivitas pelaksanaan SMKK di proyek <b>{tenderMeta.namaPaket}</b>. Rapat ini akan membahas hasil inspeksi, insiden/hampir celaka (near-miss) yang terjadi, kepatuhan terhadap peraturan, serta status tindak lanjut dari tinjauan sebelumnya.</p>
                                                                
                                                                <div className="font-bold mb-1 mt-3">E.3. Peningkatan kinerja keselamatan konstruksi</div>
                                                                <p className="text-justify mb-2">Berdasarkan hasil tinjauan manajemen dan pemantauan harian, perusahaan berkomitmen untuk terus meningkatkan kinerja K3. Peningkatan (Continuous Improvement) dilakukan melalui pembaruan JSA, peningkatan kualitas APD, perbaikan metode kerja (Metode Pelaksanaan), serta pemberian reward bagi pekerja yang konsisten menerapkan prinsip berkeselamatan.</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Upload Bottom */}`;
content = content.replace(evaluasiSearch, evaluasiReplacement);

fs.writeFileSync('src/pages/Workspace.jsx', content, 'utf8');
console.log("Narratives added successfully!");
