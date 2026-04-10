# Copilot Instructions for Jobify (MERN Stack)

## Project Overview

Jobify is a full-stack job management application built with the MERN stack (MongoDB, Express, React, Node.js). It features user authentication with role-based access control, a dashboard for managing jobs, and statistics viewing capabilities.

## Build, Test, and Lint Commands

### Full Stack Setup
```bash
npm run setup-project              # Install dependencies for both server and client
npm run dev                        # Run server and client concurrently
```

### Server-Only Commands
```bash
npm run server                     # Start server with nodemon (auto-reload)
```

### Client-Only Commands
```bash
cd client && npm run dev          # Start Vite dev server
cd client && npm run build        # Build for production
cd client && npm run lint         # Run ESLint on src/ directory
cd client && npm run preview      # Preview production build locally
```

### Production Setup
```bash
npm run setup-production-app       # Install + build client for production
```

## High-Level Architecture

### Backend Structure (Node.js/Express)

**Authentication Flow:**
- JWT-based authentication with cookies (httpOnly, secure in production)
- First account created becomes `admin`, subsequent accounts are `user` role
- Token stored in cookies and verified on protected routes via `authenticateUser` middleware
- Passwords hashed with bcryptjs before storage; `User.toJSON()` strips passwords from responses

**Route Protection:**
- `/api/v1/auth` - No authentication required (register, login, logout)
- `/api/v1/jobs` and `/api/v1/users` - Both require `authenticateUser` middleware
- Optional role-based authorization available via `authorizePermissions(...roles)`

**Request/Response Pattern:**
- All endpoints return JSON responses
- Custom error classes in `errors/customError.js` (UnauthenticatedError, UnauthorizedError)
- Error handler middleware catches async errors via `express-async-errors`
- Controllers use `http-status-codes` for standard HTTP status codes

**Database:**
- MongoDB via Mongoose
- Two main models: User and Job
- User schema includes: name, email, password, lastName, location, role
- Connection established in `server.js` via `process.env.MONGO_URL`

### Frontend Structure (React + Vite)

**Router Architecture:**
- React Router v6 with nested routes
- Home section (Landing, Register, Login) - public routes
- Dashboard section (nested under `/dashboard`) - protected via loader
- Error boundary handling via `<Error />` component
- Dashboard loader (`DashboardLayout`) fetches current user and redirects if unauthenticated

**Context API & State Management:**
- `DashboardContext` created in `DashboardLayout.jsx` - provides user data and dashboard utilities
- Context exports custom hook `useDashboardContext()` for consumption in nested components
- Context values: `user`, `showSideBar`, `isDarkTheme`, `toggleDarkThem`, `toggleSideBar`, `logoutUser`
- Dark theme preference stored in localStorage (`darkTheme` key)

**Data Fetching:**
- Centralized Axios instance (`customFetch.js`) with base URL `/api/v1`
- Axios automatically includes credentials/cookies in requests
- Components access server via `customFetch` directly or through loaders
- Toast notifications via `react-toastify` for user feedback

**UI Component Organization:**
- `components/` - Reusable UI components (Navbar, BigSidebar, SmallSidebar, etc.)
- `pages/` - Full page components and route loaders
- `assets/wrappers/` - Styled-components for styling
- `utils/` - Helper functions (customFetch, links configuration)

## Key Conventions

### Naming Patterns

**Backend Files:**
- Controllers: `*Controller.js` (e.g., `authController.js`, `jobController.js`)
- Models: `*Model.js` (e.g., `UserModel.js`, `JobModel.js`)
- Middleware: `*MiddleWare.js` (e.g., `authMiddleWare.js`)
- Routes: `*Router.js` (e.g., `authRouter.js`)
- Errors: Custom classes in `errors/customError.js`

**Frontend Files:**
- Components: PascalCase JSX files in `components/` folder
- Pages: PascalCase JSX files in `pages/` folder
- Hooks: Export named export `useDashboardContext()` from context creator
- Styled wrappers: Named exports in `assets/wrappers/` matching component names

### Context & Custom Hooks

- Context creators should export both the context Provider component AND a custom hook
- Always name the hook `use<ContextName>()` (e.g., `useDashboardContext`)
- Pass context values via Provider's `value` prop as an object with clear, descriptive keys
- Components consume via the custom hook, not direct `useContext()` calls

### Styled Components

- Use `styled-components` library for component styling
- Create wrapper styled components in `assets/wrappers/` with descriptive names
- Import wrapper and apply as: `<Wrapper className="container">{children}</Wrapper>`
- CSS classes are combined with styled-components selectors

### API Integration

- All API calls go through `customFetch` Axios instance
- Errors are thrown and caught by Express's async error handler
- Use `http-status-codes` constants for response status codes
- Cookie-based auth: token automatically sent via httpOnly cookie

### Data Validation

- Use `express-validator` for request validation in routes
- Custom middleware in `validationMiddleware.js` for validation logic
- Mongoose schemas define data structure; no separate validation layer needed

### Error Handling

- Create custom error classes extending Error
- Throw custom errors in controllers (e.g., `throw new UnauthenticatedError(...)`)
- Error handler middleware catches all errors and sends appropriate responses
- Frontend shows user-friendly messages via toast notifications

## Environment Variables

**Required (both server and client):**
- `MONGO_URL` - MongoDB connection string
- `NODE_ENV` - Set to "production" or "development"

**Optional:**
- `port` - Server port (defaults to 5100)

## Development Workflow

1. Server and client can run simultaneously via `npm run dev`
2. Server uses nodemon for hot reload; client uses Vite for fast refresh
3. Dashboard is protected; first visit to `/dashboard` triggers loader that fetches user
4. Authentication state managed at route level, not global state
5. Always check role-based access in protected pages with `user.role`
