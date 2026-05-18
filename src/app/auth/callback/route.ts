import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  // Supabase sends ?error=... directly when the link is already used or expired
  if (error) {
    return NextResponse.redirect(`${origin}/?auth_error=link_expired`)
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    if (exchangeError) {
      return NextResponse.redirect(`${origin}/?auth_error=link_expired`)
    }
  }

  return NextResponse.redirect(`${origin}/`)
}
