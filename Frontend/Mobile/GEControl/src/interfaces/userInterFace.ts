export interface registerFormData extends Document{
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
};
export interface loginFormData extends Document{
    username: string;
    password: string;
};
export interface logoutFormData extends Document{
    token: string;
};
export interface getCodeResetPasswordFormData extends Document{
    email: string;
};
export interface checkCodeResetPasswordFormData extends Document{
    email: string;
    code: string[];
};
export interface resetPasswordFormData extends Document{
    email: string;
    code: string[];
    newPassword: string;
    confirmNewPassword?: string;
};
