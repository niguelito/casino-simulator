import { PrizeType } from "react-roulette-pro";
import m0_2x from "./assets/0_2.png";
import m0_5x from "./assets/0_5.png";
import m1_0x from "./assets/1_0.png";
import m1_1x from "./assets/1_1.png";
import m1_2x from "./assets/1_2.png";
import m1_5x from "./assets/1_5.png";
import m2_0x from "./assets/2_0.png";
import m3_0x from "./assets/3_0.png";
import m5_0x from "./assets/5_0.png";
import m10_0x from "./assets/10_0.png";
import m25_0x from "./assets/25_0.png";
import m50_0x from "./assets/50_0.png";
import m100_0x from "./assets/100_0.png";

// export default function prizes(): PrizeType[] {
//     const prizes: PrizeType[] = [];
//     let r = 0;

//     function w(i: number, p: {image: string, text: string}) {
//         for (let j = 0; j < i; j++) {
//             prizes.push({id: r, image: p.image, text: p.text});
//             r++;
//         };
//     }
    
//     w(5, {image: m0_2x, text: "0.2"});
//     w(15, {image: m0_5x, text: "0.5"});
//     w(20, {image: m1_0x, text: "1"});
//     w(15, {image: m1_1x, text: "1.1"});
//     w(10, {image: m1_2x, text: "1.2"});
//     w(5, {image: m1_5x, text: "1.5"});
//     w(10, {image: m2_0x, text: "2"});
//     w(7, {image: m3_0x, text: "3"});
//     w(3, {image: m5_0x, text: "5"});
//     w(5, {image: m10_0x, text: "10"});
//     w(3, {image: m25_0x, text: "25"});
//     w(2, {image: m50_0x, text: "50"});
//     w(1, {image: m100_0x, text: "100"});

//     function shuffle(array: PrizeType[]) {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [array[i], array[j]] = [array[j], array[i]];
//         }
//     }

//     shuffle(prizes);
//     return prizes;
// }

export default function prizes(): PrizeType[] {
    return [
        {
            "id": 72,
            "image": m2_0x,
            "text": "2"
        },
        {
            "id": 69,
            "image": m1_5x,
            "text": "1.5"
        },
        {
            "id": 2,
            "image": m0_2x,
            "text": "0.2"
        },
        {
            "id": 35,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 51,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 76,
            "image": m2_0x,
            "text": "2"
        },
        {
            "id": 33,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 32,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 77,
            "image": m2_0x,
            "text": "2"
        },
        {
            "id": 42,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 23,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 99,
            "image": m50_0x,
            "text": "50"
        },
        {
            "id": 58,
            "image": m1_2x,
            "text": "1.2"
        },
        {
            "id": 87,
            "image": m5_0x,
            "text": "5"
        },
        {
            "id": 63,
            "image": m1_2x,
            "text": "1.2"
        },
        {
            "id": 28,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 83,
            "image": m3_0x,
            "text": "3"
        },
        {
            "id": 9,
            "image": m0_5x,
            "text": "0.5"
        },
        {
            "id": 62,
            "image": m1_2x,
            "text": "1.2"
        },
        {
            "id": 93,
            "image": m10_0x,
            "text": "10"
        },
        {
            "id": 94,
            "image": m10_0x,
            "text": "10"
        },
        {
            "id": 34,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 0,
            "image": m0_2x,
            "text": "0.2"
        },
        {
            "id": 10,
            "image": m0_5x,
            "text": "0.5"
        },
        {
            "id": 45,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 78,
            "image": m2_0x,
            "text": "2"
        },
        {
            "id": 16,
            "image": m0_5x,
            "text": "0.5"
        },
        {
            "id": 12,
            "image": m0_5x,
            "text": "0.5"
        },
        {
            "id": 73,
            "image": m2_0x,
            "text": "2"
        },
        {
            "id": 24,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 61,
            "image": m1_2x,
            "text": "1.2"
        },
        {
            "id": 92,
            "image": m10_0x,
            "text": "10"
        },
        {
            "id": 37,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 96,
            "image": m25_0x,
            "text": "25"
        },
        {
            "id": 86,
            "image": m3_0x,
            "text": "3"
        },
        {
            "id": 84,
            "image": m3_0x,
            "text": "3"
        },
        {
            "id": 46,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 82,
            "image": m3_0x,
            "text": "3"
        },
        {
            "id": 53,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 95,
            "image": m25_0x,
            "text": "25"
        },
        {
            "id": 100,
            "image": m100_0x,
            "text": "100"
        },
        {
            "id": 60,
            "image": m1_2x,
            "text": "1.2"
        },
        {
            "id": 47,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 7,
            "image": m0_5x,
            "text": "0.5"
        },
        {
            "id": 88,
            "image": m5_0x,
            "text": "5"
        },
        {
            "id": 31,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 18,
            "image": m0_5x,
            "text": "0.5"
        },
        {
            "id": 71,
            "image": m2_0x,
            "text": "2"
        },
        {
            "id": 14,
            "image": m0_5x,
            "text": "0.5"
        },
        {
            "id": 49,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 4,
            "image": m0_2x,
            "text": "0.2"
        },
        {
            "id": 3,
            "image": m0_2x,
            "text": "0.2"
        },
        {
            "id": 8,
            "image": m0_5x,
            "text": "0.5"
        },
        {
            "id": 90,
            "image": m10_0x,
            "text": "10"
        },
        {
            "id": 97,
            "image": m25_0x,
            "text": "25"
        },
        {
            "id": 80,
            "image": m3_0x,
            "text": "3"
        },
        {
            "id": 89,
            "image": m5_0x,
            "text": "5"
        },
        {
            "id": 54,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 56,
            "image": m1_2x,
            "text": "1.2"
        },
        {
            "id": 81,
            "image": m3_0x,
            "text": "3"
        },
        {
            "id": 57,
            "image": m1_2x,
            "text": "1.2"
        },
        {
            "id": 1,
            "image": m0_2x,
            "text": "0.2"
        },
        {
            "id": 30,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 21,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 48,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 59,
            "image": m1_2x,
            "text": "1.2"
        },
        {
            "id": 17,
            "image": m0_5x,
            "text": "0.5"
        },
        {
            "id": 13,
            "image": m0_5x,
            "text": "0.5"
        },
        {
            "id": 29,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 20,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 40,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 19,
            "image": m0_5x,
            "text": "0.5"
        },
        {
            "id": 38,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 44,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 41,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 36,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 26,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 39,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 67,
            "image": m1_5x,
            "text": "1.5"
        },
        {
            "id": 11,
            "image": m0_5x,
            "text": "0.5"
        },
        {
            "id": 85,
            "image": m3_0x,
            "text": "3"
        },
        {
            "id": 64,
            "image": m1_2x,
            "text": "1.2"
        },
        {
            "id": 43,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 25,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 27,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 68,
            "image": m1_5x,
            "text": "1.5"
        },
        {
            "id": 52,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 91,
            "image": m10_0x,
            "text": "10"
        },
        {
            "id": 75,
            "image": m2_0x,
            "text": "2"
        },
        {
            "id": 6,
            "image": m0_5x,
            "text": "0.5"
        },
        {
            "id": 66,
            "image": m1_5x,
            "text": "1.5"
        },
        {
            "id": 5,
            "image": m0_5x,
            "text": "0.5"
        },
        {
            "id": 98,
            "image": m50_0x,
            "text": "50"
        },
        {
            "id": 70,
            "image": m2_0x,
            "text": "2"
        },
        {
            "id": 74,
            "image": m2_0x,
            "text": "2"
        },
        {
            "id": 79,
            "image": m2_0x,
            "text": "2"
        },
        {
            "id": 50,
            "image": m1_1x,
            "text": "1.1"
        },
        {
            "id": 22,
            "image": m1_0x,
            "text": "1"
        },
        {
            "id": 55,
            "image": m1_2x,
            "text": "1.2"
        },
        {
            "id": 65,
            "image": m1_5x,
            "text": "1.5"
        },
        {
            "id": 15,
            "image": m0_5x,
            "text": "0.5"
        }
    ];
}