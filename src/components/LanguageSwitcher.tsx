'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages, type LanguageCode } from '@/lib/translations';
import { Languages, ChevronDown } from 'lucide-react';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2" aria-label={`Change language. Current language: ${languages[lang]}`}>
          <Languages className="h-5 w-5" aria-hidden="true" />
          <span className="font-mono uppercase">{lang}</span>
          <ChevronDown className="h-4 w-4 opacity-50" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label="Language selection">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onSelect={() => setLang(code as LanguageCode)}
            className="flex gap-2"
            aria-label={`Switch to ${name}`}
          >
            <span className="font-mono uppercase w-8 text-muted-foreground">{code}</span>
            <span>{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
