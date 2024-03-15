declare const TagManager: {
	dataLayer: (dataLayerArgs: DataLayerArgs) => void
	initialize: (tagManagerArgs: TagManagerArgs) => void
}

export interface TagManagerArgs {
	/**
	 * The ID of your GTM Container.
	 */
	gtmId: string
	/**
	 * Information that should be added to the dataLayer before initialization.
	 */
	dataLayer?: Record<string, unknown>
	/**
	 * Customize the name of the dataLayer object.
	 */
	dataLayerName?: string
	/**
	 * Additional events which will be added to the dataLayer during initialization.
	 */
	events?: Array<Record<string, unknown>>
	/**
	 * If you use GTM's environment function, you need to pass the gtm_auth query parameter here.
	 */
	auth?: string
	/**
	 * If you use GTM's environment function, you need to pass the gtm_preview query parameter here.
	 */
	preview?: string
	/**
	 * Set the nonce [if you use the Google Tag Manager with a Content Security Policy](https://developers.google.com/tag-platform/security/guides/csp).
	 */
	nonce?: string
	/**
	 * Customize the GTM script URL [if you serve the script through your tagging servers](https://developers.google.com/tag-platform/tag-manager/server-side/dependency-serving?tag=gtm) or want to mask your GTM script.
	 */
	source?: string
}

export interface DataLayerArgs {
	/**
	 * Object that contains all of the information that you want to pass to Google Tag Manager.
	 */
	dataLayer?: Record<string, unknown>
	/**
	 * Custom name for dataLayer object.
	 */
	dataLayerName?: string
}

export default TagManager
