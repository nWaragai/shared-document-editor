import html2pdf from 'html2pdf.js'



export const useExportToPdf = () => {
  const exportTiptapToPdf = (documentName: string)=>{
    const element = document.getElementById('tiptap');
    if(!element) return console.error("export failed: element not found"); 


    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: documentName,
        html2canvas: {scale: 2},
        jsPdf: {unit: 'mm', format: 'a4', orientation: 'portrait'},
      })
      .save();
  }
  
  return { exportTiptapToPdf }
}