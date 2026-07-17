import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getServerHttpCookies, ICookies, setServerHttpHeaders } from "@rock.chen/icms-http-client"
import { ICMSServer } from "icms-api";

export async function proxy(request: NextRequest) {
    //获取Cookies
    const readCookies = await cookies();
    const c: ICookies = {
        get(key) {
            return readCookies.get(key)?.value;
        },
    }
    const httpOpts = getServerHttpCookies(c);
    //Cookies存在icms必需的参数，直接放行
    if (httpOpts.lang && httpOpts.websiteId && httpOpts.websiteNo) {
        setServerHttpHeaders({
            set(key, value) {
                request.headers.set(key, value)
            }
        }, httpOpts)
        return NextResponse.next();
    }
    //不存在时获取默网站设置Cookies
    const response = NextResponse.next();
    const icms = new ICMSServer(c);
    await icms.helloWebsite({
        set(key, value) {
            response.cookies.set(key, value);
        },
    })
    return response;
}

export const config = {
    matcher: [
        '/((?!trpc|_next|_vercel|.*\\..*).*)', //排除规则
        '/static/:path*'                           //这是例外静态资源转发
    ]
}