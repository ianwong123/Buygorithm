

console.log('--- sendNewsletter start ---')    

const nodemailer = require('nodemailer')
const fs         = require('fs')
const path       = require('path')

async function createTestTransporter() {
  const testAccount = await nodemailer.createTestAccount()
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })
}

async function sendNewsletter() {
  const transporter = await createTestTransporter()
  const template    = fs.readFileSync(path.join(__dirname, '..', 'template.html'), 'utf8')
  const subscribers = [
    { email: 'john@example.com', name: 'John Doe' },
    { email: 'jane@example.com', name: 'Jane Smith' }
  ]

  for (const { email, name } of subscribers) {
    const html = template.replace(/{{name}}/g, name)
    const info = await transporter.sendMail({
      from: transporter.options.auth.user,
      to: email,
      subject: 'Newsletter Preview',
      html
    })
    console.log(nodemailer.getTestMessageUrl(info))
  }
}

sendNewsletter().catch(console.error)
