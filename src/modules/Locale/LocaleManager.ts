import {Localized} from "@/modules/Locale/Localized.ts";
import {NumberFormatter} from "@/modules/NumberFormatter.ts";
import {Translator} from "@/modules/Translation/Translator.ts";

import en from '@/locale/en';
import {shallowRef} from "vue";
import {LanguagePackData} from "@/modules/Translation/LanguagePack.ts";

/**
 * # Locale Manager
 *
 * Note: in Evance 'en' is always the default locale.
 */
export class LocaleManager extends Localized {

    public readonly numberFormatter: NumberFormatter;

    public readonly translator: Translator;

    constructor(localeOptions) {
        const currentLocale = shallowRef(localeOptions?.locale ?? 'en');
        const defaultLocale = shallowRef('en');
        super(defaultLocale, currentLocale);

        this.numberFormatter = new NumberFormatter(this.defaultLocale, this.currentLocale);
        this.translator = new Translator(this.defaultLocale, this.currentLocale);
        this.translator.addLanguagePack(this.defaultLocale.value, en);

        if (localeOptions?.languagePack) {
            this.translator.addLanguagePack(this.currentLocale.value, localeOptions.languagePack);
        }
    }

    /**
     * # Add Language Pack
     * @param locale
     * @param messages
     */
    public addLanguagePack(locale: string, messages: LanguagePackData) {
        this.translator.addLanguagePack(locale, messages);
    }
}