import jsPDF from "jspdf";

export const generateInvoice = (order) => {
  const doc = new jsPDF();

  // Font and Colors
  doc.setFont("helvetica");
  const primary = [34, 34, 34];
  const accent = [220, 53, 69];
  const gold = [255, 193, 7];
  const light = [248, 249, 250];
  const gray = [108, 117, 125];
  const white = [255, 255, 255];
  const success = [40, 167, 69];

  // Header
  doc.setFillColor(...primary);
  doc.rect(0, 0, 210, 60, "F");
  doc.setFillColor(...gold);
  doc.rect(0, 0, 210, 3, "F");
  doc.setFillColor(...accent);
  doc.rect(0, 3, 210, 3, "F");

  doc.setTextColor(...white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.setCharSpace(0.5);
  doc.text("Mudrika International", 20, 25);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setCharSpace(0);
  doc.setTextColor(200, 200, 200);
  doc.text("Premium Handcrafted Furniture & Décor", 20, 35);
  doc.setFontSize(9);
  doc.text("Crafting Excellence Since 2020", 20, 42);

  // Invoice Badge
  const badgeX = 150, badgeY = 20, badgeW = 50, badgeH = 25;
  doc.setFillColor(...white);
  doc.roundedRect(badgeX - 1, badgeY - 1, badgeW + 2, badgeH + 2, 4, 4, "F");
  doc.setFillColor(...accent);
  doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 3, 3, "F");
  doc.setTextColor(...white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("INVOICE", badgeX + badgeW / 2, badgeY + 11, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`#${order.orderId || order._id}`, badgeX + badgeW / 2, badgeY + 20, { align: "center" });

  // Background
  doc.setFillColor(...light);
  doc.rect(0, 60, 210, 200, "F");

  // Invoice and Shipping Cards
  const startY = 75;

  // Invoice Details
  doc.setFillColor(...white);
  doc.roundedRect(15, startY, 85, 50, 2, 2, "F");
  doc.setDrawColor(230);
  doc.roundedRect(15.5, startY + 0.5, 85, 50, 2, 2, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...primary);
  doc.text("Invoice Details", 20, startY + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...gray);
  doc.text(`Invoice #: ${order.orderId || order._id}`, 20, startY + 18);
  doc.text(`Date: ${order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}`, 20, startY + 26);
  doc.text(`Status: ${order.orderStatus ? order.orderStatus[0].toUpperCase() + order.orderStatus.slice(1) : "-"}`, 20, startY + 34);
  doc.text(`Payment: ${order.status ? order.status[0].toUpperCase() + order.status.slice(1) : "-"}`, 20, startY + 42);

  // Shipping Address
  const addr = order.address || {};
  doc.setFillColor(...white);
  doc.roundedRect(110, startY, 85, 50, 2, 2, "F");
  doc.setDrawColor(230);
  doc.roundedRect(110.5, startY + 0.5, 85, 50, 2, 2, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...primary);
  doc.text("Shipping Address", 115, startY + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...gray);
  doc.text(addr.fullName || "-", 115, startY + 18);
  doc.text(addr.address || "-", 115, startY + 26);
  doc.text(`${addr.city || "-"}, ${addr.state || "-"}`, 115, startY + 34);
  doc.text(`Pincode: ${addr.pincode || "-"}`, 115, startY + 42);

  // Items Table
  const tableY = startY + 65;
  doc.setFillColor(...primary);
  doc.roundedRect(15, tableY - 8, 180, 15, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...white);
  doc.text("Item", 20, tableY);
  doc.text("Qty", 120, tableY);
  doc.text("Price", 150, tableY, { align: "right" });
  doc.text("Total", 190, tableY, { align: "right" });

  let y = tableY + 12;
  if (Array.isArray(order.cartItems) && order.cartItems.length > 0) {
    order.cartItems.forEach((item, idx) => {
      const bg = idx % 2 === 0 ? white : light;
      doc.setFillColor(...bg);
      doc.roundedRect(15, y - 6, 180, 12, 1, 1, "F");

      const name = (item.title || item.product || "Product").slice(0, 32);
      const price = item.salePrice || item.price || 0;
      const total = price * item.quantity;

      const formattedPrice = "Rs. " + parseFloat(price).toFixed(2);
      const formattedTotal = "Rs. " + parseFloat(total).toFixed(2);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...primary);
      doc.text(name, 20, y);
      doc.text(item.quantity.toString(), 120, y, { align: "right" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...success);
      doc.text(formattedPrice, 150, y, { align: "right" });

      doc.setTextColor(...primary);
      doc.text(formattedTotal, 190, y, { align: "right" });

      y += 12;
    });
  } else {
    doc.setTextColor(...gray);
    doc.text("No items found", 20, y);
    y += 12;
  }

  // Totals
  const summaryY = y + 20;
  const formattedSubtotal = "Rs. " + parseFloat(order.subtotal || order.amount || 0).toFixed(2);
  const formattedDelivery = "Rs. " + parseFloat(order.deliveryCharge || 0).toFixed(2);
  const formattedTotal = "Rs. " + parseFloat(order.amount || 0).toFixed(2);

  doc.setFillColor(...white);
  doc.roundedRect(120, summaryY - 10, 75, 60, 3, 3, "F");
  doc.setDrawColor(200);
  doc.roundedRect(120.5, summaryY - 9.5, 75, 60, 3, 3, "S");

  doc.setFillColor(...primary);
  doc.roundedRect(120, summaryY - 10, 75, 12, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...white);
  doc.text("Order Summary", 157.5, summaryY - 3, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...primary);
  doc.text("Subtotal:", 125, summaryY + 8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...gray);
  doc.text(formattedSubtotal, 190, summaryY + 8, { align: "right" });

  if (order.deliveryCharge > 0) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primary);
    doc.text("Delivery:", 125, summaryY + 18);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    doc.text(formattedDelivery, 190, summaryY + 18, { align: "right" });
  }

  doc.setDrawColor(...accent);
  doc.setLineWidth(1);
  doc.line(125, summaryY + 25, 190, summaryY + 25);

  doc.setFillColor(...accent);
  doc.roundedRect(120, summaryY + 28, 75, 15, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...white);
  doc.text("Total:", 125, summaryY + 38);
  doc.text(formattedTotal, 190, summaryY + 38, { align: "right" });

  // Footer
  const footerY = 270;
  doc.setFillColor(...primary);
  doc.rect(0, footerY, 210, 30, "F");
  doc.setFillColor(...accent);
  doc.rect(0, footerY, 210, 3, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...white);
  doc.text("Thank you for choosing Artisan Collection!", 20, footerY + 10);
  doc.text("For any queries, please contact our support team.", 20, footerY + 16);
  doc.text("This is a computer generated invoice.", 20, footerY + 22);

  // doc.setDrawColor(...gold);
  // doc.setLineWidth(1);
  // doc.line(20, footerY + 5, 190, footerY + 5);
  // doc.line(10, footerY + 8, 25, footerY + 8);
  // doc.line(185, footerY + 8, 200, footerY + 8);

  const fileName = `invoice-${addr.fullName}.pdf`;
  doc.save(fileName);
};






















// import jsPDF from "jspdf";

// export const generateInvoice = (order) => {
//   const doc = new jsPDF();

//   // Set font
//   doc.setFont("helvetica");

//   // Modern color palette
//   const primaryColor = [34, 34, 34]; // Dark charcoal
//   const accentColor = [220, 53, 69]; // Modern red
//   const goldAccent = [255, 193, 7]; // Warm gold
//   const lightGray = [248, 249, 250]; // Light background
//   const mediumGray = [108, 117, 125]; // Medium gray
//   const white = [255, 255, 255];
//   const successGreen = [40, 167, 69]; // Success green

//   // Create modern header with gradient effect
//   doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
//   doc.rect(0, 0, 210, 60, "F");

//   // Add subtle pattern overlay
//   doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
//   doc.rect(0, 0, 210, 8, "F");

//   // Add modern geometric accent
//   doc.setFillColor(goldAccent[0], goldAccent[1], goldAccent[2]);
//   doc.rect(0, 45, 210, 3, "F");

//   // Company branding with modern typography
//   doc.setTextColor(white[0], white[1], white[2]);
//   doc.setFontSize(32);
//   doc.setFont("helvetica", "bold");
//   doc.text("Artisan Collection", 20, 25);

//   // Modern subtitle
//   doc.setFontSize(11);
//   doc.setFont("helvetica", "normal");
//   doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
//   doc.text("Premium Handcrafted Furniture & Décor", 20, 35);

//   // Add modern tagline
//   doc.setFontSize(9);
//   doc.text("Crafting Excellence Since 2020", 20, 42);

//   // Invoice badge with modern design
//   const badgeX = 150;
//   const badgeY = 20;
//   const badgeWidth = 50;
//   const badgeHeight = 25;

//   // Badge background
//   doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
//   doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 3, 3, "F");

//   // Badge text
//   doc.setTextColor(white[0], white[1], white[2]);
//   doc.setFontSize(14);
//   doc.setFont("helvetica", "bold");
//   doc.text("INVOICE", badgeX + 25, badgeY + 10, { align: "center" });

//   doc.setFontSize(8);
//   doc.setFont("helvetica", "normal");
//   doc.text(`#${order.orderId || order._id}`, badgeX + 25, badgeY + 18, {
//     align: "center",
//   });

//   // Modern content area with subtle background
//   doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
//   doc.rect(0, 60, 210, 200, "F");

//   // Invoice details section with modern cards
//   const startY = 75;

//   // Left card - Invoice info
//   doc.setFillColor(white[0], white[1], white[2]);
//   doc.roundedRect(15, startY, 85, 50, 2, 2, "F");

//   // Card shadow effect
//   doc.setDrawColor(200, 200, 200);
//   doc.setLineWidth(0.5);
//   doc.roundedRect(15.5, startY + 0.5, 85, 50, 2, 2, "S");

//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(12);
//   doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
//   doc.text("Invoice Details", 20, startY + 8);

//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(9);
//   doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);

//   doc.text(`Invoice #: ${order.orderId || order._id}`, 20, startY + 18);
//   doc.text(
//     `Date: ${
//       order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"
//     }`,
//     20,
//     startY + 26
//   );
//   doc.text(
//     `Status: ${
//       order.orderStatus
//         ? order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)
//         : "-"
//     }`,
//     20,
//     startY + 34
//   );
//   doc.text(
//     `Payment: ${
//       order.status
//         ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
//         : "-"
//     }`,
//     20,
//     startY + 42
//   );

//   // Right card - Customer info
//   doc.setFillColor(white[0], white[1], white[2]);
//   doc.roundedRect(110, startY, 85, 50, 2, 2, "F");

//   // Card shadow effect
//   doc.roundedRect(110.5, startY + 0.5, 85, 50, 2, 2, "S");

//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(12);
//   doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
//   doc.text("Shipping Address", 115, startY + 8);

//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(9);
//   doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);

//   const address = order.address || {};
//   doc.text(address.fullName || "-", 115, startY + 18);
//   doc.text(address.address || "-", 115, startY + 26);
//   doc.text(`${address.city || "-"}, ${address.state || "-"}`, 115, startY + 34);
//   doc.text(`Pincode: ${address.pincode || "-"}`, 115, startY + 42);

//   // Modern items table
//   const tableStartY = startY + 65;

//   // Table header with modern design
//   doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
//   doc.roundedRect(15, tableStartY - 8, 180, 15, 2, 2, "F");

//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(11);
//   doc.setTextColor(white[0], white[1], white[2]);
//   doc.text("Item", 20, tableStartY);
//   doc.text("Qty", 120, tableStartY);
//   doc.text("Price", 150, tableStartY);
//   doc.text("Total", 180, tableStartY);

//   // Items with modern alternating rows
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(10);
//   let currentY = tableStartY + 12;

//   if (Array.isArray(order.cartItems) && order.cartItems.length > 0) {
//     order.cartItems.forEach((item, index) => {
//       const itemPrice = item.salePrice || item.price || 0;
//       const itemTotal = itemPrice * item.quantity;

//       // Modern alternating row colors
//       if (index % 2 === 0) {
//         doc.setFillColor(white[0], white[1], white[2]);
//       } else {
//         doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
//       }
//       doc.roundedRect(15, currentY - 6, 180, 12, 1, 1, "F");

//       // Subtle border
//       doc.setDrawColor(220, 220, 220);
//       doc.setLineWidth(0.3);
//       doc.roundedRect(15, currentY - 6, 180, 12, 1, 1, "S");

//       doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);

//       // Item name with better truncation
//       const itemName = item.title || item.product || "Product";
//       const truncatedName =
//         itemName.length > 35 ? itemName.substring(0, 32) + "..." : itemName;

//       doc.text(truncatedName, 20, currentY);
//       doc.text(item.quantity.toString(), 120, currentY);
//       doc.text(`₹${itemPrice.toFixed(2)}`, 150, currentY);
//       doc.text(`₹${itemTotal.toFixed(2)}`, 180, currentY);

//       currentY += 12;
//     });
//   } else {
//     doc.setFillColor(white[0], white[1], white[2]);
//     doc.roundedRect(15, currentY - 6, 180, 12, 1, 1, "F");
//     doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
//     doc.text("No items found", 20, currentY);
//     currentY += 12;
//   }

//   // Modern totals section
//   const totalsStartY = currentY + 20;

//   // Totals card with modern design
//   doc.setFillColor(white[0], white[1], white[2]);
//   doc.roundedRect(120, totalsStartY - 10, 75, 60, 3, 3, "F");

//   // Card shadow
//   doc.setDrawColor(200, 200, 200);
//   doc.setLineWidth(0.5);
//   doc.roundedRect(120.5, totalsStartY - 9.5, 75, 60, 3, 3, "S");

//   // Totals header
//   doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
//   doc.roundedRect(120, totalsStartY - 10, 75, 12, 3, 3, "F");

//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(11);
//   doc.setTextColor(white[0], white[1], white[2]);
//   doc.text("Order Summary", 157.5, totalsStartY - 3, { align: "center" });

//   // Subtotal
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(10);
//   doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
//   doc.text("Subtotal:", 125, totalsStartY + 8);
//   doc.setFont("helvetica", "normal");
//   doc.text(
//     `₹${(order.subtotal || order.amount || 0).toFixed(2)}`,
//     175,
//     totalsStartY + 8
//   );

//   // Delivery charge
//   if (order.deliveryCharge && order.deliveryCharge > 0) {
//     doc.setFont("helvetica", "bold");
//     doc.text("Delivery:", 125, totalsStartY + 18);
//     doc.setFont("helvetica", "normal");
//     doc.text(`₹${order.deliveryCharge.toFixed(2)}`, 175, totalsStartY + 18);
//   }

//   // Modern separator
//   doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
//   doc.setLineWidth(1);
//   doc.line(125, totalsStartY + 25, 190, totalsStartY + 25);

//   // Total with highlight
//   doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
//   doc.roundedRect(120, totalsStartY + 28, 75, 15, 3, 3, "F");

//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(12);
//   doc.setTextColor(white[0], white[1], white[2]);
//   doc.text("Total:", 125, totalsStartY + 38);
//   doc.text(`₹${(order.amount || 0).toFixed(2)}`, 175, totalsStartY + 38);

//   // Modern footer with gradient
//   const footerY = 270;

//   // Footer background
//   doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
//   doc.rect(0, footerY, 210, 30, "F");

//   // Footer accent
//   doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
//   doc.rect(0, footerY, 210, 3, "F");

//   // Modern footer content
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(9);
//   doc.setTextColor(white[0], white[1], white[2]);
//   doc.text("Thank you for choosing Artisan Collection!", 20, footerY + 10);
//   doc.text(
//     "For any queries, please contact our support team.",
//     20,
//     footerY + 16
//   );
//   doc.text("This is a computer generated invoice.", 20, footerY + 22);

//   // Add modern decorative elements
//   doc.setDrawColor(goldAccent[0], goldAccent[1], goldAccent[2]);
//   doc.setLineWidth(1);

//   // Top decorative line
//   doc.line(20, footerY + 5, 190, footerY + 5);

//   // Corner accents
//   doc.line(10, footerY + 8, 25, footerY + 8);
//   doc.line(185, footerY + 8, 200, footerY + 8);

//   // Save the PDF
//   const fileName = `invoice-${order.orderId || order._id}.pdf`;
//   doc.save(fileName);
// };
