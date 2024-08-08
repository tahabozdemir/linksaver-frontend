export enum ForgotPasswordError {
    EXPIRED_CODE = 'ExpiredCodeException',
    MISMATCH_CODE = 'CodeMismatchException',
    LIMIT_EXCEED = 'LimitExceededException',
    INVALID_PARAMETER = 'InvalidParameterException',
}