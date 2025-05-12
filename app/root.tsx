import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useRef } from "react";
import useDarkMode from "./service/useDarkMode"
import type { Route } from "./+types/root";
import video from "../public/pcb.mp4"
import "./app.css";


export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {

  const iconRef = useRef<HTMLElement>(null);
  const DarkMode = useDarkMode(iconRef);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" href="/favicon.svg" />
        <script src="https://kit.fontawesome.com/9fa9845ee1.js" crossOrigin="anonymous" />
      </head>
      <body className="flex bg-transparent flex-col min-h-screen overflow-hidden">
        <video src={video} autoPlay muted className="opacity-89 bg-gradient-to-br" />
        <div className="w-full bg-transparent flex-grow">
          {children}
          <ScrollRestoration />
          <Scripts />
        </div>
        <footer className="w-full py-4 font-sans bottom-0 fixed font-semibold text-lg text-center text-gray-300 hover:text-purple-200 dark:text-gray-300 bg-transparent">
          <a href="https://www.instagram.com/baandurv" target="_blank" className="hover:text-purple-300 text-{6px} dark:hover:text-gray-400 transition-all duration-300"
          >Created be BrandonRv</a>
        </footer>
        <button
          id="dark-mode-toggle"
          className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 shadow-lg flex items-center justify-center z-50"
          onClick={DarkMode}
        >
          <i ref={iconRef} className="fa-solid text-gray-400"></i>
        </button>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto bg-white dark:bg-gray-800 dark:text-white">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}