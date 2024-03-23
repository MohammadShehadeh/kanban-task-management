'use client';

import { useEffect, useState } from 'react';

import { Layout } from '@/components/Layout';
import { Logo } from '@/components/Logo';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { Board } from '@/components/Board';
import { Modals } from '@/components/Modals';

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	if (isLoading) return null;

	return (
		<Layout>
			<Layout.Header>
				<Logo />
				<Navbar />
			</Layout.Header>
			<Layout.Main>
				<Sidebar />
				<Board />
				<Modals />
			</Layout.Main>
		</Layout>
	);
}
