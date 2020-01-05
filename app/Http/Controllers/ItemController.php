<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Item;

class ItemController extends Controller
{
  public function createItem (Request $request) {
    $item = new Item;

    $item->name = $request->name;
    $item->description = $request->description;
    $item->weight = $request->weight;
    $item->value = $request->value;
    $item->count = $request->count;
    $item->type = $request->type;
    $item->inventory_id = $request->inventory_id;

    if ($item->save()) {
      return json_encode(["status" => "success", "item" => $item]);
    } else {
      return json_encode(["status" => "failure", "message" => "Couldn't save item."]);
    }
  }
}
