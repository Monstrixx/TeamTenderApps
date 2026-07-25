import { IResumeTemplate, ResumeContext } from './IResumeTemplate';

export class LPJKTemplate implements IResumeTemplate {
  async render(context: ResumeContext): Promise<string> {
    // In a real implementation, this would use a template engine like Handlebars or EJS
    // and process the context to generate the HTML.
    return `
      <html>
        <head><title>Curriculum Vitae - ${context.personnel.fullName}</title></head>
        <body>
          <h1>Daftar Riwayat Hidup (Format LPJK)</h1>
          <h2>1. Data Personal</h2>
          <p>Nama: ${context.personnel.fullName}</p>
          <p>Tempat/Tanggal Lahir: ${context.personnel.birthPlace}, ${context.personnel.birthDate ? context.personnel.birthDate.toISOString().split('T')[0] : '-'}</p>
          
          <h2>2. Pendidikan</h2>
          <ul>
            ${context.education.map(e => `<li>${e.level} - ${e.institution} (${e.graduationYear})</li>`).join('')}
          </ul>
          
          <h2>3. Pengalaman Kerja</h2>
          <ul>
            ${context.experience.map(e => `<li>${e.companyName} - ${e.position} (${e.projectName || 'N/A'})</li>`).join('')}
          </ul>
          
          <h2>4. Sertifikasi (SKK)</h2>
          <ul>
            ${context.skk.map(s => `<li>${s.qualification} - ${s.certificateNumber} (Expired: ${s.expiredDate.toISOString().split('T')[0]})</li>`).join('')}
          </ul>
        </body>
      </html>
    `;
  }
}
