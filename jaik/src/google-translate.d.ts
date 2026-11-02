// types/google-translate.d.ts
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google: {
      translate: {
        TranslateElement: {
          new (
            config: { pageLanguage: string; layout: any },
            elementId: string
          ): any;
          InlineLayout: {
            SIMPLE: any;
          };
        };
      };
    };
  }
}

export {};