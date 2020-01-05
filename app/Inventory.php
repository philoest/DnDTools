<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    public function game () {
      return $this->belongsTo('App\Game');
    }

    public function items () {
      return $this->hasMany('App\Item');
    }
}
