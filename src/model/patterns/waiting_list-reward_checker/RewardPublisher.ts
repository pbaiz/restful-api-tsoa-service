
import { Publisher } from "./Publisher";
import { Subscriber } from "./Subscriber";

export abstract class RewardPublisher extends Publisher {
    subscribers: Subscriber[] = [];
    abstract subscribe(subscriber : Subscriber) : void;
    abstract notifySubscribers(data : object) : void;
    abstract unsubscribe(subscriber : Subscriber) : void;
}