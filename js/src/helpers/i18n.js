import { setLocaleData, getI18n } from "@wordpress/i18n";
import get from "lodash/get";

/**
 * Sets the l10n for the given textdomain in Jed.
 *
 * All the locale data should be available in the l10nNamespace.
 *
 * @param {string} textdomain      The textdomain to set the locale data for.
 * @param {string} [l10nNamespace] The global namespace to get the localization
 *                                 data from.
 *
 * @returns {void}
 */
export function setTextdomainL10n( textdomain, l10nNamespace = "wpseoYoastJSL10n" ) {
	const jed = getI18n();
	const currentTranslations = get( jed, [ "options", "locale_data", textdomain ], false );

	if ( currentTranslations === false ) {
		const translations = get( window, [ l10nNamespace, textdomain, "locale_data", textdomain ], false );
		console.log( textdomain, l10nNamespace, translations );

		if ( translations === false ) {
			// Jed needs to have meta information in the object keyed by an empty string.
			setLocaleData( { "": {} }, textdomain );
		} else {
			setLocaleData( translations, textdomain );
		}
	}
}

/**
 * Configures the i18n for yoast-components.
 *
 * We call translation functions using `@wordpress/i18n` so we need to register
 * all our strings there too. This function does that.
 *
 * @returns {void}
 */
export function setYoastComponentsL10n() {
	setTextdomainL10n( "yoast-components" );
}

/**
 * Configures the l10n for wordpress-seo-js.
 *
 * We call translation functions using `@wordpress/i18n` so we need to register
 * all our strings there too. This function does that.
 *
 * @returns {void}
 */
export function setWordPressSeoL10n() {
	setTextdomainL10n( "wordpress-seo" );
}
