import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // NO permitir console.log en producción
      'no-console': 'error',
      
      // Advertir sobre TODOs, FIXMEs, etc. (no bloquea build)
      'no-warning-comments': [
        'warn',
        {
          terms: ['TODO', 'FIXME', 'XXX', 'HACK', 'NOTE', 'OPTIMIZE', 'REVIEW'],
          location: 'start',
        },
      ],
      // Desactivar reglas estrictas de TypeScript
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      
      // Error para variables sin declarar
      'no-undef': 'error',
      
      // Error para variables e importaciones sin usar
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': 'off', // Desactivar la regla base para usar la de TypeScript
      
      // Naming convention: camelCase para variables, excepto decoradores
      '@typescript-eslint/naming-convention': [
        'error',
        {
          // Clases y tipos: PascalCase
          selector: ['class', 'interface', 'typeAlias', 'enum', 'typeParameter'],
          format: ['PascalCase'],
        },
        {
          // Funciones decoradoras: PascalCase (como @Controller, @Get, @GetPayload, etc.)
          selector: ['function'],
          filter: {
            // Permite funciones que empiecen con mayúscula (decoradores comunes)
            regex: '^[A-Z]',
            match: true,
          },
          format: ['PascalCase'],
        },
        {
          // Schemas de Mongoose: PascalCase (como BlogSchema, UserSchema)
          selector: ['variable'],
          filter: {
            regex: '^[A-Z]\\w*Schema$',
            match: true,
          },
          format: ['PascalCase'],
        },
        {
          // Excepciones: _id, _v para MongoDB (cualquier formato) - variables
          selector: ['variable'],
          filter: {
            regex: '^(_id|_v)$',
            match: true,
          },
          format: null, // Permite cualquier formato
        },
        {
          // Excepciones: _id, _v y propiedades con puntos para MongoDB (cualquier formato)
          selector: ['objectLiteralProperty'],
          filter: {
            regex: '^(_id|_v|blocks\\.|\\$|\\w+\\..+)',
            match: true,
          },
          format: null, // Permite cualquier formato (incluye rutas anidadas como 'blocks.data.text')
        },
        {
          // Constantes decoradoras exportadas: PascalCase (como GetPayload)
          selector: ['variable'],
          modifiers: ['const', 'exported'],
          filter: {
            regex: '^[A-Z]',
            match: true,
          },
          format: ['PascalCase'],
        },
        {
          // Variables y funciones: camelCase (regla general)
          selector: ['variable', 'function', 'parameter', 'method', 'property', 'accessor'],
          format: ['camelCase'],
        },
        {
          // Constantes: UPPER_CASE o camelCase
          selector: ['variable'],
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE'],
        },
      ],
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', '*.js', '.eslintrc.js'],
  }
);

