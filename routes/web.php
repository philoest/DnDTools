<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * Public Routes
 */
Route::get('/', function () {
  return view('welcome');
})->name('welcome');
Route::get('/impressum', function () {
    return view('impressum');
})->name('impressum');
Route::get('/about', function () {
    return view('about');
})->name('about');

/**
 * Auth Routes
 */
Auth::routes();

/**
 * REST Routes
 */

Route::middleware('auth')->group(function  ()  {

  Route::prefix('games')->group(function () {
    Route::get('my', 'GameController@getGamesFromUser');
    Route::post('new', 'GameController@createGameForUser');
  });

  Route::prefix('inventory')->group(function () {
    Route::get('allFromGame', 'InventoryController@getInventoriesFromGame');
    Route::post('new', 'InventoryController@createInventory');
  });

  Route::prefix('item')->group(function () {
    Route::post('new', 'ItemController@createItem');
  });
  
});

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/{any}', 'HomeController@index')->where('any', '.*');