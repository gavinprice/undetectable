'use strict';

angular.module('labs').controller('LabController', ['$scope',
    function($scope) {
        $scope.labHeader = 'Lab Results';
        $scope.init = function() {

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
            /*var lab = new Lab({
                cd4: this.cd4Count,
                content: this.content
            });
            article.$save(function(response) {
                $location.path('articles/' + response._id);

                $scope.title = '';
                $scope.content = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });*/
        };
    }
]);