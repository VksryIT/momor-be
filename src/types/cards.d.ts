export type ICardCompnayInfo = {
    code: number;
    corpName: string;
};

export interface ISaveCardCompnayInfo {
    companyData: ICardCompnayInfo[];
}

export type ISaveUserCardInfo = {
    cardCorpId: number;
    cardName: string;
    payStartDay: number; // 이용기간 시작 일자
    payEndDay: number; // 이용기간 끝 일자
    payMonthCode: number; // 전전월 ~ 전월 or 전월 ~ 당원 여부 코드 (1 or 2)
    isCheckCard: boolean;
    myAccountNo: number; // 연계 계좌 고유 번호
    paymentDay: number; // 이용요금 결제일
    useStatus: number;
    userId: number;
};

export type IUserCardInfo = {
    cardCorpId: number;
    cardCorpName: string;
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
