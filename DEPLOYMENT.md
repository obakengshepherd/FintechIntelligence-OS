# Fintech Intelligence OS — Setup & Deployment Guide

> Complete guide for getting your app running locally and deployed on Netlify.

---

## PART 1 — LOCAL SETUP

### Step 1: Install dependencies

Open the project folder in VS Code terminal and run:

```bash
npm install
```

This installs Next.js, Mongoose, and all other packages listed in `package.json`.

---

### Step 2: Set up MongoDB Atlas (your database)

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new **Free Cluster** (M0 tier — no cost)
3. Under **Database Access**, create a new database user:
   - Username: e.g. `fintech-admin`
   - Password: generate a secure password, save it
4. Under **Network Access**, click **Add IP Address** → choose **Allow Access from Anywhere** (0.0.0.0/0) for now
5. Under **Database** → **Connect** → **Connect your application** → copy the connection string

It will look like:
```
mongodb+srv://fintech-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

6. Replace `<password>` with your actual password and append the database name:
```
mongodb+srv://fintech-admin:yourpassword@cluster0.xxxxx.mongodb.net/fintech-intelligence-os?retryWrites=true&w=majority
```

---

### Step 3: Configure environment variables

Open `.env.local` in the project root and replace the placeholder:

```env
MONGODB_URI=mongodb+srv://fintech-admin:yourpassword@cluster0.xxxxx.mongodb.net/fintech-intelligence-os?retryWrites=true&w=majority

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> ⚠️ NEVER commit `.env.local` to git. It is already in `.gitignore`.

---

### Step 4: Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the Fintech Intelligence OS homepage.

---

### Step 5: Create your first post

1. Click **+ NEW POST** in the navigation bar
2. Fill in title, excerpt, body, category, sector, and region
3. Set status to **Published**
4. Click **+ PUBLISH REPORT**

The post will be saved to MongoDB and appear on your feed.

---

## PART 2 — DEPLOYING TO NETLIFY

Netlify supports Next.js via the `@netlify/plugin-nextjs` adapter.

---

### Step 1: Push your project to GitHub

If you haven't set up Git yet:

```bash
git init
git add .
git commit -m "Initial commit — Fintech Intelligence OS"
```

Create a new **private** repository on [https://github.com](https://github.com), then:

```bash
git remote add origin https://github.com/yourusername/fintech-intelligence-os.git
git branch -M main
git push -u origin main
```

---

### Step 2: Install the Netlify Next.js plugin

In your project, run:

```bash
npm install -D @netlify/plugin-nextjs
```

Then create a `netlify.toml` file in the project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Commit and push this:

```bash
git add .
git commit -m "Add Netlify config"
git push
```

---

### Step 3: Connect to Netlify

1. Go to [https://www.netlify.com](https://www.netlify.com) and sign up / log in
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub** and authorize Netlify
4. Select your `fintech-intelligence-os` repository
5. Netlify auto-detects Next.js. Confirm build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click **Deploy site**

---

### Step 4: Add environment variables on Netlify

After your site is created (even if the first deploy fails without the DB URI):

1. Go to **Site configuration** → **Environment variables**
2. Click **Add a variable** and add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your full MongoDB connection string |
| `NEXT_PUBLIC_SITE_URL` | Your Netlify URL e.g. `https://fintech-intelligence-os.netlify.app` |

3. After saving, go to **Deploys** → **Trigger deploy** → **Deploy site**

---

### Step 5: Set your custom domain (optional)

1. In Netlify: **Domain management** → **Add custom domain**
2. Enter your domain (e.g. `intelligence.yourdomain.com`)
3. Follow DNS configuration instructions for your registrar
4. Netlify provisions SSL automatically

---

## PART 3 — KEEPING MONGODB ATLAS SECURE FOR PRODUCTION

Once deployed, tighten your Atlas network access:

1. Go to **Network Access** in Atlas
2. Remove the `0.0.0.0/0` rule
3. Add only Netlify's outbound IP ranges, OR keep `0.0.0.0/0` if Netlify serverless functions don't have fixed IPs (they don't — so keep `0.0.0.0/0` with a strong password instead)

---

## PART 4 — ADDING A RICH TEXT EDITOR (Future enhancement)

The current body field is a plain textarea. To add rich text (bold, headings, links):

### Option A: TipTap (recommended)
```bash
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit
```
Replace the `<textarea>` in `components/PostForm.jsx` with a TipTap editor.
Store HTML in the `body` field.
In `app/posts/[id]/page.js` replace the `{post.body}` render with `dangerouslySetInnerHTML={{ __html: post.body }}`.

### Option B: React Quill
```bash
npm install react-quill
```

---

## PART 5 — IMAGE UPLOADS (Future enhancement)

Currently the app uses image URLs. To upload images directly:

### Cloudinary (free tier)
1. Sign up at [https://cloudinary.com](https://cloudinary.com)
2. Create an upload preset (unsigned)
3. Install the SDK: `npm install cloudinary`
4. Create an upload API route at `app/api/upload/route.js`
5. Add the cover image upload button in `PostForm.jsx`

---

## PART 6 — ADDING AUTHENTICATION (Protect /create-post and /edit-post)

To prevent anyone on the internet from creating/editing posts:

### NextAuth.js (recommended)
```bash
npm install next-auth
```

1. Create `app/api/auth/[...nextauth]/route.js`
2. Add credentials provider (email + password) or GitHub OAuth
3. Wrap `PostForm.jsx` pages with a session check
4. Add `NEXTAUTH_SECRET` and `NEXTAUTH_URL` to your env variables

---

## PROJECT FILE STRUCTURE REFERENCE

```
fintech-intelligence-os/
│
├── app/
│   ├── globals.css              ← Global styles + CSS variables
│   ├── layout.js                ← Root layout (Header, Preloader, Footer)
│   ├── page.js                  ← Homepage (Hero + PostGrid)
│   ├── not-found.js             ← Custom 404 page
│   │
│   ├── intelligence/
│   │   └── page.js              ← All reports with stats dashboard
│   │
│   ├── categories/
│   │   └── page.js              ← Category overview page
│   │
│   ├── about/
│   │   └── page.js              ← About / authority positioning page
│   │
│   ├── posts/[id]/
│   │   └── page.js              ← Single post view
│   │
│   ├── create-post/
│   │   └── page.js              ← Create new post
│   │
│   ├── edit-post/[id]/
│   │   └── page.js              ← Edit existing post
│   │
│   └── api/
│       └── posts/
│           ├── route.js         ← GET all / POST create
│           └── [id]/
│               └── route.js     ← GET one / PUT update / DELETE
│
├── components/
│   ├── Header.jsx               ← Sticky nav with logo and links
│   ├── Hero.jsx                 ← Homepage hero section
│   ├── PostCard.jsx             ← Individual post card
│   ├── PostGrid.jsx             ← Filterable grid of posts
│   ├── PostForm.jsx             ← Reusable create/edit form
│   └── Preloader.jsx            ← Boot animation
│
├── lib/
│   └── mongodb.js               ← Mongoose connection with caching
│
├── models/
│   └── Post.js                  ← Post schema (title, body, category, etc.)
│
├── .env.local                   ← Your secrets (NOT committed to git)
├── .gitignore
├── jsconfig.json                ← Path alias (@/ = root)
├── next.config.js
├── netlify.toml                 ← Netlify build config
└── package.json
```

---

## QUICK COMMAND REFERENCE

| Command | What it does |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start local dev server on port 3000 |
| `npm run build` | Build for production |
| `npm start` | Run production build locally |
| `git add . && git commit -m "msg" && git push` | Push changes to GitHub (triggers Netlify redeploy) |

---

## TROUBLESHOOTING

**"Please define MONGODB_URI" error**
→ Your `.env.local` file is missing or misconfigured. Check the connection string.

**Posts not appearing after publish**
→ Make sure you set status to `published` — draft posts are hidden from the public feed.

**Netlify build fails**
→ Check that `netlify.toml` is in the root and `@netlify/plugin-nextjs` is installed.

**Images not loading**
→ The domain must be whitelisted in `next.config.js` under `images.domains`.
