const getAjaxPromise = function (params) {
    let key;
    const defaultParams = {
        url: '/',
        method: 'GET',
        data: {},
        onOpened: function () { },
        onHeadersReceived: function () { },
        onLoading: function () { },
        onProgress: function (loadedProportion) { },
    };
    params = params || {};
    Object.setPrototypeOf(params, defaultParams);
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            switch (this.readyState) {
                case XMLHttpRequest.OPENED:
                    params.onOpened();
                    break;
                case XMLHttpRequest.HEADERS_RECEIVED:
                    params.onHeadersReceived();
                    break;
                case XMLHttpRequest.LOADING:
                    params.onLoading();
                    break;
                case XMLHttpRequest.DONE:
                    if (this.status === 200) {
                        resolve(this.responseText);
                    } else {
                        reject('Wrong Status: ' + this.status);
                    }
                    break;
            }
        };
        request.addEventListener('progress', function (e) {
            if (e.lengthComputable) {
                params.onProgress(e.loaded / e.total);
            }
        });
        request.addEventListener('error', function (e) {
            reject('Error: ' + e.detail);
        });
        request.addEventListener('abort', function (e) {
            reject('Aborted: ' + e.detail);
        });
        request.addEventListener('timeout', function (e) {
            reject('TimeOut: ' + e.detail);
        });
        request.open(params.method, params.url);

        const codifiedDataArray = [];
        for (key in params.data) {
            if (params.data.hasOwnProperty(key)) {
                let value = params.data[key];
                if (typeof value === 'object' && !Array.isArray(value)) {
                    value = JSON.stringify(value);
                }
                codifiedDataArray.push(key + '=' + encodeURIComponent(value));
            }
        }
        request.setRequestHeader(
            'Content-type',
            'application/x-www-form-urlencoded'
        );
        request.send(codifiedDataArray.join('&'));
    });
};

export default getAjaxPromise;
