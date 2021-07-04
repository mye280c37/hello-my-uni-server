const HOME = "/";

// API
const API = "/api";
const EACH_CONVERTER = "/converter/each";
const EDU_VIDEO = "/edu/contents/video";
const REVIEW_BOARD = "/review/board";
const REVIEW_POST = "/review/post";

// Contents
const CONTENTS = "/contents";
const REVIEW_READ = "/review/read";

// Converter
const CONVERTER = "/converter";
const UNIVERSITY = "/university";
const UNI_INFO_UPDATE = "/university/info/update";
const UNI_BOARD = "/universiy/board";

// Save Consulting Request
const CONSULTING_CREATE = "/consulting/create";
const CONSULTING_BOARD = "/consulting/board";
const CONSULTING_UPDATE = "/consulting/update";

const CHECK_ADMIN1 = "/admin1/code";
const CHECK_ADMIN2 = "/admin2/code";

const IMAGE_UPLOAD = "/upload";

const routes = {
    home: HOME,

    api: API,
    each_converter: EACH_CONVERTER,
    edu_video: EDU_VIDEO,
    review_board: REVIEW_BOARD,
    review_post: REVIEW_POST,
    review_read: REVIEW_READ,
    
    contents: CONTENTS,

    converter: CONVERTER,
    university: UNIVERSITY,
    uni_info_update: UNI_INFO_UPDATE,
    uni_board: UNI_BOARD,

    consulting_create: CONSULTING_CREATE,
    consulting_board: CONSULTING_BOARD,
    consulting_update: CONSULTING_UPDATE,

    check_admin1: CHECK_ADMIN1,
    check_admin2: CHECK_ADMIN2,

    image_upload: IMAGE_UPLOAD
};

export default routes; 