import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID={
    "seeker_pro":"price_1UXjy1AoEIdGIv8fpBJbPwrR",
    "seeker_premium":"price_1UXyMgAoEIdGIv8fqsOr0kwA",
    "recruiter_growth":"price_1UXyOGAoEIdGIv8fsdXPr0da",
    "recruiter_enterprise":"price_1UXyPIAoEIdGIv8fU4R2YKBk",
}