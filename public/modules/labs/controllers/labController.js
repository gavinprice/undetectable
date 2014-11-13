'use strict';

angular.module('labs')

    // TODO refactor into its own service - didnt seem to work before
    .factory('Labs', ['$resource',
        function($resource) {
            return $resource('labs/:labId', {
                articleId: '@_id'
            }, {
                update: {
                    method: 'PUT'
                }
            });
    }])

    .controller('LabController', ['$scope', '$location', 'Labs',
    function($scope, $location, Labs) {
        $scope.labHeader = 'Lab Results';
        $scope.init = function() {

        };
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.findLatestLab = function(){
            var lab = {
                labDate: '2014-01-21',
                undetectable: true,
                cd4: 200,
                viralLoad: 50
            }
            $scope.lab = lab;
        }

        $scope.create = function() {
            var lab = new Labs({
                cd4: this.cd4,
                undetectable: this.undetectable,
                labDate: this.labDate,
                viralLoad: this.viralLoad
            });
            lab.$save(function(response) {
                $location.path('lab/' + response._id);
                $scope.msg = response;

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);