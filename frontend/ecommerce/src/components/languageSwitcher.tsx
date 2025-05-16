// components/LanguageSwitcher.js
import i18n from 'i18next';
import { useTheme } from '../context-provider/themecontext';

export default function LanguageSwitcher() {
    const { darkMode } = useTheme();
    return (
        <div
            className="d-flex gap-2"
            style={{
                background: darkMode ? 'black' : '#f8f9fa',
                color: darkMode ? 'white' : 'black'
            }}
        >
            <button
                onClick={() => i18n.changeLanguage('en')}
                className={`btn ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
            >
                EN
            </button>

            <button
                onClick={() => i18n.changeLanguage('ar')}
                className={`btn ${i18n.language === 'ar' ? 'btn-primary' : 'btn-outline-primary'}`}
            >
                AR
            </button>
        </div>

    );
}
