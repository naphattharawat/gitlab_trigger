
var axios = require("axios").default;
export class RequestModel {

  trigger(url, data, header) {
    var options = {
      method: 'POST',
      url: url,
      headers: {
        'x-gitlab-event': header['x-gitlab-event'],
        'x-gitlab-event-uuid': header['x-gitlab-event-uuid'],
        'x-gitlab-instance': header['x-gitlab-instance'],
        'x-gitlab-token': header['x-gitlab-token'],
        'x-gitlab-webhook-uuid': header['x-gitlab-webhook-uuid']
      },
      data: data
    };
    return new Promise<void>((resolve, reject) => {
      axios.request(options).then(function (response) {
        resolve(response.data);
      }).catch(function (error) {
        // console.log(error);
        resolve(error.response.data);
      });
    })
  }
}