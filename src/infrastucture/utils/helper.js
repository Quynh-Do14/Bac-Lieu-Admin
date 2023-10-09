import moment from "moment";

export const DebounceInput = (func, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

export const ConfigStatusTour = (status) => {
    switch (status) {
        case 1:
            return <div style={{ color: "rgb(46, 125, 50)" }}>Hoạt động </div>
        case 2:
            return <div style={{ color: "rgb(211, 47, 47)" }}>Đã xóa </div>
    }
}

export const validateFields = (isImplicitChange = false, key, isCheck, setError, error, message) => {
    if (isImplicitChange) {
        error[key] = {
            isError: isCheck,
            message: message,
        };
    }
    else {
        setError({
            ...error,
            [key]: {
                isError: isCheck,
                message: message,
            }
        });
    }
};

export const convertDate = (date) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY/MM/DD hh:mm:ss");
    } return null;

};
export const convertDateOnly = (date) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY/MM/DD");
    } return null;
};

export const convertTimeOnly = (date) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("hh:mm");
    } return null;
};

export const reverseConvertDate = (inputDateString) => {
    const inputDate = new Date(inputDateString);

    // Format the date as "Thu, 26 Oct 2023 13:05:32 GMT"
    const formattedDate = inputDate.toUTCString();
    return formattedDate
}

export const reverseConvertTime = (inputTime) => {
    // Combine the date and time to create a new Date object
    const dateTimeString = `2023-09-24T${inputTime}:00.000Z`;
    const formattedDateTime = new Date(dateTimeString).toISOString();

    console.log(formattedDateTime)
    return formattedDateTime
}