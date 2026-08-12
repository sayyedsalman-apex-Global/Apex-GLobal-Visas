import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const {
      fullName,
      email,
      phone,
      country,
      requirements
    } = body;

    const html = `
      <h2>New Advisory Request Received</h2>
      <p><strong>Name:</strong> ${fullName || 'N/A'}</p>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Destination:</strong> ${country || 'N/A'}</p>
      <p><strong>Requirement Details:</strong></p>
      <p>${(requirements || 'No details provided').replace(/\n/g, '<br />')}</p>
    `;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [process.env.ADMIN_EMAIL || 'sayyedsalman@apexglobalvisas.com'],
      subject: 'New Advisory Request Received',
      html
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
