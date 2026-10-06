# PRD: Fans Only Fans — eCommerce Website

## 1. Product Overview
Fans Only Fans is a demo electronics shop that sells fans — ceiling, 
standing, table, rechargeable, and industrial. Built for HNG15 Lesson 2 
to demonstrate a working eCommerce site with authentication, database 
persistence, and confirmation emails. Styled as if for a real fan 
retailer in Lagos, Nigeria.

## 2. Target User
Nigerian adults aged 25–50 in Lagos, Abuja, and Port Harcourt. Mobile-first 
users. Comfortable with online shopping and Google sign-in. They care about 
price, warranty, and delivery speed.

## 3. Core Features (Required by HNG)
- Product listing page
- Product detail page
- Add to cart
- Cart page
- Checkout page
- Google sign-in / sign-out
- Order history (survives logout and browser close)
- Confirmation email after checkout

## 4. Optional Features (Only if time allows)
- Payment via Paystack (test mode)
- Search and filter by fan type
- Admin page to add products

## 5. Tech Stack
- Frontend: Next.js 15 + TypeScript + Tailwind CSS
- Database + Auth: Supabase
- Email: Mailgun
- Hosting: Vercel
- Version control: Git + GitHub

## 6. Build Phases
1. Shop concept + PRD (this step)
2. Product/shop UI
3. Google authentication
4. Database setup
5. Cart and checkout
6. Persist orders
7. Mailgun confirmation email
8. Test auth and order persistence
9. Deploy + production environment variables
10. End-to-end production testing

## 7. Success Criteria (What HNG Will Test)
- User can sign in with Google
- User can add fans to cart and checkout
- Order appears in the Supabase database
- Confirmation email is received via Mailgun
- After logout + close + reopen + sign in, order history is still visible
- All of this works on the deployed production URL

## 8. Out of Scope
- Multi-vendor support
- Real payment processing (unless optional feature added)
- Mobile app (handled separately in Task Three)
- Inventory management beyond basic stock counts

## 9. Product List (for UI build in Step 2)
1. Ox 18" Standing Fan — ₦45,000
2. Binatone 56" Ceiling Fan — ₦38,000
3. Rechargeable Table Fan — ₦25,000
4. Industrial Wall Fan 24" — ₦60,000
5. Ox 16" Table Fan — ₦22,000
6. Century 20" Standing Fan — ₦52,000
7. Rechargeable Standing Fan — ₦55,000
8. Mini USB Desk Fan — ₦8,000
9. Ceiling Fan with Remote — ₦65,000
10. Industrial Floor Fan 30" — ₦85,000

## 10. Timeline
- Individual shop task due: Friday
- Submission form: before Friday