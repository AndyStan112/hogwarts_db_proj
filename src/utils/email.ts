type EmailData = { to: string; subject: string; body: string };
export const sendEmail = async ({ to, subject, body }: EmailData) => {
  console.log("sent email");
};
