import { asFunction } from 'awilix';
import Registry from '@registries/registry.abstract';
import EventEmitter from 'events';
import { User } from '@modules/user/dto/user.dto';
import { ILogObj, Logger } from 'tslog';
;

export default class EventRegistry extends Registry {
    public register(): void {
        this.container.register({
            'eventManager': asFunction((log: Logger<ILogObj>): EventEmitter => {
                const eventManager = new EventEmitter;

                eventManager.on('usersCreated', (users: Array<User>) => {
                    log.info(`Saved ${users.length} users`);
                });

                return eventManager;
            })
        });
    }
}

