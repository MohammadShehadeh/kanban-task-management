import type { Metadata } from 'next';

import cx from 'classnames';

import { plusJakartaSans } from './fonts';

import '@/styles/index.scss';

export const metadata: Metadata = {
	title: 'Frontend Mentor | Kanban Task Management Web App',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<script
					id="user-settings"
					dangerouslySetInnerHTML={{
						__html: `
							try {
								if (localStorage.__msh_theme === 'light') {
									document.documentElement.dataset.colorScheme = 'light'
								} else {
									document.documentElement.dataset.colorScheme = 'dark'
								}
							} catch (_) {}
						`,
					}}
				/>
			</head>
			<body className={cx(plusJakartaSans.variable)}>{children}</body>
		</html>
	);
}
