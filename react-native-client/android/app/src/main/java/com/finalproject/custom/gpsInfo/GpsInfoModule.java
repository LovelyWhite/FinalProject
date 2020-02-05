package com.finalproject.custom.gpsInfo;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.os.Build;
import android.provider.Settings;

import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.modules.core.PermissionListener;

import org.jetbrains.annotations.NotNull;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;


public class GpsInfoModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    LocationManager locationManager;
    String location_provider;
    Promise location_promise;

    public String getLocation_provider() {
        return location_provider;
    }

    public Promise getLocation_promise() {
        return location_promise;
    }

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
    public void getLastKnownLocation(String provider, Promise promise) {
        this.location_promise = promise;
        this.location_provider = provider;
        Location location = locationManager.getLastKnownLocation(provider);
        location_promise.resolve(location.toString());
    }
}
