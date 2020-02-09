package com.finalproject.custom.gpsInfo;
import android.annotation.SuppressLint;
import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.util.JsonWriter;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.jetbrains.annotations.NotNull;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;


public class GpsInfoModule extends ReactContextBaseJavaModule {
    Map<String,LocationListener> locationListeneries = new HashMap<>();
    private final ReactApplicationContext reactContext;
    LocationManager locationManager;
    public GpsInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        locationManager = (LocationManager) reactContext.getSystemService(Context.LOCATION_SERVICE);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("GPS_PROVIDER", LocationManager.GPS_PROVIDER);//	GPS位置提供者的名称
        constants.put("KEY_LOCATION_CHANGED", LocationManager.KEY_LOCATION_CHANGED);//当使用PendingIntent广播位置更改时，用于Bundle的另一个键，用于保存位置值
        constants.put("KEY_PROVIDER_ENABLED", LocationManager.KEY_PROVIDER_ENABLED);//当使用PendingIntent广播提供程序启用/禁用事件时，用于Bundle附加项的键将保持布尔状态值
        constants.put("KEY_PROXIMITY_ENTERING", LocationManager.KEY_PROXIMITY_ENTERING);//用于Bundle的键额外包含一个布尔值，该布尔值指示接近警报是进入（true）还是退出（false）
        constants.put("KEY_STATUS_CHANGED", LocationManager.KEY_STATUS_CHANGED);//当使用PendingIntent广播状态更改时，用于Bundle附加键的键，其中包含Integer状态值
        constants.put("NETWORK_PROVIDER", LocationManager.NETWORK_PROVIDER);//	网络位置提供者的名称
        constants.put("PASSIVE_PROVIDER", LocationManager.PASSIVE_PROVIDER);//一个特殊的位置提供程序，用于在不实际启动位置修复的情况下接收位置
        constants.put("PROVIDERS_CHANGED_ACTION", LocationManager.PROVIDERS_CHANGED_ACTION);//当配置的位置提供程序更改时，广播意图动作
        return constants;
    }

    @NotNull
    @Override
    public String getName() {
        return "GpsInfo";
    }

    @ReactMethod
    public void getAllProviders(Promise promise) {
        WritableArray array = Arguments.fromList(locationManager.getAllProviders());
        promise.resolve(array);
    }
    @SuppressLint("MissingPermission")

    @ReactMethod
    public void isListening(Promise promise){
        int size =locationListeneries.size();
        if(size== 0){
            promise.resolve(false);
        }
        else{
            promise.resolve(size);
        }
    }
    @SuppressLint("MissingPermission")
    @ReactMethod
    public void startListen(String provider,String name, Double minTime, Float minDistance, Promise promise) {
        try {

            if(locationListeneries.containsKey(name)){
                promise.reject("-1",name+" is exist");
            }
            else
            {
                LocationListener temp = new LocationListener() {
                    @Override
                    public void onLocationChanged(Location location) {
                        WritableMap map = Arguments.createMap();
                        map.putString("provider",location.getProvider());
                        map.putDouble("latitude",location.getLatitude());
                        map.putDouble("longitude",location.getLongitude());
                        map.putDouble("time",location.getTime());
                        sendEvent(reactContext,"onLocationChanged",map);
                    }

                    @Override
                    public void onStatusChanged(String provider, int status, Bundle extras) {

                    }

                    @Override
                    public void onProviderEnabled(String provider) {

                    }

                    @Override
                    public void onProviderDisabled(String provider) {

                    }
                };
                locationListeneries.put(name,temp);
                locationManager.requestLocationUpdates(provider,minTime.longValue(),minDistance,temp);
                JSONObject r = new JSONObject();
                r.put("name",name);
                r.put("size",locationListeneries.size());
                promise.resolve(r.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("-1","1");
        }
    }
    public void stopListen(String name,Promise promise){
        if(locationListeneries.size()==0){
            promise.reject("-1","no listening");
        }
        else
        {
            LocationListener temp = locationListeneries.get(name);
            if(temp == null){
                promise.reject("-1","no this name");
            }
            else
            {
                locationManager.removeUpdates(temp);
                promise.resolve("listen "+name+" is removed");
            }
        }

    }

    private void sendEvent(@NotNull ReactContext reactContext,
                           String eventName,
                           @Nullable Object params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}
