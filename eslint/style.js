// @ts-check
import tseslint from 'typescript-eslint';

export default tseslint.config({
    rules: {
        curly: 'warn',
        'new-cap': 'off',
        'spaced-comment': ['warn', 'always']
    }
});
