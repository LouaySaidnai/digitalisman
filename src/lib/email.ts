import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendResetEmail(to: string, resetLink: string) {
  const msg = {
    to,
    from: "testmalek2004@gmail.com",
    subject: "Réinitialisation de votre mot de passe",
    html: `
      <p>Bonjour,</p>
      <p>Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous :</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Ce lien expirera dans 1 heure.</p>
    `,
  };

  await sgMail.send(msg);
}