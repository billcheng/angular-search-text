# angular-search-text
Angular Search Text Box for Materialize

# CSS
Include the css
```html
<link rel="stylesheet" href="angular-search-text.css" />
````

# Script
````html
<script type="javascript" src="angular-search-text.js"></script>
````

# Angular module
````javascript
angular.module("yourApp", ["ngSearchText"])
````

# HTML Tag
````html
<search-text ng-model="model" 
      ng-request="request(deferred, text)" 
      ng-disabled="false" 
      placeholder="search text..." >
</search-text>
````

# Example of ng-request function (local)
````javascript
$scope.doSearch = function(deferred, text) {
    var result = [];
    if (text!=='')
        var lowerCaseText = text.toLowerCase();
        angular.forEach(searchList, function(s){
            if (s.toLowerCase().startsWith(lowerCaseText))
                result.push(s);
        });
                    
    deferred.resolve({data: result});
  };
````

# Example of ng-request function (remote)
````javascript
$scope.doSearch = function(deferred, text) {
    $http.get("webapi")
      .then(function(response){
            deferred.resolve({data: response.data});
          },
          function(response){
            deferred.reject();
          });
  };
````