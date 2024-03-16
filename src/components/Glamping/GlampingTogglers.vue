<template>
    <div class="grid grid-cols-3 gap-2">
        <div class="flex items-center justify-between gap-1" :title="$t('button.heating')">
            <p>🔥</p>
            <ToggleSwitcher
                :value="glamping.heating"
                input-name="heating"
                size="xs"
                @on-change="handleChangeIsHeating"
            />
        </div>
        <div class="flex items-center justify-between gap-1" :title="$t('button.forced_ventilation')">
            <p>💨</p>
            <ToggleSwitcher
                :value="glamping.forced_ventilation"
                input-name="forced_ventilation"
                size="xs"
                @on-change="handleChangeIsForcedVentilation"
            />
        </div>
        <div class="flex items-center justify-between gap-1" :title="$t('button.electricity')">
            <p>⚡</p>
            <ToggleSwitcher
                :value="glamping.electricity"
                input-name="electricity"
                size="xs"
                @on-change="handleChangeIsElectricity"
            />
        </div>
        <div class="flex items-center justify-between gap-1" :title="$t('button.security')">
            <p>⛔</p>
            <ToggleSwitcher
                :value="glamping.security"
                input-name="security"
                size="xs"
                @on-change="handleChangeIsSecurity"
            />
        </div>
        <div class="flex items-center justify-between gap-1" :title="$t('button.opened')">
            <p>🚪</p>
            <ToggleSwitcher :value="glamping.opened" input-name="opened" size="xs" @on-change="handleChangeIsOpened" />
        </div>
        <div class="flex items-center justify-between gap-1" :title="$t('button.paid')">
            <p>💵</p>
            <ToggleSwitcher :value="glamping.paid" input-name="paid" size="xs" @on-change="handleChangeIsPaid" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IGlamping } from '@/types/glamping';
import ToggleSwitcher from '../Base/ToggleSwitcher/ToggleSwitcher.vue';

const props = defineProps<{
    glamping: IGlamping;
}>();

const glamping = computed<IGlamping>(() => {
    return props.glamping;
});

const emits = defineEmits<{
    (e: 'on-edit-toggle-glamping', glamping: IGlamping): void;
}>();

// Change checkbox
const handleChangeIsHeating = (value: boolean) => {
    glamping.value.heating = value;
    emits('on-edit-toggle-glamping', glamping.value);
};
const handleChangeIsForcedVentilation = (value: boolean) => {
    glamping.value.forced_ventilation = value;
    emits('on-edit-toggle-glamping', glamping.value);
};
const handleChangeIsElectricity = (value: boolean) => {
    glamping.value.electricity = value;
    emits('on-edit-toggle-glamping', glamping.value);
};
const handleChangeIsSecurity = (value: boolean) => {
    glamping.value.security = value;
    emits('on-edit-toggle-glamping', glamping.value);
};
const handleChangeIsOpened = (value: boolean) => {
    glamping.value.opened = value;
    emits('on-edit-toggle-glamping', glamping.value);
};
const handleChangeIsPaid = (value: boolean) => {
    glamping.value.paid = value;
    emits('on-edit-toggle-glamping', glamping.value);
};
</script>
