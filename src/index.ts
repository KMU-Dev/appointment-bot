import { Action, chain, Context } from 'bottender';
import RuleBasedRouter from './routers/RuleBasedRouter';

// Temporary disable no-explicit-any warnings, possible fix: declare property interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const App: Action<Context, Record<string, any>> = async () => {
    return chain([RuleBasedRouter]);
};

export default App;
