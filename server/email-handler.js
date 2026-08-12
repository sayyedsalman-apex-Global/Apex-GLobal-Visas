const ADMIN_EMAIL = 'sayyedsalman@apexglobalvisas.com';
const SENDER = 'Apex Visas <onboarding@resend.dev>';

const getHtmlWrapper = (title, contentHtml) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      background-color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #ffffff;
      padding: 30px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      padding: 30px 25px;
      text-align: center;
    }
    .header .logo {
      font-size: 22px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 1px;
      margin: 0 0 5px 0;
      text-transform: uppercase;
    }
    .header .subtitle {
      font-size: 13px;
      color: #e0f2fe;
      font-weight: 600;
      letter-spacing: 2px;
      margin: 0;
      text-transform: uppercase;
    }
    .content {
      padding: 35px 30px;
    }
    .content h2 {
      margin-top: 0;
      color: #0f172a;
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    .content h3 {
      color: #0f172a;
      font-size: 16px;
      font-weight: 700;
      margin-top: 25px;
      margin-bottom: 12px;
    }
    .card {
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 25px;
    }
    .grid-row {
      margin-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 8px;
    }
    .grid-row:last-child {
      margin-bottom: 0;
      border-bottom: none;
      padding-bottom: 0;
    }
    .label {
      font-size: 11px;
      color: #475569;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
    }
    .value {
      font-size: 14px;
      color: #0f172a;
      font-weight: 500;
    }
    .highlight-value {
      font-size: 15px;
      color: #1e3a8a;
      font-weight: 600;
    }
    .footer {
      background-color: #f8fafc;
      padding: 25px;
      text-align: center;
      border-top: 1px solid #cbd5e1;
    }
    .footer p {
      margin: 0 0 8px 0;
      font-size: 12px;
      color: #475569;
    }
    .footer a {
      color: #1e3a8a;
      text-decoration: none;
      font-weight: 650;
    }
    .button-container {
      text-align: center;
      margin-top: 25px;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #1e3a8a;
      color: #ffffff !important;
      font-weight: 700;
      font-size: 14px;
      text-decoration: none;
      border-radius: 6px;
    }
    .btn-approve {
      display: inline-block;
      padding: 10px 18px;
      background-color: #10b981;
      color: #ffffff !important;
      font-weight: 700;
      font-size: 13px;
      text-decoration: none;
      border-radius: 6px;
      margin-right: 10px;
    }
    .btn-reject {
      display: inline-block;
      padding: 10px 18px;
      background-color: #ef4444;
      color: #ffffff !important;
      font-weight: 700;
      font-size: 13px;
      text-decoration: none;
      border-radius: 6px;
    }
    .otp-code {
      font-size: 36px;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 6px;
      text-align: center;
      padding: 15px;
      background-color: #f8fafc;
      border: 2px dashed #1e3a8a;
      border-radius: 8px;
      margin: 25px 0;
    }
    .star {
      color: #d97706;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo">Apex Global Visas</div>
        <div class="subtitle">Official Communication Hub</div>
      </div>
      <div class="content">
        ${contentHtml}
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Apex Global Visas. All rights reserved.</p>
        <p>Ghatkopar West, Mumbai, India | ${ADMIN_EMAIL}</p>
      </div>
    </div>
  </div>
</body>
</html>
`;


async function sendResendEmail({ apiKey, from, to, subject, html, reply_to }) {
  if (!apiKey) {
    throw new Error('Resend API key is missing or undefined.');
  }

  const emailBody = {
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html
  };

  if (reply_to) {
    emailBody.reply_to = reply_to;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailBody)
  });

  const responseText = await response.text();
  let responseData;
  try {
    responseData = JSON.parse(responseText);
  } catch {
    responseData = { text: responseText };
  }

  if (!response.ok) {
    throw new Error(responseData.message || responseData.error || responseData.text || 'Failed to dispatch request to Resend API.');
  }

  return responseData;
}

export async function handleEmailRequest(payload, apiKey) {
  const { action, data } = payload || {};

  if (!action) {
    return { status: 400, data: { success: false, error: 'Action parameter is required.' } };
  }

  try {
    switch (action) {




      case 'assessment': {
        const { fullName, email, phone, country, requirements } = data || {};
        
        // Scan notes for keywords
        const docKeywords = ['passport', 'resume', 'cv', 'ielts', 'transcript', 'degree', 'diploma', 'certificate', 'work', 'experience', 'id'];
        const mentionedDocs = [];
        const notesLower = (requirements || '').toLowerCase();
        docKeywords.forEach(kw => {
          if (notesLower.includes(kw)) {
            mentionedDocs.push(kw.charAt(0).toUpperCase() + kw.slice(1));
          }
        });
        const docsText = mentionedDocs.length > 0 
          ? mentionedDocs.join(', ') + ' (automatically identified from notes)' 
          : 'None explicitly mentioned. Please refer to details below.';

        // Send notification email to admin
        const adminHtml = getHtmlWrapper(
          'New Lead Profile Assessment',
          `
          <h2>New Lead Profile Assessment</h2>
          <p>A user has submitted their details for an initial visa file assessment. Details are summarized below:</p>
          
          <div class="card">
            <div class="grid-row">
              <div class="label">Lead Name</div>
              <div class="value">${fullName}</div>
            </div>
            <div class="grid-row">
              <div class="label">Email Address</div>
              <div class="value">${email}</div>
            </div>
            <div class="grid-row">
              <div class="label">Phone Number</div>
              <div class="value">${phone}</div>
            </div>
            <div class="grid-row">
              <div class="label">Target Destination</div>
              <div class="value highlight-value">${country}</div>
            </div>
            <div class="grid-row">
              <div class="label">Documents Mentioned</div>
              <div class="value" style="color: #d97706; font-weight: 600;">${docsText}</div>
            </div>
            <div class="grid-row" style="border-bottom: none; padding-bottom: 0; margin-bottom: 0;">
              <div class="label">Lead Requirements / Notes</div>
              <div class="value" style="background-color: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 5px; border: 1px solid #cbd5e1; color: #0f172a;">
                ${requirements || 'No details provided'}
              </div>
            </div>
          </div>
          
          <p>Please audit this profile and assign a certified consultant within the standard 1-hour window.</p>
          `
        );

        const resendRes = await sendResendEmail({
          apiKey,
          from: SENDER,
          to: ADMIN_EMAIL,
          subject: '[FILE ASSESSMENT] New Lead Request',
          html: adminHtml,
          reply_to: email || ADMIN_EMAIL
        });

        return { status: 200, data: { success: true, messageId: resendRes.id } };
      }

      default: {
        return { status: 400, data: { success: false, error: `Action '${action}' is not supported.` } };
      }
    }
  } catch (error) {
    return { status: 500, data: { success: false, error: error.message } };
  }
}
