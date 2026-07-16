import { ICMSServer } from "icms-api";
import { cookies } from "next/headers";

export const buildServer = async () => {
    const c = await cookies();
    return new ICMSServer({
        get(key) {
            return c.get(key)?.value;
        },
    });
}
//单例不适用多语言站点(每次请求cookies是会发变化的,而这里静态不能满足这点)
// const c = await cookies();
// export const icms = new ICMSServer({
//     get(key) {
//         return c.get(key)?.value;
//     },
// });