
//$.ajax({
//    type: 'POST',
//    url: '',
//    data: {  },

//    success: function (data) {
//        // successful request; do something with the data

//    },
//    error: function () {
//        // failed request; give feedback to user

//    }
//});


angular.module("myApplication", ["smart-table"]).controller('safeCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.user = {};
    $scope.updateUser = {};
    $scope.deleteID = 0;
    $scope.dateFormat = "";
    $scope.loadData = function () {
        $scope.rowCollection = [];
        $http({
            method: 'GET',
            url: '/api/PeopleAPI'
        }).then(function success(response) {
            $scope.rowCollection = response.data;
            console.log(response.data);
        }, function error(response) {

        });

    }

    $scope.openDeleteModal = function (ID) {
        $('#modalConfirmDelete').modal('show');
        $scope.deleteID = ID;
    }

    $scope.openUpdateModal = function (ID, row) {
        $('#modalUpdate').modal('show');
        $scope.updateID = ID;
        $scope.updateUser = row;
        $scope.dateFormat = new Date(JSON.stringify(row.DOB).substring(1, 11));
        console.log($scope.updateUser);
    }

    $scope.create = function () {
        $scope.createCopy = angular.copy($scope.user);
        console.log($scope.user)
        $http({
            method: 'POST',
            url: '/api/PeopleAPI',
            data: JSON.stringify($scope.createCopy)
        }).then(function success(response) {
            console.log("Success!");
            $('#modalCreate').modal('hide');
            window.location.reload();
        }, function error(response) {
            consle.log("error");

        });

        console.log($scope.user.Name);

    }


    $scope.update = function () {
        $scope.updateUser.DOB = $scope.dateFormat;
        $scope.updateCopy = $scope.updateUser;
        console.log($scope.updateUser)
        $http({
            method: 'PUT',
            url: '/api/PeopleAPI/' + $scope.updateID,
            data: JSON.stringify($scope.updateCopy)

        }).then(function success(response) {
            console.log("Success!");
            $('#modalConfirmDelete').modal('hide');
            window.location.reload();
        }, function error(response) {
            consle.log("error");

        });

        console.log($scope.user.Name);

    }

    $scope.delete = function () {
        //var index = $scope.rowCollection.IndexOF(row)
        $http({
            method: 'DELETE',
            url: '/api/PeopleAPI/' + $scope.deleteID

        }).then(function success(response) {
            console.log("Success!");
            $('#modalConfirmDelete').modal('hide');
            window.location.reload();
        }, function error(response) {
            consle.log("error");

        });

        console.log($scope.user.Name);

    }


}]);