import React from 'react';
import { ShieldAlert, Sparkles, Download, FileText } from 'lucide-react';

export default function RkkSection({
    rkkMenu,
    setRkkMenu,
    triggerRkkGenerate,
    isRkkProcessing,
    rkkProgress,
    rkkContent,
    tenderMeta
}) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
            <div className="flex flex-col h-full bg-slate-50">
                <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <ShieldAlert size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Rencana Keselamatan Konstruksi (RKK)</h3>
                            <p className="text-xs text-slate-500">Penyusunan dokumen K3 lengkap sesuai Standar Dokumen Pemilihan</p>
                        </div>
                    </div>
                </div>
                
                {/* RKK Sub-navigation */}
                <div className="bg-white px-4 border-b border-slate-200 flex overflow-x-auto gap-2 text-[10px] font-bold">
                    <button onClick={() => setRkkMenu('cover')} className={`py-2 px-3 border-b-2 transition-all whitespace-nowrap ${rkkMenu === 'cover' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                        Sampul & Daftar Isi
                    </button>
                    <button onClick={() => setRkkMenu('pakta')} className={`py-2 px-3 border-b-2 transition-all whitespace-nowrap ${rkkMenu === 'pakta' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                        A. Kepemimpinan (Pakta)
                    </button>
                    <button onClick={() => setRkkMenu('ibprp')} className={`py-2 px-3 border-b-2 transition-all whitespace-nowrap ${rkkMenu === 'ibprp' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                        B. IBPRP & Sasaran
                    </button>
                    <button onClick={() => setRkkMenu('dukungan')} className={`py-2 px-3 border-b-2 transition-all whitespace-nowrap ${rkkMenu === 'dukungan' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                        C. Dukungan K3
                    </button>
                    <button onClick={() => setRkkMenu('operasi')} className={`py-2 px-3 border-b-2 transition-all whitespace-nowrap ${rkkMenu === 'operasi' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                        D. Operasi (JSA)
                    </button>
                    <button onClick={() => setRkkMenu('evaluasi')} className={`py-2 px-3 border-b-2 transition-all whitespace-nowrap ${rkkMenu === 'evaluasi' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                        E. Evaluasi
                    </button>
                </div>

                <div className="flex-1 p-6 overflow-y-auto flex flex-col">
                    
                    {/* Generate AI Button and Progress */}
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 mb-1">Draf RKK Otomatis (AI)</h4>
                            <p className="text-xs text-slate-500 max-w-xl">
                                AI akan menyusun seluruh dokumen RKK berdasarkan uraian Pekerjaan dan Identifikasi Bahaya yang ditetapkan PPK pada Dokumen Pemilihan.
                            </p>
                        </div>
                        <button 
                            onClick={triggerRkkGenerate}
                            disabled={isRkkProcessing}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
                        >
                            <Sparkles size={14} /> {isRkkProcessing ? 'Sistem Menyusun Dokumen...' : 'Susun Seluruh RKK'}
                        </button>
                    </div>

                    {isRkkProcessing && (
                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>Membaca SSKK & menyusun dokumen RKK terintegrasi...</span>
                                <span>{rkkProgress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${rkkProgress}%` }}></div>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 overflow-auto border border-slate-200 rounded-xl bg-slate-300 p-6 flex justify-center min-h-[600px]">
                        {/* RKK Content Switcher */}
                        {rkkMenu === 'cover' && (
                            <div className="a4-portrait font-mono text-[10px] text-slate-800 leading-normal shadow-lg p-10 flex flex-col items-center">
                                <div className="text-right w-full mb-8">
                                    <div className="inline-block border border-black px-4 py-1 font-bold text-[10px]">CONTOH</div>
                                </div>
                                
                                <div className="mt-20 font-bold text-sm mb-12">BENTUK RENCANA KESELAMATAN KONSTRUKSI</div>
                                
                                <div className="border border-black w-full flex text-center mb-16">
                                    <div className="w-1/2 p-6 border-r border-black flex flex-col justify-center">
                                        <div className="text-slate-300 mb-2">[Logo Perusahaan]</div>
                                        <div className="font-bold">PT. Maju Konstruksi</div>
                                    </div>
                                    <div className="w-1/2 p-6 flex flex-col justify-center">
                                        <div className="font-bold text-xs mb-2">RENCANA KESELAMATAN KONSTRUKSI</div>
                                        <div className="italic">[digunakan untuk usulan penawaran]</div>
                                    </div>
                                </div>

                                <div className="font-bold text-sm mb-6 uppercase">Daftar Isi</div>
                                
                                <div className="w-full text-left pl-8 space-y-1">
                                    <div className="font-bold">A. Kepemimpinan dan Partisipasi Pekerja dalam Keselamatan Konstruksi</div>
                                    <div className="pl-4">A.1. Kepedulian pimpinan terhadap Isu eksternal dan internal</div>
                                    <div className="pl-4">A.2. Komitmen Keselamatan Konstruksi</div>
                                    <div className="font-bold mt-2">B. Perencanaan keselamatan konstruksi</div>
                                    <div className="pl-4">B.1. Identifikasi bahaya, Penilaian risiko, Pengendalian dan Peluang</div>
                                    <div className="pl-4">B.2. Rencana tindakan (sasaran & program)</div>
                                    <div className="pl-4">B.3. Standar dan peraturan perundangan</div>
                                    <div className="font-bold mt-2">C. Dukungan Keselamatan Konstruksi</div>
                                    <div className="pl-4">C.1. Sumber Daya</div>
                                    <div className="pl-4">C.2. Kompetensi</div>
                                    <div className="pl-4">C.3. Kepedulian</div>
                                    <div className="pl-4">C.4. Komunikasi</div>
                                    <div className="pl-4">C.5. Informasi Terdokumentasi</div>
                                    <div className="font-bold mt-2">D. Operasi Keselamatan Konstruksi</div>
                                    <div className="pl-4">D.1. Perencanaan dan Pengendalian Operasi</div>
                                    <div className="pl-4">D.2. Kesiapan dan Tanggapan Terhadap Kondisi Darurat</div>
                                    <div className="font-bold mt-2">E. Evaluasi Kinerja Keselamatan Konstruksi</div>
                                    <div className="pl-4">E.1. Pemantauan dan evaluasi</div>
                                    <div className="pl-4">E.2. Tinjauan manajemen</div>
                                    <div className="pl-4">E.3. Peningkatan kinerja keselamatan konstruksi</div>
                                </div>
                            </div>
                        )}

                        {rkkMenu === 'pakta' && (
                            <div className="a4-portrait font-mono text-[9px] text-slate-800 leading-relaxed shadow-lg p-10">
                                <div className="font-bold text-[10px] mb-2">A. Kepemimpinan dan Partisipasi Pekerja dalam Keselamatan Konstruksi</div>
                                <div className="mb-4">
                                    <div className="font-bold mb-1">A.1. Kepedulian pimpinan terhadap Isu eksternal dan internal:</div>
                                    <p className="text-justify mb-2">Manajemen PT. Maju Konstruksi sangat peduli dan menyadari bahwa isu eksternal dan internal berdampak signifikan pada penerapan Sistem Manajemen Keselamatan Konstruksi (SMKK). Oleh karena itu, pimpinan perusahaan berkomitmen untuk mengelola risiko-risiko yang berasal dari isu sosial, budaya, kebijakan pemerintah, serta memastikan ketersediaan sumber daya, kesiapan teknologi, dan kompetensi personel internal. Kepedulian ini ditunjukkan melalui penyediaan anggaran K3 yang memadai, pembentukan tim K3 yang kompeten, dan adaptasi proaktif terhadap perubahan peraturan terkait di lingkungan {tenderMeta.instansi}.</p>
                                    
                                    <div className="font-bold mb-1 mt-4">A.2. Komitmen Keselamatan Konstruksi</div>
                                </div>
                                                                
                                <div className="text-center font-bold text-xs mt-8 mb-4">PAKTA KOMITMEN KESELAMATAN KONSTRUKSI</div>
                                
                                <div className="mb-4">Saya yang bertanda tangan di bawah ini:</div>
                                <table className="w-full mb-4">
                                    <tbody>
                                        <tr><td className="w-1/4">Nama</td><td className="w-[2%]">:</td><td>Budi Santoso, ST</td></tr>
                                        <tr><td>Jabatan</td><td>:</td><td>Direktur Utama</td></tr>
                                        <tr><td className="align-top">Bertindak untuk<br/>dan atas nama</td><td className="align-top">:</td><td>PT. Maju Konstruksi</td></tr>
                                    </tbody>
                                </table>

                                <div className="text-justify mb-4">
                                    dalam rangka pengadaan <b>{tenderMeta.namaPaket}</b> pada <b>Pokja Pemilihan {tenderMeta.instansi}</b> berkomitmen melaksanakan konstruksi berkeselamatan demi terciptanya <i>Zero Accident</i>, dengan memastikan bahwa seluruh pelaksanaan konstruksi:
                                </div>

                                <ol className="list-decimal pl-8 mb-8 space-y-1">
                                    <li>Memenuhi ketentuan Keselamatan Konstruksi;</li>
                                    <li>Menggunakan tenaga kerja kompeten bersertifikat;</li>
                                    <li>Menggunakan peralatan yang memenuhi standar kelaikan;</li>
                                    <li>Menggunakan material yang memenuhi standar mutu;</li>
                                    <li>Menggunakan teknologi yang memenuhi standar kelaikan;</li>
                                    <li>Melaksanakan Standar Operasi dan Prosedur (SOP); dan</li>
                                    <li>Memenuhi 9 (sembilan) komponen biaya penerapan SMKK.</li>
                                </ol>

                                <div className="flex justify-end pr-16 mb-24">
                                    <div className="text-center">
                                        Semarang, ................. 2026<br/>
                                        <b>PT. Maju Konstruksi</b><br/><br/><br/><br/>
                                        (Budi Santoso, ST)<br/>
                                        <i>Direktur Utama</i>
                                    </div>
                                </div>
                            </div>
                        )}

                        {rkkMenu === 'ibprp' && (
                            <div className="a4-landscape font-mono text-[8px] text-slate-800 leading-tight shadow-lg p-6">
                                <div className="font-bold text-[10px] mb-2">B. Perencanaan keselamatan konstruksi<br/>B.1. Identifikasi bahaya, Penilaian risiko, Pengendalian dan Peluang.</div>
                                
                                <table className="w-full border-collapse border border-black mb-4">
                                    <thead className="bg-slate-50 font-bold text-center">
                                        <tr>
                                            <th rowSpan="2" className="border border-black p-1 w-[2%]">NO</th>
                                            <th rowSpan="2" className="border border-black p-1 w-[15%]">DESKRIPSI RISIKO (Uraian Pekerjaan & Identifikasi Bahaya)</th>
                                            <th rowSpan="2" className="border border-black p-1 w-[5%]">JENIS BAHAYA (Tipe Kecelakaan)</th>
                                            <th rowSpan="2" className="border border-black p-1 w-[8%]">PERSYARATAN PEMENUHAN PERATURAN</th>
                                            <th rowSpan="2" className="border border-black p-1 w-[12%]">PENGENDALIAN AWAL</th>
                                            <th colSpan="3" className="border border-black p-1 text-red-700">PENILAIAN TINGKAT RISIKO</th>
                                            <th rowSpan="2" className="border border-black p-1 w-[10%]">PENGENDALIAN LANJUTAN</th>
                                            <th colSpan="3" className="border border-black p-1 text-blue-700">PENILAIAN SISA RISIKO</th>
                                            <th rowSpan="2" className="border border-black p-1 w-[5%]">KETERANGAN</th>
                                        </tr>
                                        <tr>
                                            <th className="border border-black p-1 w-[3%] text-red-700">K (F)</th>
                                            <th className="border border-black p-1 w-[3%] text-red-700">P (A)</th>
                                            <th className="border border-black p-1 w-[3%] text-red-700">TR</th>
                                            <th className="border border-black p-1 w-[3%] text-blue-700">K (F)</th>
                                            <th className="border border-black p-1 w-[3%] text-blue-700">P (A)</th>
                                            <th className="border border-black p-1 w-[3%] text-blue-700">TR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rkkContent.bahaya.map((row) => (
                                            <tr key={row.no}>
                                                <td className="border border-black p-1 text-center">{row.no}</td>
                                                <td className="border border-black p-1"><b>{row.pekerjaan}</b><br/><span className="text-red-700">{row.risiko}</span></td>
                                                <td className="border border-black p-1 text-center">Tertimpa / Terluka</td>
                                                <td className="border border-black p-1">UU No. 1 Th 1970<br/>Permenaker 01/1980</td>
                                                <td className="border border-black p-1">{row.mitigasi}</td>
                                                <td className="border border-black p-1 text-center">3</td>
                                                <td className="border border-black p-1 text-center">4</td>
                                                <td className="border border-black p-1 text-center font-bold text-red-600">12 (T)</td>
                                                <td className="border border-black p-1">Inspeksi Harian, Toolbox Meeting</td>
                                                <td className="border border-black p-1 text-center">1</td>
                                                <td className="border border-black p-1 text-center">2</td>
                                                <td className="border border-black p-1 text-center font-bold text-emerald-600">2 (R)</td>
                                                <td className="border border-black p-1 text-center">N/A</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="font-bold text-[10px] mt-6 mb-2">B.2. Rencana tindakan (sasaran khusus & program khusus)</div>
                                <table className="w-full border-collapse border border-black">
                                    <thead className="bg-slate-50 font-bold text-center">
                                        <tr>
                                            <th rowSpan="2" className="border border-black p-1">NO</th>
                                            <th rowSpan="2" className="border border-black p-1">Pengendalian Risiko</th>
                                            <th colSpan="2" className="border border-black p-1">Sasaran</th>
                                            <th colSpan="5" className="border border-black p-1">Program</th>
                                        </tr>
                                        <tr>
                                            <th className="border border-black p-1">Uraian</th>
                                            <th className="border border-black p-1">Tolok Ukur</th>
                                            <th className="border border-black p-1">Uraian Kegiatan</th>
                                            <th className="border border-black p-1">Sumber Daya</th>
                                            <th className="border border-black p-1">Jadwal</th>
                                            <th className="border border-black p-1">Indikator</th>
                                            <th className="border border-black p-1">Penanggung Jawab</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rkkContent.bahaya.map((row) => (
                                            <tr key={row.no}>
                                                <td className="border border-black p-1 text-center">{row.no}</td>
                                                <td className="border border-black p-1">{row.mitigasi}</td>
                                                <td className="border border-black p-1">Mencegah insiden</td>
                                                <td className="border border-black p-1">Zero Accident</td>
                                                <td className="border border-black p-1">Pengawasan intensif, penyediaan APD</td>
                                                <td className="border border-black p-1">Dana K3, Helm, Rompi</td>
                                                <td className="border border-black p-1">Setiap Hari</td>
                                                <td className="border border-black p-1">Laporan harian K3</td>
                                                <td className="border border-black p-1 text-center">Ahli K3</td>
                                            </tr>
                                        ))}
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

                        {rkkMenu === 'dukungan' && (
                            <div className="a4-portrait font-mono text-[9px] text-slate-800 leading-relaxed shadow-lg p-10">
                                <div className="font-bold text-[10px] mb-4">C. Dukungan Keselamatan Konstruksi</div>

                                <div className="mb-4">
                                    <div className="font-bold mb-1">C.1. Sumber Daya</div>
                                    <p className="text-justify mb-2">PT. Maju Konstruksi menyediakan sumber daya yang memadai, meliputi ketersediaan personil bersertifikat Ahli K3 Konstruksi, anggaran biaya SMKK yang sesuai dengan ketentuan, peralatan kerja yang laik pakai, serta fasilitas kesehatan dan keselamatan di lapangan. Kebutuhan APD, rambu K3, dan fasilitas P3K dipastikan selalu tersedia sebelum pekerjaan dimulai.</p>
                                    
                                    <div className="font-bold mb-1 mt-3">C.2. Kompetensi</div>
                                    <p className="text-justify mb-2">Setiap pekerja yang terlibat dalam proyek wajib memiliki tingkat pendidikan, sertifikat keahlian/keterampilan (SKK/SBU), dan pengalaman yang sesuai. Petugas K3 dan Ahli K3 akan memberikan pelatihan (training) secara berkala terkait cara kerja aman, penggunaan alat bantu, dan respon darurat.</p>
                                    
                                    <div className="font-bold mb-1 mt-3">C.3. Kepedulian</div>
                                    <p className="text-justify mb-2">Kepedulian (Awareness) dibangun melalui pembiasaan dan teguran langsung. Seluruh elemen proyek dari Manajer hingga Pekerja wajib mematuhi Kebijakan K3, menyadari bahaya pekerjaannya masing-masing, dan memahami dampak jika mengabaikan prosedur K3.</p>
                                </div>

                                <div className="font-bold mb-2">C.4. Komunikasi</div>
                                <div className="mb-2">Jadwal Program Komunikasi:</div>
                                <table className="w-full border-collapse border border-black mb-8">
                                    <thead className="bg-slate-50 font-bold">
                                        <tr>
                                            <th className="border border-black p-2 w-[5%] text-center">NO</th>
                                            <th className="border border-black p-2 w-[45%] text-center">Jenis Komunikasi</th>
                                            <th className="border border-black p-2 w-[25%] text-center">PIC</th>
                                            <th className="border border-black p-2 text-center">Waktu Pelaksanaan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-black p-2 text-center">1</td>
                                            <td className="border border-black p-2">Induksi Keselamatan Konstruksi (Safety Induction)</td>
                                            <td className="border border-black p-2 text-center">Ahli K3</td>
                                            <td className="border border-black p-2 text-center">Sebelum mulai pekerjaan</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black p-2 text-center">2</td>
                                            <td className="border border-black p-2">Pertemuan pagi hari (Safety morning)</td>
                                            <td className="border border-black p-2 text-center">Ahli K3 / Mandor</td>
                                            <td className="border border-black p-2 text-center">Setiap Pagi (07.30 WIB)</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black p-2 text-center">3</td>
                                            <td className="border border-black p-2">Pertemuan Kelompok Kerja (Toolbox meeting)</td>
                                            <td className="border border-black p-2 text-center">Pelaksana / Ahli K3</td>
                                            <td className="border border-black p-2 text-center">1x Seminggu</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black p-2 text-center">4</td>
                                            <td className="border border-black p-2">Rapat Keselamatan Konstruksi (Construction safety meeting)</td>
                                            <td className="border border-black p-2 text-center">Manajer Proyek</td>
                                            <td className="border border-black p-2 text-center">1x Sebulan</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="mb-4 mt-6">
                                    <div className="font-bold mb-1">C.5. Informasi Terdokumentasi</div>
                                    <p className="text-justify mb-2">Semua aktivitas terkait K3 didokumentasikan dan diarsipkan. Hal ini meliputi form JSA, form Izin Kerja (Permit to Work), notulensi Toolbox Meeting, Laporan Harian/Mingguan K3, serta laporan inspeksi dan investigasi insiden. Dokumen akan dipelihara dan dikendalikan agar selalu up-to-date dan mudah diakses selama pelaksanaan konstruksi.</p>
                                </div>
                            </div>
                        )}

                        {rkkMenu === 'operasi' && (
                            <div className="a4-portrait font-mono text-[9px] text-slate-800 leading-relaxed shadow-lg p-10">
                                <div className="font-bold text-[10px] mb-4">D. Operasi Keselamatan Konstruksi<br/>D.1. Analisis Keselamatan Pekerjaan (Job Safety Analysis)</div>
                                
                                <table className="mb-4 text-[9px]">
                                    <tbody>
                                        <tr><td className="w-32">Nama Pekerja</td><td className="w-[2%]">:</td><td>Semua Pekerja Lapangan</td></tr>
                                        <tr><td>Nama Paket Pekerjaan</td><td>:</td><td>{tenderMeta.namaPaket}</td></tr>
                                        <tr><td>Tanggal Pekerjaan</td><td>:</td><td>Sesuai Jadwal Kontrak</td></tr>
                                    </tbody>
                                </table>

                                <div className="mb-2">Alat Pelindung Diri yang diperlukan:</div>
                                <table className="w-full border-collapse border border-black mb-6">
                                    <tbody>
                                        <tr>
                                            <td className="border border-black p-1 w-[5%] text-center">1</td>
                                            <td className="border border-black p-1 w-[40%]">Helm/Safety Helmet</td>
                                            <td className="border border-black p-1 w-[5%] text-center">√</td>
                                            <td className="border border-black p-1 w-[5%] text-center">4</td>
                                            <td className="border border-black p-1 w-[40%]">Rompi Keselamatan/Safety Vest</td>
                                            <td className="border border-black p-1 w-[5%] text-center">√</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black p-1 text-center">2</td>
                                            <td className="border border-black p-1">Sepatu/Safety Shoes</td>
                                            <td className="border border-black p-1 text-center">√</td>
                                            <td className="border border-black p-1 text-center">5</td>
                                            <td className="border border-black p-1">Masker Pernafasan/Respiratory</td>
                                            <td className="border border-black p-1 text-center">√</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black p-1 text-center">3</td>
                                            <td className="border border-black p-1">Sarung Tangan/Safety Gloves</td>
                                            <td className="border border-black p-1 text-center">√</td>
                                            <td className="border border-black p-1 text-center">6</td>
                                            <td className="border border-black p-1">Lainnya sesuai kebutuhan khusus</td>
                                            <td className="border border-black p-1 text-center"></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="w-full border-collapse border border-black">
                                    <thead className="bg-slate-50 font-bold">
                                        <tr>
                                            <th className="border border-black p-2">Urutan Langkah Pekerjaan</th>
                                            <th className="border border-black p-2">Identifikasi Bahaya</th>
                                            <th className="border border-black p-2">Pengendalian</th>
                                            <th className="border border-black p-2">Penanggung Jawab</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rkkContent.bahaya.map((row) => (
                                            <tr key={row.no}>
                                                <td className="border border-black p-2">{row.pekerjaan}</td>
                                                <td className="border border-black p-2">{row.risiko}</td>
                                                <td className="border border-black p-2">{row.mitigasi}</td>
                                                <td className="border border-black p-2 text-center">Ahli K3 / Pelaksana</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="mb-4 mt-6">
                                    <div className="font-bold mb-1">D.2. Kesiapan dan Tanggapan Terhadap Kondisi Darurat</div>
                                    <p className="text-justify mb-2">Dalam menghadapi situasi darurat (seperti kebakaran, gempa bumi, kecelakaan kerja fatal, atau tumpahan bahan kimia berbahaya), tim proyek telah membentuk Tim Tanggap Darurat (Emergency Response Team). Nomor telepon darurat (Rumah Sakit terdekat, Pemadam Kebakaran, Kepolisian) telah dipasang di papan informasi proyek.</p>
                                    <p className="text-justify mb-2">Prosedur evakuasi ditetapkan dengan rute yang jelas menuju Titik Kumpul (Muster Point) yang aman. Simulasi (drill) tanggap darurat akan dilakukan minimal satu kali dalam periode pelaksanaan proyek untuk memastikan kesiapan seluruh personel.</p>
                                </div>
                            </div>
                        )}

                        {rkkMenu === 'evaluasi' && (
                            <div className="a4-portrait font-mono text-[9px] text-slate-800 leading-relaxed shadow-lg p-10">
                                <div className="font-bold text-[10px] mb-4">E. Evaluasi Keselamatan Konstruksi<br/>E.1 Pemantauan dan Evaluasi</div>
                                
                                <div className="text-center font-bold mb-2">Jadwal Inspeksi dan Audit</div>
                                <table className="w-full border-collapse border border-black">
                                    <thead className="bg-slate-50 font-bold text-center">
                                        <tr>
                                            <th rowSpan="2" className="border border-black p-2 w-[5%]">No</th>
                                            <th rowSpan="2" className="border border-black p-2">Kegiatan</th>
                                            <th rowSpan="2" className="border border-black p-2 w-[15%]">PIC</th>
                                            <th colSpan="12" className="border border-black p-2">Bulan Ke-</th>
                                        </tr>
                                        <tr>
                                            {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                                                <th key={m} className="border border-black p-1 w-[3%]">{m}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-black p-2 text-center">1</td>
                                            <td className="border border-black p-2">Inspeksi Keselamatan Konstruksi</td>
                                            <td className="border border-black p-2 text-center">Ahli K3</td>
                                            {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                                                <td key={m} className="border border-black p-1 text-center font-bold">V</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="border border-black p-2 text-center">2</td>
                                            <td className="border border-black p-2">Patroli Keselamatan Konstruksi</td>
                                            <td className="border border-black p-2 text-center">Petugas K3</td>
                                            {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                                                <td key={m} className="border border-black p-1 text-center font-bold">V</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="border border-black p-2 text-center">3</td>
                                            <td className="border border-black p-2">Audit internal</td>
                                            <td className="border border-black p-2 text-center">Manajer Proyek</td>
                                            {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                                                <td key={m} className="border border-black p-1 text-center font-bold">{m % 3 === 0 ? 'V' : ''}</td>
                                            ))}
                                        </tr>
                                    </tbody>
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

                    {/* Upload Bottom */}
                    <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 border-dashed text-center mt-6 shrink-0">
                        <FileText size={24} className="mx-auto text-indigo-300 mb-2" />
                        <p className="text-xs font-bold text-slate-700">Unggah Final RKK (PDF Lengkap)</p>
                        <p className="text-[10px] text-slate-500 mb-3">Format PDF yang sudah ditandatangani Direktur Utama</p>
                        <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-2">
                            <Download size={13} className="rotate-180" /> Pilih File PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
