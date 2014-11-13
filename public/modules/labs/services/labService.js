//labs service used for communicating with the labs REST endpoints
angular.module('labs').factory('Labs', ['$resource',
    function($resource) {
        return $resource('labs/:labId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);