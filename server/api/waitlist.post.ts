import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const status = typeof body?.status === 'string' ? body.status.trim() : ''

  if (!email || !status) {
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

  const statusLabel =
    status === 'student'
      ? 'Student'
      : status === 'founder_entrepreneur'
        ? 'Founder/Entrepreneur'
        : status === 'corporate_industry_professional'
          ? 'Corporate/Industry professional'
          : status === 'investor'
            ? 'Investor'
            : status === 'family_of_team_member'
              ? 'Family of a team member'
              : 'Other'

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false }
  })

  const { error: insertError } = await supabase.from('waitlist_entries').insert({
    email,
    status
  })

  if (insertError) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save waitlist entry.'
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
        <p><strong>Status:</strong> ${statusLabel}</p>
      `
    }
  })

  await $fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: {
      from: fromEmail,
      to: email,
      subject: 'Thanks for joining the Igudar waitlist',
      html: `
        <h2>Thanks for joining Igudar</h2>
        <p>Thanks for your interest in Igudar. We received your details and will reach out soon.</p>
        <p><strong>Your selection:</strong> ${statusLabel}</p>
        <p>See you at the showcase!</p>
      `
    }
  })

  return { ok: true }
})
