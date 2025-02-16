import BigNumber from "bignumber.js";

export default class NumberFormatter {
    private static format = ['thousand','million','billion','trillion','quadrillion','quintillion','sextillion','septillion','octillion','nonillion'];
    private static prefixes = ['','un','duo','tre','quattuor','quin','sex','septen','octo','novem'];
    private static suffixes = ['decillion','vigintillion','trigintillion','quadragintillion','quinquagintillion','sexagintillion','septuagintillion','octogintillion','nonagintillion'];

    static resolveFormat() {
        if (this.format.length > 12) return;
        for (const i of this.suffixes) {
            for (const ii of this.prefixes) {
                this.format.push(ii + i);
            }
        }
    }

    public static fix(value: number): number {
        return Math.round(value * 1000) / 1000;
    }

    public static nth(value: number): string {
        var i = value % 10;
        let j;

        switch (i) {
            case 1:
                if (value % 100 == 11) { j = "th"; break; }
                j = "st";
                break;
            case 2:
                if (value % 100 == 12) { j = "th"; break; }
                j = "nd";
                break;
            case 3:
                if (value % 100 == 13) { j = "th"; break; }
                j = "rd";
                break;
            default:
                j = "th";
        }

        return value + j;
    }

    public static formatText(value: BigNumber, bl = true, n = 0): string {
        this.resolveFormat();
        
        if (value.lessThan(1000000) && bl) return value.toNumber().toLocaleString();

        var base = 0,
		notationValue = '';
        let v = value;
		if (value.greaterThanOrEqualTo(1000)) {
            let i = 0;
			v = v.div(1000);
			while(v.round().greaterThanOrEqualTo(1000) && i < this.format.length) {
				v = v.div(1000);
				base++;
                i++;
			}
            notationValue = this.format[Math.min(base, this.format.length - 1)];
		}

        if (n > 0) {
            if (v.greaterThanOrEqualTo(1000)) return this.formatText(v, false, n + 1);
            if (n == 1) {
                return `${Math.round(v.toNumber() * 1000) / 1000} ${notationValue} ${this.format[this.format.length - 1]}`
            }
            return `${Math.round(v.toNumber() * 1000) / 1000} ${notationValue} ${this.nth(n)} ${this.format[this.format.length - 1]}th`
        }

        if (v.greaterThanOrEqualTo(1000)) {
            return this.formatText(v, false, n + 1);
        }

        if (!value.isFinite()) return "Infinity";
        return ( Math.round(v.toNumber() * 1000) / 1000 ) + " " + notationValue;
    }
}