const PREFIX = "";

export const ROUTE_PATH = {
    LOGIN: `${PREFIX}/login`,
    REGISTER: `${PREFIX}/register`,

    USER: `${PREFIX}/user`,
    VIEW_USER: `${PREFIX}/user/view/:id`,
    ADD_USER: `${PREFIX}/user/add`,

    CATEGORY: `${PREFIX}/category`,
    VIEW_CATEGORY: `${PREFIX}/category/view/:id`,
    ADD_CATEGORY: `${PREFIX}/category/add`,

    LOCATION: `${PREFIX}/location`,
    VIEW_LOCATION: `${PREFIX}/location/view/:id`,
    ADD_LOCATION: `${PREFIX}/location/add`,

    TOUR: `${PREFIX}/tour`,
    VIEW_TOUR: `${PREFIX}/tour/view/:id`,
    ADD_TOUR: `${PREFIX}/tour/add`,

    NEWS: `${PREFIX}/news`,
    VIEW_NEWS: `${PREFIX}/news/view/:id`,
    ADD_NEWS: `${PREFIX}/news/add`,

    EVALUATE: `${PREFIX}/evaluate`,
    VIEW_EVALUATE: `${PREFIX}/evaluate/view/:id`,
    ADD_EVALUATE: `${PREFIX}/evaluate/add`,

    DISTRICT: `${PREFIX}/district`,
    VIEW_DISTRICT: `${PREFIX}/district/view/:id`,
    ADD_DISTRICT: `${PREFIX}/district/add`,

    MAINLAYOUT: `${PREFIX}/`,
};
export class Endpoint {
    static Auth = class {
        static Login = "/auth/login";
    }

    static Module = class {
        static Tour = "/tour";
        static User = "/user";
        static Category = "/danhmuc";
        static Location = "/diadiem";
        static News = "/tintuc";
        static Evaluate = "/danhgia";
        static District = "/quanhuyen";
        static Upload = "/files/upload";
        static MultiUpload = "/files/upload-multi";
    }
};