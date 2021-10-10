import { Request, Response, NextFunction } from 'express'

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { name, account, password } = req.body

    const errors = [];

    if (!name) {
        errors.push("Hãy nhập tên.")
    } else if (name.length > 20) {
        errors.push("Tên không quá 20 kí tự.")
    }

    if (!account) {
        errors.push("Hãy nhập tài khoản.")
    } else if (!validPhone(account) && !validateEmail(account)) {
        errors.push("Nhập đúng định dạng email hoặc số điện thoại.")
    }

    if (password.length < 6) {
        errors.push("Mật khẩu tối thiểu 6 kí tự.")
    }

    if (errors.length > 0) return res.status(400).json({ msg: errors })
    next();
}

export function validPhone(phone: string) {
    const re = /^[+]/g
    return re.test(phone)
}

export function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}