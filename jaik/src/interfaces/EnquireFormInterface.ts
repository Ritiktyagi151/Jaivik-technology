export interface AdminEnquiryInterface {
  id: string;
  fname: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  city?: string;
  state?: string;
  preferredDate?: string;
  preferredTime?: string;
  location?: string;
  preferredMode?: string;
  sourcePage?: string;
  meeting?: {
    meetLink?: string;
  };
  createdAt: Date;
  status: "pending" | "reviewed" | "resolved";
  notes?: string;
}

export interface EnquireFormInterface {
  fname: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  city?: string;
  state?: string;
  preferredDate: string;
  preferredTime: string;
  preferredMode: string;
  location?: string;
  sourcePage?: string;
}
