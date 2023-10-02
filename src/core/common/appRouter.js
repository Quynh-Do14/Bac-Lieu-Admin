const PREFIX = "";

export const ROUTE_PATH = {
    LOGIN: `${PREFIX}/login`,
    REGISTER: `${PREFIX}/register`,

    USER: `${PREFIX}/user`,
    VIEW_USER: `${PREFIX}/user/view/:id`,
    ADD_USER: `${PREFIX}/user/add`,

    CATEGORY_LAYOUT_MAP: `${PREFIX}/category-layout-map`,
    VIEW_CATEGORY_LAYOUT_MAP: `${PREFIX}/category-layout-map/view/:id`,
    ADD_CATEGORY_LAYOUT_MAP: `${PREFIX}/category-layout-map/add`,

    CATEGORY_NEWS: `${PREFIX}/category_news`,
    VIEW_CATEGORY_NEWS: `${PREFIX}/category_news/view/:id`,
    ADD_CATEGORY_NEWS: `${PREFIX}/category_news/add`,

    CATEGORY_SERVICE: `${PREFIX}/category_service`,
    VIEW_CATEGORY_SERVICE: `${PREFIX}/category_service/view/:id`,
    ADD_CATEGORY_SERVICE: `${PREFIX}/category_service/add`,

    SPECIALTY: `${PREFIX}/specialty`,
    VIEW_SPECIALTY: `${PREFIX}/specialty/view/:id`,
    ADD_SPECIALTY: `${PREFIX}/specialty/add`,

    FESTIVAL: `${PREFIX}/festival`,
    VIEW_FESTIVAL: `${PREFIX}/festival/view/:id`,
    ADD_FESTIVAL: `${PREFIX}/festival/add`,

    NEWS: `${PREFIX}/news`,
    VIEW_NEWS: `${PREFIX}/news/view/:id`,
    ADD_NEWS: `${PREFIX}/news/add`,

    TOUR: `${PREFIX}/tour`,
    VIEW_TOUR: `${PREFIX}/tour/view/:id`,
    ADD_TOUR: `${PREFIX}/tour/add`,

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
        static CategoryByParentId = "/danhmuc/parentId";
        static Location = "/diadiem";
        static News = "/tintuc";
        static Evaluate = "/danhgia";
        static District = "/quanhuyen";
        static Upload = "/files/upload";
        static MultiUpload = "/files/upload-multi";
    }
};