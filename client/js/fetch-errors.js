import Axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';

(async () => {
    const messages = (await Axios.get('/errors/data')).data;
    if(messages) {
        const error_panel = document.getElementById('error-panel');
        for(let message in messages) {
            const error_div = document.createElement('div');
            error_div.classList.add('alert', 'alert-danger', 'd-flex', 'justify-content-center');
            error_div.innerHTML = `<p>${messages[message]}</p>`;
            error_panel.append(error_div);
        }
    }
})();