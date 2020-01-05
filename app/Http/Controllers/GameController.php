<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use App\Game;

class GameController extends Controller
{
    public function getGamesFromUser(Request $request) {
      $games = $request->user()->games;

      return json_encode(["games" => $games]);
    }

    public function createGameForUser(Request $request) {
      $game = new Game;
      $game->name = $request->name;
      $game->description = $request->description;
      $game->user_id = $request->user()->id;

      if ($game->save()) {
        return json_encode(["status" => "success"]);
      } else {
        return json_encode(["status" => "failure"]);
      }
    }
}
