<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use Illuminate\Http\Request;
use App\Mail\ShipmentCreated;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\ShipmentRequest;
use App\Http\Requests\EditShipmentRequest;

class ShipmentController extends Controller
{
    public function viewShipments(){

        try{
    
        $user=auth()->user();
        $shipment=$user->shipments()->get();
    
        return response()->json([
            'status'=>'success',
            'message'=>'fetch shipment success',
            'data'=>$shipment
        ]);
    }catch(\Exception $e){
        return response()->json([
            'status'=> 'error',
            'message'=>$e->getMessage()
            ]);
        
       }
    }
    
    
    private function generateUniqueWaybill() {
    
        $waybill = 'A-' . str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT);
        
        while (Shipment::where('waybill', $waybill)->exists()) {
            $waybill = 'A-' . str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT);
        }
    
        return $waybill;
    }
    
    public function addShipment(ShipmentRequest $request){
        try{
    
            $user=auth()->user();
            $formFields=$request->validated();
    
            $waybill = $this->generateUniqueWaybill();
    
            $formFields['user_id']=$user->id;
            $formFields['waybill']=$waybill;
            $formFields['status']='pending';
    
            $shipment = Shipment::create($formFields);
            Mail::to($formFields['email'])->send(new ShipmentCreated($shipment));
    
            return response()->json([
                'status'=> 'success',
                'message'=> 'shipment add success',
                'data'=>[$formFields]
                ]);
    
    }
        catch(\Exception $e){
            return response()->json([
                'status'=> 'error',
                'message'=>$e->getMessage()
                ]);
        }
    }

    public function editShipment(EditShipmentRequest $request,$id){

        try{
           $user=auth()->user();
           $formFields=$request->validated();
          $shipment=Shipment::where('user_id',$user->id)->where('shipment_id',$id)->first();

          if(!$shipment){
            return response()->json([
                'status'=> 'error',
                'message'=> 'Shimpent not found!'
                ]);
            }
                $shipment->update($formFields);

                return response()->json([
                    'status'=> 'success',
                    'message'=> 'Shipment Update Successfuly'
                    ]);
        }
        catch(\Exception $e){
            return response()->json([
                'status'=> 'error',
                'message'=>$e->getMessage()
                ]);
    }
}

    public function deleteShipment(Request $request,$id){
         try{
            $user=auth()->user();
            if(!$user){
                return response()->json([
                    'status'=> 'error',
                        'message'=> 'you are not authorized'
                        ]);
                    }

              $shipment=Shipment::where('user_id',$user->id)->where('shipment_id',$id)->first();
              if(!$shipment){
                return response()->json([
                    'status'=> 'error',
                    'message'=> 'no shipment found to delete'
                    ]);
                }

                    $shipment->delete();
                    return response()->json([
                        'status'=> 'success',
                        'message'=> 'Delete succuss'
                        ]);
    }
    catch(\Exception $e){
        return response()->json([
            'status'=> 'error',
            'message'=>$e->getMessage()
            ]);
        }
    }

    public function trackShipment($waybill){
        try{   
            $shipment=Shipment::where('waybill',$waybill)->first();
            if(!$shipment){
                return response()->json([
                    'status'=> 'error',
                    'message'=> 'No Track found'
                    ]);
                }
                    return response()->json([
                        'status'=> 'success',
                        'data' => [
                            'status' => $shipment->status,
                            'waybill' => $shipment->waybill,
                            'updated_at' => $shipment->updated_at,
                        ]
                        ]);
        }
        catch(\Exception $e){
            return response()->json([
                'status'=> 'error',
                'message'=>$e->getMessage()
                ]);
    }
    }

}
