import {
	ClerkProvider,
	RedirectToSignIn,
	SignedIn,
	SignedOut,
	useAuth,
} from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

import "./index.css";

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ClerkProvider
			publishableKey={PUBLISHABLE_KEY}
			appearance={{
				baseTheme: dark,
				userButton: { baseTheme: undefined },
			}}
		>
			<SignedIn>
				<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
					<App />
				</ConvexProviderWithClerk>
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</ClerkProvider>
	</StrictMode>,
);
