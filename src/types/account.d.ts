export interface IAccountData {
    accountId?: number;
    userId?: number;
    assetTypeId: number;
    accountName: string;
    startAmount: number;
    startDate: string;
    useStatus: number;
}

export interface ISaveAccountInfo {
    modifyAccountData: IAccountData[];
    addAccountData: IAccountData[];
}
