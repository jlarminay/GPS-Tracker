package com.joshlarminay.gpstracker;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.PowerManager;
import android.provider.Settings;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// Prompt to disable battery optimizations so background tasks can run more reliably
		try {
			PowerManager pm = (PowerManager) getSystemService(POWER_SERVICE);
			String pkg = getPackageName();
			if (pm != null && !pm.isIgnoringBatteryOptimizations(pkg)) {
				Intent intent = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
				intent.setData(Uri.parse("package:" + pkg));
				// Only attempt on Android M+ where Doze mode exists
				if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
					startActivity(intent);
				}
			}
		} catch (Exception ignored) {
			// Safe to ignore; user can always change this in system settings
		}
	}
}
