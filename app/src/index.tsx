import { StrictMode, Suspense, lazy } from 'react';

import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import './index.css';

const apolloClient = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_URL,
    cache: new InMemoryCache(),
    defaultOptions: {
        // Caching interferes with React rendering for some reason
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore'
        }
    }
});

const App = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <ApolloProvider client={apolloClient}>
        <StrictMode>
            <Suspense>
                <App />
            </Suspense>
        </StrictMode>
    </ApolloProvider>
);
