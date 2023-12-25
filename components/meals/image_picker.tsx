'use client';

import { useState, useRef, ChangeEvent } from 'react';

import styles from './image_picker.module.css';
import Image from 'next/image';

interface ImagePickerProps {
	label: string;
	name: string;
}

export default function ImagePicker({ label, name }: ImagePickerProps) {
	const [pickedImage, setPickedImage] = useState<string>('');
	const ref = useRef<HTMLInputElement>(null);
	function handlePickImage() {
		ref.current?.click();
	}

	function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];

		if (!file) {
			setPickedImage('');
			return;
		}

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPickedImage(fileReader.result as string);
		};

		fileReader.readAsDataURL(file);
	}

	return (
		<div className={styles.picker}>
			<label htmlFor={name}>{label}</label>
			<div className={styles.controls}>
				<div className={styles.preview}>
					{!pickedImage && <p>No image picked yet.</p>}
					{pickedImage && (
						<Image
							src={pickedImage}
							alt="Image selected by the user"
							fill={true}
						/>
					)}
				</div>
				<input
					ref={ref}
					onChange={handleImageChange}
					className={styles.input}
					type="file"
					name={name}
					id={name}
					accept="image/png, jpeg"
				/>
				<button
					className={styles.button}
					type="button"
					onClick={handlePickImage}
				>
					Pick an image
				</button>
			</div>
		</div>
	);
}
