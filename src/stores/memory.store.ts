import { defineStore } from 'pinia';
import dayjs from 'dayjs';

import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const useMemoryStore = defineStore('memory', {
  state: () => ({}),

  getters: {},

  actions: {},
});
