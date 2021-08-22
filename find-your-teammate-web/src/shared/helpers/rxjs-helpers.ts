import { Subscription } from 'rxjs';

export class RxjsHelpers {
	public static unsubscribeMany(subscriptions: Array<Subscription>) {
		if (!subscriptions || !subscriptions.length) return;
		subscriptions.forEach(this.unsubscribe);
	}

	public static unsubscribe(subscription: Subscription) {
		if (!subscription || subscription.closed) return;
		subscription.unsubscribe();
	}
}
