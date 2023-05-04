import { Typography } from "antd"

const { Paragraph } = Typography

export const LinkCopied = () => (
	<div>
		<Paragraph copyable={{ text: window.location.origin }}>Circle Link</Paragraph>
	</div>
)
