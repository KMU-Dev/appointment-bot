import { Action, chain, Context } from 'bottender';
import RuleBasedRouter from './routers/RuleBasedRouter';

const App: Action<Context, Record<string, any>> = async () => {
    return chain([RuleBasedRouter]);
};

export default App;
