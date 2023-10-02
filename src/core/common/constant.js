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
                label: "Danh mục lớp bản đồ",
                link: ROUTE_PATH.CATEGORY_LAYOUT_MAP,
                icon: <DatabaseOutlined />
            },
            {
                label: "Danh mục bài viết",
                link: ROUTE_PATH.CATEGORY_NEWS,
                icon: <DatabaseOutlined />
            },
            {
                label: "Danh mục dịch vụ du lịch",
                link: ROUTE_PATH.CATEGORY_SERVICE,
                icon: <DatabaseOutlined />
            },
            {
                label: "Quản lý lễ hội",
                link: ROUTE_PATH.FESTIVAL,
                icon: <ScheduleOutlined />
            },
            {
                label: "Quản lý đặc sản",
                link: ROUTE_PATH.SPECIALTY,
                icon: <TagsOutlined />
            },
            {
                label: "Quản lý bài viết",
                link: ROUTE_PATH.NEWS,
                icon: <ContainerOutlined />
            },
            {
                label: "Quản lý lịch trình",
                link: ROUTE_PATH.TOUR,
                icon: <EnvironmentOutlined />
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
        static parentId = "parentId"
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
            static label = "Ủy ban nhân dân Tỉnh";
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
            { label: "Ủy ban nhân dân Tỉnh", value: "COMMITTEE" },
            { label: "Sở VHTT&DL", value: "DEPARTMENT" },
            { label: "Người dân", value: "USER" },
        ]
    }
    static DefaultImage = "1"
    static CategoryConfig = class {
        static Location = class {
            static label = "Location";
            static value = 1;
        }
        static Stay = class {
            static value = 2;
            static label = "Lưu Trú";
        }
        static Cuisine = class {
            static value = 3;
            static label = "Ẩm Thức";
        }
        static Vehicle = class {
            static value = 4;
            static label = "Phương Tiện";
        }
        static Specialty = class {
            static value = 5;
            static label = "Đặc Sản";
        }
        static Tour = class {
            static value = 6;
            static label = "Tour";
        }
        static Festival = class {
            static value = 7;
            static label = "Lễ hội";
        }
        static News = class {
            static value = 8;
            static label = "Bài viết";
        }
        static list = [
            { label: "Địa Điểm Du Lịch", value: 1 },
            { label: "Lưu Trú", value: 2 },
            { label: "Ẩm Thức", value: 3 },
            { label: "Phương Tiện", value: 4 },
            { label: "Đặc Sản", value: 5 },
            { label: "Tour", value: 6 },
            { label: "Lễ hội", value: 7 },
            { label: "Bài viết", value: 8 },
        ]
    }
};