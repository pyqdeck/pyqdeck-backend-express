# Authentication & Error Handling Documentation

This document outlines how authentication and error tracking are implemented in the PyqDeck frontend.

## 🔑 Authentication (Clerk)

We use **Clerk** as our primary authentication and user management provider.

### 1. Provider Configuration
The `ClerkProvider` is initialized in `src/components/clerk-provider.jsx` and wrapped around the entire application in the root layout (`src/app/layout.jsx`).

- **Theme:** We use the `shadcn` theme for Clerk components to match our application's aesthetic.
- **Root Layout Integration:**
  ```jsx
  // src/app/layout.jsx
  <ClerkProvider>
    <TooltipProvider>
      <Header />
      <main className="flex-1 pt-16">{children}</main>
    </TooltipProvider>
  </ClerkProvider>
  ```

### 2. Middleware & Route Protection
Authentication is enforced at the edge using Next.js Middleware.

- **File:** `src/middleware.js`
- **Logic:** We use `clerkMiddleware()` to handle session validation. All routes except static assets and Next.js internals are intercepted.
- **Matcher:** Configured to skip static files (images, fonts, etc.) but run for all API routes and application pages.

### 3. Authentication Pages
We utilize Clerk's pre-built components for a seamless experience:
- **Sign In:** `/sign-in` (`src/app/sign-in/[[...sign-in]]/page.jsx`)
- **Sign Up:** `/sign-up` (`src/app/sign-up/[[...sign-up]]/page.jsx`)

These pages use the `<SignIn />` and `<SignUp />` components respectively, styled with custom landing page content.

### 4. Authenticated API Requests
To communicate with our backend securely, we use a custom hook:

- **Hook:** `useApi` (`src/hooks/use-api.js`)
- **How it works:**
  - It retrieves the Clerk JWT token using `getToken()`.
  - It injects this token into the `Authorization` header as a `Bearer` token.
  - The backend verifies this token to identify the user and their permissions.

---

## 🛡️ Error Handling & Tracking

### 1. Sentry Integration (Planned/Configured)
Errors in the application are tracked using **Sentry**. (Note: Ensure `NEXT_PUBLIC_SENTRY_DSN` is set in environment variables).

- **Client-side Errors:** Caught by Sentry's browser SDK.
- **Server-side Errors:** Captured during SSR or in Middleware.
- **API Errors:** The `useApi` hook and generated API client handle axios errors. Any 4xx or 5xx responses from the backend are processed, and critical failures are reported to Sentry.

### 2. User Feedback (Sonner)
For non-critical errors or validation issues, we use `sonner` to display toast notifications to the user.

- **Success:** `toast.success("Saved successfully")`
- **Error:** `toast.error("Something went wrong")`

---

## 🛠️ Key Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Clerk** | Authentication, JWT Management, User Profiles |
| **Sentry** | Error Reporting & Performance Monitoring |
| **Axios** | HTTP Client for API communication |
| **Sonner** | UI Notifications (Toasts) |
| **Lucide React** | Icons for UI feedback |

## 🔗 Useful Links
- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Middleware Guide](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Sentry Next.js SDK](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
