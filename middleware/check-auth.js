export default function (context) {
  console.log('[Middleware] check auth');
  if(context.hasOwnProperty('ssrContext')) {
    context.store.dispatch('initAuth', context.ssrContext.req);
  } else {
    context.store.dispatch('initAuth', null);
  }
}
