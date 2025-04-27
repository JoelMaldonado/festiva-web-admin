import { Event } from "@model/event";
import { Observable } from "rxjs";

export abstract class EventRepository {
    abstract fetchAll(): Observable<Event[]>;
}