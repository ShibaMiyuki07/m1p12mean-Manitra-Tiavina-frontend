import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  generateInvoice(order: any, customerInfo: any): void {
    const doc = new jsPDF();

    // En-tête
    this.addLogo(doc);
    doc.setFontSize(18);
    doc.text('FACTURE', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`N° Commande: ${order._id}`, 14, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 40);

    // Informations client
    doc.setFontSize(14);
    doc.text('Client:', 34, 60);
    doc.setFontSize(12);
    doc.text(`Nom: ${customerInfo.profile.firstName} ${customerInfo.profile.lastName}`, 14, 70);
    doc.text(`Email: ${customerInfo.email}`, 14, 80);
    doc.text(`Adresse: ${customerInfo.profile.address}`, 14, 90);

    // Tableau des articles
    const items = [
      ...order.products.map((p: any) => [
        p.productId.name,
        p.quantity,
        `${p.productId.price} AR`,
        `${p.quantity * p.productId.price} AR`
      ]),
      ...order.services.map((s: any) => [
        `Service : ${s.serviceId.name}`,
        1,
        `${s.serviceId.price} AR`,
        `${s.serviceId.price} AR`
      ])
    ];

    autoTable(doc, {
      head: [['Article', 'Quantité', 'Prix unitaire', 'Total']],
      body: items,
      startY: 100,
      styles: { cellPadding: 5, fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] }
    });

    // Total
    const total = this.calculateTotal(order);
    autoTable(doc, {
      body: [['Total', '', '', `${total} AR`]],
      startY: (doc as any).lastAutoTable.finalY + 10,
      styles: { cellPadding: 5, fontSize: 12, fontStyle: 'bold' },
      columnStyles: { 3: { halign: 'right' } }
    });

    // Pied de page
    doc.setFontSize(10);
    doc.text('Merci pour votre achat !', 105, (doc as any).lastAutoTable.finalY + 20, { align: 'center' });

    // Sauvegarde du PDF
    doc.save(`facture-${order._id}.pdf`);
  }

  addLogo(doc: jsPDF) {
    const imgData = 'assets-bosh/images/logo.png';
    doc.addImage(imgData, 'PNG', 154, 10, 50, 15);
  }

  private calculateTotal(order: any): number {
    const productsTotal = order.products.reduce((sum: number, p: any) => sum + (p.quantity * p.productId.price), 0);
    const servicesTotal = order.services.reduce((sum: number, s: any) => sum + s.serviceId.price, 0);
    return productsTotal + servicesTotal;
  }
}
