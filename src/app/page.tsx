import '@/styles/index.scss';

import { Layout } from '@/components/Layout';
import { Logo } from '@/components/Logo';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';

export default async function Home() {
	return (
		<Layout>
			<Layout.Header>
				<Logo />
				<Navbar />
			</Layout.Header>
			<Layout.Main>
				<Sidebar />
				<div>board</div>
			</Layout.Main>
		</Layout>
	);
}
