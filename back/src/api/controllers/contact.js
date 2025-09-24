const transporter = require("../../config/nodemailer");

const sendContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  try {
    await transporter.verify();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Consulta de ${name}`,
      text: message,
      html: `<p>${message}</p><p>De: ${name} (${email})</p>`,
    });

    res.json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.status(500).json({ error: "No se pudo enviar el correo" });
  }
};

module.exports = { sendContact };