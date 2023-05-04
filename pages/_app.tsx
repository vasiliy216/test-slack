import "styles/globals.css"
import "styles/custom-loader-spinner.css"
import "styles/vars.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { AuthLayout } from "layout/auth-layout"
import { Provider } from "react-redux"
import { store } from "store"

process.env.NEXTAUTH_URL = process.env.NODE_ENV === "production"
	? process.env.NEXTAUTH_URL_PROD
	: process.env.NEXTAUTH_URL_DEV

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<AuthLayout>
					<Component {...pageProps} />
				</AuthLayout>
			</Provider>
		</SessionProvider>
	)
}
