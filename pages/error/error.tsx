import { Button } from "antd"
import { useRouter } from "next/router"
import Link from "next/link"
import styles from "./error.module.css"

const errorVerification = () => (
	<>
		<h1>Unable to sign in</h1>
		<div className={styles.message}>
			<p>The sign in link is no longer valid.</p>
			<p>It may have been used already or it may have expired.</p>
		</div>
	</>
)

const errorSomething = () => (
	<>
		<h1>Sorry</h1>
		<div className={styles.message}>
			<p>Something was wrong</p>
		</div>
	</>
)

const errorController = (error?: string | string[]) => {
	switch (error) {
		case "Verification": return errorVerification()
		default: return errorSomething()
	}
}

export default function ErrorRequest() {
	const router = useRouter()
	const { error } = router.query
	return (
		<div className={styles.page}>
			<div className={styles.card}>
				{errorController(error)}
				<Button type="default"><Link href="/login">Sign in</Link></Button>
			</div>
		</div>
	)
}
