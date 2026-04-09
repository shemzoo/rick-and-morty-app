/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_FAVORITES_REMOTE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
  export default ReactComponent;
}

declare module 'remote_app/FavoriteCharacters' {
  import type { ComponentType } from 'react';

  import type { FavoriteCharactersProps } from '@/widgets/FavoriteCharacters/FavoriteCharacters.component';

  const FavoriteCharacters: ComponentType<FavoriteCharactersProps>;

  export default FavoriteCharacters;
}
