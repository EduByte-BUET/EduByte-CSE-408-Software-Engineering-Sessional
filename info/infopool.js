const database = require('../database_connection/db');

async function connectToDB() {
    database.connectToDB();
}

async function courseCategory() {
    let sql = 
    `SELECT DISTINCT category FROM COURSE`;
    
    return (await database.execute(sql, [], database.options)).rows;
}

async function getMyCourseList(user_id) {
    let sql = `SELECT title
    FROM COURSE
    WHERE courseid=(SELECT courseid
        FROM COURSE_TAKEN
        WHERE userid=:user_id)`;

    return (await database.execute(sql, [user_id], database.options)).rows;
}

async function getPopularCourses() {
    let sql = 
    `SELECT title, popularity
    FROM COURSE
    ORDER BY popularity DESC
    FETCH FIRST 5 ROWS ONLY`;

    return (await database.execute(sql, [], database.options)).rows;
}

async function getCourseListFromCategory(category) {
    let sql = 
    `SELECT title
    FROM COURSE
    WHERE CATEGORY = :category`;
    
    return (await database.execute(sql, [category], database.options)).rows;
}

async function auth_user(email) {
    let sql = `SELECT first_name, email, pass FROM user_login WHERE email = :email`;

    let user = (await database.execute(sql, [email], database.options)).rows;
    return user;
}

async function getUserInfo(username, pass) {
    let sql = `SELECT user_id, auth_type FROM user_info WHERE username = :username and hashed_password = :pass`;

    return (await database.execute(sql, [username, pass], database.options)).rows;
}

async function getLearnerCount(course_id) {
    let sql = `SELECT COUNT(*) AS ENROLLED
    FROM COURSE_TAKEN
    WHERE courseid=:course_id`;

    return (await database.execute(sql, [course_id], database.options)).rows;
}

async function isEnrolled(course_id, user_id) {
    let sql = `SELECT COUNT(*) AS HAS_ENROLLED
    FROM COURSE_TAKEN
    WHERE courseid=:course_id AND userid=:user_id`;

    return (await database.execute(sql, [course_id, user_id], database.options)).rows;
}

async function getCourseDescription(course_id) {
    let sql = `SELECT title, description, total_contents, avg_duration, intro, block_count, category
    FROM COURSE
    WHERE courseid=:course_id`;

    return (await database.execute(sql, [course_id], database.options)).rows;
}

async function getCourseId(course_name) {
    let sql = `SELECT courseid
    FROM COURSE
    WHERE title=:course_name`;

    return (await database.execute(sql, [course_name], database.options)).rows;
}

async function addCourse(course_id, user_id, current_date) {
    let sql = `INSERT INTO COURSE_TAKEN (COURSEID, USERID, LAST_ACCESS_DATE, ENROLLMENT_DATE) VALUES (:course_id, :user_id, :current_date, :current_date)`;

    await database.execute(sql, [course_id, user_id, current_date, current_date], database.options);
}

async function getCourseBlocks(course_id) {
    let sql = `SELECT title, serial
    FROM BLOCK
    WHERE course_id=:course_id`;

    return (await database.execute(sql, [course_id], database.options)).rows;
}

async function getLectureInfoFromBlock(blockname) {
    let sql = `SELECT title
    FROM LECTURE
    WHERE block_id = (SELECT block_id FROM BLOCK WHERE TITLE=:blockname)`;

    return (await database.execute(sql, [blockname], database.options)).rows;
}


async function getMovieInfo(movie_id) {
    let sql = 'SELECT * from movie_list WHERE movie_id = :movie_id';

    const binds = {
        movie_id : movie_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}


module.exports = {  connectToDB,
                    auth_user,
                    getPopularCourses,
                    getMyCourseList,
                    getCourseId,
                    courseCategory, 
                    getCourseListFromCategory,
                    getUserInfo,
                    getLearnerCount,
                    isEnrolled,
                    getCourseDescription,
                    addCourse,
                    getCourseBlocks,
                    getLectureInfoFromBlock
};