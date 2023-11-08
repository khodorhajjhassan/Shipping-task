<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Shipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'customer_name',
        'customer_address',
        'customer_phone',
        'waybill',
        'status',
        'email',
    ];

    protected $hidden = [
        'user_id',
        
    ];
    protected $primaryKey = 'shipment_id';

    public function user():BelongsTo {
        return $this->belongsTo(User::class,'user_id');
    }
}
