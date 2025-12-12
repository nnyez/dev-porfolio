'use server';

import {
  sendNewApplicationNotification,
  sendApplicationAcceptedNotification,
  sendApplicationRejectedNotification,
} from './mail-service';

/**
 * Envía notificación cuando se crea una nueva solicitud
 */
export async function notifyNewApplication(
  programmerEmail: string,
  clientName: string,
  subject: string,
  description: string,
  scheduledDate: number
) {
  try {
    const date = new Date(scheduledDate).toLocaleString('es-ES');
    await sendNewApplicationNotification(
      programmerEmail,
      clientName,
      subject,
      description,
      date
    );
    return { success: true, message: 'Notificación enviada al programador' };
  } catch (error) {
    console.error('Error notifying new application:', error);
    return { success: false, message: 'Error al enviar notificación' };
  }
}

/**
 * Envía notificación cuando se acepta una solicitud
 */
export async function notifyApplicationAccepted(
  clientEmail: string,
  programmerName: string,
  subject: string,
  meetingLink?: string
) {
  try {
    await sendApplicationAcceptedNotification(
      clientEmail,
      programmerName,
      subject,
      meetingLink
    );
    return { success: true, message: 'Notificación de aceptación enviada' };
  } catch (error) {
    console.error('Error notifying application accepted:', error);
    return { success: false, message: 'Error al enviar notificación de aceptación' };
  }
}

/**
 * Envía notificación cuando se rechaza una solicitud
 */
export async function notifyApplicationRejected(
  clientEmail: string,
  programmerName: string,
  subject: string,
  reason?: string
) {
  try {
    await sendApplicationRejectedNotification(
      clientEmail,
      programmerName,
      subject,
      reason
    );
    return { success: true, message: 'Notificación de rechazo enviada' };
  } catch (error) {
    console.error('Error notifying application rejected:', error);
    return { success: false, message: 'Error al enviar notificación de rechazo' };
  }
}
