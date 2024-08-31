import { type CodegenConfig } from '@graphql-codegen/cli';

const schemaUrl = process.env.SCHEMA_URL || 'http://localhost:3000/graphql';

const config: CodegenConfig = {
    schema: schemaUrl,
    // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
    documents: ['./src/**/*.{ts,tsx}'],
    generates: {
        './src/codegen/': {
            preset: 'client',
            presetConfig: {
                gqlTagName: 'gql'
            }
        }
    }
};

export default config;
