import { Document } from 'mongoose'
import { Request } from 'express'

export interface IUser extends Document {
    name: string
    account: string
    password: string
    avatar: string
    role: string
    type: string
    rf_token?: string
    _doc: Object
}


export interface INewUser {
    name: string
    account: string
    password: string
}

export interface IDecodedToken {
    id: string
    newUser?: INewUser
    iat: number
    exp: number
}

export interface IGgPayload {
    email: string
    email_verified: boolean
    name: string
    picture: string
}

export interface IUserParams {
    name: string
    account: string
    password: string
    avatar?: string
    type: string
    _doc?: Object
}

export interface IReqAuth extends Request {
    user?: IUser
}

export interface IComment extends Document {
    user: Object
    blog_id: string
    blog_user_id: string
    content: string
    replyCM: string[]
    reply_user: string
    comment_root: string
    _doc: Object
}

export interface IBlog extends Document {
    user: string
    title: string
    content: string
    description: string
    thumbnail: string
    category: string
    _doc: Object
}