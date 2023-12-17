'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './nav_link.module.css';

interface Props {
	href: string;
	children: React.ReactNode;
}

export default function NavLink({ href, children }: Props) {
	const path = usePathname();

	return (
		<Link
			href={href}
			className={
				path.startsWith(href) ? `${styles.link} ${styles.active}` : styles.link
			}
		>
			{children}
		</Link>
	);
}
