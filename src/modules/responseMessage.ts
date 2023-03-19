const message = {
    NULL_VALUE: 'No request value',
    NOT_FOUND: 'Resouce not found',
    BAD_REQUEST: 'Bad request',
    INTERNAL_SERVER_ERROR: 'Internal error',
    NOT_AUTHENTICATED: 'Not Authenticated',
    USER_SESSION_NOT_MATCH: 'Session user info is not matched',

    // 유저 생성
    USER_POST_SUCCESS: 'User created successfully',
    USER_GET_SUCCESS: 'User get successfully',
    USER_PUT_SUCCESS: 'User modify successfully',
    USER_DELETE_SUCCESS: 'User delete successfully',
    USER_ALREADY_EXISTS: 'username already exists',

    //로그인, 로그아웃
    USER_LOGIN_SUCCESS: 'User login successfully',
    USER_LOGIN_FAILED: 'User login failed',
    USER_WRONG_PASSWORD: 'Wrong user password',
    USER_NOT_EXISTS: 'User not exists',
    USER_LOGIN_ALREADY: 'User already loggined',
    USER_LOGOUT_SUCCESS: 'User logout successfully',
    USER_NO_USER_TO_LOGOUT: 'No user to logout',

    // 통장 관리
    ACCOUNT_POST_SUCCESS: 'Account created or updated successfully',
    ACCOUNT_POST_: 'Account created successfully',
    ACCOUNT_GET_SUCCESS: 'User account get successfully',
    ACCOUNT_PUT_SUCCESS: 'User account modifiy successfully',
    ACCOUNT_DELETE_SUCCESS: 'User account delete successfully',
    ACCOUNT_ASSET_TYPE_SUCCESS: 'Account asset type get successfully',
};

export = message;