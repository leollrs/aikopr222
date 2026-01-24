import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const { formData, lang } = await req.json();

    if (!formData || !formData.fullName || !formData.email || !formData.phone) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const isEs = lang === 'es';

    // Build email content
    const safetyItems = [];
    if (formData.pregnancy) safetyItems.push(isEs ? "Embarazo o lactancia" : "Pregnancy or breastfeeding");
    if (formData.activeIrritation) safetyItems.push(isEs ? "Irritación activa" : "Active irritation");
    if (formData.recentSunExposure) safetyItems.push(isEs ? "Exposición solar reciente" : "Recent sun exposure");
    if (formData.sensitiveSkin) safetyItems.push(isEs ? "Piel sensible" : "Sensitive skin");
    if (formData.scarringTendency) safetyItems.push(isEs ? "Cicatrización anormal" : "Scarring tendency");

    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #2A1E1A;">
        <h2 style="color: #C9AE7E; border-bottom: 2px solid #F1E8DD; padding-bottom: 10px;">
          ${isEs ? 'Nueva Evaluación Previa' : 'New Pre-Appointment Intake'}
        </h2>
        
        <h3 style="color: #6B5A52; margin-top: 30px;">${isEs ? 'Información Básica' : 'Basic Information'}</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;"><strong>${isEs ? 'Nombre:' : 'Name:'}</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;">${formData.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;"><strong>${isEs ? 'Teléfono:' : 'Phone:'}</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;">${formData.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;"><strong>Email:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;">${formData.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;"><strong>${isEs ? 'Servicio:' : 'Service:'}</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;">${formData.serviceName || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;"><strong>${isEs ? 'Fecha:' : 'Date:'}</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;">${formData.appointmentDate || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;"><strong>${isEs ? 'Hora:' : 'Time:'}</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;">${formData.appointmentTime || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;"><strong>${isEs ? 'Tipo:' : 'Type:'}</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;">
              ${formData.serviceType === 'home' ? (isEs ? 'A domicilio' : 'Home service') : (isEs ? 'En cabina' : 'In clinic')}
            </td>
          </tr>
          ${formData.serviceType === 'home' && formData.address ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;"><strong>${isEs ? 'Dirección:' : 'Address:'}</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;">${formData.address}</td>
          </tr>
          ` : ''}
        </table>

        <h3 style="color: #6B5A52; margin-top: 30px;">${isEs ? 'Contexto del Cliente' : 'Client Context'}</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;"><strong>${isEs ? 'Primera visita:' : 'First visit:'}</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;">
              ${formData.isFirstVisit === 'yes' ? (isEs ? 'Sí' : 'Yes') : formData.isFirstVisit === 'no' ? 'No' : 'N/A'}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD; vertical-align: top;"><strong>${isEs ? 'Objetivo:' : 'Goal:'}</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;">${formData.mainGoal || 'N/A'}</td>
          </tr>
        </table>

        ${formData.photos && formData.photos.length > 0 ? `
        <h3 style="color: #6B5A52; margin-top: 30px;">${isEs ? 'Fotos' : 'Photos'}</h3>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          ${formData.photos.map(url => `<a href="${url}" style="color: #C39A8B;">Ver foto</a>`).join('<br>')}
        </div>
        ` : ''}

        <h3 style="color: #6B5A52; margin-top: 30px;">${isEs ? 'Evaluación Estética' : 'Esthetic Screening'}</h3>
        ${safetyItems.length > 0 ? `
        <ul style="padding-left: 20px;">
          ${safetyItems.map(item => `<li style="padding: 5px 0;">${item}</li>`).join('')}
        </ul>
        ` : `<p>${isEs ? 'Ninguna condición reportada' : 'No conditions reported'}</p>`}

        <h3 style="color: #6B5A52; margin-top: 30px;">${isEs ? 'Adicional' : 'Additional'}</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;"><strong>${isEs ? 'Método de contacto:' : 'Contact method:'}</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;">${formData.contactMethod}</td>
          </tr>
          ${formData.additionalNotes ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD; vertical-align: top;"><strong>${isEs ? 'Notas:' : 'Notes:'}</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #F1E8DD;">${formData.additionalNotes}</td>
          </tr>
          ` : ''}
        </table>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #F1E8DD; text-align: center; color: #8B7468; font-size: 12px;">
          AIKOPR222 • ${isEs ? 'Evaluación estética' : 'Esthetic evaluation'}
        </div>
      </div>
    `;

    // Send email using Core integration
    await base44.asServiceRole.integrations.Core.SendEmail({
      from_name: "AIKOPR222",
      to: "info@aikopr222.com",
      subject: isEs 
        ? `Nueva Evaluación Previa - ${formData.fullName}` 
        : `New Pre-Appointment Intake - ${formData.fullName}`,
      body: emailBody,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error('[submitIntake] error:', error);
    return Response.json({ 
      error: error.message 
    }, { status: 500 });
  }
});