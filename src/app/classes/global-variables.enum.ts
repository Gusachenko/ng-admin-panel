export enum DEPARTMENT_LIST {
    personnelMenegment = "Департамент управления персоналом",
    menegmentOfRisks = "Департамент управления рисками"
};

export enum POSITION_LSIT {
    administrator = "Администратор",
    secretary = "Секретарь",
    chief = "Начальник",
    director = "Директор"
};

export enum ACCESSES_LIST {
    openDeposit = "Создание депозита",
    closeDeposit = "Закрытие депозита",
    approveCredit = "Одобрение кредита",
    approveAccountOpen = "Одобрение открытие счета"
};


export const EnumToObjectArray = (enumElement: any): any[] => {
    let bufArray = [];
    for (var key in enumElement) {
        if (enumElement.hasOwnProperty(key)) {
            var element = enumElement[key];
            bufArray.push({ 'key': key, 'value': element });

        }
    }
    return bufArray;
}