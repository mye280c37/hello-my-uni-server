const HOME = "/";

// API
const API = "/api";
const EACH_CONVERTER = "/converter/each";
const REVIEW_BOARD = "/review/board";
const REVIEW_POST = "/review/post";
const REVIEW_DELETE = "/review/delete";

// Contents
const REVIEW_READ = "/review/read";

// Converter
const CONVERTER = "/converter";
const UNIVERSITY = "/university";
const UNI_INFO_UPDATE = "/university/info/update";
const UNI_BOARD = "/university/board";

// Save Consulting Request
const CONSULTING_CREATE = "/consulting/create";
const CONSULTING_BOARD = "/consulting/board";
const CONSULTING_READ = "/consulting/read";
const CONSULTING_UPDATE = "/consulting/update";
const COMMENT_UPDATE = "/comment/update";
const COMMENT_DELETE = "/comment/delete";

const CHECK_ADMIN1 = "/admin1/code";
const CHECK_ADMIN2 = "/admin2/code";

const IMAGE_UPLOAD = "/upload";

const CONSULTING_DATE = "/consulting/date";
const CONSULTING_DATE_ADD = "/consulting/date/add";

// Description
const DESCRIPTION_CREATE = "/description/create";
const DESCRIPTION_LIST = "/description/list";
const DESCRIPTION_RETRIEVE = "/description/retrieve";
const DESCRIPTION_UPDATE = "/description/update";

const routes = {
    home: HOME,

    api: API,
    each_converter: EACH_CONVERTER,
    review_board: REVIEW_BOARD,
    review_post: REVIEW_POST,
    review_read: REVIEW_READ,
    review_delete: REVIEW_DELETE,

    converter: CONVERTER,
    university: UNIVERSITY,
    uni_info_update: UNI_INFO_UPDATE,
    uni_board: UNI_BOARD,

    consulting_create: CONSULTING_CREATE,
    consulting_board: CONSULTING_BOARD,
    consulting_read: CONSULTING_READ,
    consulting_update: CONSULTING_UPDATE,
    comment_update: COMMENT_UPDATE,
    comment_delete: COMMENT_DELETE,

    check_admin1: CHECK_ADMIN1,
    check_admin2: CHECK_ADMIN2,

    image_upload: IMAGE_UPLOAD,

    consulting_date: CONSULTING_DATE,
    consulting_date_add: CONSULTING_DATE_ADD,

    description_create: DESCRIPTION_CREATE,
    description_list: DESCRIPTION_LIST,
    description_retrieve: DESCRIPTION_RETRIEVE,
    description_update: DESCRIPTION_UPDATE
};

export default routes; 