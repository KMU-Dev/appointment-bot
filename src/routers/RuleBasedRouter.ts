import { Action, Context } from 'bottender';

const RuleBasedRouter: Action<Context, Record<string, any>> = async (context, props) => {
    await context.sendText('您的訊息為： ' + context.event.text);
    return props.next;
};

export default RuleBasedRouter;
