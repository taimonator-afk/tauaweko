// student-report.js
import jsPDF from "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";
import autoTable from "https://cdn.jsdelivr.net/npm/jspdf-autotable@3.5.28/dist/jspdf.plugin.autotable.min.js";

/*
  generateStudentReport(profile, progress, charts, classes)
  profile: { displayName, email, lastLogin }
  progress: { lessons, assessments, interactive }
  charts: { assessmentChartCanvas, interactiveChartCanvas }
  classes: [{className, classCode}]
*/

export async function generateStudentReport(profile, progress, charts, classes) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Colours
  const darkBlue = "#0f1e4d";
  const lightBlue = "#3b82f6";

  /* -------------------------------------------
     HEADER
  ------------------------------------------- */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(darkBlue);
  doc.text("Pūrongo Ākonga", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor("black");
  doc.text("Te Whare o Raukura", 105, 28, { align: "center" });

  /* -------------------------------------------
     STUDENT INFO
  ------------------------------------------- */
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(`Ingoa (Name): ${profile.displayName || "(Unknown)"}`, 14, 45);
  doc.text(`Īmēra (Email): ${profile.email || "—"}`, 14, 52);
  doc.text(`Akomanga (Classes): ${classes.map(c => c.className).join(", ") || "—"}`, 14, 59);
  doc.text(`Last Login: ${profile.lastLogin || "—"}`, 14, 66);

  /* -------------------------------------------
     LESSONS
  ------------------------------------------- */
  const lessons = progress.lessons || {};
  const lessonRows = Object.keys(lessons).length
    ? Object.keys(lessons).map(l => [l, "Completed"])
    : [["None", "—"]];

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(darkBlue);
  doc.text("Ngā Akoranga (Lessons)", 14, 80);

  doc.autoTable({
    startY: 85,
    head: [["Lesson", "Status"]],
    body: lessonRows,
    styles: { fontSize: 11 }
  });

  /* -------------------------------------------
     ASSESSMENTS
  ------------------------------------------- */
  doc.setFontSize(14);
  doc.setTextColor(darkBlue);

  let y = doc.autoTable.previous.finalY + 12;
  doc.text("Aromatawai (Assessments)", 14, y);

  const assess = progress.assessments || {};
  const assessRows = Object.keys(assess).length
    ? Object.keys(assess).map(name => [
        name, 
        `${assess[name].score}%`, 
        assess[name].completedAt || "—"
      ])
    : [["None", "—", "—"]];

  doc.autoTable({
    startY: y + 6,
    head: [["Name", "Score", "Date Completed"]],
    body: assessRows,
    styles: { fontSize: 11 }
  });

  /* -------------------------------------------
     CHARTS
  ------------------------------------------- */
  const chartY = doc.autoTable.previous.finalY + 20;

  doc.setFontSize(14);
  doc.setTextColor(darkBlue);
  doc.text("Ngā Tūtohi (Charts)", 14, chartY);

  // Convert charts to images
  const assessImg = charts.assessmentChartCanvas.toDataURL("image/png", 1.0);
  const interactImg = charts.interactiveChartCanvas.toDataURL("image/png", 1.0);

  doc.addImage(assessImg, "PNG", 14, chartY + 5, 85, 60);
  doc.addImage(interactImg, "PNG", 110, chartY + 5, 85, 60);

  /* -------------------------------------------
     FOOTER
  ------------------------------------------- */
  doc.setFontSize(10);
  doc.setTextColor("gray");

  const today = new Date().toLocaleDateString("en-NZ");

  doc.text(`Report generated ${today}`, 14, 290);
  doc.text("Te Whare o Raukura – Tau Āweko", 14, 296);

  /* -------------------------------------------
     SAVE
  ------------------------------------------- */
  const fileName = `Purongo_Akonga_${profile.displayName || "Student"}.pdf`;
  doc.save(fileName);
}
