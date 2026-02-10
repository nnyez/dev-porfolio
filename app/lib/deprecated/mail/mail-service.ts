/**
 * @deprecated Este módulo está deprecado y no debe ser utilizado.
 * Las funciones aquí contenidas han sido reemplazadas por alternativas más recientes.
 * Por favor, utilizar los servicios actualizados en lugar de este módulo.
 */

'use server';
import nodemailer from 'nodemailer';

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_PORT = parseInt(process.env.SMTP_SERVER_PORT || '587');
const SMTP_SERVER_SECURE = process.env.SMTP_SERVER_SECURE === 'true';
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;

// Validar variables de entorno
function validateEmailConfig() {
  console.log('[MAIL SERVICE] Validating configuration...');
  console.log('[MAIL SERVICE] SMTP_SERVER_HOST:', SMTP_SERVER_HOST ? '✓ configured' : '✗ missing');
  console.log('[MAIL SERVICE] SMTP_SERVER_PORT:', SMTP_SERVER_PORT);
  console.log('[MAIL SERVICE] SMTP_SERVER_SECURE:', SMTP_SERVER_SECURE);
  console.log('[MAIL SERVICE] SMTP_SERVER_USERNAME:', SMTP_SERVER_USERNAME ? '✓ configured' : '✗ missing');
  console.log('[MAIL SERVICE] SMTP_SERVER_PASSWORD:', SMTP_SERVER_PASSWORD ? '✓ configured' : '✗ missing');
  console.log('[MAIL SERVICE] SITE_MAIL_RECIEVER:', SITE_MAIL_RECIEVER ? '✓ configured' : '✗ missing');
  
  const errors: string[] = [];
  if (!SMTP_SERVER_HOST) errors.push('SMTP_SERVER_HOST not configured');
  if (!SMTP_SERVER_USERNAME) errors.push('SMTP_SERVER_USERNAME not configured');
  if (!SMTP_SERVER_PASSWORD) errors.push('SMTP_SERVER_PASSWORD not configured');
  if (!SITE_MAIL_RECIEVER) errors.push('SITE_MAIL_RECIEVER not configured');

  if (errors.length > 0) {
    console.error('[MAIL SERVICE] Configuration errors:', errors);
    throw new Error(`Mail service configuration error: ${errors.join(', ')}`);
  }
  console.log('[MAIL SERVICE] Configuration validated successfully ✓');
}

const transporter = nodemailer.createTransport({
  host: SMTP_SERVER_HOST,
  port: SMTP_SERVER_PORT,
  secure: SMTP_SERVER_SECURE,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

console.log('[MAIL SERVICE] Transporter initialized with:', {
  host: SMTP_SERVER_HOST,
  port: SMTP_SERVER_PORT,
  secure: SMTP_SERVER_SECURE,
});

export async function sendMail({
  sendTo,
  subject,
  text,
  html,
}: {
  email?: string;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const recipient = sendTo || SITE_MAIL_RECIEVER;
  console.log('[MAIL SERVICE] Starting to send email...');
  console.log('[MAIL SERVICE] To:', recipient);
  console.log('[MAIL SERVICE] Subject:', subject);
  
  try {
    // Validate configuration before attempting to send
    validateEmailConfig();

    console.log('[MAIL SERVICE] Attempting to send email via SMTP...');
    const info = await transporter.sendMail({
      from: SMTP_SERVER_USERNAME,
      to: recipient,
      subject: subject,
      text: text,
      html: html || text,
    });
    
    console.log('✓ [MAIL SERVICE] Message sent successfully!');
    console.log('[MAIL SERVICE] Message ID:', info.messageId);
    console.log('[MAIL SERVICE] Response:', info.response);
    return info;
  } catch (error) {
    console.error('[MAIL SERVICE] ✗ Error sending email:', error);
    
    if (error instanceof Error) {
      console.error('[MAIL SERVICE] Error message:', error.message);
      console.error('[MAIL SERVICE] Error code:', (error as any).code);
      
      if (error.message.includes('ETIMEDOUT')) {
        console.error('[MAIL SERVICE] CAUSE: Connection timeout to SMTP server');
        throw new Error('Mail service timeout - check your network connection and SMTP server settings');
      }
      if (error.message.includes('ENOTFOUND')) {
        console.error('[MAIL SERVICE] CAUSE: SMTP host not found');
        throw new Error(`Mail SMTP host not found: ${SMTP_SERVER_HOST}`);
      }
      if (error.message.includes('Invalid login')) {
        console.error('[MAIL SERVICE] CAUSE: Invalid credentials');
        throw new Error('Invalid SMTP credentials - check SMTP_SERVER_USERNAME and SMTP_SERVER_PASSWORD');
      }
    }
    throw error;
  }
}

// Función para enviar email cuando se crea una solicitud
export async function sendNewApplicationNotification(
  programmerEmail: string,
  clientName: string,
  subject: string,
  description: string,
  date: string
) {
  console.log('[MAIL SERVICE] sendNewApplicationNotification - Notifying programmer:', programmerEmail);
  
  const html = `
    <h2>Nueva Solicitud de Servicio</h2>
    <p><strong>Cliente:</strong> ${clientName}</p>
    <p><strong>Asunto:</strong> ${subject}</p>
    <p><strong>Descripción:</strong> ${description}</p>
    <p><strong>Fecha Programada:</strong> ${date}</p>
    <p>Por favor accede a tu panel para revisar los detalles y aceptar o rechazar la solicitud.</p>
  `;
  
  try {
    const result = await sendMail({
      email: SMTP_SERVER_USERNAME || '',
      sendTo: programmerEmail,
      subject: `Nueva solicitud de servicio: ${subject}`,
      text: `Nueva solicitud de ${clientName} - ${subject}`,
      html,
    });
    console.log('[MAIL SERVICE] ✓ Notification sent to programmer successfully');
    return result;
  } catch (error) {
    console.error('[MAIL SERVICE] ✗ Failed to send notification to programmer:', error);
    throw error;
  }
}

// Función para enviar email cuando se acepta una solicitud
export async function sendApplicationAcceptedNotification(
  clientEmail: string,
  programmerName: string,
  subject: string,
  meetingLink?: string
) {
  console.log('[MAIL SERVICE] sendApplicationAcceptedNotification - Notifying client:', clientEmail);
  
  const html = `
    <h2>Solicitud Aceptada</h2>
    <p><strong>Programador:</strong> ${programmerName}</p>
    <p><strong>Asunto:</strong> ${subject}</p>
    <p>¡Tu solicitud ha sido aceptada!</p>
    ${meetingLink ? `<p><strong>Enlace de reunión:</strong> <a href="${meetingLink}">${meetingLink}</a></p>` : ''}
    <p>El programador se pondrá en contacto contigo próximamente.</p>
  `;
  
  try {
    const result = await sendMail({
      email: SMTP_SERVER_USERNAME || '',
      sendTo: clientEmail,
      subject: `Solicitud aceptada: ${subject}`,
      text: `Tu solicitud ha sido aceptada por ${programmerName}`,
      html,
    });
    console.log('[MAIL SERVICE] ✓ Acceptance notification sent to client successfully');
    return result;
  } catch (error) {
    console.error('[MAIL SERVICE] ✗ Failed to send acceptance notification to client:', error);
    throw error;
  }
}

// Función para enviar email cuando se rechaza una solicitud
export async function sendApplicationRejectedNotification(
  clientEmail: string,
  programmerName: string,
  subject: string,
  reason?: string
) {
  console.log('[MAIL SERVICE] sendApplicationRejectedNotification - Notifying client:', clientEmail);
  
  const html = `
    <h2>Solicitud Rechazada</h2>
    <p><strong>Programador:</strong> ${programmerName}</p>
    <p><strong>Asunto:</strong> ${subject}</p>
    <p>Lamentablemente, tu solicitud ha sido rechazada.</p>
    ${reason ? `<p><strong>Motivo:</strong> ${reason}</p>` : ''}
    <p>Por favor, intenta con otro programador o revisa tus requisitos.</p>
  `;
  
  try {
    const result = await sendMail({
      email: SMTP_SERVER_USERNAME || '',
      sendTo: clientEmail,
      subject: `Solicitud rechazada: ${subject}`,
      text: `Tu solicitud ha sido rechazada por ${programmerName}`,
      html,
    });
    console.log('[MAIL SERVICE] ✓ Rejection notification sent to client successfully');
    return result;
  } catch (error) {
    console.error('[MAIL SERVICE] ✗ Failed to send rejection notification to client:', error);
    throw error;
  }
}
