import crypto from 'crypto-js';
import { instanceToPlain, plainToInstance } from 'class-transformer';

export class State {
    public money: number;
    public lastCollected: number;

    constructor(money: number, lastCollected: number) {
        this.money = money;
        this.lastCollected = lastCollected;
    }

    public getCollectionInterval() {
        return 1000 * 60 * 60 * 24;
    }

    public getCollectionValue() {
        return 1000;
    }
}

export class Storage {
    public static readonly SECRET_KEY = "bWlndWVsIGlzIGJhZA==";
    public static readonly dataKey = "gamblingdataebf4c5f2a";

    public static createNewSave(): State {
        return new State(0, 0);
    }

    private static encrypt(d: string): string {
        const e = crypto.AES.encrypt(d, this.SECRET_KEY);
        return (btoa(e.toString()));
    }

    private static decrypt(d: string): string {
        const bytes = crypto.AES.decrypt(atob((d)), this.SECRET_KEY);
        console.log('Decrypted data!');
        return bytes.toString(crypto.enc.Utf8);
    }

    static resolveOrZero(value: number): number {
        if (value) {
            return value;
        } else {
            return 0;
        }
    }

    public static parseSave(s: string, willHandleError?: boolean): State {
        try {
            const r = this.decrypt(s);
            console.log(r);
            return plainToInstance(State, JSON.parse(r) as Object);
        } catch (err) {
            console.error(err);
            if (willHandleError) throw new Error("Could not parse save!")
            return this.createNewSave();
        }
    }

    public static export(state: State): string {
        const s = JSON.stringify(instanceToPlain(state));
        const e = this.encrypt(s);
        console.log(e);
        return e;
    }

    public static save(state: State): void {
        const e = this.export(state);
        localStorage.setItem(this.dataKey, e);
    }

    public static load(): State {
        try {
            const save = localStorage.getItem(this.dataKey);

            if (save) {
                const r = (save);

                const p = this.parseSave(r);

                return p;
            } else {
                const p = this.createNewSave();

                return p;
            }
        } catch(err) {
            console.error(err);
            return this.createNewSave();
        }
    }
}