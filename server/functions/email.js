function generateHtml(firstName, lastName, subject, message, email) {
  return `<div style="display: block"><h3>New message from ${firstName} ${lastName} (${email})</h3><h4>Subject: ${subject}</h4> <p>Message:</p><p><cite>${message}</cite></p></div>`;
}

module.exports = generateHtml;
