import Axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';

(async () => {
    window.user = (await Axios.get('/sessions/user')).data;
    let search_and_settings = document.getElementById('search-and-settings');
    
    if(user.role == 'guest') {
        const login_item = document.createElement('li');
        login_item.classList.add('nav-item');
        login_item.innerHTML = `
        <a href="/sessions/login.html" class="btn btn-outline-primary m-2">
            <i class="bi bi-person-circle"></i>
        </a>
        `;

        search_and_settings.append(login_item);
        return;
    }
    else {
        const logout_item = document.createElement('li');
        logout_item.classList.add('nav-item');
        logout_item.innerHTML = `
        <form action="/sessions/logout" method="POST">
            <button class="btn btn-outline-primary m-2" type="submit">
                <i class="bi bi-box-arrow-right"></i>
            </button>
        </form>
        `;

        const user_item = document.createElement('li');
        user_item.classList.add('nav-item');
        user_item.innerHTML = `
        <a href="/users/${user.account_number}.html" class="btn btn-outline-primary m-2">
            <i class="bi bi-person-circle"></i>
        </a>
        `;

        search_and_settings.append(logout_item, user_item);
        if(user.role == 'administrator') {
            const management_item = document.createElement('li');
            management_item.classList.add('nav-item');
            management_item.innerHTML = `
            <a href="/users/administration.html" class="btn btn-outline-primary m-2">
                <i class="bi bi-gear"></i>
            </a>
            `;
            search_and_settings.append(management_item);
        }
    }
})();