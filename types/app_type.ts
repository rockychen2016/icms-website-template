
// 用户相关
export interface LoginUser {
    id: string
    name: string
    sex: 0 | 1 | 2
    username: string
    phone?: string
    email?: string
    headImg?: string
    nickname?: string
    enabled: boolean
    socketOnline: boolean
    createTime: string
    lastLoginTime?: string
    token: string
    userType: number
    userFrom: number
    tokenExpired: number
    extFields?: {
    }
  }
  
export interface AppState{
    user: LoginUser | null
    isAuthenticated: boolean
    locale?:string
}