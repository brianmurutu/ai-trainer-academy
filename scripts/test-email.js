const { Resend } = require('resend');
const r = new Resend('re_MsGeooKM_be7VB5STkG4BUgDTRK7QkDr1');

async function main() {
  // 1. Send a live test email
  console.log('\n=== SENDING TEST EMAIL TO brian@yagwatech.com ===');
  let emailId = null;
  try {
    const result = await r.emails.send({
      from: 'AI Trainer Academy <noreply@ai-trainer-academy.top>',
      to: 'brian@yagwatech.com',
      subject: '[AI Trainer Academy] Email Delivery Test',
      html: '<div style="font-family:sans-serif;padding:24px;max-width:500px"><h2 style="color:#0D1B2A">Email delivery test</h2><p style="color:#4A6174">If you receive this, Resend email delivery to your inbox is working correctly.</p><p style="color:#888;font-size:12px">Sent: ' + new Date().toISOString() + '</p></div>'
    });
    console.log('Send result:', JSON.stringify(result, null, 2));
    emailId = result?.data?.id;
  } catch(e) {
    console.error('Send error:', e.message);
    return;
  }

  // 2. Wait then check delivery status
  if (emailId) {
    console.log('\n=== CHECKING DELIVERY STATUS (waiting 5s) ===');
    await new Promise(res => setTimeout(res, 5000));
    try {
      const status = await r.emails.get(emailId);
      console.log('Email status:', JSON.stringify(status, null, 2));
    } catch(e) {
      console.error('Status check error:', e.message);
    }
  }

  // 3. Also test sending to murutubrian@gmail.com (admin)
  console.log('\n=== SENDING TEST EMAIL TO murutubrian@gmail.com ===');
  try {
    const result2 = await r.emails.send({
      from: 'AI Trainer Academy <noreply@ai-trainer-academy.top>',
      to: 'murutubrian@gmail.com',
      subject: '[AI Trainer Academy] Admin Email Delivery Test',
      html: '<div style="font-family:sans-serif;padding:24px"><h2>Admin test</h2><p>Domain is verified. Email delivery to Gmail is working.</p></div>'
    });
    console.log('Admin send result:', JSON.stringify(result2, null, 2));
  } catch(e) {
    console.error('Admin send error:', e.message);
  }
}

main().catch(console.error);
