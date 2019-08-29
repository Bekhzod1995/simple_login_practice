export const authLink = 'http://134.209.90.194:8025/admin/auth/';
export const getUsersListLink = 'http://134.209.90.194:8025/admin/users/';

export const setListPageAndSize = (currentPage, pageSize) => {
    return `http://134.209.90.194:8025/admin/answers?page=${currentPage}&page_size=${pageSize}`;
};

export const getAndpatchUser = id => `http://134.209.90.194:8025/admin/users/${id}`;
