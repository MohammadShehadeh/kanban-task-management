import { Layout } from '@/components/Layout';
import { Logo } from '@/components/Logo';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { Board } from '@/components/Board';
import { Modals } from '@/components/Modals';

import '@/styles/index.scss';

export default async function Home() {
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
