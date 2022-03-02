// export function getCurrentDate () => {
//     // 获得当前时间
//     return new Date();
// } 

// export function getCurrentWeek () => {
//     let startStop = new Array();
//     retrun startStop;
// }

// export class DateUtil {

//     /**
//      * 格式化时间
//      * @param strDate 
//      * @param strFormat
//      */

//     public static formatDate(strDate: any, strFormat: string): string {
//         if (!strDate) {
//             return "";
//         }
//         if (!strFormat) {
//             strFormat = "yyyy-MM-dd";
//         }

//         switch (typeof strFormat) {
//             case "string":
//                 strDate = new Date(strDate.replace(/-/, "/"));
//                 break;
//             case "number":
//                 strDate = new Date(strDate);
//                 break;
//         }

//         if (strDate instanceof Date) {
//             const dict : any = {
//                 yyyy: strDate.getFullYear(),
//                 M: strDate.getMonth() + 1,
//                 d: strDate.getDate(),
//                 H: strDate.getHours(),
//                 m: strDate.getMinutes(),
//                 s: strDate.getSeconds(),
//                 MM: ("" + (strDate.getMonth() + 101)).substr(1),
//                 dd: ("" + (strDate.getDate() + 100)).substr(1),
//                 HH: ("" + (strDate.getHours() + 100)).substr(1),
//                 mm: ("" + (strDate.getMinutes() + 100)).substr(1),
//                 ss: ("" + (strDate.getSeconds() + 100)).substr(1)
//             }
//         }

//         return strFormat.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, () => {
//             return dict[arguments[0]];
//         })
//     }
// }