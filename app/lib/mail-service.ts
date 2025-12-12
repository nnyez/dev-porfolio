'use server';
import nodemailer from 'nodemailer';
const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_PORT = parseInt(process.env.SMTP_SERVER_PORT || '587');
const SMTP_SERVER_SECURE = process.env.SMTP_SERVER_SECURE === 'true';
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: SMTP_SERVER_HOST,
  port: SMTP_SERVER_PORT,
  secure: SMTP_SERVER_SECURE,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
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
  try {
    const isVerified = await transporter.verify();
    console.log('Mail server verified:', isVerified);
  } catch (error) {
    console.error('Mail verification failed:', SMTP_SERVER_USERNAME, error);
    throw new Error('Mail service configuration error');
  }
  
  try {
    const info = await transporter.sendMail({
      from: SMTP_SERVER_USERNAME,
      to: sendTo || SITE_MAIL_RECIEVER,
      subject: subject,
      text: text,
      html: html || text,
    });
    console.log('Message Sent:', info.messageId);
    console.log('Mail sent to:', sendTo || SITE_MAIL_RECIEVER);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
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
  const html = `
    <h2>Nueva Solicitud de Servicio</h2>
    <p><strong>Cliente:</strong> ${clientName}</p>
    <p><strong>Asunto:</strong> ${subject}</p>
    <p><strong>Descripción:</strong> ${description}</p>
    <p><strong>Fecha Programada:</strong> ${date}</p>
    <p>Por favor accede a tu panel para revisar los detalles y aceptar o rechazar la solicitud.</p>
  `;
  
  return sendMail({
    email: SMTP_SERVER_USERNAME || '',
    sendTo: programmerEmail,
    subject: `Nueva solicitud de servicio: ${subject}`,
    text: `Nueva solicitud de ${clientName} - ${subject}`,
    html,
  });
}

// Función para enviar email cuando se acepta una solicitud
export async function sendApplicationAcceptedNotification(
  clientEmail: string,
  programmerName: string,
  subject: string,
  meetingLink?: string
) {
  const html = `
    <h2>Solicitud Aceptada</h2>
    <p><strong>Programador:</strong> ${programmerName}</p>
    <p><strong>Asunto:</strong> ${subject}</p>
    <p>¡Tu solicitud ha sido aceptada!</p>
    ${meetingLink ? `<p><strong>Enlace de reunión:</strong> <a href="${meetingLink}">${meetingLink}</a></p>` : ''}
    <p>El programador se pondrá en contacto contigo próximamente.</p>
  `;
  
  return sendMail({
    email: SMTP_SERVER_USERNAME || '',
    sendTo: clientEmail,
    subject: `Solicitud aceptada: ${subject}`,
    text: `Tu solicitud ha sido aceptada por ${programmerName}`,
    html,
  });
}

// Función para enviar email cuando se rechaza una solicitud
export async function sendApplicationRejectedNotification(
  clientEmail: string,
  programmerName: string,
  subject: string,
  reason?: string
) {
  const html = `
    <h2>Solicitud Rechazada</h2>
    <p><strong>Programador:</strong> ${programmerName}</p>
    <p><strong>Asunto:</strong> ${subject}</p>
    <p>Lamentablemente, tu solicitud ha sido rechazada.</p>
    ${reason ? `<p><strong>Motivo:</strong> ${reason}</p>` : ''}
    <p>Por favor, intenta con otro programador o revisa tus requisitos.</p>
  `;
  
  return sendMail({
    email: SMTP_SERVER_USERNAME || '',
    sendTo: clientEmail,
    subject: `Solicitud rechazada: ${subject}`,
    text: `Tu solicitud ha sido rechazada por ${programmerName}`,
    html,
  });
}
