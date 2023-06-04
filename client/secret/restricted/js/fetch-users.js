import Axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';

let fetch_size = 10;
let first_index = 0;

(async () => {
    const users_listing = (await Axios.get(`/users/list-users?size=${fetch_size};first_index=${first_index}`)).data;
    if(users_listing) {
        const users_list = document.getElementById('users-list');
    }
})();