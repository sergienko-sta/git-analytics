import { Button, Select } from 'antd';

import * as Shared from '@shared';

import { useLanguage } from '../hooks';

interface ILanguageSwitcherProps {
    variant?: 'buttons' | 'select';
}

export const LanguageSwitcher = ({ variant = 'buttons' }: ILanguageSwitcherProps) => {
    const { currentLanguage, changeLanguage, isLanguageActive } = useLanguage();

    if (variant === 'select') {
        return (
            <Select onChange={changeLanguage} value={currentLanguage}>
                {Shared.supportedLanguages.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang.toUpperCase()}
                    </option>
                ))}
            </Select>
        );
    }

    return (
        <div>
            {Shared.supportedLanguages.map((lang) => (
                <Button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    type={isLanguageActive(lang) ? 'primary' : 'text'}
                    size='small'
                >
                    {lang.toUpperCase()}
                </Button>
            ))}
        </div>
    );
};
