(function () {
    angular.module("ngSearchText", [])
        .directive("searchText", ["$compile", "$timeout", "$q", function ($compile, $timeout, $q) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    ngModel: "=",
                    ngRequest: "&",
                    ngDelay: "@",
                    ngDisabled: "=",
                    placeholder: "@"
                },
                template: '<div class="dropdown" ng-class="{\'open\': focus && ngList.length>0}" ng-init="focus=false"><input type="text" class="form-control" ng-model="ngModel" ng-blur="timeOut()" ng-change="change()" ng-disabled="ngDisabled" placeholder="{{placeholder}}"/><div class="dropdown-relative"><ul class="dropdown-menu"><li ng-repeat="option in ngList track by $index" ng-click="optionClick(option)"><a>{{option}}</a></li></ul></div></div>',
                link: function ($scope, $element, $attrs, controller) {
                
                    $scope.ngList = [];
                    
                    $scope.timeOut = function() {
                        $timeout(function() {
                            $scope.focus = false;
                        },300);
                    };

                    $scope.optionClick = function (option) {
                        $scope.ngModel = option;
                        $scope.focus = false;
                    };
                    
                    var changeHandle;
                    $scope.change = function(){
                        $scope.focus = true;
                        
                        if (changeHandle)
                            $timeout.cancel(changeHandle);
                            
                        changeHandle = $timeout(function(){
                            var deferred = $q.defer();
                            $scope.ngRequest({ deferred: deferred, text: $scope.ngModel });
                            deferred.promise
                                .then(function (response) {
                                    $scope.ngList = response.data;
                                });
                        }, $scope.ngDelay || 500);
                    };

                    $scope.$watch("ngModel", function(value) {
                        if (value === '')
                            $scope.ngList = [];
                    });

                }
            }
        }]);
})();