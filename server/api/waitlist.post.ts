import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const fullName = typeof body?.fullName === 'string' ? body.fullName.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''

  if (!fullName || !email || !interest) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields.'
    })
  }

  const config = useRuntimeConfig()
  const apiKey = config.resendApiKey
  const fromEmail = config.resendFromEmail
  const toEmail = config.resendToEmail
  const supabaseUrl = config.supabaseUrl
  const supabaseAnonKey = config.supabaseAnonKey

  if (!apiKey || !fromEmail || !toEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Resend is not configured.'
    })
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase is not configured.'
    })
  }

  const interestLabel =
    interest === 'invest_real_estate'
      ? 'Invest in real estate'
      : interest === 'need_financing'
        ? 'Get financing'
        : 'Invest in Igudar (equity)'

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false }
  })

  const { error: insertError } = await supabase.from('waitlist_entries').insert({
    full_name: fullName,
    email,
    interest
  })

  if (insertError) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save waitlist entry.'
    })
  }
  console.log("Email From:", fromEmail);
  await $fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: {
      from: fromEmail,
      to: toEmail,
      subject: `New waitlist signup: ${fullName}`,
      html: `
        <h2>New waitlist signup</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
      `
    }
  })

  return { ok: true }
})
