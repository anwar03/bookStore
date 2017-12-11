var myApp = angular.module('myApp');

myApp.controller("BooksController", ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('BooksController loaded....');
    $scope.getBooks = function(){
        $http.get('/api/books').then(function(response){
            $scope.books = response.data;
            console.log($scope.books);
        });
    };

    $scope.getBook = function(){
    	var id = $routeParams.id;
        $http.get('/api/books/'+ id).then(function(response){
            $scope.book = response.data;
        });
    };

    $scope.updateBook = function(){
    	var id = $routeParams.id;
    	console.log($scope.book);
    	/*var book = {
    		name: $scope.book.name,
    		genre: $scope.book.genre,
    		author: $scope.book.author,
    		description: $scope.book.description,
    		pages: $scope.book.pages,
    		publisher: $scope.book.publisher,
    		image_url: $scope.book.image_url,
    		buy_url: $scope.book.buy_url
    	}
    	console.log('update Book', book);
        */$http.put('/api/books/'+ id, $scope.book).then(function(response){
            window.location.href = '#!/books';
        });
    };

    $scope.addBook = function(){
        $http.post('/api/books', $scope.book).then(function(response){
            window.location.href = '#!/books';
        });
    };

    $scope.deleteBook = function(){
    	var id = $routeParams.id;
        $http.delete('/api/books/'+id).then(function(response){
            window.location.href = '#!/books';
        });
    };

}]);
