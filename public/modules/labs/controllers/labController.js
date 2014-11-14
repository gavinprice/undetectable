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



    .controller('LabController', ['$scope','$stateParams', '$location','$filter', 'Labs',
    function($scope, $stateParams, $location, $filter, Labs) {

        $scope.addlineData = function(data, labels){
            return {
                labels: labels,
                datasets: [
                    {
                        label: "dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "blue",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "green",
                        pointHighlightFill: "red",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: data
                        //data: [65, 59, 80, 81, 56, 55, 40]
                    }

                ]
            }

        };

       

        $scope.pieOptions =  {
            // Chart.js options can go here.
            scaleShowLabels: true,  // Interpolated JS string - can access value
            scaleLabel: "12",
            // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
            scaleIntegersOnly: true,

            // String - Scale label font declaration for the scale label
            scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Scale label font size in pixels
            scaleFontSize: 12,

            // String - Scale label font weight style
            scaleFontStyle: "normal",

            // String - Scale label font colour
            scaleFontColor: "#666",

            // Boolean - whether or not the chart should be responsive and resize when the browser does.
            responsive: true
        };

        $scope.lineOptions =  {
            // Chart.js options can go here.
            responsive: true
        };

        $scope.labels = [];
        $scope.cd4data = [];
        $scope.viraldata = [];
        $scope.currCD4 = "";
        $scope.currViralLoad = "";
        $scope.viralStatus = false;
        $scope.cd4Status = false;
        $scope.undetectableState = false;

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.findLatestLab = function(){

        }

        $scope.find = function() {
            $scope.undetectableCount = 0, $scope.detectableCount = 0;
            $scope.labs = Labs.query((function(res){
            console.log(res);
                for(var i=0;i<res.length; i++){
                    if (!res[i].undetectable) {
						$scope.undetectableCount++;
					} else {
						$scope.detectableCount++;
					}
                    $scope.labels.push($filter('date')(res[i].labDate, "dd/MM/yyyy"));
                    $scope.cd4data.push(res[i].cd4);
                    $scope.viraldata.push(res[i].viralLoad);

                }
                $scope.undetectableState = res[res.length-1].undetectable;
                $scope.pieData = [{value : $scope.undetectableCount,color : "#F7464A"}, {value : $scope.detectableCount,color : "#83c9c9"}];
				var ctx0 = document.getElementById("progress-mypie-chart").getContext("2d");
	            var mynewCd4Chart = new Chart(ctx0).Pie($scope.pieData, {});

                var prevCD4 = res[res.length-2].cd4;
                $scope.currCD4 = res[res.length-1].cd4;

                console.log(prevCD4);
                console.log($scope.currCD4);

                if ($scope.currCD4 >= prevCD4) {
                    $scope.cd4Status = true; // CD4 is up
                }

                var prevViralLoad = res[res.length-2].viralLoad;
                $scope.currViralLoad = res[res.length-1].viralLoad;

                if ($scope.currViralLoad <= prevViralLoad) {
                    $scope.viralStatus = true; // viral load is down
                }

                var ctx = document.getElementById("cd4-myline-chart").getContext("2d");
                var mynewCd4Chart = new Chart(ctx).Line($scope.addlineData($scope.cd4data, $scope.labels), {});

                var ctx2 = document.getElementById("viral-myline-chart").getContext("2d");
                var mynewViralChart = new Chart(ctx2).Line($scope.addlineData($scope.viraldata, $scope.labels), {});
            }));

        };

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

        $scope.lineData = {
            //labels: $scope.labels,
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(143,131,201,0.2)",
                    strokeColor: "#fff",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    //data: $scope.data,
                    data: [65, 59, 80, 81, 56, 55, 40]
                }

            ]
        };

        $scope.pieData = [
            { value : 25, color : "#8f83c9" },
            { value : 75, color : "#83c9c9" }

        ];

        $scope.pieOptions =  {
            // Chart.js options can go here.
            scaleShowLabels: true,  // Interpolated JS string - can access value
            scaleLabel: "12",
            // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
            scaleIntegersOnly: true,

            // String - Scale label font declaration for the scale label
            scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
        }

    }
]);