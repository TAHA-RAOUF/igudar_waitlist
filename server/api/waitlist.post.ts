export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required field: email.'
    })
  }

  const config = useRuntimeConfig()
  const apiKey = config.resendApiKey
  const fromEmail = config.resendFromEmail
  const toEmail = config.resendToEmail

  if (!apiKey || !fromEmail || !toEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Resend is not configured.'
    })
  }

  await $fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: {
      from: fromEmail,
      to: toEmail,
      subject: `New waitlist signup: ${email}`,
      html: `
        <h2>New waitlist signup</h2>
        <p><strong>Email:</strong> ${email}</p>
      `
    }
  })

  return { ok: true }
})
