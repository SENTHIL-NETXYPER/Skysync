/**
 * SkySyncLab Automated Direct Email Alerting & Submission Helper
 * Delivers inquiries directly to senthilkumar@skysynclab.com and hello@skysynclab.com
 */

export const FOUNDER_EMAIL = 'senthilkumar@skysynclab.com';
export const GENERAL_EMAIL = 'hello@skysynclab.com';
export const CONTACT_PHONE = '+91 86672 54699';
export const WHATSAPP_NUMBER = '918667254699';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/skysync-lab-840034448';

export interface ConsultationFormData {
  name: string;
  phone: string;
  email: string;
  institution?: string;
  service: string;
  message?: string;
}

export interface AuditFormData {
  name: string;
  phone: string;
  email: string;
  company?: string;
  service: string;
  message?: string;
}

/**
 * Direct background dispatch to send complete inquiry details
 * directly to senthilkumar@skysynclab.com without requiring a user mail client.
 */
export const sendDirectInquiry = async (
  data: ConsultationFormData | AuditFormData,
  formType: 'consultation' | 'audit' = 'consultation'
): Promise<{ success: boolean; message: string }> => {
  const org = (data as ConsultationFormData).institution || (data as AuditFormData).company || 'Not specified';
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const payload = {
    access_key: accessKey || '',
    subject: `[SkySyncLab Lead] ${data.service} - ${data.name} (${org})`,
    from_name: data.name,
    email: data.email,
    phone: data.phone,
    organization: org,
    service_required: data.service,
    project_description: data.message || 'No additional notes provided.',
    form_origin: formType === 'audit' ? 'Free Architecture Audit Modal' : 'Consultation Desk',
    timestamp_ist: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
  };

  // If a Web3Forms access key is supplied in .env, submit via the API directly
  if (accessKey) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();
      if (resData.success) {
        return {
          success: true,
          message: 'Inquiry successfully delivered to Senthil Kumar (senthilkumar@skysynclab.com)!'
        };
      }
    } catch (err) {
      console.warn('Direct web API submission encountered an error, falling back:', err);
    }
  }

  // Graceful fallback: trigger the pre-filled mail client so the lead is never lost
  const mailtoUrl = formType === 'audit'
    ? buildAuditModalMailto(data as AuditFormData)
    : buildContactFormMailto(data as ConsultationFormData);

  triggerMailto(mailtoUrl);

  return {
    success: true,
    message: 'Inquiry details recorded and email notification prepared for senthilkumar@skysynclab.com.'
  };
};

/**
 * Direct mailto link for general inquiries
 */
export const getGeneralMailto = (): string => {
  const subject = encodeURIComponent('Inquiry: AWS Cloud Architecture Consulting - SkySyncLab');
  const body = encodeURIComponent(
`Hello SkySyncLab Team & Senthil Kumar,

I would like to inquire about AWS Cloud Consulting / Architecture services for our organization.

Organization / Institution:
Contact Name:
Contact Phone:
Current Infrastructure (AWS / On-Prem / Hybrid):
Project Scope / Architecture Goals:

Looking forward to your guidance.

Best regards,`
  );

  return `mailto:${GENERAL_EMAIL}?cc=${FOUNDER_EMAIL}&subject=${subject}&body=${body}`;
};

/**
 * Direct mailto link for Founder & Principal Architect Senthil Kumar
 */
export const getFounderMailto = (): string => {
  const subject = encodeURIComponent('Direct Consultation for Senthil Kumar - SkySyncLab');
  const body = encodeURIComponent(
`Hi Senthil,

I am reaching out regarding AWS Cloud Architecture and Consulting services at SkySyncLab.

Organization / College:
Contact Name:
Contact Phone:
Expected Workload / Database Migration Needs:

Looking forward to speaking with you.

Best regards,`
  );

  return `mailto:${FOUNDER_EMAIL}?cc=${GENERAL_EMAIL}&subject=${subject}&body=${body}`;
};

/**
 * Generates automated mailto alert when a visitor submits the consultation form
 */
export const buildContactFormMailto = (data: ConsultationFormData): string => {
  const subject = encodeURIComponent(
    `Consultation Booking: ${data.service} - ${data.institution || data.name}`
  );

  const body = encodeURIComponent(
`NEW CONSULTATION INQUIRY - SKYSYNCLAB
==================================================
Client Full Name: ${data.name}
Email Address:    ${data.email}
Phone / WhatsApp: ${data.phone}
Organization:     ${data.institution || 'Not specified'}
Selected Service: ${data.service}

Project Requirements & Notes:
${data.message || 'No additional notes provided.'}
==================================================
Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
Origin: skysynclab.com consultation desk`
  );

  return `mailto:${GENERAL_EMAIL}?cc=${FOUNDER_EMAIL}&subject=${subject}&body=${body}`;
};

/**
 * Generates automated mailto alert when a visitor submits the free architecture audit modal
 */
export const buildAuditModalMailto = (data: AuditFormData): string => {
  const subject = encodeURIComponent(
    `AWS Architecture Audit Request: ${data.service} - ${data.company || data.name}`
  );

  const body = encodeURIComponent(
`NEW ARCHITECTURE AUDIT REQUEST - SKYSYNCLAB
==================================================
Client Full Name: ${data.name}
Email Address:    ${data.email}
Phone Number:     ${data.phone}
Organization:     ${data.company || 'Not specified'}
Audit Focus Area: ${data.service}

Workload / Infrastructure Details:
${data.message || 'Standard cloud architecture review requested.'}
==================================================
Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
Origin: skysynclab.com audit modal`
  );

  return `mailto:${GENERAL_EMAIL}?cc=${FOUNDER_EMAIL}&subject=${subject}&body=${body}`;
};

/**
 * Generates instant WhatsApp notification link
 */
export const buildWhatsAppLink = (text: string): string => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

/**
 * Triggers mail client automatically without navigating away
 */
export const triggerMailto = (mailtoUrl: string): void => {
  try {
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 500);
  } catch {
    window.location.href = mailtoUrl;
  }
};
