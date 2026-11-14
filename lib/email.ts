export type ContactEnquiry = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[c];
  });
}

// Table-based, inline-styled HTML so the enquiry looks branded and tidy in any
// inbox (Gmail, Outlook, Apple Mail).
export function buildEnquiryHtml(data: ContactEnquiry): string {
  const message = escapeHtml(data.message).replace(/\r?\n/g, "<br />");
  return `<!doctype html>
<html>
  <body style="margin:0;background:#f5f1e8;padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e9e2d3;">
      <tr>
        <td style="background:#0d0c0b;padding:26px 32px;">
          <p style="margin:0;color:#f5f1e8;font-size:17px;letter-spacing:1px;font-weight:700;">PIUS &amp; NOBLE LP</p>
          <p style="margin:5px 0 0;color:#f0a53a;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Legal Practitioners &middot; Abuja</p>
        </td>
      </tr>
      <tr>
        <td style="padding:32px;">
          <p style="margin:0 0 6px;color:#c9821c;font-size:12px;letter-spacing:2px;text-transform:uppercase;">New website enquiry</p>
          <h1 style="margin:0 0 22px;color:#0d0c0b;font-size:22px;line-height:1.3;font-weight:700;">${escapeHtml(data.name)}</h1>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#3b3833;">
            <tr>
              <td style="padding:10px 0;border-top:1px solid #eee;width:90px;color:#8a8377;">Email</td>
              <td style="padding:10px 0;border-top:1px solid #eee;">
                <a href="mailto:${escapeHtml(data.email)}" style="color:#c9821c;text-decoration:none;">${escapeHtml(data.email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-top:1px solid #eee;color:#8a8377;">Phone</td>
              <td style="padding:10px 0;border-top:1px solid #eee;">${escapeHtml(data.phone || "Not provided")}</td>
            </tr>
          </table>
          <p style="margin:26px 0 8px;color:#8a8377;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Message</p>
          <div style="padding:18px 20px;background:#f5f1e8;border-left:3px solid #f0a53a;color:#3b3833;font-size:15px;line-height:1.65;">
            ${message}
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:18px 32px;border-top:1px solid #e9e2d3;font-size:12px;color:#8a8377;">
          Sent from the Pius &amp; Noble LP website contact form. Reply to this email to respond directly.
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildEnquiryText(data: ContactEnquiry): string {
  return [
    "New website enquiry",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    "",
    "Message:",
    data.message,
    "",
    "— Sent from the Pius & Noble LP website contact form.",
  ].join("\n");
}
