export interface CompanyProfile {
  companyName: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  taxId: string;
  signatoryName: string;
  signatoryPosition: string;
  signature: string;
}

export interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  customerName: string;
  customerCompany: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  items: InvoiceItem[];
  discountPercent: number;
  taxPercent: number;
  notes: string;
}

export interface QuotationItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface QuotationData {
  quotationNumber: string;
  date: string;
  validUntil: string;
  customerName: string;
  customerCompany: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  items: QuotationItem[];
  discountPercent: number;
  taxPercent: number;
  scopeOfWork: string;
  termsAndConditions: string;
  notes: string;
}

export interface ReceiptData {
  receiptNumber: string;
  date: string;
  receivedFrom: string;
  amount: number;
  paymentMethod: string;
  paymentPurpose: string;
  notes: string;
}

export interface DeliveryOrderItem {
  id: string;
  productName: string;
  quantity: number;
}

export interface DeliveryOrderData {
  deliveryNumber: string;
  date: string;
  sender: string;
  receiver: string;
  deliveryAddress: string;
  courier: string;
  vehicleInfo: string;
  items: DeliveryOrderItem[];
  notes: string;
}

export interface PackingListItem {
  id: string;
  productName: string;
  quantity: number;
  weight: number;
  dimensions: string;
}

export interface PackingListData {
  packingListNumber: string;
  date: string;
  shipper: string;
  consignee: string;
  relatedInvoice: string;
  items: PackingListItem[];
  notes: string;
}

export type PdfTemplate = "modern" | "professional" | "minimal";
