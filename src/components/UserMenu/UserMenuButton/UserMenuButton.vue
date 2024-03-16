<template>
    <div class="relative">
        <div
            class="w-[40px] h-[40px] cursor-pointer rounded-md overflow-hidden"
            :class="{ active: isDropDownShown }"
            @click="isDropDownShown = !isDropDownShown"
        >
            <!-- <img :src="" alt="avatar" /> from store v-else default -->
            <ProfileDefault class="w-full h-full" />
        </div>
        <DropDown v-if="isDropDownShown" v-click-outside="() => (isDropDownShown = false)" class="w-[275px]">
            <UserMenuDropDown @changeRoute="isDropDownShown = false" />
        </DropDown>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DropDown from '@/components/Base/DropDown/DropDown.vue';
import ProfileDefault from '@/components/Base/SvgImages/ProfileDefault/ProfileDefault.vue';
import UserMenuDropDown from '@/components/UserMenu/UserMenuDropDown/UserMenuDropDown.vue';

let isDropDownShown = ref(false);
</script>
