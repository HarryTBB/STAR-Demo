
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
    $scope.clicked = false;
    $scope.updateUser = {};
    $scope.deleteID = 0;
    $scope.dateFormat = "";
    $scope.errors = {};
    $scope.nameError = "";
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
        $scope.clicked = true;
        if (!$scope.errorList($scope.user)) {
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
        };

    }


    $scope.update = function () {
        if (!$scope.errorList($scope.updateUser)) {
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
        };
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

    $scope.constraints = {
        Name: {
            presence: true,
            length: { maximum: 20 },
            format: {
                pattern: "^[a-zA-z]+",
                flags: "i",
                message: "is not correct!"
            }
        },

        DOB: {
            presence: true,
            //date: {
            //    latest: moment().subtract(18, "years"),
            //    message: "You must be at least 18 years old!"
            //}
        },

        Address: {
            presence: true,
            length: { maximum: 50 },
            format: {
                pattern: "^[a-zA-Z0-9_ ]*$", 
                message: "Please input correct address!"
            }
        },

        Money: {
            presence: true,
            numericality: {
                onlyInteger: true,
                notGreaterThan: 999999999

                }
        }
    };


    $scope.errorList = function (attr) {
        $scope.errors = validate(attr, $scope.constraints);
        if (!$scope.errors) {
            $scope.nameError = null;
            $scope.DOBError = null;
            $scope.addressError = null;
            $scope.moneyError = null;
        }
        else {
            $scope.nameError = JSON.stringify($scope.errors.Name);
            if ($scope.nameError != null) {
                $scope.nameError = $scope.nameError.slice(2, -2)
            };

            $scope.DOBError = JSON.stringify($scope.errors.DOB);
            if ($scope.DOBError != null) {
                $scope.DOBError = $scope.DOBError.slice(2, -2)
            };

            $scope.addressError = JSON.stringify($scope.errors.Address);
            if ($scope.addressError != null) {
                $scope.addressError = $scope.addressError.slice(2, -2)
            };

            $scope.moneyError = JSON.stringify($scope.errors.Money);
            if ($scope.moneyError != null) {
                $scope.moneyError = $scope.moneyError.slice(2, -2)
            };

            return $scope.errors;
        }
    }


}]);