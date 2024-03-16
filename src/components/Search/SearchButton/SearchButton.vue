<template>
    <div class="relative">
        <div
            class="button-icon-header"
            :class="{ active: isDropDownShown }"
            @click="isDropDownShown = !isDropDownShown"
        >
            <MagnifyingGlassIcon />
        </div>
        <DropDown v-if="isDropDownShown" v-click-outside="() => (isDropDownShown = false)">
            <SearchDropDown />
        </DropDown>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import DropDown from '@/components/Base/DropDown/DropDown.vue';
import SearchDropDown from '@/components/Search/SearchDropDown/SearchDropDown.vue';

let isDropDownShown = ref(false);
</script>
