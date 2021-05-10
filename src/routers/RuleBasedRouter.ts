import { Action, Context } from 'bottender';

// Temporary disable no-explicit-any warnings, possible fix: declare property interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RuleBasedRouter: Action<Context, Record<string, any>> = async (context, props) => {
    await context.sendText(`您的訊息為： ${context.event.text as string}`);
    return props.next;
};

export default RuleBasedRouter;
