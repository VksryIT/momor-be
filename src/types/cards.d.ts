export type ICardCompnayInfo = {
    code: number;
    corpName: string;
};

export interface ISaveCardCompnayInfo {
    companyData: ICardCompnayInfo[];
}

export type ICardInfo = {
    cardId?: number;
    cardCorpId: number;
    cardName: string;
    payStartDay: number; // 이용기간 시작 일자
    payEndDay: number; // 이용기간 끝 일자
    payMonthCode: number; // 전전월 ~ 전월 or 전월 ~ 당원 여부 코드 (1 or 2)
    isCheckCard: boolean;
    myAccountId: number; // 연계 계좌 고유 번호
    paymentDay: number; // 이용요금 결제일
    useStatus: number;
    userId: number;
};

export interface IRespCardData {
    cardId: number;
    cardName: string;
    cardCorpId: number;
    payStartDay: number;
    payEndDay: number;
    payMonthCode: number;
    isCheckCard: boolean;
    myAccountId: number;
    paymentDay: number;
    useStatus: boolean;
}

export interface ISaveCardInfo {
    modifyCardData: ICardInfo[];
    addCardData: ICardInfo[];
}
