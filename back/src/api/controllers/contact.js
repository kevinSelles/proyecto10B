const transporter = require("../../config/nodemailer");

const sendContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  try {
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error("Error en verificación SMTP:", error);
          reject(error);
        } else {
          console.log("Servidor listo para enviar correos");
          resolve(success);
        }
      });
    });

    await new Promise((resolve, reject) => {
      transporter.sendMail(
        {
        from: process.env.EMAIL_USER,
        replyTo: email,
        to:process.env.EMAIL_USER,
        subject: `Consulta de ${name}`,
        text: message,
        html: `<p>${message}</p><p>De: ${name} (${email})</p>`
        },
        (error, info) => {
          if (error) {
            console.error("Error enviando correo:", error)
            reject(error);
          } else {
            console.log("Correo enviado:", info.response);
            resolve(info);
          }
        }
      )
    });

    res.json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.status(500).json({ error: "No se pudo enviar el correo" });
  }
};

module.exports = { sendContact };