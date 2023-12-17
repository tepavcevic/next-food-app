import Link from 'next/link';
import Image from 'next/image';

import MainHeaderBackground from './main_header_background';
import logoImg from '@/assets/logo.png';
import styles from './main_header.module.css';
import NavLink from './nav_link';

export default function MainHeader() {
	return (
		<>
			<MainHeaderBackground />
			<header className={styles.header}>
				<Link className={styles.logo} href="/">
					<Image
						src={logoImg}
						priority
						alt="A plate with food on it (app logo)"
					/>
					NextLevel food
				</Link>

				<nav className={styles.nav}>
					<ul>
						<li>
							<NavLink href="/meals">Meals</NavLink>
						</li>
						<li>
							<NavLink href="/community">Community</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}
