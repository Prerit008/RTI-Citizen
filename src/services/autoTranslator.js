/**
 * Auto-translation utility for dynamic content using external Translation API (MyMemory / LibreTranslate)
 * with robust local caching so repeated phrases or numbers are instantaneous and zero-cost.
 */

const memoryCache = new Map();

/**
 * Auto-translate a piece of text to an Indian regional language.
 * @param {string} text Source English text
 * @param {string} targetLang Target language code (e.g. 'hi', 'bn', 'ta', 'te', 'mr', etc.)
 * @returns {Promise<string>} Translated text
 */
export async function autoTranslateText(text, targetLang = "hi") {
    if (!text || targetLang === "en") return text;

    const cacheKey = `${targetLang}:${text}`;
    if (memoryCache.has(cacheKey)) {
        return memoryCache.get(cacheKey);
    }

    // Check localStorage cache
    try {
        const stored = localStorage.getItem(`tx_${cacheKey}`);
        if (stored) {
            memoryCache.set(cacheKey, stored);
            return stored;
        }
    } catch (e) {}

    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            const translated = data?.responseData?.translatedText;
            if (translated && !translated.startsWith("MYMEMORY WARNING")) {
                memoryCache.set(cacheKey, translated);
                try {
                    localStorage.setItem(`tx_${cacheKey}`, translated);
                } catch (e) {}
                return translated;
            }
        }
    } catch (err) {
        console.warn("External Auto-Translation API request failed:", err.message);
    }

    return text;
}
