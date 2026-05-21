<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0ea5e9,100:6366f1&height=200&section=header&text=SportVerse&fontSize=70&fontColor=ffffff&fontAlignY=38&desc=Book%20your%20game.%20Own%20your%20space.&descAlignY=58&descSize=18&animation=fadeIn" width="100%"/>

<br/>

[![Live](https://img.shields.io/badge/▶%20Live%20Demo-sport--verse--client.vercel.app-0ea5e9?style=for-the-badge&logoColor=white)](https://sport-verse-client.vercel.app/)
&nbsp;
[![Repo](https://img.shields.io/badge/⭐%20GitHub-sahidul--dev--47-181717?style=for-the-badge&logo=github)](https://github.com/sahidul-dev-47/SportVerse-client)
&nbsp;
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

<br/>

> *A full-stack sports facility platform where owners list their venues and athletes book their next game — fast, secure, and beautifully built.*

<br/>

</div>

---

## 💡 Why SportVerse Exists

Finding and booking a sports facility in Bangladesh is still largely offline — WhatsApp messages, phone calls, guesswork about availability. **SportVerse was built to fix that.**

The idea is simple: give facility owners a clean dashboard to list their venues, set time slots, and manage bookings — and give players a single place to discover, book, and track their sessions. No middlemen. No calls. Just book and play.

This project was also a personal challenge — to build a production-grade, authenticated, full-stack application from scratch using modern tools like **Next.js App Router**, **Better Auth with JWT**, **Express.js**, and **MongoDB**, all deployed and live on Vercel.

---

## 🌟 What Makes It Different

```
Most booking apps are for hotels or rides.
SportVerse is specifically designed for sports venues —
with time slot logic, owner-level access control,
and a UI that feels fast and premium.
```

- ⚡ **Real ownership model** — only the facility owner can edit or delete their venue
- 🔐 **JWT-secured API** — every sensitive action is token-verified on the backend
- 🎨 **Framer Motion UI** — smooth step animations, not just a boring form
- 🌙 **Dark-first design** — built for athletes who train at night

---

## ✨ Feature Breakdown

<details>
<summary><b>🔐 Authentication System</b></summary>
<br/>

- Email & Password registration and login
- **Google OAuth** one-click sign in
- JWT tokens via Better Auth's JWT plugin
- Secure HTTP-only cookies with `cookieCache`
- JWKS-based token verification on the Express backend
- Auto session restoration on page reload

</details>

<details>
<summary><b>🏟️ Facility Listing (Owner Flow)</b></summary>
<br/>

- **4-step animated form** — Basic Info → Details → Time Slots → Review
- 12 facility categories: Football, Cricket, Basketball, Swimming, Tennis, Badminton, Gym, Yoga, Boxing, Indoor Stadium, Rooftop Turf, Other
- Live image URL preview before submission
- Owner email auto-filled from active session (read-only)
- Framer Motion step transitions with progress indicator

</details>

<details>
<summary><b>⚙️ Manage Facilities (Owner Dashboard)</b></summary>
<br/>

- View all facilities owned by the logged-in user
- **Edit** any facility detail inline
- **Delete** facility with backend ownership check
- `ownerEmail` verified on every mutating request — no spoofing possible

</details>

<details>
<summary><b>📅 Booking System (User Flow)</b></summary>
<br/>

- Browse all listed sports facilities
- Select available time slots per booking
- **My Bookings** section — full booking history
- Cancel bookings with immediate UI feedback
- Bookings sorted by newest first

</details>

<details>
<summary><b>🎨 UI / UX</b></summary>
<br/>

- Glassmorphism dark theme (`bg-gray-950` base)
- Animated grid background + soft glow blobs
- Profile dropdown with quick nav links
- React Hot Toast notifications for all actions
- Fully responsive — mobile to widescreen
- Step progress dots + connector lines

</details>

---

## 🛠️ Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│  Next.js 15 (App Router)   •   React   •   JavaScript  │
│  Tailwind CSS   •   HTML   •   Framer Motion            │
│  React Icons   •   React Hot Toast                      │
├─────────────────────────────────────────────────────────┤
│                    AUTHENTICATION                       │
│  Better Auth   •   JWT Plugin   •   Google OAuth        │
│  JWKS Token Verification   •   jwtClient (frontend)     │
├─────────────────────────────────────────────────────────┤
│                      BACKEND                            │
│  Node.js   •   Express.js   •   REST API               │
│  jose-cjs (JWT verify)   •   CORS   •   dotenv         │
├─────────────────────────────────────────────────────────┤
│                     DATABASE                            │
│  MongoDB Atlas   •   MongoDB Node Driver                │
│  Collections: facilities • bookings • users • jwks      │
├─────────────────────────────────────────────────────────┤
│                    DEPLOYMENT                           │
│  Vercel (Client + Server)   •   Environment Variables   │
└─────────────────────────────────────────────────────────┘
```

---

## 🗂️ Project Structure

```
SportVerse-client/
│
├── 📁 app/
│   ├── 📁 (auth)/
│   │   ├── login/page.jsx              # Email + Google login
│   │   └── register/page.jsx          # New user registration
│   │
│   ├── 📁 api/auth/[...all]/
│   │   └── route.ts                   # Better Auth Next.js handler
│   │
│   ├── 📁 dashboard/
│   │   ├── add-facilities/page.jsx    # 4-step facility form
│   │   ├── manage-facilities/page.jsx # Owner: edit + delete
│   │   └── my-bookings/page.jsx       # User: view + cancel
│   │
│   ├── 📁 facilities/
│   │   ├── page.jsx                   # All facilities browse
│   │   └── [id]/page.jsx              # Detail + book a slot
│   │
│   └── page.jsx                       # Landing + featured venues
│
├── 📁 components/
│   └── Navbar.jsx                     # Nav + profile dropdown
│
├── 📁 lib/
│   ├── auth.ts                        # Server: Better Auth config + JWT plugin
│   └── auth-client.ts                 # Client: authClient + jwtClient
│
└── .env.local

SportVerse-server/
└── index.js                           # Express app + all API routes
```

---

## 🔐 Security Architecture

```
                    CLIENT
                      │
              Bearer JWT Token
                      │
                   SERVER
                      │
            ┌─────────▼──────────┐
            │   verifyToken()    │
            │  middleware runs   │
            └─────────┬──────────┘
                      │
           Fetch JWKS from Better Auth
           /api/auth/jwks endpoint
                      │
            ┌─────────▼──────────┐
            │  jwtVerify(token,  │
            │    JWKS)           │
            │                    │
            │  req.userEmail =   │
            │  payload.email     │
            └─────────┬──────────┘
                      │
         Compare req.userEmail vs
         body.ownerEmail / body.userEmail
                      │
              ✅ Match → Proceed
              ❌ Mismatch → 403 Forbidden
```

---

## 🌐 API Reference

### 🏟️ Facilities

| Method | Route | Auth | Who Can Call |
|:---:|:---|:---:|:---|
| `GET` | `/facilities` | ❌ | Anyone — filter by `?ownerEmail=` |
| `GET` | `/featured` | ❌ | Anyone — returns top 6 |
| `GET` | `/facilities/:id` | ✅ | Authenticated users |
| `POST` | `/facilities` | ✅ | Owners — adds new venue |
| `PATCH` | `/facilities/:id` | ✅ | Owner only — updates venue |
| `DELETE` | `/facilities/:id` | ✅ | Owner only — removes venue |

### 📅 Bookings

| Method | Route | Auth | Who Can Call |
|:---:|:---|:---:|:---|
| `POST` | `/bookings` | ✅ | Authenticated users |
| `GET` | `/bookings?userEmail=` | ✅ | User — own bookings only |
| `DELETE` | `/bookings/:id` | ✅ | User — own bookings only |

---

## ⚙️ Local Setup

### 1. Clone

```bash
git clone https://github.com/sahidul-dev-47/SportVerse-client.git
cd SportVerse-client
npm install
```

### 2. Environment Variables

**`.env.local` (client)**
```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

**`lib/auth.ts` needs:**
```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/
CLIENT_ID=your_google_oauth_client_id
CLIENT_SECRET=your_google_oauth_client_secret
```

**Server `.env`**
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/
BETTER_AUTH_URL=http://localhost:3000
```

### 3. Run

```bash
# Terminal 1 — Backend
cd SportVerse-server
node index.js
# → Server running on port 5000

# Terminal 2 — Frontend
cd SportVerse-client
npm run dev
# → http://localhost:3000
```

---

## 🚀 Deployment — Vercel

Both client and server are deployed on **Vercel**.

1. Push your repo to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add all environment variables in **Project Settings → Environment Variables**
4. Deploy — Vercel handles the rest

**Live:** 🔗 [sport-verse-client.vercel.app](https://sport-verse-client.vercel.app/)

---

## 🗺️ Pages Overview

| Route | Page | Access |
|:---|:---|:---:|
| `/` | Landing + Featured Facilities | Public |
| `/login` | Email & Google Sign In | Public |
| `/register` | Create Account | Public |
| `/facilities` | Browse All Venues | Public |
| `/facilities/:id` | Facility Detail + Book | 🔐 Auth |
| `/dashboard/add-facilities` | 4-Step Facility Form | 🔐 Owner |
| `/dashboard/manage-facilities` | Edit / Delete Venues | 🔐 Owner |
| `/dashboard/my-bookings` | View & Cancel Bookings | 🔐 User |

---

## 🧠 Lessons Learned

Building SportVerse taught real-world lessons that tutorials skip:

- **Better Auth's JWT plugin** requires careful setup — `getToken()` only works when the route handler is correctly wired via `toNextJsHandler`
- **CORS + credentials** must be configured on both client (`credentials: "include"`) and server (`credentials: true`) for cookie auth to work cross-origin
- **Ownership verification** on every mutating backend route is non-negotiable — comparing `req.userEmail` from the verified JWT against the request body prevents privilege escalation
- **Framer Motion's `AnimatePresence`** with `mode="wait"` is the key to smooth multi-step form transitions

---

<div align="center">

## 👨‍💻 Developer

**Sahidul Islam**

[![GitHub](https://img.shields.io/badge/GitHub-@sahidul--dev--47-181717?style=flat-square&logo=github)](https://github.com/sahidul-dev-47)

<br/>

*"Built this to learn. Shipped this to prove it."*

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6366f1,100:0ea5e9&height=100&section=footer" width="100%"/>

</div>
