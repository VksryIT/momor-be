const message = {
    NOT_FOUND: 'NOT_FOUND',
    BAD_REQUEST: 'BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
    USER_SESSION_NOT_MATCH: 'USER_SESSION_NOT_MATCH', //'Session user info is not matched',
    DUPLICATE_RESOURCE: 'DUPLICATE_RESOURCE', // duplicate resource

    // 유저 생성
    // USER_POST_SUCCESS: 'User created successfully',
    // USER_GET_SUCCESS: 'User get successfully',
    // USER_PUT_SUCCESS: 'User modify successfully',
    // USER_DELETE_SUCCESS: 'User delete successfully',
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS', //'username already exists',

    //로그인, 로그아웃
    // USER_LOGIN_SUCCESS: 'User login successfully',
    // USER_LOGIN_FAILED: 'User login failed',
    USER_WRONG_PASSWORD: 'USER_WRONG_PASSWORD', //'Wrong user password',
    USER_NOT_EXISTS: 'USER_NOT_EXISTS', //'User not exists',
    // USER_LOGIN_ALREADY: 'User already loggined',
    // USER_LOGOUT_SUCCESS: 'User logout successfully',
    ABNORMAL_LOGOUT: 'ABNORMAL_LOGOUT',
    // USER_NO_USER_TO_LOGOUT: 'USER_NO_USER_TO_LOGOUT', //'No user to logout',

    // 통장 관리
    // ACCOUNT_POST_SUCCESS: 'Account created or updated successfully',
    // ACCOUNT_POST_: 'Account created successfully',
    // ACCOUNT_GET_SUCCESS: 'User account get successfully',
    // ACCOUNT_PUT_SUCCESS: 'User account modifiy successfully',
    // ACCOUNT_DELETE_SUCCESS: 'User account delete successfully',
    // ACCOUNT_ASSET_TYPE_SUCCESS: 'Account asset type get successfully',

    //카드 관리
    // CARD_COMPANY_POST_SUCCESS: 'Card company created successfully',
    // CARD_COMPANY_GET_SUCCESS: 'Get card companies successfully',
    // CARD_USER_GET_SUCCESS: 'Get user cards successfully',
};

export = message;
