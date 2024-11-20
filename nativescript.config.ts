import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.cafeteriamanagement',
  appPath: 'app',
  appResourcesPath: '../../tools/assets/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  cssParser: 'tailwind'
} as NativeScriptConfig;