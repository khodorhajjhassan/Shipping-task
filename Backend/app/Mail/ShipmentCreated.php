<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Shipment;

class ShipmentCreated extends Mailable
{
    use Queueable, SerializesModels;

    
    use SerializesModels;

    public $shipment;

    public function __construct(Shipment $shipment)
    {
        $this->shipment = $shipment;
    }

    public function build()
    {
        $customMessage = 'Hello! This is your waybill for the shipment. You can track your shipment using the following number:';
        return $this->view('emails.shipment-created')
                    ->with([
                        'waybill' => $this->shipment->waybill,
                        'customMessage'=> $customMessage
                    ])
                    ->subject('Shipment Waybill');
    }
    
    
 
}