import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createSubscription } from '@/lib/actions/subscriptions'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const status = session?.status
  const customerEmail = session?.customer_details?.email || "your email"
  const metadata = session?.metadata
  const subsInfo = {
    email: customerEmail,
    planId: metadata.planId
  }
  // update the user table about the new plan
  const result = await createSubscription(subsInfo);
  console.log(result);

  if (status === 'open') {
    return redirect('/')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-md text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-950 border border-emerald-800/60 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-3xl">
          ✓
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">Subscription Successful!</h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We appreciate your business! A confirmation and invoice details have been sent to <span className="text-white font-medium">{customerEmail}</span>.
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <Link
            href="/dashboard"
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg inline-block transition-all text-center"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs inline-block transition-all text-center"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}