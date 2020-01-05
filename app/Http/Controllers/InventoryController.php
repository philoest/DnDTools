<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Game;
use App\Inventory;

class InventoryController extends Controller
{
    public function getInventoriesFromGame (Request $request) {
      // TODO: Check if user is allowed to access the game 
      $game = Game::find($request->game_id);
      if ($game) {
        foreach ($game->inventories as $inventory) {
          $inventory->items;
        }
        return json_encode(["status" => "success", "inventories" => $game->inventories]);
      } else {
        return json_encode(["status" => "failure", "message" => "Game not found..."]);
      }
    }

    public function createInventory (Request $request) {
      $inventory = new Inventory;
      $inventory->game_id = $request->game_id;
      $inventory->title = $request->title;
      $inventory->description = $request->description;

      if ($inventory->save()) {
        $inventory->items;
        return json_encode(["status" => "success", "inventory" => $inventory]);
      } else {
        return json_encode(["status" => "failure", "message" => "Couldn't save inventory"]);
      }
    } 
}
