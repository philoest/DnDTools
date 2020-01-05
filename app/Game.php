<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    public function admin () {
      return $this->belongsTo('App\User');
    }

    public function inventories () {
      return $this->hasMany('App\Inventory');
    }
}
