declare global {
	interface Document {
		startViewTransition: (cb: () => void) => void;
	}
}

export {};
