import { ContainerOutlined, DatabaseOutlined, EnvironmentOutlined, MessageOutlined, ProjectOutlined, ScheduleOutlined, TagsOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTE_PATH } from "./appRouter";

export default class Constants {
    static Menu = class {
        static List = [
            {
                label: "Quản lý người dùng",
                link: ROUTE_PATH.USER,
                icon: <UserOutlined />
            },
            {
                label: "Quản lý danh mục",
                link: ROUTE_PATH.CATEGORY,
                icon: <DatabaseOutlined />
            },
            {
                label: "Quản lý địa điểm",
                link: ROUTE_PATH.LOCATION,
                icon: <EnvironmentOutlined />
            },
            {
                label: "Quản lý tour",
                link: ROUTE_PATH.TOUR,
                icon: <ScheduleOutlined />
            },
            {
                label: "Quản lý tin tức",
                link: ROUTE_PATH.NEWS,
                icon: <ContainerOutlined />
            },
            {
                label: "Quản lý đánh giá",
                link: ROUTE_PATH.EVALUATE,
                icon: <TagsOutlined />
            },
            {
                label: "Quản lý quận huyện",
                link: ROUTE_PATH.DISTRICT,
                icon: <ProjectOutlined />
            },
        ]
    };
    static TOKEN = "token";
    static DEBOUNCE_SEARCH = 800;

    static Params = class {
        static limit = "limit";
        static page = "page";
        static searchName = "searchName";
        static idQuanHuyen = "idQuanHuyen";
        static idDanhMuc = "idDanhMuc";
    }

    static PaginationConfigs = class {
        static Size = 10;
        static SizeSearchPage = 8;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "50", value: 50 },
        ]
    };

    static UseParams = class {
        static Id = ":id"
    }

    static StatusUser = class {
        static ADMIN = class {
            static value = "ADMIN";
            static label = "Quản trị viên";
        }
        static COMMITTEE = class {
            static value = "COMMITTEE";
            static label = "Ủy ban nhân dân Tỉnh, các sở ban ngành Đắk Nông";
        }
        static DEPARTMENT = class {
            static value = "DEPARTMENT";
            static label = "Sở VHTT&DL";
        }
        static USER = class {
            static value = "USER";
            static label = "Người dân";
        }
        static List = [
            { label: "Quản trị viên", value: "ADMIN" },
            { label: "Ủy ban nhân dân Tỉnh, các sở ban ngành Đắk Nông", value: "COMMITTEE" },
            { label: "Sở VHTT&DL", value: "DEPARTMENT" },
            { label: "Người dân", value: "USER" },
        ]
    }
    static DefaultImage = "1"
};